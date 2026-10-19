'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Terminal, Play, RotateCcw, Activity } from 'lucide-react'

import { cn } from '../../lib/utils'
import { buildBootSequence } from './boot-sequence'
import { onTerminalCommand } from './command-bus'
import { runCommand } from './commands'
import type { CommandContext } from './command-types'
import TerminalOutput from './terminal-output'
import TerminalPrompt, { type TerminalPromptHandle } from './terminal-prompt'
import { line, type TerminalStep } from './terminal-types'
import { useTerminalWriter } from './use-terminal-writer'

const ERROR_PACE = 1500

const QUICK_COMMANDS = [
  { label: 'whoami', desc: 'Identity' },
  { label: 'skills', desc: 'Technical Stack' },
  { label: 'projects', desc: 'Featured Work' },
  { label: 'certifications', desc: 'Cisco Badges' },
  { label: 'recruiter', desc: 'Candidate Summary' },
  { label: 'neofetch', desc: 'System Info' },
  { label: 'ping', desc: 'Network Latency' },
  { label: 'clear', desc: 'Reset Console' },
]

export default function SystemTerminal({ className }: { className?: string }) {
  const { entries, isTyping, write, clear, flush } = useTerminalWriter()

  const [history, setHistory] = useState<string[]>([])
  const historyRef = useRef<string[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<TerminalPromptHandle>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stickToBottomRef = useRef(true)
  const bootedRef = useRef(false)

  /* Cold open, once per page load. */
  useEffect(() => {
    if (bootedRef.current) return
    bootedRef.current = true

    const steps = buildBootSequence()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    write(
      reduceMotion
        ? steps.map<TerminalStep>((step) => (step.kind === 'print' ? { ...step, instant: true } : step))
        : steps,
    )
  }, [write])

  /* Follow the tail of the console unless the visitor scrolled up to read. */
  useEffect(() => {
    const element = scrollRef.current
    if (!element || !stickToBottomRef.current) return
    element.scrollTop = element.scrollHeight
  }, [entries, isTyping])

  const handleScroll = useCallback(() => {
    const element = scrollRef.current
    if (!element) return
    stickToBottomRef.current = element.scrollHeight - element.scrollTop - element.clientHeight < 64
  }, [])

  const focusPrompt = useCallback(() => promptRef.current?.focus(), [])

  /* Typing anywhere on the page drops you into the shell, like a real console. */
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key.length !== 1 || event.key === ' ') return

      const target = event.target as HTMLElement | null
      if (target) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A' || tag === 'SELECT') return
        if (target.isContentEditable) return
      }

      event.preventDefault()
      promptRef.current?.focus()
      promptRef.current?.typeText(event.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navigate = useCallback((target: string) => {
    if (target.startsWith('#')) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    window.open(target, '_blank', 'noopener,noreferrer')
  }, [])

  const handleSubmit = useCallback(
    (raw: string) => {
      const nextHistory = [...historyRef.current, raw]
      historyRef.current = nextHistory
      setHistory(nextHistory)

      const context: CommandContext = { history: nextHistory, theme: 'recruiter' }
      const outcome = runCommand(raw, context)

      if (outcome.effect?.type === 'clear') {
        clear()
        return
      }

      write({ kind: 'print', entryKind: 'input', segments: line(raw, 'bright'), instant: true })

      if (outcome.lines.length > 0) {
        write(
          outcome.lines.map<TerminalStep>((segments) => ({
            kind: 'print',
            entryKind: 'output',
            segments,
            instant: outcome.instant,
            charsPerSecond: outcome.error ? ERROR_PACE : undefined,
          })),
        )
      }

      switch (outcome.effect?.type) {
        case 'navigate':
          navigate(outcome.effect.target)
          break
        default:
          break
      }
    },
    [clear, navigate, write],
  )

  /* Connect the quick-command bus */
  useEffect(
    () =>
      onTerminalCommand((command) => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        handleSubmit(command)
      }),
    [handleSubmit],
  )

  const sessionState = isTyping ? 'STREAMING' : 'READY'

  return (
    <div
      ref={panelRef}
      className={cn(
        'mx-panel flex h-[26rem] flex-col overflow-hidden rounded-xl border border-mx-line/80 shadow-2xl transition-all duration-300 sm:h-[30rem] lg:h-[32rem]',
        className,
      )}
      onClick={() => {
        if (!window.getSelection()?.toString()) focusPrompt()
      }}
    >
      {/* Title bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-mx-line bg-mx-panel2/90 px-4 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </span>
          <span className="truncate font-mono text-2xs text-mx-textDim sm:text-xs">
            ghaith@devsecops-node:~$ zsh
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-2xs text-mx-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CLOUD SHELL ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Quick Interactive Command Buttons Strip */}
      <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-mx-line/60 bg-mx-panel px-3 py-1.5 text-2xs scrollbar-none">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-mx-textFaint pr-1 flex items-center gap-1">
          <Play className="h-2.5 w-2.5 text-mx-primary" />
          <span>Quick Run:</span>
        </span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd.label}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleSubmit(cmd.label)
            }}
            className="shrink-0 inline-flex items-center gap-1 rounded border border-mx-line/70 bg-mx-panel2/60 px-2 py-0.5 font-mono text-2xs text-mx-textDim transition-colors hover:border-mx-primary/60 hover:bg-mx-primary/10 hover:text-mx-bright active:scale-95"
            title={`Run command: ${cmd.label} (${cmd.desc})`}
          >
            <span className="text-mx-primary font-semibold">$</span>
            <span>{cmd.label}</span>
          </button>
        ))}
      </div>

      {/* Terminal Screen Body */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-black/50">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative h-full overflow-y-auto overscroll-contain px-4 py-4 font-mono text-[12.5px] leading-6 sm:px-6 sm:py-5 sm:text-sm sm:leading-7"
        >
          <TerminalOutput entries={entries} />
          <TerminalPrompt
            ref={promptRef}
            onSubmit={handleSubmit}
            onInterrupt={flush}
            onClear={clear}
            history={history}
            busy={isTyping}
          />
        </div>
      </div>

      {/* Terminal Status Footer */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-mx-line bg-mx-panel2/80 px-4 py-2 font-mono text-2xs text-mx-textFaint">
        <div className="flex items-center gap-3">
          <span className="text-mx-primary font-medium flex items-center gap-1.5">
            <Activity className="h-3 w-3" />
            <span>{sessionState}</span>
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">{entries.length} log lines</span>
          <span className="hidden sm:inline">·</span>
          <span>{history.length} cmds recorded</span>
        </div>
        <div className="hidden sm:inline-flex items-center gap-2 text-mx-textFaint">
          <span>Tab complete</span>
          <span>·</span>
          <span>↑↓ history</span>
        </div>
      </div>
    </div>
  )
}

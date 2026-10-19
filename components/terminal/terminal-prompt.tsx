'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'

import { cn } from '../../lib/utils'
import { completeCommand } from './commands'
import { SHELL_PROMPT } from './terminal-config'
import { TerminalCaret } from './terminal-output'

export type TerminalPromptHandle = {
  focus: () => void
  /** Append text as if it had been typed (used by the page-wide key capture). */
  typeText: (text: string) => void
}

type TerminalPromptProps = {
  onSubmit: (command: string) => void
  /** Ctrl+C on an empty prompt, or Esc — fast-forwards buffered output. */
  onInterrupt: () => void
  onClear: () => void
  history: string[]
  busy: boolean
}

const TerminalPrompt = forwardRef<TerminalPromptHandle, TerminalPromptProps>(function TerminalPrompt(
  { onSubmit, onInterrupt, onClear, history, busy },
  ref,
) {
  const [value, setValue] = useState('')
  const [caret, setCaret] = useState(0)
  const [historyIndex, setHistoryIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef('')

  useEffect(() => {
    valueRef.current = value
  }, [value])

  /** Set the value and keep the DOM selection and the drawn caret in sync. */
  const applyValue = useCallback((next: string) => {
    valueRef.current = next
    setValue(next)
    setCaret(next.length)
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(next.length, next.length))
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      typeText: (text: string) => applyValue(valueRef.current + text),
    }),
    [applyValue],
  )

  const syncCaret = useCallback(() => {
    const position = inputRef.current?.selectionStart
    if (typeof position === 'number') setCaret(position)
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const control = event.ctrlKey || event.metaKey

    if (event.key === 'Enter') {
      event.preventDefault()
      const command = value.trim()
      if (!command) return
      onSubmit(command)
      applyValue('')
      setHistoryIndex(-1)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      applyValue(history[nextIndex] ?? '')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex < 0) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(-1)
        applyValue('')
      } else {
        setHistoryIndex(nextIndex)
        applyValue(history[nextIndex] ?? '')
      }
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const match = completeCommand(value)
      if (match) applyValue(match)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      onInterrupt()
      return
    }

    if (control && event.key.toLowerCase() === 'l') {
      event.preventDefault()
      onClear()
      return
    }

    if (control && event.key.toLowerCase() === 'c') {
      event.preventDefault()
      if (value) {
        applyValue('')
        setHistoryIndex(-1)
      } else {
        onInterrupt()
      }
    }
  }

  const before = value.slice(0, caret)
  const after = value.slice(caret)
  const isIdle = value.length === 0

  return (
    <div className="relative mt-3.5 flex items-start gap-2 font-mono text-[12.5px] leading-6 sm:text-sm sm:leading-7">
      <span className="shrink-0 text-mx-primary-dim">
        {SHELL_PROMPT}
        <span className="text-mx-primary">$</span>
      </span>

      <div className="relative min-w-0 flex-1 overflow-hidden">
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => {
            valueRef.current = event.target.value
            setValue(event.target.value)
            setCaret(event.target.selectionStart ?? event.target.value.length)
          }}
          onKeyDown={handleKeyDown}
          onKeyUp={syncCaret}
          onClick={syncCaret}
          onSelect={syncCaret}
          onFocus={syncCaret}
          aria-label="Terminal command input"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="send"
          className="absolute inset-0 h-full w-full cursor-text bg-transparent text-transparent caret-transparent outline-none"
        />

        <div aria-hidden="true" className="pointer-events-none whitespace-pre text-mx-bright">
          {before}
          <TerminalCaret />
          {after}
        </div>

        {isIdle ? (
          <p aria-hidden="true" className="pointer-events-none mt-0.5 hidden text-2xs text-mx-textFaint sm:block">
            {busy ? 'streaming buffered output — Esc to skip' : 'press Tab to complete · type `help`'}
          </p>
        ) : null}
      </div>

      {busy ? (
        <span
          aria-hidden="true"
          className={cn('shrink-0 animate-pulse-glow text-2xs tracking-terminal text-mx-primary-dim')}
        >
          ▚ LIVE
        </span>
      ) : null}
    </div>
  )
})

export default TerminalPrompt

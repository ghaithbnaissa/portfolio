const TERMINAL_COMMAND_EVENT = 'mx:command'

/** Run a command in the on-page terminal from anywhere in the UI. */
export function dispatchTerminalCommand(command: string): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<string>(TERMINAL_COMMAND_EVENT, { detail: command }))
}

export function onTerminalCommand(handler: (command: string) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const listener = (event: Event) => {
    const command = (event as CustomEvent<string>).detail
    if (typeof command === 'string' && command.trim()) handler(command)
  }

  window.addEventListener(TERMINAL_COMMAND_EVENT, listener)
  return () => window.removeEventListener(TERMINAL_COMMAND_EVENT, listener)
}

const RAIN_BURST_EVENT = 'mx:rain-burst'

/** Duration of the current burst, in milliseconds. 0 means "not bursting". */
export type RainBurstDetail = { durationMs: number }

export function dispatchRainBurst(durationMs: number): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<RainBurstDetail>(RAIN_BURST_EVENT, { detail: { durationMs } }))
}

export function onRainBurst(handler: (durationMs: number) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const listener = (event: Event) => {
    const detail = (event as CustomEvent<RainBurstDetail>).detail
    handler(detail?.durationMs ?? 0)
  }

  window.addEventListener(RAIN_BURST_EVENT, listener)
  return () => window.removeEventListener(RAIN_BURST_EVENT, listener)
}

import TerminalHero from '../components/terminal/TerminalHero'

export default function Home() {
  return (
    <div className="p-6">
      <TerminalHero />
      <section id="dashboard" className="mt-8">
        <h2 className="text-2xl font-semibold">Dashboard (stub)</h2>
      </section>
    </div>
  )
}

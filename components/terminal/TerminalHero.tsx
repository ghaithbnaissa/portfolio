import { useEffect, useState } from 'react'

export default function TerminalHero() {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    const seq = [
      '$ whoami',
      'ghaithbnaissa',
      '$ role',
      'Aspiring DevOps, Cloud, and Cybersecurity Engineer',
      '$ skills',
      'Docker, Kubernetes, Terraform, Jenkins, AWS, Python, Ansible'
    ]

    let i = 0
    const t = setInterval(() => {
      setLines((l) => [...l, seq[i]])
      i++
      if (i >= seq.length) clearInterval(t)
    }, 700)

    return () => clearInterval(t)
  }, [])

  return (
    <div className="max-w-4xl mx-auto bg-surface rounded-lg p-4 font-mono">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="w-3 h-3 bg-yellow-400 rounded-full" />
        <span className="w-3 h-3 bg-green-500 rounded-full" />
        <div className="ml-auto text-sm text-gray-300">bash — portfolio</div>
      </div>
      <div className="min-h-[120px]">
        {lines.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

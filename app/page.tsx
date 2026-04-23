"use client"

import { useEffect, useState } from "react"
import { GradientBackground } from "@/components/ui/paper-design-shader-background"

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [time, setTime] = useState<string>("14:20 GMT")

  useEffect(() => {
    // Check theme preference
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = stored ? stored === "dark" : prefersDark

    if (!isDark) {
      document.documentElement.classList.add("light")
      setTheme("light")
    } else {
      document.documentElement.classList.remove("light")
      setTheme("dark")
    }

    // Update clock
    const updateTime = () => {
      const now = new Date()
      const londonTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }))
      const hours = String(londonTime.getHours()).padStart(2, "0")
      const minutes = String(londonTime.getMinutes()).padStart(2, "0")
      setTime(`${hours}:${minutes} GMT`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("light")
    localStorage.setItem("theme", newTheme)
    setTheme(newTheme)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/88 backdrop-blur-[10px] border-b border-dashed border-border px-7 py-4 flex items-center justify-between text-sm uppercase tracking-wider">
        <div className="font-semibold tracking-wider">
          JUAN SILVA <span className="text-accent">// </span>CASE LOG
        </div>
        <nav className="flex gap-3 text-muted items-center">
          <a href="#log" className="border border-border px-2.5 py-1.5 rounded hover:border-accent hover:text-foreground transition-colors">
            Log
          </a>
          <a href="#about" className="border border-border px-2.5 py-1.5 rounded hover:border-accent hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="border border-border px-2.5 py-1.5 rounded hover:border-accent hover:text-foreground transition-colors">
            Contact
          </a>
          <button
            onClick={toggleTheme}
            className="border border-border px-2.5 py-1.5 rounded hover:border-accent hover:text-foreground transition-colors cursor-pointer"
            title="Toggle light/dark mode"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </nav>
        <div className="text-muted flex gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
            CURRENT · SITKA
          </span>
          <span>LONDON · {time}</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-8 border-b border-dashed border-border overflow-hidden">
        <GradientBackground />
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-7xl font-semibold uppercase leading-tight tracking-tighter mb-12">
            Ten years<br />
            crafting <span className="text-accent">mobile</span>
            <br />
            <span className="font-serif italic text-foreground-2 lowercase">for institutions</span>
            <br />
            <span className="font-serif italic text-foreground-2 lowercase">&amp;</span> <span className="text-accent">human-centred</span> experiences.
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-8 border-t border-dashed border-border pt-6">
            <div>
              <div className="text-muted text-xs uppercase tracking-wider mb-1">Based</div>
              <div className="text-foreground">London, UK</div>
            </div>
            <div>
              <div className="text-muted text-xs uppercase tracking-wider mb-1">Current</div>
              <div className="text-accent">Sitka · Lead Android</div>
            </div>
            <div>
              <div className="text-muted text-xs uppercase tracking-wider mb-1">Stack</div>
              <div className="text-foreground">Kotlin · KMP · Compose</div>
            </div>
            <div>
              <div className="text-muted text-xs uppercase tracking-wider mb-1">Languages</div>
              <div className="text-foreground">PT · EN · DE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Highlights */}
      <section className="py-20 px-8 border-b border-dashed border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-wider text-muted mb-12 pb-3 border-b border-dashed border-border">
            // PROJECT HIGHLIGHTS
          </h2>

          <div className="grid grid-cols-3 gap-5">
            {[
              { num: "08", name: "SITKA", tagline: "Lead·ing the stack.", status: "CURRENT" },
              { num: "09", name: "CITYSCAPE", tagline: "Built·once. Ship·ped twice.", status: "LIVE" },
              { num: "05", name: "HSBC", tagline: "Bank·ing, re·wired.", status: "LIVE" },
            ].map((project) => (
              <a
                key={project.num}
                href={`/cases/${project.num}`}
                className="bg-surface border border-border-2 p-6 aspect-video flex flex-col justify-between hover:border-accent transition-colors cursor-pointer"
              >
                <div className="flex justify-between text-xs text-muted">
                  <span>{project.num} · {project.name}</span>
                  <span className="text-accent">{project.status}</span>
                </div>
                <h3 className="text-2xl font-semibold uppercase tracking-tighter">{project.tagline}</h3>
                <div className="flex justify-between text-xs text-muted">
                  <span>CASE {project.num}</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case Log */}
      <section id="log" className="py-20 px-8 border-b border-dashed border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-baseline mb-12 pb-3 border-b border-dashed border-border">
            <h2 className="text-xs uppercase tracking-wider text-muted">
              // CASE LOG <span className="text-accent">— 09 PROJECTS</span>
            </h2>
            <span className="text-xs uppercase tracking-wider text-muted">SORTED ↓ RECENT</span>
          </div>

          <div className="space-y-1">
            {[
              { num: "09", name: "Cityscape", role: "Founder", stack: "KMP · IOS · ANDROID", year: "2026" },
              { num: "08", name: "Sitka", role: "LEAD ANDROID", stack: "KOTLIN · COMPOSE", year: "2025", current: true },
              { num: "07", name: "Vanguard UK", role: "ANDROID ENG", stack: "KOTLIN · AUTH0", year: "2023–25" },
            ].map((row) => (
              <a
                key={row.num}
                href={`/cases/${row.num}`}
                className={`grid grid-cols-[60px_1fr_200px_160px_100px_60px] gap-5 items-center py-6 px-0 border-b border-dashed border-border hover:bg-surface hover:pl-4 transition-all cursor-pointer ${
                  row.current ? "text-accent" : ""
                }`}
              >
                <span className="text-xs text-dim">{row.num}</span>
                <span className="text-2xl font-semibold uppercase tracking-tighter">{row.name}</span>
                <span className="text-xs uppercase tracking-wider text-muted">{row.role}</span>
                <span className="text-xs uppercase tracking-wider text-muted">{row.stack}</span>
                <span className="text-xs uppercase tracking-wider text-muted">{row.year}</span>
                <span className="text-right text-dim">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 mt-auto">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-16 mb-12">
          <div>
            <h5 className="text-xs uppercase tracking-wider text-muted mb-6">// CONTACT</h5>
            <p className="text-4xl font-light tracking-tighter mb-2">Have a project in mind?</p>
            <p className="text-sm text-muted mb-4">Get in touch.</p>
            <a href="mailto:contact@lightscout.co.uk" className="text-xs uppercase tracking-wider text-accent hover:underline">
              contact@lightscout.co.uk ↗
            </a>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-wider text-muted mb-6">// Find me</h5>
            <p className="text-xs leading-loose">
              Upwork ↗<br />
              LinkedIn ↗<br />
              Lightscout.co.uk ↗<br />
              GitHub ↗
            </p>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-wider text-muted mb-6">// Based</h5>
            <p className="text-xs leading-loose">
              London, UK<br />
              +44 7512 169913<br />
              <br />
              Available for<br />
              select contract work.
            </p>
          </div>
        </div>
        <div className="border-t border-dashed border-border pt-6 flex justify-between text-xs text-muted">
          <span>JUAN SILVA // CASE LOG // v0.3</span>
          <span>© 2026 Juan Silva</span>
        </div>
      </footer>
    </div>
  )
}

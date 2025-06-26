import Link from "next/link"
import Image from "next/image"
import { Github, Mail, Linkedin, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { AnimatedSection } from "@/components/animated-section"
import { ProjectsDropdown } from "@/components/projects-dropdown"

export default function HomePage() {
  const projects = [
    {
      title: "NYC Weather App",
      description:
        "A weather app with authentic New York personality - weather descriptions that sound like a real New Yorker is giving you the forecast.",
      summary:
        "This project showcases creative UX writing and API integration, featuring humorous, NYC-themed weather descriptions that bring personality to everyday weather data.",
      image: "/images/nyc-weather-app.png",
      technologies: ["HTML", "JavaScript", "CSS", "Weather API", "Replit"],
      githubUrl: "https://github.com/wruppel-projects/replit-weather-v4",
      liveUrl: "https://wruppel-projects.github.io/replit-weather-v4/",
    },
    {
      title: "Dog Data by Neighborhood",
      description:
        "A data visualization project mapping dog statistics across NYC neighborhoods with interactive tooltips.",
      summary:
        "This project showcases my expertise in data visualization and geographic mapping, featuring choropleth maps with real-time data overlays and interactive user interfaces.",
      image: "/images/interactive-map.png",
      technologies: ["HTML", "JavaScript", "GeoJSON", "ChatGPT"],
      githubUrl: "https://github.com/wruppel-projects/nyc-dog-data",
      liveUrl: "https://wruppel-projects.github.io/nyc-dog-data/",
    },
    {
      title: "NYC Restaurant Radar",
      description:
        "A restaurant search tool that helps you discover highly-rated NYC restaurants tailored to your taste, location, and budget preferences.",
      summary:
        "Built with Replit, this interactive application features an intuitive cuisine selection interface and personalized restaurant recommendations based on user preferences.",
      image: "/images/nyc-restaurant-radar.png",
      technologies: ["Google Places API", "Geolocation API", "Replit"],
      liveUrl: "https://nyc-restaurant-radar.replit.app/",
    },
    {
      title: "On This Day in Grateful Dead History",
      description:
        "A daily discovery tool that finds Grateful Dead concerts from this date in history and provides links to listen to the shows.",
      summary:
        "Every time you visit, this app searches through decades of Grateful Dead concert history to find shows that happened on today's date, connecting fans with historical performances.",
      image: "/images/grateful-dead-history.png",
      technologies: ["JavaScript", "Date API", "Archive.org API", "Replit"],
      liveUrl: "https://today-in-grateful-dead.replit.app/",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="https://willruppel.xyz" className="hover:opacity-80 transition-opacity">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
          <nav className="hidden md:flex gap-6">
            
            
            
          </nav>
          <div className="flex items-center gap-2">
            <Link href="https://www.linkedin.com/in/wjruppel/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <ProjectsDropdown />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <AnimatedSection>
          <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
            {/* Background Image positioned to start 1/3 from left */}
            <div className="absolute inset-0 z-0">
              <div className="relative w-full h-full">
                <Image
                  src="/images/hero-digital-wave.png"
                  fill
                  alt="Digital wave art blending traditional Japanese wave aesthetics with modern pixel art elements"
                  className="object-cover object-left"
                  style={{ objectPosition: "33% center" }}
                  priority
                />
              </div>
            </div>

            {/* Gradient Overlay - heavy black on left, transparent on right */}
            <div
              className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/80 to-transparent"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 75%, transparent 100%)",
              }}
            />

            {/* Content */}
            <div className="relative z-20 container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                      Hi, I'm Will Ruppel
                    </h1>
                    <p className="max-w-[600px] text-white/90 md:text-xl">
                      I work in digital product management and love building things in my spare time. I'm fascinated by
                      mapping, navigation, transit, weather, AI, and finding creative ways to solve everyday problems.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="#projects">
                      <Button className="w-full min-[400px]:w-auto bg-white text-black hover:bg-white/90">
                        View My Projects
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* Empty space for image visibility */}
                <div className="hidden lg:block"></div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Here's a collection of my personal projects. Each one represents a unique challenge and learning
                    experience.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
                {projects.map((project, index) => (
                  <AnimatedSection key={index} delay={300 + index * 100}>
                    <ProjectCard {...project} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <section id="about" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <Image
                  src="/images/about-me-illustration.png"
                  width={550}
                  height={550}
                  alt="Illustrated portrait of Will Ruppel hiking with his dog in a mountain setting"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-contain bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      I'm a product manager who enjoys working on digital experiences, especially in the checkout and
                      payments space.
                    </p>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      During my free time, I like to tinker with side projects that explore things I find interesting -
                      like mapping data, weather patterns, restaurant discovery, and experimenting with different APIs
                      and tools.
                    </p>
                    <p>
                      These projects give me a chance to learn new technologies and try out ideas outside of my day job.
                      Some work out better than others, but I enjoy the process of building and learning along the way.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="https://www.linkedin.com/in/wjruppel/" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full min-[400px]:w-auto">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Have a question or want to work together? Feel free to reach out!
                  </p>
                </div>
              </div>
              <div className="mx-auto max-w-2xl py-12">
                <div className="flex flex-col justify-center space-y-6">
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Contact Information</h3>
                    <p className="text-muted-foreground">I'm always open to new opportunities and collaborations.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-3">
                      <Mail className="h-5 w-5" />
                      <a
                        href="mailto:willruppel1@gmail.com"
                        className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                      >
                        willruppel1@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Github className="h-5 w-5" />
                      <a
                        href="https://github.com/wruppel-projects"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                      >
                        github.com/wruppel-projects
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Linkedin className="h-5 w-5" />
                      <a
                        href="https://www.linkedin.com/in/wjruppel/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                      >
                        linkedin.com/in/wjruppel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Will Ruppel. All rights reserved.
            </p>
            <p className="text-center text-xs text-muted-foreground/70 md:text-left">
              About this site: Built with{" "}
              <a
                href="https://v0.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-foreground transition-colors underline"
              >
                v0.dev
              </a>{" "}
              and enhanced with{" "}
              <a
                href="https://www.immersity.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-foreground transition-colors underline"
              >
                Immersity AI
              </a>{" "}
              for image creation.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/wruppel-projects" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/wjruppel/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

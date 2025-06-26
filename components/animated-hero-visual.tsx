"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function AnimatedHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let animationId: number
    let time = 0

    // Ball physics
    const balls: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      trail: Array<{ x: number; y: number; opacity: number }>
    }> = []

    // Gears
    const gears: Array<{
      x: number
      y: number
      radius: number
      rotation: number
      speed: number
      teeth: number
      color: string
    }> = []

    // Pendulums
    const pendulums: Array<{
      x: number
      y: number
      length: number
      angle: number
      velocity: number
      color: string
    }> = []

    // Pulleys and ropes
    const pulleys: Array<{
      x: number
      y: number
      radius: number
      rotation: number
      speed: number
      color: string
    }> = []

    // Dominoes
    const dominoes: Array<{
      x: number
      y: number
      width: number
      height: number
      angle: number
      falling: boolean
      fallSpeed: number
      color: string
    }> = []

    // Initialize Rube Goldberg elements
    const initElements = () => {
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      // Create balls
      balls.push({
        x: w * 0.1,
        y: h * 0.2,
        vx: 2,
        vy: 0,
        radius: 8,
        color: "#3b82f6",
        trail: [],
      })

      // Create gears
      gears.push(
        { x: w * 0.3, y: h * 0.4, radius: 30, rotation: 0, speed: 0.02, teeth: 8, color: "#6366f1" },
        { x: w * 0.45, y: h * 0.4, radius: 20, rotation: 0, speed: -0.03, teeth: 6, color: "#8b5cf6" },
        { x: w * 0.7, y: h * 0.6, radius: 25, rotation: 0, speed: 0.025, teeth: 7, color: "#a855f7" },
      )

      // Create pendulums
      pendulums.push(
        { x: w * 0.6, y: h * 0.2, length: 60, angle: Math.PI / 4, velocity: 0, color: "#ec4899" },
        { x: w * 0.8, y: h * 0.3, length: 40, angle: -Math.PI / 6, velocity: 0, color: "#f59e0b" },
      )

      // Create pulleys
      pulleys.push(
        { x: w * 0.2, y: h * 0.7, radius: 15, rotation: 0, speed: 0.04, color: "#10b981" },
        { x: w * 0.5, y: h * 0.8, radius: 12, rotation: 0, speed: -0.05, color: "#06b6d4" },
      )

      // Create dominoes
      for (let i = 0; i < 5; i++) {
        dominoes.push({
          x: w * 0.75 + i * 25,
          y: h * 0.8,
          width: 4,
          height: 20,
          angle: 0,
          falling: false,
          fallSpeed: 0,
          color: "#ef4444",
        })
      }
    }

    initElements()

    // Draw gear
    const drawGear = (gear: (typeof gears)[0]) => {
      ctx.save()
      ctx.translate(gear.x, gear.y)
      ctx.rotate(gear.rotation)

      // Draw gear body
      ctx.fillStyle = gear.color
      ctx.globalAlpha = 0.8
      ctx.beginPath()
      ctx.arc(0, 0, gear.radius * 0.7, 0, Math.PI * 2)
      ctx.fill()

      // Draw teeth
      ctx.fillStyle = gear.color
      ctx.globalAlpha = 1
      for (let i = 0; i < gear.teeth; i++) {
        const angle = (i / gear.teeth) * Math.PI * 2
        ctx.save()
        ctx.rotate(angle)
        ctx.fillRect(-2, gear.radius * 0.7, 4, gear.radius * 0.3)
        ctx.restore()
      }

      // Draw center
      ctx.fillStyle = "#374151"
      ctx.beginPath()
      ctx.arc(0, 0, gear.radius * 0.2, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // Draw pendulum
    const drawPendulum = (pendulum: (typeof pendulums)[0]) => {
      const endX = pendulum.x + Math.sin(pendulum.angle) * pendulum.length
      const endY = pendulum.y + Math.cos(pendulum.angle) * pendulum.length

      // Draw string
      ctx.strokeStyle = "#6b7280"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(pendulum.x, pendulum.y)
      ctx.lineTo(endX, endY)
      ctx.stroke()

      // Draw pivot
      ctx.fillStyle = "#374151"
      ctx.beginPath()
      ctx.arc(pendulum.x, pendulum.y, 3, 0, Math.PI * 2)
      ctx.fill()

      // Draw bob
      ctx.fillStyle = pendulum.color
      ctx.beginPath()
      ctx.arc(endX, endY, 8, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw pulley
    const drawPulley = (pulley: (typeof pulleys)[0]) => {
      ctx.save()
      ctx.translate(pulley.x, pulley.y)

      // Draw pulley wheel
      ctx.strokeStyle = pulley.color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(0, 0, pulley.radius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw rope
      ctx.save()
      ctx.rotate(pulley.rotation)
      ctx.strokeStyle = "#92400e"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(-pulley.radius, 0)
      ctx.lineTo(pulley.radius, 0)
      ctx.stroke()
      ctx.restore()

      ctx.restore()
    }

    // Draw domino
    const drawDomino = (domino: (typeof dominoes)[0]) => {
      ctx.save()
      ctx.translate(domino.x, domino.y)
      ctx.rotate(domino.angle)

      ctx.fillStyle = domino.color
      ctx.fillRect(-domino.width / 2, -domino.height, domino.width, domino.height)

      // Draw dots
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(0, -domino.height * 0.7, 1, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(0, -domino.height * 0.3, 1, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // Draw conveyor belt
    const drawConveyorBelt = () => {
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      ctx.strokeStyle = "#6b7280"
      ctx.lineWidth = 8
      ctx.lineCap = "round"

      // Belt segments
      const segments = 20
      for (let i = 0; i < segments; i++) {
        const x = w * 0.1 + (i / segments) * (w * 0.8)
        const y = h * 0.9
        const offset = (time * 50 + i * 10) % 20

        ctx.globalAlpha = 0.3 + Math.sin(offset * 0.1) * 0.2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + 15, y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const animate = () => {
      time += 0.016 // ~60fps

      // Clear canvas
      ctx.fillStyle = "rgba(248, 250, 252, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      // Draw conveyor belt
      drawConveyorBelt()

      // Update and draw balls
      balls.forEach((ball) => {
        // Add to trail
        ball.trail.push({ x: ball.x, y: ball.y, opacity: 1 })
        if (ball.trail.length > 15) ball.trail.shift()

        // Update trail opacity
        ball.trail.forEach((point, index) => {
          point.opacity = index / ball.trail.length
        })

        // Draw trail
        ball.trail.forEach((point) => {
          ctx.globalAlpha = point.opacity * 0.5
          ctx.fillStyle = ball.color
          ctx.beginPath()
          ctx.arc(point.x, point.y, ball.radius * point.opacity, 0, Math.PI * 2)
          ctx.fill()
        })

        // Physics
        ball.vy += 0.2 // gravity
        ball.x += ball.vx
        ball.y += ball.vy

        // Bounce off edges
        if (ball.x + ball.radius > w || ball.x - ball.radius < 0) {
          ball.vx *= -0.8
          ball.x = Math.max(ball.radius, Math.min(w - ball.radius, ball.x))
        }
        if (ball.y + ball.radius > h * 0.85) {
          ball.vy *= -0.7
          ball.y = h * 0.85 - ball.radius
          ball.vx *= 0.9
        }

        // Reset ball periodically
        if (ball.y > h) {
          ball.x = w * 0.1
          ball.y = h * 0.2
          ball.vx = 2 + Math.random()
          ball.vy = 0
          ball.trail = []
        }

        // Draw ball
        ctx.globalAlpha = 1
        ctx.fillStyle = ball.color
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fill()

        // Ball highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.beginPath()
        ctx.arc(ball.x - 2, ball.y - 2, ball.radius * 0.4, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update and draw gears
      gears.forEach((gear) => {
        gear.rotation += gear.speed
        drawGear(gear)
      })

      // Update and draw pendulums
      pendulums.forEach((pendulum) => {
        const gravity = 0.001
        const damping = 0.999

        pendulum.velocity += -gravity * Math.sin(pendulum.angle)
        pendulum.velocity *= damping
        pendulum.angle += pendulum.velocity

        drawPendulum(pendulum)
      })

      // Update and draw pulleys
      pulleys.forEach((pulley) => {
        pulley.rotation += pulley.speed
        drawPulley(pulley)
      })

      // Update and draw dominoes
      dominoes.forEach((domino, index) => {
        if (!domino.falling && index > 0 && dominoes[index - 1].falling && dominoes[index - 1].angle > 0.3) {
          domino.falling = true
        }

        if (domino.falling) {
          domino.fallSpeed += 0.002
          domino.angle += domino.fallSpeed
          domino.angle = Math.min(domino.angle, Math.PI / 2)
        }

        drawDomino(domino)
      })

      // Trigger first domino occasionally
      if (Math.sin(time * 0.5) > 0.98 && !dominoes[0].falling) {
        dominoes.forEach((d) => {
          d.falling = false
          d.angle = 0
          d.fallSpeed = 0
        })
        dominoes[0].falling = true
      }

      // Draw connecting elements
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])

      // Connect some elements with dashed lines
      ctx.beginPath()
      ctx.moveTo(gears[0].x + gears[0].radius, gears[0].y)
      ctx.lineTo(gears[1].x - gears[1].radius, gears[1].y)
      ctx.stroke()

      ctx.setLineDash([])

      // Image animation
      if (containerRef.current) {
        const container = containerRef.current
        const imageElement = container.querySelector(".hero-image") as HTMLElement

        if (imageElement) {
          // Very subtle zoom in/out effect
          const scale = 1 + Math.sin(time) * 0.02

          // Very subtle horizontal drift
          const translateX = Math.sin(time * 0.7) * 2

          // Very subtle vertical drift
          const translateY = Math.cos(time * 0.5) * 1

          imageElement.style.transform = `scale(${scale}) translateX(${translateX}px) translateY(${translateY}px)`
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900"
    >
      {/* Animated overlay for subtle digital effect */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>

      {/* Main image */}
      <div className="relative w-full h-full">
        <Image
          src="/images/wave-of-future.png"
          fill
          alt="The Wave of the Future - Digital art blending traditional Japanese waves with modern technology"
          className="hero-image object-cover transition-transform duration-1000 ease-out"
          priority
        />
      </div>

      {/* Subtle animated overlay particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Gradient overlay for better text readability when used as background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  summary: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  isComingSoon?: boolean
}

export function ProjectCard({
  title,
  description,
  summary,
  image,
  technologies,
  githubUrl,
  liveUrl,
  isComingSoon = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            fill
            alt={title}
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between p-6">
        <div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="line-clamp-2 text-base mt-2">{description}</CardDescription>
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
        <p className="mt-4 text-muted-foreground">{summary}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex w-full items-center justify-between">
          {isComingSoon ? (
            <Button variant="outline" disabled className="gap-1 bg-background text-foreground">
              Coming Soon
            </Button>
          ) : githubUrl ? (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-1 bg-background text-foreground">
                <Github className="h-4 w-4" />
                View on GitHub
              </Button>
            </Link>
          ) : liveUrl ? (
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-1 bg-background text-foreground">
                <ExternalLink className="h-4 w-4" />
                Visit Website
              </Button>
            </Link>
          ) : null}

          {!isComingSoon && liveUrl && githubUrl && (
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Visit Live Site</span>
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

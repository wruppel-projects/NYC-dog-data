"use client"

import Link from "next/link"
import { ChevronDown, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const projects = [
  {
    title: "NYC Weather App",
    url: "https://wruppel-projects.github.io/replit-weather-v4/",
  },
  {
    title: "Dog Data by Neighborhood",
    url: "https://wruppel-projects.github.io/nyc-dog-data/",
  },
  {
    title: "NYC Restaurant Radar",
    url: "https://nyc-restaurant-radar.replit.app/",
  },
  {
    title: "On This Day in Grateful Dead History",
    url: "https://today-in-grateful-dead.replit.app/",
  },
]

export function ProjectsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-1">
          Projects
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {projects.map((project) => (
          <DropdownMenuItem key={project.title} asChild>
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full cursor-pointer"
            >
              <span className="truncate">{project.title}</span>
              <ExternalLink className="h-4 w-4 ml-2 flex-shrink-0" />
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

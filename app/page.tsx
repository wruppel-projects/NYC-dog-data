import type React from "react"
import ProjectCard from "../components/project-card"

const projects = [
  {
    title: "My Portfolio",
    description: "A personal portfolio website built with Next.js and Tailwind CSS.",
    imageUrl: "/portfolio.png",
    linkUrl: "https://willruppel.com",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Another Project",
    description: "A description of another project.",
    imageUrl: "/project2.png",
    linkUrl: "https://example.com",
    technologies: ["React", "Node.js", "Express"],
  },
]

const Page: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  )
}

export default Page

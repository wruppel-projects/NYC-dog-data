import type React from "react"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  linkUrl: string
  technologies: string[]
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, linkUrl, technologies }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl || "/placeholder.svg"} alt={title} />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 text-base mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Project
        </a>
      </div>
    </div>
  )
}

export default ProjectCard

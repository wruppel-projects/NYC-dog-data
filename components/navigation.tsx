import { Home } from "lucide-react"

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <a
            href="https://willruppel.com"
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="https://willruppel.com" className="hover:text-blue-600 transition-colors" aria-label="Home">
            <Home className="h-6 w-6" />
          </a>
        </li>
        {/* Add more navigation items here */}
      </ul>
    </nav>
  )
}

export default Navigation

import { Shield } from "lucide-react"

const Navbar = () => {
    return (
        <nav className="opacity-97 bg-bg_100 shadow absolute z-50 w-full top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-text_100">QuietVPN</span>
            </div>
            <div className="flex items-center">
              <button className="ml-4 px-4 py-2 text-sm text-gray-400 hover:text-gray-900">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>  
    )
}

export default Navbar
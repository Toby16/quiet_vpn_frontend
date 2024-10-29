import { Menu, Shield, X } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const navlinks = [
  { name: "Home", link: "/home" },
  { name: "Select a Server", link: "/servers" },
  { name: "My Plans", link: "/myplans" },
  { name: "How to use", link: "/tutorials" },
]

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="opacity-90 bg-bg_100 shadow fixed z-50 w-full top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          <div className="flex items-center">
            <Shield className="w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-text_100">QuietVPN</span>
          </div>

          {/* right side of ave bar */}
          <div className="flex items-center">

            {/* wide scren nav links */}
            <div className="hidden md:flex">

              {
                navlinks.map((link, index) => {
                  return (
                    <button
                      onClick={() => navigate(link.link)}
                      key={index}
                      className="ml-4 px-4 py-2 text-sm text-text_200 hover:text-indigo-600"
                    >
                      {link.name}
                    </button>
                  )
                })
              }

              <button
                onClick={() => {
                  navigate("/signup")
                }}
                className="ml-4 px-4 py-2 text-sm text-text_200 hover:text-red-600">
                Logout
              </button>
            </div>

            {/* mobile and tab nav lins */}
            <div className="md:hidden">
              <button className="flex flex-center" onClick={() => setMenuOpen(!menuOpen)}>
                {
                  menuOpen ?
                    <X className="size-fit text-text_100" />
                    :
                    <Menu className="size-fit text-text_100 " />
                }
              </button>
              {
                menuOpen ?
                  <div className="absolute h-[100vh] right-0 flex flex-col top-16 py-6 px-5 gap-3 rounded-b-md z-30 bg-bg_100">
                    {
                      navlinks.map((link, index) => {
                        return (
                          <button
                            onClick={() => {navigate(link.link);setMenuOpen(false); }}
                            key={index}
                            className="ml-4 px-4 py-2 text-sm text-text_200 hover:text-indigo-600"
                          >
                            {link.name}
                          </button>
                        )
                      })
                    }
                       <button
                onClick={() => {
                  navigate("/signup")
                }}
                className="ml-4 px-4 py-2 text-sm text-text_200 hover:text-red-600">
                Logout
              </button>
                  </div>
                  : <></>
              }

            </div>
          </div>


        </div>
      </div>
    </nav>
  )
}

export default Navbar
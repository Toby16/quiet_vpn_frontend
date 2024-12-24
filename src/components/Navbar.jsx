import { Ghost, Menu, X } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider";
import ScrollingText from "./ScrollingText";

const navlinks = [
  { name: "Home", link: "/" },
  { name: "Select a Server", link: "/servers" },
  { name: "My Plans", link: "/purchases" },
  { name: "How to use", link: "/tutorials" },
]



const Navbar = ({ currentPage }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false)
  const { handleLogout } = useAuth();

  return (
    <nav className="opacity-95 bg-bg_100 shadow fixed z-50 w-full top-0">
      <div onClick={() => setMenuOpen(false)} className={`${menuOpen ? "fixed inset-0 bg-black/50" : "hidden"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between h-16">

          {/* left side of nav bar */}
          <div className="flex items-center">
            <Ghost className="w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-text_100">GhostRoute VPN</span>
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
                      className={`ml-4 px-4 py-2 text-md ${currentPage == link.link ? "text-indigo-600" : "text-text_200"} hover:text-indigo-600`}
                    >
                      {link.name}
                    </button>
                  )
                })
              }

              <button
                onClick={() => {
                  handleLogout()
                }}
                className="ml-4 px-4 py-2 text-md text-text_200 hover:text-red-400">
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
                  <div className="absolute h-[100v] right-0 flex flex-col top-16 py-6 px-5 gap-3 rounded-b-md z-10 bg-bg_100 shadow">
                    {
                      navlinks.map((link, index) => {
                        return (
                          <button
                            onClick={() => { navigate(link.link); setMenuOpen(false); }}
                            key={index}
                            className={`ml-4 px-4 py-2 text-sm ${currentPage == link.link ? "text-indigo-600" : "text-text_200"} hover:text-indigo-600`}
                          >
                            {link.name}
                          </button>
                        )
                      })
                    }
                    <button
                      onClick={() => {
                        handleLogout()
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
        <ScrollingText text={"Enjoy 12GB data free on any network after your first 2 purchases!"} />
    </nav>
  )
}

export default Navbar
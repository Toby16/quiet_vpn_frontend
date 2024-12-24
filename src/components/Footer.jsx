import { Instagram, Twitter } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer>
            <div className="container mx-auto py-6 px-4 text-text_100">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Name */}
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl font-bold text-violet-600">GhostRoute VPN</h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-4">
                        <a href="/about" className="hover:text-violet-600 transition-colors">
                            About Us
                        </a>
                        <a  onClick={(e)=>{
                            e.preventDefault();
                            navigate("/servers")
                        }} className="hover:text-violet-600 transition-colors">
                            Plans
                        </a>
                        <a href="#faq" className="hover:text-violet-600 transition-colors">
                            FAQ
                        </a>
                        <a href="/contact" className="hover:text-violet-600 transition-colors">
                            Contact
                        </a>
                    </div>

                    {/* Social Media */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a
                            href="#"
                            className="text-violet-600 hover:text-violet-400 transition-colors"
                            aria-label="Twitter"
                        >
                            <Instagram />
                        </a>
                        <a
                            href="#"
                            className="text-violet-600 hover:text-violet-400 transition-colors"
                            aria-label="Facebook"
                        >
                            <Twitter />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                {/* <div className="text-center mt-4 text-sm">
                    <p>© {new Date().getFullYear()} Quiet VPN. All rights reserved.</p>
                </div> */}
            </div>
        </footer>
    )
}

export default Footer
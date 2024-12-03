const Footer = () => {

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
                        <a href="/plans" className="hover:text-violet-600 transition-colors">
                            Plans
                        </a>
                        <a href="/faq" className="hover:text-violet-600 transition-colors">
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 19h12M3 12h18M4 5h16"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-violet-600 hover:text-violet-400 transition-colors"
                            aria-label="Facebook"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 19h12M3 12h18M4 5h16"
                                />
                            </svg>
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
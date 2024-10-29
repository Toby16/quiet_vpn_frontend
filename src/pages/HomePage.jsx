import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate()

  return (

    <div className="min-h-screen bg-bg_100">
    {/* navbar */}
    <Navbar />


    <main className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
      <div className="px-4sm:px-0">
        <div className="h-screen rid gap-6 md:grid-cols-2">


          <div className="w-full flex flex-col flex-center h-full gap-4 max-w-[25rem] text-center mx-auto my-auto">
            <p className="font-bold text-5xl sm:text-7xl text-white ">
              Fast, Safe, Secure
            </p>
            <p className="text-xl md:text-2xl text-text_200">
              Enjoy fast seure vpn connections to a variety of countries, pay for as much or as little time as you need, no subscriptions!
            </p>
            <button onClick={() => navigate("/servers")} className="mt-2 w-full flex flex-center h-12 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Select a Server
            </button>
          </div>

        </div>
      </div>
    </main>
  </div>
  )
};

export default HomePage;
import ServerCard from "../components/ServerCard"
import Navbar from "../components/Navbar";
import axiosInstance from "../axios";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const ServersPage = () => {
  const [servers, setServers] = useState([])
  const [selectedPlan, setSelectedPlan] = useState();
  const [viewMode, setViewMode] = useState("list"); // "list" or "details"
  const [amountOfDays, setAmountOfDays] = useState(1)
  const [processingTransaction, setProcessingTransaction] = useState(false)

  const [touchStartX, setTouchStartX] = useState(0); // To track swipe start
  const [touchEndX, setTouchEndX] = useState(0); // To track swipe end


  const updateAmountOfDays = (newAmount) => {
    setAmountOfDays(Math.max(1, newAmount)); // Ensure minimum of 1
  };


  const handleSwipe = () => {
    const swipeThreshold = 50; // Minimum swipe distance to trigger an action
    if (touchStartX - touchEndX > swipeThreshold && viewMode === "list" && selectedPlan) {
      setViewMode("details"); // Swipe left
    } else if (touchEndX - touchStartX > swipeThreshold && viewMode === "details") {
      setViewMode("list"); // Swipe right
    }
  };

  const handleTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.targetTouches[0].clientX);
  const handleTouchEnd = () => handleSwipe();

  const get_all_servers = async () => {
    try {
      const servers_request = await axiosInstance.get("/server/get_all_servers/")
      setServers(servers_request.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const checkout = async () => {
    setProcessingTransaction(true)
    const payload = {
      "days_paid": amountOfDays,
      "server_ip": selectedPlan.server_ip,
      "redirect_url": "http://localhost:5173/verifypayment"
    }
    try {
      const checkout_request = await axiosInstance.post("/payment/flutterwave/", payload)
      localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan))
      window.open(checkout_request.data.data.link, "_blank")
    } catch (error) {
      console.log(error)

    }
    setProcessingTransaction(false)
  }

  useEffect(() => {
    get_all_servers()
  }, [])

  const TitleAndSubtitle = ({ title, subtitle }) => {
    return (
      <div>
        <p className="text-text_200 text-md font-bold">{title}: </p>
        <p className="text-text_200 text-xl">{subtitle}</p>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-bg_100 pt-16">
      {/* navbar */}
      <Navbar />


      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          {/* Sliding container */}
          <div

            className={`flex transition-transform duration-500 ${viewMode === "details" ? "-translate-x-1/2" : "translate-x-0"
              }`}
            style={{ width: "200%" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >

            {/* Server list */}
            <div className="w-1/2 p-4">
              <div className="grid gap-6 mb-8 md:grid-cols-3">
                {servers.length > 0 ? (
                  servers.map((server) => (
                    <ServerCard
                      key={server.id}
                      server={server}
                      callback={() => {
                        setSelectedPlan(server);
                        setViewMode("details");
                      }}
                    />
                  ))
                ) : (
                  <p>No servers available at the moment</p>
                )}
              </div>
            </div>

            {/* Selected plan adjustment */}
            <div className="w-1/2 p-4 ">
              {/* <button
                className="mb-4 flex flex-center pl-2 pr-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setViewMode("list")}
              >
                <ChevronLeftIcon size={20}/>
                Back to Servers
              </button> */}

              {selectedPlan ? (
                <section className="flex gap-2 flex-col px-6 py-8 bg-bg_200">
                  <h2 className="text-3xl font-bold mb-4 text-text_100">Adjust Selected Plan</h2>
                  <TitleAndSubtitle title={'Location'} subtitle={selectedPlan.location} />
                  <TitleAndSubtitle title={'Price (per day)'} subtitle={selectedPlan.price} />

                  <div className="">

                    <p className="text-text_200 text-md font-bold mb-2">For how many days?: </p>

                    <div className="flex items-center gap-4">
                      <button
                        className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-violet-300"
                        onClick={() => updateAmountOfDays(amountOfDays - 1)}
                      >
                        <Minus size={20} />
                      </button>
                      <input
                        type="number"
                        value={amountOfDays}
                        onChange={(e) => updateAmountOfDays(Number(e.target.value))}
                        className="w-20 h-10 text-center text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-violet-400"
                      />
                      <button
                        className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-violet-300"
                        onClick={() => updateAmountOfDays(amountOfDays + 1)}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  <TitleAndSubtitle title={'Net Price'} subtitle={selectedPlan.price * amountOfDays} />

                  <p className="text-text_200 text-md font-bold mb-1 mt-6">Proceed to flutterwave </p>
                  <button
                    className={`w-full ${processingTransaction ? 'animate-pulse' : ''} py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition`}
                    onClick={checkout}
                  >
                    {
                      processingTransaction ?
                        <LoadingSpinner />
                        :
                        "Checkout"
                    }
                  </button>



                </section>
              ) : (
                <p>No plan selected</p>
              )}
            </div>
          </div>
        </div >
      </main >
    </div >
  )
};

export default ServersPage;
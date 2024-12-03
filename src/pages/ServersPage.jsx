import ServerCard from "../components/ServerCard"
import Navbar from "../components/Navbar";
import axiosInstance from "../axios";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, Minus, Plus } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const ServersPage = () => {
  const [servers, setServers] = useState([])
  const [selectedPlan, setSelectedPlan] = useState();
  const [viewMode, setViewMode] = useState("list"); // "list" or "details"
  const [amountOfDays, setAmountOfDays] = useState(1)
  const [processingTransaction, setProcessingTransaction] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [manualRedirect, setManualRedirect] = useState(false)
  const [flutterwavePaymentURL, setFlutterwavePaymentURL] = useState('')

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
    let redirect_url = "http://localhost:5173/verifypayment"
    const payload = {
      "days_paid": amountOfDays,
      "server_ip": selectedPlan.server_ip,
      "redirect_url": redirect_url
    }
    try {
      const checkout_request = await axiosInstance.post("/payment/flutterwave/", payload)
      const user_profile = await axiosInstance.get("/account/user_profile/")
      const username = user_profile.data.data.username
      let plan = structuredClone(selectedPlan)
      plan.username = username
      localStorage.setItem("selectedPlan", JSON.stringify(plan))
      setRedirecting(true)
      setTimeout(() => {
        setManualRedirect(true)
      }, 2000)
      // let currentURL = window.location.href
      // console.log(user_profile)
      setFlutterwavePaymentURL(checkout_request.data.data.link)
      window.open(checkout_request.data.data.link, "_blank")
    } catch (error) {
      // console.log(error)
      error
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
      <Navbar currentPage={"/servers"} />


      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          <p className="text-text_100 text-3xl px-6 sm:px-0 py-6 font-bold">Select a Server</p>

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
            <div className="w-1/2 px-6 sm:px-0">
              <div className="grid gap-6 mb-8 sm:grid-cols-3">
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
                  <div className="bg-bg_200/50 rounded-md p-6">
                    <p className="text-xl flex gap-3 items-center text-text_100">
                      Loading Servers... <LoadingSpinner />
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Selected plan adjustment */}
            <div className="w-1/2 ">


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
                        className="w-20 h-10 text-center font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-violet-400"
                      />
                      <button
                        className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-violet-300"
                        onClick={() => updateAmountOfDays(amountOfDays + 1)}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  <TitleAndSubtitle title={'Net Price'} subtitle={
                    <>

                      <span className="text-indigo-400">
                        {"₦" + selectedPlan.price}
                      </span>
                      {" "} per day for {" "}
                      <span className="text-indigo-400">
                        {amountOfDays} days
                      </span>
                      {" "} =  {" "}
                      <span className="text-indigo-600 font-bold">
                        {"₦" + selectedPlan.price * amountOfDays}
                      </span>
                    </>
                  } />

                  <p className="text-text_200 text-md font-bold mb-1 mt-6">Proceed to flutterwave </p>
                  <button
                    className={`w-full ${processingTransaction ? 'animate-pulse' : ''} py-3 flex flex-center text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition`}
                    onClick={checkout}
                  >
                    {
                      processingTransaction ?
                        <LoadingSpinner />
                        :
                        <>
                          {redirecting ?
                            "Redirecting to flutterwave..."
                            : "Checkout"
                          }
                        </>
                    }

                  </button>
                  <button
                    className={`w-full ${processingTransaction ? 'animate-pulse' : ''} py-3 flex flex-center text-lg font-semibold text-white rounded-md hover:bg-bg_300 transition`}
                    onClick={() => setViewMode("list")}
                  >
                    <ChevronLeftIcon size={20} />
                    Back to Servers
                  </button>
                  {/* incase we ned to manuall redirect */}
                  {
                    manualRedirect ?
                      <p className="text-indigo-600 underline cursor-pointer" onClick={() => {
                        window.open(flutterwavePaymentURL, "_blank")
                      }}>
                        If you have not been redirectd, click here
                      </p> : <></>
                  }



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
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
  const [timeLength, settimeLength] = useState(1)
  const [processingTransaction, setProcessingTransaction] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [manualRedirect, setManualRedirect] = useState(false)
  const [PaymentURL, setPaymentURL] = useState('')

  const [timePeriod, setTimePeriod] = useState("Days")
  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value)
  }

  const [touchStartX, setTouchStartX] = useState(0); // To track swipe start
  const [touchEndX, setTouchEndX] = useState(0); // To track swipe end


  const updatetimeLength = (newAmount) => {
    settimeLength(Math.max(1, newAmount)); // Ensure minimum of 1
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
    let redirect_url = "https://security.ghostroute.io/" + "/verifypayment"
    // redirect_url = "http://localhost:5173/verifypayment"

    const url = new URL(redirect_url);

    try {
      const payment_payload = {
        "days_paid": timeLength * (timePeriod == "months" ? 30 : 1),
        "server_ip": selectedPlan.server_ip,
      }
      const createPayment_request = await axiosInstance.post("/payment/create/", payment_payload)
      const trans_id = createPayment_request.data.trans_id
      // redirect_url += "?trans_id="+trans_id
      url.searchParams.set("trans_id", trans_id)
      // console.log(url)

      const paystack_payload = {
        "trans_id": trans_id,
        "redirect_url": url
      }

      const checkout_request = await axiosInstance.post("/payment/paystack/", paystack_payload)
      // console.log(checkout_request)


      setRedirecting(true)
      setTimeout(() => {
        setManualRedirect(true)
      }, 2000)
      // let currentURL = window.location.href
      // console.log(user_profile)
      setPaymentURL(checkout_request.data.response.authorization_url)
      window.open(checkout_request.data.response.authorization_url, "_blank")
      setRedirecting(false)
    } catch (error) {
      // console.error(error)
      // error
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

  const getTotalPrice = () => {
    let price = "₦" + (selectedPlan.price * timeLength * (timePeriod == "months" ? 30 : 1)).toFixed(2)
    return price
  }

  return (

    <div className="min-h-screen bg-bg_100 pt-16">
      {/* navbar */}
      <Navbar currentPage={"/servers"} />


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
            <div className="w-1/2 px-6 sm:px-0 h-screen overflow-y-scroll">
              <p className="text-text_100 text-3xl px-0 sm:px-0 py-6 font-bold">Select a Server</p>
              <div className="grid gap-6 mb-8 sm:grid-cols-2 xl:grid-cols-3 ">
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
                <section className="flex gap-2 flex-col px-6 py-8 mx-6 bg-bg_200">
                  <h2 className="text-3xl font-bold mb-4 text-text_100">Adjust Selected Plan</h2>
                  <TitleAndSubtitle title={'Location'} subtitle={<span className="flex items-center gap-2">
                    <img className="h-6 inline" src={selectedPlan.flag_url} />
                    {selectedPlan.location}
                  </span>} />
                  <TitleAndSubtitle title={'Price (per day)'} subtitle={"₦" + selectedPlan.price} />

                  <div className="">

                    <p className="text-text_200 text-md font-bold mb-2">For how long?: </p>
                    <div className="flex gap-4">

                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-violet-300"
                          onClick={() => updatetimeLength(timeLength - 1)}
                        >
                          <Minus size={20} />
                        </button>
                        <input
                          type="number"
                          value={timeLength}
                          onChange={(e) => updatetimeLength(Number(e.target.value))}
                          className="w-20 h-10 text-center font-bold text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-violet-400"
                        />
                        <button
                          className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-violet-300"
                          onClick={() => updatetimeLength(timeLength + 1)}
                        >
                          <Plus size={20} />
                        </button>
                      </div>

                      <select
                        id="time-period"
                        name="time-period"
                        value={timePeriod}
                        onChange={handleTimePeriodChange}
                        className="rounded-md size-fit px-2 py-2"
                      >
                        <option value="days">Day{timeLength > 1 ? "s" : ""}</option>
                        <option value="months">Month{timeLength > 1 ? "s" : ""}</option>
                      </select>
                    </div>
                  </div>

                  <TitleAndSubtitle title={'Net Price'} subtitle={
                    <>

                      <span className="text-indigo-400">
                        {"₦" + selectedPlan.price}
                      </span>
                      {" "} per day for {" "}
                      <span className="text-indigo-400">
                        {
                          timePeriod == "months" ?
                            timeLength * 30 + " days"
                            :
                            timeLength + " days"
                        }
                      </span>
                      {" "} =  {" "}
                      <span className="text-indigo-600 font-bold">
                        {getTotalPrice()}
                      </span>
                    </>
                  } />

                  <p className="text-text_200 text-md font-bold mb-1 mt-6">Proceed to Paystack </p>
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
                            "Redirecting to paystack..."
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
                        window.open(PaymentURL, "_blank")
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
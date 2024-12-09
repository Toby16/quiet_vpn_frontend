import { useEffect, useState } from "react"
// import Footer from "../components/Footer"
// import Navbar from "../components/Navbar"
// import axiosInstance from "../axios";
import axios from "axios";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../components/AuthProvider";

const VerifyPaymentPage = () => {
    const [verified, setVerified] = useState(false)
    const [infoText, setInfoText] = useState("Your payment is being verified...")
    const [subInfoText, setSubInfoText] = useState("Try not to close this browser tab")
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const url = String(window.location.href)
            // console.log(url)
            const transaction_id = url.split('transaction_id')[1].substring(1)
            const plan = JSON.parse(localStorage.getItem("selectedPlan"))
            const payload = {
                "username": plan.username,
                "transaction_id": transaction_id,
                "days_paid": plan.price,
                "server_ip": plan.server_ip,
                "server_location": plan.location
            }
            // console.log(payload, "initial payload")
            await axios.post("https://quiet.pumpeet.me/payment/verify_flutterwave/", payload)
            setVerified(true)
            setInfoText("Enjoy your purchase you wonderful Internet user you! <3")
            setSubInfoText("You can close this tab now!")
            
            localStorage.removeItem("selectedPlan")
            setTimeout(()=>{
                // navigate("/login")
            }, 2000)
            // this will come back to bite me in the ass i just know it
            // window.location.href = window.location.href.split('/')[0]+"login"
        } catch (e) {
            setInfoText("There seems to have been an issue :(")
            setSubInfoText("")
            setVerified(false)
            setTimeout(()=>{
                navigate("/login")
            }, 2000)
            e
            // console.log(e)
        }
    }

    useEffect(() => {
        window.addEventListener("load", () => {
            verifyPayment()
        })
    }, [])
    return (
        <section className="min-h-screen relative flex flex-center outline outline-white outline-6">
            <section className="text-center">
                <div className="flex flex-center py-4">
                    <Ghost className="w-14 h-14 text-indigo-600" />
                    <span className="ml-2 text-3xl font-bold text-text_100">GhostRoute</span>
                </div>
                <p className={`my-auto p-10 text-3xl md:text-5xl text-slate-50 ${verified?'':'animate-pulse'}`}>
                    {infoText}
                </p>
                <p className="mt-2 px-10 text-md md:text-xl text-gray-400">
                    <span>

                        {subInfoText} {
                            verified ?
                                <span className="text-1xl text-indigo-600 underline cursor-pointer" onClick={() => navigate("/login")}>
                                    Or proceed to login for Config
                                </span>
                                : <></>
                        }
                    </span>
                </p>
            </section>

        </section>
    )
}

export default VerifyPaymentPage
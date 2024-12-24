import { useEffect, useState } from "react"
// import Footer from "../components/Footer"
// import Navbar from "../components/Navbar"
// import axiosInstance from "../axios";
import axios from "axios";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
// import { useAuth } from "../components/AuthProvider";

const VerifyPaymentPage = () => {
    const [verified, setVerified] = useState(false)
    const [infoText, setInfoText] = useState("Your payment is being verified...")
    const [subInfoText, setSubInfoText] = useState("Try not to close this browser tab")
    const navigate = useNavigate();
    const { login_via_token } = useAuth();

    const verifyPayment = async () => {
        try {
            const url = new URL(window.location.href); // Current URL
            const params = new URLSearchParams(url.search);

            const transaction_id =params.get("trxref")
            console.log(transaction_id)
            const trans_id = params.get('trans_id')
            console.log(trans_id)

            const payload = {
                "transaction_id": transaction_id,
                "trans_id": trans_id
            }
            // console.log(payload)
            // return
            // console.log(payload, "initial payload")
            console.log(payload, "verify payload")
            const payment_verification_request = await axios.post("https://quiet.pumpeet.me/payment/paystack/verify/", payload)
            console.log(payment_verification_request)
            setVerified(true)
            setInfoText("Enjoy your purchase you wonderful Internet user you! <3")
            // setSubInfoText("You can close this tab now!")
            setSubInfoText("Now redirecting...")

            setTimeout(() => {
                const token = payment_verification_request.data.token.token
                login_via_token(token, "/purchases")

                // navigate("/login")
            }, 3000)
            // this will come back to bite me in the ass i just know it
            // window.location.href = window.location.href.split('/')[0]+"login"
        } catch (e) {
            setInfoText("There seems to have been an issue :(")
            setSubInfoText("")
            // console.error(e)
            setVerified(false)
            setTimeout(() => {
                // navigate("/login")
            }, 2000)
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
                <p className={`my-auto p-10 text-3xl md:text-5xl text-slate-50 ${verified ? '' : 'animate-pulse'}`}>
                    {infoText}
                </p>
                <p className="mt-2 px-10 text-md md:text-xl text-gray-400">
                    <span>

                        {subInfoText} {
                            // verified ?
                            //     <span className="text-1xl text-indigo-600 underline cursor-pointer" onClick={() => navigate("/login")}>
                            //         Or proceed to login for Config
                            //     </span>
                            //     : <></>
                        }
                    </span>
                </p>
            </section>

        </section>
    )
}

export default VerifyPaymentPage
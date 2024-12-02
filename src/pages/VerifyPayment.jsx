import { useEffect } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import axiosInstance from "../axios";

const VerifyPaymentPage = () => {
    // const [tr_id, setTr_Id] = useState();
    // const [selectedPlan, setSelectedPlan] = useState();

    const verifyPayment = async (payload) => {
        console.log(payload, "initial payload")
        const verify_request = await axiosInstance.post("/payment/verify_flutterwave/", payload)
        console.log(verify_request, "verify requetst")
    }

    useEffect(() => {
        window.addEventListener("load", () => {           
            const url = String(window.location.href)
            const transaction_id = url.split('transaction_id')[1].substring(1)

            const plan = JSON.parse(localStorage.getItem("selectedPlan"))

            const payload = {
                "transaction_id": transaction_id,
                "days_paid": plan.price,
                "server_ip": plan.location,
                "server_location": plan.location
            }

            verifyPayment(payload)
        })
    }, [])
    return (
        <section className="min-h-screen">
            <Navbar />
            <p className="mt-20 p-10 text-5xl text-slate-50">
                Payment is being verified
            </p>
            <Footer />
        </section>
    )
}

export default VerifyPaymentPage
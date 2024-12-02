import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const PurchasesPage = () => {
    const [currentPlans, setcurrentPlans] = useState([])
    const [userPlans, setUserPlans] = useState();

    const navigate = useNavigate();

    const getUserPlans = async () => {
        try {
            const user_plans_request = await axiosInstance.get("/server/get_user_plans")
            setUserPlans(user_plans_request.data.data)
            console.log(user_plans_request)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setcurrentPlans()
        getUserPlans()
    }, [])

    return (
        <div className="min-h-screen bg-bg_100 pt-16">
            {/* navbar */}
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0 space-y-10">

                    {/* current plans section */}
                    <section>
                        <p className="text-text_100 text-3xl font-bold">Current Plans</p>
                        <div>
                            {
                                currentPlans ?
                                    currentPlans.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {item}
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="bg-bg_200/50 rounded-md p-2 my-4">
                                        <p className="text-xl text-text_100">
                                            Dear Customer, you have no active plans. <span onClick={() => navigate("/servers")} className="cta-link">Purchase a new plan</span> or <span className="disabled cta-link">Purchase your last plan</span>
                                        </p>
                                    </div>
                            }
                        </div>
                    </section>

                    {/* Trnasaction History section */}
                    <section>
                        <p className="text-text_100 text-3xl font-bold">Transaction History</p>
                        <div className="bg-bg_200/50 rounded-md p-2 my-4">
                            <p className="text-xl text-text_100">
                                {userPlans}
                                No previous purchases! Purchase your first plan <span onClick={() => navigate("/servers")} className="cta-link"> here</span>
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>

    )
}

export default PurchasesPage;
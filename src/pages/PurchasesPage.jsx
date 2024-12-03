import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import PlanCard from "../components/PlanCard";
import LoadingSpinner from "../components/LoadingSpinner";

const PurchasesPage = () => {
    const [currentPlans, setcurrentPlans] = useState([])
    const [userPlans, setUserPlans] = useState();

    const navigate = useNavigate();

    const getUserPlans = async () => {
        try {
            const user_plans_request = await axiosInstance.get("/server/get_user_plans")
            setUserPlans(user_plans_request.data.data)
            userPlans

            setcurrentPlans(user_plans_request.data.data)
            // setUserPlans()
            // console.log(user_plans_request)
            // console.log(user_plans_request.data.data)
        } catch {
            // console.log(error)
        }
    }

    useEffect(() => {
        setcurrentPlans()
        getUserPlans()
    }, [])

    return (
        <div className="min-h-screen bg-bg_100 pt-16">
            {/* navbar */}
            <Navbar currentPage={"/purchases"}/>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-6 py-6 sm:px-0 space-y-10">

                    {/* current plans section */}
                    <section>
                        <p className="text-text_100 text-3xl font-bold">Current Plans</p>
                        <div className={`${currentPlans?.length != 0?"grid":""} mt-6 gap-4 md:grid-cols-3`}>
                            {
                                currentPlans ?
                                    <>
                                        {currentPlans.length == 0 ?
                                            <>
                                                <div className="bg-bg_200/50 rounded-md p-6 my-4">
                                                    <p className="text-xl text-text_100">
                                                        Dear Customer, you have no active plans. <span onClick={() => navigate("/servers")} className="cta-link">Purchase a new plan here</span>
                                                    </p>
                                                </div>
                                            </>
                                            :
                                            currentPlans.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <PlanCard plan={item} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <div className="bg-bg_200/50 rounded-md py-6 px-10">
                                        <p className="text-xl flex gap-3 items-center text-text_100">
                                            Loading your plans... <LoadingSpinner />
                                        </p>
                                    </div>
                            }
                        </div>
                    </section>

                    {/* Trnasaction History section */}
                    <section className="hidden">
                        <p className="text-text_100 text-3xl font-bold">Transaction History</p>
                        <div className="bg-bg_200/50 rounded-md p-2 my-4">
                            <p className="text-xl text-text_100">
                                {/* {userPlans} */}
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
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const PurchasesPage = () => {
    const [currentPlans, setcurrentPlans] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        setcurrentPlans()
    }, [])

    return (
        <div className="min-h-screen bg-bg_100 pt-16">
            {/* navbar */}
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0 space-y-10">

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
                                            Dear Customer, you have no active plans. <span onClick={()=>navigate("/servers")} className="cta-link">Purchase a new plan</span> or <span className="disabled cta-link">Purchase your last plan</span>
                                        </p>
                                    </div>
                            }
                        </div>
                    </section>
                    <section>
                        <p className="text-text_100 text-3xl font-bold">Transaction History</p>
                        <div className="bg-bg_200/50 rounded-md p-2 my-4">
                            <p className="text-xl text-text_100">
                                No previous purchases! Purchase your first plan <span onClick={()=>navigate("/servers")} className="cta-link"> here</span> 
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>

    )
}

export default PurchasesPage;
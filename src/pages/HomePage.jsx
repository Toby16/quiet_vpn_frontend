import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChevronDown, Clock, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useAuth } from "../components/AuthProvider";

const HomePage = () => {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the home page
    }
  }, []);

  const [openQuestionCardTitle, setopenQuestionCardTitle] = useState('')



  const QuestionCard = ({ open, question, answer, index }) => {
    open = open ? open : false;
    index
    return (
      <div className='flex flex-col transition-all duration-300'>
        {/* Quiestion Title */}
        <div className='py-3 cursor-pointer flex items-center justify-between' onClick={() => {
          if(openQuestionCardTitle !== question)
            setopenQuestionCardTitle(question)
          else
          setopenQuestionCardTitle("")
        }}>
          <span className={`text-base md:text-xl font-semibold ${open ? 'text-violet-600' : 'text-gray-200'}`}>
            {question}
          </span>
          <div className='px-3 text-text_200'>
            <ChevronDown className={`${open ? "rotate-[180deg] text-violet-600" : "rotate-[0deg]"}`} />
          </div>
        </div>

        {/* Quiestion anser */}
        <div className={`${open ? "h-auto" : "h-0"} ${ open ? "border-b border-violet-600/20" : ""} transition-all duration-300 overflow-hidden`}>
          <p className='text-sm md:text-base text-gray-200 mb-4 mx-3 leading-relaxed'>
            {answer}
          </p>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-bg_100">
      {/* navbar */}
      <Navbar currentPage={"/"}/>
      <main className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="px-4sm:px-0">
          <div className="h-screen">

            <div className="w-full flex flex-col flex-center h-full gap-4 max-w-[25rem] text-center mx-auto my-auto">
              <p className="font-bold text-5xl sm:text-7xl text-white ">
                Fast, Safe, Secure
              </p>
              <p className="text-xl md:text-2xl text-text_200">
                Enjoy fast secure vpn connections to a variety of countries, pay for as much or as little time as you need, no subscriptions!
              </p>
              <button onClick={() => navigate("/servers")} className="mt-2 w-full flex flex-center h-12 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Select a Server
              </button>
            </div>

          </div>

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-3 flex-center gap-2">
            {
              [
                { icon: <Clock className="size-full" />, title: "Flexible Duration", info: "Pick a plan for as many days as you need, 1 day or more!" },
                { icon: <Zap className="size-full" />, title: "Fast and Secure", info: "Protect your data and enjoy high speed browsing" },
                { icon: <Shield className="size-full" />, title: "Private, Quiet", info: "No logs, no tracking" }
              ].map((item, index) => (
                <div className="size-full rounded-xl shadow border border-violet-600/30 flex text-center flex-center gap-1 flex-col text-violet-600 py-10 px-6" key={index}>
                  <span className="size-10 mb-3">
                    {item.icon}
                  </span>
                  <p className="text-text_100 font-bold text-3xl">
                    {item.title}
                  </p>
                  <span className="text-text_200 text-xl">
                    {item.info}
                  </span>
                </div>
              ))
            }
          </section>

          {/* FAQ section */}
          <section id="faq" className="py-8 my-20  bg-violet-600/20 border border-violet-600/30 rounded-xl px-6">
            <p className="text-text_100 font-bold text-3xl mb-6">
              Frequently Asked Questions
            </p>
            {
              [
                { Q: "How do I pay?", A: "Pay easily and securely with paystack, a trusted global payment platform providing swift, encrypted transactions. You can use a credit cards, debit cards, or other methods paystack provides" },
                { Q: "Is there a maximum limit for the number of days?", A: "No limits! Choose as many days as you want to ensure uninterrupted access to our reliable VPN service." },
                { Q: "What devices can I use with the VPN?", A: "Our VPN works on any device with the WireGuard app, including Windows, macOS, Linux, Android, and iOS. Just import our configuration file and start browsing securely." },
                { Q: "Will my data be safe?", A: "Absolutely! We prioritize your privacy with military-grade encryption and a strict no-logs policy, ensuring your online activities remain secure and private." },
                { Q: "Can I use the VPN on multiple devices?", A: "Yes, you can! Set up our VPN on all your devices as long as they support the WireGuard app. Enjoy seamless protection everywhere." },
                { Q: "Does the VPN affect my internet speed?", A: "Our VPN is optimized for high-speed connections, ensuring minimal impact on your browsing, streaming, and gaming experience." },
                { Q: "How quickly can I get started?", A: "Instantly! Sign up, complete your payment, and receive your configuration files to start browsing securely within minutes." },
                { Q: "Is this a subscription service?",  A: "No, we’re not a subscription service! With us, you only pay for the exact number of days you need—whether it’s a single day or several months. Enjoy total flexibility and control without recurring charges." }
                
              ].map((item, index) => (
                <QuestionCard
                  key={index}
                  index={index}
                  open={openQuestionCardTitle == item.Q}
                  question={item.Q}
                  answer={item.A}
                />
              ))
            }
          </section>

          <section className="h-20">

          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
};

export default HomePage;
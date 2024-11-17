import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Clock, Shield, Zap } from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigate = useNavigate()

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
          <div className='px-3'>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 flex transform ${open ? "rotate-[180deg]" : "rotate-[0deg]"} transition-transform duration-300`}>
              <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill={`${open ? "#0B99FA" : "white"}`} fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>

        {/* Quiestion anser */}
        <div className={`${open ? "h-auto" : "h-0"} ${ open ? "border-b border-violet-600/20" : ""} transition-all duration-300 overflow-hidden`}>
          <p className='text-sm md:text-base text-gray-200/60 mb-4 mt-5 mx-6 leading-relaxed'>
            {answer}
          </p>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-bg_100">
      {/* navbar */}
      <Navbar />
      <main className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="px-4sm:px-0">
          <div className="h-screen">

            <div className="w-full flex flex-col flex-center h-full gap-4 max-w-[25rem] text-center mx-auto my-auto">
              <p className="font-bold text-5xl sm:text-7xl text-white ">
                Fast, Safe, Secure
              </p>
              <p className="text-xl md:text-2xl text-text_200">
                Enjoy fast seure vpn connections to a variety of countries, pay for as much or as little time as you need, no subscriptions!
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
                { icon: <Zap className="size-full" />, title: "Fast and Secure", info: "Protect your data and enjoy high speed brwosing" },
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
          <section className="py-8 my-20  bg-violet-600/20 border border-violet-600/30 rounded-xl px-6">
            <p className="text-text_100 font-bold text-3xl mb-6">
              Frequently Asked Questions
            </p>
            {
              [
                { Q: "How do I pay?", A: "gimme all your moneyy aaahahahahahaha" },
                { Q: "Is there a maximum limit for number of days", A: "gimme all your moneyy aaahahahahahaha" },
                { Q: "What devices can I use with the vpn", A: "gimme all your moneyy aaahahahahahaha" },
                { Q: "Can I marry Bolaji Toby Bssit the Third", A: "Only if you pay $10,000 per days with him" },
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
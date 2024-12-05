/* eslint-disable no-unused-vars */
import { Lock, Globe, ChevronRight, Copy } from "lucide-react"
import axios from "axios"
import axiosInstance from "../axios.jsx"
import { useEffect, useState } from "react"
import { choose, randomNumber } from "../utils/utils"

import countries from "../data/countries.json"
import { useNavigate } from "react-router-dom"

const PlanCard = ({ plan }) => {
  const [area, setArea] = useState()
  const [flag, setFlag] = useState();
  const [expired, setExpired] = useState(plan.days_left <= 0)
  const navigate = useNavigate();

  const updateNameAndFlag = async () => {
    let country = choose(countries)
    setFlag(plan?.flag_url ? plan.flag_url : "")
  }

  const copyConigData = () => {
    navigator.clipboard.writeText(JSON.stringify(plan.config_data))
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  }

  useEffect(() => {
    updateNameAndFlag();
  }, [])

 
  
  const [countryFlag, setCountryFlag] = useState('')

  const TitleAndSubtitle = ({ title, subtitle }) => {
    return (
      <div>
        <p className="text-text_200 text-md font-bold">{title}: </p>
        <p className="text-text_200 text-xl">{subtitle}</p>
      </div>
    )
  }


  return (
    <div className={`${!expired ? "bg-violet-600/20 border border-violet-600/30" : "bg-red-600/20 border border-red-600/30"} p-6 grid bg-bg_200 rounded-lg shadow `}>
      <div className="space-x-2 flex items-center mb-4">
        <Globe className="w-6 h-6 text-indigo-600 shrink-0" />
        <img className="h-6 w-auto" src={flag} alt="flag" />
        <h3 className="text-lg font-medium text-text_100">{plan.location}</h3>
      </div>

      <TitleAndSubtitle title={"Config"} subtitle={plan.config} />
      <TitleAndSubtitle title={"Days Left"} subtitle={plan.days_left} />
      <TitleAndSubtitle title={"Server IP Address"} subtitle={plan.ip_address} />
      <button onClick={() => { 
        if(expired){
          navigate("/servers")
        } else {
          copyConigData();
        }
      }} className="mt-4 w-full flex h-10 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        {
          expired ?
            <>
              Get a new Plan <ChevronRight className="ml-2 w-4 h-4" />
            </>
            :
            <>
              Copy Conig Data <Copy className="ml-2 w-4 h-4" />
            </>
        }
      </button>
    </div>
  )
}

export default PlanCard
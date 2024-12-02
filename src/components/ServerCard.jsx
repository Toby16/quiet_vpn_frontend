/* eslint-disable no-unused-vars */
import { Lock, Globe, ChevronRight } from "lucide-react"
import axios from "axios"
import axiosInstance from "../axios.jsx"
import { useEffect, useState } from "react"
import { choose, randomNumber } from "../utils/utils"

import countries from "../data/countries.json"

const ServerCard = ({isSpecial, server, callback}) => {
  const [area, setArea] = useState()
  const [flag, setFlag] = useState();

  const updateNameAndFlag = async ()=> {
    let country = choose(countries)
    setFlag(country.flags.png)
    setArea(country.name.common)
  }
  useEffect( ()=>{
    updateNameAndFlag();
  }, [])


  const purchasePlan = async () => {
    callback()
  }
  
  const [countryFlag, setCountryFlag] = useState('')
  return (
    <div className={`${isSpecial==true?"bg-violet-600/20 border border-violet-600/30":""} p-6 grid bg-bg_200 rounded-lg shadow `}>

      <div className="space-x-2 flex items-center">
        <Globe className="w-6 h-6 text-indigo-600 shrink-0" />
        <img className="h-6 w-auto" src={flag} alt="flag" />
        <h3 className="text-lg font-medium text-text_100">{server.location}</h3>
      </div>

      <p className="mt-4 text-text_200">IP address: {server.server_ip}</p>
      <p className="mt-2 text-3xl font-bold text-text_100">₦{server.price}/day</p>

      <p className={isSpecial?"text-violet-200 pt-2 ":"hidden"}>
        You purchase this plan often!
      </p>

      <button onClick={()=>purchasePlan()} className="mt-4 w-full flex h-10 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        Purchase Plan <ChevronRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  )
}

export default ServerCard
/* eslint-disable no-unused-vars */
import { Lock, Globe, ChevronRight } from "lucide-react"
import axios from "axios"
import axiosInstance from "../axios.jsx"
import { useEffect, useState } from "react"
import { choose, randomNumber } from "../utils/utils"

import countries from "../data/countries.json"

const PlanCard = () => {
  const [area, setArea] = useState()
  const [flag, setFlag] = useState();

  const updateNameAndFlag = async ()=> {
    let country = choose(countries)
    setFlag(country.flags.png)
    setArea(country.name.common)
    // try {
    //   const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags")
    //   console.log(response)
    //   let country = choose(response.data)
    //   console.log(country)
    //   setFlag(country.flags.png)
    //   setArea(country.name.common)
    // } catch (e) {console.error(e)}
  }
  useEffect( ()=>{
    updateNameAndFlag();
  }, [])
  const purchasePlan = async () => {
    alert("Thank you for your enthusiasm, will be availble soon")
    try {
      const response = await axiosInstance.get("/server/get_all_servers/", {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      }
    )
      console.log(response)
    } catch (error) {
      console.error(error )
    }
    
  }
  const [countryFlag, setCountryFlag] = useState('')
  return (
    <div className="p-6 bg-bg_200 rounded-lg shadow">
      <div className="space-x-2 flex items-center">
        <Globe className="w-6 h-6 text-indigo-600 shrink-0" />
        <img className="h-6 w-auto" src={flag} alt="coutryflag" />
        <h3 className="text-lg font-medium text-text_100">{area}</h3>
      </div>
      <p className="mt-4 text-text_200">Perfect for personal use</p>
      <p className="mt-2 text-3xl font-bold text-text_100">₦{randomNumber(100, 400, false)}/day</p>
      <button onClick={()=>purchasePlan()} className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        Purchase Plan <ChevronRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  )
}

export default PlanCard
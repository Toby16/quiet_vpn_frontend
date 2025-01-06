/* eslint-disable no-unused-vars */
import { Lock, Globe, ChevronRight, Copy, ChevronUp, ChevronDown, Info, Download, Wifi } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner.jsx"
import { useToast } from "./ToastContext.jsx"

const PlanCard = ({ plan }) => {
  const [flag, setFlag] = useState();
  const [expired] = useState(plan.days_left <= 0)
  const navigate = useNavigate();
  const [showConfigData, setShowConfigData] = useState(false)
  const [download, setDownloaded] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const { showToat } =  useToast();

  const updateNameAndFlag = async () => {
    // console.log(plan)
    setFlag(plan?.flag_url ? plan.flag_url : "")
  }

  const generateConfigData = (config_data) => {
    return {
      Interface: {
        PrivateKey: config_data.PrivateKey,
        Address: config_data.Address,
        DNS: config_data.DNS,
      },
      Peer: {
        PublicKey: config_data.PublicKey,
        PresharedKey: config_data.PresharedKey,
        Endpoint: config_data.Endpoint,
        AllowedIPs: config_data.AllowedIPs,
        // PersistentKeepalive: 25,
      },
    };
  }


  const downloadConfig = async (filename, content) => {
    setIsDownloading(true);

    const blob = new Blob([content], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.conf`;
  
    // Trigger download
    document.body.appendChild(link);
    link.click();
    setDownloaded(true); // Assume download was triggered successfully
    link.remove();
    URL.revokeObjectURL(link.href);
  
    setTimeout(()=>{
      setIsDownloading(false);
    }, 2000)
  }

  const downloadAsConfigFile = (config_data) => {
    let data = generateConfigData(config_data)
    let configString = '';
    for (const [section, options] of Object.entries(data)) {
      configString += `[${section}]\n`;
      for (const [key, value] of Object.entries(options)) {
        configString += `${key} = ${value}\n`;
      }
      configString += '\n';
    }
    configString = configString.trim();
    downloadConfig(plan.config, configString)
  }

  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // console.log("Text copied to clipboard!");
        // console.log(text);
      })
      .catch(err => {
        // console.error("Could not copy text: ", err);
      });
  }

  const copyConigData = () => {
    navigator.clipboard.writeText('plan comfig')
      .then(() => {
        // console.log("Text copied to clipboard!");
      })
      .catch(err => {
        // console.error("Could not copy text: ", err);
      });
  }

  useEffect(() => {
    updateNameAndFlag();
  }, [])




  const TitleAndSubtitle = ({ title, subtitle }) => {
    return (
      <div className="text-wrap w-fit mb-1">
        <p className="text-text_200 text-md font-bold">{title} </p>
        <p className="text-text_200 text-xl">{subtitle}</p>
      </div>
    )
  }


  return (
    <div className={`${!expired ? "bg-violet-600/20 border border-violet-600/30" : "bg-red-600/20 border border-red-600/30"} p-6 grid bg-bg_200 rounded-lg shadow `}>
      <div className="space-x-2 flex items-center mb-4">
        <Globe className="w-6 h-6 text-indigo-600 shrink-0" />
        {/* <Wifi className="w-6 h-6 text-indigo-600 shrink-0" /> */}
        <img className="h-6 w-auto" src={flag} alt="flag" />
        <h3 className="text-lg font-medium text-text_100">{plan.location}</h3>
      </div>

      <TitleAndSubtitle title={"Config name"} subtitle={plan.config} />
      <TitleAndSubtitle title={"Days Left"} subtitle={plan.days_left} />
      <TitleAndSubtitle title={"Server IP Address"} subtitle={plan.ip_address} />
      <TitleAndSubtitle title={(
        <span className="flex items-center" onClick={() => { setShowConfigData(!showConfigData) }}>Reveal Config Data {
          showConfigData ?
            <ChevronUp size={20} />
            :
            <ChevronDown size={20} />
        }</span>
      )} subtitle={

        (
          <div className="flex flex-col mt-1">
            <div className="flex">
              <div className="min-h-max w-2 bg-indigo-600"></div>
              <div className={`${showConfigData ? "pl-2 leading-snug" : "hidden"}`}>
                {Object.entries(plan.config_data).map(([key, value]) => (
                  <p key={key} className="text-sm break-all" onClick={() => {
                    copyToClipBoard(value);
                    showToat(value.substring(0, 20))
                  }}>
                    <span className="inline">
                      <span className="font-bold ">{key}: </span>
                      <span className="font-bold text-indigo-400">{value}:</span>
                    </span>
                  </p>
                ))}
                <p className={`${showConfigData ? "flex gap-1 items-center py-2 px-5 mt-2 text-sm text-grey-600 bg-bg_200 rounded-md " : "hidden"}`}> <Info className="text-sm" /> Click on a parameter to copy it </p>
              </div>
            </div>

          </div>
        )
      } />
      <button onClick={() => {
        if (expired) {
          navigate("/servers")
        } else {
          downloadAsConfigFile(plan.config_data)
        }
      }} 
      disabled={isDownloading}
      className="mt-4 w-full flex h-10 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        {
          expired ?
            <>
              Get a new Plan <ChevronRight className="ml-2 w-4 h-4" />
            </>
            :
            <>
              {
                !isDownloading ?
                  <>
                    {!download?"Download Config File":"Download File Again?"} <Download className="ml-2 w-4 h-4" />
                  </>
                  :
                  <>
                    <LoadingSpinner />
                  </>
              }
            </>
        }
      </button>
    </div>
  )
}

export default PlanCard
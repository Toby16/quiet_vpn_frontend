import { Ghost, WifiOff } from "lucide-react"
// import LoadingSpinner from "./LoadingSpinner"
import { useEffect, useState } from "react"


const InternetCheck = () => {
    const [userOnline, setUserOnline] = useState(true)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setUserOnline(navigator.onLine)
        setVisible(!navigator.onLine)
    }, [])

    window.addEventListener("online", () => {
        setUserOnline(true)
        setTimeout(() => {
            setVisible(false)
        }, 2000);
    })
    window.addEventListener("offline", () => {
        setUserOnline(false)
        setVisible(true)
    })
    return (
        <section className={`${!visible ? "hidden" : ""} bg-black flex flex-col flex-center absolute top-0 left-0 px-2 w-screen h-screen z-[1000] select-none animate-pulse`}>
            <div className="flex flex-center py-4">
                <Ghost className="w-14 h-14 text-indigo-600" />
                <span className="ml-2 text-3xl font-bold text-text_100 mr-4">GhostRoute VPN</span>
                <span className="flex text-text_100">
                    {
                        userOnline ?
                            <></>
                            :
                            <WifiOff />
                    }
                    {/* <LoadingSpinner /> */}
                </span>
            </div>
            <p className="ml-2 text-xl text-text_200">
                {
                    userOnline ?
                        <>
                            Welcome Back <span className="font-bold text-green-400">Online</span>
                        </> :
                        <>
                            You seem to be ghosted. <br /> Please check your <span className="text-indigo-600">Internet connection!</span>
                        </>
                }
            </p>
        </section>
    )
}

export default InternetCheck
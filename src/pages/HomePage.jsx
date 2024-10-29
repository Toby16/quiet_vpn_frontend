import Navbar from "../components/Navbar";

const HomePage = () => (
  <div className="min-h-screen bg-bg_100">
    {/* navbar */}
    <Navbar />


    <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="px-4sm:px-0">
        <div className="h-screen grid gap-6 md:grid-cols-2">


          <div className="w-full flex flex-col gap-6 max-w-[25rem] text-center mx-auto my-auto">
            <p className="font-bold text-7xl text-white ">
              Fast, Safe, Secure
            </p>
            <p className="text-2xl text-text_200">
              Enjoy fast seure vpn connections to a variety of countries, pay for as much or as little time as you need, no subscriptions!
            </p>
          </div>

        </div>
      </div>
    </main>
  </div>
);

export default HomePage;
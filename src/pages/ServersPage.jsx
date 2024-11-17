import PlanCard from "../components/PlanCard"
import Navbar from "../components/Navbar";

const ServersPage = () => (
  <div className="min-h-screen bg-bg_100 pt-16">
    {/* navbar */}
    <Navbar /> 

    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="grid gap-6 mb-8 md:grid-cols-3">

          {/* Subscription Plans */}
          <PlanCard />
          <PlanCard isSpecial={true}  />
          <PlanCard />
          <PlanCard  isSpecial={true}/>
          <PlanCard />
  
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />

        </div>
      </div>
    </main>
  </div>
);

export default ServersPage;
import Navbar from "../components/Navbar";

const TutorialsPage = () => (
  <div className="min-h-screen bg-bg_100 pt-16">
    {/* navbar */}
    <Navbar currentPage={"/tutorials"}/>

    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex flex-center mb-8">
          <video src="../assets/video.mp4" controls autoPlay loop
            className="">
          </video>
        </div>
      </div>
    </main>
  </div>
);

export default TutorialsPage;
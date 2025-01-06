import Navbar from "../components/Navbar";

const Tip = ({ header, subject }) => {
  return <div className="mb-6">
    <p className="text-text_100 text-sm font-bold ">{header}</p>
    <p className="text-text_200 text-md">
      {subject}
    </p>
  </div>
}
const TutorialsPage = () => (
  <div className="min-h-screen bg-bg_100 pt-16" >
    {/* navbar */}
    < Navbar currentPage={"/tutorials"} />

    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden">
        <p className="text-text_100 text-3xl px-4 sm:px-0 py-6 font-bold">How to use VPN Configs</p>

        <section className=" mb-8 px-4">
          <Tip
            header={"1. Download The WireGuard App"}
            subject={<>You can download the Wireguard App <a className="text-indigo-600 font-bold underline" href="https://www.wireguard.com/install"> here </a> for all devices</>}
          />
          <Tip
            header={"2. Watch the video below"}
            subject={<>
              <iframe
                src="https://www.youtube.com/embed/y_2bxWwqbVo"
                title="WireGuard Tutorial"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                >
              </iframe>

            </>}
          />
          <Tip
            header={"3. Thats it!"}
            subject={<>Enjoy your fast, safe internet connection!</>}
          />
        </section>
      </div>
    </main>
  </div >
);

export default TutorialsPage;
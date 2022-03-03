import Footer from "../layout/Footer";
import Navigation from "../layout/Navigation";

export default function HomeView ({ children, },) {
  return (
    <>
      <Navigation />
      <div className="bg-blue-racing">
        <div
          className="max-w-7xl mx-auto text-center py-16 px-4 md:py-20 sm:px-6
          lg:px-8">
          <span className="block text-3xl font-extrabold md:text-4xl
          text-blue-diamond uppercase">
            BachMacintosh
          </span>
          <span className="block text-2xl font-extrabold md:text-3xl
          text-blue-diamond">
            (a.k.a Collin G. Bachman)
          </span>
          <p className="mt-4 text-lg leading-6 text-white">
            The Guy With the White Hair -- Musician, Gamer, Writer
          </p>
        </div>
      </div>
      <main className="mx-auto px-4 py-5 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
          <Footer />
        </div>
      </main>
    </>
  );
}

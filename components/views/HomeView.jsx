import Footer from "../layout/Footer";
import Navigation from "../layout/Navigation";
import Warning from "../layout/Warning";

export default function HomeView ({ children, },) {
  return (
    <>
      <Navigation />
      <div className="bg-blue-racing">
        <div
          className="max-w-7xl mx-auto text-center pt-12 md:pt-16 pb-4 px-4
          sm:px-6 lg:px-8">
          <span className="hidden md:block text-3xl font-extrabold md:text-4xl
          text-blue-diamond uppercase">
            BachMacintosh
          </span>
          <p className="mt-4 text-lg leading-6 text-white">
            Collin G. Bachman
          </p>
          <p className="text-lg leading-6 text-white">
            The Guy With the White Hair -- Musician, Gamer, Writer
          </p>
        </div>
      </div>
      <main className="mx-auto px-4 py-5 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {process.env.isDeployPreview
            && <Warning title="Deploy Preview">
              This may contain test data, and is not indicative of the live site
              .
            </Warning>
          }
          {children}
          <Footer />
        </div>
      </main>
    </>
  );
}

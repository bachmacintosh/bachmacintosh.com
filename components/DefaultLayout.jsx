import Footer from "./layout/Footer";
import Navigation from "./layout/Navigation";

export default function DefaultLayout ({ children, },) {
  return (
    <>
      <Navigation />
      <main className="mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mt-16">
          {children}
          <Footer />
        </div>
      </main>
    </>
  );
}

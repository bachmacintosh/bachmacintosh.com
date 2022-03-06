import Footer from "../layout/Footer";
import Navigation from "../layout/Navigation";
import Warning from "../layout/Warning";

export default function DefaultView ({ children, },) {
  return (
    <>
      <Navigation />
      <main className="mx-auto px-4 py-5 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mt-16">
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

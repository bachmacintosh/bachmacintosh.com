import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";

export default function DefaultLayout({ children,}) {
    return (
        <>
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto mt-16">
                    {children}
                    <Footer />
                </div>
            </main>
        </>
    );
}
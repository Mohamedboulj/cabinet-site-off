import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import Hours from "./components/Hours";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { I18nProvider, defaultLocale } from "./i18n";

export default function App({ locale = defaultLocale }) {
  return (
    <I18nProvider locale={locale}>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <Testimonials />
          <Location />
          <Hours />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </I18nProvider>
  );
}

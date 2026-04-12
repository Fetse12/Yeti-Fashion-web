import BlogSection from "../components/BlogSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import FooterLabel from "../components/FooterLabel.jsx";
import GallerySection from "../components/GallerySection.jsx";
import HeroSplit from "../components/HeroSplit.jsx";
import InfoTicker from "../components/InfoTicker.jsx";
import LabSection from "../components/LabSection.jsx";
import ProcessScroll from "../components/ProcessScroll.jsx";

export default function Home() {
  return (
    <>
      <main>
        <HeroSplit />
        <InfoTicker />
        <ProcessScroll />
        <LabSection />
        <GallerySection />
        <BlogSection />
        <ContactSection />
      </main>
      <FooterLabel />
    </>
  );
}

import Hero from "./components/Hero";
import Categories from "./components/Categories";
import InvertersSection from "./components/InvertersSection";
import SolarPanelsSection from "./components/SolarPanelsSection";
import BatteriesSection from "./components/BatteriesSection";
import WhyShopWithUs from "./components/WhyShopWithUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <div id="solar">
        <SolarPanelsSection />
      </div>
      <div id="inverters">
        <InvertersSection />
      </div>
      <div id="batteries">
        <BatteriesSection />
      </div>
      <WhyShopWithUs />
    </main>
  );
}
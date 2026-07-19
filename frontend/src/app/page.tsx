import "./home-page.css";
import HomeHero from "@/components/HomeHero";
import HomeStatsBand from "@/components/HomeStatsBand";
import HomeCredentials from "@/components/HomeCredentials";
import HomeIntro from "@/components/HomeIntro";
import HomeAnimatedSections from "@/components/HomeAnimatedSections";
import HomeFeatureSections from "@/components/HomeFeatureSections";

export default function Home() {
  return (
    <div className="page-wrap home-page">
      <HomeHero />
      <HomeStatsBand />
      <HomeCredentials />
      <HomeIntro />
      <HomeAnimatedSections />
      <HomeFeatureSections />
    </div>
  );
}

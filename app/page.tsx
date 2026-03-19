import Hero from "@/components/home/hero";
import Testimonial from "@/components/home/whatTheySaid";
import NewsSection from "@/components/home/news";

export default function HomePage() {
  return (
    <main className="bg-white">
      <Hero />
      <Testimonial />
      <NewsSection />
    </main>
  );
}

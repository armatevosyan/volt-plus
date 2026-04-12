import Hero from "@/components/home/hero";
import Testimonial from "@/components/home/whatTheySaid";
import NewsSection from "@/components/home/news";
import OurWorksSection from "@/components/home/OurWorks";
import ServicesSection from "@/components/home/servicesSection";
import ProductsSection from "@/components/home/productsSection";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [services, products] = await Promise.all([
    prisma.service.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <main className="bg-white">
      <Hero />
      <div id="services" className="scroll-mt-24">
        <ServicesSection services={services} />
      </div>
      <ProductsSection products={products} />
      <Testimonial />
      <NewsSection />
      <OurWorksSection />
    </main>
  );
}

import Hero from "@/components/home/hero";
import Testimonial from "@/components/home/whatTheySaid";
import NewsSection from "@/components/home/news";
import OurWorksSection from "@/components/home/OurWorks";
import ProductsSection, {
  type ProductForLanding,
} from "@/components/home/productsSection";
import ServicesSection, {
  type ServiceForLanding,
} from "@/components/home/servicesSection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let services: ServiceForLanding[] = [];
  let products: ProductForLanding[] = [];

  try {
    const [svc, prod] = await Promise.all([
      prisma.service.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);
    services = svc;
    products = prod;
  } catch (err) {
    console.error("[HomePage] database query failed:", err);
  }

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

import ItemCarouselSection from "@/components/home/itemCarouselSection";

export type ServiceForLanding = {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  imageUrls: string[];
  sortOrder: number;
};

export default function ServicesSection({
  services,
}: {
  services: ServiceForLanding[];
}) {
  const items = services.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    price: s.price,
    imageUrl: s.imageUrls[0] ?? null,
  }));

  return (
    <ItemCarouselSection
      eyebrow="— ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ"
      heading="Մեր ծառայությունները"
      intro="Կառուցում, վերանորոգում և ինժեներական աջակցություն՝ ըստ ձեր նախագծի և բյուջեի"
      items={items}
      sectionClassName="bg-white"
      cardBgClass="bg-[#f8fafc]"
    />
  );
}

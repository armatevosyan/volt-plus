import ItemCarouselSection from "@/components/home/itemCarouselSection";

export type ProductForLanding = {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  imageUrls: string[];
};

export default function ProductsSection({
  products,
}: {
  products: ProductForLanding[];
}) {
  const items = products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    imageUrl: p.imageUrls[0] ?? null,
  }));

  return (
    <ItemCarouselSection
      id="products"
      eyebrow="— ԱՊՐԱՆՔՆԵՐ"
      heading="Մեր ապրանքները"
      intro="Նյութեր, սարքավորումներ և լուծումներ՝ թարմացվող կատալոգով"
      items={items}
      sectionClassName="bg-[#f4f9fc]"
      cardBgClass="bg-white"
    />
  );
}

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";

// Sample data to keep the component clean
const sideArticles = [
  {
    id: 1,
    title:
      "Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand",
    description: "Class Technologies Inc., the company that created Class,...",
    badge: "PRESS RELEASE",
    image: "/news1.png", // Placeholder
  },
  {
    id: 2,
    title:
      "Zoom's earliest investors are betting millions on a better Zoom for schools",
    description:
      "Zoom was never created to be a consumer product. Nonetheless, the...",
    badge: "NEWS",
    image: "/news2.png", // Placeholder
  },
  {
    id: 3,
    title:
      "Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom Classrooms",
    description:
      "This year, investors have reaped big financial returns from betting on Zoom...",
    badge: "NEWS",
    image: "/news3.png", // Placeholder
  },
];

export default function NewsSection() {
  return (
    <section className="bg-[#9DCCFF] py-8 font-sans min-h-screen text-white">
      <Container className="py-12 tablet:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2b2d4a] mb-4">
            Latest News and Resources
          </h2>
          <p className="text-secondary text-lg">
            See the developments that have occurred to TOTC in the world
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Featured Article */}
          <div className="flex flex-col">
            <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden mb-6">
              <Image
                src="/news.png"
                alt="Featured news"
                fill
                className="object-cover"
              />
            </div>

            <span className="bg-[#48c4b7] text-white text-sm font-semibold tracking-wide rounded-full px-6 py-1.5 w-max mb-6">
              NEWS
            </span>

            <h3 className="text-2xl md:text-3xl font-semibold text-[#2b2d4a] mb-4 leading-snug">
              Class adds $30 million to its balance sheet for a Zoom-friendly
              edtech solution
            </h3>

            <p className="text-secondary text-lg leading-relaxed mb-6">
              Class, launched less than a year ago by Blackboard co-founder
              Michael Chasen, integrates exclusively...
            </p>

            <Link
              href="#"
              className="text-secondary underline hover:text-white transition-colors w-max"
            >
              Read more
            </Link>
          </div>

          {/* Right Column: Side Articles List */}
          <div className="flex flex-col gap-10 space-y-8 lg:space-y-0">
            {sideArticles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col sm:flex-row gap-6 items-center sm:items-start"
              >
                {/* Thumbnail with Absolute Badge */}
                <div className="relative w-full sm:w-64 shrink-0 aspect-video rounded-2xl overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 right-3 bg-[#48c4b7] text-white text-xs font-semibold rounded-full px-4 py-1.5">
                    {article.badge}
                  </span>
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-1 py-2">
                  <h4 className="text-lg font-semibold text-[#2b2d4a] mb-3 leading-tight hover:underline cursor-pointer">
                    {article.title}
                  </h4>
                  <p className="text-secondary text-sm leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

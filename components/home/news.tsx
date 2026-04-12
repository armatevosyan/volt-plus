import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";

// Sample data to keep the component clean
const sideArticles = [
  {
    id: 1,
    title:
      "Նոր բնակելի համալիրում ավարտվել են կառուցապատման հիմնական աշխատանքները",
    description:
      "Արդի տեխնոլոգիաներով մեկուսացված պատեր, էներգաարդյունավետ պատուհաններ և ներքին հարկերի պատրաստություն՝ ըստ նախագծի։",
    badge: "ՀԱՐՑԱԶՐՈՒՅՑ",
    image: "/news4.png",
  },
  {
    id: 2,
    title:
      "Շինարարությունը և անվտանգության նորմերը. ինչ պետք է իմանա պատվիրատուն",
    description:
      "Խորհուրդներ նյութի ընտրության, աշխատանքի ընդունման և երաշխիքային պարտավորությունների վերաբերյալ։",
    badge: "ԼՈՒՐ",
    image: "/news2.png",
  },
  {
    id: 3,
    title:
      "Ինչպես ճիշտ պլանավորել վերանորոգումը՝ առանց նախագծի փոփոխությունների",
    description:
      "Մեր փորձը ցույց է տալիս, որ նախնական սահմանափակումները խնայողություն են բերում ժամանակի և բյուջեի տեսանկյունից։",
    badge: "ԼՈՒՐ",
    image: "/news3.png",
  },
];

export default function NewsSection() {
  return (
    <section
      id="news"
      className="scroll-mt-24 bg-[#9DCCFF] py-8 font-sans min-h-screen text-white"
    >
      <Container className="py-12 tablet:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2b2d4a] mb-4">
            Վերջին լուրեր և նյութեր
          </h2>
          <p className="text-secondary text-lg">
            Հետևեք Volt Plus-ի նախագծերին, նորություններին և շինարարական
            խորհրդատվության հոդվածներին
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Featured Article */}
          <div className="flex flex-col">
            <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden mb-6">
              <Image
                src="/news.png"
                alt="Լուրերի նկար"
                fill
                className="object-cover"
              />
            </div>

            <span className="bg-[#48c4b7] text-white text-sm font-semibold tracking-wide rounded-full px-6 py-1.5 w-max mb-6">
              ԼՈՒՐ
            </span>

            <h3 className="text-2xl md:text-3xl font-semibold text-[#2b2d4a] mb-4 leading-snug">
              Արտադրական համալիրի շրջանակում ավելացվել է էներգաարդյունավետ
              տանիքային համակարգ
            </h3>

            <p className="text-secondary text-lg leading-relaxed mb-6">
              Մոնտաժը կատարվել է ըստ արտադրողի տեխնիկական պահանջների՝ նվազեցնելով
              ջերմակորուստը և բարձրացնելով շենքի շահագործման ժամկետը։
            </p>

            <Link
              href="#"
              className="text-secondary underline hover:text-white transition-colors w-max"
            >
              Կարդալ ավելին
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

import Container from "@/components/Container";

export default function Hero() {
  return (
    <section className="bg-[#9DCCFF] mt-24">
      <Container className="py-12 tablet:py-20">
        <div className="grid gap-10 laptop:grid-cols-2 items-center">
          <div>
            <p className="text-sm text-black mb-4">
              By Themadbrains in{" "}
              <span className="text-primary font-medium">inspiration</span>
            </p>

            <h1 className="text-3xl tablet:text-4xl laptop:text-5xl font-bold text-[#2b2d4a] leading-tight">
              Why Swift UI Should Be on the Radar of Every Mobile Developer
            </h1>

            <p className="mt-6 text-[#696984] max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing
              elit, sed do eiusmod tempor
            </p>

            <button className="cursor-pointer mt-8 px-6 py-3 bg-primary text-white hover:bg-[49BBBD20] rounded-xl font-medium hover:opacity-90 transition">
              Start learning now
            </button>
          </div>

          <div>
            <img
              src="/hero.png"
              alt="Virtual class"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/Container";
import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="bg-white text-white">
      <Container className="py-16">
        <div className="grid gap-12 laptop:grid-cols-2 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Label */}
            <p className="text-sm tracking-widest text-[#696984] mb-4">
              — TESTIMONIAL
            </p>

            {/* Title */}
            <h2 className="text-3xl tablet:text-4xl laptop:text-5xl font-bold text-[#2F327D] mb-6">
              What They Say?
            </h2>

            {/* Text */}
            <div className="space-y-4 text-[#696984] max-w-md">
              <p>
                TOTC has got more than 100k positive ratings from our users
                around the world.
              </p>
              <p>
                Some of the students and teachers were greatly helped by the
                Skilline.
              </p>
              <p>Are you too? Please give your assessment</p>
            </div>

            {/* Button */}
            <button className="cursor-pointer mt-8 flex items-center gap-4 border border-teal-400 text-teal-400 px-6 py-3 rounded-full hover:bg-teal-400 hover:text-black transition">
              Write your assessment
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-teal-400">
                →
              </span>
            </button>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/testimonials.png" // 👈 put your image in /public/images
                alt="Student"
                width={500}
                height={821}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Review Card */}
            <div className="absolute -bottom-10 left-6 right-6 bg-white text-gray-700 rounded-2xl p-6 shadow-xl">
              <div className="border-l-2 border-orange-400 pl-4">
                <p className="text-sm leading-relaxed">
                  "Thank you so much for your help. It's exactly what I've been
                  looking for. You won't regret it. It really saves me time and
                  effort. TOTC is exactly what our business has been lacking."
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-6">
                <p className="font-medium">Gloria Rose</p>

                <div className="text-right">
                  <div className="text-orange-400">★★★★★</div>
                  <p className="text-xs text-gray-500">12 reviews at Yelp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

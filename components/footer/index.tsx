import Container from "@/components/Container";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#252641] text-white">
      <Container className="py-16 text-center">
        {/* Top (Logo + Title) */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <Image
            src="/logo.jpeg"
            alt="logo"
            width={40}
            height={20}
            className="rounded-full"
          />

          <div className="w-px h-10 bg-gray-500" />

          <p className="text-sm text-gray-300 text-left">Volt Plus</p>
        </div>

        {/* Newsletter */}
        <h3 className="text-lg text-gray-300 mb-6">
          Subscribe to get our Newsletter
        </h3>

        <div className="flex flex-col mobile:flex-row items-center justify-center gap-4 mb-10">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mobile:w-[350px] px-5 py-3 rounded-full bg-transparent border border-gray-500 placeholder:text-gray-400 outline-none"
          />

          <button className="px-6 py-3 rounded-full bg-teal-400 text-white font-medium">
            Subscribe
          </button>
        </div>

        {/* Contact Info */}
        <div className="text-gray-400 text-sm mb-6 space-y-2">
          <p>📍 Shengavit Mantashyan poxoc 4/7, Yerevan, Armenia</p>
          <p>📞 +374 33011098</p>
          <p>📞 +374 77745774</p>
          <p>✉️ hak-artur90@mail</p>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-4 text-gray-400 text-sm mb-4 flex-wrap">
          <a href="#">Careers</a>
          <span>|</span>
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms & Conditions</a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">© 2026 Volt Plus Inc.</p>
      </Container>
    </footer>
  );
}

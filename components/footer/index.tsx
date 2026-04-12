import Container from "@/components/Container";
import Image from "next/image";
import NewsletterForm from "@/components/footer/NewsletterForm";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-[#252641] text-white">
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
          Բաժանորդագրվեք՝ ստանալու նորություններ էլ․ փոստով
        </h3>

        <NewsletterForm />

        {/* Contact Info */}
        <div className="text-gray-400 text-sm mb-6 space-y-2">
          <p>📍 Shengavit Mantashyan poxoc 4/7, Yerevan, Armenia</p>
          <p>📞 +374 33011098</p>
          <p>📞 +374 77745774</p>
          <p>✉️ hak-artur90@mail</p>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-4 text-gray-400 text-sm mb-4 flex-wrap">
          <a href="#">Կարիերա</a>
          <span>|</span>
          <a href="#">Գաղտնիության քաղաքականություն</a>
          <span>|</span>
          <a href="#">Օգտագործման պայմաններ</a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">© 2026 Volt Plus</p>
      </Container>
    </footer>
  );
}

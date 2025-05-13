import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Individuals", href: "#individuals" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact Us", href: "#contact" },
];

export default function Header() {
  return (
    <header className="w-full bg-[#F5F8FC] py-3 px-4 md:px-12 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Dosth AI Logo" width={40} height={40} className="rounded-xl" />
        <span className="text-xl font-bold text-gray-800">Dosth AI</span>
      </div>
      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map(link => (
          <a key={link.name} href={link.href} className="text-gray-600 font-medium hover:text-[#7B2FF2] transition">{link.name}</a>
        ))}
      </nav>
      <Link href="/pages/signin" className="ml-6 px-6 py-2 rounded-lg bg-[#7B2FF2] text-white font-semibold shadow hover:bg-[#6100FF] transition text-center">Sign In</Link>
    </header>
  );
} 
import { Check, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo1.jpg";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-transparent text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg">
            <Image src={Logo} alt="Graced Couture Logo" width={80} height={80} className="rounded-full" />
          </div>
        </div>

        {/* Checkmark */}
        <div className="flex justify-center -mb-12 relative z-10">
          <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Check className="h-10 w-10 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-gray-900/90 border border-gray-700 p-8 rounded-xl shadow-2xl">
          <div className="space-y-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 tracking-tight">
              Thank You for Being a Part of Our Mission!
            </h1>
            {/* Message */}
            <p className="text-xl text-teal-100 font-light leading-relaxed">
              At <span className="font-bold text-teal-300">Graced Couture</span>, we believe that beauty and faith go hand in hand.
              Your support allows us to continue spreading the love and light of Christ through our work.
            </p>

            <p className="text-gray-300 italic">
              May this piece remind you of His grace, and may you wear it as a reflection of His love.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/">
                <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md transition">
                  Continue Spreading Grace
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Social Share */}
        <div className="text-center space-y-4">
          <p className="text-teal-200 font-semibold tracking-wide">
            Share the message of grace and love!
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-500 transition-all shadow-md">
              <Facebook className="h-5 w-5 text-white" />
              <span className="sr-only">Share on Facebook</span>
            </Link>
            <Link href="#" className="bg-sky-500 p-3 rounded-full hover:bg-sky-400 transition-all shadow-md">
              <Twitter className="h-5 w-5 text-white" />
              <span className="sr-only">Share on Twitter</span>
            </Link>
            <Link href="#" className="bg-pink-600 p-3 rounded-full hover:bg-pink-500 transition-all shadow-md">
              <Instagram className="h-5 w-5 text-white" />
              <span className="sr-only">Share on Instagram</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-teal-500/70 text-sm pt-8 font-light">
          <p>© {new Date().getFullYear()} Graced Couture. Spreading Christ Through Elegance.</p>
        </footer>
      </div>
    </div>
  );
}

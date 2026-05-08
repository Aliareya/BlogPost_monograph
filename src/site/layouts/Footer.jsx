import { Icon } from "@iconify/react";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#214252] text-white pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* top */}
        <div className="grid gap-12 lg:grid-cols-12 border-b border-white/10 pb-14">
          
          {/* brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={logo}
                alt="AreyaPulse"
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-bold italic">
                AreyaPulse
              </span>
            </div>

            <p className="mt-6 text-slate-300 leading-8 max-w-md">
              AreyaPulse is a modern publishing platform built for
              curious minds—sharing stories, ideas, technology,
              programming knowledge, and inspiration from around the world.
            </p>

            {/* social */}
            <div className="mt-8 flex gap-4">
              {[
                "ri:facebook-fill",
                "ri:twitter-x-fill",
                "ri:instagram-fill",
                "ri:linkedin-fill",
                "ri:youtube-fill",
              ].map((icon, index) => (
                <button
                  key={index}
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#132933] transition"
                >
                  <Icon icon={icon} width="20" />
                </button>
              ))}
            </div>
          </div>

          {/* links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">
              Explore
            </h3>

            <ul className="space-y-4 text-slate-300">
              <li className="hover:text-white transition cursor-pointer">
                Home
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Blogs
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Categories
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Authors
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* categories */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">
              Categories
            </h3>

            <ul className="space-y-4 text-slate-300">
              <li className="hover:text-white transition cursor-pointer">
                Technology
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Programming
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Business
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Design
              </li>
              <li className="hover:text-white transition cursor-pointer">
                AI & Future
              </li>
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-slate-300">
              <div className="flex gap-3">
                <Icon icon="solar:letter-linear" width="20" />
                <span>hello@areyapulse.com</span>
              </div>

              <div className="flex gap-3">
                <Icon icon="solar:phone-linear" width="20" />
                <span>+1 (000) 123-4567</span>
              </div>

              <div className="flex gap-3">
                <Icon icon="solar:map-point-linear" width="20" />
                <span>Montreal, Canada</span>
              </div>
            </div>

            {/* small newsletter */}
            <div className="mt-8 flex rounded-xl overflow-hidden border border-white/10">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-14 px-5 bg-white/10 outline-none text-white placeholder:text-slate-400"
              />

              <button className="px-6 bg-white text-[#132933] font-semibold hover:bg-slate-200 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-5 text-sm text-slate-400">
          <p>
            © 2026 AreyaPulse. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
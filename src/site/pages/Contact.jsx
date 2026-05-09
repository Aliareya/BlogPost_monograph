import { Icon } from "@iconify/react";
import p1 from "../../assets/images/p1.jpg"

export default function Contact() {
  const contactInfo = [
    {
      icon: "solar:letter-bold",
      title: "Email Us",
      value: "hello@areyapulse.com",
      desc: "Send us your questions anytime.",
    },
    {
      icon: "solar:phone-calling-bold",
      title: "Call Us",
      value: "+1 (000) 123-4567",
      desc: "Available Monday to Friday.",
    },
    {
      icon: "solar:map-point-bold",
      title: "Visit Us",
      value: "Montreal, Canada",
      desc: "Come say hello at our office.",
    },
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(53deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_89%,_#F5F6F7_100%)]">
      {/* Hero */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <span className="px-5 py-2 rounded-full bg-white/20 text-white border border-white/20 text-sm">
            Contact Us
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold text-white">
            Let’s Connect
          </h1>

          <p className="mt-6 text-lg text-slate-100 max-w-2xl mx-auto leading-8">
            Have questions, ideas, or feedback? We'd love to hear from you.
            Reach out and our team will get back to you soon.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="pb-14 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-7">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="bg-[linear-gradient(53deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_89%,_#F5F6F7_100%)] backdrop-blur-xl border border-white/30 rounded-[28px] p-8 shadow-xl text-center hover:-translate-y-2 transition"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%)] flex items-center justify-center">
                <Icon icon={item.icon} width="28" className="text-white" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-100">
                {item.title}
              </h3>

              <p className="mt-3 font-medium text-slate-200">
                {item.value}
              </p>

              <p className="mt-2 text-slate-200">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form + map */}
      <section className="pb-24 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10">
          
          {/* Form */}
          <div className="bg-[linear-gradient(53deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_89%,_#F5F6F7_100%)] backdrop-blur-xl border border-white/30 rounded-[32px] p-8 md:p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-100">
              Send a Message
            </h2>

            <p className="mt-3 text-slate-200 leading-7">
              Fill out the form below and we’ll respond as soon as possible.
            </p>

            <div className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full h-14 px-5 rounded-xl border border-slate-200 outline-none focus:border-[#214252]"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full h-14 px-5 rounded-xl border border-slate-200 outline-none focus:border-[#214252]"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full h-14 px-5 rounded-xl border border-slate-200 outline-none focus:border-[#214252]"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full p-5 rounded-xl border border-slate-200 outline-none focus:border-[#214252] resize-none"
              ></textarea>

              <button className="w-full h-14 rounded-xl bg-[#214252] text-white font-semibold hover:scale-[1.02] transition">
                Send Message
              </button>
            </div>
          </div>

          {/* Map / Info card */}
          <div className="bg-[linear-gradient(53deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_89%,_#F5F6F7_100%)]  backdrop-blur-xl border border-white/30 rounded-[32px] p-6 shadow-2xl">
            <div className="w-full h-full min-h-[620px] rounded-[28px] overflow-hidden relative">
              <img
                src={p1}
                alt=""
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-[#214252]">
                  Our Office
                </h3>

                <p className="mt-3 text-slate-600 leading-7">
                  Visit our creative workspace where ideas become stories.
                </p>

                <div className="mt-5 flex items-center gap-2 text-[#214252] font-medium">
                  <Icon icon="solar:map-point-bold" width="20" />
                  Montreal, Canada
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
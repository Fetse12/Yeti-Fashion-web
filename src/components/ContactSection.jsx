import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Form Side */}
          <div className="order-2 lg:order-1">
            <h2 className="font-sans text-4xl font-black uppercase tracking-tight text-neutral-900 sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mt-4 font-sans text-lg text-neutral-600">
              Have a project in mind or want to join the academy? Send us a message and we'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full border-b-2 border-neutral-100 bg-transparent py-3 font-sans transition-colors focus:border-yeti-lime focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 w-full border-b-2 border-neutral-100 bg-transparent py-3 font-sans transition-colors focus:border-yeti-lime focus:outline-none"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-2 w-full border-b-2 border-neutral-100 bg-transparent py-3 font-sans transition-colors focus:border-yeti-lime focus:outline-none"
                  placeholder="+251 ..."
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 w-full border-b-2 border-neutral-100 bg-transparent py-3 font-sans transition-colors focus:border-yeti-lime focus:outline-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`flex w-full items-center justify-center rounded-lg py-4 font-sans text-sm font-bold uppercase tracking-widest transition-all ${
                  status === "sending"
                    ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                    : "bg-neutral-900 text-white hover:bg-yeti-lime hover:text-neutral-900"
                }`}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-800">
                  Your message has been sent successfully! We'll reach out soon.
                </div>
              )}
              {status === "error" && (
                <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-800">
                  Something went wrong. Please try again or contact us directly.
                </div>
              )}
            </form>
          </div>

          {/* Map Side */}
          <div className="order-1 h-[400px] overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl lg:order-2 lg:h-[600px]">
            <iframe
              title="Yeti Fashion Location"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.425128033626!2d39.26629!3d8.54471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f6629916ab9%3A0xe78ab0e64c24f60!2sMebrat%20Hail%2C%20Adama!5e0!3m2!1sen!2set!4v1712950000000!5m2!1sen!2set"
              style={{ filter: "grayscale(0.1) contrast(1.1)" }}
            />
            <div className="absolute bottom-10 right-10 z-10 hidden rounded-2xl bg-white p-6 shadow-2xl lg:block">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-yeti-lime">
                Our Location
              </p>
              <h3 className="mt-2 font-sans text-lg font-bold text-neutral-900">
                Ghenet Commercial Center
              </h3>
              <p className="mt-1 font-sans text-sm text-neutral-500">
                4th Floor, Adama Mebrat Hail
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

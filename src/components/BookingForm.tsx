import { useState } from "react";
import { motion } from "motion/react";
import { SERVICES, LOCATIONS, CONTACT } from "../data";
import { Calendar, MapPin, User, MessageCircle, Sparkles } from "lucide-react";

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    service: SERVICES[0],
    location: LOCATIONS[0],
    datetime: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Chinki,\n\nI would like to book a home beauty service.\n\n*Name:* ${formData.name}\n*Service:* ${formData.service}\n*Location:* ${formData.location}\n*Date & Time:* ${formData.datetime}\n\nPlease confirm my appointment!`;
    const url = `https://wa.me/91${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="py-24 bg-rose-50 relative" id="booking">
      <div className="max-w-4xl mx-auto px-6 relative z-10 perspective-[1200px]">
        <motion.div
          initial={{ opacity: 0, rotateX: -10, y: 50 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-rose-100"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-950 mb-3">
              Book Your Appointment
            </h2>
            <p className="text-rose-700/80 font-medium">
              Fill out the details below to book instantly via WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-rose-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-rose-500" /> Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-4 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-rose-950"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Service */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-rose-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-500" /> Select Service
                </label>
                <select
                  className="w-full px-5 py-4 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-rose-950 appearance-none"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-rose-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" /> Select Location
                </label>
                <select
                  className="w-full px-5 py-4 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-rose-950 appearance-none"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                >
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <p className="text-xs text-rose-600/70 ml-1">Serving Morar, Lashkar & City Centre for maximum coverage.</p>
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-rose-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-500" /> Preferred Date & Time
                </label>
                <input
                  required
                  type="datetime-local"
                  className="w-full px-5 py-4 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-rose-950"
                  value={formData.datetime}
                  onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-xl shadow-green-500/20 transition-all flex items-center justify-center gap-3 mt-8"
            >
              <MessageCircle className="w-6 h-6" /> Book via WhatsApp
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { SERVICES } from "../data";
import { Sparkles } from "lucide-react";

export function ServicesGrid() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-rose-950 mb-4"
          >
            Our Premium Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-rose-700/70 max-w-2xl mx-auto font-medium"
          >
            A complete range of beauty treatments brought directly to your home, exclusively for women.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 perspective-[1000px]">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                rotateX: 5,
                rotateY: -5,
                z: 50,
                boxShadow: "0 20px 25px -5px rgba(225, 29, 72, 0.15), 0 8px 10px -6px rgba(225, 29, 72, 0.1)"
              }}
              className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer transform-style-3d backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-rose-400 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-rose-950 font-semibold text-[15px] md:text-base leading-tight">
                {service}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* 3D Floating Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, -40, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ y: [0, 60, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full perspective-[2000px]">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          className="relative w-full"
        >
          <motion.div
            whileHover={{ rotateX: 2, rotateY: -2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/50 backdrop-blur-2xl border border-white/60 p-8 md:p-16 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center transform-style-3d"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 font-medium text-sm md:text-base mb-6 shadow-sm border border-rose-200"
            >
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>Exclusive Female Home Services</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-rose-950 font-bold leading-tight mb-6 tracking-tight">
              Premium Beauty Salon <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                At Your Doorstep
              </span>
            </h1>

            <p className="text-lg md:text-xl text-rose-800/80 max-w-2xl font-medium mb-10 leading-relaxed">
              Experience luxurious, professional salon services in the comfort of your own home. Welcome to Chinki's Beauty Home Service.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-3 bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-rose-600/30 hover:bg-rose-700 transition-colors"
              >
                Book Appointment <Sparkles className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="px-10 py-4 bg-zinc-900/50 border border-zinc-800 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md transition-all"
      >
        Work With Me
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-950 border border-zinc-800 w-full max-w-xl rounded-[3rem] p-10 md:p-16 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-zinc-500 hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-4xl font-bold mb-2">Let's Connect.</h2>
              <p className="text-zinc-500 mb-10 text-sm">
                Briefly describe your vision and I'll get back to you.
              </p>

              <form action="#" className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-blue-500 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-blue-500 text-sm"
                />
                <textarea
                  placeholder="Tell me about the project"
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-blue-500 text-sm resize-none"
                ></textarea>
                <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-500 transition-all">
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

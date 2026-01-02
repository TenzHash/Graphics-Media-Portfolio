import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxImage from "./ParallaxImage";

export default function ProjectGrid({ projects }: { projects: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = projects.map((p) => p.data.category);
    return ["All", ...new Set(cats)];
  }, [projects]);

  const filtered = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((p) => p.data.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="w-full">
      {/* Centered Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border ${
              activeCategory === cat
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CHANGES MADE HERE:
          - Changed to 'md:grid-cols-3' to make cards smaller by sharing width.
          - Tightened the gap to 'gap-8'.
      */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group"
            >
              <a href={`/projects/${project.slug}`} className="block relative">
                {/* ASPECT RATIO CHANGE:
                    - Changed to 'aspect-square' or 'aspect-[16/10]' to reduce vertical height.
                */}
                <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-zinc-900 border border-zinc-800/50 transition-all duration-500 group-hover:border-blue-500/30">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    <ParallaxImage
                      src={project.data.image}
                      alt={project.data.title}
                    />
                  </div>

                  {/* Overlay Content (More compact padding) */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black tracking-[0.2em] uppercase text-blue-500">
                        {project.data.category}
                      </span>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {project.data.title}
                      </h3>
                      {/* Description only shows on hover to keep it clean */}
                      <p className="text-zinc-400 text-[11px] mt-1 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                        {project.data.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

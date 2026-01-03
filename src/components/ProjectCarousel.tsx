import React from "react";
import { motion } from "framer-motion";

export default function ProjectCarousel({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <div className="relative w-full overflow-hidden flex items-center h-full group">
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicatedProjects.map((project, i) => (
          <div
            key={`${project.slug}-${i}`}
            className="min-w-[85vw] md:min-w-[33.33vw] px-4 md:px-6 shrink-0"
          >
            <a
              href={`/projects/${project.slug}`}
              className="block relative group/card"
            >
              <div className="relative aspect-[9/14] md:aspect-[16/10] w-full rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 group-hover/card:border-blue-500 shadow-2xl">
                {/* LAYER 1: The Static Image (ALWAYS there) 
                    This acts as the "safety net". If the video lags, this is what shows.
                */}
                <img
                  src={project.data.image}
                  alt={project.data.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
                />

                {/* LAYER 2: The Video (Sits on top) */}
                {project.data.video_url && (
                  <video
                    src={project.data.video_url}
                    poster={project.data.image} /* Native browser fallback */
                    preload="auto" /* Tell browser to keep this ready */
                    autoPlay
                    loop
                    muted
                    playsInline
                    /* object-cover: Fills the card. z-10 puts it above the image. */
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />
                )}

                {/* LAYER 3: Text Content (Highest Z-index) */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent z-20">
                  <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-blue-500 mb-2">
                    {project.data.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">
                    {project.data.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

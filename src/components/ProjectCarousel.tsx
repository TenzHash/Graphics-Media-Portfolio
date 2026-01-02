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
            className="min-w-[45vw] md:min-w-[33.33vw] px-6 shrink-0"
          >
            <a
              href={`/projects/${project.slug}`}
              className="block relative group/card"
            >
              <div className="relative aspect-[16/10] w-full rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 group-hover/card:border-blue-500 shadow-2xl">
                {project.data.video_url ? (
                  <video
                    src={project.data.video_url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/card:opacity-100 transition-opacity duration-700"
                  />
                ) : (
                  <img
                    src={project.data.image}
                    alt={project.data.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/card:opacity-100 transition-opacity duration-700"
                  />
                )}

                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-blue-500 mb-2">
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

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef(null);

  // We track the progress of the image as it moves through the container
  const { scrollXProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // This creates the parallax shift: as the card moves left,
  // the image moves slightly right (or vice versa)
  const x = useTransform(scrollXProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ x, scale: 1.2 }} // Scale 1.2 ensures no edges show during the shift
        className="absolute inset-0 w-full h-full object-cover"
        onError={
          (e) =>
            (e.currentTarget.src =
              "../assets/bg.jpg") /* Fallback image on error */
        }
      />
    </div>
  );
}

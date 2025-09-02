"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

export default function AnimatedHero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
    }
  }, [])

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center">
      <motion.h1
        ref={titleRef}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl font-extrabold tracking-tight"
      >
        🌌 Dev Connect
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="max-w-xl text-lg text-muted-foreground"
      >
        Where developers don’t just connect — they co-create the future.
      </motion.p>
    </section>
  )
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(143, 245, 255, 0.1)',
      '0 0 40px rgba(143, 245, 255, 0.3)',
      '0 0 20px rgba(143, 245, 255, 0.1)',
    ],
    transition: { duration: 2, repeat: Infinity },
  },
}

import { motion } from "framer-motion";

const trianglePath = [
  { cx: 44, cy: 20 },
  { cx: 64, cy: 64 },
  { cx: 24, cy: 64 },
];

const getCircleAnimation = (delay: any) => ({
  cx: [trianglePath[0].cx, trianglePath[1].cx, trianglePath[2].cx, trianglePath[0].cx],
  cy: [trianglePath[0].cy, trianglePath[1].cy, trianglePath[2].cy, trianglePath[0].cy],
  transition: {
    duration: 3,
    ease: "linear",
    repeat: Infinity,
    delay,
  },
});

export default function LoadingIcon() {
  return (
    <motion.svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="88" height="88" rx="10" fill="#FFD13A" />
      <motion.path
        d="M44 20 L64 64 L24 64 Z"
        fill="none"
        stroke="transparent"
        strokeWidth="0"
        initial={{ pathLength: 0, pathOffset: 1 }}
        animate={{ pathLength: 1, pathOffset: 0 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
      />
      <motion.circle
        cx="44"
        cy="20"
        r="3"
        fill="#141414"
        animate={getCircleAnimation(0)}
      />
      <motion.circle
        cx="44"
        cy="20"
        r="3"
        fill="#141414"
        animate={getCircleAnimation(1)}
      />
      <motion.circle
        cx="44"
        cy="20"
        r="3"
        fill="#141414"
        animate={getCircleAnimation(2)}
      />
    </motion.svg>
  );
}
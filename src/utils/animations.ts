export const animatedList = {
  hidden: {
    transition: {
      staggerChildren: 0.05,
      easing: 'easeOut',
    },
  },
  show: {
    transition: {
      staggerChildren: 0.05,
      easing: 'easeOut',
      delay: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const animatedListItem = {
  hidden: { opacity: 0 },
  exit: { opacity: 0 },
  show: { opacity: 1 },
}

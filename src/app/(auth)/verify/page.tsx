'use client'

import { animatedList, animatedListItem } from '@/utils/animations'
import { motion } from 'framer-motion'

export default function Verify() {
  return (
    <div className="grid grid-cols-2 w-full h-full items-center">
      <motion.div
        className="space-y-6 mt-6 col-start-2 flex flex-col text-xl"
        variants={animatedList}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <motion.div variants={animatedListItem} className="text-info">
          A login link has been sent to your inbox
        </motion.div>
      </motion.div>
    </div>
  )
}

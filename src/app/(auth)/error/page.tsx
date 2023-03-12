'use client'

import { animatedList, animatedListItem } from '@/utils/animations'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

export default function RegisterNewUser() {
  const params = useSearchParams()

  return (
    <div className="grid grid-cols-2 w-full h-full items-center">
      <motion.div
        className="space-y-6 mt-6 col-start-2 flex flex-col text-xl"
        variants={animatedList}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <motion.div variants={animatedListItem} className="text-error">
          Error with {params?.get('error')}
        </motion.div>
        <motion.a
          variants={animatedListItem}
          href="/login"
          className="py-[.5em] leading-none"
        >
          Back to Login
        </motion.a>
      </motion.div>
    </div>
  )
}

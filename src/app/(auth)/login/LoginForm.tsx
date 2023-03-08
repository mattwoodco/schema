'use client'

import { animatedList, animatedListItem } from '@/utils/animations'
import { AnimatePresence, motion } from 'framer-motion'
import { User } from 'next-auth'
import { getCsrfToken, signIn } from 'next-auth/react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

export function LoginForm({
  callbackUrl,
  className,
}: {
  callbackUrl: string
  className: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register } = useForm<User>({
    mode: 'onChange',
    defaultValues: { email: '' },
  })

  const onSubmit = useCallback(
    async (data: Pick<User, 'email'>) => {
      const csrfToken = await getCsrfToken()
      setIsLoading(true)
      return await signIn('email', {
        ...data,
        csrfToken,
        callbackUrl,
      })
    },
    [callbackUrl]
  )

  return (
    <div className={`mt-6 ${className}`}>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            variants={animatedListItem}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col max-w-[30vw] gap-5"
          >
            <Image
              src="/images/spinner.svg"
              alt="loading"
              width="200"
              height="200"
            />
          </motion.div>
        ) : (
          <motion.form
            className="space-y-6"
            variants={animatedList}
            initial="hidden"
            animate="show"
            exit="hidden"
            onSubmit={handleSubmit(onSubmit)}
          >
            <motion.div
              variants={animatedListItem}
              className="flex flex-col max-w-[30vw] gap-5"
            >
              <label
                // notice this this "1vw"
                className="text-[1vw] px-4"
              >
                Email Address
              </label>
              <input
                {...register('email')}
                placeholder="jane@doe.com"
                // notice this this "3vw"
                className="text-[3vw] p-5 appearance-none border-0  rounded"
              />
            </motion.div>

            <motion.div variants={animatedListItem}>
              <button
                type="submit"
                // notice this this "2vw"
                className="text-[2vw] px-[1.2em] py-[.5em]  rounded leading-none"
              >
                Sign in
              </button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

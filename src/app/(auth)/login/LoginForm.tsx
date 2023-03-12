'use client'

import { Spinner } from '@/components/svgs/Spinner'
import { animatedList, animatedListItem } from '@/utils/animations'
import { AnimatePresence, motion } from 'framer-motion'
import { User } from 'next-auth'
import { getCsrfToken, signIn } from 'next-auth/react'
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
    <div className={`mt-6 ${className} w-full`}>
      <AnimatePresence>
        {isLoading ? (
          <div className="fixed w-screen h-screen top-0 left-0 items-center justify-center flex">
            <motion.div
              variants={animatedListItem}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col max-w-[30vw] gap-5 w-20 h-20 md:w-[6vw] md:h-[6vw]"
            >
              <Spinner />
            </motion.div>
          </div>
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
              className="flex flex-col max-w-[60vw] lg:max-w-[30vw] gap-5"
            >
              <label
                // notice this this "1vw"
                className="text-3xl lg:text-[1.5vw] px-4"
              >
                Email Address
              </label>
              <input
                {...register('email')}
                placeholder="jane@doe.com"
                // notice this this "3vw"
                className="text-2xl xl:text-[1.75vw] px-[1.4em] rounded placeholder:text-current"
              />
            </motion.div>

            <motion.div variants={animatedListItem}>
              <button
                type="submit"
                // notice this this "2vw"
                className="text-2xl xl:text-[2vw] px-[1.2em] py-[.5em] leading-none"
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

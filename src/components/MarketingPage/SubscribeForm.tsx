'use client'

import axios from 'axios'
import { useCallback, useState } from 'react'

async function addContactToCampaign(email: string): Promise<void> {
  try {
    const response = await axios.post('/api/subscribe', { email })

    if (response.status !== 202) {
      throw new Error('Something went wrong')
    }

    return response.data
  } catch (error) {
    console.error(error)
  }
}

const SubscribeForm = () => {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')
  const [errorMsg, setErrorMsg] = useState(null)

  const subscribe = useCallback(
    async (e: any) => {
      e.preventDefault()
      if (!email || state === 'Loading') {
        return
      }
      setState('Loading')

      try {
        await addContactToCampaign(email)
        // TODO - Add error handling
        setState('Success')
        setEmail('')
      } catch (e) {
        // @ts-ignore
        setErrorMsg(e.response.data.error as unknown as string)
        setState('Error')
      }
    },
    [email, state]
  )

  return (
    <div className="w-full">
      <form
        action="#"
        className="sm:mx-auto text-[3vw] max-w-screen-lg mx-auto px-6 md:px-0 xl:px-0 gap-8 flex flex-col py-10 sm:pt-20 sm:pb-4"
      >
        <div className="text-2xl sm:text-[2.4vw]">
          Join our waitlist for our upcoming beta launch
        </div>
        {/* <div className="py-10">
        </div> */}

        <div className="flex gap-5 flex-col sm:flex-row justify-start items-start">
          <div className="min-w-0 ">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              required
              id="email-input"
              name="email"
              type="email"
              placeholder="ella@mattwood.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-xl md:text-[2.5vw] p-5 appearance-none border-0 cursor-pointer  rounded panel-primary"
            />
          </div>
          <button
            type="submit"
            disabled={state === 'Loading'}
            onClick={subscribe}
            className="border-0 px-10 py-5 text-xl md:text-[2.5vw] cursor-pointer hover:bg-opacity-100 text-current  rounded panel-secondary"
          >
            Get Notified
          </button>
        </div>
        {state === 'Error' && <div className="text-error">{errorMsg}</div>}
        {state === 'Success' && (
          <div className="py-7">Awesome, you&apos;ve been subscribed!</div>
        )}
      </form>
    </div>
  )
}

export default SubscribeForm

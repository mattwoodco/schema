'use client'

import { FormGenerator } from '@/components/FormGenerator/FormGenerator'
import CodeEditor from '@uiw/react-textarea-code-editor'
import CryptoJS from 'crypto-js'
import { atom } from 'jotai'
import yaml from 'js-yaml'
import { useSearchParams } from 'next/navigation'
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import 'rehype'
import ErrorBoundary from '../ErrorBoundary'
import EditorFooter from './EditorFooter'

export const isEditingAtom = atom(false) // may not need this
export const HASH_SALT = process.env.NEXT_PUBLIC_HASH_SALT as string

export default function Editor() {
  const [hasChecked, setHasChecked] = useState(false)
  const [code, setCode] = useState('')

  const searchParams = useSearchParams()
  const codeHasChangedRef = useRef('')
  const parsedYaml = useMemo(() => {
    // if this the first time we are checking, and there is a schema in the address bar, remove it, so we don't get stuck in a loop
    if (hasChecked && codeHasChangedRef.current !== ('' || code)) {
      window.history.replaceState(null, '', '/')
    }

    let out
    try {
      out = yaml.load(code)
    } catch (error) {
      return null
    }
    return JSON.stringify(out, null, 2)
  }, [code, hasChecked])

  const shareUrl = useMemo(() => {
    if (!parsedYaml) return null
    if (!window) return null

    const encriptedString = CryptoJS.AES.encrypt(
      JSON.stringify(parsedYaml),
      HASH_SALT
    ).toString()

    const url = `${window.location.origin}/?schema=${encodeURIComponent(
      encriptedString
    )}`

    return url
  }, [parsedYaml])

  const onShareClick = useCallback(async () => {
    if (shareUrl === null) return
    await navigator.clipboard.writeText(shareUrl as string)
    alert(`Form copied to clipboard ${shareUrl}`)
  }, [shareUrl])

  useEffect(() => {
    const hashedSchema = searchParams?.get('schema')
    if (!hashedSchema || parsedYaml) {
      setHasChecked(true)
      return
    }

    const bytes = CryptoJS.AES.decrypt(hashedSchema, HASH_SALT)
    const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    const originalCode = yaml.dump(JSON.parse(originalText))

    setCode(originalCode)
    setHasChecked(true)
    codeHasChangedRef.current = originalCode
  }, [])

  const fields = useMemo(() => {
    if (!parsedYaml) return ''
    return JSON.parse(parsedYaml)
  }, [parsedYaml])

  if (!hasChecked) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-4xl opacity-20">
        ... Loading
      </div>
    )
  }

  return (
    <>
      <div className=" flex snap max-w-screen snap-mandatory snap-x md:grid md:grid-cols-2 flex-1 text-2xl relative z-0 overflow-auto">
        <div className="w-[100vw] md:w-auto flex snap-center flex-shrink-0 relative">
          <CodeEditor
            value={code}
            language="markdown"
            placeholder={`... Please enter a form schema`}
            onChange={(evn: any) => setCode(evn.target.value)}
            padding={40}
            style={{
              width: '100%',
              fontSize: '1.5rem',
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </div>
        <div className="w-[100vw] md:w-auto flex flex-shrink-0 snap-center relative">
          <div className="m-12">
            <Suspense
              fallback={
                <div className="bg-background-light p-10 rounded flex flex-col gap-2">
                  <p>Loading...</p>
                </div>
              }
            >
              {!fields ||
              typeof fields !== ('object' || 'array') ? null : fields &&
                fields?.length > 0 ? (
                <ErrorBoundary fallback={<p>Something went wrong</p>}>
                  <FormGenerator
                    fields={fields}
                    onSubmit={(data: any) => console.log(data)}
                  />
                </ErrorBoundary>
              ) : (
                <div className="bg-background-light p-10 rounded flex flex-col gap-2">
                  <p>Please check the syntax</p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
      <EditorFooter onShareClick={fields && onShareClick} />
    </>
  )
}

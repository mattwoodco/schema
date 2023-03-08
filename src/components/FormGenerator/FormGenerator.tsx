'use client'

import { isEditingAtom } from '@/components/Editor/Editor'
import { capitalCase } from 'change-case'
import { useAtom } from 'jotai'
import { ReactNode, useState } from 'react'
import { FieldError, FormProvider, useForm } from 'react-hook-form'
import { ControlType, DynamicFieldData } from './dynamic-form'
import { DynamicControl } from './DynamicControl'

export const FormGenerator = ({
  fields,
  onSubmit,
}: {
  fields: DynamicFieldData[]
  onSubmit: (data: any) => void
}) => {
  const formMethods = useForm()

  const [successMessage, setSuccessMessage] = useState('')
  const [isEditing, setValue] = useAtom(isEditingAtom)

  if (!fields || isEditing) return null

  return (
    <form
      onSubmit={formMethods.handleSubmit(onSubmit)}
      className="flex flex-col gap-12 h-full"
    >
      <FormProvider {...formMethods}>
        {
          // we need to clean up the data
          fields
            // use the show_if value to determine if we should show the field
            .map((d) => {
              if (!d?.show_if) return d
              if (d?.show_if) {
                // check the first key of the show_if object
                // todo: support multiple keys
                const [key, value] = Object.entries(d.show_if)[0]

                formMethods.watch(key)

                return formMethods.watch(key) === value ? d : null
              }
              return d
            })
            // if the field is a string, convert the key to the name and label
            .map((d) =>
              typeof d === 'string' ? { name: d, label: capitalCase(d) } : d
            )
            // if the field has options, but no type, set the type to select
            .map((d) =>
              d?.options && !d?.type
                ? { ...d, type: 'select' as ControlType }
                : d
            )
            // filter out any fields that don't have a name
            .filter((d) => d && d.name)
            .map((d, i) =>
              // if the field is null, don't render it
              !d ? null : (
                <div key={i} className="flex flex-col gap-2 items-start w-full">
                  {d.prompt && <span className="text-3xl">{d.prompt}</span>}
                  <label
                    htmlFor={d.name}
                    className="flex gap-3 items-center cursor-pointer w-full"
                  >
                    {!d?.type ||
                    ![
                      'text',
                      'select',
                      'number',
                      'date',
                      'time',
                      'datetime',
                      'textarea',
                      'email',
                      'tel',
                      'url',
                      'range',
                      'search',
                      'hidden',
                      'month',
                      'week',
                      'multiselect',
                    ].includes(d.type) ? (
                      <>
                        <DynamicControl {...d} />
                        <span>{d?.label || capitalCase(d?.name)}</span>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2 w-full items-start">
                        <span>{d.label || capitalCase(d.name)}</span>
                        <DynamicControl {...d} />
                      </div>
                    )}
                  </label>
                  <div className="text-sm">
                    <div className="text-error">
                      {
                        (
                          formMethods.formState.errors[d.name] as ReactNode &
                            FieldError
                        )?.message
                      }
                    </div>
                    {successMessage && (
                      <div className="text-success">{successMessage}</div>
                    )}
                    {d.helperText && (
                      <div className="text-info text-sm">{d.helperText}</div>
                    )}
                  </div>
                </div>
              )
            )
        }
      </FormProvider>
      <div className="border-t-2 border-white/10" />
      <button
        type="submit"
        className="w-auto disabled:opacity-30 disabled:cursor-not-allowed self-start px-20"
        disabled
      >
        Submit
      </button>
    </form>
  )
}

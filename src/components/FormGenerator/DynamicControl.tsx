'use client'

import { useFormContext } from 'react-hook-form'
import { DynamicFieldData } from './dynamic-form'

export const DynamicControl = ({
  type,
  name,
  defaultValue,
  placeholder,
  options = [],
  config = {},
  min,
  max,
  step,
  accept,
  multiple,
  minlength,
  maxlength,
}: DynamicFieldData) => {
  const { register } = useFormContext()

  switch (type) {
    case 'text':
      return (
        <input
          type="text"
          {...register(name, config)}
          defaultValue={defaultValue}
          className="form-input w-full"
          placeholder={placeholder}
        />
      )
    case 'date':
      return (
        <input
          type="date"
          {...register(name, config)}
          defaultValue={defaultValue}
          className="form-input w-full"
        />
      )
    case 'select': {
      return (
        <select
          {...register(name, config)}
          defaultValue={defaultValue}
          name={name}
          id={name}
          className="form-select w-full"
        >
          {options.map((o, index) => (
            <option key={index} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )
    }
    case 'multiselect': {
      return (
        <select
          {...register(name, config)}
          defaultValue={defaultValue}
          name={name}
          id={name}
          className="form-multiselect min-w-1/2 w-full"
        >
          {options.map((o, index) => (
            <option key={index} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )
    }
    case 'number':
      return (
        <input
          type="number"
          {...register(name, config)}
          defaultValue={defaultValue}
          className="form-input"
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
        />
      )
    case 'textarea':
      return (
        <textarea
          rows={3}
          {...register(name, config)}
          defaultValue={defaultValue}
          className="form-textarea w-full"
          placeholder={placeholder}
        />
      )

    // The default case is for a boolean, checkbox value
    case undefined:
    case null:
    case '':
    case 'checkbox':
    case 'toggle':
    default:
      return (
        <input
          type="checkbox"
          role="switch"
          id={name}
          {...register(name, config)}
          defaultChecked={defaultValue}
          className="form-checkbox w-6 h-6"
        />
      )
  }
}

import { RegisterOptions } from 'react-hook-form'

export type ControlType =
  | ''
  | 'checkbox'
  | 'toggle'
  | 'file'
  | 'radio'
  | 'text'
  | 'select'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime'
  | 'textarea'
  | 'email'
  | 'tel'
  | 'url'
  | 'range'
  | 'search'
  | 'hidden'
  | 'month'
  | 'week'
  | 'multiselect'

export interface SelectOption {
  label: string
  value: string
}

export interface DynamicFieldData extends Partial<HTMLFormElement> {
  label: string
  type?: ControlType
  name: string
  defaultValue?: any
  placeholder?: string
  options?: SelectOption[]
  config?: RegisterOptions
  prompt?: string
  helperText?: string
  show_if?: {
    [key: string]: boolean | string | number
  }
}

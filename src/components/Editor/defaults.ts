export const defaultString = `
- name: passLastInspection
  prompt:  pass inspection?
  defaultValue: true
- name: lastInspectionDate
  type: date
  label: (Conditional) OFF
  show_if:
    passLastInspection: false 
- name: photos
  type: dynamicGroup
  label: Photos
  prompt: Please upload photos of the chemical
  addButtonText: Add Photo
  removeButtonText: Remove Photo
  fields:
  - name: photo
    type: image
    label: Photo
    
- name: pH
  type: number
  label: pH
  prompt: What is the pH of the chemical?
  min: 0
  max: 14
  step: 0.1
- name: purity
  type: number
  label: Purity
  prompt: What is the purity of the chemical?
  min: 0
  max: 100
- isSatisfactory
- name: test
  type: textarea
- name: chemical_operating_standard
  required: true
  label: Operating Standard
  prompt: Is this chemical manufactured in accordance with an operating standard?
  helperText: Operating standards are a set of rules that govern the manufacture of a chemical. They are usually developed by a professional body or industry association.
- name: name
  type: text
  label: Name
  defaultValue: ''
- name: age
  type: number
  label: Age
  defaultValue: 18
- name: language
  type: select
  label: Language
  options:
  - value: english
    label: English
  - value: french
    label: French
  defaultValue: english
- name: address
  type: text
  label: Address
  defaultValue: ''`

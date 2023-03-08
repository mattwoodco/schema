# Schema

A simple and extensible document specification for generating forms that can easily be shared in chat rooms, email or other communication channels, and understood by both technical and non-technical people.

Form Schema can be used to generate forms in HTML, JSON, Markdown, and Excel. It can also serve as database schema, using each field as a record.

## Features

- Intuitive structure and syntax
- Supports complex data structures
- Conditional logic, including nested conditions
- Can be easily validated and parsed
- Ideal for automation and programmatic manipulation of form data
- Extensible to support additional form types, such as financial, risk, and related forms

## Motivation:

- Promote collaboration between engineers, product owners, developers, and other stakeholders by share upstream with other projects, if requested
- Speed up business requirements gathering
- Set a baseline for the future application state, with more intelligent forms

## Examples

**Basic Yes / No**

```yaml
- name: approved
  prompt: Is this chemical approved for use?
```

This snippet defines a simple yes/no field for determining whether a chemical is approved for use.

**Required Yes / No, with optional form label**

```yaml
- name: chemical_operating_standard
  required: true
  label: Operating Standard
  prompt: Is this chemical manufactured in accordance with an operating standard?
```

This snippet defines a required yes/no field for determining whether a chemical is manufactured in accordance with an operating standard.

**Multiple Choice**

```yaml
- name: chemical_type
  type: dropdown # or radio, checkbox, autocomplete
  label: Chemical Type
  prompt: What type of chemical is this?
  options:
    - Organic
    - Inorganic
    - Biological
```

This snippet defines a dropdown field for selecting the type of chemical, with options for organic, inorganic, and biological.

**Multiple Choice, only one allowed**

```yaml
- name: chemical_properties
  type: radio
  options:
    - Flammable
    - Toxic
    - Corrosive
```

This snippet defines a radio field for selecting the properties of a chemical, with options for flammable, toxic, and corrosive.

**Multiple Choice, multiple allowed**

```yaml
- name: chemical_properties
  type: checkbox
  label: Chemical Properties
  prompt: What are the properties of the chemical?
  options:
    - Flammable
    - Toxic
    - Corrosive
    - Explosive
```

This snippet defines a checkbox field for selecting the properties of a chemical, with options for flammable, toxic, corrosive, and explosive.

**Text Field**

```yaml
- name: common_name
  type: text
  prompt: What is the common name of the chemical?
```

This snippet defines a simple text field for entering the name of a chemical.

**Date Field, Hidden by default, conditionally shown**

```yaml
- name: last_inspection_date
  type: date
  label: Last Inspection Date
  prompt: When was the chemical last inspected?
  show_if:
    last_inspection_result: Fail
```

This snippet defines a date field for entering the date of the last inspection of a chemical, which is hidden by default and only shown if the last inspection result is a failure.

**Number Field with Range**

```yaml
- name: purity
  type: number
  label: Purity
  prompt: What is the purity of the chemical?
  min: 0
  max: 100
```

This snippet defines a number field for entering the purity of a chemical, with a range of 0 to 100.

**Number Field with Decimal Step**

```yaml
- name: pH
  type: number
  label: pH
  prompt: What is the pH of the chemical?
  min: 0
  max: 14
  step: 0.1
```

This snippet defines a number field for entering the pH level of a chemical, with a range of 0 to 14 and a decimal step of 0.1.

**Nested Fields**

```yaml
- name: production_information
  type: group
  label: Production Information
  fields:
    - name: chemical_name
      type: text
      label: Chemical Name
      prompt: What is the name of the chemical you are manufacturing?
    - name: batch_number
      type: text
      label: Batch Number
      prompt: What is the batch number of the chemical?
    - name: production_date
      type: date
      label: Production Date
      prompt: When was the chemical produced?
      hide_if:
        chemical_name:
          contains: Acid
```

This snippet defines a nested section for production information, with fields for chemical name, batch number, and production date.

**Dropdown Field with conditional using 'show_if'**

```yaml
- name: chemical_type
  type: dropdown
  label: Chemical Type
  prompt: What type of chemical is this?
  options:
    - Organic
    - Inorganic
    - Biological
  show_if:
    chemical_name:
      contains: Acid
```

This snippet defines a dropdown field for selecting the type of chemical, with options for organic, inorganic, and biological.

**Field Group, Hidden by default, conditionally shown**

```yaml
- name: cooling_equipment
  type: group
  label: Cooling Equipment
  prompt: Please provide information about the cooling equipment.
  fields:
    - name: cooling_equipment_type
      type: dropdown
      label: Cooling Equipment Type
      prompt: What type of cooling equipment is used?
      options:
        - Air
        - Water
        - Other
    - name: cooling_equipment_temperature
      type: number
      label: Cooling Equipment Temperature
      prompt: What is the temperature of the cooling equipment?
  show_if:
    temperature:
      greater_than: 100
        units: degrees
```

This snippet defines a field group for cooling equipment, with fields for cooling equipment type and cooling equipment temperature.

**Decision Tree Branching, with IF, THEN, ELSE**

```yaml
fields:
  - name: project_image_description
    type: text
    label: Project Image Description
    required: false
  - if:
    project_description:
      contains: image
  - then:
      - name: project_image
        type: file
        label: Project Image
        required: false
  - else:
      - name: project_file
        type: file
        label: Project File
        required: false
```

This snippet defines a decision tree for determining whether a project image or project file should be uploaded.

## Example Form Schema

This is an example of a full text file that can be used to generate a form.

```yaml
- label: Project Details
  fields:
    - name: project_name
      type: text
      label: Project Name
      required: true
      prompt: What is the name of your project?
    - name: project_description
      type: textarea
      label: Project Description
      required: true
      prompt: Please provide a brief description of your project.
    - name: project_media
      type: group
      label: Project Media
      prompt: Add any images or files related to your project.
      fields:
        - name: project_image_description
          type: text
          label: Project Image Description
          required: false
        - if:
          project_description:
            contains: image
        - then:
            - name: project_image
              type: file
              label: Project Image
              required: false
        - else:
            - name: project_file
              type: file
              label: Project File
              required: false

- label: Chemical Manufacturing Details
  fields:
    - name: chemical_name
      type: text
      label: Chemical Name
      required: true
      prompt: What is the name of the chemical you are manufacturing?
    - name: chemical_formula
      type: text
      label: Chemical Formula
      required: true
      prompt: Please provide the chemical formula for the chemical you are manufacturing.
    - name: manufacturing_steps
      type: list
      label: Manufacturing Steps
      required: true
      prompt: Please provide a list of the steps involved in manufacturing this chemical.
      add_label: Add a new step
      fields:
        - name: step_description
          type: textarea
          label: Step Description
          required: true
          prompt: Please describe this manufacturing step.
          add_label: Add another description
          fields:
            - name: step_media
              type: file
              label: Step Media
              required: false
              prompt: Do you have any images or files related to this step that you would like to share?
    - name: reaction_conditions
      type: group
      label: Reaction Conditions
      fields:
        - name: temperature
          type: number
          label: Temperature
          required: true
          step: 0.1
          unit: °C
          prompt: What is the temperature required for the reaction?
        - name: pressure
          type: number
          label: Pressure
          required: true
          step: 1
          unit: Pa
          prompt: What is the pressure required for the reaction?
        - name: time
          type: number
          label: Time
          required: false
          step: 1
          unit: minutes
          show_if:
            temperature:
              less_than: 50
          prompt: What is the required time for the reaction?
    - name: yield
      type: range
      label: Yield
      required_if:
        temperature:
          less_than: 50
      min: 0
      max: 100
      prompt: What is the expected yield of the reaction when the temperature is greater than or equal to 50°C?
    - name: additional_information
      type: textarea
      label: Additional Information
      required: false
      prompt: Is there any additional information you would like to provide?
      show_if:
        temperature:
          between:
            - 60
            - 80
      help_text: Please include information about the temperature range (60-80°C).

    - name: has_catalyst
      type: boolean
      label: Does the reaction require a catalyst?
      default: true
      show_if:
        temperature:
          between:
            - 50
            - 100
      prompt: Does the reaction require a catalyst?
    - name: reaction_type
      type: select
      label: Reaction Type
      required: false
      options:
        - name: type1
          label: Type 1
        - name: type2
          label: Type 2
        - name: type3
          label: Type 3
      prompt: Please select the type of reaction
    - name: reaction_category
      type: radio
      label: Reaction Category
      required: false
      default: type1
      show_if:
        temperature:
          between:
            - 70
            - 90
      options:
        - name: type1
          label: Type 1
        - name: type2
          label: Type 2
        - name: type3
          label: Type 3
      prompt: Please select the category of the reaction when the temperature is between 70°C and 90°C.

- label: Additional Information
  fields:
    - name: additional_information
      type: textarea
      label: Additional Information
      required: false
      prompt: Is there any additional information you would like to provide?
```

### Theming

Combine the user's preferred color scheme with your own custom themes to create a unique and visually stunning design. By utilizing [next-themes](https://github.com/pacocoursey/next-themes), [Tailwind](https://tailwindcss.com/), you can craft both light and dark versions of any combination of themes. From color schemes to spacing and typography choices, there are a plethora of design tokens available for customization. With these tools, you have the ability to create unique and visually stunning designs that will leave a lasting impression. The possibilities for creativity are endless, so let your imagination run wild.

### Creating a theme

1. Name all the CSS variables you want to use in your theme. For example, `--color-primary` and `--color-secondary`. Keep these to a minimum, for design consistency.
1. Add variables to your `tailwind.config.js` file. For example:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
    },
  },
}
```

1. Add `next-themes` to your `app/providers.tsx file:

```js
import { ThemeProvider } from 'next-themes'

...

<ThemeProvider attribute="class" themes={['tacos', 'light', 'dark']}>
  <Component {...pageProps} />
</ThemeProvider>
...

```

1. Optionally Add a theme switcher to your component tree

```js
<ThemeSwitcher />
```

### SVGs

It's important to keep your vector graphics and SVGs in sync with your color scheme. This can easily be achieved by utilizing the ` currentColor`` within the SVG. Additionally, to ensure that your SVGs are scaling responsively, it's important to add the size to the SVG  `viewBox` and then size that container in which you plan to place your SVG.

export interface UnitLabels {
  [key: string | symbol]: React.ReactNode
}

// This is a rough approximation of the units of measurement
// Ideally this would be generated
export const unitsOfMeasurements: UnitLabels = {
  acceleration: 'm/s2',
  area: 'm2',
  density: 'kg/m3',
  distance: 'm',
  electric_capacitance: 'F',
  electric_charge: 'C',
  electric_conductance: 'S',
  electric_current: 'A',
  energy: 'J',
  flow_rate: 'm3/s',
  force: 'N',
  frequency: 'Hz',
  luminance: 'cd/m2',
  mass: 'kg',
  momentum: 'kg m/s',
  power: 'W',
  pressure: 'Pa',
  radioactivity: 'Bq',
  speed: 'm/s',
  surface_tension: 'N/m',
  temperature: 'K',
  time: 's',
  torque: 'Nm',
  viscosity: 'Pa s',
  volume: 'm3',
}

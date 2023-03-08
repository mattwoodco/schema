export function classname(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

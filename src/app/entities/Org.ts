export interface Org {
  id: string
  name: string
  image_url: string
  email: string
  description: string
  location_code: string
  open_hour: number
  close_hour: number
  cep: string
  city: string
  neighborhood: string
  street: string
  lat: number
  long: number
}


export function toListOrg(data: Org[]): {value: string; label: string}[]  {
  return data.map(org => ({
    value: org.id,
    label: org.name
  }))
}
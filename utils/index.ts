import { GENDER } from '@/constant'

export function jsonToQuery(obj: any): string {
  if (obj) {
    let query = ''
    for (let i in obj) {
      let value = obj[i]
      if (Array.isArray(value)) {
        value = value.join(',')
      }
      query += `&${i}=${value}`
    }
    query = query.replace('&', '?')
    return query
  } else {
    return ''
  }
}

export function formatGender(row: unknown, column: unknown, cellValue: number, index: number): string {
  return GENDER[cellValue]
}

export function formatRate(row: unknown, column: unknown, cellValue: number, index: number): string {
  return cellValue + '%'
}
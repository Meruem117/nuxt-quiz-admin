import type { responseItem, loginItem, passwordCheckItem } from '@/models/base'
import { baseUrl } from '@/constant'

export async function checkAdminPassword(login: loginItem): Promise<responseItem<passwordCheckItem>> {
  const response = await fetch(baseUrl + '/admin/check', {
    method: 'POST',
    body: JSON.stringify(login),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
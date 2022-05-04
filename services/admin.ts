import type { responseItem, loginItem, passwordCheckItem } from '@/models/base'

export async function checkAdminPassword(login: loginItem): Promise<responseItem<passwordCheckItem>> {
  const response = await fetch('/api/user/check', {
    method: 'POST',
    body: JSON.stringify(login),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
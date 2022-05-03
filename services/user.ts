import type { responseItem, loginItem, passwordCheckItem } from '@/models/base'
import type { userItem } from '@/models/user'
import { baseUrl } from '@/constant'

export async function getUserById(id: number): Promise<responseItem<userItem>> {
  const response = await fetch(baseUrl + '/user/get?id=' + id)
  return response.json()
}

export async function getUserList(): Promise<responseItem<userItem[]>> {
  const response = await fetch(baseUrl + '/user/list')
  return response.json()
}

export async function checkUserPassword(login: loginItem): Promise<responseItem<passwordCheckItem>> {
  const response = await fetch(baseUrl + '/user/check', {
    method: 'POST',
    body: JSON.stringify(login),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function handleLogin(data: loginItem): Promise<passwordCheckItem> {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
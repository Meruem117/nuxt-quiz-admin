import type { responseItem, pageRequestItem, pageResponseItem, deleteRequestItem } from '@/models/base'
import type { userItem } from '@/models/user'
import { baseUrl } from '@/constant'
import { jsonToQuery } from '@/utils'

export async function getUserPage(request: pageRequestItem): Promise<pageResponseItem<userItem[]>> {
  const response = await fetch(baseUrl + '/user/page' + jsonToQuery(request))
  return response.json()
}

export async function getUserById(id: number): Promise<responseItem<userItem>> {
  const response = await fetch(baseUrl + '/user/get?id=' + id)
  return response.json()
}

export async function addUser(data: userItem): Promise<responseItem<number>> {
  const response = await fetch(baseUrl + '/user/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function updateUserById(data: userItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/user/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function deleteUserById(data: deleteRequestItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/user/delete', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
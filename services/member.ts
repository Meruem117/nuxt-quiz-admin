import type { responseItem, pageRequestItem, pageResponseItem, deleteRequestItem } from '@/models/base'
import type { memberItem } from '@/models/member'
import { baseUrl } from '@/constant'
import { jsonToQuery } from '@/utils'

export async function getMemberPage(request: pageRequestItem): Promise<pageResponseItem<memberItem[]>> {
  const response = await fetch(baseUrl + '/member/page' + jsonToQuery(request))
  return response.json()
}

export async function getMemberById(id: number): Promise<responseItem<memberItem>> {
  const response = await fetch(baseUrl + '/member/get?id=' + id)
  return response.json()
}

export async function addMember(data: memberItem): Promise<responseItem<number>> {
  const response = await fetch(baseUrl + '/member/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function updateMemberById(data: memberItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/member/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function deleteMemberById(data: deleteRequestItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/member/delete', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
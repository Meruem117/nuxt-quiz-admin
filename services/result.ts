import type { responseItem, pageRequestItem, pageResponseItem, deleteRequestItem } from '@/models/base'
import type { resultItem } from '@/models/result'
import { baseUrl } from '@/constant'
import { jsonToQuery } from '@/utils'

export async function getResultPage(request: pageRequestItem): Promise<pageResponseItem<resultItem[]>> {
  const response = await fetch(baseUrl + '/result/page' + jsonToQuery(request))
  return response.json()
}

export async function getResultById(id: number): Promise<responseItem<resultItem>> {
  const response = await fetch(baseUrl + '/result/get?id=' + id)
  return response.json()
}

export async function addResult(data: resultItem): Promise<responseItem<number>> {
  const response = await fetch(baseUrl + '/result/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function updateResultById(data: resultItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/result/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function deleteResultById(data: deleteRequestItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/result/delete', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
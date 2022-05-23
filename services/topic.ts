import type { responseItem, pageRequestItem, pageResponseItem, deleteRequestItem } from '@/models/base'
import type { topicItem } from '@/models/topic'
import { baseUrl } from '@/constant'
import { jsonToQuery } from '@/utils'

export async function getTopicPage(request: pageRequestItem): Promise<pageResponseItem<topicItem[]>> {
  const response = await fetch(baseUrl + '/topic/page' + jsonToQuery(request))
  return response.json()
}

export async function getTopicById(id: number): Promise<responseItem<topicItem>> {
  const response = await fetch(baseUrl + '/topic/get?id=' + id)
  return response.json()
}

export async function addTopic(data: topicItem): Promise<responseItem<number>> {
  const response = await fetch(baseUrl + '/topic/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function updateTopicById(data: topicItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/topic/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function deleteTopicById(data: deleteRequestItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/topic/delete', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
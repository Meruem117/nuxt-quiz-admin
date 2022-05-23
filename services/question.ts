import type { responseItem, pageRequestItem, pageResponseItem, deleteRequestItem } from '@/models/base'
import type { questionItem } from '@/models/question'
import { baseUrl } from '@/constant'
import { jsonToQuery } from '@/utils'

export async function getQuestionPage(request: pageRequestItem): Promise<pageResponseItem<questionItem[]>> {
  const response = await fetch(baseUrl + '/question/page' + jsonToQuery(request))
  return response.json()
}

export async function getQuestionById(id: number): Promise<responseItem<questionItem>> {
  const response = await fetch(baseUrl + '/question/get?id=' + id)
  return response.json()
}

export async function addQuestion(data: questionItem): Promise<responseItem<number>> {
  const response = await fetch(baseUrl + '/question/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function updateQuestionById(data: questionItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/question/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function deleteQuestionById(data: deleteRequestItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/question/delete', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
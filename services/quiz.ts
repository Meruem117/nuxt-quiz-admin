import type { responseItem, pageRequestItem, pageResponseItem, deleteRequestItem } from '@/models/base'
import type { quizItem } from '@/models/quiz'
import { baseUrl } from '@/constant'
import { jsonToQuery } from '@/utils'

export async function getQuizPage(request: pageRequestItem): Promise<pageResponseItem<quizItem[]>> {
  const response = await fetch(baseUrl + '/quiz/page' + jsonToQuery(request))
  return response.json()
}

export async function getQuizById(id: number): Promise<responseItem<quizItem>> {
  const response = await fetch(baseUrl + '/quiz/get?id=' + id)
  return response.json()
}

export async function addQuiz(data: quizItem): Promise<responseItem<number>> {
  const response = await fetch(baseUrl + '/quiz/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function updateQuizById(data: quizItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/quiz/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function deleteQuizById(data: deleteRequestItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/quiz/delete', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
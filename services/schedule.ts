import type { responseItem, pageRequestItem, pageResponseItem, deleteRequestItem } from '@/models/base'
import type { scheduleItem } from '@/models/schedule'
import { baseUrl } from '@/constant'
import { jsonToQuery } from '@/utils'

export async function getSchedulePage(request: pageRequestItem): Promise<pageResponseItem<scheduleItem[]>> {
  const response = await fetch(baseUrl + '/schedule/page' + jsonToQuery(request))
  return response.json()
}

export async function getScheduleById(id: number): Promise<responseItem<scheduleItem>> {
  const response = await fetch(baseUrl + '/schedule/get?id=' + id)
  return response.json()
}

export async function addSchedule(data: scheduleItem): Promise<responseItem<number>> {
  const response = await fetch(baseUrl + '/schedule/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function updateScheduleById(data: scheduleItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/schedule/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function deleteScheduleById(data: deleteRequestItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/schedule/delete', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
import type { responseItem, pageRequestItem, pageResponseItem, deleteRequestItem } from '@/models/base'
import type { teamItem } from '@/models/team'
import { baseUrl } from '@/constant'
import { jsonToQuery } from '@/utils'

export async function getTeamPage(request: pageRequestItem): Promise<pageResponseItem<teamItem[]>> {
  const response = await fetch(baseUrl + '/team/page' + jsonToQuery(request))
  return response.json()
}

export async function getTeamById(id: number): Promise<responseItem<teamItem>> {
  const response = await fetch(baseUrl + '/team/get?id=' + id)
  return response.json()
}

export async function addTeam(data: teamItem): Promise<responseItem<number>> {
  const response = await fetch(baseUrl + '/team/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function updateTeamById(data: teamItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/team/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export async function deleteTeamById(data: deleteRequestItem): Promise<responseItem<boolean>> {
  const response = await fetch(baseUrl + '/team/delete', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
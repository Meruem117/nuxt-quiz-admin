import type { responseItem } from '~/models/base'
import type { memberItem } from '~/models/member'

export async function getTeamListByUserId(id: number): Promise<responseItem<memberItem[]>> {
  const response = await this.$axios.$get('/api/member/team?id=' + id)
  return response.data
}

// export async function getUserListByTeamId(id: number): Promise<responseItem<memberItem[]>> {
//   const response = await fetch(baseUrl + '/member/user?id=' + id)
//   return response.json()
// }
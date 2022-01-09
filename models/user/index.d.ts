export interface userItem {
  id: number,
  email: string,
  name: string,
  password: string,
  team: userTeamItem,
  createTime: string
}

interface userTeamItem {
  [key: string]: number
}

export interface userDaoItem {
  id: number,
  email: string,
  name: string,
  password: string,
  role: number,
  team: string,
  createTime: string
}

export interface userItem {
  id: number,
  email: string,
  name: string,
  password: string,
  role: string,
  team: userTeamItem,
  createTime: string
}

interface userTeamItem {
  [key: string]: number
}

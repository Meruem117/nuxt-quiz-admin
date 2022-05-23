export interface quizItem {
  id: number,
  quiz: string,
  topic: string,
  round: number,
  creator: string,
  creatorId: number,
  description: string,
  winner: string | null,
  winnerId: number | null,
  isTeam: number | null,
  createTime: string,
  deleted: number
}
// export const baseUrl = 'http://localhost:8080'
export const baseUrl = '/api'
export const DEFAULT_AVATAR = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
export const DEFAULT_PAGE_SIZE = 10

//* user
export const GENDER = ['Female', 'Male']

//* member
export const PASS = [
  { text: 'Pending', type: 'info' },
  { text: 'Pass', type: 'success' },
  { text: 'Denied', type: 'danger' }
]
export const QUIT = {
  NOT_QUIT: 0,
  QUIT: 1
}

//* question
export const TYPE = ['Multiple Choice', 'Single Choice']

//* quiz
export const IS_TEAM = {
  USER: 0,
  TEAM: 1
}

//* schedule
export const STATUS = [
  { text: 'Not Start', type: 'info' },
  { text: 'Start', type: 'success' },
  { text: 'End', type: 'danger' }
]

//* result
export const IS_TAKE = {
  NOT_TAKE: 0,
  TAKE: 1
}
export const IS_OUT = {
  PENDING: '0',
  NOT_OUT: '1',
  OUT: '2'
}


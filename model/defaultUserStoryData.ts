import { UserStory } from './types'

export const defaultUserStoryData: UserStory = {
  title: '',
  jiraTicket: '',
  need: {
    as: '',
    want: '',
    to: '',
  },
  solution: '',
  solutions: [
    {
      text: '',
      estimation: 0,
      selected: false,
    },
  ],
  value: 0,
  kpis: '',
  enablers: '',
  assets: '',
  increments: [],
}

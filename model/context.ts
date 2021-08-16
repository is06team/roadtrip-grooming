import { createContext } from 'react'
import { defaultUserStoryData } from '../model/defaultUserStoryData'
import { UserStory } from './types'

type UserStoryContext = {
  story: UserStory
  setStory: (story: UserStory) => void
}

export const GlobalUserStoryContext = createContext<UserStoryContext>({
  story: defaultUserStoryData,
  setStory: () => {},
})

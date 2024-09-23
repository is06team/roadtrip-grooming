import { UserStory } from './types'
import { defaultUserStoryData } from './defaultUserStoryData'

export const loadStoryState = () => {
  try {
    if (typeof window === 'undefined') {
      return defaultUserStoryData
    }
    const storyState = window.localStorage.getItem('story')
    if (storyState === null) {
      return defaultUserStoryData
    }
    return JSON.parse(storyState)
  } catch (error) {
    return defaultUserStoryData
  }
}

export const saveStoryState = (story: UserStory) => {
  if (typeof window !== 'undefined') {
    const storyState = JSON.stringify(story)
    window.localStorage.setItem('story', storyState)
  }
}

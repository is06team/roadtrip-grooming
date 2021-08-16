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
    console.warn('Unable to load story state from local storage')
    return defaultUserStoryData
  }
}

export const saveStoryState = (story: UserStory) => {
  try {
    if (typeof window !== 'undefined') {
      const storyState = JSON.stringify(story)
      window.localStorage.setItem('story', storyState)
      console.info('Story state saved to local storage')
    }
  } catch {
    console.warn('Unable to save story state to local storage')
  }
}

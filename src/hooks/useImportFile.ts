import { useState } from 'react'
import { UserStory } from '../model/types'

export const useImportFile = (setStory: (story: UserStory) => void) => {
  const [error, setError] = useState<string | null>(null)

  const importFile = (file: File) => {
    if (file) {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        try {
          setStory(JSON.parse(fileReader.result as string))
          setError(null)
        } catch (e) {
          setError('Fichier invalide')
        }
      }
      fileReader.readAsText(file)
    }
  }

  return { importFile, error }
}

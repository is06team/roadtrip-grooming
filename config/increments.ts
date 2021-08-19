import { IncrementType, IncrementTypeConfig } from '../model/types'

export const incrementTypes: IncrementTypeConfig[] = [
  {
    id: 'none',
    label: '---',
    hasCriterias: false,
    hasDiet: false,
    hasEstimation: false,
    hasNotes: false,
    hasDependencies: false,
  },
  {
    id: 'flow',
    label: 'Parcours',
    hasCriterias: true,
    hasDiet: true,
    hasEstimation: true,
    hasNotes: false,
    hasDependencies: false,
  },
  {
    id: 'tracking',
    label: 'Tracking',
    hasCriterias: true,
    hasDiet: true,
    hasEstimation: true,
    hasNotes: false,
    hasDependencies: false,
  },
  {
    id: 'gdpr',
    label: 'GDPR',
    hasCriterias: true,
    hasDiet: true,
    hasEstimation: true,
    hasNotes: false,
    hasDependencies: false,
  },
  {
    id: 'ui',
    label: 'UI/UX',
    hasCriterias: false,
    hasDiet: true,
    hasEstimation: true,
    hasNotes: true,
    hasDependencies: false,
  },
  {
    id: 'release',
    label: 'Release',
    hasCriterias: false,
    hasDiet: false,
    hasEstimation: true,
    hasNotes: true,
    hasDependencies: false,
  },
]

export const getIncrementTypeLabel: (type: IncrementType) => string = (type) => {
  const t = incrementTypes.filter((incrementType) => incrementType.id === type.valueOf())[0]
  if (t === undefined) {
    return ''
  }
  return t.label
}

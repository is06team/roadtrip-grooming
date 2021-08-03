import { IncrementType, IncrementTypeConfig } from "../model/types"

export const incrementTypes: IncrementTypeConfig[] = [
    {
        id: 'none',
        label: '---',
        hasCriterias: false,
        hasDiet: false,
        hasEstimation: false,
        hasNotes: false,
        hasDependencies: false
    },
    {
        id: 'flow',
        label: 'Parcours',
        hasCriterias: true,
        hasDiet: true,
        hasEstimation: true,
        hasNotes: false,
        hasDependencies: true
    },
    {
        id: 'tracking',
        label: 'Tracking',
        hasCriterias: true,
        hasDiet: true,
        hasEstimation: true,
        hasNotes: false,
        hasDependencies: true
    },
    {
        id: 'gdpr',
        label: 'GDPR',
        hasCriterias: true,
        hasDiet: true,
        hasEstimation: true,
        hasNotes: false,
        hasDependencies: true
    },
    {
        id: 'ui',
        label: 'UI/UX',
        hasCriterias: false,
        hasDiet: true,
        hasEstimation: true,
        hasNotes: true,
        hasDependencies: true
    },
    {
        id: 'release',
        label: 'Release',
        hasCriterias: false,
        hasDiet: false,
        hasEstimation: true,
        hasNotes: true,
        hasDependencies: true
    },
]

export const getIncrementTypeLabel = (type: IncrementType) => {
    const t = incrementTypes.filter(incrementType => incrementType.id === type.valueOf())[0]
    if (t === undefined) {
        return ''
    }
    return t.label
}

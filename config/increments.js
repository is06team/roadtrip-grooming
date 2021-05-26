export const incrementTypes = [
    {
        type: 'flow',
        label: 'Parcours',
        hasCriterias: true,
        hasDiet: true,
        hasEstimation: true,
        hasNotes: false,
        hasDependencies: true
    },
    {
        type: 'tracking',
        label: 'Tracking',
        hasCriterias: true,
        hasDiet: true,
        hasEstimation: true,
        hasNotes: false,
        hasDependencies: true
    },
    {
        type: 'gdpr',
        label: 'GDPR',
        hasCriterias: true,
        hasDiet: true,
        hasEstimation: true,
        hasNotes: false,
        hasDependencies: true
    },
    {
        type: 'ui',
        label: 'UI/UX',
        hasCriterias: false,
        hasDiet: true,
        hasEstimation: true,
        hasNotes: true,
        hasDependencies: true
    },
    {
        type: 'release',
        label: 'Release',
        hasCriterias: false,
        hasDiet: false,
        hasEstimation: true,
        hasNotes: true,
        hasDependencies: true
    },
]

export const getIncrementTypeLabel = (type) => {
    const t = incrementTypes.filter(incrementType => incrementType.type === type)[0]
    if (t === undefined) {
        return ''
    }
    return t.label
}

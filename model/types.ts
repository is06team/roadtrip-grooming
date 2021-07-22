export interface UserStory {
    title: string,
    need: Need,
    solution: string,
    value: number,
    kpis: string,
    enablers: string,
    assets: string,
    increments: Increment[]
}

export interface Need {
    as: string,
    want: string,
    to: string,
}

export interface Increment {
    id: string,
    type: IncrementType,
    criterias: Criteria[],
    notes: string,
    checklist: Checklist,
    estimation: number,
    dependencies: string,
}

export enum IncrementType {
    none = '',
    flow = 'flow',
    release = 'release'
}

export interface Criteria {
    id: string,
    title: string,
    gherkin: string,
}

export interface Checklist {
    d: boolean,
    i: boolean,
    e: boolean,
    t: boolean,
}
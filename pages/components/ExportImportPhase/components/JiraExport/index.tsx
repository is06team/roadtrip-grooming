import styles from './styles.module.scss'
import { defaultUserStoryData } from '../../../../../model/defaultUserStoryData'
import { Checklist, Criteria, Increment, UserStory } from '../../../../../model/types'
import { getIncrementTypeLabel } from '../../../../../config/increments'

type Props = {
  story: UserStory
}

const getNeed: (story: UserStory) => string = (story) => {
  return 'h2. Besoin\n\n' +
    '*ETQ* ' + story.need.as + '\n' +
    '*JS* ' + story.need.want + '\n' +
    '*AD* ' + story.need.to + '\n\n' +

    'h2. Solution fonctionnelle\n\n' +
    (story.solution || 'Néant') + '\n\n' +

    'h2. KPIs de succès\n\n' +
    (story.kpis || 'Néant') + '\n\n' +

    'h2. Assets\n\n' +
    (story.assets || 'Néant') + '\n\n'
}

const getIncrement: (story: UserStory, increment: Increment) => JSX.Element = (story, increment) => {
  let incrementString = getNeed(story)

  if (increment.criterias.length > 0) {
    incrementString += getCriterias(increment.criterias)
  }
  if (increment.notes) {
    incrementString += 'h2. Notes\n\n' + increment.notes
  }

  return (
    <div className={styles.increment} key={"increment_" + increment.id}>
      <h3>{story.title} : {getIncrementTypeLabel(increment.type)} (Ticket "Story increment")</h3>
      {increment.estimation > 0 && (<div><strong>Estimation</strong> : {increment.estimation}</div>)}
      {increment.estimation > 0 && (<div><strong>ROI</strong> : {story.value / increment.estimation}</div>)}
      {(increment.type !== 'release') && getChecklist(increment.checklist)}
      
      <textarea className="code" value={incrementString}></textarea>
    </div>
  )
}

const getEnabler: (enabler: string) => JSX.Element = (enabler) => {
  return (<div>{enabler}</div>)
}

const getSprintSuggestion: (checklist: Checklist) => string = (checklist) => {
  if (checklist.d && checklist.e && checklist.t) {
    if (checklist.i) {
      return 'A placer dans "Ready for sprint"'
    } else {
      return 'A placer dans "Almost ready for sprint"'
    }
  }
  return 'Laisser dans "Ready for grooming"'
}

const getChecklist = (checklist: Checklist) => {
  return (
    <div>
      <strong>
        {checklist.d ? 'D' : '-'}
        {checklist.i ? 'I' : '-'}
        {checklist.e ? 'E' : '-'}
        {checklist.t ? 'T' : '-'}
      </strong>
      {'-> ' + getSprintSuggestion(checklist)}
      <br />
    </div>
  )
}

const getCriterias: (criterias: Criteria[]) => string = (criterias) => {
  const criteriaString = criterias.map(criteria => {
    return '{panel:title=' + criteria.title + '}\n' +
      criteria.gherkin +
      '\n{panel}\n\n'
  })

  return 'h2. Critères d\'acceptation\n\n'
    + criteriaString
}

const JiraExport = ({story = defaultUserStoryData}: Props) => {
  return (
    <div>
      <h3>{story.title} (Ticket "Story")</h3>
      <p><strong>Valeur métier :</strong> {story.value}</p>
      <div className={styles.US}>
        <textarea className="code" readOnly value={getNeed(story)}>
        </textarea>
      </div>

      {story.increments.map(increment => getIncrement(story, increment))}
    </div>
  )
}

export default JiraExport

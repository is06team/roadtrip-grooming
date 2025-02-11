import styles from './styles.module.scss'
import { Increment, Need, Solution } from '../../model/types'
import { useContext } from 'react'
import { GlobalUserStoryContext } from '../../model/context'

type Props = {
  currentPhase: string
  onChangePhase: (phase: string) => void
}

const preGroomingItems = [
  { name: 'need', title: 'Besoin', hasRecap: true },
  { name: 'kpis', title: 'KPIs de succès', hasRecap: true },
  { name: 'value', title: 'Valeur métier', hasRecap: true },
  { name: 'solutions', title: 'Solution fonctionnelle', hasRecap: true },
  { name: 'enablers', title: 'Enablers', hasRecap: true },
]

const groomingItems = [
  { name: 'assets', title: 'Assets', hasRecap: true },
  { name: 'increments', title: 'Incréments', hasRecap: true },
]

const getNeedRecapText = (need: Need) =>
  (need.as ? '<strong>ETQ</strong> ' + need.as + '<br />' : '') +
  (need.want ? '<strong>JS</strong> ' + need.want + '<br />' : '') +
  (need.to ? '<strong>AD</strong> ' + need.to : '')

const getValueRecapText = (value: number) => (value === 0 ? '' : value.toString())

const getSolutionRecapText = (solutions: Solution[] = []) => {
  const selectedSolutions = solutions.filter((solution) => solution.selected)
  return selectedSolutions.length > 0 ? selectedSolutions[0].text : ''
}

const getEnablerRecapText = (enablers: string) =>
  enablers
    .split('\n')
    .map((item) => item)
    .join('<br />')

const getIncrementRecapText = (increments: Increment[]) => {
  return increments.reduce((text, increment) => {
    const checklistText =
      (increment.checklist.d ? 'D' : '-') +
      (increment.checklist.i ? 'I' : '-') +
      (increment.checklist.e ? 'E' : '-') +
      (increment.checklist.t ? 'T' : '-')
    return text + increment.type + ' : ' + checklistText + ', CP: ' + increment.estimation + '<br />'
  }, '')
}

const getRecap = (itemName: string, itemData: any) => {
  const recapText = (() => {
    switch (itemName) {
      case 'need':
        return getNeedRecapText(itemData as Need)
      case 'value':
        return getValueRecapText(itemData as number)
      case 'solutions':
        return getSolutionRecapText(itemData as Solution[])
      case 'enablers':
        return getEnablerRecapText(itemData as string)
      case 'increments':
        return getIncrementRecapText(itemData as Increment[])
      default:
        return itemData as string
    }
  })()

  return <div className={styles.BreadcrumbItemRecap} dangerouslySetInnerHTML={{ __html: recapText }}></div>
}

const Menu = ({ currentPhase, onChangePhase }: Props) => {
  const { story } = useContext(GlobalUserStoryContext)

  return (
    <div className={styles.Breadcrumb}>
      <h2>Pré-grooming</h2>
      <ul>
        {preGroomingItems.map((item) => (
          <li
            key={'item_' + item.name}
            className={styles.BreadcrumbItem + (currentPhase === item.name ? ' ' + styles.BreadcrumbItemCurrent : '')}
            onClick={() => onChangePhase(item.name)}
          >
            <h3>{item.title}</h3>
            {item.hasRecap && getRecap(item.name, story[item.name])}
          </li>
        ))}
      </ul>
      <h2>Grooming</h2>
      <ul>
        {groomingItems.map((item) => (
          <li
            key={'item_' + item.name}
            className={styles.BreadcrumbItem + (currentPhase === item.name ? ' ' + styles.BreadcrumbItemCurrent : '')}
            onClick={() => onChangePhase(item.name)}
          >
            <h3>{item.title}</h3>
            {item.hasRecap && getRecap(item.name, story[item.name])}
          </li>
        ))}
      </ul>
      <ul>
        <li
          key={'item_export'}
          className={styles.BreadcrumbItem + (currentPhase === 'export' ? ' ' + styles.current : '')}
          onClick={() => onChangePhase('export')}
        >
          <h3>Exporter / Importer</h3>
        </li>
      </ul>
    </div>
  )
}

export default Menu

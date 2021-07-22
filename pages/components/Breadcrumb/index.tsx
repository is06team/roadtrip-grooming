import styles from './styles.module.scss'
import { defaultUserStoryData } from '../../../model/defaultUserStoryData'
import { UserStory, Need } from '../../../model/types'

type Props = {
  story: UserStory,
  currentPhase: string,
  onChangePhase: (phase: string) => void,
}

const preGroomingItems = [
  { name: 'need', title: 'Besoin', hasRecap: true },
  { name: 'solution', title: 'Solution fonctionnelle', hasRecap: true },
  { name: 'value', title: 'Valeur métier', hasRecap: true },
  { name: 'kpis', title: 'KPIs de succès', hasRecap: true },
  { name: 'enablers', title: 'Enablers', hasRecap: true }
]

const groomingItems = [
  { name: 'assets', title: 'Assets', hasRecap: true },
  { name: 'increments', title: 'Incréments', hasRecap: false }
]

const getNeedRecapText = (need: Need) => {
  let text = ''
  text += need.as ? '<strong>ETQ</strong> ' + need.as + '<br />' : ''
  text += need.want ? '<strong>JS</strong> ' + need.want + '<br />' : ''
  text += need.to ? '<strong>AD</strong> ' + need.to : ''
  return text
}

const getRecap = (itemName: string, itemData: Need | string) => {
  return (
    <div
      className="recap"
      dangerouslySetInnerHTML={{ __html: (itemName === 'need')
        ? getNeedRecapText(itemData as Need)
        : (itemData as string || '') }}>
    </div>
  )
}

const BreadcrumbView = ({ story = defaultUserStoryData, currentPhase, onChangePhase }: Props) => {
  return (
    <div className={styles.Breadcrumb}>
      <h2>Pré-grooming :</h2>
      <ul>
        {preGroomingItems.map(item => (
          <li
            key={'item_' + item.name}
            className={styles.BreadcrumbItem + (currentPhase === item.name ? ' ' + styles.current : '')}
            onClick={() => onChangePhase(item.name)}>
            <h3>{item.title}</h3>
            {item.hasRecap && getRecap(item.name, story[item.name])}
          </li>
        ))}
      </ul>
      <h2>Grooming :</h2>
      <ul>
        {groomingItems.map(item => (
          <li
            key={'item_' + item.name}
            className={styles.BreadcrumbItem + (currentPhase === item.name ? ' ' + styles.current : '')}
            onClick={() => onChangePhase(item.name)}>
            <h3>{item.title}</h3>
            {item.hasRecap && getRecap(item.name, story[item.name])}
          </li>
        ))}
      </ul>
      <ul>
        <li
          key={'item_export'}
          className={styles.BreadcrumbItem + (currentPhase === 'export' ? ' ' + styles.current : '')}
          onClick={() => onChangePhase('export')}>
          <h3>Exporter / Importer</h3>
        </li>
      </ul>
    </div>
  )
}

export default BreadcrumbView

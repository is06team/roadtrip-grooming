import styles from './styles.module.scss'
import { defaultData } from '../../../model/defaultData'

const Breadcrumb = ({ data = defaultData, currentPhase, onChangePhase }) => {
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

  const otherItems = [
    { name: 'export', title: 'Exporter / Importer', hasRecap: false }
  ]

  const getNeedRecapText = (needData) => {
    let text = ''
    text += needData.as ? '<strong>ETQ</strong> ' + needData.as + '<br />' : ''
    text += needData.want ? '<strong>JS</strong> ' + needData.want + '<br />' : ''
    text += needData.to ? '<strong>AD</strong> ' + needData.to : ''
    return text
  }

  const getRecap = (itemName, itemData) => {
    return (
      <div
        className="recap"
        dangerouslySetInnerHTML={{ __html: (itemName === 'need') ? getNeedRecapText(itemData) : (itemData || '') }}>
      </div>
    )
  }

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
            {item.hasRecap && getRecap(item.name, data[item.name])}
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
            {item.hasRecap && getRecap(item.name, data[item.name])}
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

export default Breadcrumb

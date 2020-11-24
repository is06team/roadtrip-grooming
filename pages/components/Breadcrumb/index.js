import styles from './styles.module.scss'

const Breadcrumb = ({ data, currentPhase, onChangePhase }) => {
  const items = [
    { name: 'need', title: 'Besoin', hasRecap: true },
    { name: 'solution', title: 'Solution fonctionnelle', hasRecap: true },
    { name: 'value', title: 'Valeur métier', hasRecap: true },
    { name: 'kpis', title: 'KPIs de succès', hasRecap: true },
    { name: 'assets', title: 'Assets', hasRecap: true },
    { name: 'increments', title: 'Incréments', hasRecap: false },
    { name: 'export', title: 'Exporter / Importer', hasRecap: false },
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
      <ul id="ariane-items">
        {items.map(item => (
          <li
            className={styles.BreadcrumbItem + (currentPhase === item.name ? ' ' + styles.current : '')}
            onClick={() => onChangePhase(item.name)}>
            <h2>{item.title}</h2>
            {item.hasRecap && getRecap(item.name, data[item.name])}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumb

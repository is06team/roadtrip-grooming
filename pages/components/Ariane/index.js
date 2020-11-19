import ArianeItem from './components/ArianeItem'
import React from 'react'
import styles from './styles.module.scss'

const items = [
  { name: 'need', title: 'Besoin' },
  { name: 'solution', title: 'Solution fonctionnelle' },
  { name: 'value', title: 'Valeur métier' },
  { name: 'kpis', title: 'KPIs de succès' },
  { name: 'assets', title: 'Assets' },
  { name: 'increments', title: 'Incréments' },
  { name: 'jira', title: 'Export JIRA' },
]

export default class Ariane extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentItem: '',
    }
  }
  
  selectPhase = (phase) => {
    this.props.onChangePhase(phase)
    this.setState({ currentItem: phase })
  }

  render() {
    const renderItems = items.map((item) => {
      return (
        <ArianeItem
          key={'ariane_item_' + item.name}
          current={this.state.currentItem == item.name}
          name={item.name}
          title={item.title}
          recap={this.props.recaps[item.name]}
          onSelectPhase={() => this.selectPhase(item.name)} />
      )
    })

    return (
      <div className={styles.Ariane}>
        <ul id="ariane-items">
          {renderItems}
        </ul>
      </div>
    )
  }
}
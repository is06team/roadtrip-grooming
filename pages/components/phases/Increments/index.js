import IncrementItem from './components/IncrementItem'
import React from 'react'
import styles from './styles.module.scss'

export default class Increments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextIncrementId: 0,
      increments: [],
    }
  }

  getTextForRecap = () => {
    /*let text = '<ul>'
    for (const increment of this.state.increments) {
      text += '<li>Incrément ' + increment.type
      if (increment.diet || increment.estimation) {
        text += '<br />DIET - Estimation : 8'
      }
    }
    text += '</ul>'*/
    const text = ''
    return text
  }

  addIncrement = () => {
    let increments = this.state.increments
    increments.push({
      id: 'id_' + this.state.nextIncrementId,
      data: {
        nextCriteriaId: 0,
        criterias: [],
        diet: '',
        estimation: 0,
        title: '',
        type: 'none',
      },
    })
    this.setState({
      increments: increments,
      nextIncrementId: this.state.nextIncrementId + 1
    })

    this.props.onTextChangedWithRecap(this.getTextForRecap())
  }

  updateIncrement = (id, updatedIncrement) => {
    let increments = []
    for (const increment of this.state.increments) {
      if (increment.id === id) {
        increment.data = updatedIncrement
      }
      increments.push(increment)
    }
    this.setState({ increments: increments })

    this.props.onTextChangedWithRecap(this.getTextForRecap())
  }

  deleteIncrement = (id) => {
    let increments = []
    for (const increment of this.state.increments) {
      if (increment.id !== id) {
        increments.push(increment)
      }
    }
    this.setState({ increments: increments })

    this.props.onTextChangedWithRecap(this.getTextForRecap())
  }

  getIncrementComponents = () => {
    let components = []
    for (const incrementIndex in this.state.increments) {
      const increment = this.state.increments[incrementIndex]
      components.push(
        <IncrementItem
          id={increment.id}
          key={'increment_' + incrementIndex}
          title="Increment"
          type={increment.type}
          onIncrementUpdated={(id, increment) => {
            this.updateIncrement(id, increment)
          }}
          onDeleteClicked={(index) => {
            this.deleteIncrement(index)
          }} />
      )
    }
    return components
  }

  render() {
    return (
      <div style={{display: (this.props.current == true ? 'block' : 'none') }}>
        <div className={styles.Increments}>
          <h1>Incréments de la US</h1>
          <div className={styles.list} id="user_story_increments">
            {this.getIncrementComponents()}
          </div>      
          <button onClick={() => this.addIncrement()}>Ajouter un incrément dans cette US</button>
        </div>
      </div>
    )
  }
}
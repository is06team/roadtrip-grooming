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

  addIncrement = () => {
    let increments = this.state.increments
    increments.push({
      id: 'id_' + this.state.nextIncrementId,
      data: {},
    })
    this.setState({
      increments: increments,
      nextIncrementId: this.state.nextIncrementId + 1
    }, () => {
      this.props.onExportDataChanged(this.state)
    })
  }

  updateIncrement = (id, updatedIncrement) => {
    let increments = []
    for (const increment of this.state.increments) {
      if (increment.id === id) {
        increment.data = updatedIncrement
      }
      increments.push(increment)
    }
    this.setState({
      increments: increments
    }, () => {
      this.props.onExportDataChanged(this.state)
    })
  }

  deleteIncrement = (id) => {
    let increments = []
    for (const increment of this.state.increments) {
      if (increment.id !== id) {
        increments.push(increment)
      }
    }
    this.setState({
      increments: increments
    }, () => {
      this.props.onExportDataChanged(this.state)
    })
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
          }}
          />
      )
    }
    return components
  }

  render() {
    return (
      <div style={{display: (this.props.current == true ? 'block' : 'none') }}>
        <div className={styles.Increments}>
          <div className="phase-container">
            <div className="phase-main">
              <h1>Incréments de la US</h1>
              <div className={styles.list} id="user_story_increments">
                {this.getIncrementComponents()}
              </div>      
              <button className={styles.incrementButton} onClick={() => this.addIncrement()}>Ajouter un incrément dans cette US</button>
            </div>
            <div className="phase-guides">
              <h3>Les incréments</h3>
              <p>Les incréments sont des "sous-US" qui nous permettent de découper fonctionnellement
                et d'améliorer notre fiabilité de delivery au cours du sprint.
              </p>

              <h3>Comment découper ?</h3>
              <p>On peut tout à fait intégrer l'intégration de maquettes, le tracking et la gestion
                GDPR dans le même incrément. Tout comme il est possible de créer autant d'incréments
                que nécessaire.
              </p>

              <h3>Les critères</h3>
              <p>Les critères d'acceptation permettent de vérifier que la fonctionnalité correspond
                à la <strong>solution fonctionnelle</strong> choisie.
              </p>

              <h3>DIET</h3>
              <p>Pour chaque incrément (lorsqu'il est éligible), on peut définir si il est :</p>
              <ul>
                <li><strong>D</strong>écoupable : est-ce que l'incrément n'est plus découpable davantage ?</li>
                <li><strong>I</strong>ndépendant : d'un autre incrément, d'une autre US ou d'assets</li>
                <li><strong>E</strong>stimable : si l'équipe est en mesure d'estimer l'incrément</li>
                <li><strong>T</strong>estable : si tous les critères ont été écrits pour cet incrément</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
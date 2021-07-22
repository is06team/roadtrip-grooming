import React, { useContext } from 'react'

import { GlobalUserStoryContext } from '../..'
import { Increment, IncrementType } from '../../../model/types'
import IncrementView from './components/Increment'
import styles from './styles.module.scss'
import { v4 as uuidv4 } from 'uuid';

type Props = {
  isCurrentPhase: boolean,
}

const IncrementPhase = ({ isCurrentPhase }: Props) => {
  const { story, setStory } = useContext(GlobalUserStoryContext)

  const addIncrement = () => {
    let increments = story.increments
    increments.push({
      id: uuidv4(),
      type: IncrementType.none,
      estimation: 0,
      checklist: { d: false, i: false, e: false, t: false },
      notes: '',
      dependencies: '',
      criterias: [],
    })
    setStory({ ...story, increments: increments })
  }

  const updateIncrement = (id: string, value: Increment) => {
    let increments = story.increments
    for (const index in increments) {
      if (id === increments[index].id) {
        increments[index] = value
      }
    }
    setStory({ ...story, increments: increments })
  }

  const deleteIncrement = (incrementId: string) => {
    let increments = []
    for (const index in story.increments) {
      if (incrementId !== story.increments[index].id) {
        increments[index] = story.increments[index]
      }
    }
    setStory({ ...story, increments: increments })
  }

  return (
    <div style={{display: (isCurrentPhase == true ? 'block' : 'none') }}>
      <div className={styles.Increments}>
        <div className="phase-container">
          <div className="phase-main">
            <h1>Incréments de la US</h1>
            <div className={styles.list} id="user_story_increments">
              {story.increments.map(increment => {
                return (
                  <IncrementView
                    id={increment.id}
                    key={increment.id}
                    type={increment.type}
                    estimation={increment.estimation}
                    checklist={increment.checklist}
                    criterias={increment.criterias}
                    notes={increment.notes}
                    dependencies={increment.dependencies}
                    onChange={(value) => updateIncrement(increment.id, value)}
                    onDelete={(id) => deleteIncrement(id)}
                    />
                )
              })}
            </div>
            <button className={styles.incrementButton} onClick={() => addIncrement()}>Ajouter un incrément dans cette US</button>
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
              <li><strong>D</strong>écoupé au maximum : est-ce que l'incrément n'est plus découpable davantage ?</li>
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

export default IncrementPhase
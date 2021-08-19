import React, { useCallback, useContext, useEffect } from 'react'

import { GlobalUserStoryContext } from '../../model/context'
import { Increment, IncrementType } from '../../model/types'
import IncrementView from './components/Increment'
import styles from './styles.module.scss'
import { v4 as uuidv4 } from 'uuid'

const IncrementPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext)

  const addIncrement = () => {
    const increments = story.increments
    setStory({
      ...story,
      increments: [
        ...increments,
        {
          id: uuidv4(),
          type: IncrementType.none,
          estimation: 0,
          checklist: { d: false, i: false, e: false, t: false },
          notes: '',
          dependencies: '',
          criterias: [],
        },
      ],
    })
  }

  const updateIncrement = (id: string, value: Increment) => {
    setStory({
      ...story,
      increments: story.increments.map((increment) => {
        if (increment.id !== id) {
          return increment
        }
        return value
      }),
    })
  }

  const deleteIncrement = (incrementId: string) => {
    setStory({
      ...story,
      increments: story.increments.filter(({ id }) => id !== incrementId),
    })
  }

  return (
    <div className={styles.Increments}>
      <div className="phase-container">
        <div className="phase-main">
          <h1>Incréments de la US</h1>
          <div className={styles.list} id="user_story_increments">
            {story.increments.map((increment) => {
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
          <button className={styles.incrementButton} onClick={() => addIncrement()}>
            Ajouter un incrément dans cette US
          </button>
        </div>
        <div className="phase-guides">
          <h3>Points de vigilance</h3>
          <ul>
            <li>
              <strong>Plusieurs clics</strong> sur les <strong>boutons</strong> de soumission de formulaire
            </li>
            <li>
              <strong>Cas d'erreur</strong> ou indisponibilité des <strong>services tiers</strong>
            </li>
          </ul>

          <h3>DIET</h3>
          <ul>
            <li>
              <strong>D</strong>écoupé au maximum : est-ce que l'incrément n'est plus découpable davantage ?
            </li>
            <li>
              <strong>I</strong>ndépendant : d'un autre incrément, d'une autre US ou d'assets
            </li>
            <li>
              <strong>E</strong>stimable : si l'équipe est en mesure d'estimer l'incrément
            </li>
            <li>
              <strong>T</strong>estable : si tous les critères ont été écrits pour cet incrément
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default IncrementPhase

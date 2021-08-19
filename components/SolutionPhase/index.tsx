import { useContext } from 'react'
import { GlobalUserStoryContext } from '../../model/context'
import { Solution } from '../../model/types'
import styles from './styles.module.scss'

const getEstimationSelector = (estimation: number, onChange: (value: number) => void) => {
  return (
    <select value={estimation} onChange={(e) => onChange(parseInt(e.target.value))}>
      <option value="0">- Complexité</option>
      <option value="1">Faible</option>
      <option value="2">Moyenne</option>
      <option value="3">Forte</option>
    </select>
  )
}

const incrementSolutions = (solutions: Solution[], currentlyUpdatedIndex: number) =>
  typeof solutions[currentlyUpdatedIndex + 1] === 'undefined'
    ? [...solutions, { text: '', estimation: 0, selected: false }]
    : solutions

const getSelectedSolutionIndex: (solutions: Solution[]) => string = (solutions) => {
  const selected = solutions
    .map((solution, index) => {
      return { index, solution }
    })
    .filter((item) => item.solution.selected)
  return selected.length > 0 ? selected[0].index.toString() : ''
}

const SolutionPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext)

  const handleChangeSolutionText = (index: number, text: string) => {
    // Update solution list
    const updatedSolutions = story.solutions.map((solution, i) => {
      if (i === index) {
        return { ...solution, text: text }
      }
      return solution
    })

    const incrementedSolutions = incrementSolutions(updatedSolutions, index)

    setStory({ ...story, solutions: incrementedSolutions })
  }

  const handleChangeSolutionEstimation = (index: number, estimation: number) => {
    const updatedSolutions = story.solutions.map((solution, i) => {
      if (i === index) {
        return { ...solution, estimation: estimation }
      }
      return solution
    })
    setStory({ ...story, solutions: updatedSolutions })
  }

  const handleChangeSelectedSolution = (index: number) => {
    const resetSolutions = story.solutions.map((solution) => {
      return { ...solution, selected: false }
    })
    const updatedSolutions = resetSolutions.map((solution, i) => {
      if (i === index) {
        return { ...solution, selected: true }
      }
      return solution
    })
    setStory({ ...story, solutions: updatedSolutions })
  }

  return (
    <div className="phase-container">
      <div className="phase-main">
        <h1>
          Solution fonctionnelle
          <br />
          <small>Comment répond t-on au besoin ?</small>
        </h1>

        <p>
          Listez ici des solutions potentielles pour répondre au besoin.
          <br />
          Eventuellement, pour vous aider à choisir la bonne solution, estimez à la (grosse) louche leur complexité.
        </p>

        <fieldset className={styles.solutionList}>
          {story.solutions.map((solution, index) => (
            <div className="field">
              <div className={styles.solution} key={'solution_' + index}>
                <span>{index + 1}.</span>
                <input
                  type="text"
                  value={solution.text}
                  onChange={(e) => handleChangeSolutionText(index, e.target.value)}
                />
                {getEstimationSelector(solution.estimation, (value) => handleChangeSolutionEstimation(index, value))}
              </div>
            </div>
          ))}
        </fieldset>

        <p>Puis choisissez laquelle sera réalisée.</p>

        <fieldset>
          <select
            className={styles.selectedSolution}
            value={getSelectedSolutionIndex(story.solutions)}
            onChange={(e) => handleChangeSelectedSolution(parseInt(e.target.value))}
          >
            <option value="">- Choisissez</option>
            {story.solutions
              .filter((solution) => solution.text !== '')
              .map((solution, index) => (
                <option value={index}>
                  {index + 1}. {solution.text}
                </option>
              ))}
          </select>
        </fieldset>
      </div>
      <div className="phase-guides">
        <h3>Objectif</h3>
        <p>Se mettre d'accord sur la solution</p>

        <h3>Exemple</h3>
        <p>"Formulaire de contact qui envoie un mail"</p>
      </div>
    </div>
  )
}

export default SolutionPhase

import { useContext } from "react"
import { GlobalUserStoryContext } from "../.."

const SolutionPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext)

  return (
    <div className="phase-container">
      <div className="phase-main">
        <h1>
          Solution fonctionnelle<br />
          <small>Comment répond t-on au besoin ?</small>
        </h1>

        <fieldset>
          <textarea
            name="solution"
            value={story.solution}
            id="user_story_solution"
            onChange={(e) => setStory({ ...story, solution: e.target.value })}></textarea>
        </fieldset>
      </div>
      <div className="phase-guides">
        <h3>Objectif</h3>
        <p>Se mettre d'accord sur la solution et la challenger</p>

        <h3>Exemple</h3>
        <p>
          "Formulaire de contact qui envoie un mail"
        </p>
      </div>
    </div>
  )
}

export default SolutionPhase
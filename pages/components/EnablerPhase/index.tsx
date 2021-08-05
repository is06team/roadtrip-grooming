import { useContext } from 'react'
import { GlobalUserStoryContext } from '../..'
import styles from './styles.module.scss'

const EnablerPhase = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext)

  return (
    <div className="phase-container">
      <div className="phase-main">
        <h1>Enablers</h1>

        <h2>Liste des enablers à créer pour rendre cette US groomable</h2>
        <fieldset>
          <textarea
            className={styles.field}
            name="enablers"
            value={story.enablers}
            id="user_story_enablers"
            rows={10}
            onChange={(e) => setStory({ ...story, enablers: e.target.value })}></textarea>
        </fieldset>
      </div>
      <div className="phase-guides">
        <h3>Enablers ?</h3>
        <p>Il peut s'agir de maquettes, de faisabilité technique (pour aider à estimer)</p>
      </div>
    </div>
  )
}

export default EnablerPhase
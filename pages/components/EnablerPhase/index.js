import styles from './styles.module.scss'

const EnablerPhase = ({ isCurrentPhase, enablers, onChange }) => {
  return (
    <div style={{display: (isCurrentPhase == true ? 'block' : 'none') }}>
      <div className="phase-container">
        <div className="phase-main">
          <h1>Enablers</h1>

          <h2>Liste des enablers à créer pour rendre cette US groomable</h2>
          <fieldset>
            <textarea
              className={styles.field}
              name="enablers"
              value={enablers}
              id="user_story_enablers"
              rows={10}
              onChange={(e) => onChange(e.target.value)}></textarea>
          </fieldset>
        </div>
        <div className="phase-guides">
          <h3>Enablers ?</h3>
          <p>Il peut s'agir de maquettes, de faisabilité technique (pour aider à estimer)</p>
        </div>
      </div>
    </div>
  )
}

export default EnablerPhase
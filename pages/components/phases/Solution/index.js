import React from 'react'

export default class Solution extends React.Component {
  constructor(props) {
    super(props)
  }

  handleBlur = (text) => {
    this.props.onTextChangedWithRecap(text)
    this.props.onExportDataChanged(text)
  }

  render() {
    return (
      <div className="Solution" style={{display: (this.props.current == true ? 'block' : 'none') }}>
        <div className="phase-container">
          <div className="phase-main">
            <h1>
              Solution fonctionnelle<br />
              <small>Comment répond t-on au besoin ?</small>
            </h1>
  
            <fieldset>
              <textarea name="solution" id="user_story_solution" onBlur={() => this.handleBlur(event.target.value)}></textarea>
            </fieldset>
          </div>
          <div className="phase-guides">
            <p className="goal">
              Objectif :<br />
              Se mettre d'accord sur la solution et la challenger
            </p>
  
            <p className="advice">
              Exemple : <br />
              <strong>"Formulaire de contact qui envoie un mail"</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
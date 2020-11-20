import React from 'react'

export default class Solution extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange = (text) => {
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
              <textarea
                name="solution"
                value={this.props.initialData}
                id="user_story_solution"
                onChange={(e) => this.handleChange(e.target.value)}></textarea>
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
      </div>
    )
  }
}
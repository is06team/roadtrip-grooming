import React from 'react'

export default class Assets extends React.Component {
  constructor(props) {
    super(props)
  }

  handleBlur = (text) => {
    this.props.onTextChangedWithRecap(text)
  }

  render() {
    return (
      <div style={{display: (this.props.current == true ? 'block' : 'none') }}>
        <div className="phase-container">
          <div className="phase-main">
            <h1>Assets</h1>

            <h2>Remarques (facultatif)</h2>
            <fieldset>
              <textarea name="assets" id="user_story_assets" onBlur={() => this.handleBlur(event.target.value)}></textarea>
            </fieldset>
          </div>
          <div className="phase-guides">
            <p>Objectif :<br />Justifier l'utilité business de la fonctionnalité.</p>
            <p>Astuce :<br />Se poser la question "On aura raison de réaliser cette fonctionnalité si..."</p>
          </div>
        </div>
      </div>
    )
  }  
}
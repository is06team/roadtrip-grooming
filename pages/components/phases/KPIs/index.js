import React from 'react'

export default class KPIs extends React.Component {
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
            <h1>KPI de succès</h1>
            <fieldset>
              <textarea name="kpi" onBlur={() => this.handleBlur(event.target.value)}></textarea>
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
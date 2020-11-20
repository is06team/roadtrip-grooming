import React from 'react'

export default class KPIs extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange = (text) => {
    this.props.onTextChangedWithRecap(text)
    this.props.onExportDataChanged(text)
  }

  render() {
    return (
      <div style={{display: (this.props.current == true ? 'block' : 'none') }}>
        <div className="phase-container">
          <div className="phase-main">
            <h1>KPI de succès</h1>
            <fieldset>
              <textarea name="kpi" value={this.props.initialData} onChange={(e) => this.handleChange(e.target.value)}></textarea>
            </fieldset>
          </div>
          <div className="phase-guides">
            <h3>Objectif</h3>
            <p>Justifier l'utilité business de la fonctionnalité.</p>
            
            <h3>Astuce</h3>
            <p>Se poser la question "On aura raison de réaliser cette fonctionnalité si..."</p>
          </div>
        </div>
      </div>
    )
  }
}
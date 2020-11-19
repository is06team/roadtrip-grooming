import React from 'react'

export default class BusinessValue extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange = (value) => {
    this.props.onTextChangedWithRecap(value)
  }

  getValueItems = () => {
    let items = [
      <option key="value_item_0">- Choisissez</option>
    ]
    for (let i = 5; i < 100; i += 5) {
      items.push(<option key={'value_item_' + i} value={i}>{i}</option>)
    }
    return items
  }

  render() {
    return (
      <div style={{display: (this.props.current == true ? 'block' : 'none') }}>
        <div className="phase-container">
          <div className="phase-main">
            <h1>Valeur métier</h1>
            
            <fieldset>
              <select className="big" id="user_story_business_value" onChange={() => this.handleChange(event.target.value)}>
                {this.getValueItems()}        
              </select>
            </fieldset>
          </div>
          <div className="phase-guides">
            <p>Objectif :<br />
              La valeur métier aide à prioriser les US à réaliser.
              Elle permet aussi d'identifier quelles sont les fonctionnalités qui apporte
              beaucoup de valeur à nos utilisateurs.</p>
          </div>
        </div>
      </div>
    )
  }
}
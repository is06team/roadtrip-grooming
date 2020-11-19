import React from 'react'

const needItemTexts = {
  as: '<strong>ETQ</strong>',
  want: '<br /><strong>JS</strong>',
  to: '<br /><strong>AD</strong>',
}

export default class Need extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      need: [],
    }
  }

  handleBlur = (id) => {
    const el = document.getElementById('user_story_need_' + id)
    let need = this.state.need
    need[id] = el.value
    this.setState({ need: need })

    let text = ''
    for (const itemType in this.state.need) {
      text += needItemTexts[itemType] + ' ' + this.state.need[itemType]
    }

    this.props.onTextChangedWithRecap(text)
  }

  render() {
    return (
      <div id="phase-need" className="Need" style={{display: (this.props.current == true ? 'block' : 'none') }}>
        <div className="phase-container">
          <div className="phase-main">
            <h1>Quel est le besoin à groomer ?</h1>
  
            <fieldset>
              <div className="field">
                <label htmlFor="user_story_need_as">En tant que</label>
                <input type="text" id="user_story_need_as" name="user_need[as]" placeholder="Persona" onBlur={() => this.handleBlur('as')} />
                <span className="field-hint">(Qui)</span>
              </div>
              <div className="field">
                <label htmlFor="user_story_need_want">Je souhaite</label>
                <input type="text" id="user_story_need_want" name="user_need[want]" placeholder="Ceci" onBlur={() => this.handleBlur('want')} />
                <span className="field-hint">(Quoi)</span>
              </div>
              <div className="field">
                <label htmlFor="user_story_need_to">Afin de</label>
                <input type="text" id="user_story_need_to" name="user_need[to]" placeholder="Finalité" onBlur={() => this.handleBlur('to')} />
                <span className="field-hint">(Pourquoi)</span>
              </div>
            </fieldset>
          </div>
          <div className="phase-guides">
            <p>Le PO explique le besoin de l'utilisateur.</p>
            <p>
              Objectifs :
            </p>
            <ul>
              <li>Cerner le vrai besoin univoque de l'utilisateur (le quoi et le qui),</li>
              <li>Donner du sens à ce qu'on fait (le pourquoi).</li>
            </ul>
            <p>
              Conseil :<br />
              l'équipe essaye d'écrire un besoin le plus petit possible fonctionnellement.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
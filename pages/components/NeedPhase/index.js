import React, { useContext } from 'react'

import { AppDataContext } from '../../'

const NeedPhase = ({ isCurrentPhase }) => {
  const { data, setData } = useContext(AppDataContext)

  const handleChange = (field, value) => {
    setData({
      ...data,
      need: {
        ...data.need,
        [field]: value,
      }
    })
  }

  return (
    <div style={{display: (isCurrentPhase == true ? 'block' : 'none') }}>
      <div className="phase-container">
          <div className="phase-main">
            <h1>Quel est le besoin à groomer ?</h1>
            <fieldset>
              <div className="field">
                <label htmlFor="user_story_need_as">En tant que</label>
                <input type="text" value={data.need.as} placeholder="Persona" onChange={(e) => handleChange('as', e.target.value)} />
                <span className="field-hint">(Qui)</span>
              </div>
              <div className="field">
                <label htmlFor="user_story_need_want">Je souhaite</label>
                <input type="text" value={data.need.want} placeholder="Ceci" onChange={(e) => handleChange('want', e.target.value)} />
                <span className="field-hint">(Quoi)</span>
              </div>
              <div className="field">
                <label htmlFor="user_story_need_to">Afin de</label>
                <input type="text" value={data.need.to} placeholder="Finalité" onChange={(e) => handleChange('to', e.target.value)} />
                <span className="field-hint">(Pourquoi)</span>
              </div>
            </fieldset>
          </div>
          <div className="phase-guides">
            <h3>Déroulement</h3>
            <p>Le PO explique le besoin de l'utilisateur.</p>
            
            <h3>Objectifs</h3>
            <ul>
              <li>Cerner le vrai besoin univoque de l'utilisateur (le quoi et le qui),</li>
              <li>Donner du sens à ce qu'on fait (le pourquoi).</li>
            </ul>
            
            <h3>Conseil</h3>
            <p>L'équipe essaye d'écrire un besoin le plus petit possible fonctionnellement.</p>
          </div>
        </div>
    </div>
  )
}

export default NeedPhase
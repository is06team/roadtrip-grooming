type Props = {
  isCurrentPhase: boolean,
  businessValue: number,
  onChange: (value: number) => void,
}

const getValueItems: () => JSX.Element[] = () => {
  let items = [<option key={'value_item_none'}>- Choisissez</option>]
  for (let i = 5; i <= 100; i += 5) {
    items.push(<option key={'value_item_' + i} value={i}>{i}</option>)
  }
  return items
}

const BusinessValuePhase = ({ isCurrentPhase, businessValue, onChange }: Props) => {
  return (
    <div style={{display: (isCurrentPhase == true ? 'block' : 'none') }}>
      <div className="phase-container">
        <div className="phase-main">
          <h1>Valeur métier</h1> 
          <fieldset>
            <select
              className="big"
              id="user_story_business_value"
              value={businessValue}
              onChange={(e) => onChange(parseInt(e.target.value))}>
              {getValueItems()}
            </select>
          </fieldset>
        </div>
        <div className="phase-guides">
          <h3>Objectif</h3>
          <p>La valeur métier aide à prioriser les US à réaliser.
            Elle permet aussi d'identifier quelles sont les fonctionnalités qui apportent
            beaucoup de valeur à nos utilisateurs.</p>
        </div>
      </div>
    </div>
  )
}

export default BusinessValuePhase
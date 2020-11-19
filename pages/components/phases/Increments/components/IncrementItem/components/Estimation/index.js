import React from 'react'
import styles from './styles.module.scss';

export default class Estimation extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange = (value) => {
    this.props.onValueChanged(parseFloat(value))
  }
  
  render() {
    return (
      <div className={styles.Estimation}>
        <label>Estimation</label>
        <select className="medium user_story_increment_estimation" onChange={() => this.handleChange(event.target.value)}>
          <option>- Choisissez</option>
          <option>0.5</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>5</option>
          <option>8</option>
          <option>13</option>
          <option>21</option>
          <option>34</option>
        </select>
      </div>
    )
  }
}
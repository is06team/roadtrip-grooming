import React from 'react'
import styles from './styles.module.scss';

export default class DIET extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        D: false,
        I: false,
        E: false,
        T: false,
      },
    }
  }

  handleChecked = (element) => {
    let value = this.state.value
    value[element.value] = element.checked
    this.setState({
      value: value
    }, () => {
      this.props.onValueChanged(value)
    })
  }

  render() {
    return (
      <div className={styles.DIET}>
        <span className="checkField">
          <span className="checkMark"></span>
          <input type="checkbox" className="user_story_increment_diet_d" value="D" name="diet[D]" onChange={() => this.handleChecked(event.target)} />
          <label>D</label>
        </span>
        <span className="checkField">
          <span className="checkMark"></span>
          <input type="checkbox" className="user_story_increment_diet_i" value="I" name="diet[I]" onChange={() => this.handleChecked(event.target)} />
          <label>I</label>
        </span>
        <span className="checkField">
          <span className="checkMark"></span>
          <input type="checkbox" className="user_story_increment_diet_e" value="E" name="diet[E]" onChange={() => this.handleChecked(event.target)} />
          <label>E</label>
        </span>
        <span className="checkField">
          <span className="checkMark"></span>
          <input type="checkbox" className="user_story_increment_diet_t" value="T" name="diet[T]" onChange={() => this.handleChecked(event.target)} />        
          <label>T</label>
        </span>
      </div>
    )
  }
}
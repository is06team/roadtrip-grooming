import React from 'react'
import styles from './styles.module.scss'

export default class Criteria extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDelete = (id) => {
    this.props.onDeletedCriteria(id)
  }

  handleChange = (id, field, text) => {
    this.props.onChangedCriteria(id, field, text)
  }

  render() {
    return (
      <div className="user_story_increment_criteria_item">
        <div className={styles.Criteria}>
          <div className={styles.title}>
            <input
              type="text"
              className="user_story_increment_criteria_title"
              value={this.props.title}
              placeholder="Titre du critère"
              onChange={() => { this.handleChange(this.props.id, 'title', event.target.value) }} />
            <button className="criteriaTitle" onClick={() => { this.handleDelete(this.props.id) }}>Supprimer</button>
          </div>
          <div className={styles.content}>
            <textarea
              className="user_story_increment_criteria_text"
              placeholder="GIVEN WHEN THEN"
              value={this.props.gherkin}
              onChange={() => { this.handleChange(this.props.id, 'gherkin', event.target.value )}}></textarea>
          </div>        
        </div>
      </div>
    )
  }
}
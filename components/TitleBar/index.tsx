import { useContext } from 'react'
import { GlobalUserStoryContext } from '../../model/context'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'
import { defaultUserStoryData } from '../../model/defaultUserStoryData'
import TimerView from './components/Timer'

const TitleBar = () => {
  const { story, setStory } = useContext(GlobalUserStoryContext)

  const handleChangeJiraTicket = (ticketNumber: string) => {
    const number = ticketNumber.replace('LBCFTRT-', '')
    setStory({ ...story, jiraTicket: 'LBCFTRT-' + number })
  }

  return (
    <div className={styles.UsTitle}>
      <div className={styles.FieldContainer}>
        <input
          type="text"
          value={story.title}
          id="user_story_title"
          placeholder="Titre de la US"
          className={classNames(styles.Field, styles.UsTitleField)}
          onChange={(e) => setStory({ ...story, title: e.target.value })}
        />
        <input
          type="text"
          value={story.jiraTicket}
          placeholder="Ticket JIRA"
          className={classNames(styles.Field, styles.JiraTicketField)}
          onChange={(e) => handleChangeJiraTicket(e.target.value)}
        />
      </div>
      <TimerView />
      <button className={styles.DeleteAllButton} onClick={() => setStory(defaultUserStoryData)}>
        <FontAwesomeIcon icon={faBomb} />
        &nbsp; Effacer tout
      </button>
    </div>
  )
}

export default TitleBar

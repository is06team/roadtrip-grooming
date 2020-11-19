import React from 'react'
import styles from './styles.module.scss'

export default function ArianeItem(props) {
  const id = 'ariane-' + props.name
  const className = styles.ArianeItem + (props.current ? ' ' + styles.current : '')

  return (
    <li className={className} id={id} onClick={() => { props.onSelectPhase(name) }}>
      <h2>{props.title}</h2>
      <div className="recap" dangerouslySetInnerHTML={{ __html: props.recap }}></div>
    </li>
  )
}

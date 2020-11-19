import Ariane from './components/Ariane'
import Assets from './components/phases/Assets'
import BusinessValue from './components/phases/BusinessValue'
import Increments from './components/phases/Increments'
import JiraExport from './components/phases/JiraExport'
import KPIs from './components/phases/KPIs'
import Need from './components/phases/Need'
import React from 'react'
import Solution from './components/phases/Solution'
import styles from './styles.module.scss'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPhase: 'need',
      recaps: [],
    }
  }

  handleChangePhase = (phase) => {
    this.setState({ currentPhase: phase })
  }

  handleChangeRecap = (phase, recap) => {
    let recaps = this.state.recaps
    recaps[phase] = recap
    this.setState({ recaps: recaps })
  }

  render() {
    return (
      <div>
        <div className={styles.UsTitle}>
          <h1>User story :</h1>
          <input type="text" id="user_story_title" name="user_story[title]" placeholder="Titre de la US"></input>
        </div>
        <div className={styles.Main}>
          <Ariane onChangePhase={(phase) => { this.handleChangePhase(phase) }} recaps={this.state.recaps} />
    
          <div className="phases" id="phase-items">
            <Need current={this.state.currentPhase == 'need'} onTextChangedWithRecap={(recap) => this.handleChangeRecap('need', recap)} />
            <Solution current={this.state.currentPhase == 'solution'} onTextChangedWithRecap={(recap) => this.handleChangeRecap('solution', recap)} />
            <BusinessValue current={this.state.currentPhase == 'value'} onTextChangedWithRecap={(recap) => this.handleChangeRecap('value', recap)} />
            <KPIs current={this.state.currentPhase == 'kpis'} onTextChangedWithRecap={(recap) => this.handleChangeRecap('kpis', recap)} />
            <Assets current={this.state.currentPhase == 'assets'} onTextChangedWithRecap={(recap) => this.handleChangeRecap('assets', recap)} />
            <Increments current={this.state.currentPhase == 'increments'} onTextChangedWithRecap={(recap) => this.handleChangeRecap('increments', recap)} />
            <JiraExport current={this.state.currentPhase == 'jira'} />
          </div>
        </div>
      </div>      
    )
  }
}

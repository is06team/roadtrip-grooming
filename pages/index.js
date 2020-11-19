import Ariane from './components/Ariane'
import Assets from './components/phases/Assets'
import BusinessValue from './components/phases/BusinessValue'
import Export from './components/phases/Export'
import Increments from './components/phases/Increments'
import KPIs from './components/phases/KPIs'
import Need from './components/phases/Need'
import React from 'react'
import Solution from './components/phases/Solution'
import styles from './styles.module.scss'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPhase: null,
      recaps: [],
      exportData: {
        title: '',
        need: {},
        solution: '',
        value: 0,
        kpis: '',
        assets: '',
        increments: {},
        jira: {}
      },
    }
  }

  handleChangeTitle = (title) => {
    let exportData = this.state.exportData
    exportData.title = title
    this.setState({ exportData: exportData })
  }

  handleChangePhase = (phase) => {
    this.setState({ currentPhase: phase })
  }

  handleChangeRecap = (phase, recap) => {
    let recaps = this.state.recaps
    recaps[phase] = recap
    this.setState({ recaps: recaps })
  }

  handleChangeExportData = (phase, data) => {
    let exportData = this.state.exportData
    exportData[phase] = data
    this.setState({ exportData: exportData })
  }

  render() {
    return (
      <div>
        <div className={styles.UsTitle}>
          <h1>User story :</h1>
          <input type="text" id="user_story_title" name="user_story[title]" placeholder="Titre de la US" onBlur={() => this.handleChangeTitle(event.target.value)}></input>
        </div>
        <div className={styles.Main}>
          <Ariane onChangePhase={(phase) => { this.handleChangePhase(phase) }} recaps={this.state.recaps} />
    
          <div className="phases" id="phase-items">
            <Need
              current={this.state.currentPhase == 'need'}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('need', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('need', data)}
              />
            <Solution
              current={this.state.currentPhase == 'solution'}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('solution', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('solution', data)}
              />
            <BusinessValue
              current={this.state.currentPhase == 'value'}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('value', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('value', data)}
              />
            <KPIs
              current={this.state.currentPhase == 'kpis'}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('kpis', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('kpis', data)}
              />
            <Assets
              current={this.state.currentPhase == 'assets'}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('assets', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('assets', data)}
              />
            <Increments 
              current={this.state.currentPhase == 'increments'}
              onExportDataChanged={(data) => this.handleChangeExportData('increments', data)}
              />
            <Export
              current={this.state.currentPhase == 'export'}
              exportData={this.state.exportData}
              />
          </div>
        </div>
      </div>      
    )
  }
}

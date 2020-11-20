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

const needItemTexts = {
  as: '<strong>ETQ</strong>',
  want: '<br /><strong>JS</strong>',
  to: '<br /><strong>AD</strong>',
}

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPhase: null,
      recaps: [],
      exportData: {
        title: '',
        need: {
          as: '',
          want: '',
          to: '',
        },
        solution: '',
        value: 0,
        kpis: '',
        assets: '',
        increments: {
          nextIncrementId: 0,
          increments: [],
        },
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

    if (phase === 'need') {
      recap = ''
      for (const itemType in this.state.exportData.need) {
        recap += needItemTexts[itemType] + ' ' + this.state.exportData.need[itemType]
      }
    }

    recaps[phase] = recap
    this.setState({ recaps: recaps })
  }

  handleChangeExportData = (phase, data) => {
    let exportData = this.state.exportData
    exportData[phase] = data
    this.setState({ exportData: exportData })
  }

  handleDataImport = (data) => {
    this.setState({
      exportData: {
        title: data.title,
        need: data.need,
        solution: data.solution,
        value: data.value,
        kpis: data.kpis,
        assets: data.assets,
        increments: data.increments,
      }
    })
    
    this.handleChangeRecap('need', data.need)
    this.handleChangeRecap('solution', data.solution)
    this.handleChangeRecap('value', data.value)
    this.handleChangeRecap('kpis', data.kpis)
    this.handleChangeRecap('assets', data.assets)
  }

  render() {
    return (
      <div>
        <div className={styles.UsTitle}>
          <h1>User story :</h1>
          <input
            type="text"
            value={this.state.exportData.title}
            id="user_story_title"
            name="user_story[title]"
            placeholder="Titre de la US"
            onChange={() => this.handleChangeTitle(event.target.value)}></input>
        </div>
        <div className={styles.Main}>
          <Ariane
            recaps={this.state.recaps}
            onChangePhase={(phase) => { this.handleChangePhase(phase) }}
            />
    
          <div className="phases" id="phase-items">
            <Need
              current={this.state.currentPhase == 'need'}
              initialData={this.state.exportData.need}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('need', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('need', data)}
              />
            <Solution
              current={this.state.currentPhase == 'solution'}
              initialData={this.state.exportData.solution}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('solution', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('solution', data)}
              />
            <BusinessValue
              current={this.state.currentPhase == 'value'}
              initialData={this.state.exportData.value}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('value', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('value', data)}
              />
            <KPIs
              current={this.state.currentPhase == 'kpis'}
              initialData={this.state.exportData.kpis}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('kpis', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('kpis', data)}
              />
            <Assets
              current={this.state.currentPhase == 'assets'}
              initialData={this.state.exportData.assets}
              onTextChangedWithRecap={(recap) => this.handleChangeRecap('assets', recap)}
              onExportDataChanged={(data) => this.handleChangeExportData('assets', data)}
              />
            <Increments 
              current={this.state.currentPhase == 'increments'}
              initialData={this.state.exportData.increments}
              onExportDataChanged={(data) => this.handleChangeExportData('increments', data)}
              />
            <Export
              current={this.state.currentPhase == 'export'}
              exportData={this.state.exportData}
              onDataImported={(data) => this.handleDataImport(data)}
              />
          </div>
        </div>
      </div>      
    )
  }
}

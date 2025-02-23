import { Translation } from 'react-i18next'
import React, { Component } from 'react'
import { PropTypes, Link, StoreStateRouterLocationURI, connect } from '../../family'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { TextField, InputAdornment } from '@mui/material'
import Search from '@mui/icons-material/Search'

class Highlight extends Component<any, any> {
  static replace = (clip: any, seed: any) => {
    if (!seed) { return clip }
    const rseed = new RegExp(seed, 'ig')
    return ('' + clip).replace(rseed, (matched) =>
      `<span class='highlight'>${matched}</span>`
    )
  }
  render() {
    const { clip, seed } = this.props
    const highlighted = { __html: Highlight.replace(clip, seed) }
    return (
      <span {...this.props} dangerouslySetInnerHTML={highlighted} />
    )
  }
}

class DropdownMenuBase extends Component<any, any> {
  static contextTypes = {
    store: PropTypes.object,
  }
  static filter = (respository: any, seed: string) => {
    const nextRespository = { ...respository, modules: [] }
    let counter = 0
    seed = seed.toLowerCase()
    respository.modules.forEach((mod: any) => {
      const nextModule = { ...mod, interfaces: [] }
      let matchModule = nextModule.name.toLowerCase().indexOf(seed) !== -1
      if (matchModule) {
        counter++
        nextRespository.modules.push(nextModule)
      }

      mod.interfaces.forEach((itf: any) => {
        const nextInterface = { ...itf, properties: [] }
        const matchInterface =
          nextInterface.name.toLowerCase().indexOf(seed) !== -1 ||
          nextInterface.url.toLowerCase().indexOf(seed) !== -1 ||
          nextInterface.method === seed ||
          nextInterface.id === +seed
        if (matchInterface) {
          counter++
          if (!matchModule) {
            matchModule = true
            nextRespository.modules.push(nextModule)
          }
          nextModule.interfaces.push(nextInterface)
        }
      })
    })
    return { nextRespository, counter }
  }
  static highlight = (clip: any, seed: any) => {
    if (!seed) { return clip }
    const rseed = new RegExp(seed, 'ig')
    return ('' + clip).replace(rseed, (matched) =>
      `<span class='highlight'>${matched}</span>`
    )
  }
  render() {
    const { repository, seed, onSelect, router } = this.props
    const uri = StoreStateRouterLocationURI(router).removeSearch('mod').removeSearch('itf')
    const { nextRespository, counter } = DropdownMenu.filter(repository, seed)
    if (counter === 0) { return null }
    return (
      <div className="dropdown-menu">
        {nextRespository.modules.map((mod: any, index: any, modules: any) => (
          <div key={`mod-${mod.id}`}>
            <Link to={uri.setSearch({ mod: mod.id }).href()} onClick={onSelect} className="dropdown-item dropdown-item-module">
              <Translation>
                {(t) => <span className="label">{t('Module')}</span>}</Translation>
              <Highlight className="dropdown-item-clip" clip={mod.name} seed={seed} />
            </Link>
            {mod.interfaces.map((itf: any) => (
              <div key={`itf-${itf.id}`} >
                <Link
                  to={uri.setSearch({ mod: itf.moduleId }).setSearch({ itf: itf.id }).href()}
                  onClick={onSelect}
                  className="dropdown-item dropdown-item-interface"
                >
                  <Translation>
                    {(t) => <span className="label">{t('API')}</span>}</Translation>
                  <Highlight className="dropdown-item-clip" clip={itf.name} seed={seed} />
                  <Highlight className="dropdown-item-clip" clip={itf.method} seed={seed} />
                  <Highlight className="dropdown-item-clip" clip={itf.url} seed={seed} />
                </Link>
                {itf.properties.map((property: any) => (
                  <Link key={`property-${property.id}`} to={uri.setSearch({ mod: property.moduleId }).setSearch({ itf: property.interfaceId }).href()} onClick={onSelect} className="dropdown-item dropdown-item-property">
                    <Translation>
                      {(t) => <span className="label">{t('attribute')}</span>}</Translation>
                    <Highlight className="dropdown-item-clip" clip={property.name} seed={seed} />
                  </Link>
                )
                )}
              </div>
            )
            )}
            {index < modules.length - 1 && <div className="dropdown-divider" />}
          </div>
        )
        )}
      </div>
    )
  }
}

const DropdownMenu = connect((state: any) => ({ router: state.router }))(DropdownMenuBase)

interface IState {
  seed: string
  result: string
}

// TODO 2.2 自动隐藏，高阶组件
class RepositorySearcher extends Component<any, IState> {
  debouncedInput = AwesomeDebouncePromise((val: string) => this.setState({ result: val }), 300)
  constructor(props: any) {
    super(props)
    this.state = { seed: '', result: '' }
    this.debouncedInput = this.debouncedInput.bind(this)
  }
  render() {
    const { repository } = this.props
    const { seed, result } = this.state

    return (
      <Translation>
        {(t) => (
          <div className="RepositorySearcher dropdown">
            <TextField
              value={seed}
              onChange={e => {
                const val = e.target.value
                this.setState({ seed: val })
                this.debouncedInput(val.trim())
              }}
              sx={{ backgroundColor: '#fafbfc', mr: 1.5 }}
              className="dropdown-input form-control"
              placeholder={t('Search name or ID')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            {result && <DropdownMenu repository={repository} seed={result} onSelect={this.clearSeed} />}
          </div>
        )}</Translation>
    )
  }
  clearSeed = () => {
    this.setState({ seed: '', result: '' })
  }
}

export default connect((state: any) => ({
  router: state.router,
}))(RepositorySearcher)

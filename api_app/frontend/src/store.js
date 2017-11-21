let localStorage = window.localStorage

let store = {
  debug: true,

  getStateData (dataField) {
    return (localStorage) ? localStorage.getItem(dataField) : null
  },

  setStateData (dataField, newValue) {
    if (this.debug) console.log(`${dataField} triggered with: ${newValue}`)
    localStorage.setItem(dataField, newValue)
  },

  clearStateData (dataField) {
    if (this.debug) console.log(`${dataField} cleared`)
    localStorage.removeItem(dataField)
  }
}

export default store

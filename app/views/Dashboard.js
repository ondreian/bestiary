import m          from "mithril"
import App        from "layouts/App"
import {bulma, pipe, styles}    from "utils/bulma"

const LEVEL_RANGE = /^([0-9]+)(|\s+)(-|:|between)(|\s+)([0-9]+)$/

export default class Dashboard {
  
  static controller () {
    return new Dashboard()
  }

  static view (ctrl) {
    return App(
        Dashboard.leftPane(ctrl)
      , Dashboard.creatureView(ctrl)
    )
  }

  static leftPane (ctrl) {
    const creatureList = m(`ol${styles.creatures()}`, ctrl.list()
      .sort( (a,b)=> b.level - a.level )
      .map(Dashboard.creatureItem(ctrl)))
      
    return bulma.leftPane([
        Dashboard.searchBar(ctrl)
      , creatureList
    ])
  }

  static searchBar (ctrl) {
    return bulma.searchBar(
        m("input[type=search]", {
        oninput: (evt) => ctrl.search(evt)
        })
      , m(`ol${styles.filters()}`, [
        m(`li.undead-filter${ ctrl.filters.undead ? styles.filterOn() : styles.filterOff() }`, {
          onclick : (evt)=> {
            if (!ctrl.filters.undead) {
              ctrl.filters.undead = Dashboard.undead
              return
            }

            delete ctrl.filters.undead
          }
        }, "undead")
      ])
    )
  }

  static creatureItem (ctrl) { return (creature) => {
      return m("li"
        , { onclick: (evt)=> ctrl.active(creature) }
        , [
              m(`span${styles.level()}`, creature.level)
            , m("span", creature.name)
          ])
    }
  }

  static creatureView (ctrl) {
    const creature = ctrl.active()

    const content = !creature
      ? m("h1", "please select a monster")
      : [
            m("h1.name", creature.name)
          , m("h2.level", creature.level)
          , m("h3.habitat", creature.habitat)
          , m("p.description", creature.description)
        ]

    return content
      | pipe.view()
      | pipe.rightPane()

  }

  constructor () {
    this.creatures = m.prop([])
    this.filters   = {}
    this.active    = m.prop(false)
    
    this.list      = ()=> {
      return Object
        .keys(this.filters)
        .map( filter => this.filters[filter] )
        .reduce( (creatures, filter)=> creatures.filter(filter) , this.creatures())
    }

    m.request({method : "GET", url: "https://rawgit.com/ondreian/gemstone_data_project/master/creatures.json"}).then(this.creatures)
  }

  search (evt) {
    if (evt.target.value.match(LEVEL_RANGE)) {
      this.filters.level = Dashboard.level(evt.target.value)
      return
    }

    delete this.filters.level
    // TODO: lunr search
  }

  static undead (creature) {
    return creature.undead
  }

  static level (str) {
    const [min, max] = str.split("-").map(Number).sort( (a,b)=> a - b )
    return creature => creature.level <= max && creature.level >= min
    
  }


}
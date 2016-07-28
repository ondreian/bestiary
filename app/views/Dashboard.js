import m                      from "mithril"
import lunr                   from "lunr"
import App                    from "layouts/App"
import {bulma, pipe, styles}  from "utils/bulma"
import onlyEvery              from "utils/onlyEvery"


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
    const creatureList = m(`ol${styles.creatures()}`
      , Dashboard.creatureItem(ctrl)
          | ctrl.list().map()
    )
      
    return bulma.leftPane([
        Dashboard.searchBar(ctrl)
      , creatureList
    ])
  }

  static searchBar (ctrl) {
    return bulma.searchBar(
        m("input[type=search]", {
            oninput: (evt) => ctrl.search(evt)
          , config : (ele, isInitialized, ctx) => {
              if (isInitialized) return true
              ctx.retain = true
            }
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
        , { onclick: (evt)=> ctrl.active(creature), id: creature.name }
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
      : bulma.content([
            m("h1", 
                m(`span${styles.creatureLevel()}`, creature.level)
              , m(`span${styles.creature()}`, creature.name)
              
            )
          , m("h2", creature.tags.join(", "))
          , m("h3.habitats", creature.habitats.join(", "))
          , m("p.description", creature.description)
          , m(`ol${styles.rooms()}`,  (creature.rooms || []).filter( room => room ).map( room => {
              return m(`li`, room)
            }))
          , m(`a[href=${creature.article}]`, "more")
        ])

    return content
      | pipe.view()
      | pipe.rightPane()

  }

  constructor () {
    this.creatures = m.prop([])
    this.filters   = {}
    this.active    = m.prop(false)
    this.index     = lunr(function () {
      this.field('name', { boost: 10 })
      this.field('tags', { boost: 20 })
      this.field('habitats', { boost: 30 })
      this.field('description')
      this.ref('name')
    })
    
    this.list      = ()=> {
      const list = Object
        .keys(this.filters)
        .map( filter => this.filters[filter] )
        .reduce( (creatures, filter)=> creatures.filter(filter) , this.creatures())

      if (!this.sorter) return list

      return list.sort(this.sorter)
    }

    m
      .request({method : "GET", url: "https://rawgit.com/ondreian/gemstone_data_project/master/creatures.json"})
      .then(this.creatures)
      .then( creatures => {
        creatures.forEach( creature => this.index.add(creature) )
      })
  }

  search (evt) {
    delete this.filters.lunr
    delete this.sorter

    if (evt.target.value == "") {
      delete this.filters.lunr
      delete this.filters.level
      return
    }

    if (evt.target.value.match(LEVEL_RANGE)) {
      this.filters.level = Dashboard.level(evt.target.value)
      return
    }

    delete this.filters.level

    const lookup = this.index.search(evt.target.value)
    .filter( match => match.score > .05 )
    .reduce( (lookup, match)=> {
      lookup[match.ref] = match.score
      return lookup
    }, {})

    this.filters.lunr = creature => lookup[creature.name]
    this.sorter       = (a, b)   => lookup[b.name] - lookup[a.name]

  }

  static undead (creature) {
    return ~creature.tags.indexOf("undead")
  }

  static level (str) {
    const [min, max] = str.split("-").map(Number).sort( (a,b)=> a - b )
    return creature => creature.level <= max && creature.level >= min
    
  }

}
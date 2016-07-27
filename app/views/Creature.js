import m          from "mithril"
import App        from "layouts/App"
import {bulma, pipe, styles} from "utils/bulma"


export default class Creature {
  static controller () {

  }

  static width () {
    return styles.Creature()
      | styles.is4()
      | styles.isOffset4()
  }

  static wrapper (view) {
    return view
      | pipe.content()
      | pipe.column( Creature.width() )
      | pipe.columns()
      | pipe.main( styles.section() )
  }

  static cipher (text) {
    return atob(text)
  }

  static section ({title, text}) {
    return bulma.section(
        m('h3', title)
      , m('p' , text)
    )
  }
  
  static view () {
    return App(
      sections.map(Creature.section)
        | Creature.wrapper()
    )
  }
}
import m                     from "mithril"
import {pipe, bulma, styles, raw} from "utils/bulma"
import onlyEvery             from "utils/onlyEvery"

function route (href) {
  return (evt) => {
    if (href.match(/^external:/)) return
    m.route(href)
    return false
  }
}

function nav (items) {
  return bulma.nav(bulma.navCenter(items.map( item => {
      return m(`a.${styles.navItem()}[href=${item.href.replace(/^external:/, "")}]`
        , { onclick : route(item.href) }
        , !item.icon 
            ? item.text 
            : [m(`i.${item.icon}`), item.text]
      ) 
    }))
  )
}

/*
function persist (ele, isInitialized, ctx) {
  if (isInitialized) return
  ctx.retain = true
  affix(ele)
}
*/

function menu (name, items) {
  const className = name
    | styles.navigation()
    | styles.isPaddingless()

  return nav(items)
    | pipe.container()
    | pipe.section(className)
}

function header (items) {
  const className = styles()
    | styles.top()
    | styles.navigation()

  const inner = nav(items)
      | pipe.container()

  return m(className, { config: affix }, inner)

}

export default function App (...views) {
  return bulma.app.apply(null, views)
}
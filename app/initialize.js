import m           from "mithril"
import Dashboard   from "views/Dashboard"
import onlyEvery   from "utils/onlyEvery"

function boot () {
  m.route(document.body, "/", {
      "/"             : Dashboard
  })	
}

window.onresize = onlyEvery( 1000 / 28 ,  m.redraw )

document.addEventListener('DOMContentLoaded', boot)

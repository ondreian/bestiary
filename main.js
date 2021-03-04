// Should really switch this to the instantsearch es stuff

import instantsearch from 'instantsearch.js/dist/instantsearch.production.min.js'
import algoliasearch from 'algoliasearch/dist/algoliasearch.umd.js'

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  const search = instantsearch({
    searchClient: algoliasearch(
      'R7MRY12BR6',
      'e2c3f38bb50bb4323fe3245d6df7e40d'
    ),
    indexName: 'zero-gravitas',
    searchParameters: {
    attributesToSnippet: ["title:30", "skin:10"],
      facetingAfterDistinct: true,
      query: "",
      snippetEllipsisText: '[&hellip;]'
    }
  });

  search.addWidgets([

    instantsearch.widgets.searchBox({
    container: '#search-box',
      placeholder: 'Search for Critters',
      autofocus: true,
      showReset: false,
      showSubmit: false,
      showLoadingIndicator: false,
      cssClasses: {
    input:  'search-box input is-primary'
      }
    }),
    instantsearch.widgets.infiniteHits({
    container: '#hits',
    cssClasses:{
      loadMore: 'button is-primary is-light'
    },
      templates: {
        empty: 'No results',
        item: '<h3 class="is-size-5 is-capitalized"><a href="{{url}}" target="_blank">{{ name }}</a></h3><p class="mb-2">{{ description }}</p><p class="item-details"><strong> Level:</strong> {{ level }} | <strong>Areas: </strong>{{#areas}}"{{.}}" {{/areas}} {{#skin}}|   <strong>Skin:</strong> {{ skin }}{{/skin}}</p><hr>',
  },
      transformItems(items) {
        return items.map(item => ({
      ...item,
      areaSlug: item.areas.map(area => { return area.replace(" ","_")}),
        }));
      }
    }),
    // instantsearch.highlight({
      //   container: '#hits',
      //   attribute: 'description',
      //   highlightedTagName: 'em',
      // }),
      instantsearch.widgets.menu({
        container: '#rev-box',
        attribute: 'classifications',
        operator: 'or',
        limit: 4,
        sortBy: ["count:desc", "name:asc"],
        templates: {
          item: '<button class="button is-outlined is-link">{{ label }}<span class="count"> ({{ count }} critters)</span></button>'
        },
        transformData: function (item) {

          return item;
        }
      }),
      instantsearch.widgets.refinementList({
        container: '#areas',
        attribute: 'areas',
        operator: 'or',
        limit: 10,
        transformData: function (item) {
          return item;
        },
        templates: {
          item: '<button class="button is-outlined is-link">{{label}} <span class="count"> ({{ count }} critters)</span></button>'
        }
      }),
      instantsearch.widgets.rangeSlider({
        container: '#level-refine',
        attribute: 'level',
        min: 1,
        max: 110,
        step: 1,
        pips: true,
        tooltips: true,
        cssClasses: {
          root: 'ais-RangeSlider',
          handle: 'ais-RangeSlider-handle',
          tooltip: 'ais-RangeSlider-tooltip',
          lowerHandle: 'rheostat-handle-lower',
          upperHandle: 'rheostat-handle-upper',
        },
      })
  ]);

  search.start();
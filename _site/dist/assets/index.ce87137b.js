var e=Object.assign;import{i as t,a as s}from"./vendor.2603660c.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(s){const a=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((s,i)=>{const n=new URL(e,a);if(self[t].moduleMap[n])return s(self[t].moduleMap[n]);const o=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){i(new Error(`Failed to import: ${e}`)),r(l)},onload(){s(self[t].moduleMap[n]),r(l)}});document.head.appendChild(l)})),self[t].moduleMap={}}}("/assets/");const a=t({searchClient:s("R7MRY12BR6","e2c3f38bb50bb4323fe3245d6df7e40d"),indexName:"zero-gravitas",searchParameters:{attributesToSnippet:["title:30","skin:10"],facetingAfterDistinct:!0,query:"",snippetEllipsisText:"[&hellip;]"}});a.addWidgets([t.widgets.searchBox({container:"#search-box",placeholder:"Search for Critters",autofocus:!0,showReset:!1,showSubmit:!1,showLoadingIndicator:!1,cssClasses:{input:"search-box input is-primary"}}),t.widgets.infiniteHits({container:"#hits",cssClasses:{loadMore:"button is-primary is-light"},templates:{empty:"No results",item:'<h3 class="is-size-5 is-capitalized"><a href="{{url}}" target="_blank">{{ name }}</a></h3><p class="mb-2">{{ description }}</p><p class="item-details"><strong> Level:</strong> {{ level }} | <strong>Areas: </strong>{{#areas}}"{{.}}" {{/areas}} {{#skin}}|   <strong>Skin:</strong> {{ skin }}{{/skin}}</p><hr>'},transformItems:t=>t.map((t=>e(e({},t),{areaSlug:t.areas.map((e=>e.replace(" ","_")))})))}),t.widgets.menu({container:"#rev-box",attribute:"classifications",operator:"or",limit:4,sortBy:["count:desc","name:asc"],templates:{item:'<button class="button is-outlined is-link">{{ label }}<span class="count"> ({{ count }} critters)</span></button>'},transformData:function(e){return e}}),t.widgets.refinementList({container:"#areas",attribute:"areas",operator:"or",limit:10,transformData:function(e){return e},templates:{item:'<button class="button is-outlined is-link">{{label}} <span class="count"> ({{ count }} critters)</span></button>'}}),t.widgets.rangeSlider({container:"#level-refine",attribute:"level",min:1,max:110,step:1,pips:!0,tooltips:!0,cssClasses:{root:"ais-RangeSlider",handle:"ais-RangeSlider-handle",tooltip:"ais-RangeSlider-tooltip",lowerHandle:"rheostat-handle-lower",upperHandle:"rheostat-handle-upper"}})]),a.start();

---
layout: default
---
<div id="search-box"></div>
<p>Search through creature data from Gemstone IV. Searchable attributes include <em>name, skin, classification, area, and level.</em></p>
<hr class="break">

<section class="section">
  <div class="container">
    <h3 class="is-size-4 filter-header">Level Slider</h3>
    <p class="is-size-7">Constrain search results to a given level range.</p>
    <div id="level-refine"></div>
    <div class="container columns">
      <div class="column is-one-third">
        <h3 class="is-size-4 filter-header">Faceted Search</h3>
        <h3 class="is-size-5 mb-3 control-header" style="display: block;">Classifications:</h3>
        <div id="rev-box"></div>
        <h3 class="is-size-5 mb-3 control-header" style="display: block;">Areas:</h3>
        <div id="areas"></div>
      </div>
      <div class="column">
        <div id="hits">
          <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{% raw %}

{% endraw %}
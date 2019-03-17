//External dependencies
import 'leaflet'
L.esri = require('esri-leaflet');
import 'leaflet.markercluster';
import 'leaflet.markercluster.layersupport';

//App modules
import * as cfg from './config.js';
import * as goog from './goog.js';
import * as sidebar from './sidebar.js';
import * as typeahead from './typeahead.js'
import * as modal from './modal.js';
import * as historic from './historic.js';
import * as culture from './cultural_assets.js';
import * as legend from './legend.js';

//Enable bootstrap tooltips
$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})

///////////////
//Set up map //
///////////////

// Initialize the Map

// Something funky going on with zoom control in

let mymap = L.map('map', {
  zoomControl: true,
  scrollWheelZoom: true,
  doubleClickZoom: true
})

//Add zoom control
// Lower right hand corner. Added zoom control at map initailization instead.
// let zoom = new L.Control.Zoom({
//   position: 'bottomright'
// }).addTo(mymap);

//Initial map view
mymap.setView([42.39, -71.035], 16);

// Add the basemap
const basemap = L.tileLayer(cfg.base_map_URL, {
  maxZoom: 20
}).addTo(mymap);

//Add highlight layer
let highlight = L.geoJson(null);
highlight.addTo(mymap);

///////////////////////////////////
//Historic district functionality//
///////////////////////////////////

//Add historic highlight layer
let historic_highlight = L.geoJson(null, {
  color: '#00FFFF',
  weight: 5
}).addTo(mymap);

//Load the historic district feature layer
let historic_districts = L.esri.featureLayer({
  url: cfg.historic_district_URL
})

//Set up popup for historic districts. (A bit more complex than usual popup because we'd like to display info for all overlapping historic districts.)
historic_districts.on("click", (ev) => {
  let latlng = ev['latlng'];
  L.esri.query({
    url: cfg.historic_district_URL
  }).contains(latlng).run((error, featureCollection, response) => {
    let features = response.features;
    historic.setupPopup(features, latlng, historic_highlight, mymap)
  })
})

//Toggles show/hide in menu
$('#historicDistricts').on('click', () => {
  historic.toggle(historic_districts, '#historicDistricts', 'Show historic districts', 'Hide historic districts', mymap)
})

//////////////////////////////////
//Cultural asset database query //
//////////////////////////////////

// Dictionary for storing all layers.
let layers = {};

//Query all approved cultural assets,
//i.e. where STATUS = 1, then create Layers
//from the resulting geoJSON, by cultural asset cateogry
let query = L.esri.query({
  url: cfg.feature_layer_URL
}).where("STATUS = 1").run(function(error, featureCollection, response) {

  //Loop through all the asset categories,
  //creating a layer for each one.
  for (let cat in cfg.asset_categories) {

    //Icons for non-clustered cultural assets
    let icon = L.icon({
      iconUrl: cfg.iconURL + cfg.asset_categories[cat] + cfg.iconExtension,
      iconSize: [15, 15]
    });

    // Function that defines how the icons
    // representing clusters are created
    let catClusterFunction = culture.clusterFunction(cfg.asset_categories[cat])

    // Create an empty cluster marker group
    let markers = L.markerClusterGroup.layerSupport({
      iconCreateFunction: catClusterFunction,
      disableClusteringAtZoom: cfg.zoomDisableCluster
    });

    // Create a layer, filtering for a single
    // Asset category
    let mylayer = L.geoJSON(response, {
      pointToLayer: function(geojson, latlng) {
        return L.marker(latlng, {
          icon: icon
        });
      },
      onEachFeature: (feature, layer) => modal.create(feature, layer),
      filter: (feature, layer) => culture.filterByCategory(feature, layer, cat)
    })

    //Add the layer to the cluster group
    markers.addLayer(mylayer)

    //Add the cluster group to the map
    mymap.addLayer(markers)

    //Add the layer to the layer dictionary
    layers[cfg.asset_categories[cat]] = markers;

  } // End loop that creates layers

  /***********Layers control***************/

  // Swap out html-safe asset category labels for readable labels
  let asset_categories_inverted = culture.invert_dict(cfg.asset_categories);
  let label_friendly_layers = culture.label_friendly_layers(layers, asset_categories_inverted);
  let layer_widget = L.control.layers(null, label_friendly_layers).addTo(mymap);

  //Adjust colors of layer layer_widget
  let palette_readable = {}
  for (let key in cfg.palette) {
    palette_readable[asset_categories_inverted[key]] = cfg.palette[key]
  }

  for (let key in palette_readable) {
    let selector_string = "div.leaflet-control-layers-overlays span:contains('" + key + "')"
    $(selector_string).closest("div").css("background-color", palette_readable[key]);
  }

  //Parse asset data for search plugin
  const all_assets = []
  for (let feature of response.features) {
    feature.properties.LAYER = feature.layer;
    all_assets.push(feature.properties)
  }

  // Typeahead
  $.typeahead({
    input: '#assetSearch',
    minLength: 1,
    order: "asc",
    display: "NAME",
    source: {
      data: all_assets
    },
    searchOnFocus: true,
    callback: {
      onClick: (node, query, result) => typeahead.search(node, query, result, mymap, cfg.zoomDisableCluster),
      onSubmit: (node, query, result) => typeahead.search(node, query, result, mymap, cfg.zoomDisableCluster)
    },
    debug: true
  });

  //Sidebar

  //Sync sidebar, listening for map move, zoom, or filtering layers
  sidebar.sync(mymap, layers);
  mymap.on('moveend zoomend overlayremove overlayadd', () => sidebar.sync(mymap, layers));

  $(document).on("click", ".feature-row", function(e) {
    $(document).off("mouseout", ".feature-row", clearHighlight);
    sidebar.click(parseInt($(this).attr("id"), 10),
      mymap,
      layers,
      cfg.zoomDisableCluster);
  });

  if (!("ontouchstart" in window)) {
    $(document).on("mouseover", ".feature-row", function(e) {
      highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], cfg.highlightStyle));
    });
  }

  $(document).on("mouseout", ".feature-row", clearHighlight);

  function clearHighlight() {
    highlight.clearLayers();
  }

  ///////////////
  //Map legend //
  ///////////////

  legend.create(cfg.asset_subcategories, cfg.asset_categories);

}) // End query.run()

/////////////////////////////////
//Google Translat layer_widget //
/////////////////////////////////

goog.switchLangLink();
goog.switchGoogleTransCookie();

//////////////////////
//Utility functions //
//////////////////////

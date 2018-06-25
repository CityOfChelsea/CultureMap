//External dependencies include JQuery and Bootstrap

import 'leaflet'
L.esri = require('esri-leaflet');
import 'leaflet.markercluster';
import 'leaflet.markercluster.layersupport';

import {
  base_map_URL,
  feature_layer_URL,
  asset_categories,
  palette,
  category_field,
  iconURL,
  iconExtension,
  zoomDisableCluster
} from './config.js';

import * as util from './util.js';
import * as goog from './goog.js';
import * as sidebar from './sidebar.js';
import * as typeahead from './typeahead.js'

// Initialize the Map
let mymap = L.map('map', {
  zoomControl: false,
  scrollWheelZoom: false
})

//Add zoom control
let zoom = new L.Control.Zoom({
  position: 'bottomright'
}).addTo(mymap);

//Initial map view
mymap.setView([42.39, -71.035], 16);

// Add the basemap
const basemap = L.tileLayer(base_map_URL, {
  maxZoom: 20
}).addTo(mymap);

//Add highlight layer
let highlight = L.geoJson(null);
const highlightStyle = {
  stroke: true,
  color: "#F25C05",
  weight: 5,
  opacity:0.7,
  fillColor: "#F25C05",
  fillOpacity: 0.3,
  radius: 15
};
highlight.addTo(mymap);

// Dictionary for storing all layers.
let layers = {};

//Query all approved cultural assets,
//i.e. where STATUS = 1, then create Layers
//from the resulting geoJSON, by cultural asset cateogry
let query = L.esri.query({
  url: feature_layer_URL
}).where("STATUS = 1").run(function(error, featureCollection, response) {

  // $('#aboutModal').modal('show')

  //Loop through all the asset categories,
  //creating a layer for each one.
  for (let cat in asset_categories) {

    //Icons for non-clustered cultural assets
    let icon = L.icon({
      iconUrl: iconURL + asset_categories[cat] + iconExtension,
      iconSize: [15, 15]
    });

    // Function that defines how the icons
    // representing clusters are created
    let catClusterFunction = util.clusterFunction(asset_categories[cat])

    // Create an empty cluster marker group
    let markers = L.markerClusterGroup.layerSupport({
      iconCreateFunction: catClusterFunction,
      disableClusteringAtZoom: zoomDisableCluster
    });

    // Create a layer, filtering for a single
    // Asset category
    let mylayer = L.geoJSON(response, {
      pointToLayer: function(geojson, latlng) {
        return L.marker(latlng, {
          icon: icon
        });
      },
      onEachFeature: (feature, layer) => {
        feature.layer = layer;
        layer.on('click', () => {
          $("#featureModal .modal-title").html(feature.properties.NAME);

          let modal_content = '';

          if (feature.properties.PIC_URL) {
            modal_content += `<img id="featureModalPic" class="mb-3" src="${feature.properties.PIC_URL}">`
          }
          if (feature.properties.TAB_NAME) {
            modal_content += `<p>Category: <i>${feature.properties.TAB_NAME}</i></p>`
          }
          if (feature.properties.DESC1) {
            modal_content += feature.properties.DESC1
          }

          $("#featureModal .modal-body").html(modal_content);
          $("#featureModal .learn-more").attr("href", feature.properties.WEBSITE);
          $("#featureModal").modal("show");
        })
      },
      filter: function(feature, layer) {
        if (feature.properties.TAB_NAME == cat) {
          return true;
        } else {
          return false;
        }
      }
    })

    //Add the layer to the cluster group
    markers.addLayer(mylayer)

    //Add the cluster group to the map
    mymap.addLayer(markers)

    //Add the layer to the layer dictionary
    layers[asset_categories[cat]] = markers;

  } // End loop that creates layers


  /***********Layers control***************/

  // Swap out html-safe asset category labels for readable labels
  let asset_categories_inverted = util.invert_dict(asset_categories);
  let label_friendly_layers = util.label_friendly_layers(layers, asset_categories_inverted);
  let layer_widget = L.control.layers(null, label_friendly_layers).addTo(mymap);

  //Adjust colors of layer layer_widget
  let palette_readable = {}
  for (let key in palette) {
    palette_readable[asset_categories_inverted[key]] = palette[key]
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
      onClick: (node, query, result) => typeahead.search(node, query, result, mymap, zoomDisableCluster),
      onSubmit: (node, query, result) => typeahead.search(node, query, result, mymap, zoomDisableCluster)
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
      zoomDisableCluster);
  });

  if ( !("ontouchstart" in window) ) {
    $(document).on("mouseover", ".feature-row", function(e) {
      highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
      console.log(highlight)
    });
  }

  $(document).on("mouseout", ".feature-row", clearHighlight);

  function clearHighlight() {
    highlight.clearLayers();
  }

}) // End query.run()

// Google Translat layer_widget

goog.switchLangLink();
goog.switchGoogleTransCookie();

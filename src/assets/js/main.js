//External dependencies
import 'leaflet'
L.esri = require('esri-leaflet');
import 'leaflet.markercluster';
import 'leaflet.markercluster.layersupport';

//App modules
import * as cfg from './config.js';
import * as util from './util.js';
import * as goog from './goog.js';
import * as sidebar from './sidebar.js';
import * as typeahead from './typeahead.js'
import * as modal from './modal.js';
import * as historic from './historic.js'

//Enable bootstrap tooltips
$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})

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
const basemap = L.tileLayer(cfg.base_map_URL, {
  maxZoom: 20
}).addTo(mymap);

//Add highlight layer
let highlight = L.geoJson(null);
highlight.addTo(mymap);

//HISTORIC
let historic_highlight = L.geoJson(null, {
  color: '#00FFFF',
  weight: 5
}).addTo(mymap);

const historic_popup = L.popup();

//Load the historic district feature layer
let historic_districts = L.esri.featureLayer({
  url: cfg.historic_district_URL
})

historic_districts.on("click", (ev) => {
  let latlng = ev['latlng'];
  L.esri.query({
    url: cfg.historic_district_URL
  }).contains(latlng).run((error, featureCollection, response) => {

    let features = response.features;
    const content = historic.formatPopup(features);

    historic_popup.setLatLng(latlng);
    historic_popup.setContent(content);
    historic_popup.openOn(mymap);

    historic_highlight.addData(features);
    mymap.once('click popupclose', () => {
      console.log('closed!');
    });
  })
})

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
    let catClusterFunction = util.clusterFunction(cfg.asset_categories[cat])

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
      onEachFeature: (feature, layer) => {
        feature.layer = layer;
        layer.on('click', () => {
          $("#featureModal .modal-title").html(feature.properties.NAME);

          let modal_content = modal.format(feature);

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
    layers[cfg.asset_categories[cat]] = markers;

  } // End loop that creates layers


  /***********Layers control***************/

  // Swap out html-safe asset category labels for readable labels
  let asset_categories_inverted = util.invert_dict(cfg.asset_categories);
  let label_friendly_layers = util.label_friendly_layers(layers, asset_categories_inverted);
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
      console.log(highlight)
    });
  }

  $(document).on("mouseout", ".feature-row", clearHighlight);

  function clearHighlight() {
    highlight.clearLayers();
  }

  //Map legend;

  for (let category in cfg.asset_subcategories) {

    //Get version of category label wo/spaces
    let category_safe = cfg.asset_categories[category];
    let iconPath = `./assets/icon/1x/${category_safe}.png`;
    let iconWidth = '80%'
    let categoryString = `<div class="row"><div class="col-1 px-0 ml-2"><img src=${iconPath} width=${iconWidth}></div><div class="col-9 px-1"><h5>${category}</h5></div></div>`
    let subcategoryString = `<div class="row subcategory-row"><div class="col-1 px-0 ml-2"></div><div class="col-9 px-1 subcategory-column"><p class="subcategory-p"></p></div></div>`

    $('#legendTable').append(categoryString + subcategoryString)

    for (let subcategory of cfg.asset_subcategories[category]) {
      if (cfg.asset_subcategories[category].indexOf(subcategory) == 0) {
        $('.subcategory-p').last().append(`${subcategory}, `)
      } else if (cfg.asset_subcategories[category].indexOf(subcategory) < cfg.asset_subcategories[category].length - 1) {
        $('.subcategory-p').last().append(`${subcategory}, `.toLowerCase())
      } else {
        $('.subcategory-p').last().append(`${subcategory}`.toLowerCase());
      }

    }
  }

}) // End query.run()

// Google Translat layer_widget

goog.switchLangLink();
goog.switchGoogleTransCookie();

//Other controls

$('#historicDistricts').on('click', () => {
  historic.toggle(historic_districts, '#historicDistricts', 'Show historic districts', 'Hide historic districts', mymap)
})

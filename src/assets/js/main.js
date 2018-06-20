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

//Show about section on launch
// $('#aboutModal').modal('show')

// Initialize the Map
let mymap = L.map('map', {
  zoomControl: false,
  scrollWheelZoom: false
})

//Add zoom control
let zoom = new L.Control.Zoom({
  position: 'bottomright'
}).addTo(mymap);

mymap.setView([42.39, -71.035], 16);

// Add the basemap
const basemap = L.tileLayer(base_map_URL, {
  maxZoom: 20
}).addTo(mymap);

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
    // mylayer.bindPopup(popup)
    markers.addLayer(mylayer)
    // markers.bindPopup(popup)

    //Add the cluster group to the map
    // mymap.addLayer(markers)
    mymap.addLayer(markers)

    //Add the layer to the layer dictionary
    layers[asset_categories[cat]] = markers;


  } // End loop that creates layers


  /***********Layers control***************/

  // // Swap out html-safe asset category labels for readable labels
  // let asset_categories_inverted = util.invert_dict(asset_categories);
  // let label_friendly_layers = util.label_friendly_layers(layers, asset_categories_inverted);
  // let layer_widget = L.control.layers(null, label_friendly_layers).addTo(mymap);
  //
  // //Adjust colors of layer layer_widget
  // let palette_readable = {}
  // for (let key in palette) {
  //   palette_readable[asset_categories_inverted[key]] = palette[key]
  // }
  //
  // for (let key in palette_readable) {
  //   let selector_string = "div.leaflet-control-layers-overlays span:contains('" + key + "')"
  //   $(selector_string).closest("div").css("background-color", palette_readable[key]);
  // }
  //
  // //Change control icon
  //
  // $(".leaflet-control-layers-toggle").html("<h3>Cultural Asset Categories</h3>")

  // /***********Google Translate Control***************/
  //
  // ctl.translator({
  //   position: 'bottomleft'
  // }).addTo(mymap);


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
      onClick: function(node, query, result) {
        let layer = result.LAYER
        let latlng = layer._latlng
        mymap.setView(latlng, zoomDisableCluster, {
          animate: true,
          duration: 1
        });

        let highlight = L.circle(latlng, {
          radius: 10,
          weight: 5,
          color: '#ffc107',
          fill: false
        }).addTo(mymap);


        window.setTimeout(() => {
          layer.fire("click")
        }, 1000);


        $('#featureModal').on('hidden.bs.modal', () => {
          if (highlight) {
            highlight.remove()
          }
        })
      }
    },
    debug: true

  });



}) // End query.run()



// RESTYLE THE DROPDOWN MENU
$('#google_translate_element').on("click", function() {

  // Change font family and color
  $("iframe").contents().find(".goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div, .goog-te-menu2 *")
    .css({
      'color': 'black',
      'font-family': 'Arvo',
      'width': '100%'
    });
  // Change menu's padding
  $("iframe").contents().find('.goog-te-menu2-item-selected').css('display', 'none');

  // Change menu's padding
  // $("iframe").contents().find('.goog-te-menu2').css('padding', '0px');

  // Change the padding of the languages
  // $("iframe").contents().find('.goog-te-menu2-item div').css('padding', '20px');

  // Change the width of the languages
  // $("iframe").contents().find('.goog-te-menu2-item').css('width', '100%');
  // $("iframe").contents().find('td').css('width', '100%');

  // Change hover effects
  $("iframe").contents().find(".goog-te-menu2-item div").hover(function() {
    $(this).css('background-color', '#4385F5').find('span.text').css('color', 'white');
  }, function() {
    $(this).css('background-color', 'white').find('span.text').css('color', '#544F4B');
  });

  // Change Google's default blue border
  $("iframe").contents().find('.goog-te-menu2').css('border', 'none');

  // Change the iframe's box shadow
  $(".goog-te-menu-frame").css('box-shadow', '0 0px 0px 0px rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0.0)');



  // Change the iframe's size and position?
  $(".goog-te-menu-frame").css({
    'height': '100%',
    'width': '100%'
  });
  // Change iframes's size
  $("iframe").contents().find('.goog-te-menu2').css({
    'height': '100%',
    'width': '100%'
  });
});

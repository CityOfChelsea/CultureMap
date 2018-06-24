/**
 * Gets layers currently displayed on map
 * @param  {L.map} map
 * @param  {dictionary} layerGroups A dictionary of L.markerClusterGroup values
 * @return {array}             Array of displayed layers
 */
export function sync(mymap, layerGroups) {

  let currentlyDisplayed = [];

  $("#currently-displayed").empty();

  for (let group in layerGroups) {
    if (mymap.hasLayer(layerGroups[group])) {
      let layers = layerGroups[group]._layers
      for (let _layer in layers) {
        let layer = layers[_layer];
        if (mymap.getBounds().contains(layer.getLatLng())) {
          $('#currently-displayed').append(`<a id=${L.stamp(layer)} class="feature-row list-group-item bg-light px-0" lat="${layer.getLatLng().lat}" lng="${layer.getLatLng().lng}">${layer.feature.properties.NAME}</a>`)
          // $('#currently-displayed tbody').append(`<tr id=${L.stamp(layer)} class="feature-row" lat="${layer.getLatLng().lat}" lng="${layer.getLatLng().lng}"><td>${layer.feature.properties.NAME}</td></tr`)
        }
      }
    }
  }
}

export function click(id, mymap, layerGroups, zoom){
  for (let group in layerGroups) {
    if (mymap.hasLayer(layerGroups[group])) {
      let layers = layerGroups[group]._layers
      if (id in layers){
        let layer = layers[id];
        let latlng = layer.getLatLng()

        mymap.once("moveend", () => {
          layer.fire("click");
        })
        mymap.flyTo(latlng, zoom);

        break;
      }
    }
  }
}

export function hover(){

}

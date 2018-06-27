export function clearOnClick(layer){
  console.log(layer);
  if (!$.isEmptyObject(layer)) {
    layer.clearLayers()
  }
}

export function formatPopup(features){
  let content;
  if (features.length > 1) {
    content = `<h5>Historic districts:</h5>`
    for (let feature of features) {
      let num = features.indexOf(feature) + 1;
      content += `<p>(${num}) ${feature.properties['HISTORIC_N']}</p>`;
    }
  } else {
    let feature = features[0]
    content = `<h5>Historic district:</h5><p>${feature.properties['HISTORIC_N']}</p>`;
  }
  return content;
}

export function toggle(layer, id, msg1, msg2, mymap) {
  if (mymap.hasLayer(layer)) {
    $(id).html(msg1)
    mymap.removeLayer(layer)
  } else {
    mymap.addLayer(layer)
    $(id).html(msg2)
  }
}

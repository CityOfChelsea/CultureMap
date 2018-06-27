export function clearOnClick(layer){
  console.log(layer);
  if (!$.isEmptyObject(layer)) {
    layer.clearLayers()
  }
}

export function formatPopup(features) {
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
}

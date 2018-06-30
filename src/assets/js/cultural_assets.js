/**
 * Closure for assigning classes to icons according
 * to asset category
 * @param  {string} category [description]
 * @return {function}          [description]
 */
export function clusterFunction(category) {
  return function(cluster) {
    // get the number of items in the cluster
    var count = cluster.getChildCount();

    // figure out how many digits long the number is
    var digits = (count + '').length;

    // return a new L.DivIcon with our classes so we can
    // style them with CSS. Take a look at the CSS in
    // the <head> to see these styles. You have to set
    // iconSize to null if you want to use CSS to set the
    // width and height.
    return new L.divIcon({
      html: count,
      className: 'cluster digits-' + digits + "-" + category,
      iconSize: null
    });
  }
};

/**
 * Exchanges dictionary keys for values
 * @param  {dictionary} dict input dicitonary
 * @return {dictionary}      reversed dicitonary
 */
export function invert_dict(dict){
  let asset_categories_reversed = {};
  for (let key in dict) {
    asset_categories_reversed[dict[key]] = key
  }
  return asset_categories_reversed;
}

/**
 * Convert keys in an dictionary of Leaflet layers
 * from HTML-safe strings to readable strings
 * @param  {[type]} layers   Dictionary of layers with HTML-safe keys
 * @param  {[type]} inverted Dictionary that maps HTML-safe to readable keys
 * @return {[type]}          Dictionary of layers with readable keys
 */
export function label_friendly_layers(layers, inverted){
  let label_friendly_layers = {};
  for (let key in layers) {
    label_friendly_layers[inverted[key]] = layers[key]
  };
  return label_friendly_layers;
}

export function filterByCategory(feature, layer, cat){
  if (feature.properties.TAB_NAME == cat) {
    return true;
  } else {
    return false;
  }
}

export const base_map_URL = 'https://api.mapbox.com/styles/v1/tohorner/cjhijn5ba1zon2rpelkgflt7y/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9ob3JuZXIiLCJhIjoiY2l6NGFoeXIxMDRscDMycGd2dzVzZTg3NyJ9.Vfe_mGvZ-mHldkO0x2gXEw';
export const feature_layer_URL = 'https://services3.arcgis.com/U4SbXhYNLOfN36SP/arcgis/rest/services/View_for_Shortlist/FeatureServer/0/';
export const historic_district_URL = 'https://services3.arcgis.com/U4SbXhYNLOfN36SP/arcgis/rest/services/Chelsea_Historic_Districts/FeatureServer/0'
export const votes_url = 'https://services3.arcgis.com/U4SbXhYNLOfN36SP/arcgis/rest/services/votes/FeatureServer/0';
/**
 * Dictionary that maps label-friendly asset Categories
 * to HTML and CSS-friendly asset-categories
 * @type {Object}
 */
export const asset_categories = {
  'Architecture': 'architecture',
  'Landmark or monument': 'landmark',
  'Public art': 'public-art',
  'Creative industry': 'creative-industry',
  'Park or open space': 'park',
  'Cultural facility': 'cultural-facility',
  'Food': 'food',
  'Programming or event': 'programming'
};

export const palette = {
  "architecture": "#2a3e50", // Dark blue
  "landmark": "#8C2A23", // Sienna
  "public-art": "#fc4349", // Pink
  "creative-industry": "#6dbcdb", // Sky blue
  "food": "#2E6E24", // olive
  "cultural-facility": "#ffb733", // Gold
  "park": "#1a9481", // Teal
  "programming": "#62358C" // Purple
};
export const category_field = 'TAB_NAME';

/**
 * Relative path where icon png's reside.
 * @type {String}
 */
export const iconURL = './assets/icon/0.5x/';
export const iconExtension = '@0.5x.png';
export const zoomDisableCluster = 18;

export const asset_subcategories = {
  'Architecture': ['Historic buildings', 'Significant restorations', 'Contemporary buildings', 'Notable design details'],
  'Landmark or monument': ['Heritage sites', 'Landmarks', 'Monuments', 'Cemeteries'],
  'Public art': ['Murals', 'Street art', 'Sculptures', 'Art installations'],
  'Creative industry': ['Creative studios', 'Practice spaces', 'Creative businesses', 'Coworking facilities', 'Art supplies', 'Artist live/work space'],
  'Park or open space': ['Parks', 'Playgrounds', 'Natural spaces', 'Scenic areas', 'Community gardens'],
  'Cultural facility': ['Performance spaces', 'Exhibitions spaces', 'Places of worship', 'Social clubs'],
  'Food': ['Restaurants', 'Bars/breweries', 'Commercial kitchens', 'Urban agriculture'],
  'Programming or event': ['Schools', 'Libraries', 'Educational programming', 'Festivals', 'Meeting halls', 'Other notable events']
}

export const highlightStyle = {
  stroke: true,
  color: "#F25C05",
  weight: 5,
  opacity: 0.7,
  fillColor: "#F25C05",
  fillOpacity: 0.3,
  radius: 15
};

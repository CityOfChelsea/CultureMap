export const base_map_URL = 'https://api.mapbox.com/styles/v1/tohorner/cjhijn5ba1zon2rpelkgflt7y/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9ob3JuZXIiLCJhIjoiY2l6NGFoeXIxMDRscDMycGd2dzVzZTg3NyJ9.Vfe_mGvZ-mHldkO0x2gXEw';
export const feature_layer_URL = 'https://services3.arcgis.com/U4SbXhYNLOfN36SP/arcgis/rest/services/View_for_Shortlist/FeatureServer/0';
export const historic_district_URL = 'https://services3.arcgis.com/U4SbXhYNLOfN36SP/arcgis/rest/services/Chelsea_Historic_Districts/FeatureServer/0?token=QLFcN1YZl1op1kOEn03zsqHQ8Qnf4Rj5swhGE8f0kIMDzuXsg5bnRSpxV5fWKE7EnXzGMV8j4YtuEFbkRh3Lqcz6T7hE9NNImIjNF90Qwo3NCG8tuOMtDB0qe3q8uQpKr0MAb4-1ApD23mPJeh6xMlcAWBMAzdyn3ep-LlgE5DoOsTWcOLF67y8TTUZ9P5gUFOFO8N1-E3EM4AvHt7zYCQM0CQTlhw7U-4k8tftaPXSXbiq3Ytb_3BkEY4OG_7Gv'

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

export const addSubcategories = function(subcategory, index, subcategories) {
  if (subcategories.indexOf(subcategory) == 0) {
    $('.subcategory-p').last().append(`${subcategory}, `)
  } else if (subcategories.indexOf(subcategory) < subcategories.length - 1) {
    $('.subcategory-p').last().append(`${subcategory}, `.toLowerCase())
  } else {
    $('.subcategory-p').last().append(`${subcategory}`.toLowerCase());
  }
}

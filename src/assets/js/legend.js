export const addSubcategories = function(subcategory, index, subcategories) {
  if (subcategories.indexOf(subcategory) == 0) {
    $('.subcategory-p').last().append(`${subcategory}, `)
  } else if (subcategories.indexOf(subcategory) < subcategories.length - 1) {
    $('.subcategory-p').last().append(`${subcategory}, `.toLowerCase())
  } else {
    $('.subcategory-p').last().append(`${subcategory}`.toLowerCase());
  }
}

export function create(category_data, category_map) {
  for (let category in category_data) {

    //Get version of category label wo/spaces
    let category_safe = category_map[category];
    let iconPath = `./assets/icon/1x/${category_safe}.png`;
    let iconWidth = '80%'
    let categoryString = `<div class="row"><div class="col-1 px-0 ml-2"><img src=${iconPath} width=${iconWidth}></div><div class="col-9 px-1"><h5>${category}</h5></div></div>`
    let subcategoryString = `<div class="row subcategory-row"><div class="col-1 px-0 ml-2"></div><div class="col-9 px-1 subcategory-column"><p class="subcategory-p"></p></div></div>`

    $('#legendTable').append(categoryString + subcategoryString)

    const subcategories = category_data[category];

    subcategories.forEach((subcategory, index, subcategories) =>
      addSubcategories(subcategory, index, subcategories));
  }
}

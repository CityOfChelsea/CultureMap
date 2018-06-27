export function format(feature){
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
  return modal_content
}

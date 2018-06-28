import {
  feature_layer_URL
} from './config.js';
import 'leaflet'
L.esri = require('esri-leaflet');

export function format(feature) {
  $("#featureModal .modal-title").html(feature.properties.NAME);
  console.log(feature);

  let modal_content = '';
  let attachedPhotoInfo = getAttachedPhotoInfo(911);
  console.log(attachedPhotoInfo)
  // const photoUrls = attachmentUrls(attachedPhotoInfo)

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

function getAttachedPhotoInfo(id) {
  const request_url = `${feature_layer_URL}/${id}/attachments/`;
  let res;
  L.esri.get(request_url, {}, function(error, response) {
    if (error) {
      return error
    } else {
      if ((response.attachmentInfos !== null) && (response.attachmentInfos.length > 0)) {
        res = response;
        console.log(response)
        return res;
      }
    }
  });
};

function attachmentUrls(attachmentInfos) {
  const urls = attachmentInfos.map(att => `${feature_layer_URL}/attachments/${att.id}`)
  return urls
}

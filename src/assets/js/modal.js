import {
  feature_layer_URL
} from './config.js';
import 'leaflet'
L.esri = require('esri-leaflet');

export function formatContent(feature) {
  let modal_content = '';

  if (feature.properties.TAB_NAME) {
    modal_content += `<p>Category: <i>${feature.properties.TAB_NAME}</i></p>`
  }
  if (feature.properties.DESC1) {
    modal_content += feature.properties.DESC1
  }
  return modal_content
}

export function formatPics(feature, pic_urls) {

  let carousel_content = `<div class="carousel-inner">`;
  if (pic_urls.length > 1) {
    pic_urls.forEach((pic_url, i) => {
      if (i == 0) {
        carousel_content += `<div class="carousel-item active"><img class="d-block w-100" src="${pic_url}" alt=""></div>`
      } else {
        carousel_content += `<div class="carousel-item"><img class="d-block w-100" src="${pic_url}" alt=""></div>`
      }
    })
    carousel_content += `</div>` // close of carousel inner
    carousel_content += `  <a class="carousel-control-prev" href="#featureCarousel" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#featureCarousel" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>`
  } else if (pic_urls.length == 1) {
    carousel_content += `<img id="featureModalPic" class="mb-3" src="${pic_urls[0]}"></div>`
  } else {
    if (feature.properties.PIC_URL) {
      carousel_content += `<img id="featureModalPic" class="mb-3" src="${feature.properties.PIC_URL}"></div>`
    }
  }
  return carousel_content;
}

/**
 * Given a feature service url and a feature's Object ID
 * will return a Promise that resolves to an array of all
 * attached pics, or an empty array if no pics are attached.
 * @param  {string} service_url [description]
 * @param  {string} objectId    [description]
 * @return {Promise}             [description]
 */
export function fetchAttachPicUrls(service_url, objectId) {
  const request_url = `${service_url}/${objectId}/attachments`;
  return new Promise((resolve, reject) => {
    L.esri.get(request_url, {}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        const urls = response.attachmentInfos.map(el => `${request_url}/${el.id}`)
        resolve(urls);
      }
    })
  })
}


export function castVote(featureService, feature) {

  const url = featureService.options.url
  console.log(featureService);
  featureService.query()
    .where(`ASSET_ID = '${feature.id}'`)
    .run((error, featureCollection) => {
      if (error) {
        console.log(error)
      } else {

        const params = {
          "features": {
            "geometry": null,
            "attributes": {
              "ASSET_ID": feature.id,
              "NAME": feature.properties.NAME,
            }
          }
        }

        L.esri.post(`${url}/addFeatures`, params, function(error, response) {
          if (error) {
            console.log(error);
          } else {
            console.log(response);
          }
        });
      }
    });
}

export function addTitle(title) {
  $("#featureModal .modal-title").html(title);
}

export function addWebsite(website) {
  $("#featureModal .learn-more").attr("href", website);
}

export function addContent(content) {
  $("#featureModal #modalBodyContent").html(content)
}

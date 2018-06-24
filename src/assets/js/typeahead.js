export function search(node, query, result, mymap, zoomDisableCluster) {
    console.log('query', query);
    let layer = result.LAYER
    let latlng = layer._latlng
    mymap.flyTo(latlng, zoomDisableCluster, {
      animate: true,
      duration: 1
    });

    let highlight = L.circle(latlng, {
      radius: 10,
      weight: 5,
      color: '#ffc107',
      fill: false
    }).addTo(mymap);


    mymap.once("moveend", () => {
      window.setTimeout(() => {
        layer.fire("click")
      }, 450);
    });

    $('#featureModal').on('hidden.bs.modal', () => {
      if (highlight) {
        highlight.remove()
      }
    })

}

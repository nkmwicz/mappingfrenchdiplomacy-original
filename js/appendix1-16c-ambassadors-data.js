/* eslint-disable require-jsdoc */
const months = ['Jan.', 'Feb.', 'Mar.',
  'Apr.', 'May', 'Jun.', 'Jul.',
  'Aug.', 'Sept.', 'Oct.',
  'Nov.', 'Dec.',
];
const table16cAmb = document.querySelector('#table-16c-amb tbody');

fetch('data/16c-diplomats_data.geojson', {
  method: 'GET',
}).then((Response) => Response.json()).then((json) => {
  const data = json.features;
  class TableOfLetters {
    addLayerToList(layerInfo) {
      const tr = table16cAmb.insertRow(-1);
      tr.innerHTML = `
          <td class = "text-center table-layer-button" id="${layerInfo.id}">
          ${layerInfo.id}</td>
          <td>${layerInfo.name}</td>
          <td>${layerInfo.place}</td>
          <td>${layerInfo.lat}</td>
          <td>${layerInfo.long}</td>
          <td>${layerInfo.year}</td>
          <td>${layerInfo.duration}</td>
          <td>${layerInfo.ambInfo}</td>
          <td>${layerInfo.source}</td>
          <td>${layerInfo.link}</td>
          `;
    };
  }


  class AmbInfo16c {
    constructor(
        id,
        name,
        place,
        lat,
        long,
        year,
        duration,
        ambInfo,
        source,
        link) {
      this.id = id;
      this.name = name;
      this.place = place;
      this.lat = lat;
      this.long = long;
      this.year = year;
      this.duration = duration;
      this.ambInfo = ambInfo;
      this.source = source;
      this.link = link;
    }
  }

  data.forEach(function(layer) {
    console.log(layer);
    const ambID = layer.properties.objectID.toString();
    const ambName = layer.properties.name;
    const ambPlace = layer.properties.place;
    const ambLat = layer.geometry.coordinates[1];
    const ambLong = layer.geometry.coordinates[0];
    const ambYear = layer.properties.year;
    const ambduration = layer.properties.duration;
    const ambInfo = layer.properties.ambInfo;
    const ambSource = layer.properties.source;
    const ambLink = layer.properties.link;

    const layerInfo = new AmbInfo16c(
        ambID,
        ambName,
        ambPlace,
        ambLat,
        ambLong,
        ambYear,
        ambduration,
        ambInfo,
        ambSource,
        ambLink,
    );
    const tableOfLetters = new TableOfLetters();
    tableOfLetters.addLayerToList(layerInfo);
  });
});

function formatDate(date) {
  // eslint-disable-next-line max-len
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

$('[data-toggle="popover"]').popover({
  trigger: 'hover',
});
$('[data-toggle="tooltip"]').tooltip();
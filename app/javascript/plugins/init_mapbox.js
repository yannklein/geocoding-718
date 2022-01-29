import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lon, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  // Map creation
  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yannlucklein/ckyz5uxs4003714nxlym96afq/draft'
    });

    // Add search bar
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }));

    // Marker creation
    const markers = JSON.parse(mapElement.dataset.markers);
    console.log(markers)
    markers.forEach((marker) => {

      //Retrieve the info window data and add it to our marker
      const popup = new mapboxgl.Popup().setHTML(marker.info_window);

      // Create a HTML element for your custom marker
      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '80px';
      element.style.height = '80px';
      element.style.borderRadius = '50%';

      new mapboxgl.Marker(element)
        .setLngLat([ marker.lon, marker.lat ])
        .setPopup(popup)
        .addTo(map);
    });

    // Zoom on the markers
    fitMapToMarkers(map, markers);
  }

};

export { initMapbox };
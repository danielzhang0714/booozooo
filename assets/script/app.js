'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: [0,0],
  zoom: 10,
  pitch: 40
})

const marker = new mapboxgl.Marker({color:'#37a843ff'})

function getLocation(position) {
  let {latitude, longitude} = position.coords;
  console.log(`${longitude}, ${latitude}`);
  map.setCenter([longitude, latitude]);
  marker.setLngLat([longitude, latitude]).addTo(map)
}

function errorHandler(error) {
  console.log(error.message);
}

const options = {
  enableHighAccuracy: true
}

function disabledOptions() {
  map.scrollZoom.disable();
  map.doubleClickZoom.disable();
  map.dragPan.disable();
}

function displayPosition() {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    disabledOptions();
  } else {
    console.log('Geolocation is not supported by the browser');
  }
}

const trackbtn = document.getElementById('trackbtn');
const mapdisplay = document.querySelector('.map');
const control = document.querySelector('.control');

trackbtn.addEventListener('click', () => {
  mapdisplay.classList.add('visible');
  control.classList.remove('control');
  trackbtn.innerText = 'Are you Scared?';
  displayPosition();
});

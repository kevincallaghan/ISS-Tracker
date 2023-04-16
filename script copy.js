const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


//! Documentation for Leaflet map https://leafletjs.com/examples/quick-start/
//! Using OpenStreetMap with required attribution link for map
//! Source code for marker variable and icon customization came from Leaflet documentation

const issMap = L.map('issMapGoesHere').setView([0, 0], 1);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright"OpenStreetMap</a>'
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(issMap)

let myIcon = L.icon({
  iconUrl: 'images/TieFighter.png',
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});


//! Inspiration from The Coding Train YouTube channel's video series called, "Working with Data and APIs Module 1"
//! Using api from open-notify.org
//! Source code for marker variable came from Leaflet documentation
const iss_url = 'http://api.open-notify.org/iss-now.json'
const marker = L.marker([0, 0], { icon: myIcon }).addTo(issMap);

async function getISS() {
  const response = await fetch(iss_url);
  const data = await response.json();
  // console.log(data);
  console.log("Latitude: " + data.iss_position.latitude);
  console.log("Longitude: " + data.iss_position.longitude);

  let issLatitude = data.iss_position.latitude;
  let issLongitude = data.iss_position.longitude;

  document.getElementById('lat').textContent = issLatitude;
  document.getElementById('lon').textContent = issLongitude;

  //! Source to fix bug: https://stackoverflow.com/questions/41247646/leaflet-error-when-moving-marker-setlatlng-is-not-a-function 
  marker.setLatLng([issLatitude, issLongitude]);

}
getISS();
setInterval(getISS, 3000);


//! Source code for this request was provided by open-notify before I made modifications.  The source code can be found here: http://www.open-notify.org/Open-Notify-API/

$.getJSON('http://api.open-notify.org/astros.json?callback=?', function (data) {
  var spaceNumber = data['number'];
  $('#spacepeeps').html(spaceNumber);

  data['people'].forEach(function (d) {
    if (d['craft'] === 'ISS') {
      $('#issPeople ul').append('<li>' + d['name'] + ' - ' + d['craft'] + '</li>');
    } else {
      $('#otherSpacePeople ul').append('<li>' + d['name'] + ' - ' + d['craft'] + '</li>');
    }
  });

  if ($('#otherSpacePeople ul li').length === 0) {
    $('#otherSpacePeople').text('Currently, there are no other astronauts in space.');
  }
});

//! Source for favicon https://spemer.com/articles/set-favicon-with-javascript.html 

function setFavicons(favImg) {
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel', 'shortcut icon');
  setFavicon.setAttribute('href', favImg);
  headTitle.appendChild(setFavicon);
}
setFavicons('images/favicon.ico');


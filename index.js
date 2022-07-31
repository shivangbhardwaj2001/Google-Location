let daata;
var lat ;
var lon ;
var lat2;
var lon2;
var temp1=0;
var temp2=999999;
var city;
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }






}
// =========================================================================data.features[0].geometry.coordinates[0],data.features[1].properties.name
function showPosition(position) {
    lat=position.coords.latitude;
    lon=position.coords.longitude;
//   x.innerHTML = "Latitude: " + position.coords.latitude + 
//   "<br>Longitude: " + position.coords.longitude;
console.log("dsdsdsdsdsdsd");

fetch("./stores.json")
.then(response => {
   return response.json();
})
.then(data => daata=  Object.assign({}, data) );

console.log(daata+daata.features[0].geometry.coordinates[1]);
for(let i=0;i<5;i++){
   lat2= daata.features[i].geometry.coordinates[0];
   lon2=daata.features[i].geometry.coordinates[1];
   temp1=getDistanceFromLatLonInKm(lat, lon, lat2, lon2);
   if(temp1<temp2){
       temp2=temp1;
       city=daata.features[i].properties.name;
}

}
window.alert("the nearest store from your location is :"+city+"  which is "+Math.round(temp2)+"  km away.")

}



 function initMap() {
    // Create the map.
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: { lat: 23.974207, lng: 77.576072 },
    });
  
    // Load the stores GeoJSON onto the map.
    map.data.loadGeoJson('stores.json', {idPropertyName: 'storeid'});
  
    const apiKey = 'AIzaSyDg_DtrPaTpbNva13bpQjJ5vRZ-tnjL-ik';
    const infoWindow = new google.maps.InfoWindow();
  
    // Show the information for a store when its marker is clicked.
    map.data.addListener('click', (event) => {
      const category = event.feature.getProperty('category');
      const name = event.feature.getProperty('name');
      const description = event.feature.getProperty('description');
      const hours = event.feature.getProperty('hours');
      const phone = event.feature.getProperty('phone');
      const position = event.feature.getGeometry().get();
      const content = `
        <h2>${name}</h2><p>${description}</p>
        <p><b>Open:</b> ${hours}<br/><b>Phone:</b> ${phone}</p>
      `;
  
      position.forEachLatLng(latLng => {
        const lat = latLng.lat();
        const lng = latLng.lng();
    
        console.log(lat, lng);
        console.log("dsdsdsdsdsdsd");
    });

    console.log("dsdsdsdsdsdsd");

      infoWindow.setContent(content);
      infoWindow.setPosition(position);
      infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
      infoWindow.open(map);
    //   for(dex in position){
    //        d1=getDistanceFromLatLonInKm(lat,lon,position.,lon2);

    //   }
 



      
    });
  }


  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  
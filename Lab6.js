function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}


function getLocality(lat, lng, elementID) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then((res) => res.json())
        .then((resJson) => {
            console.log("Response JSON:", resJson);
            document.getElementById(elementID).innerText += `Latitude ${lat}, Longitude: ${lng}
            
            Locality: ${resJson.locality}`
        })
}

window.onload = function () {
    var map = L.map('map').setView([32.5, -95], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);



const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3), elementID: 'marker1' },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) , elementID: 'marker2'},
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) , elementID: 'marker3'},
];

coordinates.forEach(coord => {
    L.marker([coord.lat, coord.lng]).addTo(map);

    getLocality(coord.lat, coord.lng, coord.elementID);
});

const bounds = L.latLngBounds(coordinates.map(coord => [coord.lat, coord.lng]));
map.fitBounds(bounds);

};

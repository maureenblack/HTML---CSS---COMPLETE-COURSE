// Map initialization and controls
let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });

    // Add click listener to map
    map.addListener('click', function(event) {
        placeMarker(event.latLng);
    });
}

function placeMarker(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

function addMarker() {
    // Enable click-to-add mode
    map.setOptions({ draggableCursor: 'crosshair' });
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

function saveMap() {
    // Save current map state
    const mapData = markers.map(marker => ({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    }));
    localStorage.setItem('mapData', JSON.stringify(mapData));
}

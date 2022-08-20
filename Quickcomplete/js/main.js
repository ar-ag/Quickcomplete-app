const search = document.getElementById('search');
const matchList = document.getElementById('match-list');



// function to search states and filter it

const searchStates = async searchText => {

    const res = await fetch('s.json');
    const states = await res.json();
    // console.log(states);
    
    let matches = states.filter((state) => {
        // const stateName = state.name;
        // if(stateName.includes(searchText)) {
        //     return stateName;
        // }
        const regex = new RegExp(`^${searchText}`,'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });
    if(searchText.length == 0) {
        matches = [];
        document.getElementById('map').style.display='none';
    }
    // fetch('s.json')
    // .then((res) => res.json())
    // .then((states) => console.log(states));
    outputHTML(matches);
    // console.log(matches);
    
};

const outputHTML = (matches) => {
    if(matches.length > 0) {
        const html = matches.map((match) => 
            `
            <a href="#map" class = "card card-body mb-1" id="myCard">
                <h4>${match.name}(${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                <small>Lat:<span id="lat">${match.lat}</span> / Long:<span id="lng">${match.long}</span></small>            
            </a>
            `
            
        
        )
        .join('');
        // console.log(html);
        matchList.innerHTML = html;
    } else {
        matchList.innerHTML = "";
    }

    // selecting all cards
    const cards = document.querySelectorAll('.card');
    
    // event listener for each card
     cards.forEach(card =>{
        card.addEventListener('click',function getMap() {
            console.log('map added');
            
            // latitude and longitude of selected card
            let lat = card.children[1].children[0].textContent;
            let lng = card.children[1].children[1].textContent;
            var center = new google.maps.LatLng(lat,lng);
            initMap(center);
            
            document.getElementById('map').style.display='block';
        });
    })
    
}
function initMap(center) {
    // map options
    
    var options = {
        zoom :8,
        center:center
    }
    // new map
    var map = new google.maps.Map(document.getElementById('map'),options);
    addMarker(center);
    function addMarker(coords) {
        var marker = new google.maps.Marker({
            position:coords,
            map:map
        });
    }


}


search.addEventListener('input', () => searchStates(search.value));


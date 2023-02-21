async function apiCityOptions(city){
    if(city == "" || city == null){ return []}

    const url = `http://localhost:3000/api/city-search/${city}`
    const result = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        });
    return result;
}

function updateCityOptions(city){
    apiCityOptions(city).then( (data) => {
        const optionsParent = document.getElementById('search-results')
        const optionsChildren = data?.map(co => {
            return `<div onclick='updateWeatherData(${JSON.stringify(co)})'>${co.city}, ${co.state}, ${co.country}</div>`
        })
        optionsParent.innerHTML = optionsChildren.join('')
    })
}

const cityOptionsDebounced = debounce(updateCityOptions, 500);

// assign event to city search component
const searchBarInput = document.getElementById('search-bar-input')
const searchResultDiv = document.getElementById('search-results')

searchBarInput.addEventListener('input', (event) => {
    var val = event.target.value
    cityOptionsDebounced(val)
});

searchBarInput.addEventListener('blur', (e) => {
    // must set timeout inorder to let click events fire first
    window.setTimeout(() => {
        searchResultDiv.hidden = true;
    }, 750);
})

searchBarInput.addEventListener('focus', () => {
    searchResultDiv.hidden = false;
})
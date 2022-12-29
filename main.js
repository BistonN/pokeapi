get = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return;
    }
}

getPokemonsInfos = async (resultados) => {
    resultados.map(async (item) => {
        const pokemonInfo = await get(item['url']);
        gerenateHTML(pokemonInfo);
    });
}

gerenateHTML = (pokemonInfo) => {
    const content = document.querySelector('div.content div.row');
    var typesHTML = '';
    pokemonInfo['types'].map(item => {
        typesHTML = typesHTML + `
            <div class="col label" style="background-color: ${typesColors[item['type']['name']]['backgroud']}; color: ${typesColors[item['type']['name']]['color']}; ">
                ${item['type']['name']}
            </div>
        `;
    });
    const html = `
        <div class="col-4 poke-card">
            <div class="row">
                <div class="col">
                    <img class="img-fluid" src="${pokemonInfo['sprites']['front_default']}">
                </div>
            </div>
            <div class="info">
                <p class="text-muted">#${formatNumber(pokemonInfo['id'])}</p>
                <h4>${pokemonInfo['name']}</h4>
            </div>
            <div class="row types">
                ${typesHTML}
            </div>
        </div>
    `;
    content.innerHTML = content.innerHTML + html;
}

formatNumber = (number) => {
    var result = String(number);
    const zeros = 3 - String(number).length;
    for (let i = 0; i < zeros; i++) {
        result = '0' + result;
    }
    return result;
}

(async () => {
    var resultados = await get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=81');
    await getPokemonsInfos(resultados['results']);
})();

const typesColors = {
    bug : {'backgroud': '#5d6d49', 'color': '#DAFFB0'},
	dark: {'backgroud': '#394151', 'color': '#E0E2E8'},
	dragon: {'backgroud': '#4780A0', 'color': '#193648'},
	electric: {'backgroud': '#F9CF39', 'color': '#443913'},
	fairy: {'backgroud': '#fcb8e1', 'color': '#4f3c47'},
	fighting: {'backgroud': '#D75E5D', 'color': '#3a1818'},
	fire: {'backgroud': '#ff9019', 'color': '#3a2107'},
	flying: {'backgroud': '#aab5e0', 'color': '#30323d'},
	ghost: {'backgroud': '#000000', 'color': '#FFFFFF'},
	grass: {'backgroud': '#719548', 'color': '#DAFFB0'},
	ground: {'backgroud': '#a07e0e', 'color': '#332805'},
	ice: {'backgroud': '#FFFFFF', 'color': '#000000'},
	normal: {'backgroud': '#FDFDFD', 'color': '#6F6F6F'},
	poison: {'backgroud': '#a369bf', 'color': '#37263f'},
	psychic: {'backgroud': '#8c40ef', 'color': '#f0eff2'},
	rock: {'backgroud': '#4c3e07', 'color': '#e0d8b8'},
	steel: {'backgroud': '#b7bece', 'color': '#323438'},
	water: {'backgroud': '#2b6dd8', 'color': '#d7e1f2'}
};
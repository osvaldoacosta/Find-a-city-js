function procurar() {


	var limite = document.getElementById("limite").value;
	localStorage.setItem("limite", limite)
	let pais = document.getElementById("pais").value;
	let popMin = document.getElementById("pop_minima").value;
	let inicial = document.getElementById("inicial").value;

	fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=${limite}&countryIds=${pais}&minPopulation=${popMin}&namePrefix=${inicial}&languageCode=pt`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "8786998556msh624d25b9f5123abp126c56jsna0931404a5e2",
			"x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
		}
	})
		.then(response => {
			if (!response.ok) { throw Error(response.statusText); }
			response.json().then(dados => armazenarData(dados["data"]))
		}).catch(function (error) {
			alert("Ocorreu algum erro ")
		})
}
const armazenarData = (data) => {
	localStorage.setItem("dataCity", JSON.stringify(data))
	
	window.location.href = "resposta.html"

}

const tratarData = () => {
	const data = JSON.parse(localStorage.getItem("dataCity"))
	
	var tbodyRef = document.getElementById("tabela_Resposta").getElementsByTagName('tbody')[0];
	const q = ["city", "region", "country", "latitude", "longitude"]
	for (let i = 0; i < localStorage.getItem("limite"); i++) {
		
		
		let dados = data[i]


		//pegar os itens em q separa-los em colunas e adicionar seus valores em baixo

		var newRow = tbodyRef.insertRow(-1);

		
		//tratando os dados
		for (const campo in dados) {

			for (let c = 0; c < 5; c++) {
				if (campo == q[c]) {


					adicionarATabela(dados[campo], newRow)
				}
			}
		}

	}

	
}
//add valores a tabela html
let adicionarATabela = (valores, newRow) => {
		
	var newCell = newRow.insertCell();


	var newText = document.createTextNode(valores);
	newCell.appendChild(newText);
}



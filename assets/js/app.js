async function fetchData() {
	let url = "assets/js/data.json";
	try {
		let res = await fetch(url);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

(async function renderData() {
	let data = await fetchData();
	let random = Math.floor(Math.random() * 5);
	let output = data[random].content;
	let factSection = document.querySelector("#fact");
	factSection.innerHTML = output;
})();

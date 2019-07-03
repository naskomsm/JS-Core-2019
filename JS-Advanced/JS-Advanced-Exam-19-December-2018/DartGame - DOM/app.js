function dart() {
	let scoreboard = {};

	deployScoreboard();

	// let divs = [...document.querySelectorAll('#playBoard div')];
	// divs.forEach((div) => {
	// 	div.addEventListener('click', givePointsOnClick);
	// });

	document.getElementById('firstLayer').addEventListener('click',givePointsOnClick);
	document.getElementById('secondLayer').addEventListener('click',givePointsOnClick);
	document.getElementById('thirdLayer').addEventListener('click',givePointsOnClick);
	document.getElementById('fourthLayer').addEventListener('click',givePointsOnClick);
	document.getElementById('fifthLayer').addEventListener('click',givePointsOnClick);
	document.getElementById('sixthLayer').addEventListener('click',givePointsOnClick);

	function deployScoreboard() {
		let trs = [...document.querySelectorAll('tbody tr')];
		let layersPointsArray = [];

		for (const tr of trs) {
			let layerPoints = +tr.children[1].innerHTML.split(' ')[0];

			layersPointsArray.push(layerPoints);
			layersPointsArray.sort((a, b) => a - b);
		}

		for (let i = 0; i < trs.length; i++) {
			let layerName = trs[i].children[0].innerHTML;

			trs[i].children[1].innerHTML = layersPointsArray[i]; // layersPoints
			scoreboard[layerName] = layersPointsArray[i];
		}
	}

	function givePointsOnClick() {
		let currentLayer = this;
		
		if (this.id === 'firstLayer') {
			console.log('1');
			// let turns = document.getElementById('turns');

			// let home = turns.children[0];
			// let away = turns.children[1];

			// if(home.style.textDecoration === 'underline'){
				
			// }
			// else{
				
			// }
		}
		else if(this.id === 'secondLayer'){
			console.log('2');
		}
	}
}
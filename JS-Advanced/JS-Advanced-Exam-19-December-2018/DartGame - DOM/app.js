function dart() {
	//setup
	let layersPointsArray = [];
	let turns = document.getElementById('turns');
	let playerInTurn = turns.children[0];
	let shouldIWork = true;
	
	deployScoreboard();
	attachEventListenersToLayers();

	
	function attachEventListenersToLayers(){
		[...document.querySelectorAll('#playBoard div')]
		.forEach((layer, index) => {
			let pointPerLayer = layersPointsArray[index];
			layer.addEventListener('click', handleScore(pointPerLayer))
		});
	}

	function deployScoreboard() {
		let trs = [...document.querySelectorAll('tbody tr')];

		for (const tr of trs) {
			let layerPoints = +tr.children[1].innerHTML.split(' ')[0];

			layersPointsArray.push(layerPoints);
		}

		for (let i = 0; i < trs.length; i++) {
			trs[i].children[1].innerHTML = layersPointsArray[i] + ' points'; // layersPoints
		}
	}

	function handleScore(score) {
		return (ev) => {
			if (shouldIWork) {
				swapTurns();
				function swapTurns(){
					if (playerInTurn === turns.children[0]) { // home
						let homePoints = Number(document.getElementById('Home').children[0].innerHTML);
						homePoints += score;
						document.getElementById('Home').children[0].innerHTML = homePoints;
	
						playerInTurn = turns.children[1];
	
						turns.children[0].style.textDecoration = 'none';
						turns.children[0].style.fontWeight = 'normal';
	
						turns.children[1].style.textDecoration = 'underline';
						turns.children[1].style.fontWeight = 'bold';
					}
	
					else if (playerInTurn === turns.children[1]) {
						let awayPoints = Number(document.getElementById('Away').children[0].innerHTML);
						awayPoints += score;
						document.getElementById('Away').children[0].innerHTML = awayPoints;
	
						playerInTurn = document.getElementById('turns').children[0];
	
						turns.children[1].style.textDecoration = 'none';
						turns.children[1].style.fontWeight = 'normal';
	
						turns.children[0].style.textDecoration = 'underline';
						turns.children[0].style.fontWeight = 'bold';
					}
				}

				displayWinner();
				function displayWinner(){
					if (Number(document.getElementById('Home').children[0].innerHTML) >= 100) { // home is winner
						document.getElementById('Home').children[1].style.background = 'green';
						document.getElementById('Away').children[1].style.background = 'red';
	
						shouldIWork = false;
					}
					else if (Number(document.getElementById('Away').children[0].innerHTML) >= 100) { // away is winner
						document.getElementById('Home').children[1].style.background = 'red';
						document.getElementById('Away').children[1].style.background = 'green';
	
						shouldIWork = false;
					}
				}
			}

			ev.stopPropagation();
		}
	}
}

console.log(structure)
const sidebarBox = document.querySelector('#box')
const sidebarBtn = document.querySelector('#btn')
const pageWrapper = document.querySelector('#page-wrapper');
const btn = document.getElementById('flush');
const container = document.querySelector("#title > div.container_list")

sensors = {
}

valves = {
}
apartment = []
setTimeout(() => {
	sensors = structure.apartment[0].sensors
	render_tanks()

	for (let key in structure) {
		apartment.push(key)

	}
	render_apartments()
}, 5000)

function render_apartments() {
	for (let i = 0; i < apartment.length; i++) {
		document.getElementById('apartment' + i).innerText = apartment[i].replace("_", " ")
	}
}

function open_valve(value, type, Object) {
	device = sensors[0]
	firebase.database().ref('rulemap/' + device + '/slave/' + type + '/on').once('value', (snapshot) => {
		temp = snapshot.val()
		console.log(temp)
		for (let key in temp) {
			slave = key
			command = temp[key]
			console.log(command)
			firebase.database().ref('messages/' + slave).update({
				message: command
			});
			break;
		}
	})


	firebase.database().ref('messages/' + slave).update({
		message: 'aa'
	})
	// alert('valve opened')
}


function close_valve(value, type, Object) {
	device = sensors[0]
	firebase.database().ref('rulemap/' + device + '/slave/' + type + '/off').once('value', (snapshot) => {
		temp = snapshot.val()
		console.log(temp)
		for (let key in temp) {
			slave = key
			command = temp[key]
			console.log(command)
			firebase.database().ref('messages/' + slave).update({
				message: command
			});
			break;
		}
	})

	firebase.database().ref('messages/' + slave).update({
		message: command
	})
	// firebase.database().ref('messages/' + slave).update({
	// 	message: 'aa'
	// })
	alert('valve closed')
}


function render_tanks() {
	sensors.forEach(element => {
		console.log('tank' + element + 'D')
		sensors[element] = firebase.database().ref('tank/' + element + '/D').on('value', (snapshot) => {
			temp_status = snapshot.val()
			console.log(temp_status.level)
			temp_status.level == 'high' ? document.querySelector("#dwave").style.top = "20%" : document.querySelector("#dwave").style.top = "80%"
			document.getElementById("domestic").innerHTML = temp_status.level.toUpperCase()

		})
		console.log('tank' + element + 'F')
		sensors[element] = firebase.database().ref('tank/' + element + '/F').on('value', (snapshot) => {
			temp_status = snapshot.val()
			console.log(temp_status.level)
			temp_status.level == 'high' ? document.querySelector("#fwave").style.top = "20%" : document.querySelector("#fwave").style.top = "80%"
			document.getElementById("flush").innerHTML = temp_status.level.toUpperCase()

		})

	});

	firebase.database().ref('logs/' + '4qFKY0hUsQd5CMpiyjIJgctHxki1').once('value', (snapshot) => {
		console.log(snapshot.val())
		logs = snapshot.val()
		for (let i = 1; i < 4; i++) {
			console.log(logs[i])
			element = logs[i]
			document.querySelector("#time" + i).innerHTML = element.time
			document.querySelector("#message" + i).innerHTML = element.message
			document.querySelector("#type" + i).innerHTML = element.level

		}

	})





}


function launch(value, Object) {

	apartment = Object.innerHTML.replace(" ", "_")
	console.log(apartment, structure[apartment]['0'])
	sensors = structure[apartment]['0'].sensors
	reset()
	console.log(sensors)
	render_tanks()

}


function reset() {
	sensors.forEach(element => {
		console.log('tank' + element + 'D')
		sensors[element] = firebase.database().ref('tank/' + element + '/D').off()
		console.log('tank' + element + 'F')
		sensors[element] = firebase.database().ref('tank/' + element + '/F').off();
	}
	)
}

sidebarBtn.addEventListener('click', event => {
	sidebarBtn.classList.toggle('active');
	sidebarBox.classList.toggle('active');
});

pageWrapper.addEventListener('click', event => {

	if (sidebarBox.classList.contains('active')) {
		sidebarBtn.classList.remove('active');
		sidebarBox.classList.remove('active');
	}
});

window.addEventListener('keydown', event => {

	if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
		sidebarBtn.classList.remove('active');
		sidebarBox.classList.remove('active');
	}
});

function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}


state = 2;
function pop_hide_core() {
	if (state == 1) {
		for (let i = 0; i < 3; i++) {
			document.getElementsByClassName("card")[i].style.display = "none";
		}
		state = 2;
	} else {
		for (let i = 0; i < 3; i++) {
			document.getElementsByClassName("card")[i].style.display = "block";
		}
		state = 1;
	}
	console.log(state)
}

function render() {
	// JSC.Chart('chartDiv', {
	// 	type: 'line',
	// 	series: [
	// 		{
	// 			points: [
	// 				{ x: 'January', y: 10 },
	// 				{ x: 'February', y: 15 },
	// 				{ x: 'March', y: 20 },
	// 				{ x: 'April', y: 25 },
	// 				{ x: 'May', y: 30 }
	// 			]
	// 		}
	// 	]
	// });

}
setTimeout(render, 1000)


btn.addEventListener('click', function () {
	// Remove the existing elements from the container
	console.log("event called")
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}

	// Add the new elements to the container
	const newElement = document.createElement('div');
	newElement.id = "tank"
	newElement.innerHTML = 'FLUSH 1';
	const wave = document.createElement('div');
	wave.className = 'wave-03'
	container.appendChild(newElement);
	newElement.appendChild(wave)

	const newerElement = document.createElement('div');
	newerElement.id = "tank"
	newerElement.innerHTML = 'FLUSH 2';
	const waver = document.createElement('div');
	waver.className = 'wave-03'
	container.appendChild(newerElement);
	newerElement.appendChild(waver)

	for (let i = 0; i < sensors['flush'].length; i++) {
		const newElement = document.createElement('div');
		newElement.id = "tank"
		newElement.innerHTML = 'FLUSH ' + i;
		const wave = document.createElement('div');
		wave.className = 'wave-03'
		container.appendChild(newElement);
		newElement.appendChild(wave)
	}

	for (let i = 0; i < sensors['tank'].length; i++) {
		const newElement = document.createElement('div');
		newElement.id = "tank"
		newElement.innerHTML = 'FLUSH ' + i;
		const wave = document.createElement('div');
		wave.className = 'wave-03'
		container.appendChild(newElement);
		newElement.appendChild(wave)
	}


});



function reservior() {
	document.getElementsByClassName('row justify-content-center mx-auto').remove()
	// document.querySelector("#tankrow").remove()
}


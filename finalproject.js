
// Get form elements
const form = document.getElementById("new-task")
const task = document.getElementById("task")
const dueDate = document.getElementById("due-date")
const modal = document.getElementById("myModal");
const table = document.querySelector("#today-list > table")

// ---- Form validation 
// Validate length of task
const validLength = (input, min) => {
	if (input.value.trim().length >= min) {
		input.parentElement.classList.remove("invalid");
		input.validity.valid = true;
		input.setCustomValidity("");
	} else {
		input.parentElement.classList.add("invalid");
		input.validity.valid = false;
		input.setCustomValidity(input.dataset.invalidMessage);
		input.reportValidity();
	}
	return input.validity.valid;
}

// Validate due date
const validDate = (inputDate) => {
	const currentDate = new Date();

	const dueDate = new Date(inputDate.value + 'T00:00')
	if (dueDate > currentDate) {
		inputDate.parentElement.classList.remove("invalid");
		inputDate.validity.valid = true;
		inputDate.setCustomValidity("");
	} else {
		inputDate.parentElement.classList.add("invalid");
		inputDate.validity.valid = false;
		inputDate.setCustomValidity(inputDate.dataset.invalidMessage);
		inputDate.reportValidity();
	}
	return inputDate.validity.valid;
}

// Change Event listeners
task.addEventListener("change", () => validLength(task, 1))
dueDate.addEventListener("change", () => validDate(dueDate))

// //---- Pause for now: Create Class constructor to store newTasks
// class NewTask {
// 	constructor(task, dueDate) {
// 		this.name = task;
// 		this.deadline = dueDate;
// 	}
// 	checkbox() {
// 		const newCheckbox = document.createElement("input")
// 		newCheckbox.type = "checkbox"
// 		this.checkbox = newCheckbox
// 	}
// }

function addTaskToTable(task, dueDate) {
	// Create new row with cell elements for task, dudedate and checkbox 
	const newRow = document.createElement("tr")
	const colTask = document.createElement("td")
	const colDueDate = document.createElement("td")
	const colCheckBox = document.createElement("td")

	// Add value to each element
	colTask.textContent = task.value
	colDueDate.textContent = dueDate.value

	// Add Checkbox
	const newCheckbox = document.createElement("input")
	newCheckbox.type = "checkbox"
	colCheckBox.appendChild(newCheckbox)
	
	// Append to new row and current table
	newRow.append(colTask, colDueDate, colCheckBox)
	table.append(newRow)
	console.log("this works")

	// Clear value
	task.value =""
	dueDate.value=""
}

// Form validation for length and duedate
const formValidation = (e) => {
	e.preventDefault();
	let valid = true;
	if (!validLength(task, 1)) {
		valid = false;
	}

	if (!validDate(dueDate)) {
		valid = false;
	}
	return valid
}


// Event listener for form validation
form.addEventListener("submit", (e) => {
	
	if (formValidation(e)) {
		// Add to table: 
		addTaskToTable(task, dueDate)
		// Store to local storage

		// ------------ Pause on it
		// const savedTask = new NewTask(task, dueDate);
		// savedTask.checkbox()
		// console.log(savedTask)
		// localStorage.setItem('savedTask', JSON.stringify(savedTask))

		// form.submit();
	} else {
		e.preventDefault();
		form.reportValidity();
	}

	
})


// // ----------- Continue from here -----------


// // Get current todo from local storage 
// // --- https://www.youtube.com/watch?v=La5cL2jNoVw
// // --- Display today on page 


// --- Get cat image API
// Display cat image as modal image
function showCat(catUrl){
	const modalImg = document.getElementById("cat-pic");
	modal.style.display = "block";
	modalImg.src = catUrl;
}

// Fetch API to display cat image after checking a task
document.getElementById('check').onclick = function (e) {
	let message = ""
	// Pick message for completed vs uncompleted tasks 
	if (e.target.checked) {
		message = "good%20job%21"
		console.log(message)
	} else {
		message = "you%20got%20this%21"
		console.log(message)
	}

	// Fetch API from Cataas
	const url = `https://cataas.com/cat/says/${message}?font=Verdana&fontSize=30&fontColor=%23fff&position=bottom`

	async function getRandomCat() {
		try {
			// Make a GET request to the Cataas API
			const response = await fetch(url);
			console.log(url)
			// Check if the response was successful
			if (!response.ok) {
				throw new Error('Failed to fetch cat image.');
			}
		} catch (error) {
			// Log any errors that occur during the process
			console.error(error.message);
			throw error;
		}
	}

	fetch(url)
		.then(function (data) {
			return data.url
		}).then(function (imageUrl,message) {
			showCat(imageUrl)
		})

};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}
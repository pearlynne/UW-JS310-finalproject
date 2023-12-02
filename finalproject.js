// Display incompleted tasks from local storageto table
document.getElementById("table-list").innerHTML = localStorage.getItem("table-list");

// Save only complete and incomplete lists to the local storage
function saveTDList() {
	localStorage.setItem("table-list", document.getElementById("table-list").innerHTML)
	localStorage.setItem("done-list", document.getElementById("done-list").innerHTML)
}

// Get form elements
const form = document.getElementById("new-task")
const task = document.getElementById("task")
const dueDate = document.getElementById("due-date")
const modal = document.getElementById("myModal");
const tableList = document.getElementById("table-list")

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
	colCheckBox.classList.add("checkboxes-col")

	// Append to new row and current table
	newRow.append(colTask, colDueDate, colCheckBox)
	tableList.append(newRow)

	// Clear value
	task.value = ""
	dueDate.value = ""
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
		// Store to local storage ---- Need to change to proper format instead of HTML
		saveTDList()
	} else {
		e.preventDefault();
		form.reportValidity();
	}

})



// Display cat image as modal image
function showCat(catUrl) {
	const modalImg = document.getElementById("cat-pic");
	modal.style.display = "block";
	modalImg.src = catUrl;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

const listOfTasks = document.getElementById("today-list");

// Fetch API to display cat image after checking a task
listOfTasks.addEventListener('change', (e) => {
	let message = ""
	// Pick message for completed vs uncompleted tasks 
	if (e.target.checked) {
		message = "good%20job%21"

		// Move marked checked!
		setTimeout(() => {
			const doneList = document.getElementById("done-list")
			doneList.appendChild(e.target.closest("tr"))
			saveTDList() 
		}, 2500)

	} else {
		message = "you%20got%20this%21"

		setTimeout(() => {
			const tableList = document.getElementById("table-list")
			tableList.appendChild(e.target.closest("tr"))
			saveTDList()
		}, 2500)
	}

	// Fetch API from Cataas
	const url = `https://cataas.com/cat/says/${message}?font=Verdana&fontSize=30&fontColor=%23fff&position=bottom`

	fetch(url)
		// Check if the response was successful
		// 	if (!response.ok) {
		// 		throw new Error('Failed to fetch cat image.');
		// 	}
		// } catch (error) {
		// 	// Log any errors that occur during the process
		// 	console.error(error.message);
		// 	throw error;
		.then(function (data) {
			return data.url
		}).then(function (imageUrl, message) {
			showCat(imageUrl)
		})
});


// non-blocking from setTimeout
// addEventListener("input", () => {
// 	// saveTDList()
// 	console.log("might work?")
// })

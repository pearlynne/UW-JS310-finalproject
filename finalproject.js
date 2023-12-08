/* ---------- Form elements ---------- */
const form = document.getElementById("new-task")
const task = document.getElementById("task")
const dueDate = document.getElementById("due-date")
const modal = document.getElementById("myModal");
const listOfTasks = document.getElementById("today-list");
let tableList = document.getElementById('incomplete-tasks');
let completedList = document.getElementById('completed-tasks');

// Class constructor to create new tasks
class NewTask {
	constructor(task, dueDate){
		this.taskName = task;
		this.dueDate = dueDate;
	}
}


/* ---------- Local storage ---------- */
// Retrieve data and display data from local storage (if any)
function getData() {
	// Remove completed tasks
	localStorage.removeItem("completed-tasks")

	// Get incomplete tasks 
	let previousTasks = JSON.parse(localStorage.getItem("incomplete-tasks"))
	
	// Insert into table if there are incomplete tasks
	if (previousTasks == null) {
		return
	} else {
		previousTasks.forEach((element) => {
			tableList.insertAdjacentHTML('beforeEnd',
				`<tr><td>${element.taskName}</td>
				<td>${element.dueDate}</td>
				<td class="checkboxes-col"><input type="checkbox"></td>
				<td><button class="deleteButton-col">Delete</button></td></tr>`)
		})
	}
}

// Save new tasks to local storage with class constructor
function saveTDList() {
	let incompleteTaskList = [];
	let completedTaskList = [];

	// Create new class for incomplete tasks
	tableList.childNodes.forEach(function (item) {
		if (item.tagName == "TR") {
			let taskName = item.childNodes[0].innerText
			let dueDate = item.childNodes[2].innerText
			incompleteTaskList.push(new NewTask(taskName, dueDate))
		}
	});
	// Create new class for completed tasks
	completedList.childNodes.forEach(function (item) {
		if (item.tagName == "TR") {
			let taskName = item.childNodes[0].innerText
			let dueDate = item.childNodes[2].innerText
			completedTaskList.push(new NewTask(taskName, dueDate))
		}
	});

	localStorage.setItem("incomplete-tasks", JSON.stringify(incompleteTaskList));
	localStorage.setItem("completed-tasks", JSON.stringify(completedTaskList));
}

// Get data from local storage
getData()


/* ---------- Form Validation ---------- */
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
	const todaysDate = new Date().toISOString().split('T')[0];
	const currentDate = new Date(todaysDate + 'T00:00');
	const dueDate = new Date(inputDate.value + 'T00:00')
	
	if (dueDate >= currentDate) {
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

// Change Event listeners for form
task.addEventListener("change", () => validLength(task, 1))
dueDate.addEventListener("change", () => validDate(dueDate))

 
// Form validation for length and due date
const formValidation = (e) => {
	e.preventDefault();
	let valid = true;
	if (!validLength(task, 1)) {
		valid = false;
	}
	if (!validDate(dueDate)) {
		valid = false;
	}
	return valid;
}


/* ----- Event listeners for form submission ----- */
form.addEventListener("submit", (e) => {
	if (formValidation(e)) {
		addTaskToTable(task, dueDate); 
		saveTDList();

	// Clear values on form
	task.value = "";
	dueDate.value = "";
	} else {
		e.preventDefault();
		form.reportValidity();
	}
})

// Button to delete tasks
document.addEventListener('click', (e) => {
	if (e.target.classList.contains("deleteButton-col")) {
		e.target.closest("tr").remove();
		saveTDList();
	}
})

// Button to reset form and local storage
document.getElementById("fresh-start").onclick = function () {
	localStorage.clear()
	location.reload()
}

/* ---------- Display tasks to table ---------- */
// Add new data to table row
function addTaskToTable(task, dueDate) {
	tableList.insertAdjacentHTML('beforeEnd',
		`<tr><td>${task.value}</td>
	<td>${dueDate.value}</td>
	<td class="checkboxes-col"><input type="checkbox"></td>
	<td><button class="deleteButton-col">Delete</button></td></tr>`)
}

/* ---------- Modal Image timeout ---------- */
let imageTimeOut;
// Display cat image as modal image
function showCat(catUrl) {
	const modalImg = document.getElementById("cat-pic");
	modal.style.display = "block";
	modalImg.src = catUrl;

	// Remove image if not manually closed
	imageTimeOut = setTimeout(() => {
		modal.style.display = "none";
	}, 5000)
}

// Close image manually
document.getElementById("close").onclick = function () {
	modal.style.display = "none";
	clearTimeout(imageTimeOut)
}


/* ---------- Event Listener to fetch API ---------- */
listOfTasks.addEventListener('change', (e) => {
	let message = "";
	// Pick message for completed vs uncompleted tasks 
	if (e.target.checked) {
		message = "good%20job%21";

		// Move completed tasks to new table
		const doneList = document.getElementById("completed-tasks");
		doneList.appendChild(e.target.closest("tr"));
		saveTDList();

	} else {
		message = "you%20got%20this%21";
		// Return incomplete tasks to oiginal table
		const tableList = document.getElementById("incomplete-tasks");
		tableList.appendChild(e.target.closest("tr"));
		saveTDList();
	}

	// Fetch API from Cataas
	const url = `https://cataas.com/cat/says/${message}?font=Verdana&fontSize=30&fontColor=%23fff&position=bottom`;

	fetch(url)
		.then(function (data) {
			if (data.ok) {
				return data.url
			}
			throw new Error('Unable to fetch cat image');
		}).then(function (imageUrl) {
			showCat(imageUrl)
		}).catch((error) => {
			console.log(error)
		})
});


// Get form elements
const form = document.getElementById("new-task")
const task = document.getElementById("task")
const dueDate = document.getElementById("due-date")

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

// Form validation for length and duedate
const formValidation = () => {
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
		form.submit();
	} else {
		e.preventDefault();
		form.reportValidity();
	}

})



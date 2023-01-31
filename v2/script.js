let todoInput = document.getElementById("AddToDoData"), // Input where todo is coming
  todoForm = document.getElementById("ToDoForm"), // Form where todo will submit
  todoTableBody = document.getElementById("ToDoTableBody"),
  updateIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z" stroke="currentcolor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18" stroke="currentcolor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  deleteIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  todoArray = [],
  todoEditMode = false,
  editNodeID = "";

const todoDisplay = () => {
  todoTableBody.innerHTML = "";
  let tr, firstCell, secondCell, thirdCell, fourCell, fifthCell, sixthCell, seventhCell, checkbox, editBtn, deleteBtn;
  todoArray.length !== 0
    ? todoArray.map((todoItem, todoIndex) => {
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input selectTodo d-inline-flex";

        editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "btn btn-primary btn-link d-inline-flex text-white todoUpdate";
        editBtn.innerHTML = updateIcon;
        editBtn.addEventListener("click", (e) => editTodoMode(e));

        deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-danger btn-link d-inline-flex text-white";
        deleteBtn.innerHTML = deleteIcon;
        deleteBtn.addEventListener("click", (e) => deleteTodo(e));

        tr = document.createElement("tr");
        firstCell = tr.insertCell(0);
        firstCell.className = "text-center align-middle";
        firstCell.appendChild(checkbox);

        secondCell = tr.insertCell(1);
        secondCell.className = "text-center align-middle";
        secondCell.innerText = todoIndex + 1;

        thirdCell = tr.insertCell(2);
        thirdCell.className = "align-middle";
        thirdCell.innerText = todoItem.todo;

        fourCell = tr.insertCell(3);
        fourCell.className = "text-center";
        fourCell.appendChild(editBtn);
        fourCell.width = 50;

        fifthCell = tr.insertCell(4);
        fifthCell.className = "text-center";
        fifthCell.appendChild(deleteBtn);
        fifthCell.width = 50;

        tr.id = todoItem.id;
        todoTableBody.appendChild(tr);
      })
    : console.log("todo is empty");
};

const todoValidation = () => {
  let todoInputValue = todoInput.value;
  todoInputValue === "" ? alert("todo null") : checkTodo() ? alert("added already") : todoEditMode ? editTodo() : todoSubmit();
};

const todoSubmit = () => {
  todoArray.push({
    id: Date.now(),
    todo: todoInput.value
  });
  localStorage.setItem("NewToDo", JSON.stringify(todoArray));
  todoArray = JSON.parse(localStorage.getItem("NewToDo")) || [];
  todoDisplay();
};

const todoReset = () => todoForm.reset();

todoForm.addEventListener("submit", (submitEvent) => {
  submitEvent.preventDefault();
  todoValidation();
  todoReset();
});

const checkTodo = () => {
  todoArray = JSON.parse(localStorage.getItem("NewToDo")) || [];
  const checkAddedTodo = (data) => {
    return data.todo === todoInput.value;
  }
  const inputToDo = todoArray.find(checkAddedTodo);
  console.log(inputToDo === undefined ? "moklo" : "rehvado")
  const inputToDoReturn = inputToDo === undefined ? false : true
  return inputToDoReturn;
}

const editTodoMode = (e) => {
  todoArray = JSON.parse(localStorage.getItem("NewToDo")) || [];
  todoEditMode = true;
  let btn = e.currentTarget;
  let selectTodo = btn.closest("tr").id;
  todoArray.forEach((array, i) => {
    if (selectTodo == array.id) {
      todoInput.value = array.todo;
    }
  });
  editNodeID = selectTodo;
};

const editTodo = () => {
  todoArray = JSON.parse(localStorage.getItem("NewToDo")) || [];
  todoArray.forEach((array, i) => {
    if (editNodeID == array.id) {
      todoArray[i].todo = todoInput.value;
    }
  });
  localStorage.setItem("NewToDo", JSON.stringify(todoArray));
  todoDisplay();
  todoEditMode = false;
};

const deleteTodo = (e) => {
  todoArray = JSON.parse(localStorage.getItem("NewToDo")) || [];
  let btn = e.currentTarget;
  let selectTodo = btn.closest("tr").id;
  todoArray.forEach((array, index) => {
    if (selectTodo == array.id) {
      todoArray.splice(index, 1);
    }
  });
  localStorage.setItem("NewToDo", JSON.stringify(todoArray));
  todoDisplay();
};

(() => {
  todoArray = JSON.parse(localStorage.getItem("NewToDo")) || [];
  todoDisplay();
})();

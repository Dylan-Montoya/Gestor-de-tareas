document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const itemsLeft = document.getElementById("items-left");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const clearCompletedBtn = document.getElementById("clear-completed");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let currentFilter = "all";

  function saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
  }

  function render() {
    list.innerHTML = "";

    const filteredTodos = todos.filter((todo) => {
      if (currentFilter === "pending") return !todo.completed;
      if (currentFilter === "completed") return todo.completed;
      return true;
    });

    filteredTodos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""}`;

      const leftDiv = document.createElement("div");
      leftDiv.className = "todo-item-left";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleTodo(todo.id));

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = todo.text;

      leftDiv.appendChild(checkbox);
      leftDiv.appendChild(span);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "✕";
      deleteBtn.title = "Eliminar tarea";
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      li.appendChild(leftDiv);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });

    const pendingCount = todos.filter((t) => !t.completed).length;
    itemsLeft.textContent = `${pendingCount} tarea${pendingCount === 1 ? "" : "s"} pendiente${pendingCount === 1 ? "" : "s"}`;
  }

  function addTodo(text) {
    todos.push({
      id: Date.now(),
      text: text.trim(),
      completed: false,
    });
    saveAndRender();
  }

  function toggleTodo(id) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveAndRender();
  }

  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveAndRender();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      addTodo(value);
      input.value = "";
    }
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.completed);
    saveAndRender();
  });

  render();
});

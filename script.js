document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const prioritySelect = document.getElementById("todo-priority");
  const dateInput = document.getElementById("todo-date");
  const list = document.getElementById("todo-list");
  const upcomingList = document.getElementById("upcoming-list");
  const itemsLeft = document.getElementById("items-left");
  const statusFilterBtns = document.querySelectorAll(".filter-btn");
  const priorityFilterBtns = document.querySelectorAll(".priority-btn");
  const clearCompletedBtn = document.getElementById("clear-completed");
  const themeToggle = document.getElementById("theme-toggle");

  // ELEMENTOS DE ESTADÍSTICAS
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const statTotal = document.getElementById("stat-total");
  const statCompleted = document.getElementById("stat-completed");
  const statPending = document.getElementById("stat-pending");

  // ESTADO
  let todos = JSON.parse(localStorage.getItem("todos_v2")) || [];
  let currentStatusFilter = "all";
  let currentPriorityFilter = "all";

  // TEMA OSCURO / CLARO
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // GUARDADO Y RENDERIZADO
  function saveAndRender() {
    localStorage.setItem("todos_v2", JSON.stringify(todos));
    render();
    renderStats();
    renderUpcoming();
  }

  // RENDERIZAR LISTA PRINCIPAL
  function render() {
    list.innerHTML = "";

    const filtered = todos.filter((todo) => {
      const matchStatus =
        currentStatusFilter === "all" ||
        (currentStatusFilter === "pending" && !todo.completed) ||
        (currentStatusFilter === "completed" && todo.completed);

      const matchPriority =
        currentPriorityFilter === "all" ||
        todo.priority === currentPriorityFilter;

      return matchStatus && matchPriority;
    });

    if (filtered.length === 0) {
      list.innerHTML = `<li style="text-align:center; color: var(--text-secondary); padding: 20px 0;">No hay tareas en esta vista.</li>`;
    }

    filtered.forEach((todo) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""}`;

      const left = document.createElement("div");
      left.className = "todo-item-left";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleTodo(todo.id));

      const info = document.createElement("div");
      info.className = "todo-info";

      const text = document.createElement("span");
      text.className = "todo-text";
      text.textContent = todo.text;

      const badges = document.createElement("div");
      badges.className = "todo-badges";

      const priorityBadge = document.createElement("span");
      priorityBadge.className = `badge badge-${todo.priority}`;
      priorityBadge.textContent = todo.priority.toUpperCase();
      badges.appendChild(priorityBadge);

      if (todo.dueDate) {
        const dateBadge = document.createElement("span");
        dateBadge.className = "badge badge-date";
        dateBadge.textContent = `📅 ${todo.dueDate}`;
        badges.appendChild(dateBadge);
      }

      info.appendChild(text);
      info.appendChild(badges);

      left.appendChild(checkbox);
      left.appendChild(info);

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.innerHTML = "&times;";
      delBtn.title = "Eliminar";
      delBtn.addEventListener("click", () => deleteTodo(todo.id));

      li.appendChild(left);
      li.appendChild(delBtn);
      list.appendChild(li);
    });

    const pendingCount = todos.filter((t) => !t.completed).length;
    itemsLeft.textContent = `${pendingCount} tarea${pendingCount === 1 ? "" : "s"} pendiente${pendingCount === 1 ? "" : "s"}`;
  }

  // ESTADÍSTICAS Y PROGRESO (PANEL IZQUIERDO)
  function renderStats() {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const pending = total - completed;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    statTotal.textContent = total;
    statCompleted.textContent = completed;
    statPending.textContent = pending;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% completado`;
  }

  // PRÓXIMAS FECHAS (PANEL DERECHO)
  function renderUpcoming() {
    upcomingList.innerHTML = "";

    const withDates = todos
      .filter((t) => !t.completed && t.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    if (withDates.length === 0) {
      upcomingList.innerHTML = `<li style="font-size:0.85rem; color:var(--text-secondary);">No hay fechas pendientes.</li>`;
      return;
    }

    withDates.forEach((t) => {
      const li = document.createElement("li");
      li.className = "upcoming-item";
      li.innerHTML = `<span>${t.text}</span><small>${t.dueDate}</small>`;
      upcomingList.appendChild(li);
    });
  }

  // ACCIONES
  function addTodo(text, priority, dueDate) {
    todos.push({
      id: Date.now(),
      text: text.trim(),
      priority,
      dueDate: dueDate || null,
      completed: false,
    });
    saveAndRender();
  }

  function toggleTodo(id) {
    todos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveAndRender();
  }

  function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
    saveAndRender();
  }

  // EVENTOS
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (val) {
      addTodo(val, prioritySelect.value, dateInput.value);
      input.value = "";
      dateInput.value = "";
      prioritySelect.value = "media";
    }
  });

  statusFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      statusFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentStatusFilter = btn.dataset.filter;
      render();
    });
  });

  priorityFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      priorityFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentPriorityFilter = btn.dataset.priority;
      render();
    });
  });

  clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.completed);
    saveAndRender();
  });

  // INICIALIZACIÓN
  saveAndRender();
});

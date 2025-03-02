let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

// تحميل البيانات من LocalStorage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log("البيانات المحملة:", arrayOfTasks); // للتصحيح
  addAllElementsToPage();
}

// عند الضغط على زر الإضافة
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

// التعامل مع حذف أو تحديث المهام
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
  }
});

// إضافة مهمة جديدة
function addTaskToArray(taskText) {
  if (arrayOfTasks.some((task) => task.title === taskText)) {
    alert("This task already exists!");
    return;
  }
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addAllElementsToPage();
  saveDataToLocal();
}

// إضافة جميع المهام إلى الصفحة
function addAllElementsToPage() {
  tasksDiv.innerHTML = ""; // تفريغ المهام قبل إعادة إضافتها
  arrayOfTasks.forEach((task) => addElementToPage(task));
}

// إضافة عنصر واحد إلى الصفحة
function addElementToPage(task) {
  let div = document.createElement("div");
  div.className = task.completed ? "task done" : "task";
  div.setAttribute("data-id", task.id);
  div.appendChild(document.createTextNode(task.title));
  let span = document.createElement("span");
  span.className = "del";
  span.appendChild(document.createTextNode("Delete"));
  div.appendChild(span);
  tasksDiv.appendChild(div);
}

// حفظ البيانات إلى LocalStorage
function saveDataToLocal() {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  console.log("البيانات المحفوظة:", localStorage.getItem("tasks")); // للتصحيح
}

// حذف المهمة
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  saveDataToLocal();
  addAllElementsToPage();
}

// تبديل حالة المهمة (مكتملة أم لا)
function toggleStatusTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.map((task) =>
    task.id == taskId ? { ...task, completed: !task.completed } : task
  );
  saveDataToLocal();
  addAllElementsToPage();
}

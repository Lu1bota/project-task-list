const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const btn = document.querySelector(".btn-add");
const list = document.querySelector("#taskList");
const btnClear = document.querySelector(".btn-clear");
const btnItem = document.querySelector(".delete-btn");

const fragment = document.createDocumentFragment();
const item = document.createElement("li");
const btnDelete = document.createElement("button");

function createMarkup() {
  return `
    <li class="list-item" data-id="${Date.now()}">
      <span>${input.value}</span>
      <button class="delete-btn" type="button">Видалити</button>
    </li>
  `;
}

form.addEventListener("submit", handleSubmit);
btnClear.addEventListener("click", () => {
  input.value = "";
});
list.addEventListener("click", handleClear);

function handleSubmit(event) {
  event.preventDefault();
  if (input.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Строка пуста! Заповніть її для додавання завдання.",
    });
    return;
  }

  list.insertAdjacentHTML("beforeend", createMarkup());

  Swal.fire({
    title: "Good job!",
    text: `Завдання ${input.value} додано!`,
    icon: "success",
  });

  input.value = "";
}

function handleClear(event) {
  if (event.target.classList.contains("delete-btn")) {
    const listItem = event.target.closest("li");

    Swal.fire({
      title: "Ви впевнені?",
      text: "Ви не зможете скасувати це!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Так, видалити!",
      cancelButtonText: "Скасувати",
    }).then((result) => {
      if (result.isConfirmed) {
        listItem.remove();

        Swal.fire({
          title: "Видалено!",
          text: "Ваше завдання було видалено.",
          icon: "success",
        });
      }
    });
  }
}

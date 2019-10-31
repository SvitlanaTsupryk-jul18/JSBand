(function() {
  //////buttons modal

  const addNewTodo = () => {
    const modalbtn = document.querySelector(".btn-create");
    const modal = document.querySelector(".modal");
    const buttons = document.querySelector(".modal__buttons");
    const root = document.querySelector(".root");
    const todoNew = document.querySelector(".new__title");
    const select = document.querySelector(".new__priority");
    const template = document.querySelector("#template");

    let todoList = [];

    const addTodo = () => {
      if (!todoNew.value) return;
      let temp = {};
      temp.title = todoNew.value;
      temp.check = false;
      temp.priority = select.value;
      console.log(todoList);
      let n = todoList.length;
      todoList[n] = temp;
      createTodo([todoList[n]]);
      sessionStorage.setItem("todos", JSON.stringify(todoList));
    };

    const createTodo = list => {
      console.log(list);
      for (let key in list) {
        const todo = document.importNode(template.content, true);
        const title = todo.querySelector(".todo__title");
        const description = todo.querySelector(".todo__description");
        const priority = todo.querySelector(".todo__priority");

        root.appendChild(todo);
        console.log(key);
        title.innerHTML = list[key].title;
        priority.innerHTML = list[key].priority;
      }

      todoNew.value = "";
    };

    if (sessionStorage.getItem("todos") !== null) {
      todoList = JSON.parse(sessionStorage.getItem("todos"));
      createTodo(todoList);
    }

    const showModal = () => {
      modal.classList.add("show");
    };

    const closeModal = e => {
      modal.classList.remove("show");
      if (e.target.name === "save") {
        addTodo();
      }
    };

    modalbtn.addEventListener("click", showModal);
    buttons.addEventListener("click", e => {
      closeModal(e);
    });
  };

  ///invocations

  addNewTodo();
})();

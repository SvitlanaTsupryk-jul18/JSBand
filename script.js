(function() {
  //////buttons modal

  const addNewTodo = () => {
    const modalbtn = document.querySelector(".btn-create");
    const modal = document.querySelector(".modal");
    const buttons = document.querySelector(".modal__buttons");
    const root = document.querySelector(".root");
    const titleNew = document.querySelector(".new__title");
    const descriptionNew = document.querySelector(".new__description");
    const select = document.querySelector(".new__priority");
    let todoList = [];
    let flagEdit = false;
    let currentId;

    const showModal = () => {
      modal.classList.add("show");
    };

    const closeModal = e => {
      modal.classList.remove("show");
      if (e.target.name === "save") {
        if (flagEdit) {
          editTodo(currentId);
        } else {
          addTodo();
        }
      }
      flagEdit = false;
    };

    modalbtn.addEventListener("click", showModal);
    buttons.addEventListener("click", e => {
      closeModal(e);
    });

    const createTodo = item => {
      const todo = document.createElement("div");
      todo.classList.add("todo");
      const title = document.createElement("h3");
      title.classList.add("todo__title");
      const description = document.createElement("p");
      description.classList.add("todo__description");
      const priority = document.createElement("div");
      priority.classList.add("todo__priority");
      const btn = document.createElement("button");
      btn.classList.add("todo__change");
      btn.innerHTML = "...";
      const buttonsWrapper = document.createElement("div");
      buttonsWrapper.classList.add("todo__buttons");
      const editBtn = document.createElement("button");
      editBtn.classList.add("edit");
      editBtn.value = "edit";
      editBtn.innerHTML = "edit";
      const doneBtn = document.createElement("button");
      doneBtn.classList.add("open");
      doneBtn.value = "done";
      doneBtn.innerHTML = "done";
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete");
      deleteBtn.value = "delete";
      deleteBtn.innerHTML = "delete";
      buttonsWrapper.append(editBtn);
      buttonsWrapper.append(doneBtn);
      buttonsWrapper.append(deleteBtn);
      todo.append(title);
      todo.append(description);
      todo.append(priority);
      todo.append(btn);
      todo.append(buttonsWrapper);
      root.append(todo);

      if (item.open === false) {
        todo.classList.add("done");
      }

      title.innerHTML = item.title;
      priority.innerHTML = item.priority;
      todo.dataset.id = item.id;
      item.description
        ? (description.innerHTML = item.description)
        : (description.innerHTML = "");
      titleNew.value = "";
      descriptionNew.value = "";

      doneBtn.addEventListener("click", e => {
        currentId = +e.target.parentElement.parentElement.dataset.id;
        e.target.parentElement.parentElement.classList.toggle("done");

        todoList.forEach(todo => {
          if (todo.id === currentId) {
            todo.open = !todo.open;
          }
        });
        sessionStorage.setItem("todos", JSON.stringify(todoList));
      });

      editBtn.addEventListener("click", e => {
        modal.classList.add("show");
        currentId = +e.target.parentElement.parentElement.dataset.id;
        let item = todoList.find(todo => todo.id === currentId);
        titleNew.value = item.title;
        item.description
          ? (descriptionNew.value = item.description)
          : (descriptionNew.value = "");
        select.value = item.priority;
        flagEdit = true;
      });

      deleteBtn.addEventListener("click", e => {
        currentId = +e.target.parentElement.parentElement.dataset.id;
        e.target.parentElement.parentElement.remove();

        todoList = [...todoList].filter(todo => todo.id !== currentId);
        sessionStorage.setItem("todos", JSON.stringify(todoList));
      });
    };

    const addTodo = () => {
      if (!titleNew.value) return;
      let temp = {};
      temp.title = titleNew.value;
      temp.description = descriptionNew.value;
      temp.open = true;
      temp.priority = select.value;
      temp.id = Date.now();
      todoList.push(temp);
      createTodo(temp);
      sessionStorage.setItem("todos", JSON.stringify(todoList));
    };

    const editTodo = id => {
      todoList.forEach(todo => {
        if (todo.id === currentId) {
          todo.title = titleNew.value;
          todo.description = descriptionNew.value;
          todo.priority = select.value;
        }
      });
      console.log(todoList);
      sessionStorage.setItem("todos", JSON.stringify(todoList));
      root.innerHTML = "";
      todoList.forEach(item => {
        createTodo(item);
      });
    };

    if (sessionStorage.getItem("todos") !== null) {
      todoList = JSON.parse(sessionStorage.getItem("todos"));
      todoList.forEach(item => {
        createTodo(item);
      });
    }
  };

  ///invocations

  addNewTodo();
})();

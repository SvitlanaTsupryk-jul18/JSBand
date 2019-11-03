"use strict";
(function() {
  //////buttons modal

  const createTodolist = () => {
    const modalbtn = document.querySelector(".btn-create");
    const modal = document.querySelector(".modal");
    const buttons = modal.querySelector(".modal__buttons");
    const root = document.querySelector(".root");
    const titleNew = modal.querySelector(".new__title");
    const descriptionNew = modal.querySelector(".new__description");
    const select = modal.querySelector(".new__priority");
    const search = document.querySelector(".search");
    const searchTitle = document.querySelector(".search__title");
    const searchDone = search.querySelector(".search__done");
    const searchPriority = search.querySelector(".search__priority");

    let todoList = [];
    let flagEdit = false;
    let currentId;
    let query = "";
    let uncompleted = "all";
    let filterPriority = "all";

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

    const showTodo = todo => {
      for (let key in todoList) {
        if (
          todoList[key].id == todo.dataset.id &&
          todoList[key].title.includes(query)
        ) {
          root.append(filter(todo, todoList[key]));
        }
      }
    };

    const filter = (todo, item) => {
      const filtered = (todo, item) => {
        if (filterPriority === "all") {
          return todo;
        } else {
          console.log("priorstart", item.ptiority, filterPriority);
          if (item.priority === filterPriority) {
            return todo;
          } else return "";
        }
      };

      if (uncompleted === "all") {
        return filtered(todo, item);
      } else {
        console.log(item.open, uncompleted);
        if (item.open === uncompleted) {
          console.log(item.open, uncompleted);
          return filtered(todo, item);
        } else return "";
      }
    };

    const createTodo = list => {
      for (let key in todoList) {
        const todo = document.createElement("div");
        todo.classList.add("todo");
        const title = document.createElement("h3");
        title.classList.add("todo__title");
        const description = document.createElement("p");
        description.classList.add("todo__description");
        const priority = document.createElement("div");
        priority.classList.add("todo__priority");
        const btns = document.createElement("button");
        btns.classList.add("todo__change");
        btns.innerHTML = "...";
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
        todo.append(btns);
        todo.append(buttonsWrapper);

        if (todoList[key].open === false) {
          todo.classList.add("done");
        }

        title.innerHTML = todoList[key].title;
        priority.innerHTML = todoList[key].priority;
        todo.dataset.id = todoList[key].id;
        todoList[key].description
          ? (description.innerHTML = todoList[key].description)
          : (description.innerHTML = "");
        titleNew.value = "";
        descriptionNew.value = "";

        doneBtn.addEventListener("click", e => {
          currentId = +e.target.parentElement.parentElement.dataset.id;
          e.target.parentElement.parentElement.classList.toggle("done");

          root.innerHTML = "";
          todoList.forEach(todo => {
            if (todo.id === currentId) {
              todo.open = !todo.open;
            }
          });
          createTodo(todoList);
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
          console.log(todoList);
        });

        showTodo(todo);
      }
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
      root.innerHTML = "";
      createTodo(todoList);
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

      sessionStorage.setItem("todos", JSON.stringify(todoList));
      root.innerHTML = "";
      createTodo(todoList);
    };

    if (sessionStorage.getItem("todos") !== null) {
      todoList = JSON.parse(sessionStorage.getItem("todos"));
      createTodo(todoList);
    }

    //// filter

    searchTitle.addEventListener("input", e => {
      query = e.target.value;
      root.innerHTML = "";
      createTodo(todoList);
    });

    searchDone.addEventListener("change", e => {
      uncompleted = !e.target.value;
      root.innerHTML = "";
      createTodo(todoList);
    });

    searchPriority.addEventListener("change", e => {
      filterPriority = e.target.value;
      root.innerHTML = "";
      createTodo(todoList);
    });
    // const changeButtons = document.querySelectorAll(".todo__buttons");
    // [...changeButtons].forEach(el => {
    //   el.addEventListener("click", e => {
    //     // buttonsWrapper.classList.toggle("show");
    //     console.log(e);
    //   });
    //   console.log(el);
    // });
  };

  ///invocations

  createTodolist();
})();

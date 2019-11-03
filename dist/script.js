"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  //////buttons modal
  var createTodolist = function createTodolist() {
    var modalbtn = document.querySelector(".btn-create");
    var modal = document.querySelector(".modal");
    var buttons = modal.querySelector(".modal__buttons");
    var root = document.querySelector(".root");
    var titleNew = modal.querySelector(".new__title");
    var descriptionNew = modal.querySelector(".new__description");
    var select = modal.querySelector(".new__priority");
    var search = document.querySelector(".search");
    var searchTitle = document.querySelector(".search__title");
    var searchDone = search.querySelector(".search__done");
    var searchPriority = search.querySelector(".search__priority");
    var todoList = [];
    var flagEdit = false;
    var currentId;
    var query = "";
    var uncompleted = "all";
    var filterPriority = "all";

    var showModal = function showModal() {
      modal.classList.add("show");
    };

    var closeModal = function closeModal(e) {
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
    buttons.addEventListener("click", function (e) {
      closeModal(e);
    });

    var showTodo = function showTodo(todo) {
      for (var key in todoList) {
        if (todoList[key].id == todo.dataset.id && todoList[key].title.includes(query)) {
          root.append(filter(todo, todoList[key]));
        }
      }
    };

    var filter = function filter(todo, item) {
      var filtered = function filtered(todo, item) {
        if (filterPriority === "all") {
          return todo;
        } else {
          if (item.priority === filterPriority) {
            return todo;
          } else return "";
        }
      };

      if (uncompleted === "all") {
        return filtered(todo, item);
      } else {
        if (item.open === uncompleted) {
          return filtered(todo, item);
        } else return "";
      }
    };

    var createTodo = function createTodo(list) {
      for (var key in todoList) {
        var todo = document.createElement("div");
        todo.classList.add("todo");
        var title = document.createElement("h3");
        title.classList.add("todo__title");
        var description = document.createElement("p");
        description.classList.add("todo__description");
        var priority = document.createElement("div");
        priority.classList.add("todo__priority");
        var btns = document.createElement("button");
        btns.classList.add("todo__change");
        btns.innerHTML = "...";
        var buttonsWrapper = document.createElement("div");
        buttonsWrapper.classList.add("todo__buttons");
        var editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.value = "edit";
        editBtn.innerHTML = "edit";
        var doneBtn = document.createElement("button");
        doneBtn.classList.add("open");
        doneBtn.value = "done";
        doneBtn.innerHTML = "done";
        var deleteBtn = document.createElement("button");
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
        todoList[key].description ? description.innerHTML = todoList[key].description : description.innerHTML = "";
        titleNew.value = "";
        descriptionNew.value = "";
        doneBtn.addEventListener("click", function (e) {
          currentId = +e.target.parentElement.parentElement.dataset.id;
          e.target.parentElement.parentElement.classList.toggle("done");
          root.innerHTML = "";
          todoList.forEach(function (todo) {
            if (todo.id === currentId) {
              todo.open = !todo.open;
            }
          });
          createTodo(todoList);
          sessionStorage.setItem("todos", JSON.stringify(todoList));
        });
        editBtn.addEventListener("click", function (e) {
          modal.classList.add("show");
          currentId = +e.target.parentElement.parentElement.dataset.id;
          var item = todoList.find(function (todo) {
            return todo.id === currentId;
          });
          titleNew.value = item.title;
          item.description ? descriptionNew.value = item.description : descriptionNew.value = "";
          select.value = item.priority;
          flagEdit = true;
        });
        deleteBtn.addEventListener("click", function (e) {
          currentId = +e.target.parentElement.parentElement.dataset.id;
          e.target.parentElement.parentElement.remove();
          todoList = _toConsumableArray(todoList).filter(function (todo) {
            return todo.id !== currentId;
          });
          sessionStorage.setItem("todos", JSON.stringify(todoList));
          console.log(todoList);
        });
        btns.addEventListener("click", function (e) {
          e.target.nextSibling.classList.toggle("showing");
        });
        showTodo(todo);
      }
    };

    var addTodo = function addTodo() {
      if (!titleNew.value) return;
      var temp = {};
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

    var editTodo = function editTodo(id) {
      todoList.forEach(function (todo) {
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
    } //// filter


    searchTitle.addEventListener("input", function (e) {
      query = e.target.value;
      root.innerHTML = "";
      createTodo(todoList);
    });
    searchDone.addEventListener("change", function (e) {
      uncompleted = !e.target.value;
      root.innerHTML = "";
      createTodo(todoList);
    });
    searchPriority.addEventListener("change", function (e) {
      filterPriority = e.target.value;
      root.innerHTML = "";
      createTodo(todoList);
    });
  }; ///invocations


  createTodolist();
})();
"use strict";

(function () {
  //////buttons modal
  var addNewTodo = function addNewTodo() {
    var modalbtn = document.querySelector(".btn-create");
    var modal = document.querySelector(".modal");
    var buttons = document.querySelector(".modal__buttons");
    var saveTodo = document.querySelector(".save");
    var cancelTodo = document.querySelector(".cancel");

    var showModal = function showModal() {
      modal.classList.add("show");
    };

    var closeModal = function closeModal(e) {
      modal.classList.remove("show");
      console.log(e.name);
    };

    modalbtn.addEventListener("click", showModal);
    buttons.addEventListener("click", function (e) {
      closeModal(e);
    });
  }; //   window.onload = function() {
  //     const root = document.querySelector(".root");
  //     const btn = document.querySelector(".add");
  //     const todoNew = document.querySelector(".input");
  //     const select = document.querySelector(".priority");
  //     let todolist = [];
  //     if (localStorage.getItem("todo") !== undefined) {
  //       todolist = JSON.parse(localStorage.getItem("todo"));
  //     }
  //     const addTodo = () => {
  //       if (!todoNew.value) return;
  //       let temp = {};
  //       temp.todo = todoNew.value;
  //       temp.check = false;
  //       temp.priority = select.value;
  //       let n = todolist.length;
  //       todolist[n] = temp;
  //       out();
  //       localStorage.setItem("todo", JSON.stringify(todolist));
  //     };
  //     const out = () => {
  //       let out = "";
  //       for (let key in todolist) {
  //         if (todolist[key].check === true) {
  //           out += '<input type="checkbox" checked />';
  //         } else {
  //           out += '<input type="checkbox"/>';
  //         }
  //         out +=
  //           todolist[key].todo +
  //           `<div class="prior">${todolist[key].priority} </div> <br>`;
  //       }
  //       root.innerHTML = out;
  //       todoNew.value = "";
  //     };
  //     btn.addEventListener("click", addTodo);
  //   };
  ///invocations


  addNewTodo(); ////kvjhv
})();
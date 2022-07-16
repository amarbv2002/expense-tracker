// Default Variables for accessing the DOM
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const transaction = document.getElementById("transaction-ul");
const incomeBtn = document.getElementById("income-btn");
const expenseBtn = document.getElementById("expense-btn");
const form = document.getElementById("form");
const transactionAlert = document.getElementById("transaction-alert");
let inputName = document.getElementById("name");
let inputAmount = document.getElementById("amount");
let inputDate = document.getElementById("date");

// Defining the initial state for the application
let state = {
  balance: 0,
  income: 0,
  expense: 0,
  transactions: [],
};

function init() {
  let localState = JSON.parse(localStorage.getItem("expenseTracker"));

  if (localState !== null) {
    state = localState;
  }
  updateState();
  initBtns();
}

// Running the main application
init();

// Generating the unique ID for the each of the List items
function uniqueID() {
  return Math.round(Math.random() * 999999);
}

// Rendering the main applications components
function render() {
  balance.innerHTML = `₹${state.balance}`;
  income.innerHTML = `₹${state.income}`;
  expense.innerHTML = `₹${state.expense}`;

  let eachItem, listCreate, divCreate;
  eachItem = state.transactions;

  transaction.innerHTML = "";

  for (var i = 0; i < eachItem.length; i++) {
    divCreate = document.createElement("div");
    divCreate.innerHTML = `<p>${eachItem[i].date}</p>`;
    transaction.appendChild(divCreate);
    listCreate = document.createElement("li");
    listInside = transaction.appendChild(
      listCreate
    ).innerHTML = `<div><span>${eachItem[i].name}</span></div> <div><span class="fw-bold">₹${eachItem[i].amount}</span> <button class="btn btn-danger delete-btn ms-2">X</button></div>`;

    if (eachItem[i].type === "income") {
      listCreate.classList.add("income-plus");
    } else if (eachItem[i].type === "expense") {
      listCreate.classList.add("expense-minus");
    }
  }
  const deleteBtn = document.querySelectorAll(".delete-btn");
  for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", onDeleteBtnClick);
    deleteBtn[i].setAttribute("data-id", state.transactions[i].id);
  }
}

// Updating the state
function updateState() {
  let balance = 0,
    income = 0,
    expense = 0,
    item;
  for (let i = 0; i < state.transactions.length; i++) {
    if (state.transactions[i].type === "income") {
      income += state.transactions[i].amount;
    } else if (state.transactions[i].type === "expense") {
      expense += state.transactions[i].amount;
    }
  }

  balance = income - expense;

  state.balance = balance;
  state.income = income;
  state.expense = expense;

  localStorage.setItem("expenseTracker", JSON.stringify(state));

  render();
}

// Functioning the Add Income and Add Expense
function initBtns() {
  incomeBtn.addEventListener("click", incomeBtnClicked);
  expenseBtn.addEventListener("click", expenseBtnClicked);
}

function addTransaction(name, amount, date, type) {
  if (name === "") {
    alert("Please enter the transaction name");
  } else if (amount === "") {
    alert("Please enter the transaction amount");
  } else if (date === "") {
    alert("Please enter the date");
  } else {
    let pushedTransaction = {
      id: uniqueID(),
      name: name,
      amount: parseInt(amount),
      date: date,
      type: type,
    };
    state.transactions.unshift(pushedTransaction);
    transactionAlert.classList.remove("hidden");
  }

  updateState();

  inputAmount.value = "";
  inputName.value = "";
}

function incomeBtnClicked() {
  addTransaction(inputName.value, inputAmount.value, inputDate.value, "income");
}

function expenseBtnClicked() {
  addTransaction(
    inputName.value,
    inputAmount.value,
    inputDate.value,
    "expense"
  );
}

// Deleting the List array on a button click
function onDeleteBtnClick(e) {
  let myID = parseInt(e.target.getAttribute("data-id"));
  let deleteIndex;

  for (let i = 0; i < state.transactions[i].length; i++) {
    if (state.transactions[i] === myID) {
      deleteIndex = i;
      break;
    }
  }

  state.transactions.splice(deleteIndex, 1);

  updateState();
}

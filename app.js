const myLibrary = [];

function Book(title, author, pages, readStatus=false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.readBookStatus = function() {
    this.readStatus = !this.readStatus;
}


function addBookToLibrary(e) {
  e.preventDefault();

  let bookTitle = document.querySelector("#bookTitle");
  let bookAuthor = document.querySelector("#bookAuthor");
  let noOfPages = document.querySelector("#noOfPages");

  const book = new Book(bookTitle.value, bookAuthor.value, noOfPages.value);
  myLibrary.push(book);
  displayBooks();
  document.querySelector("#bookForm").reset();
  document.querySelector("#dialog").close();
}

function displayBooks() {
  const booksContainer = document.querySelector("#booksContainer");
  booksContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const div = document.createElement("div");
    div.classList.add("books");
    booksContainer.appendChild(div);

    const titleEl = document.createElement("p");
    titleEl.textContent = "Title: " + book.title;
    div.appendChild(titleEl);

    const authorEl = document.createElement("p");
    authorEl.textContent = "Author: " + book.author;
    div.appendChild(authorEl);

    const noOfPagesEl = document.createElement("p");
    noOfPagesEl.textContent = "No Of Pages: " + book.pages;
    div.appendChild(noOfPagesEl);

    const readStatusEl = document.createElement("p");
    readStatusEl.textContent = "Read Status: " + (book.readStatus ? "Read" : "Not Read");
    div.appendChild(readStatusEl);

    const toggleReadButton = document.createElement("button");
    toggleReadButton.classList.add("status-button")
    toggleReadButton.textContent = book.readStatus ? "Not Read" : "Read";
    toggleReadButton.addEventListener("click", () => {
        book.readBookStatus();        
        readStatusEl.textContent = "Read Status: " + (book.readStatus ? "Read" : "Not Read");
        toggleReadButton.textContent = book.readStatus ? "Not Read" : "Read";
    })
    div.appendChild(toggleReadButton)

    const deleteBookEl = document.createElement("button");
    deleteBookEl.classList.add("delete-book");
    deleteBookEl.textContent = "Delete";
    deleteBookEl.addEventListener("click", () => {
      deleteBook(index);
    });
    div.appendChild(deleteBookEl);
  })

//   for (let i = 0; i < myLibrary.length; i++) {
//     let book = myLibrary[i];
    
//   }
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

myLibrary.forEach(addBookToLibrary);

const dialog = document.querySelector("#dialog");
const addBtn = document.querySelector("#addBtn");
const closeBtn = document.querySelector("#closeBtn");
const addBook = document.querySelector("#bookForm");

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

addBook.addEventListener("submit", addBookToLibrary);


// Select element form the DOM
const addBookForm = document.querySelector('#addBookForm');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#number');
const isRead = document.querySelector('#is-read');
const bookCard = document.querySelector('.books');
const addBookBtn = document.querySelector('.newBookBtn');
const closeFormBtn = document.querySelector('.closeBtn');
const formModal = document.querySelector('.modal');


// Array to store books 
let myLibrary = [];

// Blueprint for book object
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

//Opens form modal 

addBookBtn.addEventListener('click', () => {
    console.log("i got opened!");
    formModal.classList.add('active'); //show modal(css) when button is clicked
});

//Close form modal 
closeFormBtn.addEventListener('click', () => {
    //console.log("i got closed!");
    formModal.classList.remove('active');
});

// Function to remove book from library 
function removeBook(index) {
    myLibrary.splice(index, 1); //remove book at give index
    renderBooks();
    //console.log("removed");
}

//Function to render the books in the library/page 
function renderBooks() {
    if(!bookCard){
        console.error("Missing .books element in DOM");
        return;
    }

    bookCard.innerHTML = ''; //Clear the current list
    myLibrary.forEach((book, index) => {
        const bookList = document.createElement('section');
        bookList.classList.add('card');

        bookList.innerHTML = `
    <h2>Title: ${book.title}</h2>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.isRead ? 'Yes' : 'No'}</p>
    <div class="remove-btn" "><img src="./images/delete.svg" /></div>
    `;

        //Append book card to list 
        bookCard.appendChild(bookList);

        //Add remove button functionality
        const removeBtn = bookList.querySelector('.remove-btn');
        removeBtn.addEventListener('click', (e) => {
            const indexToRemove = e.target.getAttribute('data-index');
            removeBook(indexToRemove);
        });
    });

};

//Handle form submission 
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault(); //Prevent default submission

    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const bookPages = document.getElementById('number').value;
    const bookIsRead = document.getElementById('checkbox-is-read').checked;

    // Create new book to library 
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookIsRead);

    //Add the new book to the library 
    myLibrary.push(newBook);
    console.log(myLibrary);

    //Clear the form inputs
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('number').value = '';
    document.getElementById('checkbox-is-read').checked = false;


    //Reset form
    addBookForm.reset();


    //Close the modal 
    formModal.classList.remove('active');

    //Re-render book list 
    renderBooks();
});





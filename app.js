// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insetrt cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a class="delete">X</a></td>
  `;
  list.appendChild(row);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Show alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  // Add text node
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form); // form.insertAdjacentElement('beforebegin', div);

  // Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000)
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {

  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  // Instantiate book
  const book = new Book(title, author, isbn);
  
  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === ''|| author === ''|| isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error') ;
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    // Clear fields
    ui.clearFields();
  }
  
  e.preventDefault();
})

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

  // Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);
  
  // Show message
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})



/**
 * If we have something that's gonna show up more than once with the same class or something that is not there when the Page loads but it's dinamically added we're gonna hava to use EVENT DELEGATION.
 */
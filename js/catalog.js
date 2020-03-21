/* global Product, Cart */

'use strict';
var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Set up an empty cart for use on this page.
var cart = new Cart(cartItems);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i=0; i< Product.allProducts.length; i++) {
    var optionEl = document.createElement('option');
    optionEl.value = Product.allProducts[i].name;
    optionEl.textContent = Product.allProducts[i].name;
    selectElement.appendChild(optionEl);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  var itemsValue = document.getElementById('items').value;
  // TODO: get the quantity
  var quantityValue = document.getElementById('quantity').value;
  // TODO: using those, add one item to the Cart
  cart.addItem(itemsValue, quantityValue);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var countEl = document.getElementById('itemCount');
  var count =0;
  for (var i=0; i<cart.items.length;i++){
    count += Number(cart.items[i].quantity);  
  }
  countEl.textContent = ' has ' + count + ' items';
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  var tableRowEL = document.createElement('tr');
  var tableDataEl = document.createElement('td');
  var tableDataImgEl = document.createElement('img');
  var tableDataEl2 = document.createElement('td');

  function writeTable(){
    
    for (var i=0; i<Product.allProducts.length; i++){
      if (document.getElementById('items').value === Product.allProducts[i].name){
        tableDataImgEl.src = Product.allProducts[i].filePath;
        tableDataImgEl.style = "width: 100px; display: block;";
        tableDataEl2.textContent = Product.allProducts[i].name;
      }
    }

    var tableDataEl3 = document.createElement('td');
    tableDataEl3.textContent = document.getElementById('quantity').value;
    tableDataEl.appendChild(tableDataImgEl);
    tableRowEL.appendChild(tableDataEl);
    tableRowEL.appendChild(tableDataEl2);
    tableRowEL.appendChild(tableDataEl3);

  }
  // TODO: Add a new element to the cartContents div with that information
  var cartEl = document.getElementById('cartContents');
  if (!cartEl.firstChild) {
    var tableEl = document.createElement('table');
    tableEl.id = 'table';
    writeTable();
    tableEl.appendChild(tableRowEL);
    cartEl.appendChild(tableEl);

  } else {
    var newTableEl = document.getElementById('table');
    writeTable();
    newTableEl.appendChild(tableRowEL);
  }

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
updateCounter();


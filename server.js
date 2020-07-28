//Initializing and calling express application
var express = require('express');
var rest_api = express();

// listen to a particular port
rest_api.listen(3000);

//static files(html) --- subtask 1
rest_api.use(express.static(__dirname + '/public'));

// respond with "hello world", when a GET request is made to the hello page
rest_api.get('/hello', function(req, res) {
    console.log("sending data to client");
    res.send('hello world!!');
})

//Addition --- subtask 2.
let add_two_numbers = function(number1,number2){
    result = number1 + number2;
    return result;
}

// respond with summation of 2 numbers, when a GET request is made to the hello page.
rest_api.get('/addition', function(request, response){
    //Accepting values from the user, for addition operation.
    let number_1 = parseFloat(request.query.number1);
    let number_2 = parseFloat(request.query.number2);
    //Checking if the entered values are numbers.
    if(isNaN(number_1) || isNaN(number_2)){
        response.send("Please enter numbers.");
    }
    //Printing the first and the second number in terminal.
    console.log("The first number is:", number_1);
    console.log("The second number is:", number_2);
    //Calculating the total sum and displaying it.
    let Total = add_two_numbers(number_1, number_2);
    console.log("sending the sum of 2 numbers",Total,"to the client.");
    response.send('The total value after addition is:'+Total);
})

//Homework using array
let hw = function(name, id){
//Accounts array with id, name and deposit values.
let accounts = [
    {id:1,name:'alex',deposit:5},
    {id:2,name:'sarah',deposit:5},
    {id:3,name:'jim',deposit:15}
    ]
// for loop for iterating through the array.
for(i = 0; i < accounts.length; i += 1){
    //Returning deposit value if name and id are found in the array.
    if(name == accounts[i].name && id == accounts[i].id) {
        return accounts[i].deposit;
    }
}
//Returning 0 if name and id are not found in the array.
return 0;
}

// respond with deposit amount of the client.
rest_api.get('/ATM', function(request, response){
    //Accepting name and id of the client from the user.
    let name = request.query.name;
    let id = parseInt(request.query.id);
    //Display the given details in the terminal.
    console.log("The name given by the client is:", name);
    console.log("The id given by the client is:", id);
    //Calling hw method.
    let item_found = hw(name, id);
    //If the given name and id are incorrect.
    if(item_found == 0){
        response.send("Please verify your name and id.");
    }
    //If the given name and id are correct, then display name, id and deposit amount.
    else{
    response.send("The name of the account holder, with account number:-"+ id +"is:-" + 
    name + ". The deposit amount is=" + item_found);
    }
})

//Homework using Linked_list (link: http://localhost:3000/ATM_LinkedList?account_name=abc&account_id=a)
//Please enter name instead of "abc" and id instead of "a"

/*
The main principle of Linked list is sequential access of memory, unlike direct access of memory used in 
array. Linked list has nodes that can be stored anywhere in memory. so, adding and removing elements from 
linked list is much faster and efficient. A doubly linked list is used to point to the element previous and 
after each node. Adding elements is much faster, since, elements are stored anywhere in the memory and pointers 
from previous node in linked list can be used to point to this new node and the new node can point to the 
previous node and the next node. Removing elements is efficient since, elements in linked list can directly 
point to another node next to it and break the link connecting the delelted element.
*/

class Linked_list {
  //Constructor function to initialize head and tail pointers of linked list to null.
  constructor () {
    //head node is the fisrt node in the linked list while tail node points to the last node.
    this.head = this.tail = null;
  }

  // Adding new account details at the end of the list.
  insert_account(id, name, deposit) {
    // check if linked list is empty.
    if (!this.tail) {
      //set both head and tail ponters to new account details.
      this.head = this.tail = new Node(id, name, deposit);
    }
    // check if linked list has more than one client details.
    else {
      //set oldtail to account details that were already present.
      let oldTail = this.tail;
      //set new tail to new client details.
      this.tail = new Node(id, name, deposit);
      //oldtail(with already present account details) point to new tail.
      oldTail.next_node = this.tail;
      //setting pointer from new account details to oldtail.
      this.tail.previous = oldTail;
    }
  }

  //Searching the account details from given input.
  search_account(id, name) {
    //account_node contains the first account details, and then we can traverse from here.
    let account_node = this.head;
    //Loop through the linked list, to find the account details.
    while (account_node) {
      //Check if ID already exists
      if(account_node.id === id){
        //setting flag to signify, that id cannot be used again for another client.
         flag = 1;
      }
      //Check if ID and name are present in the Linked_list.
      if (account_node.id === id && account_node.name === name) {
        //Return the account details if account information is found.
        return account_node;
      }
      //Moving to next account details, if it is not present in the current iteration.
      account_node = account_node.next_node;
    }
    //If account details are not found, then return null.
    return null;
  }
}
class Node {
  //Creating constructor to accept name, id, deposit, next reference and previous reference values.
  constructor (id, name, deposit, previous, next_node) {
    //Setting the account details of the client to id, name and deposit.
    this.id = id;
    this.name = name;
    this.deposit = deposit;
    //Setting null value if previous and next reference are not given.
    this.next_node = next_node || null;
    this.previous = previous || null;
  }
}

//create object for Linked_list class.
const account = new Linked_list()
//setting flag to 0 intially, inserting account details.
let flag = 0;
account.insert_account(1,"alex",5);
account.insert_account(2,"sarah",5);
account.insert_account(3,"jim",15);

//Send response to client about deposit information
rest_api.get('/ATM_Linkedlist', function(request, response){

  //Input name and id from user using "http://localhost:3000/ATM_LinkedList?account_name=abc&account_id=a"
  let account_name = request.query.account_name;
  let account_id = parseInt(request.query.account_id);
  console.log("The name given by the client is:", account_name);
  console.log("The id given by the client is:", account_id);

  //Checking if the entered values are numbers.
  if(isNaN(account_id) || !isNaN(account_name)){
    response.send("Please check if id is number and also check if name has characters only");
  }

  //store result from search_account function.
  var result = account.search_account(account_id, account_name);
  //check if account details are present.
  if (result!=null){
    response.send("The name of the account holder, with account number:-"+ result.id +"is:-" + 
    result.name + ". The deposit amount is=" + result.deposit);
  }
  // If account details are not present.
  else{
    response.send("Please verify Account name and Account id. If you want to add new account details." +
    "Please enter account holders name, id and deposit in this URL. http://localhost:3000/ATM_Linkedlist_newaddition?account_name=abc&account_id=x&account_deposit=y");
  }
})

//Add new account details if account is not created
rest_api.get('/ATM_Linkedlist_newaddition', function(request, response){
  
  //Input account name, id and deposit.
  let account_name = request.query.account_name;
  let account_id = parseInt(request.query.account_id);
  let account_deposit = parseFloat(request.query.account_deposit);

  //Checking if the entered values are numbers and characters.
  if(isNaN(account_id) || isNaN(account_deposit) || !isNaN(account_name)){
    response.send("Please check if id and deposit are numbers and also check if name has characters only");
  }
  //Using search method to find account information using id and name.
  account.search_account(account_id,account_name);
  
  //check if given id already exists.
  if(flag === 1){
    response.send("This ID already exists. Please try again.");
    flag = 0;
  }
  
  //Add account information if account id and name does not exist.
  else{
    account.insert_account(account_id, account_name, account_deposit);
    response.send("Account added successfully, please check your details at http://localhost:3000/ATM_LinkedList?account_name=abc&account_id=a");
    }
})
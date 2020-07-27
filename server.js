var express = require('express')
var rest_api = express()

// list to a particular port
rest_api.listen(3000)

//static files(html) --- subtask 1
rest_api.use(express.static(__dirname + '/public'))

// respond with "hello world" when a GET request is made to the hello page
rest_api.get('/hello', function(req, res) {
    console.log("sending data to client")   
    res.send('hello world!!')
})

//Addition --- subtask 2.
let add_two_numbers = function(number1,number2){
    result = number1 + number2
    return result
}

// respond with summation of 2 numbers.
rest_api.get('/addition', function(request, response){
    let number_1 = parseFloat(request.query.number1)
    let number_2 = parseFloat(request.query.number2)
    if(isNaN(number_1) || isNaN(number_2)){
        response.send("Please enter numbers.")
    }
    console.log("The first number is:", number_1)
    console.log("The second number is:", number_2)
    let Total = add_two_numbers(number_1, number_2)
    console.log("sending the sum of 2 numbers",Total,"to the client.")   
    response.send('The total value after addition is:'+Total)
})

//Homework
let hw = function(name, id){
let accounts = [
    {id:1,name:'alex',deposit:5},
    {id:2,name:'sarah',deposit:5},
    {id:3,name:'jim',deposit:15}
    ]
// for loop for iterating through the array.
for(i = 0; i < accounts.length; i += 1){
    if(name == accounts[i].name && id == accounts[i].id) {
        return accounts[i].deposit
    }
}
return 0
}

// respond with deposit amount of the client.
rest_api.get('/ATM', function(request, response){
    let name = request.query.name
    let id = parseInt(request.query.id)
    console.log("The name given by the client is:", name)
    console.log("The id given by the client is:", id)
    let acc_deposit = hw(name, id)
    if(acc_deposit == 0){
        response.send("Please verify your name and id.")
    }
    else{
    response.send("The name of the account holder, with account number:-"+ id +"is:-" + 
    name + ". The deposit amount is=" + acc_deposit)
    }
})
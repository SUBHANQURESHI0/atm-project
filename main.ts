#! /usr/bin/env node
import inquirer from "inquirer"
import {faker} from "@faker-js/faker";

interface User{
    id:number
    pin:number
    name:string
    accountNo:number
    balance:number
}

const createUser=()=>{
    let users:User[]=[]
    for (let i = 0;i<5;i++){
        let user:User={
            id:i,
            pin:1000+i,
            name:faker.person.fullName(),
            accountNo:Math.floor(100000*Math.random()*900000),
            balance:1000000*i

        }
        users.push(user)
    }
    return users
}
 const atmMachine=async(users:User[])=>{
    const res = await inquirer.prompt({
        type:"number",
        message:"Enter your pincode",
        name:"pin"
    })
    
    const user = users.find(val=>val.pin==res.pin)
    
    if (user){
        console.log(`Welcome ${user.name}`);
        atmFunc(user)
        return;
    }
    else{
        console.log("Invalid Pin");   
    }
 };
 const atmFunc=async(user:User)=>{
    const answer=await inquirer.prompt({
        type:"list",
        name:"Select",
        message:"Which operation do you want to perform",
        choices:["Withdraw","Balance Inquiry","Exit"]
    })
    if(answer.Select=="Withdraw"){
        const inp=await inquirer.prompt({
            type:"number",
            message:"Enter the amount",
            name:"rupee"

        })
        if (inp.rupee>user.balance){
            return console.log("Insufficent Balance");
        }
        if (inp.rupee>25000){
            return console.log("Your debit limit is 25000");
            
        }
        console.log(`Withdraw ammount: ${inp.rupee}`);
        console.log(`Balance: ${user.balance-inp.rupee}`);
        
    

        
    }
    if(answer.Select=="Balance Inquiry"){
        console.log(`Balance: ${user.balance}`);
        return;
    }
    if(answer.Select=="Exit"){
        console.log("Thank you for using ATM");
        
    }

 }

 const users=createUser()
 atmMachine(users)

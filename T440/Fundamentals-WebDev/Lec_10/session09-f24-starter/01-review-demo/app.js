document.querySelector("#btn-prices").addEventListener("click", ()=>{
    console.log("Prices button clicked")
    const prices = [2.00, 1250, 3.30]
    
    // 1. TODO: Loop through all items and output to the console

    prices[0] = prices[0] * 1.10
    // - get the item #2 and increase its price
    prices[1] = prices[1] * 1.10
    // - get the item #3 and increase its price
    prices[2] = prices[2] * 1.10

    console.log(prices) 

    // 2. TODO: Using a for-loop: increase the price of all items in the list

    // It will change in array
    for(let i = 0; i < prices.length; i++) {
        prices[i] = prices[i] * 1.10;
    }
    console.log(prices);   

    // It will not change in array
    for (let price of prices) {
        // x = prices[i]
        price *= 1.10
        console.log(`price is ${price}`);
    }
    console.log(prices);   

    // 3. Output the increased prices to the <ul id="price-list"> (one price per <li>)

    for (let i = 0; i < prices.length; i++) {
        document.querySelector("ul").innerHTML += `<li>The price is: ${prices[i]}</li>`
    }

    document.querySelector("table").innerHTML = `<tr><th>item#</th><th>Price</th></tr>`
    for (let i = 0; i < prices.length; i++) {
        document.querySelector("table").innerHTML += `<tr><td>item ${i}</td> <td>${prices[i]}</td></tr>`
    }

    for (let x of prices) {
        // x = prices[i]
        document.querySelector("#price-boxes").innerHTML +=
    `
        <div class="box">
            <span class="material-symbols-outlined">sell</span>
            <p>Price: ${x.toFixed(2)}</p>
            <button>Buy</button>
        </div>
    `
    }
 
})

document.querySelector("#btn-employees").addEventListener("click", ()=> {
    console.log("Employees button clicked")
    const employees = [
        {name:"Alex", hourlyRate:18.00},
        {name:"Benny", hourlyRate:25.00},
        {name:"Carlos", hourlyRate:16.50},
    ]   
 
    // get the 2nd employee from the list (postion = 1)
   console.log(employees[1])
   // get Benny's name
   console.log(employees[1].name)
   // get Benny's hourly rate
   console.log(employees[1].hourlyRate)
   // update Benny's hourly rate
   employees[1].hourlyRate =  employees[1].hourlyRate + 20
   console.log(employees[1].hourlyRate)


   console.log(employees)
   // 1. TODO: Loop through all employees and output their names & hourly rate to the screen

   // c-style loop
   console.log("-----")
   for (let i =0; i < employees.length;i++) {
       console.log(employees[i].name)
   }


   // for-of loop
   console.log("-----")
   for (let x of employees) {
       // x = employees[i]
       console.log(x.name)

   }
    // 2. TODO: Using a for-loop: increase the hourly rate by $3.00

   for(let emp of employees) {
        emp.hourlyRate += 3;
   }

   console.log(employees);
   
    // 3. Output the name and hourly rate of each employee to the <ul id="employee-list">.
    
   let empUL = document.querySelector("#employee-list");

   for(let emp of employees) {
        empUL.innerHTML += `<li>${emp.name} - ${emp.hourlyRate}$</li>`
   }

   
})

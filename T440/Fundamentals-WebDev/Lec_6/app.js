    // Function to perform the calculation
    function calculate() {
        // Get the values from input fields
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        const operation = document.getElementById('operation').value;
  
        let result;
  
        // Check if inputs are valid numbers
        if (isNaN(num1) || isNaN(num2)) {
          document.getElementById('answer').textContent = "Please enter valid numbers.";
          return;
        }
  
        // Perform the selected operation
        if (operation === 'add') {
          result = num1 + num2;
        } else if (operation === 'subtract') {
          result = num1 - num2;
        } else if (operation === 'multiply') {
          result = num1 * num2;
        } else if (operation === 'divide') {
          if (num2 === 0) {
            document.getElementById('answer').textContent = "Cannot divide by zero!";
            return;
          }
          result = num1 / num2;
        }
  
        // Display the result in the paragraph element
        document.getElementById('answer').textContent = "Result: " + result;
      }
  
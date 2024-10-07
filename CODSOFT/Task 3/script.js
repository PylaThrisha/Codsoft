document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById('display');
    const historyDisplay = document.getElementById('history');
    
    let currentInput = '';  // To store the current input
    let history = '';  // To store the calculation history

    // Function to safely update the display
    function updateDisplay(value) {
        display.value = value !== null && value !== undefined ? value : ''; // Only show valid values
    }

    // Handle button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');

            // Handle equals button click
            if (value === '=') {
                try {
                    // Only evaluate if there's input
                    if (currentInput.trim() !== '') {
                        // Evaluate the expression and update the display
                        const result = eval(currentInput);
                        updateDisplay(result);
                        
                        // Add the calculation to the history
                        history += currentInput + ' = ' + result + '<br>';
                        
                        // Reset current input after the result, allow further operations
                        currentInput = result.toString();
                    }
                } catch (error) {
                    updateDisplay('Error');
                    currentInput = '';  // Reset input in case of error
                }
            } 
            // Handle clear button (C)
            else if (value === 'clear') {
                currentInput = '';
                updateDisplay('');
            } 
            // Handle delete button (DEL)
            else if (value === 'delete') {
                currentInput = currentInput.slice(0, -1);
                updateDisplay(currentInput || '');  // Show empty if no input left
            } 
            // Handle all other button inputs
            else {
                currentInput += value;
                updateDisplay(currentInput);  // Update display with current input
            }
        });
    });
});

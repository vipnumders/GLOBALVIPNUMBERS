// NEW FUNCTION: Filter numbers by specific digits
function filterByDigits(includeDigits) {
    if (!includeDigits || includeDigits.length === 0) return [];

    // Create a regex pattern that only allows the specified digits
    const allowedDigitsStr = includeDigits.join('');
    const disallowedDigitsStr = '0123456789'.split('').filter(d => !includeDigits.includes(d)).join('');
    
    return cellData.filter(row => {
        // Check the first two columns (Serial ID and Cell Number) for matching the pattern
        const cellNumber = row[0] ? row[0].toString() : '';
        const formattedNumber = row[1] ? row[1].toString().replace(/[^0-9]/g, '') : '';
        
        // Check if the number contains ONLY the allowed digits
        const containsOnlyAllowedDigits = 
            (cellNumber && !new RegExp(`[${disallowedDigitsStr}]`).test(cellNumber)) ||
            (formattedNumber && !new RegExp(`[${disallowedDigitsStr}]`).test(formattedNumber));
        
        // Also check if it contains at least one of the allowed digits
        const containsAllowedDigit = 
            (cellNumber && new RegExp(`[${allowedDigitsStr}]`).test(cellNumber)) ||
            (formattedNumber && new RegExp(`[${allowedDigitsStr}]`).test(formattedNumber));
        
        return containsOnlyAllowedDigits && containsAllowedDigit;
    });
}

// NEW FUNCTION: Calculate sum of digits in a number
function calculateDigitSum(number) {
    if (!number) return 0;
    const digitsOnly = number.toString().replace(/[^0-9]/g, '');
    let sum = 0;
    for (let i = 0; i < digitsOnly.length; i++) {
        sum += parseInt(digitsOnly.charAt(i), 10);
    }
    return sum;
}

// NEW FUNCTION: Digital root (single-digit sum)
function calculateDigitalRoot(number) {
    const digitsOnly = number.toString().replace(/[^0-9]/g, '');
    if (digitsOnly.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < digitsOnly.length; i++) {
        sum += parseInt(digitsOnly.charAt(i), 10);
    }
    // Reduce to single digit
    while (sum > 9) {
        let next = 0;
        const tmp = sum.toString();
        for (let j = 0; j < tmp.length; j++) next += parseInt(tmp.charAt(j), 10);
        sum = next;
    }
    return sum;
}

// Add these event listeners at the end of your script
// Event listener for the digit filter button
document.getElementById('apply-digit-filter').addEventListener('click', function() {
    const checkedDigits = Array.from(document.querySelectorAll('.digit-checkbox:checked'))
        .map(checkbox => checkbox.value);
    
    if (checkedDigits.length > 0) {
        const results = filterByDigits(checkedDigits);
        document.getElementById('results-container').style.display = 'block';
        populateTable(results, '');
        
        // Update the search input to show what we're filtering for
        document.getElementById('search-input').value = `Filter: Only digits ${checkedDigits.join(',')}`;
    } else {
        alert('Please select at least one digit to filter by.');
    }
});

// Event listener for the calculate sum button
document.getElementById('calculate-sum').addEventListener('click', function() {
    const number = document.getElementById('sum-digits-input').value.trim();
    
    if (number) {
        const sum = calculateDigitSum(number);
        document.getElementById('sum-result').innerHTML = `
            <div class="sum-result-content">
                <div><strong>Number:</strong> ${number}</div>
                <div><strong>Sum of Digits:</strong> ${sum}</div>
                <div><strong>Formula:</strong> SUM(ABS(MID(${number},{1,2,3,4,5,6,7,8,9,10},1)))</div>
            </div>
        `;
        
        // Also search for numbers with this sum
        const results = cellData.filter(row => {
            return row.some(cell => {
                if (cell && cell.toString().match(/^\d+$/)) {
                    return calculateDigitSum(cell) === sum;
                }
                return false;
            });
        });
        
        if (results.length > 0) {
            document.getElementById('results-container').style.display = 'block';
            populateTable(results, '');
            document.getElementById('search-input').value = `Numbers with digit sum = ${sum}`;
        }
    } else {
        alert('Please enter a number to calculate the sum of its digits.');
    }
});
// Auto Sum functionality
document.addEventListener('DOMContentLoaded', function() {
    const autoSumInput = document.getElementById('auto-sum-input');
    const autoSumResult = document.getElementById('auto-sum-result');

    // Enhanced function to calculate sum of digits in a number
    function calculateDigitSum(number) {
        if (!number) return 0;
        
        // Remove non-digit characters
        const digitsOnly = number.toString().replace(/[^0-9]/g, '');
        
        // Sum the digits
        let sum = 0;
        for (let i = 0; i < digitsOnly.length; i++) {
            sum += parseInt(digitsOnly.charAt(i), 10);
        }
        
        return sum;
    }

    function calculateDigitalRoot(number) {
        const digitsOnly = number.toString().replace(/[^0-9]/g, '');
        if (digitsOnly.length === 0) return 0;
        let sum = 0;
        for (let i = 0; i < digitsOnly.length; i++) {
            sum += parseInt(digitsOnly.charAt(i), 10);
        }
        while (sum > 9) {
            let next = 0;
            const tmp = sum.toString();
            for (let j = 0; j < tmp.length; j++) next += parseInt(tmp.charAt(j), 10);
            sum = next;
        }
        return sum;
    }

    // Function to display the digit sum with visual breakdown
    function displayDigitSum(number) {
        if (!number) return;
        
        // Remove non-digit characters
        const digitsOnly = number.toString().replace(/[^0-9]/g, '');
        
        if (digitsOnly.length === 0) {
            autoSumResult.style.display = 'none';
            return;
        }
        
        // Calculate sum
        const sum = calculateDigitSum(digitsOnly);
        
        // Create visual breakdown
        let breakdownHTML = '<div class="digit-sum-breakdown">';
        
        for (let i = 0; i < digitsOnly.length; i++) {
            const digit = digitsOnly.charAt(i);
            breakdownHTML += `<span class="digit-box">${digit}</span>`;
            
            if (i < digitsOnly.length - 1) {
                breakdownHTML += '<span class="digit-plus">+</span>';
            }
        }
        
        breakdownHTML += '<span class="digit-equals">=</span>';
        breakdownHTML += `<span class="digit-sum">${sum}</span>`;
        breakdownHTML += '</div>';
        
        // Display the result
        autoSumResult.style.display = 'block';
        autoSumResult.innerHTML = `
            <div><strong>Number:</strong> ${number}</div>
            <div><strong>Sum of Digits:</strong> ${sum}</div>
            ${breakdownHTML}
        `;
        
        // Also update the search input to show the result
        document.getElementById('search-input').value = `Sum: ${sum}`;
        
        // Trigger a search for this sum
        const searchEvent = new Event('input', { bubbles: true });
        document.getElementById('search-input').dispatchEvent(searchEvent);
    }

    // Add event listener for input changes
    autoSumInput.addEventListener('input', function() {
        const input = this.value.trim();
        displayDigitSum(input);
    });
    
    // Add event listener for Enter key
    autoSumInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const input = this.value.trim();
            displayDigitSum(input);
        }
        
    });
});
.filters-container {
    margin: 20px 0;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
}

.filter-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 150px;
}

.filter-button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.filter-button:hover {
    background-color: #45a049;
}

// Add functions for prefix/suffix filtering
function filterByPrefixSuffix(rows, startsWithInput, endsWithInput) {
    const startsWith = startsWithInput.split(',').map(s => s.trim()).filter(Boolean);
    const endsWith = endsWithInput.split(',').map(s => s.trim()).filter(Boolean);
    
    return rows.filter(row => {
        const num = (row[0] || '').toString();
        
        // If no filters are set, include the row
        if (startsWith.length === 0 && endsWith.length === 0) return true;
        
        // Check prefix and suffix conditions
        const hasValidPrefix = startsWith.length === 0 || 
            startsWith.some(prefix => num.startsWith(prefix));
            
        const hasValidSuffix = endsWith.length === 0 || 
            endsWith.some(suffix => num.endsWith(suffix));
            
        return hasValidPrefix && hasValidSuffix;
    });
}

// Add this HTML for the prefix/suffix inputs
<!-- Add this before your existing filters -->
<div class="filter-section">
    <div class="filter-row">
        <label>Starts with:</label>
        <input type="text" id="starts-with-input" placeholder="e.g., 987,988">
    </div>
    <div class="filter-row">
        <label>Ends with:</label>
        <input type="text" id="ends-with-input" placeholder="e.g., 000,999">
    </div>
</div>
// Add this in a script tag or your main JavaScript file
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAgVrQTPsIocnQEUioIEKZgcwMXG1t1tHk", // Your specific API Key
  authDomain: "gobal-vip-numbers.firebaseapp.com",
  projectId: "gobal-vip-numbers",
  storageBucket: "gobal-vip-numbers.firebasestorage.app",
  messagingSenderId: "1059192210451",
  appId: "1:1059192210451:web:04be185c6c9a05ea0fabe6",
  measurementId: "G-9E93WE7VD2" // Crucial for Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app); 
// Note: If you are using the older 'compat' SDK versions (like in admin.html), use firebase.analytics()

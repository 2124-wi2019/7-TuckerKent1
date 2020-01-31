/*
    Tucker Kent
    kent_a07b.js
    19WI_INFO_2124_WW Online Javascript I
    Thoendel
    29 January 2020
*/
/* DO NOT MODIFY CODE BETWEEN THESE LINES */
const standardInput = process.stdin;            
standardInput.resume();
standardInput.setEncoding('utf8');
const badFoods = [];
const groceryItems = [];
clearScreen();
console.log(getPrompt(groceryItems));
/* DO NOT MODIFY CODE BETWEEN THESE LINES */

//Step 1
buildFoodsList (badFoods, "bread", "beer", "liver and onions", "mcdonalds", "lamb"); //added 3 arguments  -- invoking function buildFoodsList       

standardInput.on('data', function (text) {
    //This line will remove line breaks 
    //\n\r in window, \r in macOS
    text = text.replace('\n', '').replace('\r', '');
    //Step 4 Begin
if (text === "q" || text === "Q"){ //logical OR operator to accept either case of q/Q on if statement
    clearScreen(); //invoking function to clear the terminal screen
    console.log("Bye"); //logging specified bye to the terminal 
    process.exit(); // invoking function to stop input listening process
} else if (text === "v" || text === "V"){ //else if statement to accept either case of v/V
    clearScreen(); //invoking function to clear the terminal screen
    console.log(displayList(groceryItems)); //invoking function to display grocery list -- logging function with its parameter
    console.log(getPrompt(groceryItems)); // invoking function to display the food entry prompt -- logging this function with its parameter
} else { // else statement for any entry other than q or v
    clearScreen(); //invoking function to clear the terminal screen
    if(checkItem(text, badFoods) === false){ //nested if statement based on checkItem function return value
        let item = formatItem(text); // declaring variable item and setting it to return value of function - formatItem
        groceryItems.push(item); // adding formatted item to groceryItems array using push() method
        console.log(`${item} added to grocery list.\n\nList contains ${groceryItems.length} ${groceryItems.length === 1? "item" : "items" }\n`); //using template literal to log confirmation with array length
        console.log(getPrompt(groceryItems)); // logging prompt to terminal -- receiving prompt from invoking function getPrompt()
    } else if(checkItem(text, badFoods) === true){ //nested elseif statement based on checkItem function returning true - could have been an else but I changed it for clarification during debugging
        console.log("Error: That item is not safe for your allergies. \nIt has not been added to your list.\n"); //logging error message if returned value is true -- matching badFood item
        console.log(getPrompt(groceryItems)); // logging prompt to terminal -- receiving prompt from invoking function getPrompt
    }
} 
    //Step 4 End
});

/* DEFINE YOUR FUNCTIONS BETWEEN THIS LINE */

//Step 2
function buildFoodsList (badFoods, ...moreBadFoods){ //declaring function with array parameter and rest operator parameter to accept any number of arguments
    for(const food of moreBadFoods){ //for each loop to iterate each input argument because of the rest operator
        badFoods.push(food); //using push method to add each argument to badFoods array
    }
}

function getPrompt(groceryItems){ //declaring function with single parameter
    let message = `Your grocery list contains ${groceryItems.length} ${groceryItems.length === 1 ? "item" : "items" } 
Please enter a grocery item.
Enter Q to quit.
Enter V to view list.
========================`; //declared variable message with template literal to accept array length -- also used ternary operator to decide between singular and plural depending on number of items in array
    return message; //returning string value 
} //is there a specific reason that the getPrompt and displayList functions should return strings rather than logging through the function?

function displayList(groceryItems){ //declaring function to display groceryItems array - single parameter needed
    let eqSign = "="; //declaring and intializing to string value to make the message aesthetics more simple
    let listMessage = ""; //declaring and initializing empty string variable to accept list items upon loop iteration
    for (let i = 0; i < groceryItems.length; i++){ //for loop to add each value of array to listMessage
        listMessage += (i+1) + "). " + groceryItems[i] + "\n"; //formatting and adding each list entry to listMessage 
    }
    let message = `Grocery List
(${groceryItems.length} ${groceryItems.length === 1 ? "item" : "items"})
${eqSign.repeat(25)}
${listMessage}`; //declaring and initializing message variable as template literal 
return message; //returning string value of variable message
}
//Step 3
function checkItem(groceryItem, badFoods){ //declaring function to check if item entered is on the badFoods array
    let boolFlag = false; //declaring and initializing variable to store false value from array iteration
    for(const food of badFoods){ //foreach loop to iterate each index of badFoods
        if (food.toLowerCase() === groceryItem.toLowerCase()){ //checking the entered item against this iteration of array
            return true; //in the case that the item is in array -- returning true to end function
        }else { //if the check doesn't return true the else statement sets the flag variable to false again
            boolFlag = false; //resetting value to false -- is it bad practice to have redundant code in here, or and empty else statement?
        }
    }
    return boolFlag; //returning boolean value
}
function formatItem(groceryItem){ //declaring function to format supplied argument -- is there a better way to do this? 
    let formattedItem = groceryItem.trim(); //using trim method to get rid of whitespace before and after string value -- declaring variable to set formatted string to
    formattedItem = formattedItem[0].toUpperCase() + formattedItem.slice(1).toLowerCase(); // formatting first letter uppercase and all following to lowercase -- is there a better way to do this?
    return formattedItem; // returning formatted string value
}

/* AND THIS LINE */

function clearScreen() {
    console.log('\033[2J');
}
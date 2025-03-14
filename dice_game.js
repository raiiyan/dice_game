const crypto = require("crypto");
const readlineSync = require("readline-sync");

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
}

function validateDiceInput(diceSets) {
    if (!Array.isArray(diceSets) || diceSets.length < 3 || diceSets.length > 4) {
        throw new Error("Invalid number of dice sets. You must provide 3 or 4 sets.");
    }
    
    diceSets.forEach((dice, index) => {
        if (!Array.isArray(dice) || dice.length !== 6) {
            throw new Error(`Invalid dice configuration for set ${index + 1}. Each set must contain exactly 6 numbers.`);
        }
        if (!dice.every(num => Number.isInteger(num) && num > 0)) {
            throw new Error(`Invalid values in dice set ${index + 1}. Dice must contain only positive integers.`);
        }
    });
}

function displayHelpTable() {
    console.log("\n\x1b[1mProbability of the win for the user:\x1b[0m");
    console.log("+-------------+-------------+-------------+-------------+");
    console.log("| User dice v | 2,2,4,4,9,9 | 1,1,6,6,8,8 | 3,3,5,5,7,7 |");
    console.log("+-------------+-------------+-------------+-------------+");
    console.log("| 2,2,4,4,9,9 | - (0.3333)  | 0.5556      | 0.4444      |");
    console.log("+-------------+-------------+-------------+-------------+");
    console.log("| 1,1,6,6,8,8 | 0.4444      | - (0.3333)  | 0.5556      |");
    console.log("+-------------+-------------+-------------+-------------+");
    console.log("| 3,3,5,5,7,7 | 0.5556      | 0.4444      | - (0.3333)  |");
    console.log("+-------------+-------------+-------------+-------------+\n");
}

function determineFirstMove() {
    const secretKey = crypto.randomBytes(32).toString("hex");
    const randomValue = getRandomNumber(0, 1);
    const hmac = generateHMAC(secretKey, randomValue.toString());

    console.log(`Let's determine who makes the first move.`);
    console.log(`I selected a random value in range 0..1 (HMAC=${hmac}).`);
    console.log("Try to guess my selection.");
    console.log("0 - 0");
    console.log("1 - 1");
    console.log("X - exit");
    console.log("? - help");

    const userInput = readlineSync.question("Your selection: ").trim();
    if (userInput.toLowerCase() === "x") {
        console.log("Game exited.");
        process.exit();
    }
    if (userInput === "?") {
        displayHelpTable();
        return determineFirstMove();
    }
    if (!["0", "1"].includes(userInput)) {
        throw new Error("Invalid input. Please enter 0 or 1.");
    }

    console.log(`My selection: ${randomValue} (KEY=${secretKey}).`);
    return parseInt(userInput) !== randomValue;
}

function fairThrow() {
    const secretKey = crypto.randomBytes(32).toString("hex");
    const computerNumber = getRandomNumber(0, 5);
    const hmac = generateHMAC(secretKey, computerNumber.toString());

    console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);
    console.log("Add your number modulo 6.");
    console.log("0 - 0");
    console.log("1 - 1");
    console.log("2 - 2");
    console.log("3 - 3");
    console.log("4 - 4");
    console.log("5 - 5");
    console.log("X - exit");
    console.log("? - help");

    const userInput = readlineSync.question("Your selection: ").trim();
    if (userInput.toLowerCase() === "x") {
        console.log("Game exited.");
        process.exit();
    }
    if (userInput === "?") {
        displayHelpTable();
        return fairThrow();
    }
    if (!["0", "1", "2", "3", "4", "5"].includes(userInput)) {
        throw new Error("Invalid input. Please select a number between 0 and 5.");
    }

    const userNumber = parseInt(userInput);
    const result = (computerNumber + userNumber) % 6;
    console.log(`My number is ${computerNumber} (KEY=${secretKey}).`);
    console.log(`The result is ${computerNumber} + ${userNumber} = ${result} (mod 6).`);
    
    return result;
}

function determineWinner(userDice, computerDice) {
    const computerThrow = computerDice[fairThrow()];
    console.log(`My throw is ${computerThrow}.`);

    console.log(`It's time for your throw.`);
    const userThrow = userDice[fairThrow()];
    console.log(`Your throw is ${userThrow}.`);

    if (userThrow > computerThrow) {
        console.log(`You win (${userThrow} > ${computerThrow})!`);
    } else if (userThrow < computerThrow) {
        console.log(`I win (${computerThrow} > ${userThrow})!`);
    } else {
        console.log("It's a tie!");
    }
}

function playGame(diceSets) {
    try {
        validateDiceInput(diceSets);
        const computerDice = diceSets[0];
        const userDiceSets = diceSets.slice(1);

        const userMovesFirst = determineFirstMove();
        let userDice;
        
        console.log("Choose your dice:");
        userDiceSets.forEach((dice, index) => {
            console.log(`${index} - ${dice.join(",")}`);
        });
        console.log("X - exit");
        console.log("? - help");

        const userChoice = readlineSync.question("Your selection: ").trim();
        if (userChoice.toLowerCase() === "x") {
            console.log("Game exited.");
            process.exit();
        }
        if (userChoice === "?") {
            displayHelpTable();
            return playGame(diceSets);
        }
        if (!userChoice.match(/^[0-9]+$/) || parseInt(userChoice) >= userDiceSets.length) {
            throw new Error("Invalid selection. Choose a valid dice set index.");
        }

        userDice = userDiceSets[parseInt(userChoice)];
        console.log(`You choose the [${userDice.join(",")}] dice.`);
        determineWinner(userDice, computerDice);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const args = process.argv.slice(2).map(arg => arg.split(",").map(Number));
playGame(args);
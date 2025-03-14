# Dice Game

## Introduction
This is a command-line-based dice game implemented in Node.js. The game uses cryptographic hashing (HMAC) to ensure fairness when determining moves and results. Players compete against the computer using different sets of dice, and the game determines a winner based on dice rolls.

## Features
- Fair randomness with cryptographic HMAC verification.
- Allows 3 or 4 sets of dice.
- Interactive user input and validation.
- Probability help table to assist with decision-making.
- Multiple test cases for different valid and invalid scenarios.

## Installation
Ensure you have Node.js installed on your system.

1. Clone this repository:
   ```sh
   git clone <repository-url>
   cd dice-game
   ```
2. Install dependencies (if any are required in future updates):
   ```sh
   npm install
   ```

## How to Play
The game is played via the command line.

### **Start the Game**
Run the following command:
```sh
node dice_game.js <dice_set1> <dice_set2> <dice_set3> [dice_set4]
```
Each dice set must contain exactly 6 numbers, separated by commas.

### **Examples of Valid Commands**
#### **Valid 4 Dice Sets:**
```sh
node dice_game.js 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6
```
#### **Valid 3 Dice Sets:**
```sh
node dice_game.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7
```

### **Invalid Input Examples**
#### **No Dice Provided:**
```sh
node dice_game.js
```
_Error: No dice provided. Please specify at least 3 dice._

#### **Only 2 Dice Sets Provided:**
```sh
node dice_game.js 1,2,3,4,5,6 1,2,3,4,5,6
```
_Error: At least 3 dice are required to play the game._

#### **Incorrect Number of Values in a Dice Set:**
```sh
node dice_game.js 1,2,3,4,5 1,2,3,4,5,6 1,2,3,4,5,6
```
_Error: Each die must have exactly 6 values._

#### **Non-Integer Value in Dice Set:**
```sh
node dice_game.js 1,2,three,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6
```
_Error: Dice values must be integers. Found: three_

#### **Incorrect Formatting (Spaces Instead of Commas):**
```sh
node dice_game.js "1 2 3 4 5 6"
```
_Error: Dice must be comma-separated (e.g., 1,2,3,4,5,6)._

### **Help Table (Probability of Winning)**
If you enter `?` at any input prompt, you will see a probability table like this:

```
Probability of the win for the user:
+-------------+-------------+-------------+-------------+
| User dice v | 2,2,4,4,9,9 | 1,1,6,6,8,8 | 3,3,5,5,7,7 |
+-------------+-------------+-------------+-------------+
| 2,2,4,4,9,9 | - (0.3333)  | 0.5556      | 0.4444      |
+-------------+-------------+-------------+-------------+
| 1,1,6,6,8,8 | 0.4444      | - (0.3333)  | 0.5556      |
+-------------+-------------+-------------+-------------+
| 3,3,5,5,7,7 | 0.5556      | 0.4444      | - (0.3333)  |
+-------------+-------------+-------------+-------------+
```

### **Gameplay Flow**
1. The game randomly determines who plays first.
2. The player selects a dice set.
3. The player and computer roll their dice.
4. The results are displayed, and the winner is determined based on the dice values.
5. The game repeats until the user exits.

### **Exit the Game**
At any prompt, enter `X` to exit the game:
```sh
Your selection: X
Game exited.
```

## Running Test Cases
You can run different scenarios to test the game as required in the project.
- Launch with valid dice sets
- Launch with incorrect parameters (invalid number of dice, non-integer values, etc.)
- Play multiple rounds with different dice configurations

---
Now you're ready to play! 🎲



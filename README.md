## Introduction
A simple web app for BonBon Cakery players to calculate recipe outcomes and optimize their creations without spending excessive amounts of creation points. 
It uses data from the Kairosoft Wiki to help predict ratings and results based on ingredient combos.

Note: Modifiers are based on predictions since the algorithm for Texture Up isn't publicly known. My best estimate is that Texture increases by 1 point for each additional ingredient.

![image](https://github.com/user-attachments/assets/b27ed595-80da-41be-b9d7-5d9d2580c616)


## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the project:

   ```shell
   git clone https://github.com/l-stockwell/term-deposit-calculator.git
   ```

1. Install the dependencies:

   ```shell
   yarn install
   ```

1. Start the application:

   ```shell
   yarn start
   ```

   This command will start the development server, and the app will open in your default web browser.

### Testing

1. Run the unit test suite:

   ```shell
   yarn test
   ```

## Features

- Simple user-friendly interface
- Clear buttons for easy input correction
- Real-time calculation display
- Adapts to different screen sizes

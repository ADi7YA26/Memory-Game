# Memory Game

A classic memory matching game built with vanilla JavaScript and styled using Tailwind CSS.

![gameui](https://github.com/user-attachments/assets/c365f636-aaff-410a-8daf-29351c1adf3c)



## About the Game

This is a simple web-based memory game where players flip over cards to find matching pairs. The goal is to match all pairs in the shortest amount of time or fewest moves.


## Features

* **Interactive Gameplay:** Click cards to flip them and reveal icon.
* **Matching Logic:** Automatically checks for matching pairs and keeps them revealed.
* **Fair Card Shuffling:** Employs the **Fisher-Yates (Knuth) shuffle algorithm** for true randomness in card placement.
* **Dynamic and secure card content:** Card data are dynamically rendered using JavaScript when flipped and are removed from the DOM when cards unflip, ensuring game content isn't exposed.
* **Performance Tracking:** Show your total moves and the elapsed time during gameplay.
* **Game Reset:** Easily restart the game to play again.
* **Responsive Design:** Adapts to various screen sizes for an optimal experience on desktop and mobile.
* **Vanilla JavaScript:** Pure JavaScript for core game logic, ensuring no external framework dependencies.


## Technologies Used

* **HTML5:** For the game's structure.
* **CSS3 (Tailwind CSS CLI):** For all styling and responsive design.
* **JavaScript (Vanilla JS):** For game logic, interactivity, DOM manipulation.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

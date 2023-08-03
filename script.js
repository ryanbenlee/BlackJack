var cardColours = ["red", "red", "black", "black"];
var suits = ["♥️", "♦️", "♣️", "♠️"];
var cardDeck = [];
var finalDeck = [];
var finalDeckShuffle = [];
var outputMessage = "";
var button = document.querySelector("#submit-button");
button.innerText;
button.innerText = "Shuffle Deck";

//Player Decks
playerOneDeck = [];
dealerHand = [];

// Game Modes
var GAME_START = "Game mode: Game Starts";
var GAME_DRAWN = "Game mode: Cards are Drawn";
var GAME_HIT_OR_STAND = "Game mode: Hit or stand";
var gameMode = GAME_START;
var gameResults = false;

var main = function (input) {
  // FIRST CLICK
  if (gameMode === GAME_START) {
    // Generate and Shuffle Deck
    var finalDeck = generateDeck();
    console.log("Deck", finalDeck);
    finalDeckShuffle = shuffleDeck(finalDeck);
    console.log("Final Deck Shuffle", finalDeckShuffle);
    // Deal 2 two cards to player 1 and dealer
    playerOneDeck.push(finalDeckShuffle.pop());
    playerOneDeck.push(finalDeckShuffle.pop());
    dealerHand.push(finalDeckShuffle.pop());
    dealerHand.push(finalDeckShuffle.pop());

    console.log("Player One", playerOneDeck);
    console.log("Dealer Hand", dealerHand);
    console.log("Final Deck Shuffle", finalDeckShuffle);

    // update Game Mode
    gameMode = GAME_DRAWN;
    console.log(gameMode);
    button.innerText;
    button.innerText = "Evaluate Cards";

    // Return Output Message
    outputMessage = "Everyone has been dealt their hand.";
    return outputMessage;
  }
  // SECOND CLICK (playerOne)
  if (gameMode === GAME_DRAWN) {
    // Check For Blackjack
    var playerOneHasBlackJack = checkForBlackJack(playerOneDeck);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log("does player have blackjack?", playerOneHasBlackJack);
    console.log("does dealer have blackjack?", dealerHasBlackJack);

    if (playerOneHasBlackJack === true || dealerHasBlackJack === true) {
      // both player one and dealer has blackjack
      if (playerOneHasBlackJack === true && dealerHasBlackJack === true) {
        outputMessage =
          displayHand(playerOneDeck, dealerHand) +
          "<b>It is a Blackjack tie!</b> <br><br> Refresh the page to play again.";
      }
      // only player one has blackjack --> player one wins
      if (playerOneHasBlackJack === true && dealerHasBlackJack === false) {
        outputMessage =
          displayHand(playerOneDeck, dealerHand) +
          "<b>Player wins with Blackjack! <br><br> Refresh the page to play again.";
      }
      // only dealer has blackjack --> dealer wins
      if (playerOneHasBlackJack === false && dealerHasBlackJack === true) {
        outputMessage =
          displayHand(playerOneDeck, dealerHand) +
          "<b>Dealer wins with Blackjack! <br><br> Refresh the page to play again.";
      }
    } else {
      outputMessage =
        displayHand(playerOneDeck, dealerHand) +
        "There is no Blackjack. Let's keep going! <br><br> <b>Please input 'hit' or 'stand'.</b>";

      // change game mode
      gameMode = GAME_HIT_OR_STAND;
      button.innerText;
      button.innerText = "Hit or Stand";

      console.log(gameMode);
      // appropriate output message}
      return outputMessage;
    }
  }
  // THIRD CLICK ETC. (hit or stand)
  if (gameMode === GAME_HIT_OR_STAND) {
    // VERSION 2 ==> extra game mode
    // 1. Hit or Stand
    if (input === "hit") {
      playerOneDeck.push(finalDeckShuffle.pop());
      console.log("Final Deck Shuffle", finalDeckShuffle);
      // find total hand
      var totalPlayerHandValue = calculateHand(playerOneDeck);
      var totalDealerHandValue = calculateHand(dealerHand);

      if (totalPlayerHandValue > 21) {
        gameResults = true;
        outputMessage =
          displayHand(playerOneDeck, dealerHand) +
          "<b>It's a bust!</b> You lose. <br><br> Refresh the page to play again.";
      } else
        outputMessage =
          displayHand(playerOneDeck, dealerHand) +
          "You just drew another card. <br><b>Please input 'hit' or 'stand'.</b>";
    } else if (input === "stand") {
      gameResults = true;
      // Calculate Hand Value of both player and dealer
      var totalPlayerHandValue = calculateHand(playerOneDeck);
      var totalDealerHandValue = calculateHand(dealerHand);

      // Deler hit or stand only after player stands
      // if dealer hand value is less than 17, dealer hits
      // if dealer hand value is more than 17, dealer stands

      while (totalDealerHandValue < 17) {
        dealerHand.push(finalDeckShuffle.pop());
        totalDealerHandValue = calculateHand(dealerHand);
      }

      // same value --> tie
      if (totalPlayerHandValue === totalDealerHandValue) {
        outputMessage =
          displayHand(playerOneDeck, dealerHand) +
          "<b>Its a tie!</b> <br><br> Refresh the page to play again.";
      }
      // player One higher value hand --> player One win
      else if (totalPlayerHandValue > totalDealerHandValue) {
        outputMessage =
          displayHand(playerOneDeck, dealerHand) +
          "<b>Player wins!</b> <br><br> Refresh the page to play again.";
      }
      // dealer higher value hand --> dealer win
      else if (totalPlayerHandValue < totalDealerHandValue) {
        outputMessage =
          displayHand(playerOneDeck, dealerHand) +
          "<b>Dealer wins!</b> <br><br> Refresh the page to play again.";
      }
    } else
      outputMessage =
        "Wrong input. <br><b>Please input 'hit' or 'stand'." +
        displayHand(playerOneDeck, dealerHand);
  }
  return outputMessage;
};

// Generate a Card Deck
var counter = 0;
var generateDeck = function () {
  while (counter < suits.length) {
    var cardSuit = suits[counter];
    cardColour = cardColours[counter];

    var rankingCounter = 1;
    while (rankingCounter <= 13) {
      var cardRank = rankingCounter;
      var cardNumber = rankingCounter;
      // rename ace, jack, queen and king
      if (cardRank == 1) {
        cardRank = "Ace";
      } else if (cardRank == 11) {
        cardRank = "Jack";
      } else if (cardRank == 12) {
        cardRank = "Queen";
      } else if (cardRank == 13) {
        cardRank = "King";
      }

      var card = {
        colour: cardColour,
        suit: cardSuit,
        rank: cardRank,
        number: cardNumber,
      };
      cardDeck.push(card);
      rankingCounter += 1;
    }
    counter += 1;
  }
  return cardDeck;
};

// randomize the card deck
var shuffleDeck = function (input) {
  var counter = 0;
  while (counter < input.length) {
    var indexToSwapWith = Math.floor(Math.random() * 52);
    // This will give us numbers 0 - 51
    var currentCard = input[counter];
    var randomCard = input[indexToSwapWith];

    input[counter] = randomCard;
    input[indexToSwapWith] = currentCard;
    counter += 1;
  }
  return input;
};

// Check for BlackJack
var checkForBlackJack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  if (
    (playerCardOne.number == 1 && playerCardTwo.number >= 10) ||
    (playerCardTwo.number == 1 && playerCardOne.number >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

// Calculate Total Hand Value
var calculateHand = function (handArray) {
  var totalHandValue = 0;
  // loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    if (
      currentCard.number === 11 ||
      currentCard.number === 12 ||
      currentCard.number === 13
    ) {
      totalHandValue = totalHandValue + 10;
    } else {
      totalHandValue = totalHandValue + currentCard.number;
    }
    index += 1;
  }
  return totalHandValue;
};

// Function that displays the Player or dealers hand
var displayHand = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player hand: <br>";
  var totalPlayerScore = calculateHand(playerHandArray);
  var totalDealerScore = calculateHand(dealerHandArray);
  var index = 0;
  if (gameResults === true) {
    while (index < playerHandArray.length) {
      playerMessage =
        playerMessage +
        "- " +
        playerHandArray[index].rank +
        " of " +
        playerHandArray[index].suit +
        "<br>";
      index += 1;
    }
    var dealerMessage = "Dealer hand: <br> ";
    index = 0;
    while (index < dealerHandArray.length) {
      dealerMessage =
        dealerMessage +
        "- " +
        dealerHandArray[index].rank +
        " of " +
        dealerHandArray[index].suit +
        "<br>";
      index += 1;
    }
    finalMessage =
      playerMessage +
      "<br> Player score: " +
      totalPlayerScore +
      "<br><br>" +
      dealerMessage +
      "<br> Dealer score: " +
      totalDealerScore +
      "<br><br>";
  } else {
    while (index < playerHandArray.length) {
      playerMessage =
        playerMessage +
        "- " +
        playerHandArray[index].rank +
        " of " +
        playerHandArray[index].suit +
        "<br>";
      index += 1;
    }

    var dealerMessage = "Dealer hand: <br> - ? <br>";
    index = 1;
    while (index < dealerHandArray.length) {
      dealerMessage =
        dealerMessage +
        "- " +
        dealerHandArray[index].rank +
        " of " +
        dealerHandArray[index].suit +
        "<br>";
      index += 1;
    }
    finalMessage =
      playerMessage +
      "<br> Player score: " +
      totalPlayerScore +
      "<br><br>" +
      dealerMessage +
      "<br> Dealer score: ? <br><br>";
  }

  return finalMessage;
};

const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your own bot token obtained from BotFather
const bot = new TelegramBot("6204554684:AAExuZoUn9FKEc6uNr2suTOX7lFAgykSCPc", {
  polling: true,
});

// Replace 'YOUR_CHAT_ID' with your own Telegram chat ID
const chatId = "5093515291";

// Function to fetch free game information from the Epic Games Store
async function fetchFreeGame() {
  try {
    const response = await axios.get(
      "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions"
    );
    const data = response.data;

    // Extract the list of free games
    const freeGames = data.data.Catalog.searchStore.elements;

    // Iterate over the free games and send a notification for each game
    for (const game of freeGames) {
      const title = game.title;
      const imageUrl = game.keyImages[0].url;

      // Send a message with the game title and image to the specified chat ID
      bot.sendPhoto(chatId, imageUrl, { caption: title });
    }
  } catch (error) {
    console.error("Failed to fetch free games:", error.message);
  }
}

// Schedule the function to run every day at a specific time (adjust as needed)
//setInterval(fetchFreeGame, 10000);

// Start the bot
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  fetchFreeGame();
  // Send a welcome message to the user
  bot.sendMessage(
    chatId,
    "Welcome! I will send you notifications about free games from the Epic Games Store."
  );
});

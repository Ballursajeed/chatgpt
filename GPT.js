// GPT.js

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");
  const inputField = document.querySelector(".input-container input");
  const chatOutput = document.getElementById("output");
  const historyContainer = document.querySelector(".history");
  const newChatButton = document.querySelector(".sidebar button");

  // Array to store user's chat history
  const userChatHistory = [];

  // Function to clear the chat history and input field
  function clearChat() {
    userChatHistory.length = 0; // Clear user's chat history
    chatOutput.innerHTML = ""; // Clear the chat output
    inputField.value = ""; // Clear the input field
  }

  // Event listener for the "New Chat" button
  newChatButton.addEventListener("click", function () {
    clearChat(); // Call the function to clear the chat
  });

  submitButton.addEventListener("click", function () {
    const message = inputField.value.trim();

    if (message !== "") {
      // Format the user's message
      const formattedUserMessage = `you: ${message}`;

      // Create a new message element for the user's message
      const userMessageElement = document.createElement("div");
      userMessageElement.classList.add("message", "user");
      userMessageElement.textContent = formattedUserMessage;

      // Append the user's message to the chat output
      chatOutput.appendChild(userMessageElement);

      // Add the user's message to the user's chat history
      userChatHistory.push(message);

      // Clear the input field
      inputField.value = "";

      // Simulate a reply for common chats
      const commonReply = getCommonReply(message);
      if (commonReply) {
        // Format the chatbot's reply
        const formattedChatbotReply = `chatbot: ${commonReply}`;

        const replyMessageElement = document.createElement("div");
        replyMessageElement.classList.add("message", "reply");
        replyMessageElement.textContent = formattedChatbotReply;

        // Append the reply to the chat output
        chatOutput.appendChild(replyMessageElement);
      }

      // Update the history container in the sidebar
      updateHistoryContainer();
    }
  });

  // Handle pressing the Enter key in the input field
  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Prevent the default form submission
      event.preventDefault();

      // Trigger the click event on the submit button
      submitButton.click();
    }
  });

  // Common chat replies logic (customize as needed)
  function getCommonReply(message) {
    message = message.toLowerCase();

    // Define different chat scenarios and their responses
    const chatScenarios = {
      "hi": "Hi, I'm a ChaitanyaGPT , Made by Sajeed",
      "hello": "Hi there!",
      "how are you?": "I'm just a chatbot, but I'm doing well. How can I assist you?",
      "what's the weather like today?": "I'm sorry, I don't have access to real-time weather information.",
      "tell me a joke": "Sure, here's one: Why don't scientists trust atoms? Because they make up everything!",
      "who won the World Series in 2020?": "The Los Angeles Dodgers won the World Series in 2020.",
      "how to bake a cake": "Baking a cake requires flour, eggs, sugar, and more. Would you like a detailed recipe?",
      // Add more chat scenarios and responses here
    };

    // Check if the message matches any known scenario
    for (const scenario in chatScenarios) {
      if (message.includes(scenario)) {
        return chatScenarios[scenario];
      }
    }

    // If no match is found, return a default response
    return "I'm not sure I understand. Could you please rephrase your question?";
  }

  // Function to update the history container in the sidebar
  function updateHistoryContainer() {
    historyContainer.innerHTML = ""; // Clear the history container

    // Iterate through user's chat history and create history messages
    for (const message of userChatHistory) {
      const historyMessageElement = document.createElement("p");
      historyMessageElement.classList.add("history-message");
      historyMessageElement.textContent = message;

      // Append history message to the history container
      historyContainer.appendChild(historyMessageElement);
    }
  }
});

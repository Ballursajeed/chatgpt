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
      "hi": "Hi, I'm a ChaitanyaGPT , Made by Sajeed and Srinivas",
       "who are you":"I'm a chatGPT clone chat bot, i'm here to make chat with you ,tell me what can i assist you? ", 
      "who is the president of india":"Droupadi Murmu is the president of india",
      "who is the prime minister of india":"Narendra Modi is the prime minister of india",
  "who is the chief minister of karnataka":"Siddharamaya is chief minister of india",
  "what is the capital city of india":"Dehli is the capatal city of india",
      "hello": "Hi there! i am a chatGPT clone but,tell me what can i assist you?",
      "how are you?": "I'm just a chatbot, but I'm doing well. How can I assist you?",
      "what's the weather like today?": "I'm sorry, I don't have access to real-time weather information.",
      "tell me a joke": "Sure, here's one: Why don't scientists trust atoms? Because they make up everything!",
      "who won the World Series in 2020?": "The Los Angeles Dodgers won the World Series in 2020.",
      "how to bake a cake": "Baking a cake requires flour, eggs, sugar, and more. Would you like a detailed recipe?",
      "what's your favorite color?": "I don't have personal preferences, but I can help you with questions or tasks.",
  "can you recommend a good book?": "Of course! What genre are you interested in?",
  "tell me a fun fact": "Sure, here's one: Honey never spoils. Archaeologists have even found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "do you dream?": "No, I don't dream. I'm a computer program designed to provide information and assist with tasks.",
  "what's the meaning of life?": "The meaning of life is a philosophical question that has been debated for centuries. It can vary from person to person, but some believe it's about finding happiness, purpose, or making a positive impact on the world.",
  "tell me a riddle": "Certainly! Here's a riddle: I'm not alive, but I can grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
  "where do you live?": "I exist in the digital realm, so you can find me wherever you have internet access.",
  "what's the capital of France?": "The capital of France is Paris.",
  "tell me a science fact": "Sure, here's one: A day on Venus (one rotation on its axis) is longer than a year on Venus (one orbit around the sun). Venus has an extremely slow rotation, taking about 243 Earth days to complete one day-night cycle.",
  "do you have any siblings?": "I'm a standalone program, so I don't have siblings in the traditional sense.",
  "what's the largest mammal in the world?": "The blue whale is the largest mammal on Earth, growing up to 100 feet (30 meters) in length and weighing as much as 200 tons.",
  "how do you make a paper airplane?": "To make a simple paper airplane, fold a piece of paper in half lengthwise, then unfold it. Fold the top edges down to the center crease, forming a triangle. Then, fold the triangle down along the center crease to create the body of the plane. Finally, fold the wings down at a slight angle, and your paper airplane is ready to fly!",
  "what's the speed of light?": "The speed of light in a vacuum is approximately 299,792,458 meters per second, or about 186,282 miles per second.",
  "tell me a famous quote": "Certainly! Here's one by Albert Einstein: 'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.'",
  "what's the first element on the periodic table?": "The first element on the periodic table is hydrogen, with the symbol H and atomic number 1.",
  "can you sing a song for me?": "I'm just a text-based chatbot, so I can't sing, but I can provide lyrics or information about songs and music.",
  "what's the tallest mountain in the world?": "The tallest mountain in the world is Mount Everest, which stands in the Himalayas on the border between Nepal and China. It reaches an elevation of 29,032 feet (8,849 meters) above sea level.",
  "tell me a famous painting": "One of the most famous paintings in the world is the Mona Lisa, created by Leonardo da Vinci. It's known for the subject's enigmatic smile and is housed in the Louvre Museum in Paris.",
  "how do I learn programming?": "Learning programming can be a rewarding journey. You can start by choosing a programming language that interests you, like Python or JavaScript, and then explore online tutorials, courses, and practice coding regularly to build your skills.",
  "what's the largest desert in the world?": "The largest desert in the world is the Antarctic Desert, followed by the Arctic Desert. These icy deserts cover vast areas in Antarctica and the Arctic region.",
  "do you have any pets?": "I don't have any pets, but I can provide information and advice on pet care if you'd like.",
  "what's the most spoken language in the world?": "Mandarin Chinese is the most spoken language in the world by the number of native speakers.",
  "tell me a cooking tip": "Sure! When cooking meat, especially steak, let it rest for a few minutes after removing it from the heat. This allows the juices to redistribute, resulting in a juicier and more flavorful dish.",
  "what's your favorite movie?": "I don't have personal preferences, but I can recommend movies based on your interests.",
  "how do I create a strong password?": "A strong password typically includes a mix of upper and lower case letters, numbers, and special characters. It should be at least 12 characters long and avoid easily guessable information like birthdays or common words.",
  "what's the most distant planet from the Sun?": "The most distant planet from the Sun in our solar system is Neptune.",
  "tell me a space fact": "Sure, here's one: The Milky Way galaxy, which is our galaxy, is estimated to contain over 100 billion stars.",
  "what's the difference between a fruit and a vegetable?": "In botanical terms, a fruit is the mature ovary of a flowering plant, usually containing seeds. Vegetables are edible parts of plants that are not fruits, such as leaves (lettuce), roots (carrots), and stems (celery).",
  "do you like pizza?": "I don't have personal tastes, but pizza is a popular and versatile food enjoyed by many people around the world.",
  "tell me a travel destination": "One beautiful travel destination is the Amalfi Coast in Italy, known for its stunning coastal views, colorful cliffside villages, and delicious Italian cuisine.",
  "how do I start a blog?": "Starting a blog involves choosing a niche, selecting a blogging platform, setting up a website, creating valuable content, and promoting your blog to build an audience.",
  "what's the smallest planet in our solar system?": "The smallest planet in our solar system is Mercury.",
  "tell me a historical fact": "Certainly! Did you know that the Great Wall of China is not a single continuous wall but a series of walls and fortifications built over different dynasties?",
  "how do I take care of indoor plants?": "Indoor plants require proper watering, adequate light, and occasional fertilization. Be sure to research the specific care needs of the plants you have, as they can vary.",
  "what's the longest river in the world?": "The longest river in the world is the Nile River, located in northeastern Africa.",
  "tell me a book recommendation": "I recommend 'To Kill a Mockingbird' by Harper Lee if you enjoy classic literature. It's a powerful story about racial injustice and moral growth.",
  "how does Wi-Fi work?": "Wi-Fi uses radio waves to transmit data between devices and a wireless router. The router sends and receives signals, allowing devices to connect to the internet wirelessly.",
  "what's the largest ocean in the world?": "The largest ocean in the world is the Pacific Ocean.",
  "tell me a technology fact": "Sure, here's one: The first computer mouse was made of wood and had two metal wheels. It was invented by Douglas Engelbart in 1964.",
  "how do I learn a new language?": "Learning a new language takes practice and dedication. You can start by taking language courses, using language learning apps, and practicing with native speakers if possible.",
  "what's the difference between weather and climate?": "Weather refers to short-term atmospheric conditions, while climate represents long-term patterns and averages of temperature, precipitation, and other weather elements in a specific region.",
  "tell me a famous inventor": "One famous inventor is Thomas Edison, known for inventing the phonograph, the incandescent light bulb, and numerous other electrical devices.",
  "what's the largest animal on Earth?": "The largest animal on Earth is the blue whale, which can reach lengths of up to 100 feet (30 meters) and weigh as much as 200 tons.",
  "how do I improve my memory?": "Improving memory involves strategies like staying mentally active, getting enough sleep, eating a healthy diet, and practicing memory exercises.",
  "what's the deepest part of the ocean?": "The deepest part of the ocean is the Challenger Deep in the Mariana Trench, which reaches a depth of approximately 36,070 feet (10,994 meters).",
  "tell me a famous quote from a movie": "Here's a classic movie quote from 'The Godfather': 'I'm gonna make him an offer he can't refuse.'",
  "how does photosynthesis work?": "Photosynthesis is the process by which green plants and some other organisms convert light energy, carbon dioxide, and water into glucose (a form of sugar) and oxygen, using the energy from sunlight.",
  "what's the smallest mammal in the world?": "The bumblebee bat, also known as Kitti's hog-nosed bat, holds the title for the smallest mammal in the world by length.",
  "tell me a fun science experiment to try at home": "You can try the classic 'mentos and soda' experiment. Drop a few mentos candies into a bottle of carbonated soda, and watch the explosive reaction!",
  "what's the capital of Japan?": "The capital of Japan is Tokyo.",
  "do you believe in aliens?": "I don't have beliefs or opinions, but the existence of extraterrestrial life is a topic of scientific inquiry and speculation.",
  "tell me a famous musician": "One famous musician is Ludwig van Beethoven, a renowned composer and pianist known for his classical music compositions.",
  "how do I start a podcast?": "Starting a podcast involves planning your content, acquiring the necessary equipment, recording and editing episodes, and publishing them on podcast platforms.",
  "what's the most populous country in the world?": "The most populous country in the world is China, with over 1.4 billion people.",
  "tell me a food fact": "Sure, here's one: Honey is the only food that doesn't spoil. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "how do I stay motivated?": "Staying motivated can be challenging, but setting clear goals, breaking them into smaller tasks, and finding inspiration can help maintain motivation.",
  "what's the longest river in the United States?": "The longest river in the United States is the Missouri River, which stretches for about 2,341 miles (3,767 kilometers).",
  "tell me an interesting animal fact": "Did you know that octopuses have three hearts? Two pump blood to the gills, while the third pumps it to the rest of the body.",
  "what's the difference between a comet and an asteroid?": "Comets are icy bodies that develop a bright, glowing tail when they approach the Sun, while asteroids are rocky or metallic objects that orbit the Sun and do not have tails.",
  "do you have any hobbies?": "I don't have hobbies, but I'm here to assist with your questions and engage in conversations.",
  "tell me a famous historical event": "One famous historical event is the moon landing of Apollo 11 in 1969 when astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the moon.",
  "how do I start a small business?": "Starting a small business involves creating a business plan, securing financing, registering your business, and developing a marketing strategy.",
  "what's the most abundant gas in Earth's atmosphere?": "The most abundant gas in Earth's atmosphere is nitrogen, which makes up about 78% of the air we breathe.",
  "tell me a gardening tip": "When planting flowers or vegetables, it's important to choose the right location with adequate sunlight and well-draining soil for optimal growth.",
  "what's the fastest land animal?": "The cheetah is the fastest land animal, capable of running at speeds of up to 70 miles per hour (112 kilometers per hour) in short bursts.",
  "how do I start a fitness routine?": "Starting a fitness routine involves setting fitness goals, choosing activities you enjoy, creating a workout plan, and staying consistent with your workouts.",
  "what's the tallest tree in the world?": "The tallest tree in the world is Hyperion, a coast redwood (Sequoia sempervirens) that stands at a height of 379.7 feet (115.7 meters).",
  "tell me a famous quote from a historical figure": "Here's a quote from Mahatma Gandhi: 'You must be the change you wish to see in the world.'",
  "how do I cook perfect rice?": "To cook perfect rice, use the right ratio of water to rice, bring it to a boil, then reduce the heat to low, cover, and let it simmer until the water is absorbed and the rice is tender.",
  "what's the largest volcano in the world?": "The largest volcano in the world, both in terms of height and volume, is Mauna Loa, located in Hawaii. It stands about 13,678 feet (4,169 meters) above sea level, and its volume is immense.",
  "tell me a space exploration fact": "Sure, here's one: The Voyager 1 spacecraft, launched by NASA in 1977, became the first human-made object to enter interstellar space in 2012. It continues to transmit data back to Earth from beyond our solar system.",
  "what's the most widely spoken language in Africa?": "The most widely spoken language in Africa is Arabic, due to its prevalence in North African countries.",
  "tell me a famous athlete": "One famous athlete is Usain Bolt, a Jamaican sprinter known for holding multiple world records in track and field events.",
  "how do I start a blog?": "Starting a blog involves choosing a niche, selecting a blogging platform, setting up a website, creating valuable content, and promoting your blog to build an audience.",
  "what's the smallest planet in our solar system?": "The smallest planet in our solar system is Mercury.",
  "tell me a historical fact": "Certainly! Did you know that the Great Wall of China is not a single continuous wall but a series of walls and fortifications built over different dynasties?",
  "how do I take care of indoor plants?": "Indoor plants require proper watering, adequate light, and occasional fertilization. Be sure to research the specific care needs of the plants you have, as they can vary.",
  "what's the longest river in the world?": "The longest river in the world is the Nile River, located in northeastern Africa.",
  "tell me a book recommendation": "I recommend 'To Kill a Mockingbird' by Harper Lee if you enjoy classic literature. It's a powerful story about racial injustice and moral growth.",
  "how does Wi-Fi work?": "Wi-Fi uses radio waves to transmit data between devices and a wireless router. The router sends and receives signals, allowing devices to connect to the internet wirelessly.",
  "what's the largest ocean in the world?": "The largest ocean in the world is the Pacific Ocean.",
  "tell me a technology fact": "Sure, here's one: The first computer mouse was made of wood and had two metal wheels. It was invented by Douglas Engelbart in 1964.",
  "how do I learn a new language?": "Learning a new language takes practice and dedication. You can start by taking language courses, using language learning apps, and practicing with native speakers if possible.",
  "what's the difference between weather and climate?": "Weather refers to short-term atmospheric conditions, while climate represents long-term patterns and averages of temperature, precipitation, and other weather elements in a specific region.",
  "tell me a famous inventor": "One famous inventor is Thomas Edison, known for inventing the phonograph, the incandescent light bulb, and numerous other electrical devices.",
  "what's the largest animal on Earth?": "The largest animal on Earth is the blue whale, which can reach lengths of up to 100 feet (30 meters) and weigh as much as 200 tons.",
  "how do I improve my memory?": "Improving memory involves strategies like staying mentally active, getting enough sleep, eating a healthy diet, and practicing memory exercises.",
  "what's the deepest part of the ocean?": "The deepest part of the ocean is the Challenger Deep in the Mariana Trench, which reaches a depth of approximately 36,070 feet (10,994 meters).",
  "tell me a famous quote from a movie": "Here's a classic movie quote from 'The Godfather': 'I'm gonna make him an offer he can't refuse.'",
  "how does photosynthesis work?": "Photosynthesis is the process by which green plants and some other organisms convert light energy, carbon dioxide, and water into glucose (a form of sugar) and oxygen, using the energy from sunlight.",
  "what's the smallest mammal in the world?": "The bumblebee bat, also known as Kitti's hog-nosed bat, holds the title for the smallest mammal in the world by length.",
  "tell me a fun science experiment to try at home": "You can try the classic 'mentos and soda' experiment. Drop a few mentos candies into a bottle of carbonated soda, and watch the explosive reaction!",
  "what's the capital of Japan?": "The capital of Japan is Tokyo.",
  "do you believe in aliens?": "I don't have beliefs or opinions, but the existence of extraterrestrial life is a topic of scientific inquiry and speculation.",
  "tell me a famous musician": "One famous musician is Ludwig van Beethoven, a renowned composer and pianist known for his classical music compositions.",
  "how do I start a podcast?": "Starting a podcast involves planning your content, acquiring the necessary equipment, recording and editing episodes, and publishing them on podcast platforms.",
  "what's the most populous country in the world?": "The most populous country in the world is China, with over 1.4 billion people.",
  "tell me a food fact": "Sure, here's one: Honey is the only food that doesn't spoil. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "how do I stay motivated?": "Staying motivated can be challenging, but setting clear goals, breaking them into smaller tasks, and finding inspiration can help maintain motivation.",
  "what's the longest river in the United States?": "The longest river in the United States is the Missouri River, which stretches for about 2,341 miles (3,767 kilometers).",
  "tell me an interesting animal fact": "Did you know that octopuses have three hearts? Two pump blood to the gills, while the third pumps it to the rest of the body.",
  "what's the difference between a comet and an asteroid?": "Comets are icy bodies that develop a bright, glowing tail when they approach the Sun, while asteroids are rocky or metallic objects that orbit the Sun and do not have tails.",
  "do you have any hobbies?": "I don't have hobbies, but I'm here to assist with your questions and engage in conversations.",
  "tell me a famous historical event": "One famous historical event is the moon landing of Apollo 11 in 1969 when astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the moon.",
  "how do I start a small business?": "Starting a small business involves creating a business plan, securing financing, registering your business, and developing a marketing strategy.",
  "what's the most abundant gas in Earth's atmosphere?": "The most abundant gas in Earth's atmosphere is nitrogen, which makes up about 78% of the air we breathe.",
  "tell me a gardening tip": "When planting flowers or vegetables, it's important to choose the right location with adequate sunlight and well-draining soil for optimal growth.",
  "what's the fastest land animal?": "The cheetah is the fastest land animal, capable of running at speeds of up to 70 miles per hour (112 kilometers per hour) in short bursts.",
  "how do I start a fitness routine?": "Starting a fitness routine involves setting fitness goals, choosing activities you enjoy, creating a workout plan, and staying consistent with your workouts.",
  "what's the tallest tree in the world?": "The tallest tree in the world is Hyperion, a coast redwood (Sequoia sempervirens) that stands at a height of 379.7 feet (115.7 meters).",
  "tell me a famous quote from a historical figure": "Here's a quote from Mahatma Gandhi: 'You must be the change you wish to see in the world.'",
  "how do I cook perfect rice?": "To cook perfect rice, use the right ratio of water to rice, bring it to a boil, then reduce the heat to low, cover, and let it simmer until the water is absorbed and the rice is tender.",
  "what's the largest volcano in the world?": "The largest volcano in the world, both in terms of height and volume, is Mauna Loa, located in Hawaii. It stands about 13,678 feet (4,169 meters) above sea level, and its volume is immense.",
  "tell me a space exploration fact": "Sure, here's one: The Voyager 1 spacecraft, launched by NASA in 1977, became the first human-made object to enter interstellar space in 2012. It continues to transmit data back to Earth from beyond our solar system.",
  "what's the most widely spoken language in Africa?": "The most widely spoken language in Africa is Arabic, due to its prevalence in North African countries.",
  "tell me a famous athlete": "One famous athlete is Usain Bolt, a Jamaican sprinter known for holding multiple world records in track and field events.",
  "how do I start a blog?": "Starting a blog involves choosing a niche, selecting a blogging platform, setting up a website, creating valuable content, and promoting your blog to build an audience.",
  "what's the smallest planet in our solar system?": "The smallest planet in our solar system is Mercury.",
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startChat);
});

function startChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Clear previous messages

    const messages = [
        'Bonjour! Je suis votre assistant virtuel.',
        'Comment puis-je vous aider aujourd\'hui?'
    ];

    let index = 0;

    function displayNextMessage() {
        if (index < messages.length) {
            const message = document.createElement('div');
            message.className = 'message bot';
            message.innerText = messages[index];
            chatBox.appendChild(message);
            index++;
            setTimeout(displayNextMessage, 1000); // Delay for next message
        } else {
            askQuestion();
        }
    }

    displayNextMessage();
}

function askQuestion() {
    const chatBox = document.getElementById('chat-box');
    const question = document.createElement('div');
    question.className = 'message bot';
    question.innerText = 'Quelle est votre couleur préférée?';
    chatBox.appendChild(question);

    const options = ['Rouge', 'Bleu', 'Vert'];
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => respond(option);
        chatBox.appendChild(button);
    });
}

function respond(answer) {
    const chatBox = document.getElementById('chat-box');
    const userResponse = document.createElement('div');
    userResponse.className = 'message user';
    userResponse.innerText = answer;
    chatBox.appendChild(userResponse);

    setTimeout(() => {
        const botResponse = document.createElement('div');
        botResponse.className = 'message bot';
        botResponse.innerText = 'Merci pour votre réponse!';
        chatBox.appendChild(botResponse);
    }, 1000);
}

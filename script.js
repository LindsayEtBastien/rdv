document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startChat);
});

function startChat() {
    const chatBox = document.getElementById('chat-box');
    const inputBox = document.getElementById('input-box');

    // Clear the chatbox and remove the start button
    chatBox.innerHTML = '';
    inputBox.innerHTML = '';

    const conversationFlow = [
        {
            question: 'Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider ?',
            options: ['Informations', 'Assistance technique', 'Autre']
        },
        {
            question: 'Pouvez-vous préciser votre demande ?',
            options: ['Problème de connexion', 'Problème de paiement', 'Retour produit']
        },
        {
            question: 'Merci pour les détails ! Un agent vous contactera bientôt.',
            options: []
        }
    ];

    let step = 0;

    function showMessage(message, sender = 'bot') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerText = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    function showOptions(options) {
        inputBox.innerHTML = ''; // Clear old options
        options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => handleUserResponse(option);
            inputBox.appendChild(button);
        });
    }

    function handleUserResponse(userResponse) {
        showMessage(userResponse, 'user');
        setTimeout(() => {
            step++;
            if (step < conversationFlow.length) {
                const nextStep = conversationFlow[step];
                showMessage(nextStep.question);
                if (nextStep.options.length > 0) {
                    showOptions(nextStep.options);
                }
            } else {
                showMessage('La conversation est terminée. Merci de nous avoir contactés !');
                inputBox.innerHTML = ''; // Clear options
            }
        }, 1000);
    }

    // Start the conversation
    const firstStep = conversationFlow[step];
    showMessage(firstStep.question);
    showOptions(firstStep.options);
}

function handleResponse(option) {
    const chatbotBody = document.getElementById('chatbot-body');
    const response = document.createElement('div');
    response.classList.add('chatbot-message', 'response');

    let responseText;
    switch (option) {
        case 1:
            responseText = `Vous avez sélectionné l'Option 1. Voici une réponse détaillée pour l'Option 1.`;
            break;
        case 2:
            responseText = `Vous avez sélectionné l'Option 2. Voici une réponse détaillée pour l'Option 2.`;
            break;
        case 3:
            responseText = `Vous avez sélectionné l'Option 3. Voici une réponse détaillée pour l'Option 3.`;
            break;
        default:
            responseText = `Option invalide.`;
    }

    response.innerHTML = `<p>${responseText}</p>`;
    chatbotBody.appendChild(response);
}

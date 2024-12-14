function showSectors() {
    document.getElementById('sectors').style.display = 'flex';
}

function handleResponse(sector) {
    const chatbotBody = document.getElementById('chatbot-body');

    // Ajouter l'animation de réflexion
    const thinking = document.createElement('div');
    thinking.classList.add('chatbot-message', 'thinking');
    thinking.innerHTML = '<span></span><span></span><span></span>';
    chatbotBody.appendChild(thinking);

    // Ajouter un délai avant de donner la réponse
    setTimeout(() => {
        // Supprimer l'animation de réflexion
        chatbotBody.removeChild(thinking);

        // Ajouter la réponse
        const response = document.createElement('div');
        response.classList.add('chatbot-message', 'bot');

        let responseText;
        switch (sector) {
            case 'N’importe':
                responseText = `Vous avez sélectionné N’importe. Voici une réponse détaillée pour N’importe.`;
                break;
            case 'Marketing':
                responseText = `Vous avez sélectionné Marketing. Voici une réponse détaillée pour Marketing.`;
                break;
            case 'Secrétariat':
                responseText = `Vous avez sélectionné Secrétariat. Voici une réponse détaillée pour Secrétariat.`;
                break;
            case 'Informatique':
                responseText = `Vous avez sélectionné Informatique. Voici une réponse détaillée pour Informatique.`;
                break;
            case 'Bâtiment':
                responseText = `Vous avez sélectionné Bâtiment. Voici une réponse détaillée pour Bâtiment.`;
                break;
            case 'Tourisme':
                responseText = `Vous avez sélectionné Tourisme. Voici une réponse détaillée pour Tourisme.`;
                break;
            default:
                responseText = `Option invalide.`;
        }

        response.innerHTML = `<p>${responseText}</p>`;
        chatbotBody.appendChild(response);
    }, 2000); // Délai de 2 secondes
}

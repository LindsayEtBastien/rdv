document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const chatBox = document.getElementById('chat-box');
    const inputBox = document.getElementById('input-box');

    startButton.addEventListener('click', startConversation);

    function startConversation() {
        // Effacer le bouton de départ
        inputBox.innerHTML = '';

        // Ajouter le premier message
        displayMessage('Bienvenue ! 👋 Avez-vous besoin d\'aide concernant un produit ou une commande ?', 'bot');

        setTimeout(() => {
            displayOptions(['Infos de paiement 💳', 'Expédition 🚚', 'Retour & Réclamations 🔙', 'Guide d\'achat 🔍', 'Statut de commande ✅']);
        }, 1000);
    }

    function displayMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function displayOptions(options) {
        inputBox.innerHTML = ''; // Réinitialiser les options
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => handleUserChoice(option));
            inputBox.appendChild(button);
        });
    }

    function handleUserChoice(choice) {
        displayMessage(choice, 'user'); // Afficher le choix de l'utilisateur
        inputBox.innerHTML = ''; // Effacer les boutons

        setTimeout(() => {
            if (choice.includes('Paiement')) {
                displayMessage('Les informations de paiement incluent les cartes VISA, Mastercard et PayPal.', 'bot');
            } else if (choice.includes('Expédition')) {
                displayMessage('Nos délais de livraison sont de 3 à 5 jours ouvrés.', 'bot');
            } else if (choice.includes('Retour')) {
                displayMessage('Vous pouvez effectuer un retour sous 30 jours après réception.', 'bot');
            } else if (choice.includes('Guide')) {
                displayMessage('Le guide d\'achat vous aide à choisir les meilleurs produits pour vos besoins.', 'bot');
            } else if (choice.includes('Statut')) {
                displayMessage('Veuillez entrer votre numéro de commande pour suivre votre statut.', 'bot');
            }

            setTimeout(() => {
                displayOptions(['Retourner au menu 🔄']);
            }, 1500);
        }, 1000);
    }
});

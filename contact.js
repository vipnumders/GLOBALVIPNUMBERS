document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const contactButtons = document.querySelectorAll('.contact-button');

    chatbotIcon.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
    });

    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            const number = button.dataset.number;
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=91${number}&text=Hello%2C%20I%27m%20interested%20in%20your%20premium%20membership.%20Please%20provide%20more%20information.&type=phone_number&app_absent=0`;
            window.open(whatsappUrl, '_blank');
        });
    });
});
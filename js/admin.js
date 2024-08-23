document.addEventListener("DOMContentLoaded", function() {
    const messageList = document.getElementById('message-list');

    // Function to fetch messages
    async function fetchMessages() {
        try {
            const response = await fetch('messages.json'); // Path to your JSON file
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const messages = await response.json();

            // Display messages
            messageList.innerHTML = messages.map(msg => `
                <div class="message">
                    <h3>${msg.name} (${msg.email})</h3>
                    <p>${msg.message}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching messages:', error);
            messageList.innerHTML = '<p>There was an error loading the messages.</p>';
        }
    }

    // Fetch messages on page load
    fetchMessages();
});
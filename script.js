const subscribeBtn = document.getElementById('subscribe-btn');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('message');
let chatLoaded;
let load = false;
const onConnectIvChatSend = (txt) => {
    if (window.__arsfChat) {
        txt && window.__arsfChat.sendMessage(txt);
        emailInput.value = '';

        chatLoaded = true;
        setTimeout(() => {
            if (window.__arsfChatDestroy) {
                window.__arsfChatDestroy();
            }
        }, 1000)
    }
    if (window.__arsfChatDestroy) {
        window.__arsfChatDestroy();
    }
};
const onLoad = () => {
    let v = emailInput.value;
    onConnectIvChatSend(v && `subscribe ${v}`)
};

window.onConnectIvChat = onLoad;

subscribeBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        messageDiv.textContent = 'Please enter a valid email address.';
        messageDiv.style.color = 'red';
        emailInput.focus();
    } else {
        // Perform further actions, such as sending the subscription request
        messageDiv.textContent = 'Thank you for subscribing!';
        messageDiv.style.color = 'green';

        if (chatLoaded) {
            onLoad();
        } else {
            load = true;
            subscribeBtn.setAttribute('disabled', true)
            window.__arsfChatIdg = '1002191910363_S';
            let startSrc = '//cafechat.app/start.js';
            let dev = false;
            if (dev) {
                //http://localhost:9000/
                // startSrc = 'http://localhost:9000/start.js';
            }
            const newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            newScript.src = startSrc;
            document.getElementsByTagName("head")[0].appendChild(newScript);
        }
    }
});

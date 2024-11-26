function getChatpartner() {
    const url = new URL(window.location.href);
    const queryParams = url.searchParams;
    const friendValue = queryParams.get("friend");
    return friendValue;
}

function formatNumber(num) {
    return num > 9 ? num : `0${num}`
}

function displayChatMessages(data) {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = '';
    data.forEach((message) => {
        const li = document.createElement('li');
        const date = new Date(message.time);
        li.innerHTML = `
            ${message.from}: ${message.msg}<span class="timer">${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}</span>
        `;
        chatBox.appendChild(li);
    });
}

function loadChatMessages(callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText);
            console.log(data);

            callback(data);
        }
    };
    xmlhttp.open("GET", `https://online-lectures-cs.thi.de/chat/ff5797b1-2e0d-43fd-89f2-5e02a33baba4/message/${getChatpartner()}`, true);
    xmlhttp.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNzMyNDg3Njk4fQ.LU8GAxrtyoghtow7pX81zQ5pSWin2sybC9LeU8LX9a8');
    xmlhttp.send();
}

function loadChat() {
    const friend = getChatpartner();
    document.getElementById("chatTitle").textContent = `Chat with ${friend}`;
    loadChatMessages(function (data) {
        displayChatMessages(data);
    });
}

window.setInterval(function () {
    loadChatMessages(function (data) {
        displayChatMessages(data);
    });
}, 1000);

loadChat()

function sendMessage() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
            console.log("done...");
        }
    };
    xmlhttp.open("POST", "https://online-lectures-cs.thi.de/chat/ff5797b1-2e0d-43fd-89f2-5e02a33baba4/message", true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNzMyNDg3Njk4fQ.LU8GAxrtyoghtow7pX81zQ5pSWin2sybC9LeU8LX9a8');

    let data = {
        message: document.getElementById("newMessage").value,
        to: getChatpartner()
    };
    let jsonString = JSON.stringify(data);
    xmlhttp.send(jsonString);
    document.getElementById("newMessage").value = '';
}
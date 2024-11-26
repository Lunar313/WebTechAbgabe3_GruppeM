function loadFriends(callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText);
            callback(data);
        }
    };
    xmlhttp.open("GET", "https://online-lectures-cs.thi.de/chat/ff5797b1-2e0d-43fd-89f2-5e02a33baba4/friend", true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNzMyNDg3Njk4fQ.LU8GAxrtyoghtow7pX81zQ5pSWin2sybC9LeU8LX9a8');
    xmlhttp.send();
}

function displayFriends(friends) {
    console.log(friends);

    const acceptedFriends = friends.filter((friend) => friend.status === 'accepted');
    const pendingFriends = friends.filter((friend) => friend.status === 'requested');

    const friendsList = document.getElementById('friendsList');
    const friendsRequestedList = document.getElementById('friendsRequestedList');

    friendsList.innerHTML = '';
    friendsRequestedList.innerHTML = '';

    acceptedFriends.forEach((friend) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <a href="../chat/chat.html?friend=${friend.username}">${friend.username}</a>
        <span class="notification">${friend.unread}</span>
        `;
        friendsList.appendChild(li);
    });

    pendingFriends.forEach((friend) => {
        const li = document.createElement('li');
        li.className = 'friendsRequestedItem';
        li.innerHTML = `
            <p>
            Friend request from <strong>${friend.username}</strong>
            </p>
            <div class="friendAcceptButtons">
            <button type="button">Accept</button>
            <button type="button">Reject</button>
            </div>
        `;
        friendsRequestedList.appendChild(li);
    });
}

window.setInterval(function () {
    loadFriends(function (data) {
        displayFriends(data)
    });
}, 1000);

loadFriends(function (data) {
    displayFriends(data)
});

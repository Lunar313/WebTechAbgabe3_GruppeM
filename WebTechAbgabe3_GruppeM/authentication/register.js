async function checkForm(event) {
    event.preventDefault();

    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmpassword').value;
    const username = document.querySelector('#username').value;

    checkPassword(password, confirmPassword);

    const usernameIsValid = await new Promise((resolve) => {
        checkUsername(username, resolve);
    });

    if (usernameIsValid && password.length >= 8 && password === confirmPassword) {
        document.getElementById('registerForm').submit();
    }
}

function setValidity(element, color) {
    element.style.borderColor = color;
    element.style.color = color;
}

function checkUsername(username, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 204) {
                alert("Username is taken");
                setValidity(document.querySelector('#username'), 'red');
                callback(false);
            } else if (xmlhttp.status == 404) {
                if (username.length >= 3) {
                    setValidity(document.querySelector('#username'), 'green');
                    callback(true);
                } else {
                    alert("Username must be at least 3 characters long");
                    setValidity(document.querySelector('#username'), 'red');
                    callback(false);
                }
            }
        }
    };
    xmlhttp.open("GET", `https://online-lectures-cs.thi.de/chat/ff5797b1-2e0d-43fd-89f2-5e02a33baba4/user/${username}`, true);
    xmlhttp.send();
}

function checkPassword(password, confirmPassword) {
    if (password === confirmPassword) {
        setValidity(document.querySelector('#confirmpassword'), 'green');
    } else {
        setValidity(document.querySelector('#confirmpassword'), 'red');
        alert("Confirmation has to match password");
    }
    if (password.length >= 8) {
        setValidity(document.querySelector('#password'), 'green');
    } else {
        setValidity(document.querySelector('#password'), 'red');
        setValidity(document.querySelector('#confirmpassword'), 'red');
        alert("Password has to be at least 8 characters long");
    }
}

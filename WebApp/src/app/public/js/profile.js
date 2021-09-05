const inputEmail = $('#inputEmail');
const inputName = $('#inputName');
const inputPassword = $('#inputPassword');
const modalEmail = $('#modalEmail');

// get user informations
var xhr = new XMLHttpRequest();
xhr.open("POST", 'http://localhost:3000/search/user', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    token: localStorage.getItem('JWT')
}));

xhr.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if (this.status === 200) {
        var data = JSON.parse(this.responseText);

        inputEmail.val(data.email);
        inputName.val(data.fullName);
        inputPassword.val(data.password);
        modalEmail.val(data.email);
    }
};

// get devices
var xhrDevice = new XMLHttpRequest();
xhrDevice.open("POST", 'http://localhost:3000/search/device', true);
xhrDevice.setRequestHeader('Content-Type', 'application/json');
xhrDevice.send(JSON.stringify({
    token: localStorage.getItem('JWT')
}));

xhrDevice.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if (this.status === 200) {
        var data = JSON.parse(this.responseText);

        let divDevices = document.querySelector('#devices');

        data.forEach((e, index) => {
            let tr = document.createElement('tr');
            tr.id = index + 1;
            tr.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${e.surname}</td>
                <td>${e.chatId}</td>
                <td>
                    <button onClick='deleteChatId(${index + 1}, ${e.chatId})' class='btn' style='color: white'>
                        <i class="bi bi-x-circle"></i>
                    </button>
                </td>
            `;

            divDevices.appendChild(tr);
        });
    }
};

// register chatID
$('#btnChatID').click(event => {
    var xhr = new XMLHttpRequest();
    const errorAlert = $('#chatIdError');
    const successAlert = $('#chatIdSuccess');
    let inputChatId = $('#modalChatID').val();
    let inputSurname = $('#modalSurname').val();

    let ok = true;

    if (inputChatId.length === 0 || isNaN(inputChatId)) {
        successAlert.css('display', 'none');
        errorAlert.text('Informe corretamente o Chat ID!');
        errorAlert.css('display', 'block');
        ok = false;
    }

    if (inputSurname.length === 0) {
        successAlert.css('display', 'none');
        errorAlert.text('Informe corretamente o Apelido!');
        errorAlert.css('display', 'block');
        ok = false;
    }

    if (ok) {
        xhr.open("POST", 'http://localhost:3000/register/chatId', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            token: localStorage.getItem('JWT'),
            chatId: inputChatId,
            surname: inputSurname
        }));

        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            if (this.status === 200) {
                errorAlert.css('display', 'none');
                successAlert.text('Chat ID cadastrado!');
                successAlert.css('display', 'block');
                inputChatId = '';
            } else {
                successAlert.css('display', 'none');
                errorAlert.text('Chat ID já cadastrado!');
                errorAlert.css('display', 'block');
                inputChatId = '';
            }
        };
    }
});

// change user information
$('#btnmodal').click(event => {
    var xhr = new XMLHttpRequest();
    const modalAlertError = $('#modalAlertError');
    const modalAlertSuccess = $('#modalAlertSuccess');
    const modalName = $('#modalName').val();
    const modalPassword = $('#modalPassword').val();

    let ok = true;

    if (modalPassword.length < 4) {
        modalAlertSuccess.css('display', 'none');
        modalAlertError.text('Sua senha deve ter ao menos 4 caracteres!');
        modalAlertError.css('display', 'block');
        ok = false;
    }

    if (modalName === '' || modalPassword === '') {
        modalAlertError.text('Informações inválidas. Tente novamente!');
        modalAlertError.css('display', 'block');
        ok = false;
    }

    if (ok) {
        xhr.open("POST", 'http://localhost:3000/change/user/information', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            token: localStorage.getItem('JWT'),
            name: modalName,
            newPassword: modalPassword
        }));

        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            if (this.status === 200) {
                modalAlertError.css('display', 'none')
                modalAlertSuccess.text('Alterações salvas!');
                modalAlertSuccess.css('display', 'block');
                inputNome.val(modalName);
            } else {
                modalAlertSuccess.css('display', 'none');
                modalAlertError.text('Ocorreu um erro inesperado. Tente novamente!');
                modalAlertError.css('display', 'block');
            }
        };
    }
});

// close modal
$('.closeModalBtn').click(event => {
    window.location.replace('http://localhost:3000/securitymaster/profile');
});

// delete chat id
const deleteChatId = ((index, chatId) => {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", 'http://localhost:3000/delete/device', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        chatId
    }));

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status === 200) {
            tr = document.getElementById(index);
            tr.remove();
            window.location.replace('http://localhost:3000/securitymaster/profile');
        }
    };
});
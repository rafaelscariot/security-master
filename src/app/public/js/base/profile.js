const inputEmail = $("#inputEmail");
const inputName = $("#inputName");
const inputPassword = $("#inputPassword");
const modalEmail = $("#modalEmail");

// get user
$.ajax({
  method: "GET",
  url: `/user/${localStorage.getItem("JWT")}`,
})
  .done((data) => {
    inputEmail.val(data.email);
    inputName.val(data.fullName);
    inputPassword.val(data.password);
  })
  .fail((data) => {
    console.info(data.responseJSON.message.replace("Error: Error: ", ""));
  });

// update user
$("#btnmodal").click(() => {
  const modalAlertError = $("#modalAlertError");
  const modalAlertSuccess = $("#modalAlertSuccess");
  const modalName = $("#modalName").val();
  const modalPassword = $("#modalPassword").val();
  const modalEmail = $("#modalEmail").val();

  if (modalPassword.length < 4) {
    modalAlertSuccess.css("display", "none");
    modalAlertError.text("Senha deve possuir ao menos 4 caracteres");
    modalAlertError.css("display", "block");
  } else if (!validateEmail(modalEmail)) {
    modalAlertSuccess.css("display", "none");
    modalAlertError.text("E-mail inválido");
    modalAlertError.css("display", "block");
  } else if (!modalName || !modalPassword) {
    modalAlertError.text("Campos inválidos");
    modalAlertError.css("display", "block");
  } else {
    $.ajax({
      method: "PUT",
      url: "/user",
      data: {
        token: localStorage.getItem("JWT"),
        name: modalName,
        newPassword: modalPassword,
        email: modalEmail,
      },
    })
      .done(() => {
        modalAlertError.css("display", "none");
        modalAlertSuccess.text("Alterações salvas!");
        modalAlertSuccess.css("display", "block");
        inputName.val(modalName);
        modalName = "";
        modalEmail = "";
        modalPassword = "";
      })
      .fail((data) => {
        modalAlertSuccess.css("display", "none");
        modalAlertError.text(
          data.responseJSON.message.replace("Error: Error: ", "")
        );
        modalAlertError.css("display", "block");
      });
  }
});

// register device
$("#btnChatID").click(() => {
  const errorAlert = $("#chatIdError");
  const successAlert = $("#chatIdSuccess");
  let inputChatId = $("#modalChatID").val();
  let inputSurname = $("#modalSurname").val();

  if (inputChatId.length !== 9 || isNaN(inputChatId)) {
    successAlert.css("display", "none");
    errorAlert.text("Chat ID inválido");
    errorAlert.css("display", "block");
  } else if (inputSurname.length === 0) {
    successAlert.css("display", "none");
    errorAlert.text("Apelido inválido");
    errorAlert.css("display", "block");
  } else {
    $.ajax({
      method: "POST",
      url: "/device",
      data: {
        token: localStorage.getItem("JWT"),
        chatId: inputChatId,
        surname: inputSurname,
      },
    })
      .done(() => {
        errorAlert.css("display", "none");
        successAlert.text("Chat ID cadastrado");
        successAlert.css("display", "block");
        inputChatId = "";
        inputSurname = "";
      })
      .fail((data) => {
        successAlert.css("display", "none");
        errorAlert.text(
          data.responseJSON.message.replace("Error: Error: ", "")
        );
        errorAlert.css("display", "block");
      });
  }
});

// get devices
$.ajax({
  method: "GET",
  url: `/device/${localStorage.getItem("JWT")}`,
})
  .done((data) => {
    let divDevices = document.querySelector("#devices");

    data.forEach((e, index) => {
      let tr = document.createElement("tr");
      tr.id = index + 1;
      tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${e.surname}</td>
            <td>${e.chatId}</td>
            <td>
                <button onClick='deleteChatId(${index + 1}, ${
        e.chatId
      })' class='btn' style='color: white'>
                    <i class="bi bi-x-circle"></i>
                </button>
            </td>
        `;

      divDevices.appendChild(tr);
    });
  })
  .fail((data) => {
    console.info(data.responseJSON.message.replace("Error: Error: ", ""));
  });

// delete device
const deleteChatId = (index, chatId) => {
  $.ajax({
    method: "DELETE",
    url: `/device/${chatId}`,
  })
    .done(() => {
      tr = document.getElementById(index);
      tr.remove();
      window.location.replace("/securitymaster/profile");
    })
    .fail((data) => {
      console.info(data.responseJSON.message.replace("Error: ", ""));
    });
};

// close modal
$(".closeModalBtn").click(() => {
  window.location.replace("/securitymaster/profile");
});

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

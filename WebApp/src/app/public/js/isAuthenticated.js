const jwt = localStorage.getItem('JWT');

if (!jwt) {
    window.location.replace("http://localhost:3000/error");
}

$.ajax({
    method: "POST",
    url: "/token/validator",
    data: { token: jwt }
}).done(response => {
    if (response.error === true) {
        window.location.replace("http://localhost:3000/error");
    }
});
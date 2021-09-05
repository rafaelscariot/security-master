// authenticate validation
$('#form-login').submit(event => {
    const alert = $('#login-alert');
    const inputEmail = $('#email').val();
    const inputPassword = $('#password').val();

    if (inputEmail === '' || inputPassword === '') {
        alert.text('E-mail ou senha incorretos. Tente novamente!');
        alert.css('display', 'block');
    } else {
        $.ajax({
            method: "POST",
            url: "/authenticate",
            data: { email: inputEmail, password: inputPassword }
        }).done(response => {
            if (response.error === false) {
                localStorage.setItem('JWT', response.token);
                localStorage.setItem('userName', response.fullName);
                window.location.replace("http://localhost:3000/securitymaster/home");
            } else {
                alert.text(response.status);
                alert.css('display', 'block');
            }
        });
    }
    event.preventDefault();
});

// register validation
$('#form-register').submit(event => {
    const alert = $('#register-alert');
    const sucessAlert = $('#register-sucess-alert');
    const inputName = $('#full_name').val();
    const inputEmail = $('#emailregister').val();
    const inputPassword = $('#passwordregister').val();
    const inputPasswordRepeat = $('#repeatpassword').val();

    let ok = false

    if (inputEmail === '' || inputPassword === '' || inputName === '' || inputPasswordRepeat === '') {
        alert.text('Preencha todos os campos!');
        alert.css('display', 'block');
    } else if (inputName.length < 4) {
        alert.text('Nome inválido!');
        alert.css('display', 'block');
    } else if (inputPassword.length < 4) {
        alert.text('Sua senha deve ter ao menos 4 caracteres!');
        alert.css('display', 'block');
    } else if (inputPassword !== inputPasswordRepeat) {
        alert.text('Senhas não conferem!');
        alert.css('display', 'block');
    } else { ok = true }

    if (ok) {
        $.ajax({
            method: "POST",
            url: "/register/user",
            data: {
                fullName: inputName,
                emailRegister: inputEmail,
                passwordRegister: inputPassword,
                repeatPassword: inputPasswordRepeat
            }
        }).done(response => {
            if (response.error === true) {
                alert.text(response.status);
                sucessAlert.css('display', 'none');
                alert.css('display', 'block');
            }

            if (response.error === false) {
                alert.css('display', 'none');
                sucessAlert.text('Cadastro feito com sucesso!');
                sucessAlert.css('display', 'block');
                $('#full_name').val(''); $('#emailregister').val(''); $('#passwordregister').val(''); $('#repeatpassword').val('');
            }
        });
    }

    event.preventDefault();
});

(function ($) {
    "use strict";

    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    navbarCollapse();
    $(window).scroll(navbarCollapse);
})(jQuery);
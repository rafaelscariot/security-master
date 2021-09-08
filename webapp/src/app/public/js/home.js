// authenticate
$('#form-login').submit(event => {
    const alert = $('#login-alert');
    const email = $('#email').val();
    const password = $('#password').val();

    if (email === '' || password === '') {
        alert.text('E-mail ou senha incorretos');
        alert.css('display', 'block');
    } else {
        $.ajax({
            method: "POST",
            url: "/authenticate",
            data: {
                email,
                password
            }
        }).done(data => {
            localStorage.setItem('JWT', data.token);
            localStorage.setItem('userName', data.fullName);
            window.location.replace("http://localhost:3000/securitymaster/home");
        }).fail(data => {
            alert.text(data.responseJSON.message.replace('Error: ', ''));
            alert.css('display', 'block');
        });
    }

    event.preventDefault();
});

// register
$('#form-register').submit(event => {
    const errorAlert = $('#register-alert');
    const sucessAlert = $('#register-sucess-alert');
    const fullName = $('#full-name').val();
    const email = $('#email-register').val();
    const password = $('#password-register').val();
    const repeatPassword = $('#repeat-password').val();

    if (email === '' || password === '' || fullName === '' || repeatPassword === '') {
        errorAlert.text('Campos inválidos');
        errorAlert.css('display', 'block');
    } else if (password.length < 4) {
        errorAlert.text('Senha deve possuir ao menos 4 caracteres');
        errorAlert.css('display', 'block');
    } else if (password !== repeatPassword) {
        errorAlert.text('Senhas não conferem');
        errorAlert.css('display', 'block');
    } else {
        $.ajax({
            method: "POST",
            url: "/user",
            data: {
                fullName,
                email,
                password,
                repeatPassword
            }
        }).done(() => {
            errorAlert.css('display', 'none');
            sucessAlert.text('Cadastro feito com sucesso!');
            sucessAlert.css('display', 'block');
            $('#full-name').val('');
            $('#email-register').val('');
            $('#password-register').val('');
            $('#repeat-password').val('');
        }).fail(data => {
            errorAlert.text(data.responseJSON.message.replace('Error: ', ''));
            sucessAlert.css('display', 'none');
            errorAlert.css('display', 'block');
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
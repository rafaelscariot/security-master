$('#btnCadastro').click(event => {
    const name = document.querySelector('#name');
    const description = document.querySelector('#description');
    const startTime = document.querySelector('#startTime');
    const endTime = document.querySelector('#endTime');
    const userID = localStorage.getItem('userID');
    const error = $('#error');
    const success = $('#success');

    if (name.value === '' || description.value === '' || endTime.value === '' || startTime.value === '' || userID === '') {
        error.text('Preencha todos os campos!');
        error.css('display', 'block');
        success.css('display', 'none');

    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3000/register/region', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            userID: userID,
            name: name.value,
            description: description.value,
            startTime: startTime.value,
            endTime: endTime.value
        }));
    
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
    
            if (this.status == 200) {
                success.text('Cadastro feito com successo!');
                success.css('display', 'block');
                error.css('display', 'none');
             
                name.value = '';
                description.value = '';
                startTime.value = '00:00';
                endTime.value = '00:00';
                
            } else {
                error.text('Um erro inesperado aconteceu. Tente novamente!');
                error.css('display', 'block');
                success.css('display', 'none');
            }
        };
    }

    event.preventDefault();
});
let divCards = document.querySelector('#cards');
let span = document.querySelector('#span');
let span2 = document.querySelector('#span2');
let span3 = document.querySelector('#span3');

$.ajax({
    method: "POST",
    url: "/search/regions",
    data: { userID: localStorage.getItem('userID') }
}).done(response => {
    if (response.length === 0) {
        span.textContent = `Você não possui regiões de monitoramento cadastradas!`
        span2.textContent = `Cadastre na seção "Nova região" e também registre seu Telegram ChatID na aba "Perfil"!`;
        span3.textContent = 'Após cadastrar seu ChatID, envie /start para o bot SecurityMasterBot no Telegram para receber alertas em tempo real!'
    } else {
        response.forEach(region => {
            let streamingComponent = document.createElement('img');
            streamingComponent.style = 'border: 1px solid black; border-radius: 10px';
            streamingComponent.width = '450';
            streamingComponent.height = '450';
            streamingComponent.src = `http://localhost:5000/monitoring?userId=${localStorage.getItem('userID')}`;
            streamingComponent.alt = 'Stream de video da câmera de segurança';

            let ul = document.createElement('ul');
            ul.style = 'font-size: 1rem; text-align: left; border: 1px solid #00001a; width: 450px; border-radius: 5px';

            let liName = document.createElement('li');
            liName.textContent = 'Região: ' + region.name;
            let liDescription = document.createElement('li');
            liDescription.textContent = 'Descrição: ' + region.description;
            let liHour = document.createElement('li');
            liHour.textContent = 'Horário de monitoramento: ' + region.startTime + ' as ' + region.endTime;

            ul.appendChild(liName);
            ul.appendChild(liDescription);
            ul.appendChild(liHour);

            let divCard = document.createElement('div');
            divCard.appendChild(ul)
            divCard.appendChild(streamingComponent);
            divCard.className = 'col-sm mb-4';
            divCards.appendChild(divCard);
        });
    }
});
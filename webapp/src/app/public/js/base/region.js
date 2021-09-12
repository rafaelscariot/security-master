let errorAlert = $('#alert-error');
let successAlert = $('#alert-success');

$('#btnRegister').click(() => {
    let region = $('#inputRegion').val();
    let description = $('#inputDescription').val();
    let ipCam = $('#inputIpCam').val();
    let startTime = $('#inputStartTime').val();
    let endTime = $('#inputEndTime').val();

    if (region === '' || description === '' || ipCam === '' || startTime === '' || endTime === '') {
        successAlert.css('display', 'none');
        errorAlert.text('Campos inválidos');
        errorAlert.css('display', 'block');
    } else {
        $.ajax({
            method: "POST",
            url: '/region',
            data: {
                token: localStorage.getItem('JWT'),
                region,
                description,
                ipCam,
                startTime,
                endTime
            }
        }).done(() => {
            errorAlert.css('display', 'none');
            successAlert.text('Região cadastrada');
            successAlert.css('display', 'block');
            region = ''; description = ''; ipCam = ''; startTime = ''; endTime = '';
            window.location.replace('http://localhost:3000/securitymaster/profile');
        }).fail(data => {
            console.log(data)
            successAlert.css('display', 'none');
            errorAlert.text(data.responseJSON.message.replace('Error: Error: ', ''));
            errorAlert.css('display', 'block');
        });
    }
});

// get regions
$.ajax({
    method: "GET",
    url: `/region/${localStorage.getItem('JWT')}`
}).done(data => {
    let divRegions = document.querySelector('#regions');

    data.forEach((e, index) => {
        let btn = document.createElement('button');
        btn.addEventListener('click', () => {
            $.ajax({
                method: "DELETE",
                url: `/region/${e.name}`
            }).done(() => {
                tr = document.getElementById(index + 1);
                tr.remove();
                window.location.replace('http://localhost:3000/securitymaster/region');
            }).fail(data => {
                console.log(data.responseJSON.message.replace('Error: ', ''));
            });
        });
        btn.style.color = 'white';
        btn.className = 'btn';
        btn.innerHTML = '<i class="bi bi-x-circle"></i>';

        let td = document.createElement('td');
        td.appendChild(btn);

        let tr = document.createElement('tr');
        tr.id = index + 1;
        tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${e.name}</td>
            <td>${e.description}</td>
            <td>${e.startTime} - ${e.endTime}</td>
        `;

        tr.appendChild(td);
        divRegions.appendChild(tr);
    });
}).fail(data => {
    console.log(data.responseJSON.message.replace('Error: Error: ', ''));
});

// delete region
const deleteRegion = ((index, name) => {
    $.ajax({
        method: "DELETE",
        url: `/region/${name}`
    }).done(() => {
        tr = document.getElementById(index);
        tr.remove();
        window.location.replace('http://localhost:3000/securitymaster/region');
    }).fail(data => {
        console.log(data.responseJSON.message.replace('Error: ', ''));
    });
});
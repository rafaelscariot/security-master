let errorAlert = $('#alert-error');
let successAlert = $('#alert-success');

$('#btnRegister').click(() => {
    const region = $('#inputRegion').val();
    const description = $('#inputDescription').val();
    const ipCam = $('#inputIpCam').val();
    const startTime = $('#inputStartTime').val();
    const endTime = $('#inputEndTime').val();

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
        }).fail(data => {
            console.log(data)
            successAlert.css('display', 'none');
            errorAlert.text(data.responseJSON.message.replace('Error: Error: ', ''));
            errorAlert.css('display', 'block');
        });
    }
});
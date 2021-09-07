let xhr = new XMLHttpRequest();

$('#btnRegister').click(() => {
    const region = $('#inputRegion').val();
    const description = $('#inputDescription').val();
    const ipCam = $('#inputIpCam').val();
    const startTime = $('#inputStartTime').val();
    const endTime = $('#inputEndTime').val();

    xhr.open("POST", 'http://localhost:3000/region', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        token: localStorage.getItem('JWT'),
        region,
        description,
        ipCam,
        startTime,
        endTime
    }));

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        const data = this.responseText;
        console.log(data);

        if (this.status === 200) {
            console.log('cadastrou')
        } else {
            console.log('erro')
        }
    };
});
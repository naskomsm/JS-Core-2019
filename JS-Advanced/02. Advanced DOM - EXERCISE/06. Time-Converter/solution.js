function attachEventsListeners() {
    // all buttons
    document.getElementById('daysBtn').addEventListener('click', onClick);
    document.getElementById('hoursBtn').addEventListener('click', onClick);
    document.getElementById('minutesBtn').addEventListener('click', onClick);
    document.getElementById('secondsBtn').addEventListener('click', onClick);

    let daysInput = document.getElementById('days');
    let hoursInput = document.getElementById('hours');
    let minutesInput = document.getElementById('minutes');
    let secondsInput = document.getElementById('seconds');

    function onClick() {
        if (daysInput.value !== '') {
            document.getElementById('hours').value = document.getElementById('days').value * 24;
            document.getElementById('minutes').value = document.getElementById('days').value * 1440;
            document.getElementById('seconds').value = document.getElementById('days').value * 86400;
        }
        else if (hoursInput.value !== '') {
            document.getElementById('days').value = (document.getElementById('hours').value * 0.041667).toFixed(1);
            document.getElementById('minutes').value = document.getElementById('hours').value * 60;
            document.getElementById('seconds').value = document.getElementById('hours').value * 3600;
        }
        else if (minutesInput.value !== '') {
            document.getElementById('days').value = (document.getElementById('minutes').value * 0.000694).toFixed(1);
            document.getElementById('hours').value = (document.getElementById('minutes').value * 0.016667).toFixed(1);
            document.getElementById('seconds').value = document.getElementById('minutes').value * 60;
        }
        else if (secondsInput.value !== '') {
            document.getElementById('days').value = document.getElementById('seconds').value / 86400;
            document.getElementById('hours').value = document.getElementById('seconds').value / 3600;
            document.getElementById('minutes').value = (document.getElementById('seconds').value * 0.016667).toFixed(1);;
        }
    }
}
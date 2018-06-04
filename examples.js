function iProovEvent(event) {
    switch(event.type) {
        case 'aborted':
        case 'failed':
            document.querySelector('.iproov-failed span').innerText = event.detail.reason;
            console.info('iProov ' + event.type + ' - ' + event.detail.feedback);
            break;
        case 'error':
            document.querySelector('.iproov-error span').innerText = event.detail.reason;
            document.querySelector('.iproov-error code').innerText = event.detail.feedback;
            console.warn('iProov ' + event.type + ' - ' + event.detail.reason);
            break;
        case 'unsupported':
            document.querySelector('.iproov-unsupported span').innerText = event.detail.reason;
            document.querySelector('.iproov-unsupported code').innerText = event.detail.feedback;
            console.warn('iProov ' + event.type + ' - ' + event.detail.reason);
            break;
        case 'progress':
            document.querySelector('.iproov-progress progress').value = event.detail.percentage;
            document.querySelector('.iproov-progress .spinner span').innerText = event.detail.percentage + '%';
            document.querySelector('.iproov-progress .status').innerText = event.detail.message;
            console.info(event.detail.message + ' (' + event.detail.percentage + '%)');
            break;
        default:
            console.log('iProov ' +  event.detail.type + ' ' + event.type);
    }
}

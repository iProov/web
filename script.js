$(document).ready(function() {
    $('.form-signin').submit(function(event) {
        event.preventDefault();
        $('.loading').addClass('show');

        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                if(data.hasOwnProperty('error')) {
                    showMessage(data.error_description, 'danger');
                    $('.loading').removeClass('show');
                } else {
                    $('.start').fadeOut();
                    injectIproov(data);
                }
            },
            error: function(jqXHR) {
                console.log(jqXHR);
                showMessage(jqXHR.status + ' ' + jqXHR.statusText, 'danger');
                $('.loading').removeClass('show');
            }
        });
    });

    $('.btn').click(function() {
        $('input[name=type]').val(this.value);
    });
});

var timeout;
function showMessage(text, type) {
    clearTimeout(timeout);
    $('.alert').html(text).attr('class', 'fixed-top fade show alert alert-' + type);
    timeout = setTimeout(function() {
        $('.alert').removeClass('show');
    }, 3000);
}

function injectIproov(data){
    var component = new IProovMe({
        token: data.token,
        type: $('input[name=type]').val()
    });

    //Component customisations
    component.appendChild($('<button slot="button" type="button" class="btn btn-success">Scan my face</button>')[0]);
    component.appendChild($('<div slot="progress" class="iproov-progress"><progress max="100" value="40"></progress>' +
        '<p class="status">Streaming...</p><div class="spinner"><span>40%</span><i class="fas fa-spinner fa-pulse fa-5x"></i></div></div>')[0]);

    document.querySelector('#inject-iproov').appendChild(component);

    //Attaching to custom iProov events
    component.addEventListener('progress', iProovProgress);
    component.addEventListener('passed', iProovValidate);

    $(component).on('ready unsupported', function() {
        $('.loading').removeClass('show');
    });

    $(component).on('ready started aborted streamed progress passed failed error unsupported', iProovEvent);
}

function iProovProgress(event) {
    $('.iproov-progress progress').attr('value', event.detail.percentage);
    $('.iproov-progress .spinner span').html(event.detail.percentage + '%');
    $('.iproov-progress .status').html(event.detail.message);
}

function iProovValidate(event) {
    $('#validation').html('Validating ...');

    var postData = {
        user_id: $('#inputEmail').val(),
        token: event.detail.token,
        action: 'validate',
        type: $('input[name=type]').val()
    };

    $.ajax({
        type: 'POST',
        url: './php/',
        data: postData,
        dataType: 'json',
        success: function(data) {
            if(data.hasOwnProperty('error')) {
                showMessage(data.error_description, 'danger')
            } else {
                $('#validation').html('Validated');
            }
        },
        error: function(jqXHR) {
            console.log(jqXHR);
            showMessage(jqXHR.status + ' ' + jqXHR.statusText, 'danger');

        }
    });
}

function iProovEvent(event) {
    switch(event.type) {
        case 'aborted':
        case 'failed':
        case 'error':
        case 'unsupported':
            console.warn('iProov ' + event.type + ' - ' + event.detail.reason);
            break;
        case 'progress':
            console.info(event.detail.message + ' (' + event.detail.percentage + '%)');
            break;
        default:
            console.log('iProov ' +  event.detail.type + ' ' + event.type);
    }
}

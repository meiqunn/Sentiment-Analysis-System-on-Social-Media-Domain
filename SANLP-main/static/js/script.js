$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    var targetModel = urlParams.get("model")
    if(targetModel)
        $(`#${targetModel}`).addClass('active')
    else{
        $('#fasttext').addClass('active')
    }

    $('#query-form').on('submit', function(event) {
        var params = new URL(document.location).searchParams;
        let model = params.get("model");

        var url = '/submit';
        if (model) {
            url += `?model=${model}`;
        }

        event.preventDefault();
        var queryResult = $('#query-result');
        queryResult.html('');
        $.ajax({
            url: url,
            type: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                var html = '<p class="result">Result: ' + data.result + '</p>';
                switch(data.result){
                    case "positive":
                        html += '<p class="emoji">😁</p>';
                        break;
                    case "negative":
                        html += '<p class="emoji">🙁</p>';
                        break;
                    case "neutral":
                        html += '<p class="emoji">😐</p>';
                        break;

                }
                queryResult.html(html);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });

    $('#carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:3
            },
        }
    })

    $('.model-selection').click(function(){
        var urlParams = new URLSearchParams(window.location.search);
        urlParams.set('model', this.id);
        window.location.search = urlParams;
    })
});
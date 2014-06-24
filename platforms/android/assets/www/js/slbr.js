$(document).on('pageinit', '#home', function(){ 

    loadRandomExpressions();

    try{
        //Any form that might need validation
        if($("form.validateMe").length > 0){
            $("form.validateMe").validate();
        }
    } finally {}

    $('#reloadButton').bind('vclick', function(ev) {
        ev.preventDefault();
        loadRandomExpressions();
        
    });
});

var loadRandomExpressions = function() {
    var url = 'http://speaklikeabrazilian.com/api/v1/expressions/random?callback=?';        

    $.ajax({
        url: url,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
            console.log(error);
            console.log(request);
        }
    });
};

var formatText = function(text) {
    return nl2br(text.replace (/(\[|\])/g, ""));
};

var nl2br = function(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

var expressionInfo = {
    id : null,
    text : null,
    description: null,
    example: null, 
    dislikes: null,
    likes: null
};

var ajax = {  
    parseJSONP:function(result){  
        expressionInfo.result = result;
        $('#expression-list').empty();
        if (result.length > 0) {
            $.each(result, function(i, row) {
                $('#expression-list').append(
                    '<li class="ui-li ui-li-static ui-body-c">' +
                    '<h3 class="ui-li-heading">'+row.text+' <a href="http://speaklikeabrazilian.com/en/expression/define?e='+row.text+'">&raquo;</a></h3>' +
                    '<p class="ui-li-desc">' +
                    formatText(row.description) + 
                    '<br/><br/>' + 
                    '<i>'+formatText(row.example)+'</i>' +
                    '</p>' +
                    '</li>'
                );
            });
        } else {
            $('#expression-list').append('<li><strong>No expressions found</strong></li>');
        }
        $('#expression-list').listview('refresh');
    }
};

var submitSearchForm = function() {
    $.ajax({
        url: 'http://speaklikeabrazilian.com/api/v1/expressions/search?q=' + $('#q').val(),
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
            console.log(error);
            console.log(request);
        }
    });
    return false;
};

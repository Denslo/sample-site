$( document ).ready(function() {

    $.getJSON('/data',function (data){
        window.allData = data;
        initPage();
    })

});

function initPage(){
    var items = [];
    $.each( window.allData.results, function( index, jsonData ) {
        if(index === 0){
            items.push( "<div class='page'>" );
        } else {
            items.push( "<div class='page hide'>" );
        }

        items.push( "<img src="+ jsonData.logo +">" );
        items.push( "<h1>"+ jsonData.name +"</h1>" );
        items.push( "<h2>Company Summery -</h2>" );
        items.push( "<p>"+ jsonData.promise +"</p>" );
        items.push( "<p>"+ jsonData.summery +"</p>" );

        items.push( "</div>" );
    });
    $( "body" ).append(items.join(""));
}
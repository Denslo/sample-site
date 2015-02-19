$( document ).ready(function() {

    $.getJSON('/data',function (data){
        window.allData = data;
        initPage();
    })

});

function initPage(){
    var items = [];
    $.each(window.allData.results, function(index, jsonData) {

        var first;
        if(index === 0){
            first = "<div id='page_"+index+"' class='page'>" ;
        } else {
            first = "<div id='page_"+index+"' class='page hide'>" ;
        }
        items.push(first);
        items.push("<img src="+ jsonData.logo +">");
        items.push("<h1>"+ jsonData.name +"</h1>");
        items.push("<h2>Company Summery -</h2>");
        items.push("<p>"+ jsonData.promise +"</p>");
        items.push("<p>"+ jsonData.summery +"</p>");

        items.push("<p>");
        var market;
        if(jsonData.isMarketSMB){
            market = jsonData.name + "was founded on <b>" +jsonData.founded+"</b> and dealing in the fields of <b>"+jsonData.area+"</b>. "+name+" focuse mainly on the <b>SMB</b> market.";
        } else {
            market = jsonData.name + "was founded on <b>" +jsonData.founded+"</b> and dealing in the fields of <b>"+jsonData.area+"</b>. "+jsonData.name+" focuse mainly on the <b>Enterprise</b> market.";
        }
        items.push(market);
        items.push("</p>");

        items.push("<p> Compony Site:<a href='" + jsonData.site + "'>" + jsonData.site + "</a>");

        items.push("<h2>Features Summery -</h2>");

        items.push("<table>");
        $.each(jsonData.features, function(key, value) {
            items.push("<tr>");
            items.push("<td>"+key+"</td>");
            items.push("<td>"+value+"</td>");
            items.push("</tr>");
        });
        items.push("</table>");

        items.push("<p> comments: "+jsonData.comments+"</p>");
        items.push("<h2>Pricing and Plans -</h2>");

        items.push("<table>");
        $.each(jsonData.price, function(key, value) {
            items.push("<tr>");
            items.push("<td>"+key+"</td>");
            items.push("<td>"+value+"</td>");
            items.push("</tr>");
        });
        items.push("</table>");
        items.push("<p> customers: "+jsonData.customers+"</p>");
        items.push("<h2>Funds Summery -</h2>");
        $.each(jsonData.funds, function(key, value) {
            items.push("<table>");
            $.each(value, function(key, value1) {
                items.push("<tr>");
                items.push("<td>"+key+"</td>");
                items.push("<td>"+value1+"</td>");
                items.push("</tr>");
            });
            items.push("</table>");
        });

        items.push("<a class='nextPageBu'>Next Page</a>");
        items.push("</div>");
    });
    $( "body" ).append(items.join(""));

    initNextButtons()
}

function initNextButtons(){

    var totalPages = $(".nextPageBu").length;

    $(".nextPageBu").click(function(){
        var curPageID = this.parentNode.id;
        var nextPageID = "page_" + ((parseInt(this.parentNode.id.split('_')[1])+1)%totalPages);

        //$('#' + curPageID).toggleClass('hide');
        //$('#' + nextPageID).toggleClass('hide');

        document.getElementById(curPageID).className += " hide";
        document.getElementById(nextPageID).className ="page";
    });
}
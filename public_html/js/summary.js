$.getJSON("data/summary.json", function (result) {
    var currentRow;
    $("#policyTemplate").tmpl(result).appendTo("#summaryContainer");
    $("#summaryContainer tr").hover(function () {
        $(this).css("background-color", "#d5d5d5");
        $(currentRow).css("background-color", "#2191c0");
    }, function () {
        $(this).css("background-color", "white");
        $(currentRow).css("background-color", "#2191c0");
    }).click(function (event) {
        event.preventDefault();
        sessionStorage.pNumber = $(this).find("a").html();
        sessionStorage.username = $(this).find("td:first").html();
        currentRow = this;
        $("#summaryContainer tr").css("background-color", "white");
        $(this).css("background-color", "#2191c0");
        $('#tabs-2').load('user.html');
        $("#pol").show();
        $("#tabs").tabs("option", "active", 1);
    });
});

function formatPolicy(pnumber, pinsured) {
    return "<a href='#'>" + pnumber + "</a>";
}
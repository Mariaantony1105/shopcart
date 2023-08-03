$(function () {
    $("#welcome").html("Welcome " + sessionStorage.username);
    $("#tabs").tabs();
    $('#tabs-3').load('policy_edit.html');
    if (sessionStorage.role == "admin") {
        $("#pol").hide();
        $('#tabs-1').load('summary.html');
    }
    else {
        $("#sum").hide();
        $('#tabs-2').load('user.html');
        $("#tabs").tabs("option", "active", 1);
    }
    $("#logout").click(function () {
        sessionStorage.removeItem("nominee");
        sessionStorage.removeItem("phone");
        window.close();
    });
});
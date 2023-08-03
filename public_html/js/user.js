$(function () {
    var details = {
        "p1": "#d1",
        "p2": "#d2",
        "p3": "#d3",
        "p4": "#d4",
        "p5": "#d5"
    };

    $("#menu").menu();
    $("#d3 button").button();
    var rad = $("#d3 div.widget input").checkboxradio();
    $("#creditDetails, #netDetails").hide();
    $("#creditPanel .panel-body, #netPanel .panel-body").hide();
    $("#paymentMessage").hide();
    $("#creditPanel").css("cursor", "pointer").on("click", function () {
        $(this).find(".panel-body").show();
        $("#netPanel .panel-body").hide();
        $("#paymentMessage").hide();
    });
    $("#netPanel").css("cursor", "pointer").on("click", function () {
        $(this).find(".panel-body").show();
        $("#creditPanel .panel-body").hide();
        $("#paymentMessage").hide();
    });
    $("#creditDetails button").button();
    $("#creditDetails form").submit(function (e) {
        e.preventDefault();
        $("#paymentMessage").html("Payment made successfully!").show();
        $(this).trigger("reset");
        $("#creditDetails").hide();
    });
    $("#netDetails button").button();
    $("#netDetails form").submit(function (e) {
        e.preventDefault();
        var flag = false;
        var index = -1;
        $.each(rad, function (i, bank) {
            if (bank.checked == true) {
                flag = true;
                index = i;
            }
        });
        if (flag) {
            $("#paymentMessage").html("Payment made successfully!").show();
            $("#netDetails form").trigger("reset");
            $("#netDetails").hide();
            $(rad[index]).attr("checked", false);
            console.log($(rad[index]));
        }
        else
            $("#paymentMessage").html("Please select a bank!").show();
    });
    $("#credit").on("click",function () {
        $("#creditDetails").show();
    });
    $("#net").on("click",function () {
        $("#netDetails").show();
    });
    $("#menu").on("menuselect", function (event, ui) {
        $.each(details, function (i, element) {
            if (ui.item[0].id == i) {
                $(element).fadeIn(1000);
            }
            else {
                $(element).hide();
            }
        });
    });
    var user = sessionStorage.username;
    var pNumber = Number(sessionStorage.pNumber);
    $.getJSON("data/summary.json", function (result) {
        $.each(result, function (i, field) {
            if (pNumber == field.pnumber || user == field.pinsured) {
                $("#pid").html(field.pnumber);
                $("#psum").append(" for " + field.pnumber);
                $("#pan").html(field.powner);
                $("#pins").html(field.pinsured);
                $("#pstat").html(field.pstatus);
                $("#pdate").html(field.idate);
                $("#prod").html(field.pname);
                $("#mstat").html(field.billfreq);
                $("#accVal").html(field.apremium);
                $("#rid").html(field.mpremium);
                $("#agent").html(field.pnumber);
                if (sessionStorage.nominee == undefined)
                    $("#nominee").html(field.nominee);
                else
                    $("#nominee").html(sessionStorage.nominee);
                if (sessionStorage.phone == undefined)
                    $("#phone").html(field.phone);
                else
                    $("#phone").html(sessionStorage.phone);
            }
        });
    });
});
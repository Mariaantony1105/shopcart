$(function () {
    var role = sessionStorage.role;
    var pName = sessionStorage.username;
    var pNumber = sessionStorage.pNumber;
    var editFlag = false;
    if (role == "user") {
        $("#admPanel").hide();
        $.getJSON("data/summary.json", function (result) {
            $.each(result, function (i, field) {
                if (field.pnumber == pNumber || field.pinsured == pName)
                {
                    $("#pename").val(field.pinsured);
                    $("#penum").val(field.pnumber);
                    $("#ephone").val(field.phone);
                    $("#enominee").val(field.nominee);
                    $("#epanel").show();
                }
            });
        });
    }
    else {
        $("#det").button().on("click", function () {
            $("#epanel button").button();
            pNumber = $("#policyNumber").val();
            $.getJSON("data/summary.json", function (result) {
                $.each(result, function (i, field) {
                    if (field.pnumber == pNumber)
                    {
                        $("#pename").val(field.pinsured);
                        $("#penum").val(field.pnumber);
                        $("#ephone").val(field.phone);
                        $("#enominee").val(field.nominee);
                        $("#epanel").show();
                        $("#peditError").html("").removeClass("ui-state-highlight ui-corner-all");
                        return false;
                    }
                    else {
                        $("#peditError").html("Invalid Policy Number!").addClass("ui-state-highlight ui-corner-all").css("width", "200px");
                        $("#epanel").hide();
                    }
                });
            });
        });
    }

    $("#edp").click(function () {
        $("#ephone").removeAttr("disabled");
        $("#enominee").removeAttr("disabled");
    });

    $("#ephone, #enominee").change(function () {
        editFlag = true;
    });
    $("#save").click(function () {
        $("#ephone").attr("disabled", true);
        $("#enominee").attr("disabled", true);
        sessionStorage.nominee = $("#enominee").val();
        sessionStorage.phone = $("#ephone").val();
        if (editFlag) {
            $("#peditError").html("Details updated successfully!").addClass("ui-state-highlight ui-corner-all").css("width", "250px");
            $('#tabs-2').load('user.html');
        } else
            $("#peditError").html("There was no change in the values!").addClass("ui-state-highlight ui-corner-all").css("width", "300px");
    });
});

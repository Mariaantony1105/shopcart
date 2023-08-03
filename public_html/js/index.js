$(function () {
    //Smooth Scroll
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });


    // Main Menu
    $('#main-nav').affix({
        offset: {
            top: $('header').height()
        }
    });


    /* Program Logic */
    $('#city').selectmenu({
        change: function (event, ui) {
            var city = ui.item.value;
            var res = [];
            $.getJSON("data/agents.json", function (result) {
                $.each(result, function (i, field) {
                    if (field.city == city)
                        res.push("<tr><td>" + field.name + "</td><td>" + field.email + "</td><td>" + field.phone + "</td></tr>");
                    $("#agentTable tbody").html(res);
                    $("#agentTable").show();
                });
            });
        }
    });
    $('.login').button();
    $("#accordion").accordion();
    $('#loginform').submit(function (event) {
        event.preventDefault();
        var flag = false;
        $.getJSON("data/users.json", function (jsonresponse) {
            $.each(jsonresponse, function (i, field) {
                if ($("#lusername").val() == field.username && $("#lpassword").val() == field.password) {
                    flag = true;
                    sessionStorage.username = field.username;
                    sessionStorage.role = field.role;
                }
            });
            if (flag) {
                window.open('tabs.html', '_blank');
                $("#loginform").trigger("reset");
                $("#loginError").html("").removeClass("ui-state-highlight ui-corner-all");
            }
            else {
                $("#loginError").html("Invalid Credentials!").addClass("ui-state-highlight ui-corner-all");
            }
        });
    });
    $("#accountForm").submit(function (event) {
        event.preventDefault();
    });
    $("#accountDialog").dialog({
        resizable: false,
        height: "auto",
        width: 600,
        modal: true,
        autoOpen: false,
        buttons: {
				Register: function (e) {
                    e.preventDefault();
                    console.log($("#susername").val());
                    if ($("#susername").val().length === 0 || $("#spassword").val().length === 0 || $("#cpassword").val().length === 0 || $("#policy").val().length === 0) {
                        $("#accountError").html("All fields are mandatory!").addClass("ui-state-error ui-corner-all");
                        return false;
                    }
                    var flag = false;
                    $.getJSON("data/summary.json", function (jsonresponse) {
                        $.each(jsonresponse, function (i, field) {
                            if ($("#policy").val() == field.pnumber) {
                                flag = true;
                                sessionStorage.username = $("#susername").val();
                                sessionStorage.role = "user";
                                sessionStorage.pNumber = field.pnumber;
                                return false;
                            }
                        });
                        if (flag) {
                            if ($("#spassword").val() == $("#cpassword").val()) {
                                $("#accountForm").trigger("reset");
                                $("#accountDialog").dialog("close");
                                window.open('tabs.html', '_blank');
                                $("#loginform").trigger("reset");
                                $("#accountError").html("").removeClass("ui-state-error ui-corner-all");
                            }
                            else
                                $("#accountError").html("Passwords do not match!").addClass("ui-state-error ui-corner-all");
                        }
                        else {
                            $("#accountError").html("Invalid Policy number!").addClass("ui-state-error ui-corner-all");
                        }
                    });
                }, 
                Cancel: function () {
                    $("#accountForm").trigger("reset");
                    $(this).dialog("close");
                    $("#accountError").html("").removeClass("ui-state-error ui-corner-all");
                }
            }
    });

    $("#signup").click(function (e) {
        e.preventDefault();
        $("#accountForm").trigger("reset");
        $("#accountDialog").dialog("open");
    });
    $(".contactForm").submit(function (e) {
        e.preventDefault();
        $("#sendmessage").show();
        $(".contactForm").trigger("reset");
    });
});




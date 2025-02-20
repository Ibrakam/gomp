$.fn.animateRotate = function (start, angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;

    return this.each(function (i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function (now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(e, arguments);
        };

        $({ deg: start }).animate({ deg: angle }, args);
    });
};

jQuery.fn.login = function (params) {
    return this.each(function () {
        var animating = false;
        if (params === undefined) params = {};
        var container = $(this);

        function showPanel(level, panel) {
            $("div[smart-level='" + level + "']", container).hide();
            $("div[smart-level='" + level + "'][smart-role='" + panel + "']", container).show();
            $(window).trigger("resize");
        }

        function getElement(element) {
            return $("[smart-role='" + element + "']", container);
        }

        function afterLogon(redirectUrl) {
            besmart.ludwig.async(params,
                "/AfterLogon/afterLog", function (result) {

                    //animating = true;
                    //$(".brand_logo").animate({ zoom: '500%' }, "slow", function () { });

                    if (result.redirect === null || result.redirect === undefined || result.redirect === "") {
                        window.location.href = redirectUrl;
                    }
                    else {
                        window.location.href = result.redirect;
                    }


                }, function (result) {

                    $("#userName").addClass("text-danger");
                    $("#password").addClass("text-danger");
                });
        }

        function login() {

            params.userID = $("#userName").val();
            params.password = $("#password").val();

            fetch(params.url + "/loginClick", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
                .then(response => response.json()).
                then(result => {
                    gomp.base.gompNormalize2(result);
                    if (result.success) {

                        //Droid
                        if (isDroid()) {
                            window.smart_edu_mobile.logonAccepted(result.userName, result.token);
                        }

                        //IOS
                        if (isIOS()) {
                            window.webkit.messageHandlers.smart_edu_mobile.postMessage({ message: "logonAccepted", userName: result.userName, token: result.token });
                        }

                        afterLogon(result.redirect);
                    }
                    else {

                        showErrorAlert("Errore", "Parametri errati");

                        $("#loginButton").show();
                        $("#spinnerLogin").hide();

                        if (result.type === "id") {
                            $("#userName").addClass("is-invalid");
                        }

                        if (result.type === "pass") {
                            $("#password").addClass("is-invalid");
                        }

                        if (result.type === "fail") {
                            $("#password").addClass("is-invalid");
                            $("#userName").addClass("is-invalid");
                        }
                    }
                });
        }

        function loginWithGoogle() {

            fetch(params.url + "/afterLoginGoogle", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
                .then(response => response.json()).
                then(result => {
                    if (result.success) {
                        window.location.href = result.redirectController;
                    }
                    else {

                                              

                        console.log("error");
                    }
                });
        }
                
        function loginWithShibbolethButton() {

            fetch(params.url + "/afterLoginShibboleth", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
                .then(response => response.json()).
                then(result => {
                    if (result.success) {
                        window.location.href = result.redirectController;
                    }
                    else {
                        console.log("error");
                    }
                });
        }

        function init() {
            $("#accessDebugInfo").text("desk");

            //Droid
            if (isDroid()) {
                window.smart_edu_mobile.needLogon();
                $("#accessDebugInfo").text("droid");
            }

            //IOS
            if (isIOS()) {
                window.webkit.messageHandlers.smart_edu_mobile.postMessage({
                    message: "needLogon"
                });
                $("#accessDebugInfo").text("ios");
            }


            showPanel("main", "loginPanel");

            $("#loginButton").show();
            $("#spinnerLogin").hide();

            prefilling();

            if (params.spid !== "True") {
                $("#spidContainer").hide();
                $("#liSpid").hide();
            }

            if (params.showSpidTest !== "True") {

                $("#besmartidTest").hide();
                $("#govitTest").hide();
            }

            if (params.google !== "True") {
                $("#divGoogleAuth").hide();
                $("#liGoogleAuth").hide();
            }

            if (params.cie !== "True") {
                $("#divCieAuth").hide();
                $("#liCieAuth").hide();
            }

            if (params.shibboleth !== "True") {
                $("#divShibbolethAuth").hide();
                $("#liShibbolethAuth").hide();
            }

            $("#spidTypeContainer").hide();

            $("#loginWithGoogleButton").click(function () {
                loginWithGoogle();
            });

            $("#loginWithShibbolethButton").click(function () {
                loginWithShibbolethButton();
            });

            $("#loginButton").click(function () {
                $("#loginButton").hide();
                $("#spinnerLogin").show();
                login();
            });

            $("#userName").keydown(function (e) {
                var keyCode = e.keyCode;
                if (keyCode == '13') {
                    $("#loginButton").hide();
                    $("#spinnerLogin").show();
                    login();
                }
            });

            $("#password").keydown(function (e) {
                var keyCode = e.keyCode;
                if (keyCode == '13') {
                    $("#loginButton").hide();
                    $("#spinnerLogin").show();
                    login();
                }
            });

            $("#goToCreateAccount").click(function () {
                showPanel("main", "newAccountPanel");
            });

            setInterval(function () { animateLogo(); }, 1000);

            $(".brand_logo").click(function () {

                if (!animating) {
                    animating = true;
                    $(".brand_logo").animate({ zoom: '120%' }, "fast", function () { $(".brand_logo").animate({ zoom: '100%' }, "slow", function () { animating = false; }); });
                }
                else {
                    $(".brand_logo").animate({ zoom: '160%' }, "fast", function () { $(".brand_logo").animate({ zoom: '100%' }, "slow", function () { animating = false; }); });
                }



            });
        }

        function animateLogo() {
            if (!animating) {

                var randomNumber = Math.floor(Math.random() * 10);

                switch (randomNumber) {
                    case 0:
                        {
                            animating = true;

                            $(".brand_logo").animateRotate(0, -5, 2500, 'linear', function () {
                                $(".brand_logo").animateRotate(-5, 0, 500, 'linear', function () { animating = false; });
                            });
                        }
                        break;
                    case 1:
                        {
                            animating = true;

                            $(".brand_logo").animateRotate(0, 3, 150, 'linear', function () {
                                $(".brand_logo").animateRotate(3, 0, 500, 'linear', function () { animating = false; });
                            });
                        }
                        break;
                    case 2:
                        {
                            animating = true;

                            $(".brand_logo").animate({ zoom: '105%' }, "slow", function () { $(".brand_logo").animate({ zoom: '100%' }, "slow", function () { animating = false; }); });
                        }
                        break;
                    case 3:
                        {
                            animating = true;

                            $(".brand_logo").animate({ zoom: '98%' }, "slow", function () { $(".brand_logo").animate({ zoom: '100%' }, "slow", function () { animating = false; }); });
                        }
                        break;
                }
            }
        }

        init();
    });
};

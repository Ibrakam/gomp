jQuery.fn.homeMenu = function (params) {
    return this.each(function () {
        if (params.breadcrumbsContainer === undefined) params.breadcrumbsContainer = "#breadCrumbMenu";

        var container = $(this);
        var menuUid = params.homeMenu;
        var mainData = null;

        function setHomeIcons() {
            var hParams = {

                menuUid: params.homeMenuParent,
                section: params.homeMenuSection,
                language: params.language

            }

            fetch(params.url + "/getGridMenu", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hParams)
            })
                .then(response => response.json()).
                then(result => {
                    gomp.base.gompNormalize2(result);
                    mainData = result;
                    if (result.success) {
                        if (mainData.redirectRichiestaAccreditamento) {
                            location.href = mainData.redirectRichiestaAccreditamento;
                        }
                        drawGrid(result.menu, params.style);
                        $(params.breadcrumbsContainer).breadcrumbs({ section: params.homeMenuSection, parent: params.homeMenuParent, lastVisible: false, language: params.language });
                    }
                });

        }

        function drawGrid(menu, style) {
            var iconList = $("#homeIconList");
            var simpleList = $("#groupList");

            if (menu !== null) {
                $.each(menu.items, function (index, item) {

                    if (style === "list") {

                        if (item.url !== null) {


                            var element = $("<li/>");
                            element.css("cursor", "pointer");
                            element.addClass("list-group-item");
                            if (index % 2 == 0) element.addClass("bg-light");
                            simpleList.append(element);

                            var anchor = $("<a>");
                            anchor.attr("href", item.url);
                            anchor.addClass("text-dark");
                            element.append(anchor);


                            var icon = $("<i/>");
                            icon.addClass(item.awesome);

                            icon.removeClass("fa-3x");
                            icon.addClass("fa-2x");
                            if ((item.url.indexOf("/Notices") == 0) || item.url == "/Logout") {
                                icon.removeClass("text-white");
                                icon.addClass("text-dark");
                            }

                            var textSpan = $("<span/>");
                            textSpan.addClass("smartedu_hiddenMobile");
                            textSpan.css("margin-left", "20px");

                            textSpan.html(item.html);

                            var smallTextSpan = $("<span/>");
                            smallTextSpan.css("margin-left", "20px");
                            smallTextSpan.addClass("smartedu_onlyMobile");
                            smallTextSpan.html(item.shortHtml);

                            anchor.html(textSpan);
                            anchor.html(smallTextSpan);
                            anchor.prepend(icon);

                            if (icon.hasClass("hidden_for_app")) {
                                element.addClass("hidden_for_app");
                            }


                        }

                    } else {

                        if (item.awesome !== null && item.url !== null) {

                            var element = $("<li/>");
                            element.addClass("col mb-4");
                            iconList.append(element);

                            var anchor = $("<a/>");
                            anchor.addClass("d-block text-dark text-decoration-none");
                            anchor.attr("href", "javascript:swipeRedirect('" + item.url + "');");
                            element.append(anchor);

                            var iconDiv = $("<div/>");
                            iconDiv.addClass("home-btn p-3 py-4 mb-2 text-center rounded border");
                            if ((item.url.indexOf("/Notices") === 0)) {
                                iconDiv.addClass("bg-dark");
                            }
                            else {
                                if (item.url == "/Logout") {
                                    iconDiv.addClass("bg-danger");
                                }
                                else {
                                    iconDiv.addClass("bg-light")
                                }
                            }
                            anchor.append(iconDiv);
                            iconDiv.attr("title", $("<div/>").html(item.html).text());

                            var icon = $("<i/>");
                            icon.addClass(item.awesome);
                            iconDiv.append(icon);
                            if ((item.url.indexOf("/Notices") === 0)) {
                                if ($("#noticesCount").html().trim() !== "0") {
                                    var span = $("<span/>");
                                    span.addClass("fa-layers-counter bg-danger");
                                    span.text($("#noticesCount").html());
                                    iconDiv.append(span);
                                }

                            }

                            var textDiv = $("<div/>");
                            textDiv.addClass("name text-muted text-decoration-none text-center pt-1 text-bold smartedu_hiddenMobile");
                            textDiv.html(item.html);
                            anchor.append(textDiv);

                            var smallTextDiv = $("<div/>");
                            smallTextDiv.addClass("name text-muted text-decoration-none text-center pt-1 text-bold smartedu_onlyMobile");
                            smallTextDiv.html(item.shortHtml);
                            anchor.append(smallTextDiv);

                            if (icon.hasClass("hidden_for_app")) {
                                element.addClass("hidden_for_app");
                            }

                            if (icon.hasClass("smart_taxcounter") && mainData.totalDebts !== null && mainData.totalDebts !== "") {
                                var badgeDiv = $("<div/>");
                                iconDiv.append(badgeDiv);

                                badgeDiv.css("position", "absolute");
                                badgeDiv.css("text-align", "center");
                                badgeDiv.css("z-index", "101");
                                badgeDiv.css("left", "3px");
                                badgeDiv.css("right", "4px");
                                badgeDiv.css("top", "45%");

                                var badge = $("<span/>");
                                badgeDiv.append(badge);
                                badge.addClass("badge badge-light badge-pill");
                                badge.text("EUR " + mainData.totalDebts);
                            }
                        }
                    }
                });
            }
        }

        function init() {
            setHomeIcons();            
        }

        init();

    });
}
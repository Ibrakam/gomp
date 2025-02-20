jQuery.fn.portalMenu = function (params) {
    return this.each(function () {
        var container = $(this);
        if (params === undefined) params = {};
        if (params.items === undefined) params.items = [];
        if (params.supportedItems === undefined) params.supportedItems = [];
        if (params.sideBarSelector === undefined) params.sideBarSelector = "#sidebar";
        if (params.sideBarSupportedSelector === undefined) params.sideBarSupportedSelector = "#navbarSupportedContentItems";
        if (params.user === undefined) params.user = null;
        if (params.source === undefined) params.source = null;
        if (params.section === undefined) params.section = null;
        if (params.parent === undefined) params.parent = null;
        if (params.language === undefined) params.language = "ITA";
        if (params.breadcrumbsContainer === undefined) params.breadcrumbsContainer = "#breadCrumbMenu";

        function drawMenuHeader(item, parent) {
            var div = $("<div/>");
            parent.append(div);
            div.addClass("sidebar-header");
            var h3 = $("<h3/>");
            div.append(h3);
            h3.html(item.html);
        }

        function drawMenuItemUnlisted(item, parent) {
            var li = $("<li/>");
            parent.append(li);
            if (item.active !== undefined && item.active !== null && item.active ||
                (params.active !== undefined && params.active !== null && params.active === item.key)
            ) {
                li.addClass("active");
            }

            switch (item.itemType) {
                case "header":
                    {
                        li.html(item.html);
                        li.addClass("nav-header text-uppercase font-weight-bold");
                    }
                    break;
                case "item":
                    {
                        li.addClass("nav-item");

                        var iA = $("<a/>");
                        iA.addClass("nav-link");
                        li.append(iA);



                        if (item.awesome !== undefined && item.awesome !== null) {
                            var i = $("<i/>");
                            iA.append(i);
                            i.addClass(item.awesome);
                            iA.append(" ");
                        }
                        var iAp = $("<p/>");
                        iA.append(iAp);
                        if (li.hasClass("active")) {
                            if (params.activeName !== undefined && params.activeName !== null) {
                                iAp.append(params.activeName);
                            }
                            else {
                                iAp.append(item.html);
                            }
                        }
                        else {
                            iAp.append(item.html);
                        }

                        if (item.url !== null && item.url !== undefined) {
                            iA.attr("href", item.url);
                        }

                        if (item.items !== undefined && item.items.length > 0) {
                            iAp.append("<i class=\"fas fa-angle-left right\"></i>");
                            var ulItems = $("<ul/>");
                            li.append(ulItems);
                            ulItems.addClass("nav nav-treeview");
                            li.addClass("has-treeview");

                            $.each(item.items, function (index, item) {
                                drawMenuItemUnlisted(item, ulItems);
                            });
                        }
                    }
                    break;
                case "img":
                    {
                        var im = $("<img/>");
                        li.append(im);

                        im.attr("src", item.src);
                        im.addClass("smartEdu nav-header");
                    }
            }
            parent.append(li);
        }

        function drawMenuUnlisted(item, parent) {
            if (item === undefined || item === null) return;

            $("#templateMenuMainTitle").html(item !== undefined && item != null ? item.html : "");
            $("#templateMenuUserAccount").text(item !== undefined && item != null ? item.user : "");

            var ul = $("<ul/>");
            parent.append(ul);
            ul.addClass("nav");
            ul.addClass("nav-pills");
            ul.addClass("nav-sidebar");
            ul.addClass("flex-column");
            ul.attr("data-widget", "treeview");
            ul.attr("role", "menu");
            ul.attr("data-accordion", "false");
            if (item.items !== undefined && item.items !== null) {
                $.each(item.items, function (index, uItem) {
                    drawMenuItemUnlisted(uItem, ul);
                });
            }
            ul.Treeview();
        }

        function drawUnstyled(item, parent) {
            var ul = $("<ul/>");
            parent.append(ul);
            ul.addClass("list-unstyled");
            ul.addClass("CTAs");
            if (item.items !== undefined && item.items !== null) {
                $.each(item.items, function (index, uItem) {
                    drawMenuItemUnlisted(uItem, ul);
                });
            }
        }

        function drawMenuItem(item, parent) {
            switch (item.itemType) {
                case "header":
                    {
                        drawMenuHeader(item, parent);
                    }
                    break;
                case "unlisted":
                    {
                        drawMenuUnlisted(item, parent);
                    }
                    break;
                case "unstyled":
                    {
                        drawUnstyled(item, parent);
                    }
                    break;
            }
        }

        function drawBreadCrumb(breadCrumbItems) {
            var breadCrumbMenu = $("#breadCrumbMenu");

            breadCrumbMenu.html("");

            $.each(breadCrumbItems, function (index, breadCrumbItem) {
                console.log(breadCrumbItem);
                var liItem = $("<li/>");
                breadCrumbMenu.append(liItem);
                liItem.addClass("breadcrumb-item");

                var aItem = $("<a/>");
                liItem.append(aItem);
                aItem.attr("href", breadCrumbItem.url);

                var iItem = $("<i/>");
                aItem.append(iItem);
                iItem.addClass(breadCrumbItem.awesome);

                aItem.append(" " + breadCrumbItem.html);

            });
        }

        function drawSupportedItem(item, parent) {
            var li = $("<li/>");
            parent.append(li);
            if (item.active !== undefined && item.active !== null && item.active ||
                (params.active !== undefined && params.active !== null && params.active === item.key)
            ) {
                li.addClass("active");
            }

            switch (item.itemType) {
                case "header":
                    {
                        var hP = $("<p/>");
                        li.append(hP);
                        if (item.class !== undefined && item.class !== null) {
                            hP.addClass(item.class);
                        }
                        if (item.html !== undefined && item.html !== null) {
                            hP.html(item.html);
                        }
                        if (item.text !== undefined && item.text !== null) {
                            hP.text(item.text);
                        }
                    }
                    break;
                case "item":
                    {
                        var iA = $("<a/>");
                        li.append(iA);
                        iA.html(item.html);
                        if (item.class !== undefined && item.class !== null) {
                            iA.addClass(item.class);
                        }
                        if (item.click !== undefined && item.click !== null) {
                            iA.attr("href", "javascript:");
                            iA.click(function () { item.click(item); });
                        }
                        else {
                            if (item.href !== undefined && item.href !== null) {
                                item.attr("href", item.href);
                            }
                        }
                    }
            }
            parent.append(li);
        }

        function init() {
            $(params.sideBarSelector).html("");
            $(params.sideBarSupportedSelector).html("");


            if (params.source === null) {
                $.each(params.items, function (index, item) {
                    drawMenuItem(item, $(params.sideBarSelector));
                });

                if (params.breadCrumbItems !== undefined && params.breadCrumbItems !== null) {
                    drawBreadCrumb(params.breadCrumbItems);
                }

                $(params.breadcrumbsContainer).breadcrumbs({ section: params.section, parent: params.parent, language: params.language });
            }
            else {
                var section = (params.section !== null && params.section !== "") ? params.section : "_";
                var parent = (params.parent !== null && params.parent !== "") ? params.parent : "00000000-0000-0000-0000-000000000000";

                $.get(params.source + "/" + section + "/" + parent + "/" + params.language, function (result) {
                    if (result != "") {
                        drawMenuUnlisted(result.menu, $(params.sideBarSelector));
                        if (result.avatar !== null) {
                            $("#templateMenuImage").attr("src", result.avatar);
                        }
                        $("#templateMenuUserAccount").text(result.user);

                        $(params.breadcrumbsContainer).breadcrumbs({ section: section, parent: parent, language: params.language });
                    }
                    else {
                        $("#menuOnLeft").hide();
                        $("#openMenuLeftButton").hide();
                        $("#navDeleteToIndex").css("margin-left", "0px");
                        $("#contentWrapperTO0").css("margin-left", "0px");
                    }
                });
            }




            if (params.title !== undefined && params.title !== null) {
                var h1Title = $("<h1/>");
                $(".navbar-title").append(h1Title);
                h1Title.text(params.title);
            }
            if (params.user !== undefined && params.user !== null) {
                var aUser = $("<a/>");
                $("#userAccount").append(aUser);
                aUser.addClass("d-block");
                aUser.text(params.user.Nome);
            }
            $.each(params.supportedItems, function (index, item) {
                drawSupportedItem(item, $(params.sideBarSupportedSelector));
            });

            $("#logout").click(function () {
                document.location.href = "/WorkFlow2011/Logon/Logout.aspx";
            });

            $("#home").click(function () {
                document.location.href = "/MainMenu/Default.aspx";
            });

            try {
                $('[data-widget="pushmenu"]').PushMenu('collapse');
            }
            catch (error) {

            }
                


        }

        init();

    });
}
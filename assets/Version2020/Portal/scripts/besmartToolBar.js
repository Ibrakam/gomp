// be smart Tool Bar
// (c) 2020 Be Smart
jQuery.fn.besmartToolBar = function (params) {
    return this.each(function () {
        var container = $(this);

        if (params === undefined) params = {};
        if (params.buttons === undefined) params.buttons = [];

        if (params.css === undefined) params.css = "besmartToolBar";
        if (params.rowCss === undefined) params.rowCss = "navbar navbar-expand-lg navbar-light";
        if (params.defaultButtonClass === undefined) params.defaultButtonClass = "col-md-auto";
        if (params.defaultButtonActiveClass === undefined) params.defaultButtonActiveClass = "active";

        function init() {
            container.html("");
            container.addClass(params.css);

            var ul = $("<div/>");
            container.append(ul);
            ul.addClass(params.rowCss);

            $.each(params.buttons, function (index, button) {
                var li = $("<div/>");
                ul.append(li);
                li.addClass(params.defaultButtonClass);
                li.attr("id", button.id);

                //css
                if (button.class !== undefined) {
                    li.addClass(button.class);
                }

                //active
                if (button.active) {
                    li.addClass(button.defaultButtonActiveClass);
                }

                if (button.isSeparator) {
                    li.css("border-left", "1px #1e1e1e dotted");
                    
                }

                if (button.href !== undefined && button.href !== null) {
                    var a = $("<a/>");
                    li.append(a);
                    a.attr("href", button.href);

                    if (button.awesome !== undefined && button.awesome !== null) {
                        var i = $("<i/>");
                        a.append(i);
                        i.addClass(button.awesome);
                        i.attr("title", button.name);
                    }
                }

                if (button.onClick !== undefined && button.onClick !== null) {

                    if (button.buttons !== undefined && button.buttons !== null) {
                        var htmlButton = $("<div type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\true\" aria-expanded=\"false\"/>");
                        li.append(htmlButton);
                        htmlButton.addClass("dropdown-toggle");

                        if (button.awesome !== undefined && button.awesome !== null) {
                            var htmlButtonI = $("<i/>");
                            htmlButton.append(htmlButtonI);
                            htmlButtonI.addClass(button.awesome);
                            htmlButtonI.attr("title", button.name);
                        }

                        htmlButton.append("<span class=\"caret\"></span>");

                        var htmlButtonUl = $("<ul class=\"dropdown-menu\" style=\"\" role=\"menu\">");
                        li.append(htmlButtonUl);

                        if (button.maxHeight !== undefined) {
                            htmlButtonUl.css("max-height", button.maxHeight);
                            htmlButtonUl.css("overflow-y", "scroll");
                        }

                        $.each(button.buttons, function (subIndex, sub) {
                            var htmlButtonLi = $("<li style=\"cursor: pointer\" class=\"dropdown-item\"/>");
                            htmlButtonUl.append(htmlButtonLi);
                            if (!sub.isSeparator) {

                                var htmlButtonLiI = $("<i/>");
                                htmlButtonLi.append(htmlButtonLiI);
                                htmlButtonLiI.addClass(sub.awesome);
                                htmlButtonLiI.attr("title", sub.name);
                                htmlButtonLi.append(" " + sub.name);
                                if (sub.onClick !== undefined && sub.onClick !== null) {
                                    htmlButtonLi.click(function () { sub.onClick(sub); });
                                }
                                if (sub.onCreate !== undefined && sub.onCreate !== null) {
                                    sub.onCreate(htmlButtonLi);
                                }
                            }
                            else {
                                htmlButtonLi.append("<hr/>");
                            }
                        });

                        htmlButton.dropdown();
                    }
                    else {
                        var a = $("<div/>");
                        li.append(a);
                        a.css("cursor", "pointer");
                        //a.attr("href", "#");
                        a.click(function () { button.onClick(button); });

                        if (button.awesome !== undefined && button.awesome !== null) {
                            var i = $("<i/>");
                            a.append(i);
                            i.addClass(button.awesome);
                            i.attr("title", button.name);
                        }

                        if (button.text !== undefined && button.text !== null && button.text !== "") {
                            var i = $("<span/>");
                            a.append(i);
                            i.html(button.text);
                        }
                    }
                }
                else {
                    if (button.text !== undefined && button.text !== null && button.text !== "") {
                        var a = $("<div/>");
                        li.append(a);
                        a.css("white-space", "nowrap");
                        a.css("overflow", "hidden");
                        a.css("text-overflow", "ellipsis");

                        var i = $("<span/>");
                        a.append(i);
                        i.html(button.text);
                    }
                }
                


            });
        }

        init();
    });
};
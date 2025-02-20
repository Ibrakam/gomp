jQuery.fn.breadcrumbs = function (params) {
    return this.each(function () {
        var container = $(this);
        if (params === undefined) params = {};

        if (params.url === undefined) params.url = "/Menu";
        if (params.source === undefined) params.source = null;
        if (params.section === undefined) params.section = null;
        if (params.parent === undefined) params.parent = null;
        if (params.language === undefined) params.language = "ITA";
        if (params.class === undefined) params.class== "breadcrumb-item";
        if (params.lastVisible === undefined) params.lastVisible = true;

        function drawBreadCrumb(items) {
            container.html("");

            $.each(items, function (index, item) {
                if (index != items.length - 1 || params.lastVisible || items.length == 1) {
                    // <li class="breadcrumb-item"><a href="javascript:swipeRedirect('/Home');"><i class="fas fa-home"></i> Home</a></li>
                    var li = $("<li/>");
                    container.append(li);
                    li.addClass(params.class);

                    if (index > 0) li.append("&nbsp;&gt;&nbsp;");

                    var a = $("<a/>");
                    li.append(a);
                    a.attr("href", "javascript:swipeRedirect('" + item.url + "');");

                    if (index == 0) a.attr("href", "/");

                    var i = $("<i/>");
                    a.append(i);
                    //i.addClass(item.awesome);

                    a.append(" ");

                    a.append(item.html);
                }
            });
        }

        function init() {
            $(params.sideBarSelector).html("");

            try {
                fetch(params.url + "/getMenuPath/" + params.section + "/" + params.parent + "/" + params.language, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json()).
                    then(result => {
                        gomp.base.gompNormalize2(result);
                        mainData = result;
                        if (result.success) {

                            drawBreadCrumb(result.path);

                        }
                    });
            }
            catch {
                console.log("breadcrumb problems...");
            }
            
        }

        init();

    });
}
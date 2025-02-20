function isDroid() {
    //Droid
    if (window.smart_edu_mobile) {
        return true;
    }
    return false;
}

function isIOS() {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.smart_edu_mobile) {
        return true;
    } else if (window.ReactNativeWebView) {
        window.webkit = window.webkit ?? {};
        window.webkit.messageHandlers = window.webkit.messageHandlers ?? {};
        window.webkit.messageHandlers.smart_edu_mobile = window.webkit.messageHandlers.smart_edu_mobile ?? {};
        window.webkit.messageHandlers.smart_edu_mobile.postMessage = window.webkit.messageHandlers.smart_edu_mobile.postMessage ?? function (params) {
            let _message = params ? JSON.stringify(params) : null;
            window.ReactNativeWebView.postMessage(_message);
            //alert(_message);
        }; 

        return true;
    }
    return false;
}

function isApp() {
    return isDroid() || isIOS();
}

function swipeRedirect(url) {
    $(".mobileSwipeLoading").show();
    $(".mobileSwipeLoadingImage").animate({ zoom: '150%' }, 4000, function () { $(".mobileSwipeLoading").hide(); });

    document.location.href = url;
}
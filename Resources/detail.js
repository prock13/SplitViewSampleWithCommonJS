//DETAIL.JS

exports.createDetailWindow = function(){
    var DetailWin = Ti.UI.createWindow({
        title:'Detail',
        backgroundColor: '#fff'
    });

    var webView = null;
    
    /**
    * called when event is fired from master window tableView
    */
    function rowClicked(evtData) {
        Ti.API.debug(evtData);
        
        if (webView == null ){
            webView = Ti.UI.createWebView({
                autoDetect: [Ti.UI.iOS.AUTODETECT_NONE]
            }); 
            DetailWin.add(webView);   
        }

        webView.url = "http://en.wikipedia.org/wiki/" + evtData.title;
    }
    
    Ti.App.addEventListener('app:rowClicked',rowClicked);                       
    
  return DetailWin;
                    
};

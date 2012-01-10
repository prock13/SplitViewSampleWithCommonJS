// APP.JS

var masterWin = require('master');
var detailWin = require('detail');

// Simple Code for splitview ipad project
SplitViewApp = {};

// WINDOWS
SplitViewApp.masterWindow = masterWin.createMasterWindow();
SplitViewApp.detailWindow = detailWin.createDetailWindow();

//Forces the application to only open in Landscape
// MASTER NAV GROUP
SplitViewApp.masterNav = Ti.UI.iPhone.createNavigationGroup({
    window:SplitViewApp.masterWindow
});

// DETAIL NAV GROUP
SplitViewApp.detailNav = Ti.UI.iPhone.createNavigationGroup({
    window:SplitViewApp.detailWindow
});

// SPLIT VIEW
SplitViewApp.splitView = Titanium.UI.iPad.createSplitWindow({
    masterView:SplitViewApp.masterNav,
    detailView:SplitViewApp.detailNav
});

Ti.App.addEventListener.addEventListener('app:rowClicked', function(e) {
    Ti.API.log('setMasterPopupVisible');
    // see bug in lighthouse
    // <a href="https://appcelerator.lighthouseapp.com/projects/32238/tickets/2300-hide-master-popover-on-ipad">https://appcelerator.lighthouseapp.com/projects/32238/tickets/2300-hide-master-popover-on-ipad</a>
    SplitViewApp.splitView.setMasterPopupVisible(false);
    SplitViewApp.splitView.setMasterPopupVisible(true);
});

SplitViewApp.splitView.addEventListener('visible', function(e) {

    //if detail view then show button to display master list
    // the framework does this automagically!!
    if (e.view == 'detail') {
        e.button.title = "Master View List";
        SplitViewApp.detailWindow.leftNavButton = e.button;
        Ti.API.log('Set button');
    }
    else if (e.view == 'master') {
        SplitViewApp.detailWindow.leftNavButton = null;
        Ti.API.log('Removed button');
    }
});

SplitViewApp.splitView.open();

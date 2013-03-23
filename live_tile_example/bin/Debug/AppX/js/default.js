// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            // STEP 1 LIVE TILE
            var notifications = Windows.UI.Notifications;

            // STEP 2 LIVE TILE
            //===> For Wide Live Tile Step 1 Start
            // Set Template
            var template = notifications.TileTemplateType.tileWidePeekImage02;
            var tileXml = notifications.TileUpdateManager.getTemplateContent(template);
            //===> For Wide Live Tile Step 1 END

            //===> For Wide Live Tile Step 2 Start
                // Append text nodes
            var tileTextAttributes = tileXml.getElementsByTagName("text");
            tileTextAttributes[0].appendChild(tileXml.createTextNode("Live Tile"));
            tileTextAttributes[1].appendChild(tileXml.createTextNode("windows8developersblog.blogspot.com"));
                
                // Append Image node and alternat text
            var tileImageAttributes = tileXml.getElementsByTagName("image");
            tileImageAttributes[0].setAttribute("src", "ms-appx:///images/widelogo.png");
            tileImageAttributes[0].setAttribute("alt", "Touch Currency Converter");
            //===> For Wide Live Tile Step 2 END

            //STEP 3 LIVE TILE
            //===> For Squre Live Tile Step 1 Start
            var squareTemplate = notifications.TileTemplateType.tileSquareText04;
            var squareTileXml = notifications.TileUpdateManager.getTemplateContent(squareTemplate);
            //===> For Squre Live Tile Step 1 END

                // Append text nodes
            var squareTileTextAttributes = squareTileXml.getElementsByTagName("text");
            squareTileTextAttributes[0].appendChild(squareTileXml.createTextNode("My Tile"));
            squareTileTextAttributes[0].appendChild(squareTileXml.createTextNode("Some Text"));

            //STEP 4 LIVE TILE
                // Binding Wide and Squre
            var node = tileXml.importNode(squareTileXml.getElementsByTagName("binding").item(0), true);
            tileXml.getElementsByTagName("visual").item(0).appendChild(node);
            var tileNotification = new notifications.TileNotification(tileXml);
            
            //STEP 5 LIVE TILE
                //Create the notification based on the XML content you've specified
            notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
            
        }
    };

   

    app.start();
})();

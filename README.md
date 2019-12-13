# Lightstreamer - Basic Stock-List Demo - HTML (Ember.js) Client

<!-- START DESCRIPTION lightstreamer-example-stocklist-client-ember -->

A simple stocklist demo application showing integration between the [Ember.js](http://emberjs.com) framework and the <b>Lightstreamer JavaScript Client library</b>.

## Live Demo

[![screenshot](screen_ember_large.png)](http://demos.lightstreamer.com/EmberDemo)<br>
### [![](http://demos.lightstreamer.com/site/img/play.png) View live demo](http://demos.lightstreamer.com/EmberDemo)<br>

## Details

This demo displays real-time market data for ten stocks, generated by a feed simulator in a similar way to the [Lightstreamer - Basic Stock-List Demo - HTML Client](https://github.com/Lightstreamer/Lightstreamer-example-StockList-client-javascript#basic-stock-list-demo---html-client).<br>

This page uses the <b>JavaScript Client API for Lightstreamer</b> to handle the communications with Lightstreamer Server and uses <b>Ember.js</b> to display the real-time data pushed by Lightstreamer Server.

A Lightstreamer Subscription is used for subscribing to the data. The onItemUpdate callback manages the update of the model that backs the application template: once a new item event 
comes from the server, a lookup from the local store is performed to retrieve the matching object, in order to update its attribute values according to the modified item field values.
Finally, changes applied to the model will be automatically reflected by the framework in the HTML page.

The demo includes the following client-side functionalities:
* A [Subscription](https://lightstreamer.com/api/ls-web-client/latest/Subscription.html) containing 10 items, subscribed to in **MERGE** mode.

In the blog post ["A Simple Ember.js Demo for Lightstreamer"](http://blog.lightstreamer.com/2015/01/a-simple-emberjs-demo-for-lightstreamer.html) you can find a more in depth discussion about the integration between Ember.js and Lightstreamer.
<!-- END DESCRIPTION lightstreamer-example-stocklist-client-ember -->

## Install

If you want to install a version of this demo pointing to your local Lightstreamer Server, follow these steps:

* Note that, as prerequisite, the [Lightstreamer - Stock- List Demo - Java Adapter](https://github.com/Lightstreamer/Lightstreamer-example-Stocklist-adapter-java) has to be deployed on your local Lightstreamer Server instance. Please check out that project and follow the installation instructions provided with it.
* Launch Lightstreamer Server.
* Download this project.
* Deploy this demo on the Lightstreamer Server (used as Web server) or in any external Web Server. If you chose the former case, please create the folders <LS_HOME>/pages/demos/EmberDemo
then copy there the contents of the `/src` folder of this project. The client demo configuration assumes that Lightstreamer Server, Lightstreamer Adapters and this client are launched on the same machine.
If you need to target a different Lightstreamer server, please search this line:
```js
var lsClient = new LightstreamerClient(protocolToUse + "//localhost:8080", "DEMO");
```
in `lsClient.js` and change it accordingly.
* Lightstreamer JS client, RequireJS, Ember.js (and all its dependencies) are currently hot-linked in the HTML page: you may want to replace them with a local version and/or upgrade ther version

The demo is now ready to be launched.

## See Also

* [A Simple Ember.js Demo for Lightstreamer](http://blog.lightstreamer.com/2015/01/a-simple-emberjs-demo-for-lightstreamer.html)

### Lightstreamer Adapters Needed by This Demo Client

* [Lightstreamer - Stock-List Demo - Java Adapter](https://github.com/Lightstreamer/Lightstreamer-example-Stocklist-adapter-java)
* [Lightstreamer - Reusable Metadata Adapters - Java Adapter](https://github.com/Lightstreamer/Lightstreamer-example-ReusableMetadata-adapter-java)

### Related Projects

* [Lightstreamer - Stock-List Demos - HTML Clients](https://github.com/Lightstreamer/Lightstreamer-example-Stocklist-client-javascript)

## Lightstreamer Compatibility Notes

- Compatible with Lightstreamer JavaScript Client library version 6.0 or newer.

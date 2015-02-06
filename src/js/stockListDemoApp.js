/*
  Copyright 2015 Weswit Srl

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// Create an Ember Application.
var StockListDemoApp = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_BINDINGS: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_STACKTRACE_ON_DEPRECATION: true,
  LOG_VERSION: true,
  debugMode: true
});

// Define the "stock" resource, mapped to "/" path.
StockListDemoApp.Router.map(function() {
  this.resource("stock", { path : "/" } );
});
	
// Create the StockItem class: its attributes map to the fields name of the subscribed items.
// In this way we realize a one-to-one mapping between EmberJS Data Model and Lighstreamer fields schema.
StockListDemoApp.StockItem = DS.Model.extend({
  stock_name: DS.attr(),
  last_price: DS.attr(),
  time: DS.attr(),
  pct_change: DS.attr(),
  bid_quantity: DS.attr(),
  bid: DS.attr(),
  ask: DS.attr(),
  ask_quantity: DS.attr(),
  min: DS.attr(),
  max: DS.attr(),
  ref_price: DS.attr(),
  open_price: DS.attr(),
	  
  // Computed property to let different rendering on the HTML table
  isOdd: function() {
    return this.get("id") % 2 == 0;
  }.property('id')
});

// Use the local storage adapter to persist the model.
StockListDemoApp.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'stock-list'
});

// Define the StockRoute
StockListDemoApp.StockRoute = Ember.Route.extend({

  // Initialization code
  activate: function() {
    store = this.store;
    require(["js/lsClient", "Subscription"], function(lsClient, Subscription) {

      var stockSubscription = new Subscription("MERGE", 
        ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10"],
        ["stock_name", "last_price", "time", "pct_change", "bid_quantity", "bid", "ask", "ask_quantity", "min", "max", "ref_price", "open_price"]
      );

      stockSubscription.setDataAdapter('QUOTE_ADAPTER');
      stockSubscription.setRequestedSnapshot("yes");
      stockSubscription.addListener({
        onItemUpdate: function(info) {
          var i = info.getItemPos();
          if (!store.hasRecordForId('stockItem', i)) {
            // Push an empty record, with only the primary key
            store.push('stockItem', { id: i});
          }

          store.find('stockItem', i).then(function(stockItem) {
            info.forEachChangedField(function(fieldName, fieldPos, value) {
              // Set field value on the stockItem locally-persisted instance
              stockItem.set(fieldName, value)
            });
            // Commit the changes on the local store
            stockItem.save();
          });
        },
      });

      // Register the subscription	  
      lsClient.subscribe(stockSubscription);
    });
  },
	  
  model: function() {
    // The model is provided by retrieving all the stored stockItems
    return this.store.findAll('stockItem');
  },
});
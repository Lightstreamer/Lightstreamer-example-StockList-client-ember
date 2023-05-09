import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { LightstreamerClient, Subscription, ConsoleLogLevel, ConsoleLoggerProvider, ItemUpdate, StatusWidget } from 'lightstreamer-client-web/lightstreamer.esm';

export default class StockListComponent extends Component {
  itemNames = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10'];
  fieldNames = ['stock_name', 'last_price', 'time', 'pct_change', 'bid_quantity', 'bid', 'ask', 'ask_quantity', 'min', 'max', 'ref_price', 'open_price'];

  @tracked rows = [];

  constructor() {
    super(...arguments);
    LightstreamerClient.setLoggerProvider(new ConsoleLoggerProvider(ConsoleLogLevel.WARN));
    // creates a subscription
    var sub = new Subscription('MERGE', this.itemNames, this.fieldNames);
    sub.setDataAdapter('QUOTE_ADAPTER');
    sub.addListener(this);
    // subscribes to the stock items
    this.client = new LightstreamerClient((document.location.protocol === 'https:' ? 'https' : 'http') + '://push.lightstreamer.com', 'DEMO');
    this.client.subscribe(sub);
    // registers the StatusWidget
    this.client.addListener(new StatusWidget('left', '0px', true));
    // connects to the server
    this.client.connect();
  }

  // callback for SubscriptionListener.onItemUpdate event
  onItemUpdate(update/*: ItemUpdate*/) {
    var rows = [...this.rows];
    var item = this.getStockItem(update);
    var i = this.rows.findIndex(r => r.stock_name == item.stock_name);
    if (i != -1) {
      rows[i] = item;
    } else {
      i = rows.length;
      rows.push(item);
    }
    item.isOdd = i % 2 != 0;
    this.rows = rows;
  }

  getStockItem(update/*: ItemUpdate*/)/*: StockItem*/ {
    var obj = {};
    for (var f of this.fieldNames) {
      var val = update.getValue(f);
      if (f === 'stock_name' || f === 'time') {
        obj[f] = val;
      } else {
        obj[f] = parseFloat(val);
      }
    }
    return obj;
  }
}

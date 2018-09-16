const Influx = require('influx');
const amqp = require('amqplib/callback_api');

const influx = new Influx.InfluxDB({
  host: 'influxdb',
  database: 'weather',
});

// settings
const q = 'scribe';
const db = 'weather';

influx.getDatabaseNames()
  .then(names => {
    if (!names.includes(db)) {
      return influx.createDatabase(db);
    }
  })
  .then(() => {console.log('_____connected to influx')})

amqp.connect('amqp://rabbitmq', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertQueue(q, {durable: false});
    console.log("waiting for messages")
    ch.consume(q, function(msg) {
      console.log(`received: ${msg.content.toString()}`)
      let datum = JSON.parse(msg.content.toString())
      influx.writePoints([datum]).catch(err => {
        console.error(`Couldn't save to influx: ${err.stack}`)
      });
    }, {noAck: true});
  });
});

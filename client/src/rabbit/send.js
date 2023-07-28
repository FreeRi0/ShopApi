

const amqp = require("amqplib/callback_api");
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = "hello";
    const msg = "hi";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 1000);
});


// amqp.connect('amqp://localhost')
// .then(function(conn) {
//     return when(conn.createChannel().then(function(ch) {
//         var q = 'hello';
//         var msg = 'Hello World!';

//         var ok = ch.assertQueue(q, {durable: true});

//         return ok.then(function(_qok) {
//             ch.sendToQueue(q, new Buffer(msg), {deliveryMode: true});
//             console.log(" [x] Sent '%s'", msg);
//             return ch.close();
//         });
//     })).ensure(function() {
//         conn.close();
//     });
// })
// .then(null, console.warn);
import amqplib from "amqplib";
import route  from "../transports/rabbitmq";
import { RabbitmqMessage } from "../types/rabbitmqMessage";
const amqpUrl = process.env.AMQP_URL || "amqp://localhost:5672";
const connectToRabbitMQ = async () => {
  const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  channel.prefetch(10);
  return { connection, channel };
};

(async () => {
  const { connection, channel } = await connectToRabbitMQ();
  const queue = "auth";

  process.once("SIGINT", async () => {
    console.log("got sigint, closing connection");
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(queue, { durable: true });
  await channel.consume(
    queue,
    async (msg: any) => {
      const data:RabbitmqMessage = JSON.parse(msg.content.toString());
      console.log("[SERVER] Received message from queue", data);
      await route(data);
      await channel.ack(msg);
    },
    {
      noAck: false,
      consumerTag: "email_consumer",
    }
  );

  console.log("[SERVER] RabbitMQ consumer started");
})();
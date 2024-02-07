import r from "../resources";

const bucket = r.bucket.for("reading");
const kv = r.kv.for("setting");
// const queue = r.queue.for('sending');

r.topic.subscribe(async (ctx) => {
  console.log("received message: ", ctx.req.json());
  const { value } = ctx.req.json();

  const bucketValue = await bucket.file(value).read();
  const kvValue = await kv.get(value);
  // const task = await queue.receive(1);

  console.log("read values: ", { bucketValue, kvValue });

  return ctx;
});

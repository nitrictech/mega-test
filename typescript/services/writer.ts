import r from "../resources";

const bucket = r.bucket.for('writing');
const topic = r.topic.for('publishing');
const kv = r.kv.for('setting');
const queue = r.queue.for('sending');
// const queue = r.queue.for('sending');

r.api.put("/everything/:value", async (ctx) => {
    console.log("got everything request");
    const { value } = ctx.req.params;
    console.log('writing to bucket');
    await bucket.file(value).write(value);
    console.log('setting kv');
    await kv.set(value, {value});
    console.log('sending to queue');
    await topic.publish({value});
    console.log('publishing to topic');
    await queue.send({value});

    
    ctx.res.body = `Hello ${value}`;

    return ctx;
});
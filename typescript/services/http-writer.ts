import r from "../resources";

import express from "express";
import { http } from "@nitric/sdk";

const bucket = r.bucket.for('writing');
const topic = r.topic.for('publishing');
const kv = r.kv.for('setting');
const queue = r.queue.for('sending');

const app = express();

app.get("/:value", async (req, res) => {
    const value = req.params.value;

    console.log('writing to bucket');
    await bucket.file(value).write(value);
    console.log('setting kv');
    await kv.set(value, {value});
    console.log('sending to queue');
    await topic.publish({value});
    console.log('publishing to topic');
    await queue.send({value});

    res.send(`Hello ${value}`);
});

http(app);

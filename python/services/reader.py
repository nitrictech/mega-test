from resources import bucket, kv, secret, topic, batch_queue
from nitric.context import MessageContext
from nitric.application import Nitric

b = bucket.read_handle()
k = kv.r_kv.allow('get')
q = batch_queue.r_queue.allow('dequeue')
s = secret.r_secret.allow('access')
t = topic.r_topic

@t.subscribe()
async def reader_sub(ctx: MessageContext):
    print("received message: ", ctx.req.data)
    value = ctx.req.data['fields']['value']['stringValue']

    bucket_value = await b.file(value).read()
    kv_value = await k.get(value)
    queue_tasks = await q.dequeue(1)
    for qt in queue_tasks:
        await qt.complete()

    latest_secret = s.latest()
    secret_value = await latest_secret.access()

    print("Bucket values: ", bucket_value) 
    print("Secret values: ", secret_value.value)
    print("KV:", kv_value)
    print("Queue Tasks:", queue_tasks)

Nitric.run()

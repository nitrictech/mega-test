from resources import api, bucket, kv, secret, topic, batch_queue
from nitric.application import Nitric

b = bucket.write_handle()
k = kv.r_kv.allow('set')
q = batch_queue.r_queue.allow('enqueue')
t = topic.r_topic.allow('publish')
s = secret.r_secret.allow('put')
a = api.r_api

@a.put('/everything/:value')
async def writer_handler(ctx):
    print("received request with value", ctx.req.params['value'])
    value = ctx.req.params['value']
    
    print('writing to bucket')
    await b.file(value).write(value.encode('utf-8'))
    
    print('setting kv')
    await k.set(value, {"value": value})
    
    print('sending to queue')
    await q.enqueue({"value": value})

    print('setting secret')
    await s.put(value)

    print('publishing to topic')
    await t.publish({"value": value})

    ctx.res.body = f"Hello {value}"
    return ctx

Nitric.run()
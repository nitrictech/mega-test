import { kv, bucket, api, secret, topic, queue } from "@nitric/sdk";

type CacheValue = Record<string, string>
type TopicUpdate = Record<string, string>

export default {
    bucket: bucket("images"),
    kv: kv<CacheValue>("cache"),
    api: api("public"),
    queue: queue("batch"),
    // secret: secret("credentials"),
    topic: topic<TopicUpdate>("updates"),
}

import * as nitric from "@nitric/sdk";

export const bucket = nitric.bucket('bucket');

export const readHandle = () => {
    return bucket.for('reading');
}

export const writeHandle = () => {
    return bucket.for('writing');
}
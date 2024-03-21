from nitric.resources import bucket
from nitric.application import Nitric

r_bucket = bucket('bucket')

def read_handle():
    return r_bucket.allow('reading')

def write_handle():
    return r_bucket.allow('writing')
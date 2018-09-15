import os
import pika
from influxdb import InfluxDBClient


rabbit_host = os.environ.get('RABBIT_HOST',
                             'amqp://guest:guest@localhost:5672')
influx_host = os.environ.get('INFLUX_HOST',
                             'http://localhost:8086')
rabbit_params = pika.ConnectionParameters(host=rabbit_host)
rabbit_connection = pika.SelectConnection(rabbit_params)

# memory-station
time series database with messaging for data acquisition

## oct 2019 refactor

refactor to be in the cloud (digital ocean)
likely will stay on docker compose because learning kubernetes would be a hot mess and detract from actually writing working code

_list 'o containers_
* nginx reverse proxy for multiple routes on host
* influx db
* api server implemented in node / express?
* grafana

_TODO:_
* sentry integration
* logging
* copy over .env files

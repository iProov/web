Run: 

```
docker build . -t test
docker run --env-file $(pwd)/.env -p 80:80 --rm test
```

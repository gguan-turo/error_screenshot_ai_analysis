Create credentials text file in `.aws/credentials` and put following code into it.

```
[localstack]
aws_access_key_id     = AWS_ACCESS_KEY_ID
aws_secret_access_key = AWS_SECRET_ACCESS_KEY
```

And create another file `config` and contain this code in.

```
[default]
region = us-west-1
```

# iProov PHP Backend Integration Demo

The iProov PHP Backend Integration Demo illustrates a simple integration with the [iProov REST API](https://secure.iproov.me/docs.html) using PHP.

## Installation
Ensure you have [PHP](http://php.net) (v5.4 or greater) installed on your system. You can check this by running the following at the command line:

```bash
php -v
```

## Run the demo

Set the `$api_key` and `$secret` variables in [ajax.php](./ajax.php) with the ones provided to you (get new keys from the [iProov Portal](https://www.iproov.net)).

From the command line, change directory into the root of this project (containing [index.html](../index.html)) and run the following command:

```bash
php -S localhost:8000
```

Now you can load the demo in a browser at the following URL:

[http://localhost:8000](http://localhost:8000)

## Troubleshooting
If you are getting `error setting certificate verify locations: CAfile...` returned on your requests, this is due to your CURL not being able to find your local certificate. You need to uncomment this line:

    curl_setopt($curl, CURLOPT_CAINFO, 'PATH_TO_YOUR_CERTIFICATE');

And replace `PATH_TO_YOUR_CERTIFICATE` with the actual path to your local certificate.
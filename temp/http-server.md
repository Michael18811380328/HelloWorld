# http-server

在前端页面中，经常会在浏览器运行HTML页面，从本地文件夹中直接打开的一般都是`file`协议，当代码中存在`http`或`https`的链接时，HTML页面就无法正常打开，为了解决这种情况，需要在在本地开启一个本地的服务器。本文是利用`node.js`中的`http-server`，开启本地服务，步骤如下：

### 1 下载 http-server

`npm install http-server -g`

### 2 开启 http-server 服务

终端进入目标文件夹：

```bash
$ http-server -c-1   （⚠️只输入http-server的话，更新了代码后，页面不会同步更新）
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.8.196:8080
Hit CTRL-C to stop the server
```

### 3 关闭 `http-server`服务

按快捷键 CTRL-C，终端显示`^Chttp-server stopped.`即关闭服务成功。



# 官方文档

`http-server` is a simple, zero-configuration command-line http server. It is powerful enough for production usage, but it's simple and hackable enough to be used for testing, local development, and learning.

## Installation:

#### Globally via `npm`

```
npm install --global http-server
```

This will install `http-server` globally so that it may be run from the command line anywhere.

#### Globally via Homebrew

```
brew install http-server
```

#### Running on-demand:

Using `npx` you can run the script without installing it first:

```
npx http-server [path] [options]
```

## Usage:

```
 http-server [path] [options]
```

`[path]` defaults to `./public` if the folder exists, and `./` otherwise.

*Now you can visit [http://localhost:8080](http://localhost:8080/) to view your server*

**Note:** Caching is on by default. Add `-c-1` as an option to disable caching（禁用缓存）.



## Available Options:

`-p` or `--port` Port to use (defaults to 8080)

`-a` Address to use (defaults to 0.0.0.0)

`-d` Show directory listings (defaults to `true`)

`-i` Display autoIndex (defaults to `true`)

`-g` or `--gzip` When enabled (defaults to `false`) it will serve `./public/some-file.js.gz` in place of `./public/some-file.js` when a gzipped version of the file exists and the request accepts gzip encoding. If brotli is also enabled, it will try to serve brotli first.

`-b` or `--brotli` When enabled (defaults to `false`) it will serve `./public/some-file.js.br` in place of `./public/some-file.js` when a brotli compressed version of the file exists and the request accepts `br` encoding. If gzip is also enabled, it will try to serve brotli first.

`-e` or `--ext` Default file extension if none supplied (defaults to `html`)

`-s` or `--silent` Suppress log messages from output

`--cors` Enable CORS via the `Access-Control-Allow-Origin` header

`-o [path]` Open browser window after starting the server. Optionally provide a URL path to open. e.g.: -o /other/dir/

`-c` Set cache time (in seconds) for cache-control max-age header, e.g. `-c10` for 10 seconds (defaults to `3600`). To disable caching, use `-c-1`.

`-U` or `--utc` Use UTC time format in log messages.

`--log-ip` Enable logging of the client's IP address (default: `false`).

`-P` or `--proxy` Proxies all requests which can't be resolved locally to the given url. e.g.: -P [http://someurl.com](http://someurl.com/)

`--username` Username for basic authentication [none]

`--password` Password for basic authentication [none]

`-S` or `--ssl` Enable https.

`-C` or `--cert` Path to ssl cert file (default: `cert.pem`).

`-K` or `--key` Path to ssl key file (default: `key.pem`).

`-r` or `--robots` Provide a /robots.txt (whose content defaults to `User-agent: *\nDisallow: /`)

`--no-dotfiles` Do not show dotfiles

`-h` or `--help` Print this list and exit.

`-v` or `--version` Print the version and exit.

## Magic Files

- `index.html` will be served as the default file to any directory requests.
- `404.html` will be served if a file is not found. This can be used for Single-Page App (SPA) hosting to serve the entry page.

## Catch-all redirect

To implement a catch-all redirect, use the index page itself as the proxy with:

```
http-server --proxy http://localhost:8080?
```

Note the `?` at the end of the proxy URL. Thanks to [@houston3](https://github.com/houston3) for this clever hack!

## TLS/SSL

First, you need to make sure that [openssl](https://github.com/openssl/openssl) is installed correctly, and you have `key.pem` and `cert.pem` files. You can generate them using this command:

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

You will be prompted with a few questions after entering the command. Use `127.0.0.1` as value for `Common name` if you want to be able to install the certificate in your OS's root certificate store or browser so that it is trusted.

This generates a cert-key pair and it will be valid for 3650 days (about 10 years).

Then you need to run the server with `-S` for enabling SSL and `-C` for your certificate file.

```
http-server -S -C cert.pem
```

This is what should be output if successful:

```
Starting up http-server, serving ./ through https
Available on:
  https:127.0.0.1:8080
  https:192.168.1.101:8080
  https:192.168.1.104:8080
Hit CTRL-C to stop the server
```

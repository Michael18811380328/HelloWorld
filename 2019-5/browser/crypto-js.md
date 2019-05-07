# crypto-js

JavaScript library of crypto standards.

## Node.js (Install)

Requirements:

- Node.js
- npm (Node.js package manager)

```
npm install crypto-js
```

### Usage

Modular include:

```
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
...
console.log(SHA256("Message"));
```

Including all libraries, for access to extra methods:

```
var CryptoJS = require("crypto-js");
console.log(CryptoJS.HmacSHA1("Message", "Key"));
```

## Client (browser)

Requirements:

- Node.js
- Bower (package manager for frontend)

```
bower install crypto-js
```

### Usage

Modular include:

```
require.config({
    packages: [
        {
            name: 'crypto-js',
            location: 'path-to/bower_components/crypto-js',
            main: 'index'
        }
    ]
});
 
require(["crypto-js/aes", "crypto-js/sha256"], function (AES, SHA256) {
    console.log(SHA256("Message"));
});
```

Including all libraries, for access to extra methods:

```
// Above-mentioned will work or use this simple form
require.config({
    paths: {
        'crypto-js': 'path-to/bower_components/crypto-js/crypto-js'
    }
});
 
require(["crypto-js"], function (CryptoJS) {
    console.log(CryptoJS.HmacSHA1("Message", "Key"));
});
```

### Usage without RequireJS

```
<script type="text/javascript" src="path-to/bower_components/crypto-js/crypto-js.js"></script>
<script type="text/javascript">
    var encrypted = CryptoJS.AES(...);
    var encrypted = CryptoJS.SHA256(...);
</script> 
```

## API

See: https://code.google.com/p/crypto-js

### AES Encryption

#### Plain text encryption

```
var CryptoJS = require("crypto-js");
 
// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(plaintext);
```

#### Object encryption

```
var CryptoJS = require("crypto-js");
 
var data = [{id: 1}, {id: 2}]
 
// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
console.log(decryptedData);
```

### List of modules
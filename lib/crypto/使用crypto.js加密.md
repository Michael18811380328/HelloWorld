# 前端使用crypto.js进行加密

最近在使用Cookies加密保存数据的时候，接触到crypto，使用还算简单，在这里记录一下。

可以在这个GitHub的https://github.com/brix/crypto-js上下载该js，它可以单独引入所需要加密方式的js；也可以引入一个crypto-js.js 这个文件，它相当于引入了所有的加密方式，我使用的就是后者一次引入所有的加密文件，这个文件也不是很大，还可以接受。

因为我的需求是加密可逆，具有一定的安全性(对安全性要求并不是特别高)，所以使用DES或AES即可，我用的是AES：

```js
function getAesString(data,key,iv){//加密
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data,key, {
    iv:iv,
    mode:CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();    //返回的是base64格式的密文
}

function getDAesString(encrypted,key,iv){//解密
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(encrypted,key, {
    iv:iv,
    mode:CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);     
}

function getAES(data){ //加密
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = '1234567812345678';
  var encrypted =getAesString(data,key,iv); //密文
  var encrypted1 =CryptoJS.enc.Utf8.parse(encrypted);
  return encrypted;
}

function getDAes(data){//解密
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = '1234567812345678';
  var decryptedStr =getDAesString(data,key,iv);
  return decryptedStr;
}
```

key和iv我们都可以更换，但是需要保证的是加解密的key和iv保持一致

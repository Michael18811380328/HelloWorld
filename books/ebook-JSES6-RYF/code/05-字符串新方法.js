
let str = 'https://github.com/haiwen/seahub/pull/3990';
str.includes('https');
str.endsWith('https');
str.startsWith('https');

str.repeat(2);
str.padStart(100, 'mich');
str.padEns(20);

str.trimStart();
str,trimEnd();

str.matchAll(new Regexp(/^\s\S+.$/g));

String.raw`Hi\n${2+3}`;

// unicode
String.fromCodePoint(0x20BB7);
str.codePointAt(0);
'\u01D1'.normalize() === '\u0004F\u030C'.normalize()
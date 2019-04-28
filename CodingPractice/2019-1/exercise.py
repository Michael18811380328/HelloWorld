#coding:utf-8

# Jan 5th, 2019

#auto generate html using python

import webbrowser

GEN_HTML = 'test.html'
f = open(GEN_HTML, 'w')

str1 = "hello"
str2 = "micheal"

message = """
<html>
<head></head>
<body>
<p>%s</p>
<p>%s</p>
</body>
</html>
"""%(str1, str2)

f.write(message)
f.close()

'''
webbrowser.open(url, new=0, autoraise=True)
Display url using the default browser. 
'''

# auto 2
from pyh import *
# there is a bug 'from pyh import *'

page = Pyh('my wonderful php page')
page.addCSS('test.css')
page.addJS('test.js')
page << h1("total", cl='center')
page << div(cl='test', id="mydiv1") << p('I love php', id="myp1")
# 
page.printOut('a.html');


# Jan 19th, 2019

var1 = "hello"
var2 = 'python'

print var1[2]
print var2[1:3]

print var1[0:2] + "test"

print var1 + var2

print var1*2

if ("H" in var1) :
  print "H"
else :
  print "hello"


from __future__ import unicode_literals

import os

def main():
  cmd = "mkdir hello"
  a = 1
  while a <= 10:
    os.system(cmd + str(a))
    a += 1
if __name__ == "__main__":
  main()
#coding=utf-8
import math
import os
print("hello")

if True:
  print("yes")
  print('hello')
else:
  print('No')
  print("false")

"""
测试块级注释
"""

raw_input("\n\nPress any to continue")

x='abc'
print x

y=3

if (y > 10):
  print("Y")
else:
  print("well")

n = int(input("please input a number"))
i = 1
while i <= n:
  print i
print("this is a varchar")

month = int(input("please insert a month"))
if 1 <= month <= 12:
  print("input is correct")
  if month <= 3:
    print('spring')
  elif month <= 6:
    print('summer')
  else:
    print('winter')
else:
  print('input error')

money = int(input('please input a number'))
pay = money - 20 if money >= 100 else money
print pay

def function():
  a = 1 + 2
  print(a)

function()
#创建函数后需要执行

def func(a, b):
  c = a + b
  d = str(c)
  print("this is sum" + d)
# 需要将数字转化成字符串，之后进行加减，不能进行行内弱类型数据转换

print('loop start')
i = 2
while(i < 100):
  j = 2
  while(j <= (i / j)):
    if not(i % j):
      break
    j = j + 1
  if (j > i / j):
    print i, "is a true number"
  i = i + 1
print('example end')

test = 10
while test < 100:
  print test
  test ++;
  if test == 20:
    break
print('test end')

a = 122L
b = 0.1
c = 3.1415
d = 1j + 3.15

print(math.sin(10))

def dict():
  data = {
    "Mike": 100,
    "Tom": 10
  }
  for key in data:
    print key + data[key]

def main():
  dict()

main()
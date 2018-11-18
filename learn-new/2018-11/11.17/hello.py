#coding=utf-8
print("hello 你好")
 if True:
  print("answer")
  print("true")
else:
  print("test2")
  print("false")
# py 对于格式要求很严格，需要空格一致的缩进。建议使用统一的缩进字符。
 # py 可以使用\将一行语句分成多行显示。通常情况在括号内不需要使用这样的多行显示；
 # total = item_one + item_two
 # total2 = item_one + \
# item_two
# 引号：单引号双引号三引号；三引号基本上可以用于长文本多行注释；单行注释使用#；
"""
test 多行注释
"""
raw_input("\n\nPress any key to exit")
  x="a"
  y="b"
print x
print y
print x,
print y,
  print('\n')

x=1
if (x > 1):
  print("Mike")
else:
  print("John")

#coding=utf-8
print("this is a varchar")
n = int(input("please enter a number"))
i = 1
while i <= n:
  print(i)
  i += 1
 # 循环语句防止死循环



#coding=utf-8
print("this is a varchar")
 # 1、if 语句嵌套
month = int(input("please enter a month: "))
if 1 <= month <= 12:
  print("input month correctly")
  if month <= 3:
    print("spring")
  elif month <= 6:
    print("summer")
  elif month <= 9:
    print("autumn")
  else:
    print("winter")
else:
  print("input error")
# 如果输入字符串等非数字就会报错

# 2 if-else
# 表达式1 if 判断 else 表达式2
money = int(input("please input price"))
pay = money - 20 if money >= 100 else money
print(pay)
 # 如果价格超过100元，那么总价减20元。
 # 3 输入
money = input("please input money")
moneyNew = int(money)
print(moneyNew)
 # pass 空语句
pass
# 循环语句

# no parameter
def function():
  print("this is a function")
  a = 1 + 2
  print(a)
 # if you create a function, the function can't run by itself. You should run it.
function()
 # two parameters
def func(a, b):
  c = a + b
  d = str(c)
  print("this is sum " + d)

func(1, 2)
# 基本语法

## 最简单的示例

下面是一个简单的 C 程序`hello.c`。

```c
# include <stdio.h>

int main(void) {
  printf("Hello World\n");
  return 0;
}
```

第一行是预处理信息，`#`表示是预处理指令，这里表示标准库`stdio.h`。注意，指令的尾部不需要分号表示结束。

第三行是主函数`main`，所有 C 程序都是从`main`开始运行，即自动调用`main`。这里的`main`函数返回整数`int`，参数是`void`，即无参数。

第四行是`printf`函数，用来将参数显示在屏幕上。注意，正常语句要用分号表示结束，这是因为正常语句可以写成多行，不用分号很难确定结束位置。而预处理指令都是一行的。

第五行是函数的返回值`0`，表示运行成功。如果运行失败，一般约定返回非零值。

然后，将这个源文件编译成可以运行的程序。

```bash
$ gcc hello.c
```

上面代码使用`gcc`编译器，将源文件`hello.c`编译成二进制代码。编译产物默认叫做`a.out`。执行这个文件，会输出`Hello World`。

```bash
$ ./a.out
Hello World
```

`-o`参数可以指定编译产物的文件名。

```bash
$ gcc -o hello hello.c
```

上面代码的编译产物就是`hello`。

```bash
$ ./hello
Hello World
```

## 注释

C 语言的注释用`/* .. comments .. */`表示，注释内部可以分行。

```c
/* comments */

/*
  This is a comment.
*/
```

C99 还支持双斜杠的`//`的单行注释。

```c
// This is a comment.
// This is another comment.
```

## 变量

变量名可以包括字母、数字和下划线，但是不能以数字开头。

声明变量的时候，需要提供类型。

```c
int num;
num = 42;
```

可以一次声明多个变量。

```c
float x, y, z, X;
```

注意，变量声明的时候，不会清空分配的内存，因此可能会得到任何值。

## 赋值运算符

赋值运算符`=`为变量赋值后，返回等号右边的值。

```c
y = (x = 2 * x)
```

上面代码中，变量`x`先是将自己的值倍增，然后返回这个新的值，赋给变量`y`。
# 变量的声明

## 声明的结构

声明一个变量时，前面可以加上三类修饰词。

- 类型符（Type specifier）：变量的类型
- 储存符（Storage class）：变量储存在哪里
- 修饰符（Type qualifier）：一些其他属性

类型符有以下几种。

- void
- char
- short
- int
- long
- long long
- signed
- unsigned
- float
- double
- struct
- enum
- union

储存符有以下几种。

- extern
- static
- register
- auto
- typedef

类型符有以下几种。

- const
- volatile
- restrict

## 变量声明的解读规则

- 首先，找出变量名
- 然后，从后向前解读
- 圆括号具有最高优先级
- 变量后边如果有`[]`，表示数组；如果有`()`，表示函数。
- `*`表示`pointer to`，即“指向xxx的指针”。

`int (*x)[12];`是“x is a pointer to an array of 12 int”，而`int *x[12];`是“x is an array of 12 pointer to int”

## 储存符

`extern`表示，变量储存在外部，没有必要为它分配空间。通常用来表示，声明在不同文件里面的全局变量。

`static`对于全局变量和局部变量有不同含义。如果用于局部变量，表示在同一个函数的不同执行之间，保持它的值，不会随着每次执行而初始化。它的行为类似于全局变量，但只在函数内部可用。用于局部变量时，表示变量对于其他C文件并非全局可用，即该变量不会被链接（link）。总得来说，`static`声明的变量都是无法从它所在的源文件之外读取的。

`register`表示变量应该储存在寄存器之中。编译器不一定会遵守这个建议。对于`register`声明的变量，不能取它的地址，即不能使用`&`运算符。

`auto`表示这个变量的储存由编译器自主分配。它没有实际作用。因为只要不是`extern`，都是由编译器自主分配的。

`typedef`用来为某种类型声明一个别名。

```c
typedef int *xpto;
```

上面代码中，`xpto`就代表`int *`。

```c
xpto x;
```

前面不能再加其他修饰符。

```c
unsigned xpto x; /* 无效 */
```

## 修饰符

### const

`const`命令表示变量不可修改。

```c
int *const x
```

如果它的前面有`*`，表示指针变量`x`不可修改。

```c
int const *x
# 或者
const int *x
```

如果`const`在`*`前面，则表示`*x`所代表的那个值不可修改。

这两者可以结合起来。

```c
const char **const*const x;
```

### volatile

`volatile`表示它所声明的变量，可能不预期地发生变量，不受C的实现的控制，因此编译器不要对这类变量进行优化。硬件设备的编程中，这个命令很常用，表示。

```c
while (x,x) { ... }
```

上面代码中，如果`x`是一个`volatile`变量，则编译器会真的对`x`计算两次值。否则，编译器会将上面的代码优化如下。

```c
while (x) { ... }
```

### restrict

`restrict`命令表示它所声明的变量，是唯一接触到其所代表的内存区域的途径。这对编译器优化很有好处。

## 参考链接

- [The absolute, definitive guide to decipher C declarations](http://codinghighway.com/2013/12/29/the-absolute-definitive-guide-to-decipher-c-declarations/), by Filipe Gonçalves
# 表达式

表达式（expression）是一个计算式，会返回一个值。

## 逻辑表达式

逻辑表达式返回`0`或`1`，表示真假。C 语言中，`0`表示假，`1`表示真。比如，`20 > 12`返回`1`，`12 > 20`返回`0`。

但是，对于逻辑运算符来说，任何非零值都是真值，任何零值都是假值。比如，`5 || 0`会返回`1`，`5 && 0`会返回`0`。

## 条件表达式

条件表达式是`if`语句的简写，允许根据条件的值，执行两个操作之中的一个。

```c
expression1 ? expression2 : expression3
```

下面是一个例子。

```c
return i > j ? i : j;
```

上面的代码等同于下面的`if`语句。

```c
if (i > j)
  return i;
else
  return j;
```

## switch 语句

`switch`语句是级联式的`if...else`语句的另一种写法，更加易读。

```c
switch (expression) {
  case expression: statement
  case expression: statement
  default: statement
}
```

下面是一个例子。

```c
switch (grade) {
  case 0:
    printf("False");
    break;
  case 1:
    printf("True");
    break;
  default:
    printf("Illegal");
    break;
}
```

`break`语句用来跳出`switch`，继续执行`switch`后面的语句。
# 输入与输出

## printf

`printf`函数用于格式化输出。

```c
printf("Height: %d\n", height);
```

`printf`的第一个参数是格式字符串，里面使用百分号`%`表示占位符，上面代码的`%d`就是占位符。`printf`的第二个参数代表填入第一个占位符的值，第三个参数代表第二个占位符，以此类推。

占位符的第一个符号总是百分号，第二个符号是一个字母，表示填入此处的值的类型。

- `%d`：整数`int`
- `%f`：浮点数`float`
- `%e`：科学计数法，使用指数表示一个值

百分号与类型字母之间，还可以插入一个整数，表示最小字段宽度。比如，`%4d`表示显示一个最低4位的整数，不足4位的整数头部将补上空格，4位及4位以上的整数不受影响。如果加上负号`%-4d`，不足4位的空格将加在整数尾部。

对于浮点数，还可以指定小数点之后要显示多少位。

```c
printf("Profit: %.2f\n", profit);
```

## scanf

`scanf`函数用于读取用户的键盘输入。

```c
scanf("%d", &i)
```

上面的代码表示，用户从键盘输入的是整数，将放入变量`i`。

`scanf`可以读取多个变量。

```c
scanf("%d%d%f%f", &i, &j, &x, &y);
```

`scanf`会忽略空白字符（包括空格符、水平制表符、垂直制表符、换页符和换行符），直到发现输入的字符匹配格式符为止。
# 宏

`define`语句可以用来定义常量。

```c
#define RECIPROCAL_OF_PI (1.0f / 3.14159f)
```

注意，宏的名字一般都使用大写字母。

注意，预处理语句不用分号结尾。每个语句要占据一行。
# 运算符

C 语言的运算符非常多，一共有 50 多种。

算术运算符

- `+`：一元的正值运算符
- `-`：一元的负值运算符
- `+`：加法运算符
- `-`：减法运算符
- `*`：乘法运算符
- `/`：除法运算符
- `%`：余值运算符

赋值运算符

- `=` 赋值运算符
- `+=` 加法赋值运算符
- `-=` 减法赋值运算符
- `*=` 乘法赋值运算符
- `/=` 除法赋值运算符
- `%/` 余值赋值运算符

自增运算符和自减运算符

- `++`：自增运算符
- `--`：自减运算符

关系运算符

- `>` 大于运算符
- `<` 小于运算符
- `>=` 大于等于运算符
- `<=` 小于等于运算符

判断运算符

- `==` 等于运算符
- `!=` 不等于运算符

逻辑运算符

- `!` 非运算符
- `&&` 与运算符
- `||` 或运算符
# 语句

语句（statement）用来执行某个命令，通常没有返回值。

## if 语句

`if`语句用于判断。

```c
if (expression) statement
```

下面是一个例子。

```c
if (line_num == MAX_LINES)
  line_num = 0;
```

多个语句组成的复合语句，必须写在大括号里面。

```c
if (line_num == MAX_LINES) {
  line_num = 0;
  page_num++;
}
```

`if`语句可以带有`else`语句。

```c
if (expression) statement
else statement
```

下面是一个例子。

```c
if (i > j)
  max = i;
else
  max = j;
```

`else`可以与另一个`if`语句连用。

```c
if (expression)
  statement
else if (expression)
  statement
...
else if (expression)
  statement
else
  statement
```

## while 语句

`while`语句在满足条件时，不断进行循环。

```c
while (expression)
  statement
```

下面是一个例子。

```c
while (i < n)
  i = i + 2;
```

只要条件为真，就会无限循环。下面是一种常见的写法。

```c
while (1) {
  // ...
}
```

## do 语句

`do`语句先执行一次循环体，然后再判断是否还要执行。

```c
do statement
while (表达式);
```

它与`while`语句的区别是，不管怎样，循环体至少会执行一次。

```c
do {
  --i;
} while (i > 0);
```

## for 语句

`for`语句通常用于精确控制循环次数。

```c
for (表达式1; 表达式2; 表达式)
  语句
```

下面是一个例子。

```c
for (i = 10; i > 0; i--)
  printf("%d\n", i):
```

循环变量可以在`for`的第一个表达式里面声明。

```c
for (int i = 0; i < n; i++)
```
# 字符串

## 转义序列

- \a 响铃
- \b 退格
- \n 换行符
- \t 水平制表符
- \" 双引号
- \\ 斜杠
# 数据类型

## int

C 语言的整数类型共有8种。

- short int
- unsigned short int
- int
- unsigned int
- long int
- unsigned long int
- long long int
- unsigned long long int

## 整数的进制

整数常量表示的时候，可以采用十进制、八进制、十六进制。

八进制使用`0`作为前缀，比如`017`、`0377`。

十六进制使用`0x`作为前缀，比如`0xf`、`0xff`。

## 编译器的自动类型判断

对于整数常量，编译器会自动将它处理为`int`类型。如果常量的值太大，无法放入`int`，就用`long int`类型。如果还是太大，则使用`unsigned long int`类型。

如果想让编译器直接将整数常量作为长整数处理，只需在后面加上一个字母`L`或`l`。比如，`15L`、`0377L`、`0x7fffL`。

为了指明是无符号常量，可以在常量后面加上字母`U`或`u`。比如，`15U`、`0377U`。

`L`和`U`可以结合使用，表示常量既是长整型又是无符号的。比如`0xfffffffUL`。（字母`L`和`U`的顺序和大小写无所谓。）

字母`LL`或`ll`，表示整数常量是`long long int`类型。

对于浮点数，编译器默认以双精度储存。如果要以单精度储存，浮点数常量的后面要添加`F`或`f`。如果要以`long double`储存，要添加`L`或`l`。

## 浮点数

C 语言提供三种浮点数类型。

- float
- double
- long double

单精度浮点数为32位，双精度浮点数为64位。浮点数的计算是不精确的。

单精度提供6位精度，双精度提供15为精度。

小数默认为双精度，除非标明`f`。

## 字符

字符的类型是`char`。

```c
char ch;

ch = 'a';
```

字符类型本质是0到127的整数。

## 布尔值

C语言没有布尔值，`0`被当成`false`，所有非零值被当成`true`。

```c
i = 0;
while (i - 10) {
// ...
```

## 类型的自动转换

当不同类型的数据互相运算时，宽度较小的类型会转换到与另一个运算子相同宽度。

## 变量的截值（Truncation）

将长度较宽的类型的值，赋给长度较小的类型的值，这个值的高位会被自动去除。

```javascript
char ch;
int i;

i = 321;
ch = i; // ch 的值是 65 （321 - 256）
```

浮点数赋值给整数类型的值，小数部分会被截去。

```c
double pi;
int i;
pi = 3.14159;
i = pi; // i 的值为 3
```

为了避免这个问题，整数运算时可能需要明确将类型转为浮点数。

```c
int score;

/* 写法一 */
score = ((double)score / 20) * 100;

/* 写法二 */
score = (score / 20.0) * 100;
```
# 变量

## 声明

变量名只能包含字母、数字和下划线，但是必须使用字母或下划线开头。

C 语言的变量，必须先声明后使用。声明的时候，必须把变量的类型告诉编译器。

```c
int height;
```

上面代码将变量`height`，声明为`int`类型。

如果几个变量具有相同类型，可以将它们的声明合并。

```c
int height, width;
```

注意，声明变量的语句必须以分号结尾。

## 赋值

变量通过赋值的方式获得值。

```c
height = 8;
```

上面的代码将变量`height`赋值为`8`。

如果变量为`float`类型，赋值时要带上小数点。而且，小数点后面最好还要加上`f`，告诉编译器该变量为`float`类型。

```c
height = 2.83f;
```

可以在声明变量的同时，对该变量进行赋值。

```c
int height = 8;
```

同一个声明语句中，可以对多个变量进行赋值。

```c
int height = 8, width = 10;
```

也可以对一些变量赋值，另一些变量不赋值。

```c
int height = 8, width;
```

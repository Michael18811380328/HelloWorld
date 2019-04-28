
#include<stdio.h>
int main ()
{
  int a,b,c;
  int d[10];
  for(a=0;a<10;a++)
  {
    scanf("%d",&d[a]);
    printf("\n");
  }

  for(b=0;b<10;b++)
  {
    printf("The number is %d\n",d[b]);
  }
  return 0;
}


#include<stdio.h>
int main ()
{
  int a,b,c;
  int d[10];
  for(a=0;a<10;a++)
  {scanf("%d",&d[a]);
  printf("\n");}
  
  
  for(b=0;b<10;b++)
    printf("The number is %d\n",*(d+b));
  return 0;
}


#include<stdio.h>
int main ()
{
  int a;
  int d[10];
  int *p=d;
  
  for(a=0;a<10;a++)
  {scanf("%d",&d[a]);
  printf("\n");}
  
  
  for(;p<(d+10);p++)
    printf("The number is %d\n",*p);
  return 0;
}



#include<stdio.h>
int main()
{
  int a,b;
  void anbing(int *q,int n);
  int p[10];

  for(a=0;a<10;a++)
  {
    printf("\n");
    scanf("%d",&p[a]);
  }

  anbing(p,10);

  for(b=0;b<10;b++)
  {
    printf("%d\n",p[b]);
  }
  return 0;
}

void anbing(int *q,int n)
{
  int i,temp;
  int *head,*tail;

  head=&q[0];
  tail=&q[n-1];

  for(i=0;i<n/2;i++)
  {
    temp=*head;
    *head=*tail;
    *tail=temp;
    *head++;
    *tail--;
  }
}





#include<stdio.h>
int main ()
{
  //判断素数：首先输入一个整数（正数），依次去求除法，用函数的循环实现。

  //输入并判断数据是否合适，把4以上的数据实现循环。

  int a,b,c;
    printf("Please input the number !\n\n");
    scanf("%d",&a);
    if(a<=0)
      printf("Error!");
    else if(a==1||a==2||a==3)
      printf("It is a sushu!\n");
    else
    {
      for(b=2;b<a;b++)
      {
        if(a%b==0)
        {
          printf("It is not a sushu \n");
          break;
        }
        if((b+1)==a)
        {
          printf("It is a sushu !\n");
          break;
        }
      }
    
    }

  system("pause");
  return 0;
}


#include<stdio.h>
int main ()
{
  int a,b,c,i,j;
  
  char max,m[10];

  for(a=0;a<10;a++)
  {
    printf("please input %dth number\n",a+1);
    scanf("%c",&m[a]);
  }
  
  for(j=9;j<0;j--)
  {max=m[0];
  
  for(i=1;i<j+1;i++)
  {
    if(max>m[i])
    {c=max;
    max=m[i];
    m[i]=c;}
  }
  m[j]=max;
  }
  for(b=0;b<10;b++)
  {
    printf("the %cth number is %c.\n",m[b+1],m[b]);
    
  }
  return 0;
}

#include<stdio.h>
int main ()
{
  int a,b,c,i,j,max,;
  char m[10];

  for(a=0;a<10;a++)
  {
    printf("please input %dth number\n",a+1);
    scanf("%c",&m[a]);
  }
    
  for(j=9;j<0,j--)
  {max=m[0];
  
  for(i=1;i<j+1;i++)
  {
    if(max>m[i])
    {c=max;
    max=m[i];
    m[i]=c;}
  }
  m[j]=max;
  }

  for(b=0;b<10;b++)
  {
    printf("the %cth number is %c.\n",m[b+1],m[b]);
    
  }
  return 0;

#include<stdio.h>
float Max=0，Min=0;
int main()
{ float average(float a[],int n);
  
  float ave;
  int i;
  float score[10];
  printf("Please input  10 numbers ：\n\n");
  for(i=0;i<10;i++)
    scanf("%f",&score[i]);
  ave=average(score,10);
  printf("max=%6.2f\n\nmin=%6.2f\n\naverage=%6.2f\n\n",Max,Min,ave);
  return 0;
}

float average(float a[ ],int n)
{
  int i;float sum;
  float ave;Max=Min=a[0];
  sum=a[0];
  for(i=1;i<n;i++)
  {
    if(a[i]>Max)
      Max=a[i];
    else if(a[i]<Min)
      Min=a[i];
    sum=sum+a[i];
  }
  ave=sum/n;
  return (ave);
}


#include<stdio.h>
int a=3,b=5;
int main()
{
  int max(int a,int b);
  int a=8;
  printf("\nmax=%d\n\n",max(a,b));
  return 0;
}

int max(int a,int b)
{
  int c;
  c=a>b?a:b;
  return c;
}


#include<stdio.h>
int main()
{
  int anbing(int x,int y);
  int a=1,b=1;
  int i;
  for(i=0;i<10;i++)
  {
    printf("%d     %d\n",anbing(a,b));
  }
  return 0;
}

int anbing(int x,int y)
{
  static int c=1;
  int b=0;
  b=b+1;
  c=c+1;
  return(x+b,y+c);
}




#include<stdio.h>
int main()
{
  char a[4],b[7];
  char c;
  int i,l;
  for(i=0;i<4;i++)
  {
    scanf("%c",&c);
    a[i]=c;
  }
  for(j=0;j<7;j+=2)
  {
    
#include<stdio.h>
float Max=0;Min=0;
int main()
{ float average(float a[],int n);
  
  float ave;
  int i;
  float score[10];
  printf("Please input  10 numbers ：\n\n");
  for(i=0;i<10;i++)
    scanf("%f",&score[i]);
  ave=average(score,10);
  printf("max=%6.2f\n\nmin=%6.2f\n\naverage=%6.2f\n\n",Max,Min,ave);
  return 0;
}
float average(float a[],int n)
{
  int i;float sum;
  float ave;Max=Min=a[0];
  sum=a[0];
  for(i=1;i<n;i++)
  {
    if(a[i]>Max)
      Max=a[i];
    else if(a[i]<Min)
      Min=a[i];
    sum=sum+a[i];
  }
  ave=sum/n;
  return (ave);
}


#include<stdio.h>
int main ()
{
  int a,b,c,i,j;
  
  char max,m[10];

  for(a=0;a<10;a++)
  {
    printf("please input %dth number\n",a+1);
    scanf("%c",&m[a]);
  }
  
  for(j=9;j<0;j--)
  {max=m[0];
  
  for(i=1;i<j+1;i++)
  {
    if(max>m[i])
    {
      c=max;
      max=m[i];
      m[i]=c;
    }
  }
  m[j]=max;
  }
  for(b=0;b<10;b++)
  {
    printf("the %cth number is %c.\n",m[b+1],m[b]);
    
  }
  return 0;
}


#include<stdio.h>
int main ()
{
  int i,j,t,m,n;
  int a[3][3];
  for(i=0;i<3;i++)
    for(j=0;j<3;j++)
      scanf("%d",&a[i][j]);

  t=a[0][0];
  m=0;
  n=0;
  
    
  for(i=0;i<3;i++)
  {
    for(j=0;j<=i;j++)
    {
      if(a[i][j]>t)
      {
        t=a[i][j];
        m=i;
        n=j;
      }
    }
  }
  for(i=0;i<3;i++)
  {
    for(j=0;j<3;j++)
      printf("%9d",a[i][j]);
    printf("\n\n\n");
  }

  printf("The max is %d    %d   %d\n\n",t,m+1,n+1);
  system("pause");
  return 0;
}


#include<stdio.h>
int main ()
{
  char a[]="I love China!";
  printf("%s\n",a);
  printf("%c\n",a[5]);
  return 0;
}


#include<stdio.h>
int main ()
{
  char *a="I love china";
  printf("%s",a);
  return 0;
}


#include<stdio.h>
int main ()
{
  char a[]="student";
  char b[20];
  int i;
  //定义i为循环体。
  for(i=0;i<=7;i++)
  {
    *(b+i)=*(a+i);
    printf("%c\n",b[i]);
  }
  printf("%s\n\n%s\n\n",a,b);
  return 0;
}
  


#include<stdio.h>
int main ()
{
  char a[]="student";
  char b[20];
  char *p,*q;
  p=a,q=b;

  for(;*p!='\0';p++,q++)
  {
    *q=*p;

  }
  *q='\0';
  printf("%s\n\n%s\n\n",a,b);
  return 0;
}
  

#include<stdio.h>
int main ()
{
  void anbing(char *from,char *to);
  char a[]="I am ab";
  char b[]="you are beibei";
  char *p=a;
  char *q=b;
  printf("%s\n%s\n",a,b);
  anbing(p,q);
  //此处pq可以，ab可以，但是*p*q不可以

  printf("%s\n%s\n",a,b);
  return 0;
}
void anbing(char *from,char *to)
{
  for(;*from!='\0';from++,to++)
  { *to=*from;}
  *to='\0';
}


#include<stdio.h>
int main()
{
  //闰年输入
  int a,b;

  printf("input it !");
  scanf("%d",&a);
  if(a<=0)
    printf("error!");
  if(a%4==0)
  {
    if(a%400==0)
      b=1;
    else if(a%100==0)
      b=2;
    else
      b=1;
  }
  else 
    b=2;
  if(b==1)
    printf("It is a runnian !");
  else 
    printf("It not a runnian !");
  return 0;
}



#include<stdio.h>
int main ()
{
  char ch[]="I love you!";
  printf("%s\n\n",ch);
  printf("%c\n\n",ch[7]);
  system("pause");
  return 0;
}



#include<stdio.h>
#include<string.h>
int main ()
{
  char string[30]="I love china!";
  printf(" %s\n\n",string);
  strcpy(string,"I am a student.");
    printf("%s\n",string);
  return 0;
}


char *ch="I love you!";实际上ch存储的是那些字符串的地址。
char ch[]="I love you!";ch存储的是所有的字符数据。

#include <stdio.h>
int main()
{ char *string=“I love China!”; 
   printf(“%s\n”,string);
   string=”I am a student.”;
   printf(“%s\n”,string);
   return 0;
}


指针变量的值可以改变。
字符数组定定义后，就不可以再赋值，已经被输入到了首个字符的地址。
char ch[30];
ch="a nnt";
是不对的。

*(b+i)=‘\0’; 表示输出的是一个字符串。


8.4.2 字符指针作函数参数
8.4.3 使用字符指针变量和字符数组的比较


指针函数
#include<stdio.h>
int main()
{
  int max(int,int);
  int min(int,int);
  int (*p)(int,int);
  int a,b,c,i;
  scanf("%d,%d",&b,&c);
  printf("input the number\n");
  scanf("%d",&a);
  
  if(a==1)
    p=max;
  else if(a==2)
    p=min;
  else
    printf("error");
  i=(*p)(b,c);
  if(a==1)
    printf("%d\n%d\n the max is %d\n\n",b,c,i);
  else
    printf("%d\n%d\n the min is %d\n\n",b,c,i);
  return 0;
}

int max(int x,int y)
{
  int d;
  if(x>y)
    d=x;
  else
    d=y;
  return(d);
}

int min(int x,int y )
{
  int e;
  if(x<y)
    e=x;
  else
    e=y;
  return(e);
}

重点8.8 动态分配

#include<stdio.h>
#include<stdlib.h>
int main()
{
  int *a;
  int n,i,j;
  scanf("%d",&n);
  a=(int *)malloc(n*sizeof(int));

  for(i=0;i<n;i++)
    a[i]=2*i;
  for(j=(n-1);j>=0;j--)
    printf("%d\n",a[j]);
  printf("\n\n");
  
  free(a);
  return 0;
}


#include<stdio.h>
int main(void)
{
  int a[3][3]={{1,2,3},{4,5,6},{7,8,9}};
  int b[3]={4,5,6};
  int c[3];
  int i,j,k;
  
  for(i=0;i<3;i++)
  {
    c[i]=0;
    for(j=0;j<3;j++)
    {
      c[i]=c[i]+a[i][j]*b[j];
    }
  }
  
  for(k=0;k<3;k++)
    printf("The C is  %d\n",c[k]);
  return 0;
}



#include<stdio.h>
int main()
{
  int i,j,b,c,k;
  int a[10];
  for(i=0;i<10;i++)
  {
    scanf("%d",&a[i]);
  }
  for(c=9;c>0;c--)
  {
  for(b=0;b<c;b++)
  {
    if(a[b]>a[b+1])
    {
      k=a[b];
      a[b]=a[b+1];
      a[b+1]=k;
    }
  }
  }
  printf("\n\n");



  for(j=0;j<10;j++)
  {
    printf("%d\n",a[j]);
  }
  return 0;
}


#include<stdio.h>
int main()
{
  void an(int b[],int n);
  int j,k;
  int a[40];
  scanf("%d",&k);
  an(a,k);
  printf("\n\n");
  for(j=0;j<40;j++)
  {
    printf("%d\n",a[j]);
  }
  return 0;
}

void an(int b[],int n)
{
  int a;
  for(a=0;a<40;a++)
    b[a]=n*(a+1);
}


#include<stdio.h>
int main()
{
  int a[][3]={1,2,3,4,5,6,7,8,9};
  int b[3]={4,5,6};

  int i,j,sum;
  sum=0;
  for(i=0;i<3;i++)
  {
    for(j=0;j<3;j++)
    {
      sum=sum+a[i][j]*b[j];
    }
  }

  printf("%d\n\n",sum);
  
  for(i=0;i<3;i++)
  {for(j=0;j<3;j++)
    printf("    %d    ",a[i][j]);
  printf("\n");

  }
  
  return 0;
}

1.只使用指针的大小比较。
#include<stdio.h>
int main ()
{
  int a,b,c;
  int *p,*q;
  scanf("%d%d",&a,&b);
  p=&a;
  q=&b;
  c=((*p>*q)?*p:*q);
  printf("%d\n",c);
  return (0);
}
PS：在函数调用中不能直接定义空的指针。可以使用指针作为函数的形式参数，用空整形作为返回值。
void anbing(int *p,int *q)
{ int temp;
  if(*p>*q)
  {
    temp=p;
    p=q;
    q=temp;
  }
} 
Ps:void 类型函数不用返回值。
调用函数，实际参数不是*p，*p表示实际的数字而不是指针。

矩阵的运算：二维3*3矩阵
#include<stdio.h>
int main(void)
{
  int a[3][3]={{1,1,1},{1,1,1},{1,1,1}};
  int b[3][3]={{1,1,1},{1,1,1},{1,1,1}};
  int c[3][3];
  int i,j,k;
  
  for(i=0;i<3;i++)
  {
    for(j=0;j<3;j++)
    {
      c[i][j]=0;
      for(k=0;k<3;k++)
      {
        c[i][j]=c[i][j]+a[j][k]*b[k][i];
      }
    }
  }
  
  
  printf("The result is :\n");
  for(k=0;k<3;k++)
  {
    for(j=0;j<3;j++)
      printf(" %d",c[k][j]);
    printf("\n");
  }
  return 0;
}

指针的应用
#include<stdio.h>
int main( )
{
  int a[10];
  int b[10]={1,2,3,4,3,2,3,4,23,32};
  int i,j,k;
  int *p,*q;
  for(i=0;i<10;i++)
    scanf("%d",&a[i]);
  printf("OK\n\n");

  for(i=0;i<10;i++)
    printf("%d\n\n",b[i]);
  printf("\1\1\1\n\n");
  for(j=0;j<10;j++)
  {
    p=&a[j];
    q=&b[j];
    k=*p;
    *p=*q;
    *q=k;
  }
  for(i=0;i<10;i++)
    printf("%d\n\n",b[i]);
  return 0;
}

1、求1+2+3+⋯⋯⋯.+100。（循环）
答案
#include<stdio.h> 
void main() 
{ 
 int i,sum=0; 
 for(i=1;i<=100;i++) 
 sum=sum+i; 
 printf("%d",sum); 
}
2、 求1*2*3*⋯⋯⋯.*10。（循环）
答案

#include<stdio.h>
void main() 
{ 
int i=0,j=1; 
for (i=2;i<=10;i++) 
{ 
j*=i; 
} 
printf("%d",j); 
}
3、 输入三个数字，输出他们的最大值。（if）
答案
#include<stdio.h>
void main() 
{

int a,b,c,d; 
scanf("%d,%d,%d",&a,&b,&c); 
d=max(a,b,c); 
printf("max=%d",d); 
getch();/*暂停看运行结果*/ 
} 
int max(int x,int y,int z)
{int u; 
if(x>=y&&x>=z) 
u=x; 
else if(y>=x&&y>=z) 
u=y; 
else 
u=z; 
return(u);

4.用起泡法对十个数据排序（数组实现）
答案
#include<stdio.h>
main ( )
{  int i,j,t;
   static int a[10]={5,7,4,2,3,6,1,0,9,8};
   for(j=0;j<9;j++)
   {   for(i=0;i<9-j;i++)
       {  if(a[i]>a[i+1])
          { t=a[i];a[i]=a[i+1];a[i+1]=t ;
          }
       }
   }
for(i=0;i<10;i++)
 printf("%2d",a[i]);
} 
5、输入十个数字，逆序输出。（数组实现）
答案
#include<stdio.h>
main()
{int a[10],i=0;
for(i=0;i<=9;i++)
scanf("%f",&a[i]);
printf("\n");
for(i=9;i>=0;i--)
printf("%f",a[i]);
}
6输入两个数，交换他们的值并输出。(元素交换)
答案
#include<stdio.h>
int main ()
{
    int m,n,temp;
 scanf("%d%d",&m,&n);
 if (m<n)
 {
  temp=m;
  m=n;
  n=temp;
 }
 printf("%d",m);
    return 0;
}
7.输出9*9乘法表。（双层循环)
答案
#include <stdio.h>
void main()
{
int i=1;
for(i; i<=9; i++)
{
  int j=1;
  for(j;j<=i;j++)
  {
   printf("%d*%d=%d ", i, j, i*j);
  }
  printf("\n");
}
}
8.输入一行字符，将所有的小写字母转换成大写字母，大写字母转换成小写字母，其余字符不变。输出转变后的这行字符。
答案
#include "stdio.h"
void main()
{
    char a[n];
    int i;
    scanf("%s",a);
    printf("大写为：");
    for(i=0;i<=n;i++)
    {
       if(a[i]<='z'&&a[i]>='a')
       a[i]=a[i]-32;
       printf("%c",a[i]);
    }
    printf("\n小写为：");
    for(i=0;i<=3;i++)
    {
     a[i]=a[i]+32;
        printf("%c",a[i]);
    }
} 
9、 编写一个简单计算器程序，要求能够完成两个数的+，-，*，/四种运算。输出运算式及运算结果。(switch)
6.2
#include"stdio.h"
main()
{char c;int i=0,j=0,k=0,l=0;
while((c=getchar())!=’\n’)
{if(c>=65&&c<=90||c>=97&&c<=122) i++;
else if(c>=48&&c<=57) j++;
else if(c==32) k++;
else l++;}
printf("i=%d,j=%d,k=%d,l=%d\n",i,j,k,l);
}
6.6
#include"math.h"
main()
{int x=100,a,b,c;
while(x>=100&&x<1000) {a=0.01*x;b=10*(0.01*x-a);c=x-100*a-10*b;
if(x==(pow(a,3)+pow(b,3)+pow(c,3))) printf("%5d",x);x++;}
}
6.7
main()
{int m,i,j,s;
for(m=6;m<10000;m++)
{s=1;
for(i=2;i<m;i++)
if(m%i==0) s=s+i;
if(m-s==0)
{printf("%5d its fastors are 1 ",m);for(j=2;j<m;j++) if(m%j==0)
printf("%d ",j);printf("\n");}
}
}
或
main()
{int m,i,j,s;
for(m=6;m<1000;m++)
{s=m-1;
for(i=2;i<m;i++)
if(m%i==0) s=s-i;
if(s==0)
{printf("%5d its fastors are 1 ",m);for(j=2;j<m;j++) if(m%j==0)
printf("%d ",j);printf("\n");}
}
}
6.8
main()
{int i=1,n;double t,x=1,y=2,s,sum=0;
scanf("%ld",&n);
while(i<=n) {s=y/x;sum=sum+s;t=y;y=y+x;x=t;i++;}
printf("%f\n",sum);
}
11，P128  例6.10（译码）
#include<stdio.h>
void main()
{
char c;
while((c=getchar())!='\n')
{
c=c+4;
if(c>'Z'+4||c>'z')
c=c-26;
}
printf("%c",c);
}
printf("\n");
}
12，P111  5.5  5.6（switch）
5.5
#include <stdio.h>
main()
{int x,y;
printf("输入x：");
scanf("%d",&x);
if(x<1)                        
{ y=x;
printf("x=%3d, y=x=%d\n",x,y);
}
else if (x<10)                
{ y=2*x-1;
printf("x=%3d, y=2*x-1=%d\n",x,y);
}
else                    
{ y=3*x-11;
printf("x=%3d, y=3*x-11=%d\n",x,y);
}
}
5.6
#include <stdio.h>
main()
{ float score;
char grade;
case 2:
printf("请输入学生成绩：");
scanf("%f",&score);
while(score>100||(score<0)
{ printf("\n输入有误,请重新输入：");
scanf("%f",&score);
}
switch((int)(score/10))
{ case 10:
case 9: grade=’A’;break;
case 8: grade=’B’;break;
case 7: grade=’C’;break;
case 6: grade=’D’;break;
case 5:
case 4:
case 3:
case 1:
case 0: grade=’E’;
}
printf("成绩是%5.1f，相应的等级是%c。\n",score,grade);
}
 

#include<stdio.h> 
    void main() 
    { 
        int year; 
        year=2000; 
      go: if(((year%4 == 0)&&(year%100 != 0)) || (year%400 == 0)) 
           printf("%d is run nian",year); 
        if(year<=2500) 
           year=year++; 
          if(year>2500)
           goto end;        
      goto go; 
        end:   getch(); 
       }

1.分数连加，中间符号不一样。
直接用for循环
#include<stdio.h>
int main()
{
  float b,sum=0.0;
  int a,c;

  for(a=1;a<=100;a++)
  {
    c=a%2;
    if(c==1)
      b=(float)1/a;
    else
      b=(float)-1/a;
    sum+=b;
  }
  printf("The sum is %f\n",sum);
  return 0;
}
调用函数实现：
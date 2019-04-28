#include<stdio.h>
int main()
{
  int i, j;
  int a[100];
  for (i = 1; i <= 100; i ++)
    a[i-1] = i;
  for(j = 99; j >= 0; j --)
    printf("%d\n",a[j]);
  return 0;
}
#include<stdio.h>
int main()
{
  float sum(void);
  float c;
  c = sum();
  printf("The sum is %f\n",c);
  return 0;
}


float sum()
{
  int a;
  float b, sum = 0.0;
  for( a = 1; a <= 100; a++)
  {
    b = (float)1/a;
    sum += b;
  }
  return(sum);
}
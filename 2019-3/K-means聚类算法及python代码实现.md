# [K-means聚类算法及python代码实现](https://www.cnblogs.com/ahu-lichang/p/7161613.html)

**K-means聚类算法（事先数据并没有类别之分！所有的数据都是一样的）**

**1、概述**

K-means算法是集简单和经典于一身的**基于距离的聚类算法**

**采用距离作为相似性的评价指标，即认为两个对象的距离越近，其相似度就越大。**

该算法认为类簇是由距离靠近的对象组成的，因此把得到**紧凑且独立的簇作为最终目标。**

 

**2、核心思想**

通过**迭代**寻找k个类簇的一种划分方案，使得用这k个类簇的均值来代表相应各类样本时所得的总体误差最小。

k个聚类具有以下特点：**各聚类本身尽可能的紧凑，而各聚类之间尽可能的分开。**

 k-means算法的基础是**最小误差平方和准则,**

其代价函数是：

​    ![img](https://images2015.cnblogs.com/blog/1110462/201707/1110462-20170713163435540-887498636.png)

​       式中，μc(i)表示第i个聚类的均值。

各类簇内的样本越相似，其与该类均值间的误差平方越小，对所有类所得到的误差平方求和，即可验证分为k类时，各聚类是否是最优的。

上式的代价函数无法用解析的方法最小化，只能有迭代的方法。

 

**3、算法步骤图解**

下图展示了对n个样本点进行K-means聚类的效果，这里k取2。

 ![img](https://images2015.cnblogs.com/blog/1110462/201707/1110462-20170713163634728-1580665272.png)

 

**4、算法实现步骤**

k-means算法是将样本聚类成 k个簇（cluster），其中k是用户给定的，其求解过程非常直观简单，具体算法描述如下：

1) 随机选取 k个聚类质心点

2) 重复下面过程直到收敛  {

​      对于每一个样例 i，计算其应该属于的类：

​        ![img](https://images2015.cnblogs.com/blog/1110462/201707/1110462-20170713163736900-2009541367.png)

​      对于每一个类 j，重新计算该类的质心：

​         ![img](https://images2015.cnblogs.com/blog/1110462/201707/1110462-20170713163745290-527833390.png)

  }

   

其伪代码如下：

******************************************************************************

创建k个点作为初始的质心点（随机选择）

当任意一个点的簇分配结果发生改变时

​       对数据集中的每一个数据点

​              对每一个质心

​                     计算质心与数据点的距离

​              将数据点分配到距离最近的簇

​       对每一个簇，计算簇中所有点的均值，并将均值作为质心

********************************************************

 

**5、K-means聚类算法python实战**

需求：

对给定的数据集进行聚类

本案例采用二维数据集，共80个样本，有4个类。

![img](https://images2015.cnblogs.com/blog/1110462/201707/1110462-20170713223541993-2034255951.png)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 #!/usr/bin/python
 2 # coding=utf-8
 3 from numpy import *
 4 # 加载数据
 5 def loadDataSet(fileName):  # 解析文件，按tab分割字段，得到一个浮点数字类型的矩阵
 6     dataMat = []              # 文件的最后一个字段是类别标签
 7     fr = open(fileName)
 8     for line in fr.readlines():
 9         curLine = line.strip().split('\t')
10         fltLine = map(float, curLine)    # 将每个元素转成float类型
11         dataMat.append(fltLine)
12     return dataMat
13 
14 # 计算欧几里得距离
15 def distEclud(vecA, vecB):
16     return sqrt(sum(power(vecA - vecB, 2))) # 求两个向量之间的距离
17 
18 # 构建聚簇中心，取k个(此例中为4)随机质心
19 def randCent(dataSet, k):
20     n = shape(dataSet)[1]
21     centroids = mat(zeros((k,n)))   # 每个质心有n个坐标值，总共要k个质心
22     for j in range(n):
23         minJ = min(dataSet[:,j])
24         maxJ = max(dataSet[:,j])
25         rangeJ = float(maxJ - minJ)
26         centroids[:,j] = minJ + rangeJ * random.rand(k, 1)
27     return centroids
28 
29 # k-means 聚类算法
30 def kMeans(dataSet, k, distMeans =distEclud, createCent = randCent):
31     m = shape(dataSet)[0]
32     clusterAssment = mat(zeros((m,2)))    # 用于存放该样本属于哪类及质心距离
33     # clusterAssment第一列存放该数据所属的中心点，第二列是该数据到中心点的距离
34     centroids = createCent(dataSet, k)
35     clusterChanged = True   # 用来判断聚类是否已经收敛
36     while clusterChanged:
37         clusterChanged = False;
38         for i in range(m):  # 把每一个数据点划分到离它最近的中心点
39             minDist = inf; minIndex = -1;
40             for j in range(k):
41                 distJI = distMeans(centroids[j,:], dataSet[i,:])
42                 if distJI < minDist:
43                     minDist = distJI; minIndex = j  # 如果第i个数据点到第j个中心点更近，则将i归属为j
44             if clusterAssment[i,0] != minIndex: clusterChanged = True;  # 如果分配发生变化，则需要继续迭代
45             clusterAssment[i,:] = minIndex,minDist**2   # 并将第i个数据点的分配情况存入字典
46         print centroids
47         for cent in range(k):   # 重新计算中心点
48             ptsInClust = dataSet[nonzero(clusterAssment[:,0].A == cent)[0]]   # 去第一列等于cent的所有列
49             centroids[cent,:] = mean(ptsInClust, axis = 0)  # 算出这些数据的中心点
50     return centroids, clusterAssment
51 # --------------------测试----------------------------------------------------
52 # 用测试数据及测试kmeans算法
53 datMat = mat(loadDataSet('testSet.txt'))
54 myCentroids,clustAssing = kMeans(datMat,4)
55 print myCentroids
56 print clustAssing
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

运行结果：

![img](https://images2015.cnblogs.com/blog/1110462/201707/1110462-20170713223857384-327913719.png)

 

6、K-means算法补充

K-means算法的**缺点**及**改进方法**

（1）**k值的选择是用户指定的，不同的k得到的结果会有挺大的不同**，如下图所示，左边是k=3的结果，这个就太稀疏了，蓝色的那个簇其实是可以再划分成两个簇的。而右图是k=5的结果，可以看到红色菱形和蓝色菱形这两个簇应该是可以合并成一个簇的：

**改进：**

**对k的选择可以先用一些算法分析数据的分布，如重心和密度等，然后选择合适的k**

 

![img](https://images2015.cnblogs.com/blog/1110462/201707/1110462-20170713224751759-451883594.png)

 

（2）**对k****个初始质心的选择比较敏感，容易陷入局部最小值**。例如，我们上面的算法运行的时候，有可能会得到不同的结果，如下面这两种情况。K-means也是收敛了，只是收敛到了局部最小值：

**改进：**

 

**有人提出了另一个成为二分k均值（bisecting k-means）算法，它对初始的k个质心的选择就不太敏感**

 

 ![img](https://images2015.cnblogs.com/blog/1110462/201707/1110462-20170713224822712-1902791909.png)

（3）**存在局限性，如下面这种非球状的数据分布就搞不定了**：

 ![img](https://images2015.cnblogs.com/blog/1110462/201707/1110462-20170713224851056-1673448631.png)

（4）**数据集比较大的时候，收敛会比较慢。**



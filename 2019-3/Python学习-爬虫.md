# Python学习——网络爬虫第一周-下载小说

2019年02月23日 21:47:44 [qq_34735637](https://me.csdn.net/qq_34735637) 阅读数：6500

**功能**：

自动爬取某网站，并且将该网站的文本数据存储到本地。

**基本实现步骤**：

1）自动爬取网站，获得网站数据；

2）数据存储到本地。

**遇到问题及解决办法**：

1）自动爬取，暂时水平不够高，采用的伪爬取方法即找到网页网址的规律；

2）关于文本的处理，输出成想要的格式

**正题方法**：

1）网页分为静态网页（存粹的html格式的）、动态网页（使用AJAX），即动态加载网页的数据不一定出现按外html中等。

本文爬取的网页是动态网页，采用的方法是浏览器渲染引擎（渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容。这是每一个浏览器的核心部分，所以渲染引擎也称为浏览器内核）。因而需要安装selenium库，

FireFox浏览器，下载getodriver。**selenium库使用方法**：<https://blog.csdn.net/weixin_36279318/article/details/79475388>

访问网址url:https://www.biqukan.com/2_2757/1107517.html，鬼吹灯的链接。

需要爬取内容：标题、文本。

标题的元素特征：div，class = “content”或h1

文本元素特征：div，id = “content” class = “showtxt”

![img](https://img-blog.csdnimg.cn/20190223211319990.png)

![img](https://img-blog.csdnimg.cn/20190223211503790.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NzM1NjM3,size_16,color_FFFFFF,t_70)

2）通过BeautifulSoup，安装模块后，获得soup对象，按照上面的元素属性，调用方法find_all()或find可以所以符合上述元素特征的**元素列表。（**<https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/#find-all>）

3）根据BeautifulSoup手册上的，get_text（）方法获得tag标签的文本内容，因为获取的文本内容存在空格，采用的笨方法

用strip（）方法去除空格，返回列表，并用字符串+方法将列表的字符串拼接，完成文本提取工作

4）下面按照顺序依次爬取所有章节文本数据。

源代码如下：

```
from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from bs4 import BeautifulSoup
import time
import sys
import re
caps = webdriver.DesiredCapabilities().FIREFOX
caps["marionette"] = False
binary = FirefoxBinary(r'D:\Anaconda3\Scripts\firefox.exe')
driver = webdriver.Firefox(firefox_binary = binary,capabilities=caps)

Debug =1
MaxTextNum = 100
def singlePageGet(driver,url):
    '''
    函数说明：单页提取数据
    :return:单页标题、文本
    '''
    driver.get(url)
    webData = driver.page_source
    soup = BeautifulSoup(webData,'lxml')
    titlesList = (soup.find_all('h1'))
    textsList = soup.find_all('div',class_ = "showtxt")
    if textsList:
        #print(titlesList,textsList)
        titles = titlesList[0].get_text().split()
        texts = textsList[0].get_text().strip().split()
        finalText = ''
        finalTitle = ''
        for text in texts:
            finalText = finalText + text
        for title in titles:
            finalTitle = finalTitle + title
        return finalTitle,finalText
    else :
        return

def writeToFile(title,content):
    fileName = '鬼吹灯.txt'
    with open(fileName,'a+',encoding='utf-8') as f:
        f.write(title)
        f.write('\n')
        f.write(content)
        f.write('\n\n')
#8035
urlsAccess = ['https://www.biqukan.com/2_2757/{}.html'.format(value) for value in range(1108307,1108346,1)]
#1108346  117517
numing = 0
for url in urlsAccess:
    if singlePageGet(driver,url):
        titles,texts = singlePageGet(driver,url)
    if titles:
        writeToFile(titles,texts)
        time.sleep(2)
        numing = numing + 1
        print('下载进度：%4.2f'%(numing/len(urlsAccess)))
    else :
        numing = numing + 1
print('下载完成')
```
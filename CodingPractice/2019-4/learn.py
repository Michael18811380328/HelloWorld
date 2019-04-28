#coding=utf-8
import json
import requests
from requests.exceptions import ConnectionError
import re
import sys

try:
  from urllib import urlencode
except ImportError:
  from urllib.parse import urlencode

# 获取界面的信息（传入参数是关键词和页码，返回是界面的信息）主要的技术点：使用库函数发送 GET 请求，处理相应的情况
def get_page_index(key, pagesize):

  data = {
    "callback": 'test',
    'keyword': key,
    'page': 1,
    'userid': -1,
    'clientver': '',
    'platform': 'WebFilter',
    'tag': 'em',
    'filter': 2,
    'iscorrection': 1,
    'priviege_filter': 0
  }

  url = "https://songsearch.kugou.com/song_search_v2?" + urlencode(data)

  try:
    # 将上述的URL和相关参数，encode get 方式发送请求
    response = request.get(url)
    # 如果请求状态码是200 返回成功的信息
    if response.status_code == 200:
      return response.text
    # 这里需要处理400的情况
    return None
  # 如果网络错误返回信息
  expect ConnectionError:
    print('Internet Error')
    return None

# 过滤HTML界面信息（传入参数是HTML和页码）
def parse_page_index(html, pagasize):
  temp = re.match('jQuery.*?\(.*?\)$', html)

  data = json.loads(temp.group(1))
  print data

  lists = data.get('data').get('lists')
  print lists

  if len(lists) < pagesize:
    pagasize = len(lists)

  for i in range(pagesize):
    print i
    print(str(i + 1) + ". " + str(lists[i]['FileName']).replace('<em>', '').replace('</em>', ''))
    # 使用正则处理返回的结果，去掉em 标签
  
  mumbers = List(map(int, input('please input song index').split(' ')))

  if numbers[0] = 0:
    return None

  for number in numbers:
    name = str(lists[number - 1]['FileName']).replace('<em>', '').replace('</em>', '').replace(' ', '')
    # 过滤空格和em标签
    print name
    # 创建下载链接
    hash_url = 'http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + lists[number - 1].get('FileHash')
    hash_constent = request.get(hash_url)
    play_url = ''.join(re.findall('"paly_url":"(.*?)"', hash_content.text))
    read_download_url = play_url.replace("\\", "")

    print('downloading...')
    # 写入文件
    with open("./music/" + name + ".mp3", "wb") as fp:
      fp.write(requests.get(real_download_url).content)

    print("Download successfully!\n")

# 主函数 获取输入的信息，获取界面的html,并传入下载函数
def main():
  key = raw_inpit('please input song name')
  page = 20
  if len(sys.argv) > 1:
    page  =int(sys.argv[1])

  html = get_page_index(key, page)
  parse_page_index(html, page)

# 执行主函数
if __name__ == '__name__':
  main()

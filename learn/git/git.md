### git

~~~git
git checkout -b test 
git branch 查看当前分支是否在test上面
git branch --set-upstream-to=origin/test  建立本地到远程仓库的链接，这样代码才能提交
git  branch --unset-upstream master 取消对master的跟踪
git checkout test 切换到另一个分支
git  merge 一个分支merge到另一个分支
git pull 
git push origin test 将代码添加到远程分支

git 补充

0.全局设置：git config --global user.name 和git config ---global user.email （新电脑需要SSK秘钥验证）

1.git本地操作和远程操作 git branch --set-upstream-to=origin/test（远程仓库具有test分支）

2.首先从远程仓库下载或者拉取代码（clone-pull）根据当前新项目还是已有项目的改动

3.本地代码 git status 查看状态 git add . 添加代码 git commit -m [描述内容] 本地新建分支(或者切换到分支) git master 查看分支 git checkout test 切换到本地test分支进行编辑

4.git push origin test 将本地代码上传到远程分支。

5.当前代码已经进行编辑改动，但是需要切换分支，这样git就会报错。git stash 保存改变的代备份码保存  git pull 拉取当前最新的代码  git stash pop 将备份后的代码释放到当前环境中

github上commit错误记录删除方法：

git reset  --hard commit_id

git push origin HEAD --force

~~~

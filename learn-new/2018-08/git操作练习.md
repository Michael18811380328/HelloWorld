Git rebase 功能

合并已有的本地的多次提交。

~~~bash
git log 列出当前的本地提交的commits
git rebase -i 提交的id 将这个id到现在的所有提交列出来
在vi编辑器中，可以进行编辑，根据提示，将pick变成s. 然后修改每一次的注释说明。最后：退出并保存提交。
这样就可以把本地的几个提交合并成一个commits。最后上传到github上对的代码就比较好看，避免了错误的提交。
PS:commit和push代码需要慎重。如果确定了改动，下载最新的package-lock.json并更新，再进行上传代码。
~~~

git pull === git fetch + git merge



****Daniels-MacBook-Pro:**seafile-editor seafile$** git branch
  master
  sharebtn
  upload-img

  ****Daniels-MacBook-Pro:**seafile-editor seafile$**   git fetch origin master:master
  From https://github.com/seafileltd/seafile-editor
   c99fa87..8147bad  master     -> master

~~~
git pull origin master === git fetch origin master + git merge origin/master

实际情况中，git fetch 更安全，可以查看本地文件相对于远程master

git 本地有一套系统，远程仓库也有一套系统。origin/master表示远程仓库，master表示本地仓库。其他的origin类似。
~~~

  ****Daniels-MacBook-Pro:**seafile-editor seafile$** git rebase master
  First, rewinding head to replay your work on top of it...
  Applying: upload-img button
  Applying: add insert local image dialog
  Applying: add upload img API and fix some bugs
  Using index info to reconstruct a base tree...
  	package-lock.json
  	package.json
  	src/index.js
  	src/lib/rich-markdown-editor.js
  Falling back to patching base and 3-way merge...
  Auto-merging src/lib/rich-markdown-editor.js
  Auto-merging src/index.js
  Auto-merging package.json
  CONFLICT (content): Merge conflict in package.json
  Auto-merging package-lock.json
  CONFLICT (content): Merge conflict in package-lock.json
  error: Failed to merge in the changes.
  Patch failed at 0003 add upload img API and fix some bugs
  Use 'git am --show-current-patch' to see the failed patch

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".



****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   src/index.js
	modified:   src/lib/add-local-image-dialog.js
	modified:   src/lib/rich-markdown-editor.js

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)

	both modified:   package-lock.json
	both modified:   package.json



****Daniels-MacBook-Pro:**seafile-editor seafile$** git checkout package-lock.json
error: path 'package-lock.json' is unmerged


****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   src/index.js
	modified:   src/lib/add-local-image-dialog.js
	modified:   src/lib/rich-markdown-editor.js

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)

	both modified:   package-lock.json
	both modified:   package.json



****Daniels-MacBook-Pro:**seafile-editor seafile$** git checkout -f package-lock.json
warning: path 'package-lock.json' is unmerged


****Daniels-MacBook-Pro:**seafile-editor seafile$** git reset package-lock.json
Unstaged changes after reset:
M	package-lock.json
U	package.json


****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   src/index.js
	modified:   src/lib/add-local-image-dialog.js
	modified:   src/lib/rich-markdown-editor.js

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)

	both modified:   package.json

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   package-lock.json



****Daniels-MacBook-Pro:**seafile-editor seafile$** git checkout --  package-lock.json
****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   src/index.js
	modified:   src/lib/add-local-image-dialog.js
	modified:   src/lib/rich-markdown-editor.js

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)

	both modified:   package.json

****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   src/index.js
	modified:   src/lib/add-local-image-dialog.js
	modified:   src/lib/rich-markdown-editor.js

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)

	both modified:   package.json

****Daniels-MacBook-Pro:**seafile-editor seafile$** git add package.json
****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (all conflicts fixed: run "git rebase --continue")

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   package.json
	modified:   src/index.js
	modified:   src/lib/add-local-image-dialog.js
	modified:   src/lib/rich-markdown-editor.js

****Daniels-MacBook-Pro:**seafile-editor seafile$** git rebase --continue
Applying: add upload img API and fix some bugs
Applying: add upload local img
Applying: fix grammar bug
Using index info to reconstruct a base tree...
M	package.json
M	src/index.js
M	src/lib/rich-markdown-editor.js
Falling back to patching base and 3-way merge...
Auto-merging src/lib/rich-markdown-editor.js
Auto-merging src/index.js
Auto-merging package.json
CONFLICT (content): Merge conflict in package.json
error: Failed to merge in the changes.
Patch failed at 0005 fix grammar bug
Use 'git am --show-current-patch' to see the failed patch

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".

****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   src/css/richeditor/navbar-imgbutton.css
	modified:   src/index.js
	modified:   src/lib/rich-markdown-editor.js

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)

	both modified:   package.json

****Daniels-MacBook-Pro:**seafile-editor seafile$** git add package.json
****Daniels-MacBook-Pro:**seafile-editor seafile$** git rebase --continue
Applying: fix grammar bug
Applying: fix grammar bug
Applying: fix grammar bug
Using index info to reconstruct a base tree...
M	package.json
M	public/locales/en/translations.json
M	public/locales/zh-CN/translations.json
A	src/css/add-local-image-dialog.css
M	src/index.js
A	src/lib/add-local-image-dialog.js
M	src/lib/rich-markdown-editor.js
.git/rebase-apply/patch:257: trailing whitespace.

warning: 1 line adds whitespace errors.
Falling back to patching base and 3-way merge...
Auto-merging src/lib/rich-markdown-editor.js
Auto-merging src/index.js
Auto-merging package.json
CONFLICT (content): Merge conflict in package.json
error: Failed to merge in the changes.
Patch failed at 0007 fix grammar bug
Use 'git am --show-current-patch' to see the failed patch

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".

****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)

	both modified:   package.json

no changes added to commit (use "git add" and/or "git commit -a")
****Daniels-MacBook-Pro:**seafile-editor seafile$** git add package.json
****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (all conflicts fixed: run "git rebase --continue")

nothing to commit, working tree clean
****Daniels-MacBook-Pro:**seafile-editor seafile$** git rebase --continue
Applying: fix grammar bug
No changes - did you forget to use 'git add'?
If there is nothing left to stage, chances are that something else
already introduced the same changes; you might want to skip this patch.

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".

****Daniels-MacBook-Pro:**seafile-editor seafile$** git rebase --continue
Applying: fix grammar bug
No changes - did you forget to use 'git add'?
If there is nothing left to stage, chances are that something else
already introduced the same changes; you might want to skip this patch.

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".

****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (all conflicts fixed: run "git rebase --continue")

nothing to commit, working tree clean
****Daniels-MacBook-Pro:**seafile-editor seafile$** git rebase --continue
Applying: fix grammar bug
No changes - did you forget to use 'git add'?
If there is nothing left to stage, chances are that something else
already introduced the same changes; you might want to skip this patch.

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".

****Daniels-MacBook-Pro:**seafile-editor seafile$** git checkout package.json
****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (all conflicts fixed: run "git rebase --continue")

nothing to commit, working tree clean
****Daniels-MacBook-Pro:**seafile-editor seafile$** git rebase --continue
Applying: fix grammar bug
No changes - did you forget to use 'git add'?
If there is nothing left to stage, chances are that something else
already introduced the same changes; you might want to skip this patch.

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".

****Daniels-MacBook-Pro:**seafile-editor seafile$** git add package.json
****Daniels-MacBook-Pro:**seafile-editor seafile$** git status
rebase in progress; onto 8147bad
You are currently rebasing branch 'upload-img' on '8147bad'.
  (all conflicts fixed: run "git rebase --continue")

nothing to commit, working tree clean
****Daniels-MacBook-Pro:**seafile-editor seafile$** git rebase --continue
Applying: fix grammar bug
No changes - did you forget to use 'git add'?
If there is nothing left to stage, chances are that something else
already introduced the same changes; you might want to skip this patch.

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".

****Daniels-MacBook-Pro:**seafile-editor seafile$** git push origin upload-img
Everything up-to-date
****Daniels-MacBook-Pro:**seafile-editor seafile$** 



Last login: Sat Aug 25 15:41:53 on ttys000
**Daniels-MacBook-Pro:**~ seafile$ ls
Applications	Documents	Library		Music		Public
Desktop		Downloads	Movies		Pictures	VirtualBox VMs
**Daniels-MacBook-Pro:**~ seafile$ cd desktop/code-myrepo/HelloWorld/
**Daniels-MacBook-Pro:**HelloWorld seafile$ ls
LICENSE			index.html		learn			lib			package-lock.json
README.md		js			learn-new		node_modules		thought
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (HEAD -> master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
* master
  test
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test2
  error: pathspec 'test2' did not match any file(s) known to git.
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git branch test2
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
* master
  test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test2
  	js/es6.js
  	learn/react/demo/jsx.js
  Switched to branch 'test2'
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git push origin test2
  ssh: connect to host github.com port 22: Network is down
  fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test2
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   js/es6.js

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   learn/react/demo/jsx.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	js/test-file.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test2
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   js/es6.js
	new file:   js/test-file.js
	modified:   learn/react/demo/jsx.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'test-merge'
[test2 72c8f3f] test-merge
 3 files changed, 32 insertions(+), 28 deletions(-)
 create mode 100644 js/test-file.js
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'test-merge-2'
[test2 be01913] test-merge-2
 1 file changed, 3 insertions(+), 1 deletion(-)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit be01913bd5d2426b62d9f875a153f3251df07bd2 (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:33 2018 +0800

    test-merge-2

commit 72c8f3f97da2088a84c13f6bd9885a048efb6077
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:02 2018 +0800

    test-merge

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'test-merge-3'
[test2 e35ead6] test-merge-3
 1 file changed, 20 insertions(+), 1 deletion(-)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit e35ead6dd07e0551cc6e4d0d4ddc3e69118d518c (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:42:31 2018 +0800

    test-merge-3

commit be01913bd5d2426b62d9f875a153f3251df07bd2
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:33 2018 +0800

    test-merge-2

commit 72c8f3f97da2088a84c13f6bd9885a048efb6077
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:02 2018 +0800

    test-merge

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test1
error: pathspec 'test1' did not match any file(s) known to git.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
  test
* test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test
  Switched to branch 'test'
  Your branch is ahead of 'origin/test' by 2 commits.
  (use "git push" to publish your local commits)
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
* test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git status
  On branch test
  Your branch is ahead of 'origin/test' by 2 commits.
  (use "git push" to publish your local commits)

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	js/test-file.js

nothing added to commit but untracked files present (use "git add" to track)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'merge-test-1'
[test adf2148] merge-test-1
 1 file changed, 42 insertions(+)
 create mode 100644 js/test-file.js
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit adf214863910b403a082f9f228c55bff3c5c69ba (HEAD -> test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:43:47 2018 +0800

    merge-test-1

commit ee72a0fe07a4bd83e5f6f4c1d4d21a3d151d3664
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files

commit 8fc2f385b128e6f256786618da2fb79379bc3d0e
Merge: 80211a0 de87b0b
Author: MichaelAn <37589122+Michael18811380328@users.noreply.github.com>
Date:   Mon Aug 20 18:34:14 2018 +0800

    Merge pull request @1 from Michael18811380328/test
    
    test merge

commit de87b0b9190c8cd6bdc6c1e30aa6615a8544be5a (origin/test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 18:32:10 2018 +0800

    test merge

commit 80211a029da097f8e1a8c2c46f6ab88b104ef7db
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'merge-test'
[test cf8c7f3] merge-test
 1 file changed, 5 insertions(+), 1 deletion(-)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit cf8c7f364c1ff1c05db4e7d12e5e5c15d634c5da (HEAD -> test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:44:36 2018 +0800

    merge-test

commit adf214863910b403a082f9f228c55bff3c5c69ba
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:43:47 2018 +0800

    merge-test-1

commit ee72a0fe07a4bd83e5f6f4c1d4d21a3d151d3664
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files

commit 8fc2f385b128e6f256786618da2fb79379bc3d0e
Merge: 80211a0 de87b0b
Author: MichaelAn <37589122+Michael18811380328@users.noreply.github.com>
Date:   Mon Aug 20 18:34:14 2018 +0800

    Merge pull request @1 from Michael18811380328/test
    
    test merge

commit de87b0b9190c8cd6bdc6c1e30aa6615a8544be5a (origin/test)
**Daniels-MacBook-Pro:**HelloWorld seafile$ 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
* master
  test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test
  Switched to branch 'test'
  Your branch is ahead of 'origin/test' by 4 commits.
  (use "git push" to publish your local commits)
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
* test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git merge test2
  Removing learn/JS/js0301正方形.html
  Removing learn/JS/js0228对象object.html
  Removing learn/JS/js0228for练习.html
  Removing learn/JS/js0222认识JS.html
  Removing learn/HTML5/H5鼠标样式事件.html
  Removing learn/HTML5/H5鼠标位置0310.html
  Removing learn/HTML5/H5音频视频0313.html
  Removing learn/HTML5/H5音频视频0310.html
  Removing learn/HTML5/H5画布0311.html
  Removing learn/HTML5/H5图片拖动0310.html
  Removing learn/HTML5/0324画布练习H5.html
  Removing learn/HTML/H5学习 - 副本/H5综合练习.html
  Auto-merging js/test-file.js
  CONFLICT (add/add): Merge conflict in js/test-file.js
  Automatic merge failed; fix conflicts and then commit the result.
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i 
  js/test-file.js: needs merge
  Cannot rebase: You have unstaged changes.
  Additionally, your index contains uncommitted changes.
  Please commit or stash them.
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git status
  On branch test
  Your branch is ahead of 'origin/test' by 4 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:

	new file:   .github/ISSUE_TEMPLATE/bug_report.md
	new file:   LICENSE
	modified:   js/es6.js
	modified:   js/universe.js
	new file:   learn-new/2018-08/ajax-in-react.js
	new file:   learn-new/2018-08/document style guide/README.md
	new file:   learn-new/2018-08/document style guide/docs/marks.md
	new file:   learn-new/2018-08/document style guide/docs/number.md
	new file:   learn-new/2018-08/document style guide/docs/paragraph.md
	new file:   learn-new/2018-08/document style guide/docs/reference.md
	new file:   learn-new/2018-08/document style guide/docs/structure.md
	new file:   learn-new/2018-08/document style guide/docs/text.md
	new file:   learn-new/2018-08/document style guide/docs/title.md
	modified:   learn/Ajax/0403Ajax练习1.html
	modified:   learn/Array/01-对象字面量.html
	modified:   learn/Array/02-JSON.html
	modified:   learn/Array/04-类.html
	renamed:    learn/Array/08-为数组和arguments.html -> learn/Array/08-伪数组和arguments.html
	modified:   learn/Array/demo.html
	new file:   learn/Bootstrap/demo.html
	renamed:    learn/HTML/H5学习 - 副本/0324新增H5表单.html -> learn/HTML/H5/0324新增H5表单.html
	renamed:    learn/HTML/H5学习 - 副本/0324新增H5表单元素.html -> learn/HTML/H5/0324新增H5表单元素.html
	renamed:    learn/HTML/H5学习 - 副本/0324画布练习H5.html -> learn/HTML/H5/0324画布练习H5.html
	renamed:    learn/HTML/H5学习 - 副本/0324表单练习H5.html -> learn/HTML/H5/0324表单练习H5.html
	renamed:    learn/HTML5/H5.xmind -> learn/HTML/H5/H5.xmind
	renamed:    learn/HTML/H5学习 - 副本/H5图片拖动0310.html -> learn/HTML/H5/H5图片拖动0310.html
	renamed:    learn/HTML/H5学习 - 副本/H5画布0311.html -> learn/HTML/H5/H5画布0311.html
	renamed:    learn/HTML5/H5综合练习.html -> learn/HTML/H5/H5综合练习.html
	renamed:    learn/HTML/H5学习 - 副本/H5音频视频0310 (2).html -> learn/HTML/H5/H5音频视频0310 (2).html
	renamed:    learn/HTML/H5学习 - 副本/H5音频视频0310.html -> learn/HTML/H5/H5音频视频0310.html
	renamed:    learn/HTML/H5学习 - 副本/H5音频视频0313.html -> learn/HTML/H5/H5音频视频0313.html
	renamed:    learn/HTML/H5学习 - 副本/H5鼠标位置0310.html -> learn/HTML/H5/H5鼠标位置0310.html
	renamed:    learn/HTML/H5学习 - 副本/H5鼠标样式事件.html -> learn/HTML/H5/H5鼠标样式事件.html
	deleted:    learn/HTML/H5学习 - 副本/H5综合练习.html
	renamed:    learn/HTML/代县人民政府网站.html -> learn/HTML/government.html
	deleted:    learn/HTML5/0324画布练习H5.html
	deleted:    learn/HTML5/H5图片拖动0310.html
	deleted:    learn/HTML5/H5画布0311.html
	deleted:    learn/HTML5/H5音频视频0310.html
	deleted:    learn/HTML5/H5音频视频0313.html
	deleted:    learn/HTML5/H5鼠标位置0310.html
	deleted:    learn/HTML5/H5鼠标样式事件.html
	deleted:    learn/JS/js0222认识JS.html
	deleted:    learn/JS/js0228for练习.html
	deleted:    learn/JS/js0228对象object.html
	deleted:    learn/JS/js0301正方形.html
	modified:   learn/react/demo/jsx.js
	new file:   node_modules/.bin/loose-envify
	new file:   node_modules/asynckit/LICENSE
	new file:   node_modules/asynckit/README.md
	new file:   node_modules/asynckit/bench.js
	new file:   node_modules/asynckit/index.js
	new file:   node_modules/asynckit/lib/abort.js
	new file:   node_modules/asynckit/lib/async.js
	new file:   node_modules/asynckit/lib/defer.js
	new file:   node_modules/asynckit/lib/iterate.js
	new file:   node_modules/asynckit/lib/readable_asynckit.js
	new file:   node_modules/asynckit/lib/readable_parallel.js
	new file:   node_modules/asynckit/lib/readable_serial.js
	new file:   node_modules/asynckit/lib/readable_serial_ordered.js
	new file:   node_modules/asynckit/lib/state.js
	new file:   node_modules/asynckit/lib/streamify.js
	new file:   node_modules/asynckit/lib/terminator.js
	new file:   node_modules/asynckit/package.json
	new file:   node_modules/asynckit/parallel.js
	new file:   node_modules/asynckit/serial.js
	new file:   node_modules/asynckit/serialOrdered.js
	new file:   node_modules/asynckit/stream.js
	new file:   node_modules/axios/CHANGELOG.md
	new file:   node_modules/axios/LICENSE
	new file:   node_modules/axios/README.md
	new file:   node_modules/axios/UPGRADE_GUIDE.md
	new file:   node_modules/axios/dist/axios.js
	new file:   node_modules/axios/dist/axios.map
	new file:   node_modules/axios/dist/axios.min.js
	new file:   node_modules/axios/dist/axios.min.map
	new file:   node_modules/axios/index.d.ts
	new file:   node_modules/axios/index.js
	new file:   node_modules/axios/lib/adapters/README.md
	new file:   node_modules/axios/lib/adapters/http.js
	new file:   node_modules/axios/lib/adapters/xhr.js
	new file:   node_modules/axios/lib/axios.js
	new file:   node_modules/axios/lib/cancel/Cancel.js
	new file:   node_modules/axios/lib/cancel/CancelToken.js
	new file:   node_modules/axios/lib/cancel/isCancel.js
	new file:   node_modules/axios/lib/core/Axios.js
	new file:   node_modules/axios/lib/core/InterceptorManager.js
	new file:   node_modules/axios/lib/core/README.md
	new file:   node_modules/axios/lib/core/createError.js
	new file:   node_modules/axios/lib/core/dispatchRequest.js
	new file:   node_modules/axios/lib/core/enhanceError.js
	new file:   node_modules/axios/lib/core/settle.js
	new file:   node_modules/axios/lib/core/transformData.js
	new file:   node_modules/axios/lib/defaults.js
	new file:   node_modules/axios/lib/helpers/README.md
	new file:   node_modules/axios/lib/helpers/bind.js
	new file:   node_modules/axios/lib/helpers/btoa.js
	new file:   node_modules/axios/lib/helpers/buildURL.js
	new file:   node_modules/axios/lib/helpers/combineURLs.js
	new file:   node_modules/axios/lib/helpers/cookies.js
	new file:   node_modules/axios/lib/helpers/deprecatedMethod.js
	new file:   node_modules/axios/lib/helpers/isAbsoluteURL.js
	new file:   node_modules/axios/lib/helpers/isURLSameOrigin.js
	new file:   node_modules/axios/lib/helpers/normalizeHeaderName.js
	new file:   node_modules/axios/lib/helpers/parseHeaders.js
	new file:   node_modules/axios/lib/helpers/spread.js
	new file:   node_modules/axios/lib/utils.js
	new file:   node_modules/axios/package.json
	new file:   node_modules/classnames/HISTORY.md
	new file:   node_modules/classnames/LICENSE
	new file:   node_modules/classnames/README.md
	new file:   node_modules/classnames/bind.js
	new file:   node_modules/classnames/dedupe.js
	new file:   node_modules/classnames/index.js
	new file:   node_modules/classnames/package.json
	new file:   node_modules/combined-stream/License
	new file:   node_modules/combined-stream/Readme.md
	new file:   node_modules/combined-stream/lib/combined_stream.js
	new file:   node_modules/combined-stream/lib/defer.js
	new file:   node_modules/combined-stream/package.json
	new file:   node_modules/debug/.coveralls.yml
	new file:   node_modules/debug/.eslintrc
	new file:   node_modules/debug/.npmignore
	new file:   node_modules/debug/.travis.yml
	new file:   node_modules/debug/CHANGELOG.md
	new file:   node_modules/debug/LICENSE
	new file:   node_modules/debug/Makefile
	new file:   node_modules/debug/README.md
	new file:   node_modules/debug/karma.conf.js
	new file:   node_modules/debug/node.js
	new file:   node_modules/debug/package.json
	new file:   node_modules/debug/src/browser.js
	new file:   node_modules/debug/src/debug.js
	new file:   node_modules/debug/src/index.js
	new file:   node_modules/debug/src/node.js
	new file:   node_modules/delayed-stream/.npmignore
	new file:   node_modules/delayed-stream/License
	new file:   node_modules/delayed-stream/Makefile
	new file:   node_modules/delayed-stream/Readme.md
	new file:   node_modules/delayed-stream/lib/delayed_stream.js
	new file:   node_modules/delayed-stream/package.json
	new file:   node_modules/dom-helpers/README.md
	new file:   node_modules/dom-helpers/activeElement.js
	new file:   node_modules/dom-helpers/class/addClass.js
	new file:   node_modules/dom-helpers/class/hasClass.js
	new file:   node_modules/dom-helpers/class/index.js
	new file:   node_modules/dom-helpers/class/removeClass.js
	new file:   node_modules/dom-helpers/events/filter.js
	new file:   node_modules/dom-helpers/events/index.js
	new file:   node_modules/dom-helpers/events/listen.js
	new file:   node_modules/dom-helpers/events/off.js
	new file:   node_modules/dom-helpers/events/on.js
	new file:   node_modules/dom-helpers/index.js
	new file:   node_modules/dom-helpers/ownerDocument.js
	new file:   node_modules/dom-helpers/ownerWindow.js
	new file:   node_modules/dom-helpers/package.json
	new file:   node_modules/dom-helpers/query/closest.js
	new file:   node_modules/dom-helpers/query/contains.js
	new file:   node_modules/dom-helpers/query/height.js
	new file:   node_modules/dom-helpers/query/index.js
	new file:   node_modules/dom-helpers/query/isWindow.js
	new file:   node_modules/dom-helpers/query/matches.js
	new file:   node_modules/dom-helpers/query/offset.js
	new file:   node_modules/dom-helpers/query/offsetParent.js
	new file:   node_modules/dom-helpers/query/position.js
	new file:   node_modules/dom-helpers/query/querySelectorAll.js
	new file:   node_modules/dom-helpers/query/scrollLeft.js
	new file:   node_modules/dom-helpers/query/scrollParent.js
	new file:   node_modules/dom-helpers/query/scrollTop.js
	new file:   node_modules/dom-helpers/query/width.js
	new file:   node_modules/dom-helpers/style/getComputedStyle.js
	new file:   node_modules/dom-helpers/style/index.js
	new file:   node_modules/dom-helpers/style/removeStyle.js
	new file:   node_modules/dom-helpers/transition/animate.js
	new file:   node_modules/dom-helpers/transition/end.js
	new file:   node_modules/dom-helpers/transition/index.js
	new file:   node_modules/dom-helpers/transition/isTransform.js
	new file:   node_modules/dom-helpers/transition/properties.js
	new file:   node_modules/dom-helpers/util/camelize.js
	new file:   node_modules/dom-helpers/util/camelizeStyle.js
	new file:   node_modules/dom-helpers/util/hyphenate.js
	new file:   node_modules/dom-helpers/util/hyphenateStyle.js
	new file:   node_modules/dom-helpers/util/inDOM.js
	new file:   node_modules/dom-helpers/util/requestAnimationFrame.js
	new file:   node_modules/dom-helpers/util/scrollTo.js
	new file:   node_modules/dom-helpers/util/scrollbarSize.js
	new file:   node_modules/follow-redirects/LICENSE
	new file:   node_modules/follow-redirects/README.md
	new file:   node_modules/follow-redirects/http.js
	new file:   node_modules/follow-redirects/https.js
	new file:   node_modules/follow-redirects/index.js
	new file:   node_modules/follow-redirects/package.json
	new file:   node_modules/form-data/License
	new file:   node_modules/form-data/README.md
	new file:   node_modules/form-data/README.md.bak
	new file:   node_modules/form-data/lib/browser.js
	new file:   node_modules/form-data/lib/form_data.js
	new file:   node_modules/form-data/lib/populate.js
	new file:   node_modules/form-data/package.json
	new file:   node_modules/is-buffer/LICENSE
	new file:   node_modules/is-buffer/README.md
	new file:   node_modules/is-buffer/index.js
	new file:   node_modules/is-buffer/package.json
	new file:   node_modules/is-buffer/test/basic.js
	new file:   node_modules/js-tokens/CHANGELOG.md
	new file:   node_modules/js-tokens/LICENSE
	new file:   node_modules/js-tokens/README.md
	new file:   node_modules/js-tokens/index.js
	new file:   node_modules/js-tokens/package.json
	new file:   node_modules/lodash.isfunction/LICENSE
	new file:   node_modules/lodash.isfunction/README.md
	new file:   node_modules/lodash.isfunction/index.js
	new file:   node_modules/lodash.isfunction/package.json
	new file:   node_modules/lodash.isobject/LICENSE.txt
	new file:   node_modules/lodash.isobject/README.md
	new file:   node_modules/lodash.isobject/index.js
	new file:   node_modules/lodash.isobject/package.json
	new file:   node_modules/lodash.tonumber/LICENSE
	new file:   node_modules/lodash.tonumber/README.md
	new file:   node_modules/lodash.tonumber/index.js
	new file:   node_modules/lodash.tonumber/package.json
	new file:   node_modules/loose-envify/LICENSE
	new file:   node_modules/loose-envify/README.md
	new file:   node_modules/loose-envify/cli.js
	new file:   node_modules/loose-envify/custom.js
	new file:   node_modules/loose-envify/index.js
	new file:   node_modules/loose-envify/loose-envify.js
	new file:   node_modules/loose-envify/package.json
	new file:   node_modules/loose-envify/replace.js
	new file:   node_modules/mime-db/HISTORY.md
	new file:   node_modules/mime-db/LICENSE
	new file:   node_modules/mime-db/README.md
	new file:   node_modules/mime-db/db.json
	new file:   node_modules/mime-db/index.js
	new file:   node_modules/mime-db/package.json
	new file:   node_modules/mime-types/HISTORY.md
	new file:   node_modules/mime-types/LICENSE
	new file:   node_modules/mime-types/README.md
	new file:   node_modules/mime-types/index.js
	new file:   node_modules/mime-types/package.json
	new file:   node_modules/ms/index.js
	new file:   node_modules/ms/license.md
	new file:   node_modules/ms/package.json
	new file:   node_modules/ms/readme.md
	new file:   node_modules/object-assign/index.js
	new file:   node_modules/object-assign/license
	new file:   node_modules/object-assign/package.json
	new file:   node_modules/object-assign/readme.md
	new file:   node_modules/popper.js/README.md
	new file:   node_modules/popper.js/dist/esm/popper-utils.js
	new file:   node_modules/popper.js/dist/esm/popper-utils.js.map
	new file:   node_modules/popper.js/dist/esm/popper-utils.min.js
	new file:   node_modules/popper.js/dist/esm/popper-utils.min.js.map
	new file:   node_modules/popper.js/dist/esm/popper.js
	new file:   node_modules/popper.js/dist/esm/popper.js.map
	new file:   node_modules/popper.js/dist/esm/popper.min.js
	new file:   node_modules/popper.js/dist/esm/popper.min.js.map
	new file:   node_modules/popper.js/dist/esm/poppper.js.flow
	new file:   node_modules/popper.js/dist/popper-utils.js
	new file:   node_modules/popper.js/dist/popper-utils.js.map
	new file:   node_modules/popper.js/dist/popper-utils.min.js
	new file:   node_modules/popper.js/dist/popper-utils.min.js.map
	new file:   node_modules/popper.js/dist/popper.js
	new file:   node_modules/popper.js/dist/popper.js.map
	new file:   node_modules/popper.js/dist/popper.min.js
	new file:   node_modules/popper.js/dist/popper.min.js.map
	new file:   node_modules/popper.js/dist/umd/popper-utils.js
	new file:   node_modules/popper.js/dist/umd/popper-utils.js.map
	new file:   node_modules/popper.js/dist/umd/popper-utils.min.js
	new file:   node_modules/popper.js/dist/umd/popper-utils.min.js.map
	new file:   node_modules/popper.js/dist/umd/popper.js
	new file:   node_modules/popper.js/dist/umd/popper.js.map
	new file:   node_modules/popper.js/dist/umd/popper.min.js
	new file:   node_modules/popper.js/dist/umd/popper.min.js.map
	new file:   node_modules/popper.js/index.d.ts
	new file:   node_modules/popper.js/index.js.flow
	new file:   node_modules/popper.js/package.json
	new file:   node_modules/prop-types/CHANGELOG.md
	new file:   node_modules/prop-types/LICENSE
	new file:   node_modules/prop-types/README.md
	new file:   node_modules/prop-types/checkPropTypes.js
	new file:   node_modules/prop-types/factory.js
	new file:   node_modules/prop-types/factoryWithThrowingShims.js
	new file:   node_modules/prop-types/factoryWithTypeCheckers.js
	new file:   node_modules/prop-types/index.js
	new file:   node_modules/prop-types/lib/ReactPropTypesSecret.js
	new file:   node_modules/prop-types/package.json
	new file:   node_modules/prop-types/prop-types.js
	new file:   node_modules/prop-types/prop-types.min.js
	new file:   node_modules/react-lifecycles-compat/CHANGELOG.md
	new file:   node_modules/react-lifecycles-compat/LICENSE.md
	new file:   node_modules/react-lifecycles-compat/README.md
	new file:   node_modules/react-lifecycles-compat/package.json
	new file:   node_modules/react-lifecycles-compat/react-lifecycles-compat.cjs.js
	new file:   node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js
	new file:   node_modules/react-lifecycles-compat/react-lifecycles-compat.js
	new file:   node_modules/react-lifecycles-compat/react-lifecycles-compat.min.js
	new file:   node_modules/react-popper/CHANGELOG.md
	new file:   node_modules/react-popper/LICENSE
	new file:   node_modules/react-popper/README.md
	new file:   node_modules/react-popper/dist/cjs/react-popper.js
	new file:   node_modules/react-popper/dist/cjs/react-popper.js.map
	new file:   node_modules/react-popper/dist/cjs/react-popper.min.js
	new file:   node_modules/react-popper/dist/cjs/react-popper.min.js.map
	new file:   node_modules/react-popper/dist/umd/react-popper.js
	new file:   node_modules/react-popper/dist/umd/react-popper.js.map
	new file:   node_modules/react-popper/dist/umd/react-popper.min.js
	new file:   node_modules/react-popper/dist/umd/react-popper.min.js.map
	new file:   node_modules/react-popper/lib/Arrow.js
	new file:   node_modules/react-popper/lib/Manager.js
	new file:   node_modules/react-popper/lib/Popper.js
	new file:   node_modules/react-popper/lib/Target.js
	new file:   node_modules/react-popper/lib/react-popper.js
	new file:   node_modules/react-popper/package.json
	new file:   node_modules/react-popper/react-popper.d.ts
	new file:   node_modules/react-transition-group/CHANGELOG.md
	new file:   node_modules/react-transition-group/CSSTransition.js
	new file:   node_modules/react-transition-group/LICENSE
	new file:   node_modules/react-transition-group/README.md
	new file:   node_modules/react-transition-group/ReplaceTransition.js
	new file:   node_modules/react-transition-group/Transition.js
	new file:   node_modules/react-transition-group/TransitionGroup.js
	new file:   node_modules/react-transition-group/dist/react-transition-group.js
	new file:   node_modules/react-transition-group/dist/react-transition-group.min.js
	new file:   node_modules/react-transition-group/index.js
	new file:   node_modules/react-transition-group/package.json
	new file:   node_modules/react-transition-group/utils/ChildMapping.js
	new file:   node_modules/react-transition-group/utils/PropTypes.js
	new file:   node_modules/react-transition-group/utils/SimpleSet.js
	new file:   node_modules/reactstrap/CHANGELOG.md
	new file:   node_modules/reactstrap/LICENSE
	new file:   node_modules/reactstrap/README.md
	new file:   node_modules/reactstrap/dist/reactstrap.cjs.js
	new file:   node_modules/reactstrap/dist/reactstrap.cjs.js.map
	new file:   node_modules/reactstrap/dist/reactstrap.es.js
	new file:   node_modules/reactstrap/dist/reactstrap.es.js.map
	new file:   node_modules/reactstrap/dist/reactstrap.full.js
	new file:   node_modules/reactstrap/dist/reactstrap.full.js.map
	new file:   node_modules/reactstrap/dist/reactstrap.full.min.js
	new file:   node_modules/reactstrap/dist/reactstrap.full.min.js.map
	new file:   node_modules/reactstrap/dist/reactstrap.js
	new file:   node_modules/reactstrap/dist/reactstrap.js.map
	new file:   node_modules/reactstrap/dist/reactstrap.min.js
	new file:   node_modules/reactstrap/dist/reactstrap.min.js.map
	new file:   node_modules/reactstrap/lib/Alert.js
	new file:   node_modules/reactstrap/lib/Badge.js
	new file:   node_modules/reactstrap/lib/Breadcrumb.js
	new file:   node_modules/reactstrap/lib/BreadcrumbItem.js
	new file:   node_modules/reactstrap/lib/Button.js
	new file:   node_modules/reactstrap/lib/ButtonDropdown.js
	new file:   node_modules/reactstrap/lib/ButtonGroup.js
	new file:   node_modules/reactstrap/lib/ButtonToolbar.js
	new file:   node_modules/reactstrap/lib/Card.js
	new file:   node_modules/reactstrap/lib/CardBlock.js
	new file:   node_modules/reactstrap/lib/CardBody.js
	new file:   node_modules/reactstrap/lib/CardColumns.js
	new file:   node_modules/reactstrap/lib/CardDeck.js
	new file:   node_modules/reactstrap/lib/CardFooter.js
	new file:   node_modules/reactstrap/lib/CardGroup.js
	new file:   node_modules/reactstrap/lib/CardHeader.js
	new file:   node_modules/reactstrap/lib/CardImg.js
	new file:   node_modules/reactstrap/lib/CardImgOverlay.js
	new file:   node_modules/reactstrap/lib/CardLink.js
	new file:   node_modules/reactstrap/lib/CardSubtitle.js
	new file:   node_modules/reactstrap/lib/CardText.js
	new file:   node_modules/reactstrap/lib/CardTitle.js
	new file:   node_modules/reactstrap/lib/Carousel.js
	new file:   node_modules/reactstrap/lib/CarouselCaption.js
	new file:   node_modules/reactstrap/lib/CarouselControl.js
	new file:   node_modules/reactstrap/lib/CarouselIndicators.js
	new file:   node_modules/reactstrap/lib/CarouselItem.js
	new file:   node_modules/reactstrap/lib/Col.js
	new file:   node_modules/reactstrap/lib/Collapse.js
	new file:   node_modules/reactstrap/lib/Container.js
	new file:   node_modules/reactstrap/lib/CustomInput.js
	new file:   node_modules/reactstrap/lib/Dropdown.js
	new file:   node_modules/reactstrap/lib/DropdownItem.js
	new file:   node_modules/reactstrap/lib/DropdownMenu.js
	new file:   node_modules/reactstrap/lib/DropdownToggle.js
	new file:   node_modules/reactstrap/lib/Fade.js
	new file:   node_modules/reactstrap/lib/Form.js
	new file:   node_modules/reactstrap/lib/FormFeedback.js
	new file:   node_modules/reactstrap/lib/FormGroup.js
	new file:   node_modules/reactstrap/lib/FormText.js
	new file:   node_modules/reactstrap/lib/Input.js
	new file:   node_modules/reactstrap/lib/InputGroup.js
	new file:   node_modules/reactstrap/lib/InputGroupAddon.js
	new file:   node_modules/reactstrap/lib/InputGroupButton.js
	new file:   node_modules/reactstrap/lib/InputGroupButtonDropdown.js
	new file:   node_modules/reactstrap/lib/InputGroupText.js
	new file:   node_modules/reactstrap/lib/Jumbotron.js
	new file:   node_modules/reactstrap/lib/Label.js
	new file:   node_modules/reactstrap/lib/ListGroup.js
	new file:   node_modules/reactstrap/lib/ListGroupItem.js
	new file:   node_modules/reactstrap/lib/ListGroupItemHeading.js
	new file:   node_modules/reactstrap/lib/ListGroupItemText.js
	new file:   node_modules/reactstrap/lib/Media.js
	new file:   node_modules/reactstrap/lib/Modal.js
	new file:   node_modules/reactstrap/lib/ModalBody.js
	new file:   node_modules/reactstrap/lib/ModalFooter.js
	new file:   node_modules/reactstrap/lib/ModalHeader.js
	new file:   node_modules/reactstrap/lib/Nav.js
	new file:   node_modules/reactstrap/lib/NavDropdown.js
	new file:   node_modules/reactstrap/lib/NavItem.js
	new file:   node_modules/reactstrap/lib/NavLink.js
	new file:   node_modules/reactstrap/lib/Navbar.js
	new file:   node_modules/reactstrap/lib/NavbarBrand.js
	new file:   node_modules/reactstrap/lib/NavbarToggler.js
	new file:   node_modules/reactstrap/lib/Pagination.js
	new file:   node_modules/reactstrap/lib/PaginationItem.js
	new file:   node_modules/reactstrap/lib/PaginationLink.js
	new file:   node_modules/reactstrap/lib/Popover.js
	new file:   node_modules/reactstrap/lib/PopoverBody.js
	new file:   node_modules/reactstrap/lib/PopoverContent.js
	new file:   node_modules/reactstrap/lib/PopoverHeader.js
	new file:   node_modules/reactstrap/lib/PopoverTitle.js
	new file:   node_modules/reactstrap/lib/PopperContent.js
	new file:   node_modules/reactstrap/lib/PopperTargetHelper.js
	new file:   node_modules/reactstrap/lib/Portal.js
	new file:   node_modules/reactstrap/lib/Progress.js
	new file:   node_modules/reactstrap/lib/Row.js
	new file:   node_modules/reactstrap/lib/TabContent.js
	new file:   node_modules/reactstrap/lib/TabPane.js
	new file:   node_modules/reactstrap/lib/Table.js
	new file:   node_modules/reactstrap/lib/Tooltip.js
	new file:   node_modules/reactstrap/lib/Uncontrolled.js
	new file:   node_modules/reactstrap/lib/UncontrolledAlert.js
	new file:   node_modules/reactstrap/lib/UncontrolledButtonDropdown.js
	new file:   node_modules/reactstrap/lib/UncontrolledCarousel.js
	new file:   node_modules/reactstrap/lib/UncontrolledCollapse.js
	new file:   node_modules/reactstrap/lib/UncontrolledDropdown.js
	new file:   node_modules/reactstrap/lib/UncontrolledNavDropdown.js
	new file:   node_modules/reactstrap/lib/UncontrolledTooltip.js
	new file:   node_modules/reactstrap/lib/index.js
	new file:   node_modules/reactstrap/lib/setupTests.js
	new file:   node_modules/reactstrap/lib/utils.js
	new file:   node_modules/reactstrap/package.json
	new file:   node_modules/reactstrap/src/Alert.js
	new file:   node_modules/reactstrap/src/Badge.js
	new file:   node_modules/reactstrap/src/Breadcrumb.js
	new file:   node_modules/reactstrap/src/BreadcrumbItem.js
	new file:   node_modules/reactstrap/src/Button.js
	new file:   node_modules/reactstrap/src/ButtonDropdown.js
	new file:   node_modules/reactstrap/src/ButtonGroup.js
	new file:   node_modules/reactstrap/src/ButtonToolbar.js
	new file:   node_modules/reactstrap/src/Card.js
	new file:   node_modules/reactstrap/src/CardBlock.js
	new file:   node_modules/reactstrap/src/CardBody.js
	new file:   node_modules/reactstrap/src/CardColumns.js
	new file:   node_modules/reactstrap/src/CardDeck.js
	new file:   node_modules/reactstrap/src/CardFooter.js
	new file:   node_modules/reactstrap/src/CardGroup.js
	new file:   node_modules/reactstrap/src/CardHeader.js
	new file:   node_modules/reactstrap/src/CardImg.js
	new file:   node_modules/reactstrap/src/CardImgOverlay.js
	new file:   node_modules/reactstrap/src/CardLink.js
	new file:   node_modules/reactstrap/src/CardSubtitle.js
	new file:   node_modules/reactstrap/src/CardText.js
	new file:   node_modules/reactstrap/src/CardTitle.js
	new file:   node_modules/reactstrap/src/Carousel.js
	new file:   node_modules/reactstrap/src/CarouselCaption.js
	new file:   node_modules/reactstrap/src/CarouselControl.js
	new file:   node_modules/reactstrap/src/CarouselIndicators.js
	new file:   node_modules/reactstrap/src/CarouselItem.js
	new file:   node_modules/reactstrap/src/Col.js
	new file:   node_modules/reactstrap/src/Collapse.js
	new file:   node_modules/reactstrap/src/Container.js
	new file:   node_modules/reactstrap/src/CustomInput.js
	new file:   node_modules/reactstrap/src/Dropdown.js
	new file:   node_modules/reactstrap/src/DropdownItem.js
	new file:   node_modules/reactstrap/src/DropdownMenu.js
	new file:   node_modules/reactstrap/src/DropdownToggle.js
	new file:   node_modules/reactstrap/src/Fade.js
	new file:   node_modules/reactstrap/src/Form.js
	new file:   node_modules/reactstrap/src/FormFeedback.js
	new file:   node_modules/reactstrap/src/FormGroup.js
	new file:   node_modules/reactstrap/src/FormText.js
	new file:   node_modules/reactstrap/src/Input.js
	new file:   node_modules/reactstrap/src/InputGroup.js
	new file:   node_modules/reactstrap/src/InputGroupAddon.js
	new file:   node_modules/reactstrap/src/InputGroupButton.js
	new file:   node_modules/reactstrap/src/InputGroupButtonDropdown.js
	new file:   node_modules/reactstrap/src/InputGroupText.js
	new file:   node_modules/reactstrap/src/Jumbotron.js
	new file:   node_modules/reactstrap/src/Label.js
	new file:   node_modules/reactstrap/src/ListGroup.js
	new file:   node_modules/reactstrap/src/ListGroupItem.js
	new file:   node_modules/reactstrap/src/ListGroupItemHeading.js
	new file:   node_modules/reactstrap/src/ListGroupItemText.js
	new file:   node_modules/reactstrap/src/Media.js
	new file:   node_modules/reactstrap/src/Modal.js
	new file:   node_modules/reactstrap/src/ModalBody.js
	new file:   node_modules/reactstrap/src/ModalFooter.js
	new file:   node_modules/reactstrap/src/ModalHeader.js
	new file:   node_modules/reactstrap/src/Nav.js
	new file:   node_modules/reactstrap/src/NavDropdown.js
	new file:   node_modules/reactstrap/src/NavItem.js
	new file:   node_modules/reactstrap/src/NavLink.js
	new file:   node_modules/reactstrap/src/Navbar.js
	new file:   node_modules/reactstrap/src/NavbarBrand.js
	new file:   node_modules/reactstrap/src/NavbarToggler.js
	new file:   node_modules/reactstrap/src/Pagination.js
	new file:   node_modules/reactstrap/src/PaginationItem.js
	new file:   node_modules/reactstrap/src/PaginationLink.js
	new file:   node_modules/reactstrap/src/Popover.js
	new file:   node_modules/reactstrap/src/PopoverBody.js
	new file:   node_modules/reactstrap/src/PopoverContent.js
	new file:   node_modules/reactstrap/src/PopoverHeader.js
	new file:   node_modules/reactstrap/src/PopoverTitle.js
	new file:   node_modules/reactstrap/src/PopperContent.js
	new file:   node_modules/reactstrap/src/PopperTargetHelper.js
	new file:   node_modules/reactstrap/src/Portal.js
	new file:   node_modules/reactstrap/src/Progress.js
	new file:   node_modules/reactstrap/src/Row.js
	new file:   node_modules/reactstrap/src/TabContent.js
	new file:   node_modules/reactstrap/src/TabPane.js
	new file:   node_modules/reactstrap/src/Table.js
	new file:   node_modules/reactstrap/src/Tooltip.js
	new file:   node_modules/reactstrap/src/UncontrolledAlert.js
	new file:   node_modules/reactstrap/src/UncontrolledButtonDropdown.js
	new file:   node_modules/reactstrap/src/UncontrolledCarousel.js
	new file:   node_modules/reactstrap/src/UncontrolledCollapse.js
	new file:   node_modules/reactstrap/src/UncontrolledDropdown.js
	new file:   node_modules/reactstrap/src/UncontrolledNavDropdown.js
	new file:   node_modules/reactstrap/src/UncontrolledTooltip.js
	new file:   node_modules/reactstrap/src/__tests__/.eslintrc
	new file:   node_modules/reactstrap/src/__tests__/Alert.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Badge.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Breadcrumb.spec.js
	new file:   node_modules/reactstrap/src/__tests__/BreadcrumbList.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Button.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ButtonDropdown.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ButtonGroup.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ButtonToolbar.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Card.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardBlock.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardBody.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardColumns.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardDeck.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardFooter.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardGroup.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardHeader.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardImg.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardImgOverlay.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardLink.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardSubtitle.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardText.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CardTitle.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Carousel.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Col.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Collapse.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Container.spec.js
	new file:   node_modules/reactstrap/src/__tests__/CustomInput.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Dropdown.spec.js
	new file:   node_modules/reactstrap/src/__tests__/DropdownItem.spec.js
	new file:   node_modules/reactstrap/src/__tests__/DropdownMenu.spec.js
	new file:   node_modules/reactstrap/src/__tests__/DropdownToggle.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Fade.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Form.spec.js
	new file:   node_modules/reactstrap/src/__tests__/FormFeedback.spec.js
	new file:   node_modules/reactstrap/src/__tests__/FormGroup.spec.js
	new file:   node_modules/reactstrap/src/__tests__/FormText.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Input.spec.js
	new file:   node_modules/reactstrap/src/__tests__/InputGroup.spec.js
	new file:   node_modules/reactstrap/src/__tests__/InputGroupAddon.spec.js
	new file:   node_modules/reactstrap/src/__tests__/InputGroupButton.spec.js
	new file:   node_modules/reactstrap/src/__tests__/InputGroupButtonDropdown.spec.js
	new file:   node_modules/reactstrap/src/__tests__/InputGroupText.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Jumbotron.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Label.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ListGroup.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ListGroupItem.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ListGroupItemHeading.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ListGroupItemText.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Media.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Modal.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ModalBody.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ModalFooter.spec.js
	new file:   node_modules/reactstrap/src/__tests__/ModalHeader.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Nav.spec.js
	new file:   node_modules/reactstrap/src/__tests__/NavBrand.spec.js
	new file:   node_modules/reactstrap/src/__tests__/NavDropdown.spec.js
	new file:   node_modules/reactstrap/src/__tests__/NavItem.spec.js
	new file:   node_modules/reactstrap/src/__tests__/NavLink.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Navbar.spec.js
	new file:   node_modules/reactstrap/src/__tests__/NavbarToggler.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Pagination.spec.js
	new file:   node_modules/reactstrap/src/__tests__/PaginationItem.spec.js
	new file:   node_modules/reactstrap/src/__tests__/PaginationLink.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Popover.spec.js
	new file:   node_modules/reactstrap/src/__tests__/PopoverBody.spec.js
	new file:   node_modules/reactstrap/src/__tests__/PopoverContent.spec.js
	new file:   node_modules/reactstrap/src/__tests__/PopoverHeader.spec.js
	new file:   node_modules/reactstrap/src/__tests__/PopoverTitle.spec.js
	new file:   node_modules/reactstrap/src/__tests__/PopperContent.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Progress.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Row.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Table.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Tabs.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Tooltip.spec.js
	new file:   node_modules/reactstrap/src/__tests__/Uncontrolled.spec.js
	new file:   node_modules/reactstrap/src/__tests__/UncontrolledCarousel.spec.js
	new file:   node_modules/reactstrap/src/__tests__/UncontrolledCollapse.spec.js
	new file:   node_modules/reactstrap/src/__tests__/UncontrolledNavDropdown.spec.js
	new file:   node_modules/reactstrap/src/__tests__/utils.spec.js
	new file:   node_modules/reactstrap/src/index.js
	new file:   node_modules/reactstrap/src/setupTests.js
	new file:   node_modules/reactstrap/src/utils.js
	new file:   node_modules/seafile-js/.eslintrc.js
	new file:   node_modules/seafile-js/LICENSE
	new file:   node_modules/seafile-js/lib/seafile-api.js
	new file:   node_modules/seafile-js/package.json
	new file:   node_modules/seafile-js/readme.md
	new file:   node_modules/seafile-js/test/test.js
	new file:   package-lock.json
	new file:   thought/2018-08-人工智能和未来发展.md

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both added:      js/test-file.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git add js/test-file.js
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 4 commits.
  (use "git push" to publish your local commits)

All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:

	new file:   .github/ISSUE_TEMPLATE/bug_report.md
	new file:   LICENSE
	m

**Daniels-MacBook-Pro:**HelloWorld seafile$ git stash
Saved working directory and index state WIP on test: cf8c7f3 merge-test
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i
[detached HEAD 9fd1050] clean files merge-test-1 merge-test
 Date: Mon Aug 20 22:38:13 2018 +0800
 219 files changed, 843 insertions(+)
 create mode 100644 js/test-file.js
 rename learn/{Ajax 抄写1 => Ajax}/0403Ajax练习1.html (100%)
 create mode 100644 thought/sublime插件.pages
 create mode 100644 thought/跨域访问解决方案.md
Successfully rebased and updated refs/heads/test.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log -a
commit 9fd1050ea760b141e3cfb556142216bbdd96c066 (HEAD -> test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files
    merge-test-1
    merge-test

commit de87b0b9190c8cd6bdc6c1e30aa6615a8544be5a (origin/test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 18:32:10 2018 +0800

    test merge

commit 80211a029da097f8e1a8c2c46f6ab88b104ef7db
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sun Aug 19 15:27:39 2018 +0800

    add react demo and js demo

commit 112c9df7b48caf6ca2ad8cadba772dc0e212252e
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sun Aug 19 13:13:19 2018 +0800

    add sleep function

commit 0244154aca47567dd7d13a9b8384822b380eb9ba
Author: Michael18811380328 <1822852997@qq.com>
**Daniels-MacBook-Pro:**HelloWorld seafile$ git stash pop
Removing learn/JS/js0301正方形.html
Removing learn/JS/js0228对象object.html
Removing learn/JS/js0228for练习.html
Removing learn/JS/js0222认识JS.html
Removing learn/HTML5/H5鼠标样式事件.html
Removing learn/HTML5/H5鼠标位置0310.html
Removing learn/HTML5/H5音频视频0313.html
Removing learn/HTML5/H5音频视频0310.html
Removing learn/HTML5/H5画布0311.html
Removing learn/HTML5/H5图片拖动0310.html
Removing learn/HTML5/0324画布练习H5.html
Removing learn/HTML/H5学习 - 副本/H5综合练习.html
On branch test
Your branch is ahead of 'origin/test' by 1 commit.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   .github/ISSUE_TEMPLATE/bug_report.md

Dropped refs/stash@{0} (b34b9a43878c41dfbf4fe04487c60ec1deb34629)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 1 commit.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)


​	

**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'add new files'
[test 7683ec7] add new files
 617 files changed, 99624 insertions(+), 576 deletions(-)
 create mode 100644 .github/ISSUE_TEMPLATE/bug_report.md
 create mode 100644 LICENSE
 rewrite js/universe.js (78%)
 create mode 100644 learn-new/2018-08/ajax-in-react.js

 create mode 100644 package-lock.json
 create mode 100644 thought/2018-08-人工智能和未来发展.md
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 2 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
* test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git log -a
  commit 7683ec7a8004225703252d6afdc7f94f71f8c853 (HEAD -> test)
  Author: Michael18811380328 <1822852997@qq.com>
  Date:   Sat Aug 25 20:48:54 2018 +0800

    add new files

commit 9fd1050ea760b141e3cfb556142216bbdd96c066
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files
    merge-test-1
    merge-test

commit de87b0b9190c8cd6bdc6c1e30aa6615a8544be5a (origin/test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 18:32:10 2018 +0800

    test merge

commit 80211a029da097f8e1a8c2c46f6ab88b104ef7db
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sun Aug 19 15:27:39 2018 +0800

    add react demo and js demo

commit 112c9df7b48caf6ca2ad8cadba772dc0e212252e
Author: Michael18811380328 <1822852997@qq.com>
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i
[detached HEAD a45301f] clean files merge-test-1 merge-test add new files
 Date: Mon Aug 20 22:38:13 2018 +0800
 806 files changed, 100453 insertions(+), 562 deletions(-)
 create mode 100644 .github/ISSUE_TEMPLATE/bug_report.md
 create mode 100644 LICENSE
 create mode 100644 js/test-file.js
 rewrite js/universe.js (78%)

 create mode 100644 node_modules/reactstrap/src/__tests__/ModalFooter.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/ModalHeader.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Nav.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/NavBrand.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/NavDropdown.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/NavItem.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/NavLink.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Navbar.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/NavbarToggler.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Pagination.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/PaginationItem.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/PaginationLink.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Popover.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/PopoverBody.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/PopoverContent.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/PopoverHeader.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/PopoverTitle.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/PopperContent.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Progress.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Row.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Table.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Tabs.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Tooltip.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/Uncontrolled.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/UncontrolledCarousel.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/UncontrolledCollapse.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/UncontrolledNavDropdown.spec.js
 create mode 100644 node_modules/reactstrap/src/__tests__/utils.spec.js
 create mode 100644 node_modules/reactstrap/src/index.js
 create mode 100644 node_modules/reactstrap/src/setupTests.js
 create mode 100644 node_modules/reactstrap/src/utils.js
 create mode 100644 node_modules/seafile-js/.eslintrc.js
 create mode 100644 node_modules/seafile-js/LICENSE
 create mode 100755 node_modules/seafile-js/lib/seafile-api.js
 create mode 100644 node_modules/seafile-js/package.json
 create mode 100644 node_modules/seafile-js/readme.md
 create mode 100644 node_modules/seafile-js/test/test.js
 create mode 100644 package-lock.json
 create mode 100644 thought/2018-08-人工智能和未来发展.md
 create mode 100644 thought/JEST-test.pages
 create mode 100644 thought/JEST前端代码测试工具.pages
 create mode 100644 thought/curl命令学习.md
 create mode 100644 thought/es6语法基础.pages
 create mode 100644 thought/git/github的pull request.txt
 create mode 100644 thought/git/屏幕快照 2018-08-18 11.50.58.png
 create mode 100644 thought/git/屏幕快照 2018-08-18 11.51.34.png
 create mode 100644 thought/git命令学习.md
 create mode 100644 thought/jest.pages
 create mode 100644 thought/mocha介绍 阮一峰.pages
 create mode 100644 thought/sublime插件.pages
 create mode 100644 thought/跨域访问解决方案.md
Successfully rebased and updated refs/heads/test.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log -a
commit a45301f25b7ba111b016b1be783636d202f49f9a (HEAD -> test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files
    merge-test-1
    merge-test
    add new files

commit de87b0b9190c8cd6bdc6c1e30aa6615a8544be5a (origin/test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 18:32:10 2018 +0800

    test merge

commit 80211a029da097f8e1a8c2c46f6ab88b104ef7db
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sun Aug 19 15:27:39 2018 +0800

    add react demo and js demo

commit 112c9df7b48caf6ca2ad8cadba772dc0e212252e
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sun Aug 19 13:13:19 2018 +0800

    add sleep function

commit 0244154aca47567dd7d13a9b8384822b380eb9ba
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
* test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test2
  Switched to branch 'test2'
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git log
  commit e35ead6dd07e0551cc6e4d0d4ddc3e69118d518c (HEAD -> test2)
  Author: Michael18811380328 <1822852997@qq.com>
  Date:   Sat Aug 25 20:42:31 2018 +0800

    test-merge-3

commit be01913bd5d2426b62d9f875a153f3251df07bd2
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:33 2018 +0800

    test-merge-2

commit 72c8f3f97da2088a84c13f6bd9885a048efb6077
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:02 2018 +0800

    test-merge

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i
There is no tracking information for the current branch.
Please specify which branch you want to rebase against.
See git-rebase(1) for details.

    git rebase <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> test2

**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
  test
* test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i
  There is no tracking information for the current branch.
  Please specify which branch you want to rebase against.
  See git-rebase(1) for details.

    git rebase <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> test2

**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i test2
Successfully rebased and updated refs/heads/test2.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log 
commit e35ead6dd07e0551cc6e4d0d4ddc3e69118d518c (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:42:31 2018 +0800

    test-merge-3

commit be01913bd5d2426b62d9f875a153f3251df07bd2
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:33 2018 +0800

    test-merge-2

commit 72c8f3f97da2088a84c13f6bd9885a048efb6077
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:02 2018 +0800

    test-merge

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i 72c8f3
Successfully rebased and updated refs/heads/test2.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i 3fd2917
[detached HEAD 6784a5c] test-merge-1 test-merge-2 test-merge-3
 Date: Sat Aug 25 20:41:02 2018 +0800
 3 files changed, 53 insertions(+), 28 deletions(-)
 create mode 100644 js/test-file.js
Successfully rebased and updated refs/heads/test2.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log -a
commit 6784a5c89dbe49fc747c5d78e8e253dcfcc61c10 (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:02 2018 +0800

    test-merge-1
    test-merge-2
    test-merge-3

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test1
error: pathspec 'test1' did not match any file(s) known to git.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test
Switched to branch 'test'
Your branch is ahead of 'origin/test' by 1 commit.
  (use "git push" to publish your local commits)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit a45301f25b7ba111b016b1be783636d202f49f9a (HEAD -> test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files
    merge-test-1
    merge-test
    add new files

commit de87b0b9190c8cd6bdc6c1e30aa6615a8544be5a (origin/test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 18:32:10 2018 +0800

    test merge

commit 80211a029da097f8e1a8c2c46f6ab88b104ef7db
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sun Aug 19 15:27:39 2018 +0800

    add react demo and js demo

commit 112c9df7b48caf6ca2ad8cadba772dc0e212252e
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sun Aug 19 13:13:19 2018 +0800

    add sleep function

commit 0244154aca47567dd7d13a9b8384822b380eb9ba
**Daniels-MacBook-Pro:**HelloWorld seafile$ git merge master
Auto-merging learn/react/demo/jsx.js
CONFLICT (add/add): Merge conflict in learn/react/demo/jsx.js
Auto-merging learn/Array/demo.html
Auto-merging learn/Array/04-类.html
Auto-merging learn/Array/02-JSON.html
Auto-merging learn/Ajax/0403Ajax练习1.html
Auto-merging js/es6.js
Automatic merge failed; fix conflicts and then commit the result.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i
learn/react/demo/jsx.js: needs merge
Cannot rebase: You have unstaged changes.
Additionally, your index contains uncommitted changes.
Please commit or stash them.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 1 commit.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:

	modified:   js/es6.js

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both added:      learn/react/demo/jsx.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git add learn/react/demo/jsx.js
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 1 commit.
  (use "git push" to publish your local commits)

All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:

	modified:   js/es6.js
	modified:   learn/react/demo/jsx.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'merge-test'
[test dd26e44] merge-test
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit dd26e44435cf15f19937882bea25929173caf86c (HEAD -> test)
Merge: a45301f 3fd2917
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:59:29 2018 +0800

    merge-test

commit a45301f25b7ba111b016b1be783636d202f49f9a
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files
    merge-test-1
    merge-test
    add new files

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --continue
No rebase in progress?
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i
CONFLICT (rename/rename): Rename directory learn/HTML学习 抄写1/H5学习 - 副本->learn/HTML/H5 in HEAD. Rename directory learn/HTML学习 抄写1/H5学习 - 副本->learn/HTML5 in ee72a0f... clean files
CONFLICT (rename/rename): Rename "learn/数组API源码/08-为数组和arguments.html"->"learn/Array/08-伪数组和arguments.html" in branch "HEAD" rename "learn/数组API源码/08-为数组和arguments.html"->"learn/Array/08-为数组和arguments.html" in "ee72a0f... clean files"
CONFLICT (rename/delete): learn/数组API源码/01-对象字面量.html deleted in HEAD and renamed to learn/Array/01-对象字面量.html in ee72a0f... clean files. Version ee72a0f... clean files of learn/Array/01-对象字面量.html left in tree.
error: could not apply ee72a0f... clean files

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".

Could not apply ee72a0f... clean files
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
interactive rebase in progress; onto de87b0b
Last commands done (2 commands done):
   pick a45301f clean files merge-test-1 merge-test add new files
   squash ee72a0f clean files
Next commands to do (6 remaining commands):
   squash fc3c23c add articles of RYF and personal thouthts
   squash 1135092 Create LICENSE
  (use "git rebase --edit-todo" to view and edit)
You are currently rebasing branch 'test' on 'de87b0b'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add/rm <file>..." as appropriate to mark resolution)

	added by them:   learn/Array/01-对象字面量.html
	added by them:   learn/Array/08-为数组和arguments.html
	added by us:     learn/Array/08-伪数组和arguments.html
	both deleted:    learn/H5学习 抄写1/0324画布练习H5.html
	both deleted:    learn/H5学习 抄写1/H5.xmind
	both deleted:    learn/H5学习 抄写1/H5图片拖动0310.html
	both deleted:    learn/H5学习 抄写1/H5画布0311.html
	both deleted:    learn/H5学习 抄写1/H5综合练习.html
	both deleted:    learn/H5学习 抄写1/H5音频视频0310.html
	both deleted:    learn/H5学习 抄写1/H5音频视频0313.html
	both deleted:    learn/H5学习 抄写1/H5鼠标位置0310.html
	both deleted:    learn/H5学习 抄写1/H5鼠标样式事件.html
	added by us:     learn/HTML/H5/0324新增H5表单.html
	added by us:     learn/HTML/H5/0324新增H5表单元素.html
	added by us:     learn/HTML/H5/0324画布练习H5.html
	added by us:     learn/HTML/H5/0324表单练习H5.html
	added by us:     learn/HTML/H5/H5.xmind
	added by us:     learn/HTML/H5/H5图片拖动0310.html
	added by us:     learn/HTML/H5/H5画布0311.html
	added by us:     learn/HTML/H5/H5综合练习.html
	added by us:     learn/HTML/H5/H5音频视频0310 (2).html
	added by us:     learn/HTML/H5/H5音频视频0310.html
	added by us:     learn/HTML/H5/H5音频视频0313.html
	added by us:     learn/HTML/H5/H5鼠标位置0310.html
	added by us:     learn/HTML/H5/H5鼠标样式事件.html
	added by them:   learn/HTML/H5学习 - 副本/0324新增H5表单.html
	added by them:   learn/HTML/H5学习 - 副本/0324新增H5表单元素.html
	added by them:   learn/HTML/H5学习 - 副本/0324画布练习H5.html
	added by them:   learn/HTML/H5学习 - 副本/0324表单练习H5.html
	added by them:   learn/HTML/H5学习 - 副本/H5图片拖动0310.html
	added by them:   learn/HTML/H5学习 - 副本/H5画布0311.html
	added by them:   learn/HTML/H5学习 - 副本/H5综合练习.html
	added by them:   learn/HTML/H5学习 - 副本/H5音频视频0310 (2).html
	added by them:   learn/HTML/H5学习 - 副本/H5音频视频0310.html
	added by them:   learn/HTML/H5学习 - 副本/H5音频视频0313.html
	added by them:   learn/HTML/H5学习 - 副本/H5鼠标位置0310.html
	added by them:   learn/HTML/H5学习 - 副本/H5鼠标样式事件.html
	added by us:     learn/HTML/government.html
	added by them:   learn/HTML/代县人民政府网站.html
	added by them:   learn/HTML5/0324画布练习H5.html
	added by them:   learn/HTML5/H5.xmind
	added by them:   learn/HTML5/H5图片拖动0310.html
	added by them:   learn/HTML5/H5画布0311.html
	added by them:   learn/HTML5/H5综合练习.html
	added by them:   learn/HTML5/H5音频视频0310.html
	added by them:   learn/HTML5/H5音频视频0313.html
	added by them:   learn/HTML5/H5鼠标位置0310.html
	added by them:   learn/HTML5/H5鼠标样式事件.html
	both deleted:    learn/HTML学习 抄写1/H5学习 - 副本/0324新增H5表单.html
	both deleted:    learn/HTML学习 抄写1/H5学习 - 副本/0324新增H5表单元素.html
	both deleted:    learn/HTML学习 抄写1/H5学习 - 副本/0324表单练习H5.html
	both deleted:    learn/HTML学习 抄写1/H5学习 - 副本/H5音频视频0310 (2).html
	both deleted:    learn/HTML学习 抄写1/代县人民政府网站.html
	added by them:   learn/JS/js0301正方形.html
	both added:      learn/react/demo/jsx.js
	both deleted:    learn/数组API源码/08-为数组和arguments.html

no changes added to commit (use "git add" and/or "git commit -a")
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
interactive rebase in progress; onto de87b0b
Last commands done (2 commands done):
   pick a45301f clean files merge-test-1 merge-test add new files
   squash ee72a0f clean files
Next commands to do (6 remaining commands):
   squash fc3c23c add articles of RYF and personal thouthts
   squash 1135092 Create LICENSE
  (use "git rebase --edit-todo" to view and edit)
You are currently rebasing branch 'test' on 'de87b0b'.
  (all conflicts fixed: run "git rebase --continue")

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   learn/Array/01-对象字面量.html
	new file:   learn/Array/08-为数组和arguments.html
	new file:   learn/HTML/H5学习 - 副本/0324新增H5表单.html
	new file:   learn/HTML/H5学习 - 副本/0324新增H5表单元素.html
	new file:   learn/HTML/H5学习 - 副本/0324画布练习H5.html
	new file:   learn/HTML/H5学习 - 副本/0324表单练习H5.html
	new file:   learn/HTML/H5学习 - 副本/H5图片拖动0310.html
	new file:   learn/HTML/H5学习 - 副本/H5画布0311.html
	new file:   learn/HTML/H5学习 - 副本/H5综合练习.html
	new file:   learn/HTML/H5学习 - 副本/H5音频视频0310 (2).html
	new file:   learn/HTML/H5学习 - 副本/H5音频视频0310.html
	new file:   learn/HTML/H5学习 - 副本/H5音频视频0313.html
	new file:   learn/HTML/H5学习 - 副本/H5鼠标位置0310.html
	new file:   learn/HTML/H5学习 - 副本/H5鼠标样式事件.html
	new file:   learn/HTML/代县人民政府网站.html
	new file:   learn/HTML5/0324画布练习H5.html
	new file:   learn/HTML5/H5.xmind
	new file:   learn/HTML5/H5图片拖动0310.html
	new file:   learn/HTML5/H5画布0311.html
	new file:   learn/HTML5/H5综合练习.html
	new file:   learn/HTML5/H5音频视频0310.html
	new file:   learn/HTML5/H5音频视频0313.html
	new file:   learn/HTML5/H5鼠标位置0310.html
	new file:   learn/HTML5/H5鼠标样式事件.html
	new file:   learn/JS/js0301正方形.html
	modified:   learn/react/demo/jsx.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --continue
[detached HEAD 326f2e5] clean files merge-test-1 merge-test add new files clean files
 Date: Mon Aug 20 22:38:13 2018 +0800
 820 files changed, 101403 insertions(+), 188 deletions(-)
 create mode 100644 .github/ISSUE_TEMPLATE/bug_report.md
 create mode 100644 LICENSE
 create mode 100644 js/test-file.js
 rewrite js/universe.js (78%)
 create mode 100644 learn-new/2018-08/ajax-in-react.js
 create mode 100644 learn-new/2018-08/document style guide/README.md
 create mode 100644 learn-new/2018-08/document style guide/docs/marks.md
 create mode 100644 learn-new/2018-08/document style guide/docs/number.md

 create mode 100644 thought/sublime插件.pages
 create mode 100644 thought/跨域访问解决方案.md
[detached HEAD d5ce312] clean files merge-test-1 merge-test add new files clean files
 Date: Mon Aug 20 22:38:13 2018 +0800
 806 files changed, 100498 insertions(+), 562 deletions(-)
 create mode 100644 .github/ISSUE_TEMPLATE/bug_report.md
 create mode 100644 LICENSE
 create mode 100644 js/test-file.js
 rewrite js/universe.js (78%)
 create mode 100644 learn-new/2018-08/ajax-in-react.js

 create mode 100644 thought/jest.pages
 create mode 100644 thought/mocha介绍 阮一峰.pages
 create mode 100644 thought/sublime插件.pages
 create mode 100644 thought/跨域访问解决方案.md
Successfully rebased and updated refs/heads/test.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --continue
No rebase in progress?
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log -a
commit d5ce31250506b71445199d11655c6cb2fc0dd34a (HEAD -> test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files
    merge-test-1
    merge-test
    add new files
    clean files
    
    add articles of RYF and personal thouthts
    
    Create LICENSE
    
    Update issue templates
    
    learn coding
    
    files
    
    combine commits
    test1
    test2
    test3
    test4

commit de87b0b9190c8cd6bdc6c1e30aa6615a8544be5a (origin/test)
Author: Michael18811380328 <1822852997@qq.com>
**Daniels-MacBook-Pro:**HelloWorld seafile$ 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch 
  master
* test
  test2
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git merge master
  Auto-merging learn/react/demo/jsx.js
  CONFLICT (add/add): Merge conflict in learn/react/demo/jsx.js
  Auto-merging learn/Array/demo.html
  Auto-merging learn/Array/04-类.html
  Auto-merging learn/Array/02-JSON.html
  Auto-merging learn/Ajax/0403Ajax练习1.html
  Automatic merge failed; fix conflicts and then commit the result.
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git status
  On branch test
  Your branch is ahead of 'origin/test' by 1 commit.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both added:      learn/react/demo/jsx.js

no changes added to commit (use "git add" and/or "git commit -a")
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add learn/react/demo/jsx.js
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 1 commit.
  (use "git push" to publish your local commits)

All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:

	modified:   learn/react/demo/jsx.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'fix conflict'
[test 285794e] fix conflict
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 285794e55b659f09caba5811e5e1b3f670526c80 (HEAD -> test)
Merge: d5ce312 3fd2917
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:08:56 2018 +0800

    fix conflict

Date:   Sat Aug 25 21:08:56 2018 +0800

    fix conflict

commit d5ce31250506b71445199d11655c6cb2fc0dd34a
Author: Michael18811380328 <1822852997@qq.com>
    fix conflict

commit d5ce31250506b71445199d11655c6cb2fc0dd34a
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files
    merge-test-1
    merge-test
    add new files
    clean files
    
    add articles of RYF and personal thouthts
    
    Create LICENSE
    
    Update issue templates
    
    learn coding
    
    files
    
    combine commits
    test1
    test2
    test3
    test4

**Daniels-MacBook-Pro:**HelloWorld seafile$ git merge master
Already up to date.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log 
commit 285794e55b659f09caba5811e5e1b3f670526c80 (HEAD -> test)
Merge: d5ce312 3fd2917
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:08:56 2018 +0800

    fix conflict

commit d5ce31250506b71445199d11655c6cb2fc0dd34a
Author: Michael18811380328 <1822852997@qq.com>
Date:   Mon Aug 20 22:38:13 2018 +0800

    clean files
    merge-test-1
    merge-test
    add new files
    clean files
    
    add articles of RYF and personal thouthts
    
    Create LICENSE
    
    Update issue templates
    
    learn coding
    
    files
    
    combine commits
    test1
    test2
    test3
    test4

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i 3fd2917b
BUG: sequencer.c:2873: octopus merges are not supported yet: 'and handle conflict

@ Rebase 3fd2917..285794e onto 3fd2917 (1 command)
@
@ Commands:
@ p, pick <commit> = use commit
@ r, reword <commit> = use commit, but edit the commit message
@ e, edit <commit> = use commit, but stop for amending
@ s, squash <commit> = use commit, but meld into previous commit
@ f, fixup <commit> = like "squash", but discard this commit's log message
@ x, exec <command> = run command (the rest of the line) using shell
@ d, drop <commit> = remove commit
@ l, label <label> = label current HEAD with a name
@ t, reset <label> = reset HEAD to a label
@ m, merge [-C <commit> | -c <commit>] <label> [@ <oneline>]
@ .       create a merge commit using the original merge commit's
@ .       message (or the oneline, if no original merge commit was
@ .       specified). Use -c <commit> to reword the commit message.
@
@ These lines can be re-ordered; they are executed from top to bottom.
@
@ If you remove a line here THAT COMMIT WILL BE LOST.
@
@	However, if you remove everything, the rebase will be aborted.
@
@	
@ Note that empty commits are commented out
'
error: git-rebase died of signal 6
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i 3fd2917b

It seems that there is already a rebase-merge directory, and
I wonder if you are in the middle of another rebase.  If that is the
case, please try
	git rebase (--continue | --abort | --skip)
If that is not the case, please
	rm -fr "/Users/seafile/desktop/code-myrepo/HelloWorld/.git/rebase-merge"
and run me again.  I am stopping in case you still have something
valuable there.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --continue
Successfully rebased and updated refs/heads/test.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (HEAD -> test, master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge
**Daniels-MacBook-Pro:**HelloWorld seafile$ 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
* test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test2
  fatal: Unable to create '/Users/seafile/desktop/code-myrepo/HelloWorld/.git/index.lock': File exists.

Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again. If it still fails, a git process
may have crashed in this repository earlier:
remove the file manually to continue.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 10 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test2
fatal: Unable to create '/Users/seafile/desktop/code-myrepo/HelloWorld/.git/index.lock': File exists.

Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again. If it still fails, a git process
may have crashed in this repository earlier:
remove the file manually to continue.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
* test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test2
  fatal: Unable to create '/Users/seafile/desktop/code-myrepo/HelloWorld/.git/index.lock': File exists.

Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again. If it still fails, a git process
may have crashed in this repository earlier:
remove the file manually to continue.
**Daniels-MacBook-Pro:**HelloWorld seafile$ ls
LICENSE			index.html		learn			lib			package-lock.json
README.md		js			learn-new		node_modules		thought
**Daniels-MacBook-Pro:**HelloWorld seafile$ ls -a
.			.git			README.md		learn			node_modules
..			.github			index.html		learn-new		package-lock.json
.DS_Store		LICENSE			js			lib			thought
**Daniels-MacBook-Pro:**HelloWorld seafile$ cd .git
**Daniels-MacBook-Pro:**.git seafile$ ls
COMMIT_EDITMSG	HEAD		branches	description	index		info		objects		refs
FETCH_HEAD	ORIG_HEAD	config		hooks		index.lock	logs		packed-refs
**Daniels-MacBook-Pro:**.git seafile$ rm index.lock
**Daniels-MacBook-Pro:**.git seafile$ ls
COMMIT_EDITMSG	HEAD		branches	description	index		logs		packed-refs
FETCH_HEAD	ORIG_HEAD	config		hooks		info		objects		refs
**Daniels-MacBook-Pro:**.git seafile$ cd ../
**Daniels-MacBook-Pro:**HelloWorld seafile$ ls
LICENSE			index.html		learn			lib			package-lock.json
README.md		js			learn-new		node_modules		thought
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
* test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git log
  commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (HEAD -> test, master)
  Author: Michael18811380328 <1822852997@qq.com>
  Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test2
Switched to branch 'test2'
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 6784a5c89dbe49fc747c5d78e8e253dcfcc61c10 (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:02 2018 +0800

    test-merge-1
    test-merge-2
    test-merge-3

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (test, master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

**Daniels-MacBook-Pro:**HelloWorld seafile$ git merge master
Already up to date.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
  test
* test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git merge test
  Already up to date.
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git status
  On branch test2
  Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   js/test-file.js

no changes added to commit (use "git add" and/or "git commit -a")
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test2
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   js/test-file.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'test-merge-1'
[test2 590a608] test-merge-1
 1 file changed, 24 insertions(+), 4 deletions(-)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test2
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   js/sleep.js

no changes added to commit (use "git add" and/or "git commit -a")
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test2
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   js/sleep.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'test-merge'
[test2 7e3aa26] test-merge
 1 file changed, 21 insertions(+), 9 deletions(-)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 7e3aa2676bd9919a8bc515f74a8b9a3e93b856c8 (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:17:37 2018 +0800

    test-merge

commit 590a608c288fbe15ba6982c83475054e8ae1b83d
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:16:57 2018 +0800

    test-merge-1

commit 6784a5c89dbe49fc747c5d78e8e253dcfcc61c10
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:02 2018 +0800

    test-merge-1
    test-merge-2
    test-merge-3

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (test, master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'test-merge'
[test2 297802e] test-merge
 1 file changed, 2 insertions(+), 1 deletion(-)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 297802e8dae97c75b8201037fe9d25ff27b5071d (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:18:04 2018 +0800

    test-merge

commit 7e3aa2676bd9919a8bc515f74a8b9a3e93b856c8
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:17:37 2018 +0800

    test-merge

commit 590a608c288fbe15ba6982c83475054e8ae1b83d
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:16:57 2018 +0800

    test-merge-1

commit 6784a5c89dbe49fc747c5d78e8e253dcfcc61c10
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:02 2018 +0800

    test-merge-1
    test-merge-2
    test-merge-3

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (test, master)
Author: Michael18811380328 <1822852997@qq.com>
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test
Switched to branch 'test'
Your branch is ahead of 'origin/test' by 10 commits.
  (use "git push" to publish your local commits)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log 
commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (HEAD -> test, master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge
**Daniels-MacBook-Pro:**HelloWorld seafile$ 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 10 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add . 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'merge-test1'
[test 23abcff] merge-test1
 1 file changed, 25 insertions(+), 10 deletions(-)
 rewrite js/sleep.js (88%)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 11 commits.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   js/test-file.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'merge-2'
[test 6e2c6f4] merge-2
 1 file changed, 60 insertions(+)
 create mode 100644 js/test-file.js
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 6e2c6f41456b8e1093dbb04b2ec68a9c52233100 (HEAD -> test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:19:55 2018 +0800

    merge-2

commit 23abcffa3f11c854ac25385ecfef5a1e14c29411
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:19:11 2018 +0800

    merge-test1

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (HEAD -> master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log 
commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84 (HEAD -> master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   js/sleep.js

no changes added to commit (use "git add" and/or "git commit -a")
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   js/sleep.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'master merge test'
[master 98cce62] master merge test
 1 file changed, 20 insertions(+), 9 deletions(-)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 98cce621698177b55f71ba3bee1491e7e5f0fb10 (HEAD -> master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:22:06 2018 +0800

    master merge test

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

**Daniels-MacBook-Pro:**HelloWorld seafile$ 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test
Switched to branch 'test'
Your branch is ahead of 'origin/test' by 12 commits.
  (use "git push" to publish your local commits)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
  master
* test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git log
  commit 6e2c6f41456b8e1093dbb04b2ec68a9c52233100 (HEAD -> test)
  Author: Michael18811380328 <1822852997@qq.com>
  Date:   Sat Aug 25 21:19:55 2018 +0800

    merge-2

commit 23abcffa3f11c854ac25385ecfef5a1e14c29411
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:19:11 2018 +0800

    merge-test1

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i 3fd2917b7b5
[detached HEAD fb742e5] merge-test1 and merge-2
 Date: Sat Aug 25 21:19:11 2018 +0800
 2 files changed, 85 insertions(+), 10 deletions(-)
 rewrite js/sleep.js (88%)
 create mode 100644 js/test-file.js
Successfully rebased and updated refs/heads/test.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit fb742e566b6d42be27563fbe149c152e5a03d7f6 (HEAD -> test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:19:11 2018 +0800

    merge-test1 and merge-2

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i 0c61f70c5c1
error: invalid line 2: s: fb742e5 merge-test1 and merge-2
You can fix this with 'git rebase --edit-todo' and then run 'git rebase --continue'.
Or you can abort the rebase with 'git rebase --abort'.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --continue
error: invalid line 2: s: fb742e5 merge-test1 and merge-2
error: please fix this using 'git rebase --edit-todo'.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --edit-todo
error: invalid line 2: s: fb742e5 merge-test1 and merge-2
error: unusable todo list: '.git/rebase-merge/git-rebase-todo'
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --edit-todo
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (HEAD, origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge

commit fc3c23cfccfbab198ede9e823c6cc32334310245
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:18:37 2018 +0800

    add articles of RYF and personal thouthts

commit 46fbdb9e3f4652df10276ffeddfa0c0561fcb6c4
Author: MichaelAn <37589122+Michael18811380328@users.noreply.github.com>
Date:   Tue Aug 21 11:14:54 2018 +0800
**Daniels-MacBook-Pro:**HelloWorld seafile$ 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git branch -a
* (no branch, rebasing test)
  master
  test
  test2
  remotes/origin/HEAD -> origin/master
  remotes/origin/add-license-1
  remotes/origin/master
  remotes/origin/test
  **Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --contunue
  error: unknown option `contunue'
  usage: git rebase [-i] [options] [--exec <cmd>] [--onto <newbase>] [<upstream>] [<branch>]
   or: git rebase [-i] [options] [--exec <cmd>] [--onto <newbase>] --root [<branch>]
   or: git rebase --continue | --abort | --skip | --edit-todo

Available options are
    -v, --verbose         display a diffstat of what changed upstream
    -q, --quiet           be quiet. implies --no-stat
    --autostash           automatically stash/stash pop before and after
    --fork-point          use 'merge-base --fork-point' to refine upstream
    --onto ...            rebase onto given branch instead of upstream
    -r, --rebase-merges[=...]
                          try to rebase merges instead of skipping them
    -p, --preserve-merges
                          try to recreate merges instead of ignoring them
    -s, --strategy ...    use the given merge strategy
    --no-ff               cherry-pick all commits, even if unchanged
    -m, --merge           use merging strategies to rebase
    -i, --interactive     let the user edit the list of commits to rebase
    -x, --exec ...        add exec lines after each commit of the editable list
    -k, --keep-empty      preserve empty commits during rebase
    --allow-empty-message
                          allow rebasing commits with empty messages
    -f, --force-rebase    force rebase even if branch is up to date
    -X, --strategy-option ...
                          pass the argument through to the merge strategy
    --stat                display a diffstat of what changed upstream
    -n, --no-stat         do not show diffstat of what changed upstream
    --verify              allow pre-rebase hook to run
    --rerere-autoupdate   allow rerere to update index with resolved conflicts
    --root                rebase all reachable commits up to the root(s)
    --autosquash          move commits that begin with squash!/fixup! under -i
    --committer-date-is-author-date
                          passed to 'git am'
    --ignore-date         passed to 'git am'
    --signoff             passed to 'git am'
    --whitespace ...      passed to 'git apply'
    --ignore-whitespace   passed to 'git apply'
    -C ...                passed to 'git apply'
    -S, --gpg-sign[=...]  GPG-sign commits

Actions:
    --continue            continue
    --abort               abort and check out the original branch
    --skip                skip current patch and continue
    --edit-todo           edit the todo list during an interactive rebase
    --quit                abort but keep HEAD where it is
    --show-current-patch  show the patch file being applied or merged

**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --continue
[detached HEAD aaa6259] combine commits test1 test2 test3 test4 merge-test1 and merge-2
 Date: Fri Aug 24 20:50:05 2018 +0800
 571 files changed, 98726 insertions(+), 10 deletions(-)
 rewrite js/sleep.js (88%)
 create mode 100644 js/test-file.js
 create mode 120000 node_modules/.bin/loose-envify

 create mode 100644 node_modules/seafile-js/test/test.js
 create mode 100644 package-lock.json
Successfully rebased and updated refs/heads/test.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --continue
No rebase in progress?
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit aaa6259b4b23797de7b48bc81360b94f2d5945d2 (HEAD -> test)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits test1 test2 test3 test4 merge-test1 and merge-2

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge

commit fc3c23cfccfbab198ede9e823c6cc32334310245
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:18:37 2018 +0800
**Daniels-MacBook-Pro:**HelloWorld seafile$ 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test2
Switched to branch 'test2'
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 297802e8dae97c75b8201037fe9d25ff27b5071d (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:18:04 2018 +0800

    test-merge

commit 7e3aa2676bd9919a8bc515f74a8b9a3e93b856c8
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:17:37 2018 +0800

    test-merge

commit 590a608c288fbe15ba6982c83475054e8ae1b83d
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:16:57 2018 +0800

    test-merge-1

commit 6784a5c89dbe49fc747c5d78e8e253dcfcc61c10
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 20:41:02 2018 +0800

    test-merge-1
    test-merge-2
    test-merge-3

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i 0c61f70c5
[detached HEAD 6f4efc1] combine commits test1 test2 test3 test4 test-merge-1 test-merge-2 test-merge-3 test-merge-1
 Date: Fri Aug 24 20:50:05 2018 +0800
 571 files changed, 98722 insertions(+), 23 deletions(-)
 create mode 100644 js/test-file.js
 create mode 100644 node_modules/seafile-js/readme.md
 create mode 100644 node_modules/seafile-js/test/test.js
 create mode 100644 package-lock.json
Successfully rebased and updated refs/heads/test2.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 6f4efc12d2add8a3ac4467b7bf86b5ad3cb1a224 (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1 test2 test3 test4 test-merge-1 test-merge-2 test-merge-3 test-merge-1

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge

commit fc3c23cfccfbab198ede9e823c6cc32334310245
Author: Michael18811380328 <1822852997@qq.com>
**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase --continue
No rebase in progress?
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test2
nothing to commit, working tree clean
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 6f4efc12d2add8a3ac4467b7bf86b5ad3cb1a224 (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1 test2 test3 test4 test-merge-1 test-merge-2 test-merge-3 test-merge-1

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge

commit fc3c23cfccfbab198ede9e823c6cc32334310245
Author: Michael18811380328 <1822852997@qq.com>
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log -a
commit 6f4efc12d2add8a3ac4467b7bf86b5ad3cb1a224 (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1 test2 test3 test4 test-merge-1 test-merge-2 test-merge-3 test-merge-1

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge

commit fc3c23cfccfbab198ede9e823c6cc32334310245
Author: Michael18811380328 <1822852997@qq.com>
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 98cce621698177b55f71ba3bee1491e7e5f0fb10 (HEAD -> master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:22:06 2018 +0800

    master merge test

commit 3fd2917b7b5ea1aadb6bc364c05e2498898e1d84
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1
    test2
    test3
    test4

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

**Daniels-MacBook-Pro:**HelloWorld seafile$ git rebase -i  0c61f7
[detached HEAD 94f0a84] combine commits test1 test2 test3 test4 master merge test
 Date: Fri Aug 24 20:50:05 2018 +0800
 570 files changed, 98661 insertions(+), 9 deletions(-)
 create mode 120000 node_modules/.bin/loose-envify
 create mode 100644 node_modules/seafile-js/test/test.js
 create mode 100644 package-lock.json
Successfully rebased and updated refs/heads/master.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 94f0a846fc3128e339b37c18cbb71e8745ef020e (HEAD -> master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits test1 test2 test3 test4 master merge test

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge

commit fc3c23cfccfbab198ede9e823c6cc32334310245
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:18:37 2018 +0800
**Daniels-MacBook-Pro:**HelloWorld seafile$ 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test
Switched to branch 'test'
Your branch is ahead of 'origin/test' by 10 commits.
  (use "git push" to publish your local commits)
**Daniels-MacBook-Pro:**HelloWorld seafile$ git merge master
Auto-merging js/sleep.js
CONFLICT (content): Merge conflict in js/sleep.js
Automatic merge failed; fix conflicts and then commit the result.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test
Your branch is ahead of 'origin/test' by 10 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both modified:   js/sleep.js

no changes added to commit (use "git add" and/or "git commit -a")
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'fix conflict'
[test 2446bac] fix conflict
**Daniels-MacBook-Pro:**HelloWorld seafile$ git merge master
Already up to date.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git checkout test2
Switched to branch 'test2'
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test2
nothing to commit, working tree clean
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 6f4efc12d2add8a3ac4467b7bf86b5ad3cb1a224 (HEAD -> test2)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1 test2 test3 test4 test-merge-1 test-merge-2 test-merge-3 test-merge-1

commit 0c61f70c5c15e865a9ab48bf8b9477bb153c0de6 (origin/master, origin/HEAD)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 18:37:03 2018 +0800

    files

commit 0e0fabda0bc6c32c5b7e4ec78081744f1f59074f
Author: Michael18811380328 <1822852997@qq.com>
Date:   Thu Aug 23 23:40:18 2018 +0800

    learn coding

commit cb9f49c1e6d92cb65b81521200d99ebc4cc7d2c2
Merge: fc3c23c 46fbdb9
Author: Michael18811380328 <1822852997@qq.com>
Date:   Wed Aug 22 18:26:32 2018 +0800

    test merge

commit fc3c23cfccfbab198ede9e823c6cc32334310245
Author: Michael18811380328 <1822852997@qq.com>
**Daniels-MacBook-Pro:**HelloWorld seafile$ git merge test
Auto-merging js/test-file.js
CONFLICT (add/add): Merge conflict in js/test-file.js
Auto-merging js/sleep.js
CONFLICT (content): Merge conflict in js/sleep.js
Automatic merge failed; fix conflicts and then commit the result.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git add .
**Daniels-MacBook-Pro:**HelloWorld seafile$ git status
On branch test2
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:

	modified:   js/es6.js
	modified:   js/sleep.js
	modified:   js/test-file.js

**Daniels-MacBook-Pro:**HelloWorld seafile$ git commit -m 'fix conflict'
[test2 02a5474] fix conflict
**Daniels-MacBook-Pro:**HelloWorld seafile$ git log
commit 02a54747bf95866b4ec527be1a8238dcb323c17d (HEAD -> test2)
Merge: 6f4efc1 2446bac
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:36:11 2018 +0800

    fix conflict

commit 2446bac6a7e91e6be162bcea49b2e0b1f0b3bba0 (test)
Merge: aaa6259 94f0a84
Author: Michael18811380328 <1822852997@qq.com>
Date:   Sat Aug 25 21:34:10 2018 +0800

    fix conflict

commit 94f0a846fc3128e339b37c18cbb71e8745ef020e (master)
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits test1 test2 test3 test4 master merge test

commit 6f4efc12d2add8a3ac4467b7bf86b5ad3cb1a224
Author: Michael18811380328 <1822852997@qq.com>
Date:   Fri Aug 24 20:50:05 2018 +0800

    combine commits
    test1 test2 test3 test4 test-merge-1 test-merge-2 test-merge-3 test-merge-1

commit aaa6259b4b23797de7b48bc81360b94f2d5945d2
**Daniels-MacBook-Pro:**HelloWorld seafile$ 
**Daniels-MacBook-Pro:**HelloWorld seafile$ git merge
fatal: No remote for the current branch.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git merge test
Already up to date.
**Daniels-MacBook-Pro:**HelloWorld seafile$ git merge master
Already up to date.
**Daniels-MacBook-Pro:**HelloWorld seafile$ 
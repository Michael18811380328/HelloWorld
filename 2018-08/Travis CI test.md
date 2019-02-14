### Travis CI

~~~json
{
  "os": "linux",
  "env": "CXX=g++-4.8",
  "dist": "trusty 可靠的",
  "sudo": false,
  "cache": {
    "directories": [
      "node_modules",
      "bower_components"
    ]
  },
  "group": "stable",
  "addons": {
    "apt": {
      "sources": [
        "mongodb-upstart",
        "ubuntu-toolchain-r-test"
      ],
      "packages": [
        "mongodb-org-server",
        "g++-4.8"
      ]
    },
    "firefox": "55.0"
  },
  "script": [
    "./node_modules/karma/bin/karma start --browsers Firefox --single-run --reporters dots",
    "npm run test-china"
  ],
  "node_js": "6.12.2",
  "language": "node_js",
  "services": [
    "mongodb"
  ],
  "before_script": [
    "npm install --ignore-scripts",
    "npm install node-sass",
    "npm install",
    "npm update",
    "export DISPLAY=:99.0",
    "sh -e /etc/init.d/xvfb start",
    "node index.js --unittest &",
    "n=0",
    "until [ $n -ge 60 ]; do curl http://localhost:3000 && break; n=$[$n+1]; sleep 1; done"
  ],
  "before_install": [
    "export COCO_TRAVIS_TEST=1",
    "npm install -g npm@3.x"
  ]
}
~~~



~~~bash

Build History

Pull Requests

 More options
 Ran for 8 min 29 sec
 about an hour ago
Job log

View config
 Raw log
 worker_info
Worker information
hostname: e9d5bb83-92fc-430d-a44e-ca7730741a42@1.production-2-worker-org-06-packet.packet-ewr1.travisci.net
version: v4.0.0 https://github.com/travis-ci/worker/tree/e5cb567e10c0eefe380e81c9a2229ac8fb6a16ce
instance: ac2cdd8 travisci/ci-garnet:packer-1512502276-986baf0 (via amqp)
startup: 928.659552ms
system_info
Build system information
Build language: node_js
Build group: stable
Build dist: trusty
Build id: 422901422
Job id: 422901423
Runtime kernel version: 4.4.0-112-generic
travis-build version: 391b5d4c3
Build image provisioning date and time
Tue Dec  5 20:11:19 UTC 2017
Operating System Details
Distributor ID: Ubuntu
Description:  Ubuntu 14.04.5 LTS
Release:  14.04
Codename: trusty
Cookbooks Version
7c2c6a6 https://github.com/travis-ci/travis-cookbooks/tree/7c2c6a6
git version
git version 2.15.1
bash version
GNU bash, version 4.3.11(1)-release (x86_64-pc-linux-gnu)
gcc version
gcc (Ubuntu 4.8.4-2ubuntu1~14.04.3) 4.8.4
Copyright (C) 2013 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
docker version
Client:
 Version:      17.09.0-ce
 API version:  1.32
 Go version:   go1.8.3
 Git commit:   afdb6d4
 Built:        Tue Sep 26 22:39:28 2017
 OS/Arch:      linux/amd64
clang version
clang version 5.0.0 (tags/RELEASE_500/final)
Target: x86_64-unknown-linux-gnu
Thread model: posix
InstalledDir: /usr/local/clang-5.0.0/bin
jq version
jq-1.5
bats version
Bats 0.4.0
shellcheck version
0.4.6
shfmt version
v2.0.0
ccache version
ccache version 3.1.9
Copyright (C) 2002-2007 Andrew Tridgell
Copyright (C) 2009-2011 Joel Rosdahl
This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 3 of the License, or (at your option) any later
version.
cmake version
cmake version 3.9.2
CMake suite maintained and supported by Kitware (kitware.com/cmake).
heroku version
heroku-cli/6.14.39-addc925 (linux-x64) node-v9.2.0
imagemagick version
Version: ImageMagick 6.7.7-10 2017-07-31 Q16 http://www.imagemagick.org
md5deep version
4.2
mercurial version
Mercurial Distributed SCM (version 4.2.2)
(see https://mercurial-scm.org for more information)
Copyright (C) 2005-2017 Matt Mackall and others
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
mysql version
mysql  Ver 14.14 Distrib 5.6.33, for debian-linux-gnu (x86_64) using  EditLine wrapper
openssl version
OpenSSL 1.0.1f 6 Jan 2014
packer version
Packer v1.0.2
Your version of Packer is out of date! The latest version
is 1.1.2. You can update by downloading from www.packer.io
postgresql client version
psql (PostgreSQL) 9.6.6
ragel version
Ragel State Machine Compiler version 6.8 Feb 2013
Copyright (c) 2001-2009 by Adrian Thurston
subversion version
svn, version 1.8.8 (r1568071)
   compiled Aug 10 2017, 17:20:39 on x86_64-pc-linux-gnu
Copyright (C) 2013 The Apache Software Foundation.
This software consists of contributions made by many people;
see the NOTICE file for more information.
Subversion is open source software, see http://subversion.apache.org/
The following repository access (RA) modules are available:
* ra_svn : Module for accessing a repository using the svn network protocol.
  - with Cyrus SASL authentication
  - handles 'svn' scheme
* ra_local : Module for accessing a repository on local disk.
  - handles 'file' scheme
* ra_serf : Module for accessing a repository via WebDAV protocol using serf.
  - using serf 1.3.3
  - handles 'http' scheme
  - handles 'https' scheme
sudo version
Sudo version 1.8.9p5
Configure options: --prefix=/usr -v --with-all-insults --with-pam --with-fqdn --with-logging=syslog --with-logfac=authpriv --with-env-editor --with-editor=/usr/bin/editor --with-timeout=15 --with-password-timeout=0 --with-passprompt=[sudo] password for %p:  --without-lecture --with-tty-tickets --disable-root-mailer --enable-admin-flag --with-sendmail=/usr/sbin/sendmail --with-timedir=/var/lib/sudo --mandir=/usr/share/man --libexecdir=/usr/lib/sudo --with-sssd --with-sssd-lib=/usr/lib/x86_64-linux-gnu --with-selinux
Sudoers policy plugin version 1.8.9p5
Sudoers file grammar version 43
Sudoers path: /etc/sudoers
Authentication methods: 'pam'
Syslog facility if syslog is being used for logging: authpriv
Syslog priority to use when user authenticates successfully: notice
Syslog priority to use when user authenticates unsuccessfully: alert
Send mail if the user is not in sudoers
Use a separate timestamp for each user/tty combo
Lecture user the first time they run sudo
Root may run sudo
Allow some information gathering to give useful error messages
Require fully-qualified hostnames in the sudoers file
Visudo will honor the EDITOR environment variable
Set the LOGNAME and USER environment variables
Length at which to wrap log file lines (0 for no wrap): 80
Authentication timestamp timeout: 15.0 minutes
Password prompt timeout: 0.0 minutes
Number of tries to enter a password: 3
Umask to use or 0777 to use user's: 022
Path to mail program: /usr/sbin/sendmail
Flags for mail program: -t
Address to send mail to: root
Subject line for mail messages: *** SECURITY information for %h ***
Incorrect password message: Sorry, try again.
Path to authentication timestamp dir: /var/lib/sudo
Default password prompt: [sudo] password for %p:
Default user to run commands as: root
Value to override user's $PATH with: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin
Path to the editor for use by visudo: /usr/bin/editor
When to require a password for 'list' pseudocommand: any
When to require a password for 'verify' pseudocommand: all
File descriptors >= 3 will be closed before executing a command
Environment variables to check for sanity:
  TZ
  TERM
  LINGUAS
  LC_*
  LANGUAGE
  LANG
  COLORTERM
Environment variables to remove:
  RUBYOPT
  RUBYLIB
  PYTHONUSERBASE
  PYTHONINSPECT
  PYTHONPATH
  PYTHONHOME
  TMPPREFIX
  ZDOTDIR
  READNULLCMD
  NULLCMD
  FPATH
  PERL5DB
  PERL5OPT
  PERL5LIB
  PERLLIB
  PERLIO_DEBUG
  JAVA_TOOL_OPTIONS
  SHELLOPTS
  GLOBIGNORE
  PS4
  BASH_ENV
  ENV
  TERMCAP
  TERMPATH
  TERMINFO_DIRS
  TERMINFO
  _RLD*
  LD_*
  PATH_LOCALE
  NLSPATH
  HOSTALIASES
  RES_OPTIONS
  LOCALDOMAIN
  CDPATH
  IFS
Environment variables to preserve:
  JAVA_HOME
  TRAVIS
  CI
  DEBIAN_FRONTEND
  XAUTHORIZATION
  XAUTHORITY
  PS2
  PS1
  PATH
  LS_COLORS
  KRB5CCNAME
  HOSTNAME
  HOME
  DISPLAY
  COLORS
Locale to use while parsing sudoers: C
Directory in which to store input/output logs: /var/log/sudo-io
File in which to store the input/output log: %{seq}
Add an entry to the utmp/utmpx file when allocating a pty
PAM service name to use
PAM service name to use for login shells
Create a new PAM session for the command to run in
Maximum I/O log sequence number: 0
Local IP address and netmask pairs:
  172.17.0.2/255.255.0.0
Sudoers I/O plugin version 1.8.9p5
gzip version
gzip 1.6
Copyright (C) 2007, 2010, 2011 Free Software Foundation, Inc.
Copyright (C) 1993 Jean-loup Gailly.
This is free software.  You may redistribute copies of it under the terms of
the GNU General Public License <http://www.gnu.org/licenses/gpl.html>.
There is NO WARRANTY, to the extent permitted by law.
Written by Jean-loup Gailly.
zip version
Copyright (c) 1990-2008 Info-ZIP - Type 'zip "-L"' for software license.
This is Zip 3.0 (July 5th 2008), by Info-ZIP.
Currently maintained by E. Gordon.  Please send bug reports to
the authors using the web page at www.info-zip.org; see README for details.
Latest sources and executables are at ftp://ftp.info-zip.org/pub/infozip,
as of above date; see http://www.info-zip.org/ for other sites.
Compiled with gcc 4.8.2 for Unix (Linux ELF) on Oct 21 2013.
Zip special compilation options:
  USE_EF_UT_TIME       (store Universal Time)
  BZIP2_SUPPORT        (bzip2 library version 1.0.6, 6-Sept-2010)
      bzip2 code and library copyright (c) Julian R Seward
      (See the bzip2 license for terms of use)
  SYMLINK_SUPPORT      (symbolic links supported)
  LARGE_FILE_SUPPORT   (can read and write large files on file system)
  ZIP64_SUPPORT        (use Zip64 to store large files in archives)
  UNICODE_SUPPORT      (store and read UTF-8 Unicode paths)
  STORE_UNIX_UIDs_GIDs (store UID/GID sizes/values using new extra field)
  UIDGID_NOT_16BIT     (old Unix 16-bit UID/GID extra field not used)
  [encryption, version 2.91 of 05 Jan 2007] (modified for Zip 3)
Encryption notice:
  The encryption code of this program is not copyrighted and is
  put in the public domain.  It was originally written in Europe
  and, to the best of our knowledge, can be freely distributed
  in both source and object forms from any country, including
  the USA under License Exception TSU of the U.S. Export
  Administration Regulations (section 740.13(e)) of 6 June 2002.
Zip environment options:
             ZIP:  [none]
          ZIPOPT:  [none]
vim version
VIM - Vi IMproved 7.4 (2013 Aug 10, compiled Nov 24 2016 16:43:18)
Included patches: 1-52
Extra patches: 8.0.0056
Modified by pkg-vim-maintainers@lists.alioth.debian.org
Compiled by buildd@
Huge version without GUI.  Features included (+) or not (-):
+acl             +farsi           +mouse_netterm   +syntax
+arabic          +file_in_path    +mouse_sgr       +tag_binary
+autocmd         +find_in_path    -mouse_sysmouse  +tag_old_static
-balloon_eval    +float           +mouse_urxvt     -tag_any_white
-browse          +folding         +mouse_xterm     -tcl
++builtin_terms  -footer          +multi_byte      +terminfo
+byte_offset     +fork()          +multi_lang      +termresponse
+cindent         +gettext         -mzscheme        +textobjects
-clientserver    -hangul_input    +netbeans_intg   +title
-clipboard       +iconv           +path_extra      -toolbar
+cmdline_compl   +insert_expand   -perl            +user_commands
+cmdline_hist    +jumplist        +persistent_undo +vertsplit
+cmdline_info    +keymap          +postscript      +virtualedit
+comments        +langmap         +printer         +visual
+conceal         +libcall         +profile         +visualextra
+cryptv          +linebreak       +python          +viminfo
+cscope          +lispindent      -python3         +vreplace
+cursorbind      +listcmds        +quickfix        +wildignore
+cursorshape     +localmap        +reltime         +wildmenu
+dialog_con      -lua             +rightleft       +windows
+diff            +menu            -ruby            +writebackup
+digraphs        +mksession       +scrollbind      -X11
-dnd             +modify_fname    +signs           -xfontset
-ebcdic          +mouse           +smartindent     -xim
+emacs_tags      -mouseshape      -sniff           -xsmp
+eval            +mouse_dec       +startuptime     -xterm_clipboard
+ex_extra        +mouse_gpm       +statusline      -xterm_save
+extra_search    -mouse_jsbterm   -sun_workshop    -xpm
   system vimrc file: "$VIM/vimrc"
     user vimrc file: "$HOME/.vimrc"
 2nd user vimrc file: "~/.vim/vimrc"
      user exrc file: "$HOME/.exrc"
  fall-back for $VIM: "/usr/share/vim"
Compilation: gcc -c -I. -Iproto -DHAVE_CONFIG_H     -g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1
Linking: gcc   -Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,--as-needed -o vim        -lm -ltinfo -lnsl  -lselinux  -lacl -lattr -lgpm -ldl    -L/usr/lib/python2.7/config-x86_64-linux-gnu -lpython2.7 -lpthread -ldl -lutil -lm -Xlinker -export-dynamic -Wl,-O1 -Wl,-Bsymbolic-functions
iptables version
iptables v1.4.21
curl version
curl 7.35.0 (x86_64-pc-linux-gnu) libcurl/7.35.0 OpenSSL/1.0.1f zlib/1.2.8 libidn/1.28 librtmp/2.3
wget version
GNU Wget 1.15 built on linux-gnu.
rsync version
rsync  version 3.1.0  protocol version 31
gimme version
v1.2.0
nvm version
0.33.6
perlbrew version
/home/travis/perl5/perlbrew/bin/perlbrew  - App::perlbrew/0.80
phpenv version
rbenv 1.1.1-25-g6aa70b6
rvm version
rvm 1.29.3 (latest) by Michal Papis, Piotr Kuczynski, Wayne E. Seguin [https://rvm.io]
default ruby version
ruby 2.4.1p111 (2017-03-22 revision 58053) [x86_64-linux]
CouchDB version
couchdb 1.6.1
ElasticSearch version
5.5.0
Installed Firefox version
firefox 56.0.2
MongoDB version
MongoDB 3.4.10
PhantomJS version
2.1.1
Pre-installed PostgreSQL versions
9.2.24
9.3.20
9.4.15
9.5.10
9.6.6
RabbitMQ Version
3.6.14
Redis version
redis-server 4.0.6
riak version
2.2.3
Pre-installed Go versions
1.7.4
ant version
Apache Ant(TM) version 1.9.3 compiled on April 8 2014
mvn version
Apache Maven 3.5.2 (138edd61fd100ec658bfa2d307c43b76940a5d7d; 2017-10-18T07:58:13Z)
Maven home: /usr/local/maven-3.5.2
Java version: 1.8.0_151, vendor: Oracle Corporation
Java home: /usr/lib/jvm/java-8-oracle/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "4.4.0-101-generic", arch: "amd64", family: "unix"
gradle version
------------------------------------------------------------
Gradle 4.0.1
------------------------------------------------------------
Build time:   2017-07-07 14:02:41 UTC
Revision:     38e5dc0f772daecca1d2681885d3d85414eb6826
Groovy:       2.4.11
Ant:          Apache Ant(TM) version 1.9.6 compiled on June 29 2015
JVM:          1.8.0_151 (Oracle Corporation 25.151-b12)
OS:           Linux 4.4.0-101-generic amd64
lein version
Leiningen 2.8.1 on Java 1.8.0_151 Java HotSpot(TM) 64-Bit Server VM
Pre-installed Node.js versions
v4.8.6
v6.12.0
v6.12.1
v8.9
v8.9.1
phpenv versions
  system
  5.6
* 5.6.32 (set by /home/travis/.phpenv/version)
  7.0
  7.0.25
  7.1
  7.1.11
  hhvm
  hhvm-stable
composer --version
Composer version 1.5.2 2017-09-11 16:59:25
Pre-installed Ruby versions
ruby-2.2.7
ruby-2.3.4
ruby-2.4.1
Network availability confirmed.
apt
Adding APT Sources (BETA)
$ export DEBIAN_FRONTEND=noninteractive
0.27s$ curl -sSL https://build.travis-ci.org/files/gpg/mongodb-upstart.asc | sudo -E apt-key add -
OK
0.01s$ echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee -a /etc/apt/sources.list >/dev/null
1.28s$ sudo -E apt-add-repository -y "ppa:ubuntu-toolchain-r/test"
gpg: keyring `/tmp/tmp9undvwgm/secring.gpg' created
gpg: keyring `/tmp/tmp9undvwgm/pubring.gpg' created
gpg: requesting key BA9EF27F from hkp server keyserver.ubuntu.com
gpg: /tmp/tmp9undvwgm/trustdb.gpg: trustdb created
gpg: key BA9EF27F: public key "Launchpad Toolchain builds" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
OK
Installing APT Packages (BETA)
$ export DEBIAN_FRONTEND=noninteractive
7.52s$ sudo -E apt-get -yq update &>> ~/apt-get-update.log
96.82s$ sudo -E apt-get -yq --no-install-suggests --no-install-recommends $TRAVIS_APT_OPTS install mongodb-org-server g++-4.8
Reading package lists...
Building dependency tree...
Reading state information...
The following additional packages will be installed:
  cpp-4.8 gcc-4.8 gcc-4.8-base gcc-8-base libasan0 libatomic1 libgcc-4.8-dev
  libgomp1 libisl15 libitm1 libmpfr4 libquadmath0 libstdc++-4.8-dev libstdc++6
  libtsan0
Suggested packages:
  gcc-4.8-locales g++-4.8-multilib gcc-4.8-doc libstdc++6-4.8-dbg
  gcc-4.8-multilib libgcc1-dbg libgomp1-dbg libitm1-dbg libatomic1-dbg
  libasan0-dbg libtsan0-dbg libquadmath0-dbg libstdc++-4.8-doc
The following NEW packages will be installed:
  gcc-8-base libisl15
The following packages will be upgraded:
  cpp-4.8 g++-4.8 gcc-4.8 gcc-4.8-base libasan0 libatomic1 libgcc-4.8-dev
  libgomp1 libitm1 libmpfr4 libquadmath0 libstdc++-4.8-dev libstdc++6 libtsan0
  mongodb-org-server
15 upgraded, 2 newly installed, 0 to remove and 220 not upgraded.
Need to get 46.5 MB of archives.
After this operation, 3,124 kB of additional disk space will be used.
Get:1 http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4/multiverse amd64 mongodb-org-server amd64 3.4.16 [14.3 MB]
Get:2 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 gcc-8-base amd64 8.1.0-5ubuntu1~14.04 [18.3 kB]
Get:3 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libstdc++6 amd64 8.1.0-5ubuntu1~14.04 [310 kB]
Get:4 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libatomic1 amd64 8.1.0-5ubuntu1~14.04 [9,082 B]
Get:5 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libitm1 amd64 8.1.0-5ubuntu1~14.04 [27.9 kB]
Get:6 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libgomp1 amd64 8.1.0-5ubuntu1~14.04 [75.9 kB]
Get:7 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libisl15 amd64 0.15-3~14.04 [507 kB]
Get:8 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libmpfr4 amd64 3.1.3-1~14.04 [178 kB]
Get:9 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 g++-4.8 amd64 4.8.5-4ubuntu8~14.04.2 [18.2 MB]
Get:10 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 gcc-4.8 amd64 4.8.5-4ubuntu8~14.04.2 [5,061 kB]
Get:11 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 cpp-4.8 amd64 4.8.5-4ubuntu8~14.04.2 [4,602 kB]
Get:12 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libstdc++-4.8-dev amd64 4.8.5-4ubuntu8~14.04.2 [1,053 kB]
Get:13 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libtsan0 amd64 8.1.0-5ubuntu1~14.04 [284 kB]
Get:14 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libquadmath0 amd64 8.1.0-5ubuntu1~14.04 [133 kB]
Get:15 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libgcc-4.8-dev amd64 4.8.5-4ubuntu8~14.04.2 [1,688 kB]
Get:16 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 libasan0 amd64 4.8.5-4ubuntu8~14.04.2 [63.1 kB]
Get:17 http://ppa.launchpad.net/ubuntu-toolchain-r/test/ubuntu trusty/main amd64 gcc-4.8-base amd64 4.8.5-4ubuntu8~14.04.2 [15.7 kB]
Fetched 46.5 MB in 1min 21s (568 kB/s)
Selecting previously unselected package gcc-8-base:amd64.
(Reading database ... 72205 files and directories currently installed.)
Preparing to unpack .../gcc-8-base_8.1.0-5ubuntu1~14.04_amd64.deb ...
Unpacking gcc-8-base:amd64 (8.1.0-5ubuntu1~14.04) ...
Processing triggers for ccache (3.1.9-1) ...
Updating symlinks in /usr/lib/ccache ...
Setting up gcc-8-base:amd64 (8.1.0-5ubuntu1~14.04) ...
(Reading database ... 72211 files and directories currently installed.)
Preparing to unpack .../libstdc++6_8.1.0-5ubuntu1~14.04_amd64.deb ...
Unpacking libstdc++6:amd64 (8.1.0-5ubuntu1~14.04) over (4.8.4-2ubuntu1~14.04.3) ...
Setting up libstdc++6:amd64 (8.1.0-5ubuntu1~14.04) ...
Processing triggers for libc-bin (2.19-0ubuntu6.13) ...
(Reading database ... 72212 files and directories currently installed.)
Preparing to unpack .../libatomic1_8.1.0-5ubuntu1~14.04_amd64.deb ...
Unpacking libatomic1:amd64 (8.1.0-5ubuntu1~14.04) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../libitm1_8.1.0-5ubuntu1~14.04_amd64.deb ...
Unpacking libitm1:amd64 (8.1.0-5ubuntu1~14.04) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../libgomp1_8.1.0-5ubuntu1~14.04_amd64.deb ...
Unpacking libgomp1:amd64 (8.1.0-5ubuntu1~14.04) over (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package libisl15:amd64.
Preparing to unpack .../libisl15_0.15-3~14.04_amd64.deb ...
Unpacking libisl15:amd64 (0.15-3~14.04) ...
Preparing to unpack .../libmpfr4_3.1.3-1~14.04_amd64.deb ...
Unpacking libmpfr4:amd64 (3.1.3-1~14.04) over (3.1.2-1) ...
Preparing to unpack .../g++-4.8_4.8.5-4ubuntu8~14.04.2_amd64.deb ...
Unpacking g++-4.8 (4.8.5-4ubuntu8~14.04.2) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../gcc-4.8_4.8.5-4ubuntu8~14.04.2_amd64.deb ...
Unpacking gcc-4.8 (4.8.5-4ubuntu8~14.04.2) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../cpp-4.8_4.8.5-4ubuntu8~14.04.2_amd64.deb ...
Unpacking cpp-4.8 (4.8.5-4ubuntu8~14.04.2) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../libstdc++-4.8-dev_4.8.5-4ubuntu8~14.04.2_amd64.deb ...
Unpacking libstdc++-4.8-dev:amd64 (4.8.5-4ubuntu8~14.04.2) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../libtsan0_8.1.0-5ubuntu1~14.04_amd64.deb ...
Unpacking libtsan0:amd64 (8.1.0-5ubuntu1~14.04) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../libquadmath0_8.1.0-5ubuntu1~14.04_amd64.deb ...
Unpacking libquadmath0:amd64 (8.1.0-5ubuntu1~14.04) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../libgcc-4.8-dev_4.8.5-4ubuntu8~14.04.2_amd64.deb ...
Unpacking libgcc-4.8-dev:amd64 (4.8.5-4ubuntu8~14.04.2) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../libasan0_4.8.5-4ubuntu8~14.04.2_amd64.deb ...
Unpacking libasan0:amd64 (4.8.5-4ubuntu8~14.04.2) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../gcc-4.8-base_4.8.5-4ubuntu8~14.04.2_amd64.deb ...
Unpacking gcc-4.8-base:amd64 (4.8.5-4ubuntu8~14.04.2) over (4.8.4-2ubuntu1~14.04.3) ...
Preparing to unpack .../mongodb-org-server_3.4.16_amd64.deb ...
runlevel:/var/run/utmp: No such file or directory
Unpacking mongodb-org-server (3.4.16) over (3.4.10) ...
Processing triggers for man-db (2.6.7.1-1ubuntu1) ...
Processing triggers for ccache (3.1.9-1) ...
Updating symlinks in /usr/lib/ccache ...
Processing triggers for ureadahead (0.100.0-16) ...
Setting up libatomic1:amd64 (8.1.0-5ubuntu1~14.04) ...
Setting up libitm1:amd64 (8.1.0-5ubuntu1~14.04) ...
Setting up libgomp1:amd64 (8.1.0-5ubuntu1~14.04) ...
Setting up libisl15:amd64 (0.15-3~14.04) ...
Setting up libmpfr4:amd64 (3.1.3-1~14.04) ...
Setting up gcc-4.8-base:amd64 (4.8.5-4ubuntu8~14.04.2) ...
Setting up cpp-4.8 (4.8.5-4ubuntu8~14.04.2) ...
Setting up libasan0:amd64 (4.8.5-4ubuntu8~14.04.2) ...
Setting up libtsan0:amd64 (8.1.0-5ubuntu1~14.04) ...
Setting up libquadmath0:amd64 (8.1.0-5ubuntu1~14.04) ...
Setting up libgcc-4.8-dev:amd64 (4.8.5-4ubuntu8~14.04.2) ...
Setting up gcc-4.8 (4.8.5-4ubuntu8~14.04.2) ...
Setting up libstdc++-4.8-dev:amd64 (4.8.5-4ubuntu8~14.04.2) ...
Setting up g++-4.8 (4.8.5-4ubuntu8~14.04.2) ...
Setting up mongodb-org-server (3.4.16) ...
Configuration file '/etc/init/mongod.conf'
 ==> Modified (by you or by a script) since installation.
 ==> Package distributor has shipped an updated version.
 ==> Keeping old config file as default.
runlevel:/var/run/utmp: No such file or directory
Processing triggers for libc-bin (2.19-0ubuntu6.13) ...
Processing triggers for ureadahead (0.100.0-16) ...
services
0.07s$ sudo service mongod start
mongod start/running, process 3283
install_firefox
$ export FIREFOX_SOURCE_URL='https://download.mozilla.org/?product=firefox-55.0&lang=en-US&os=linux64'
Installing Firefox 55.0
2.66s$ wget --no-verbose -O /tmp/firefox-55.0.tar.bz2 $FIREFOX_SOURCE_URL
2018-08-31 07:18:56 URL:https://download-installer.cdn.mozilla.net/pub/firefox/releases/55.0/linux-x86_64/en-US/firefox-55.0.tar.bz2 [51179760/51179760] -> "/tmp/firefox-55.0.tar.bz2" [1]
$ export PATH=$HOME/firefox-55.0/firefox:$PATH
$ firefox --version
Mozilla Firefox 55.0
git.checkout
4.93s$ git clone --depth=50 https://github.com/codecombat/codecombat.git codecombat/codecombat
Cloning into 'codecombat/codecombat'...
remote: Counting objects: 3932, done.
remote: Compressing objects: 100% (3116/3116), done.
remote: Total 3932 (delta 1053), reused 2357 (delta 770), pack-reused 0
Receiving objects: 100% (3932/3932), 91.01 MiB | 35.71 MiB/s, done.
Resolving deltas: 100% (1053/1053), done.
$ cd codecombat/codecombat
0.36s$ git fetch origin +refs/pull/4859/merge:
remote: Counting objects: 7, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 7 (delta 5), reused 6 (delta 5), pack-reused 0
Unpacking objects: 100% (7/7), done.
From https://github.com/codecombat/codecombat
 * branch            refs/pull/4859/merge -> FETCH_HEAD
$ git checkout -qf FETCH_HEAD
Setting environment variables from .travis.yml
$ export CXX=g++-4.8
$ export PATH=./node_modules/.bin:$PATH
Updating nvm
nvm.install
2.80s$ nvm install 6.12.2
Downloading and installing node v6.12.2...
Downloading https://nodejs.org/dist/v6.12.2/node-v6.12.2-linux-x64.tar.xz...
Computing checksum with sha256sum
Checksums matched!
Now using node v6.12.2 (npm v3.10.10)
cache.1
Setting up build cache
$ export CASHER_DIR=$HOME/.casher
0.05s$ Installing caching utilities
0.00s
7.69sattempting to download cache archive
fetching PR.4859/cache-linux-trusty-fb0a0396fe0487e4eca9a0ba43d3ff58801086c9b57020e080cda1228f0fd9a2--node-6.12.2.tgz
fetching PR.4859/cache--node-6.12.2.tgz
fetching master/cache-linux-trusty-fb0a0396fe0487e4eca9a0ba43d3ff58801086c9b57020e080cda1228f0fd9a2--node-6.12.2.tgz
found cache
0.00s
17.51sadding /home/travis/build/codecombat/codecombat/node_modules to cache
creating directory /home/travis/build/codecombat/codecombat/node_modules
adding /home/travis/build/codecombat/codecombat/bower_components to cache
creating directory /home/travis/build/codecombat/codecombat/bower_components
$ node --version
v6.12.2
$ npm --version
3.10.10
$ nvm --version
0.33.11
before_install.1
0.00s$ export COCO_TRAVIS_TEST=1
before_install.2
11.58s$ npm install -g npm@3.x
/home/travis/.nvm/versions/node/v6.12.2/bin/npm -> /home/travis/.nvm/versions/node/v6.12.2/lib/node_modules/npm/bin/npm-cli.js
/home/travis/.nvm/versions/node/v6.12.2/lib
└── npm@3.10.10
315.44s$ npm install
> codecombat@1.0.0 postinstall /home/travis/build/codecombat/codecombat
> bower install && webpack
(node:5284) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
Automatically using Karma webpack config
Starting Webpack...
(node:5294) DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
Compiled static file: about.static.pug
Compiled static file: home.static.pug
Compiled static file: layout.static.pug
Compiled static file: legal.static.pug
Compiled static file: main.static.pug
Compiled static file: mock.static.pug
Compiled static file: overworld.static.pug
Compiled static file: premium-features.static.pug
Compiled static file: privacy.static.pug
Hash: 97cd7baac21b8fbe7729
Version: webpack 3.12.0
Time: 83308ms
                                                                     Asset       Size  Chunks                    Chunk Names
                                          javascripts/ace/snippets/swig.js  131 bytes          [emitted]
                                        javascripts/chunks/admin.bundle.js     730 kB       0  [emitted]  [big]  admin
                                     javascripts/chunks/artisans.bundle.js     203 kB       2  [emitted]         artisans
                                     javascripts/chunks/teachers.bundle.js     277 kB       3  [emitted]  [big]  teachers
                                      javascripts/chunks/courses.bundle.js     175 kB       4  [emitted]         courses
                                         javascripts/chunks/i18n.bundle.js    64.6 kB       5  [emitted]         i18n
                                      javascripts/chunks/account.bundle.js     140 kB       6  [emitted]         account
                                   javascripts/chunks/contribute.bundle.js      96 kB       7  [emitted]         contribute
                                         javascripts/chunks/play.bundle.js    1.47 MB       8  [emitted]  [big]  play
                                         javascripts/chunks/user.bundle.js    80.3 kB       9  [emitted]         user
                                       javascripts/chunks/ladder.bundle.js     672 kB      10  [emitted]  [big]  ladder
                                        javascripts/chunks/clans.bundle.js     118 kB      11  [emitted]         clans
                           javascripts/chunks/locale/zh-WUU-HANT.bundle.js      14 kB      12  [emitted]         locale/zh-WUU-HANT
                           javascripts/chunks/locale/zh-WUU-HANS.bundle.js  695 bytes      13  [emitted]         locale/zh-WUU-HANS
                               javascripts/chunks/locale/zh-HANT.bundle.js    72.1 kB      14  [emitted]         locale/zh-HANT
                               javascripts/chunks/locale/zh-HANS.bundle.js  626 bytes      15  [emitted]         locale/zh-HANS
                                    javascripts/chunks/locale/vi.bundle.js    71.3 kB      16  [emitted]         locale/vi
                                    javascripts/chunks/locale/uz.bundle.js  658 bytes      17  [emitted]         locale/uz
                                    javascripts/chunks/locale/ur.bundle.js  699 bytes      18  [emitted]         locale/ur
                                    javascripts/chunks/locale/uk.bundle.js     121 kB      19  [emitted]         locale/uk
                                    javascripts/chunks/locale/tr.bundle.js    35.2 kB      20  [emitted]         locale/tr
                                    javascripts/chunks/locale/th.bundle.js    6.26 kB      21  [emitted]         locale/th
                                    javascripts/chunks/locale/sv.bundle.js    44.2 kB      22  [emitted]         locale/sv
                                    javascripts/chunks/locale/sr.bundle.js     148 kB      23  [emitted]         locale/sr
                                    javascripts/chunks/locale/sl.bundle.js    1.61 kB      24  [emitted]         locale/sl
                                    javascripts/chunks/locale/sk.bundle.js      66 kB      25  [emitted]         locale/sk
                                    javascripts/chunks/locale/ru.bundle.js     131 kB      26  [emitted]         locale/ru
                                    javascripts/chunks/locale/ro.bundle.js    53.5 kB      27  [emitted]         locale/ro
                                 javascripts/chunks/locale/pt-PT.bundle.js      91 kB      28  [emitted]         locale/pt-PT
                                 javascripts/chunks/locale/pt-BR.bundle.js     154 kB      29  [emitted]         locale/pt-BR
                                    javascripts/chunks/locale/pl.bundle.js     121 kB      30  [emitted]         locale/pl
                                    javascripts/chunks/locale/nn.bundle.js  763 bytes      31  [emitted]         locale/nn
                                    javascripts/chunks/locale/nl.bundle.js     134 kB      32  [emitted]         locale/nl
                                 javascripts/chunks/locale/nl-NL.bundle.js    8.75 kB      33  [emitted]         locale/nl-NL
                                 javascripts/chunks/locale/nl-BE.bundle.js      16 kB      34  [emitted]         locale/nl-BE
                                    javascripts/chunks/locale/nb.bundle.js    58.4 kB      35  [emitted]         locale/nb
                                    javascripts/chunks/locale/my.bundle.js  714 bytes      36  [emitted]         locale/my
                                    javascripts/chunks/locale/ms.bundle.js    5.25 kB      37  [emitted]         locale/ms
                                    javascripts/chunks/locale/mn.bundle.js  244 bytes      38  [emitted]         locale/mn
                                 javascripts/chunks/locale/mk-MK.bundle.js    19.1 kB      39  [emitted]         locale/mk-MK
                                    javascripts/chunks/locale/mi.bundle.js  661 bytes      40  [emitted]         locale/mi
                                    javascripts/chunks/locale/lt.bundle.js    30.4 kB      41  [emitted]         locale/lt
                                    javascripts/chunks/locale/ko.bundle.js    29.1 kB      42  [emitted]         locale/ko
                                    javascripts/chunks/locale/kk.bundle.js  242 bytes      43  [emitted]         locale/kk
                                    javascripts/chunks/locale/ja.bundle.js    37.3 kB      44  [emitted]         locale/ja
                                    javascripts/chunks/locale/it.bundle.js    76.3 kB      45  [emitted]         locale/it
                                    javascripts/chunks/locale/id.bundle.js     109 kB      46  [emitted]         locale/id
                                    javascripts/chunks/locale/hu.bundle.js     102 kB      47  [emitted]         locale/hu
                                    javascripts/chunks/locale/hr.bundle.js  678 bytes      48  [emitted]         locale/hr
                                    javascripts/chunks/locale/hi.bundle.js    1.32 kB      49  [emitted]         locale/hi
                                    javascripts/chunks/locale/he.bundle.js     118 kB      50  [emitted]         locale/he
                                   javascripts/chunks/locale/haw.bundle.js  678 bytes      51  [emitted]         locale/haw
                                    javascripts/chunks/locale/gl.bundle.js    36.8 kB      52  [emitted]         locale/gl
                                    javascripts/chunks/locale/fr.bundle.js     116 kB      53  [emitted]         locale/fr
                                   javascripts/chunks/locale/fil.bundle.js    12.2 kB      54  [emitted]         locale/fil
                                    javascripts/chunks/locale/fi.bundle.js    45.7 kB      55  [emitted]         locale/fi
                                    javascripts/chunks/locale/fa.bundle.js    3.13 kB      56  [emitted]         locale/fa
                                    javascripts/chunks/locale/et.bundle.js  669 bytes      57  [emitted]         locale/et
                                 javascripts/chunks/locale/es-ES.bundle.js    70.7 kB      58  [emitted]         locale/es-ES
                                javascripts/chunks/locale/es-419.bundle.js     103 kB      59  [emitted]         locale/es-419
                                    javascripts/chunks/locale/eo.bundle.js    1.33 kB      60  [emitted]         locale/eo
                                 javascripts/chunks/locale/en-GB.bundle.js    1.81 kB      61  [emitted]         locale/en-GB
                                    javascripts/chunks/locale/el.bundle.js     163 kB      62  [emitted]         locale/el
                                 javascripts/chunks/locale/de-DE.bundle.js     143 kB      63  [emitted]         locale/de-DE
                                 javascripts/chunks/locale/de-CH.bundle.js    20.5 kB      64  [emitted]         locale/de-CH
                                 javascripts/chunks/locale/de-AT.bundle.js    36.5 kB      65  [emitted]         locale/de-AT
                                    javascripts/chunks/locale/da.bundle.js    75.2 kB      66  [emitted]         locale/da
                                    javascripts/chunks/locale/cs.bundle.js    55.8 kB      67  [emitted]         locale/cs
                                    javascripts/chunks/locale/ca.bundle.js    34.5 kB      68  [emitted]         locale/ca
                                    javascripts/chunks/locale/bg.bundle.js    25.2 kB      69  [emitted]         locale/bg
                                    javascripts/chunks/locale/az.bundle.js    1.09 kB      70  [emitted]         locale/az
                                    javascripts/chunks/locale/ar.bundle.js    11.1 kB      71  [emitted]         locale/ar
                                  javascripts/chunks/ParentsView.bundle.js    38.8 kB      72  [emitted]         ParentsView
                                 javascripts/chunks/LicensorView.bundle.js    61.3 kB      73  [emitted]         LicensorView
                             javascripts/chunks/CertificatesView.bundle.js    22.5 kB      74  [emitted]         CertificatesView
                                  javascripts/chunks/PrivacyView.bundle.js    47.5 kB      75  [emitted]         PrivacyView
                          javascripts/chunks/PremiumFeaturesView.bundle.js    19.5 kB      76  [emitted]         PremiumFeaturesView
                                 javascripts/chunks/NotFoundView.bundle.js    9.58 kB      77  [emitted]         NotFoundView
                                    javascripts/chunks/LegalView.bundle.js    13.5 kB      78  [emitted]         LegalView
                                     javascripts/chunks/HomeView.bundle.js      54 kB      79  [emitted]         HomeView
                                javascripts/chunks/CommunityView.bundle.js    14.9 kB      80  [emitted]         CommunityView
                                      javascripts/chunks/CLAView.bundle.js    13.1 kB      81  [emitted]         CLAView
                                    javascripts/chunks/AboutView.bundle.js    46.1 kB      82  [emitted]         AboutView
                     javascripts/chunks/RestrictedToTeachersView.bundle.js    11.1 kB      83  [emitted]         RestrictedToTeachersView
                     javascripts/chunks/RestrictedToStudentsView.bundle.js      11 kB      84  [emitted]         RestrictedToStudentsView
                                        javascripts/chunks/vimeo.bundle.js      55 kB      85  [emitted]         vimeo
                                                       javascripts/test.js    16.8 MB      86  [emitted]  [big]  test
                                                      stylesheets/test.css     469 kB      86  [emitted]  [big]  test
                             javascripts/app/vendor/aether-coffeescript.js    1.07 MB          [emitted]  [big]
                               javascripts/app/vendor/aether-javascript.js     666 kB          [emitted]  [big]
                                      javascripts/app/vendor/aether-lua.js     249 kB          [emitted]
                                     javascripts/app/vendor/aether-java.js     154 kB          [emitted]
                                   javascripts/app/vendor/aether-python.js     366 kB          [emitted]  [big]
                                     javascripts/app/vendor/aether-html.js     277 kB          [emitted]  [big]
                                                      javascripts/esper.js     958 kB          [emitted]  [big]
                                               javascripts/esper.modern.js     512 kB          [emitted]  [big]
                                                    javascripts/ace/ace.js     373 kB          [emitted]  [big]
                                           javascripts/ace/ext-beautify.js    3.82 kB          [emitted]
                                          javascripts/ace/ext-chromevox.js    6.36 kB          [emitted]
                              javascripts/ace/ext-elastic_tabstops_lite.js    3.84 kB          [emitted]
                                              javascripts/ace/ext-emmet.js    21.5 kB          [emitted]
                                       javascripts/ace/ext-error_marker.js  140 bytes          [emitted]
                                    javascripts/ace/ext-keybinding_menu.js    3.64 kB          [emitted]
                                     javascripts/ace/ext-language_tools.js    34.6 kB          [emitted]
                                            javascripts/ace/ext-linking.js    1.03 kB          [emitted]
                                           javascripts/ace/ext-modelist.js    3.97 kB          [emitted]
                                             javascripts/ace/ext-old_ie.js    11.9 kB          [emitted]
                                          javascripts/ace/ext-searchbox.js    11.7 kB          [emitted]
                                      javascripts/ace/ext-settings_menu.js    12.6 kB          [emitted]
                                         javascripts/ace/ext-spellcheck.js    1.44 kB          [emitted]
                                              javascripts/ace/ext-split.js    4.19 kB          [emitted]
                                   javascripts/ace/ext-static_highlight.js    2.82 kB          [emitted]
                                          javascripts/ace/ext-statusbar.js    1.09 kB          [emitted]
                                           javascripts/ace/ext-textarea.js    9.13 kB          [emitted]
                                          javascripts/ace/ext-themelist.js     1.5 kB          [emitted]
                                         javascripts/ace/ext-whitespace.js    2.89 kB          [emitted]
                                       javascripts/ace/keybinding-emacs.js    24.5 kB          [emitted]
                                         javascripts/ace/keybinding-vim.js    97.1 kB          [emitted]
                                              javascripts/ace/mode-abap.js    5.81 kB          [emitted]
                                               javascripts/ace/mode-abc.js    4.72 kB          [emitted]
                                      javascripts/ace/mode-actionscript.js    20.6 kB          [emitted]
                                               javascripts/ace/mode-ada.js    1.76 kB          [emitted]
                                       javascripts/ace/mode-apache_conf.js    13.9 kB          [emitted]
                                       javascripts/ace/mode-applescript.js    5.41 kB          [emitted]
                                          javascripts/ace/mode-asciidoc.js    8.16 kB          [emitted]
                                      javascripts/ace/mode-assembly_x86.js     8.9 kB          [emitted]
                                        javascripts/ace/mode-autohotkey.js    63.6 kB          [emitted]
                                         javascripts/ace/mode-batchfile.js    4.87 kB          [emitted]
                                               javascripts/ace/mode-bro.js    6.22 kB          [emitted]
                                             javascripts/ace/mode-c_cpp.js    11.1 kB          [emitted]
                                          javascripts/ace/mode-c9search.js    4.09 kB          [emitted]
                                             javascripts/ace/mode-cirru.js       3 kB          [emitted]
                                           javascripts/ace/mode-clojure.js    8.03 kB          [emitted]
                                             javascripts/ace/mode-cobol.js    2.31 kB          [emitted]
                                            javascripts/ace/mode-coffee.js    7.42 kB          [emitted]
                                        javascripts/ace/mode-coldfusion.js    62.6 kB          [emitted]
                                            javascripts/ace/mode-csharp.js    8.85 kB          [emitted]
                                   javascripts/ace/mode-csound_document.js    68.1 kB          [emitted]
                                  javascripts/ace/mode-csound_orchestra.js    36.9 kB          [emitted]
                                      javascripts/ace/mode-csound_score.js    7.47 kB          [emitted]
                                               javascripts/ace/mode-css.js    20.1 kB          [emitted]
                                             javascripts/ace/mode-curly.js    61.1 kB          [emitted]
                                                 javascripts/ace/mode-d.js    8.96 kB          [emitted]
                                              javascripts/ace/mode-dart.js    14.4 kB          [emitted]
                                              javascripts/ace/mode-diff.js    2.41 kB          [emitted]
                                            javascripts/ace/mode-django.js    61.4 kB          [emitted]
                                        javascripts/ace/mode-dockerfile.js    8.24 kB          [emitted]
                                               javascripts/ace/mode-dot.js    7.58 kB          [emitted]
                                            javascripts/ace/mode-drools.js    10.8 kB          [emitted]
                                            javascripts/ace/mode-eiffel.js    2.84 kB          [emitted]
                                               javascripts/ace/mode-ejs.js    70.7 kB          [emitted]
                                            javascripts/ace/mode-elixir.js    15.8 kB          [emitted]
                                               javascripts/ace/mode-elm.js    4.94 kB          [emitted]
                                            javascripts/ace/mode-erlang.js    29.7 kB          [emitted]
                                             javascripts/ace/mode-forth.js       7 kB          [emitted]
                                           javascripts/ace/mode-fortran.js    8.44 kB          [emitted]
                                               javascripts/ace/mode-ftl.js    32.5 kB          [emitted]
                                             javascripts/ace/mode-gcode.js    1.46 kB          [emitted]
                                           javascripts/ace/mode-gherkin.js    2.38 kB          [emitted]
                                         javascripts/ace/mode-gitignore.js  899 bytes          [emitted]
                                              javascripts/ace/mode-glsl.js    13.2 kB          [emitted]
                                         javascripts/ace/mode-gobstones.js    20.5 kB          [emitted]
                                            javascripts/ace/mode-golang.js    6.92 kB          [emitted]
                                     javascripts/ace/mode-graphqlschema.js    3.44 kB          [emitted]
                                            javascripts/ace/mode-groovy.js    22.6 kB          [emitted]
                                              javascripts/ace/mode-haml.js    39.4 kB          [emitted]
                                        javascripts/ace/mode-handlebars.js    61.9 kB          [emitted]
                                     javascripts/ace/mode-haskell_cabal.js    2.28 kB          [emitted]
                                           javascripts/ace/mode-haskell.js    11.5 kB          [emitted]
                                              javascripts/ace/mode-haxe.js    6.54 kB          [emitted]
                                             javascripts/ace/mode-hjson.js    5.98 kB          [emitted]
                                       javascripts/ace/mode-html_elixir.js    77.3 kB          [emitted]
                                         javascripts/ace/mode-html_ruby.js      71 kB          [emitted]
                                              javascripts/ace/mode-html.js    60.1 kB          [emitted]
                                               javascripts/ace/mode-ini.js    2.71 kB          [emitted]
                                                javascripts/ace/mode-io.js    5.67 kB          [emitted]
                                              javascripts/ace/mode-jack.js    5.77 kB          [emitted]
                                              javascripts/ace/mode-jade.js    53.3 kB          [emitted]
                                              javascripts/ace/mode-java.js    21.9 kB          [emitted]
                                        javascripts/ace/mode-javascript.js    18.2 kB          [emitted]
                                              javascripts/ace/mode-json.js    5.18 kB          [emitted]
                                            javascripts/ace/mode-jsoniq.js     233 kB          [emitted]
                                               javascripts/ace/mode-jsp.js    36.6 kB          [emitted]
                                              javascripts/ace/mode-jssm.js     5.9 kB          [emitted]
                                               javascripts/ace/mode-jsx.js    6.97 kB          [emitted]
                                             javascripts/ace/mode-julia.js    7.55 kB          [emitted]
                                            javascripts/ace/mode-kotlin.js    11.8 kB          [emitted]
                                             javascripts/ace/mode-latex.js    5.04 kB          [emitted]
                                              javascripts/ace/mode-lean.js    5.58 kB          [emitted]
                                              javascripts/ace/mode-less.js    22.2 kB          [emitted]
                                            javascripts/ace/mode-liquid.js    32.2 kB          [emitted]
                                              javascripts/ace/mode-lisp.js    1.96 kB          [emitted]
                                       javascripts/ace/mode-live_script.js      20 kB          [emitted]
                                        javascripts/ace/mode-livescript.js    4.98 kB          [emitted]
                                            javascripts/ace/mode-logiql.js    5.71 kB          [emitted]
                                               javascripts/ace/mode-lsl.js    26.6 kB          [emitted]
                                               javascripts/ace/mode-lua.js    7.29 kB          [emitted]
                                           javascripts/ace/mode-luapage.js    68.5 kB          [emitted]
                                            javascripts/ace/mode-lucene.js    1.17 kB          [emitted]
                                          javascripts/ace/mode-makefile.js    6.56 kB          [emitted]
                                          javascripts/ace/mode-markdown.js      67 kB          [emitted]
                                              javascripts/ace/mode-mask.js    42.3 kB          [emitted]
                                            javascripts/ace/mode-matlab.js    20.6 kB          [emitted]
                                              javascripts/ace/mode-maze.js    4.89 kB          [emitted]
                                               javascripts/ace/mode-mel.js    24.9 kB          [emitted]
                                    javascripts/ace/mode-mips_assembler.js    5.96 kB          [emitted]
                                     javascripts/ace/mode-mipsassembler.js    3.19 kB          [emitted]
                                          javascripts/ace/mode-mushcode.js    6.71 kB          [emitted]
                                             javascripts/ace/mode-mysql.js    6.52 kB          [emitted]
                                               javascripts/ace/mode-nix.js    13.3 kB          [emitted]
                                              javascripts/ace/mode-nsis.js    10.1 kB          [emitted]
                                        javascripts/ace/mode-objectivec.js    54.7 kB          [emitted]
                                             javascripts/ace/mode-ocaml.js    15.6 kB          [emitted]
                                            javascripts/ace/mode-pascal.js    4.56 kB          [emitted]
                                              javascripts/ace/mode-perl.js    7.39 kB          [emitted]
                                             javascripts/ace/mode-pgsql.js    56.1 kB          [emitted]
                                               javascripts/ace/mode-php.js     473 kB          [emitted]  [big]
                                               javascripts/ace/mode-pig.js    6.32 kB          [emitted]
                                        javascripts/ace/mode-plain_text.js  506 bytes          [emitted]
                                        javascripts/ace/mode-powershell.js    32.7 kB          [emitted]
                                             javascripts/ace/mode-praat.js    10.3 kB          [emitted]
                                            javascripts/ace/mode-prolog.js    8.38 kB          [emitted]
                                        javascripts/ace/mode-properties.js     1.1 kB          [emitted]
                                          javascripts/ace/mode-protobuf.js    12.8 kB          [emitted]
                                            javascripts/ace/mode-python.js    4.69 kB          [emitted]
                                                 javascripts/ace/mode-r.js       5 kB          [emitted]
                                             javascripts/ace/mode-razor.js    67.2 kB          [emitted]
                                              javascripts/ace/mode-rdoc.js    4.69 kB          [emitted]
                                               javascripts/ace/mode-red.js    12.6 kB          [emitted]
                                             javascripts/ace/mode-rhtml.js    65.1 kB          [emitted]
                                               javascripts/ace/mode-rst.js    3.02 kB          [emitted]
                                              javascripts/ace/mode-ruby.js    10.1 kB          [emitted]
                                              javascripts/ace/mode-rust.js    6.53 kB          [emitted]
                                              javascripts/ace/mode-sass.js    11.6 kB          [emitted]
                                              javascripts/ace/mode-scad.js    6.52 kB          [emitted]
                                             javascripts/ace/mode-scala.js    22.8 kB          [emitted]
                                            javascripts/ace/mode-scheme.js    3.66 kB          [emitted]
                                              javascripts/ace/mode-scss.js    14.3 kB          [emitted]
                                                javascripts/ace/mode-sh.js     7.2 kB          [emitted]
                                               javascripts/ace/mode-sjs.js    21.4 kB          [emitted]
                                            javascripts/ace/mode-smarty.js    63.5 kB          [emitted]
                                          javascripts/ace/mode-snippets.js    3.69 kB          [emitted]
                                      javascripts/ace/mode-soy_template.js    68.6 kB          [emitted]
                                             javascripts/ace/mode-space.js    2.24 kB          [emitted]
                                            javascripts/ace/mode-sparql.js    7.87 kB          [emitted]
                                               javascripts/ace/mode-sql.js    1.84 kB          [emitted]
                                         javascripts/ace/mode-sqlserver.js    16.4 kB          [emitted]
                                            javascripts/ace/mode-stylus.js    14.3 kB          [emitted]
                                               javascripts/ace/mode-svg.js    32.1 kB          [emitted]
                                             javascripts/ace/mode-swift.js    6.94 kB          [emitted]
                                              javascripts/ace/mode-swig.js    31.2 kB          [emitted]
                                               javascripts/ace/mode-tcl.js    6.13 kB          [emitted]
                                               javascripts/ace/mode-tex.js    2.76 kB          [emitted]
                                              javascripts/ace/mode-text.js    0 bytes          [emitted]
                                           javascripts/ace/mode-textile.js    2.09 kB          [emitted]
                                              javascripts/ace/mode-toml.js     2.2 kB          [emitted]
                                               javascripts/ace/mode-tsx.js    20.7 kB          [emitted]
                                            javascripts/ace/mode-turtle.js    5.03 kB          [emitted]
                                              javascripts/ace/mode-twig.js    63.7 kB          [emitted]
                                        javascripts/ace/mode-typescript.js    20.3 kB          [emitted]
                                              javascripts/ace/mode-vala.js    16.6 kB          [emitted]
                                          javascripts/ace/mode-vbscript.js    5.07 kB          [emitted]
                                          javascripts/ace/mode-velocity.js    64.8 kB          [emitted]
                                           javascripts/ace/mode-verilog.js    2.69 kB          [emitted]
                                              javascripts/ace/mode-vhdl.js    2.09 kB          [emitted]
                                            javascripts/ace/mode-wollok.js    20.4 kB          [emitted]
                                               javascripts/ace/mode-xml.js    11.8 kB          [emitted]
                                            javascripts/ace/mode-xquery.js     231 kB          [emitted]
                                              javascripts/ace/mode-yaml.js    4.36 kB          [emitted]
                                          javascripts/ace/snippets/abap.js  131 bytes          [emitted]
                                           javascripts/ace/snippets/abc.js  947 bytes          [emitted]
                                  javascripts/ace/snippets/actionscript.js    2.97 kB          [emitted]
                                           javascripts/ace/snippets/ada.js  129 bytes          [emitted]
                                   javascripts/ace/snippets/apache_conf.js  145 bytes          [emitted]
                                   javascripts/ace/snippets/applescript.js  145 bytes          [emitted]
                                      javascripts/ace/snippets/asciidoc.js  139 bytes          [emitted]
                                  javascripts/ace/snippets/assembly_x86.js  147 bytes          [emitted]
                                    javascripts/ace/snippets/autohotkey.js  143 bytes          [emitted]
                                     javascripts/ace/snippets/batchfile.js  141 bytes          [emitted]
                                           javascripts/ace/snippets/bro.js  126 bytes          [emitted]
                                         javascripts/ace/snippets/c_cpp.js    2.66 kB          [emitted]
                                      javascripts/ace/snippets/c9search.js  139 bytes          [emitted]
                                         javascripts/ace/snippets/cirru.js  133 bytes          [emitted]
                                       javascripts/ace/snippets/clojure.js    2.04 kB          [emitted]
                                         javascripts/ace/snippets/cobol.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/coffee.js    2.23 kB          [emitted]
                                    javascripts/ace/snippets/coldfusion.js  143 bytes          [emitted]
                                        javascripts/ace/snippets/csharp.js  135 bytes          [emitted]
                               javascripts/ace/snippets/csound_document.js  302 bytes          [emitted]
                              javascripts/ace/snippets/csound_orchestra.js    1.07 kB          [emitted]
                                  javascripts/ace/snippets/csound_score.js  147 bytes          [emitted]
                                           javascripts/ace/snippets/css.js    19.6 kB          [emitted]
                                         javascripts/ace/snippets/curly.js  133 bytes          [emitted]
                                             javascripts/ace/snippets/d.js  125 bytes          [emitted]
                                          javascripts/ace/snippets/dart.js    1.32 kB          [emitted]
                                          javascripts/ace/snippets/diff.js  551 bytes          [emitted]
                                                      apcsp-local/index.md   86 bytes          [emitted]
                                                   apcsp-local/nested/1.md   22 bytes          [emitted]
                                                              channel.html   59 bytes          [emitted]
                                                    dexecure-c167a5675c.js    2.27 kB          [emitted]
                        fonts/_ySUJH_bn48VBG8sNSi3USBnSvpkopQaUR-2r7iU.ttf     221 kB          [emitted]
                        fonts/702ZOKiLJc3WVjuplzC3USBnSvpkopQaUR-2r7iU.ttf     224 kB          [emitted]
                                                         fonts/cousine.css  776 bytes          [emitted]
                                          fonts/cousine/Apache License.txt    11.3 kB          [emitted]
                                            fonts/cousine/Cousine-Bold.ttf     297 kB          [emitted]  [big]
                                      fonts/cousine/Cousine-BoldItalic.ttf     273 kB          [emitted]  [big]
                                          fonts/cousine/Cousine-Italic.ttf     271 kB          [emitted]  [big]
                                         fonts/cousine/Cousine-Regular.ttf     309 kB          [emitted]  [big]
                        fonts/FxslNkTTHtojXrkp-xBEM87DM3yorPOrvA-vB930.ttf     265 kB          [emitted]  [big]
                                    fonts/glyphicons-halflings-regular.eot    20.3 kB          [emitted]
                                    fonts/glyphicons-halflings-regular.svg    62.9 kB          [emitted]
                                    fonts/glyphicons-halflings-regular.ttf    41.3 kB          [emitted]
                                   fonts/glyphicons-halflings-regular.woff    23.3 kB          [emitted]
                                                        fonts/openSans.css  430 bytes          [emitted]
                                               fonts/openSansCondensed.css  240 bytes          [emitted]
                      images/achievements/achievement_background_light.png     2.6 kB          [emitted]
                     images/achievements/achievement_background_locked.png    2.26 kB          [emitted]
                            images/achievements/achievement_background.png    2.65 kB          [emitted]
                                        images/achievements/bar_border.png     1.2 kB          [emitted]
                             images/achievements/border_diamond_locked.png    16.1 kB          [emitted]
                                    images/achievements/border_diamond.png    22.8 kB          [emitted]
                                images/achievements/border_gold_locked.png    6.28 kB          [emitted]
                                       images/achievements/border_gold.png    9.31 kB          [emitted]
                              images/achievements/border_silver_locked.png    5.96 kB          [emitted]
                                     images/achievements/border_silver.png    8.65 kB          [emitted]
                               images/achievements/border_stone_locked.png    5.35 kB          [emitted]
                                      images/achievements/border_stone.png    7.38 kB          [emitted]
                                images/achievements/border_wood_locked.png    7.39 kB          [emitted]
                                       images/achievements/border_wood.png    11.4 kB          [emitted]
                                          images/achievements/cross-01.png    4.64 kB          [emitted]
                                            images/achievements/cup-01.png    4.02 kB          [emitted]
                                            images/achievements/cup-02.png    7.35 kB          [emitted]
                                           images/achievements/default.png    9.04 kB          [emitted]
                                          images/achievements/level-bg.png    1.19 kB          [emitted]
                                        images/achievements/message-01.png  619 bytes          [emitted]
                                          images/achievements/patch-01.png    4.32 kB          [emitted]
                                        images/achievements/pendant-01.png    5.98 kB          [emitted]
                                         images/achievements/scroll-01.png    5.13 kB          [emitted]
                                              images/achievements/star.png    8.19 kB          [emitted]
                                         images/achievements/swords-01.png    4.73 kB          [emitted]
                                      images/Adobe_PDF_file_icon_32x32.png  917 bytes          [emitted]
                         images/common/button-background-active-border.png    17.4 kB          [emitted]
                                images/common/button-background-active.png     2.4 kB          [emitted]
                  images/common/button-background-danger-active-border.png  705 bytes          [emitted]
                         images/common/button-background-danger-active.png  811 bytes          [emitted]
                images/common/button-background-danger-disabled-border.png  704 bytes          [emitted]
                       images/common/button-background-danger-disabled.png  811 bytes          [emitted]
                 images/common/button-background-danger-pressed-border.png  705 bytes          [emitted]
                        images/common/button-background-danger-pressed.png  810 bytes          [emitted]
                       images/common/button-background-disabled-border.png      17 kB          [emitted]
                              images/common/button-background-disabled.png    1.47 kB          [emitted]
                        images/common/button-background-pressed-border.png    17.3 kB          [emitted]
                               images/common/button-background-pressed.png    2.53 kB          [emitted]
                 images/common/button-background-primary-active-border.png  704 bytes          [emitted]
                        images/common/button-background-primary-active.png  810 bytes          [emitted]
               images/common/button-background-primary-disabled-border.png  704 bytes          [emitted]
                      images/common/button-background-primary-disabled.png  811 bytes          [emitted]
                images/common/button-background-primary-pressed-border.png  704 bytes          [emitted]
                       images/common/button-background-primary-pressed.png  811 bytes          [emitted]
                 images/common/button-background-success-active-border.png  704 bytes          [emitted]
                        images/common/button-background-success-active.png  811 bytes          [emitted]
               images/common/button-background-success-inactive-border.png  705 bytes          [emitted]
                      images/common/button-background-success-inactive.png  811 bytes          [emitted]
                images/common/button-background-success-pressed-border.png  704 bytes          [emitted]
                       images/common/button-background-success-pressed.png  811 bytes          [emitted]
                 images/common/button-background-warning-active-border.png  705 bytes          [emitted]
                        images/common/button-background-warning-active.png  811 bytes          [emitted]
               images/common/button-background-warning-disabled-border.png  704 bytes          [emitted]
                      images/common/button-background-warning-disabled.png  811 bytes          [emitted]
                images/common/button-background-warning-pressed-border.png  703 bytes          [emitted]
                       images/common/button-background-warning-pressed.png  811 bytes          [emitted]
                                 images/common/button-create-new-class.png    3.37 kB          [emitted]
                                images/common/button-finish-signing-up.png    3.31 kB          [emitted]
                                      images/common/button-get-started.png    2.65 kB          [emitted]
                                 images/common/button-go-to-my-classes.png    3.53 kB          [emitted]
                                   images/common/code_languages/c_icon.png  227 bytes          [emitted]
                                  images/common/code_languages/c_small.png     2.9 kB          [emitted]
                             images/common/code_languages/clojure_icon.png  194 bytes          [emitted]
                            images/common/code_languages/clojure_small.png    3.87 kB          [emitted]
                        images/common/code_languages/coffeescript_icon.png  174 bytes          [emitted]
                       images/common/code_languages/coffeescript_small.png    3.34 kB          [emitted]
                                 images/common/code_languages/cpp_icon.png  231 bytes          [emitted]
                                images/common/code_languages/cpp_small.png    2.84 kB          [emitted]
                              images/common/code_languages/csharp_icon.png  217 bytes          [emitted]
                             images/common/code_languages/csharp_small.png     2.7 kB          [emitted]
                                  images/common/code_languages/go_icon.png  165 bytes          [emitted]
                                 images/common/code_languages/go_small.png    2.88 kB          [emitted]
                                  images/common/code_languages/io_icon.png  163 bytes          [emitted]
                                 images/common/code_languages/io_small.png    2.36 kB          [emitted]
                                images/common/code_languages/java_icon.png  197 bytes          [emitted]
                               images/common/code_languages/java_small.png    3.23 kB          [emitted]
                          images/common/code_languages/javascript_icon.png  157 bytes          [emitted]
                         images/common/code_languages/javascript_small.png    2.11 kB          [emitted]
                                 images/common/code_languages/lua_icon.png  132 bytes          [emitted]
                                images/common/code_languages/lua_small.png     2.9 kB          [emitted]
                                 images/common/code_languages/php_icon.png  218 bytes          [emitted]
                                        javascripts/ace/snippets/django.js       4 kB          [emitted]
                                    javascripts/ace/snippets/dockerfile.js  143 bytes          [emitted]
                                           javascripts/ace/snippets/dot.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/drools.js  370 bytes          [emitted]
                                        javascripts/ace/snippets/eiffel.js  135 bytes          [emitted]
                                           javascripts/ace/snippets/ejs.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/elixir.js  129 bytes          [emitted]
                                           javascripts/ace/snippets/elm.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/erlang.js    3.57 kB          [emitted]
                                         javascripts/ace/snippets/forth.js  133 bytes          [emitted]
                                       javascripts/ace/snippets/fortran.js  137 bytes          [emitted]
                                           javascripts/ace/snippets/ftl.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/gcode.js  133 bytes          [emitted]
                                       javascripts/ace/snippets/gherkin.js  137 bytes          [emitted]
                                     javascripts/ace/snippets/gitignore.js  141 bytes          [emitted]
                                          javascripts/ace/snippets/glsl.js  131 bytes          [emitted]
                                     javascripts/ace/snippets/gobstones.js  607 bytes          [emitted]
                                          javascripts/ace/snippets/haml.js  448 bytes          [emitted]
                                    javascripts/ace/snippets/handlebars.js  143 bytes          [emitted]
                                 javascripts/ace/snippets/haskell_cabal.js  149 bytes          [emitted]
                                       javascripts/ace/snippets/haskell.js    1.98 kB          [emitted]
                                          javascripts/ace/snippets/haxe.js  131 bytes          [emitted]
                                         javascripts/ace/snippets/hjson.js  128 bytes          [emitted]
                                   javascripts/ace/snippets/html_elixir.js  145 bytes          [emitted]
                                     javascripts/ace/snippets/html_ruby.js  141 bytes          [emitted]
                                          javascripts/ace/snippets/html.js    19.1 kB          [emitted]
                                           javascripts/ace/snippets/ini.js  129 bytes          [emitted]
                                            javascripts/ace/snippets/io.js    1.22 kB          [emitted]
                                          javascripts/ace/snippets/jack.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/jade.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/java.js    4.32 kB          [emitted]
                                    javascripts/ace/snippets/javascript.js    3.84 kB          [emitted]
                                          javascripts/ace/snippets/json.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/jsoniq.js    1.72 kB          [emitted]
                                           javascripts/ace/snippets/jsp.js    2.78 kB          [emitted]
                                          javascripts/ace/snippets/jssm.js  127 bytes          [emitted]
                                           javascripts/ace/snippets/jsx.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/julia.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/kotlin.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/latex.js  133 bytes          [emitted]
                                          javascripts/ace/snippets/lean.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/less.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/liquid.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/lisp.js  131 bytes          [emitted]
                                   javascripts/ace/snippets/live_script.js  134 bytes          [emitted]
                                    javascripts/ace/snippets/livescript.js  143 bytes          [emitted]
                                        javascripts/ace/snippets/logiql.js  135 bytes          [emitted]
                                           javascripts/ace/snippets/lsl.js    35.4 kB          [emitted]
                                           javascripts/ace/snippets/lua.js  508 bytes          [emitted]
                                       javascripts/ace/snippets/luapage.js  137 bytes          [emitted]
                                        javascripts/ace/snippets/lucene.js  135 bytes          [emitted]
                                      javascripts/ace/snippets/makefile.js  198 bytes          [emitted]
                                      javascripts/ace/snippets/markdown.js    1.97 kB          [emitted]
                                          javascripts/ace/snippets/mask.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/matlab.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/maze.js  270 bytes          [emitted]
                                           javascripts/ace/snippets/mel.js  129 bytes          [emitted]
                                javascripts/ace/snippets/mips_assembler.js  151 bytes          [emitted]
                                 javascripts/ace/snippets/mipsassembler.js  136 bytes          [emitted]
                                      javascripts/ace/snippets/mushcode.js  139 bytes          [emitted]
                                         javascripts/ace/snippets/mysql.js  133 bytes          [emitted]
                                           javascripts/ace/snippets/nix.js  129 bytes          [emitted]
                                          javascripts/ace/snippets/nsis.js  127 bytes          [emitted]
                                    javascripts/ace/snippets/objectivec.js  143 bytes          [emitted]
                                         javascripts/ace/snippets/ocaml.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/pascal.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/perl.js    5.51 kB          [emitted]
                                         javascripts/ace/snippets/pgsql.js  133 bytes          [emitted]
                                           javascripts/ace/snippets/php.js    6.76 kB          [emitted]
                                           javascripts/ace/snippets/pig.js  129 bytes          [emitted]
                                    javascripts/ace/snippets/plain_text.js  143 bytes          [emitted]
                                    javascripts/ace/snippets/powershell.js  143 bytes          [emitted]
                                         javascripts/ace/snippets/praat.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/prolog.js  135 bytes          [emitted]
                                    javascripts/ace/snippets/properties.js  143 bytes          [emitted]
                                      javascripts/ace/snippets/protobuf.js  132 bytes          [emitted]
                                        javascripts/ace/snippets/python.js    3.67 kB          [emitted]
                                             javascripts/ace/snippets/r.js    2.63 kB          [emitted]
                                         javascripts/ace/snippets/razor.js  164 bytes          [emitted]
                                          javascripts/ace/snippets/rdoc.js  131 bytes          [emitted]
                                           javascripts/ace/snippets/red.js  123 bytes          [emitted]
                                         javascripts/ace/snippets/rhtml.js  133 bytes          [emitted]
                                           javascripts/ace/snippets/rst.js  442 bytes          [emitted]
                                          javascripts/ace/snippets/ruby.js    21.3 kB          [emitted]
                                          javascripts/ace/snippets/rust.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/sass.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/scad.js  131 bytes          [emitted]
                                         javascripts/ace/snippets/scala.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/scheme.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/scss.js  131 bytes          [emitted]
                                            javascripts/ace/snippets/sh.js    2.05 kB          [emitted]
                                           javascripts/ace/snippets/sjs.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/smarty.js  135 bytes          [emitted]
                                      javascripts/ace/snippets/snippets.js  297 bytes          [emitted]
                                  javascripts/ace/snippets/soy_template.js  147 bytes          [emitted]
                                         javascripts/ace/snippets/space.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/sparql.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/groovy.js  135 bytes          [emitted]
                                 javascripts/ace/snippets/graphqlschema.js  662 bytes          [emitted]
                                        javascripts/ace/snippets/golang.js  135 bytes          [emitted]
                                images/common/code_languages/php_small.png    2.56 kB          [emitted]
                              images/common/code_languages/python_icon.png  188 bytes          [emitted]
                             images/common/code_languages/python_small.png    3.28 kB          [emitted]
                                images/common/code_languages/ruby_icon.png  254 bytes          [emitted]
                               images/common/code_languages/ruby_small.png    2.51 kB          [emitted]
                               images/common/code_languages/swift_icon.png  170 bytes          [emitted]
                              images/common/code_languages/swift_small.png    2.14 kB          [emitted]
                                images/common/codeplay/CodePlay_Lockup.png    90.9 kB          [emitted]
                                       images/common/codeplay/CodePlay.png    80.2 kB          [emitted]
        images/common/codeplay/DE_ChooseHeroPage_Ideapad710s_800x90_DE.png    65.2 kB          [emitted]
                images/common/codeplay/DE_InLevelPage_Y700_1132X283_DE.png    76.4 kB          [emitted]
               images/common/codeplay/DE_LevelsPage_MIIX510_160x480_DE.png    88.2 kB          [emitted]
                 images/common/codeplay/DE_VictoryPage_Y910_735x100_DE.png    58.5 kB          [emitted]
           images/common/codeplay/MX_ChooseHeroPage_YogaBook_800x90_MX.png    55.3 kB          [emitted]
                images/common/codeplay/MX_InLevelPage_Y700_1132X283_MX.png    89.7 kB          [emitted]
                   images/common/codeplay/MX_LevelsPage_910_160x480_MX.png    91.7 kB          [emitted]
             images/common/codeplay/MX_VictoryPage_YogaBook_735x100_MX.png    46.3 kB          [emitted]
               images/common/codeplay/NA_ChooseHeroPage_Yoga520_800x90.png    47.9 kB          [emitted]
     images/common/codeplay/NA_InLevelPage_Y700_1132X283_ingameProduct.png    65.6 kB          [emitted]
                     images/common/codeplay/NA_LevelsPage_Cube_160x480.png      67 kB          [emitted]
        images/common/codeplay/NA_VictoryPage_Y710_735x100_VictoryPage.png    46.7 kB          [emitted]
                               images/common/codeplay/SweepstakesEntry.png      15 kB          [emitted]
               images/common/codeplay/UK_ChooseHeroPage_Yoga510_800x90.png    47.2 kB          [emitted]
     images/common/codeplay/UK_InLevelPage_Y700_1132X283_ingameProduct.png    65.6 kB          [emitted]
                     images/common/codeplay/UK_LevelsPage_Cube_160x480.png    73.1 kB          [emitted]
     images/common/codeplay/UK_VictoryPage_Miix510_735x100_VictoryPage.png      39 kB          [emitted]
                                                     images/common/gem.png    3.13 kB          [emitted]
           images/common/lang-nl/button-background-ideal-active-border.png    5.36 kB          [emitted]
                                        images/common/particles/bullet.png  443 bytes          [emitted]
                                       images/common/particles/bullet2.png    1.42 kB          [emitted]
                                   images/common/particles/cloud_small.png    7.33 kB          [emitted]
                                         images/common/particles/cloud.png    78.4 kB          [emitted]
                                         images/common/particles/smoke.png    14.2 kB          [emitted]
                                          images/common/particles/star.png    3.62 kB          [emitted]
                                                        images/favicon.ico  461 bytes          [emitted]
                                                   images/generic-icon.png    2.49 kB          [emitted]
                            images/level/code_editor_background_border.png    25.9 kB          [emitted]
                                   images/level/code_editor_background.png    32.3 kB          [emitted]
                       images/level/code_editor_error_background_arrow.png  825 bytes          [emitted]
                             images/level/code_editor_error_background.png    4.61 kB          [emitted]
                              images/level/code_editor_info_background.png    10.4 kB          [emitted]
                                images/level/code_editor_top_bar_hinge.png  478 bytes          [emitted]
                      images/level/code_editor_top_bar_wood_background.png    13.3 kB          [emitted]
                           images/level/code_editor_warning_background.png    9.58 kB          [emitted]
                             images/level/code_palette_wood_background.png    44.9 kB          [emitted]
                                  images/level/code_toolbar_background.png       6 kB          [emitted]
                   images/level/code_toolbar_run_button_active_pressed.png    3.35 kB          [emitted]
                           images/level/code_toolbar_run_button_active.png    3.46 kB          [emitted]
                     images/level/code_toolbar_run_button_zazz_pressed.png    3.67 kB          [emitted]
                             images/level/code_toolbar_run_button_zazz.png    3.74 kB          [emitted]
                images/level/code_toolbar_submit_button_active_pressed.png    3.74 kB          [emitted]
                        images/level/code_toolbar_submit_button_active.png    3.84 kB          [emitted]
                  images/level/code_toolbar_submit_button_zazz_pressed.png    3.95 kB          [emitted]
                          images/level/code_toolbar_submit_button_zazz.png       4 kB          [emitted]
                                   images/level/control_bar_background.png    24.4 kB          [emitted]
                                     images/level/control_bar_cap_left.png    10.6 kB          [emitted]
                                    images/level/control_bar_cap_right.png    8.29 kB          [emitted]
                                 images/level/control_bar_chain_center.png      11 kB          [emitted]
                                  images/level/control_bar_chain_right.png    15.7 kB          [emitted]
                        images/level/control_bar_level_name_background.png    6.36 kB          [emitted]
                                images/level/csedweek-logo-final-small.jpg    52.7 kB          [emitted]
                                      images/level/dialogue_background.png    8.74 kB          [emitted]
                                        images/level/footer_background.jpg     137 kB          [emitted]
                             images/level/goals_background_with_scores.png    9.92 kB          [emitted]
                                         images/level/goals_background.png    4.86 kB          [emitted]
                                          images/level/gold_background.png    1.28 kB          [emitted]
                                                images/level/gold_icon.png    1.15 kB          [emitted]
                                           images/level/hud_background.png    5.04 kB          [emitted]
                                                images/level/hud_hinge.png  973 bytes          [emitted]
                                           images/level/hud_info_icons.png    6.15 kB          [emitted]
                                      images/level/hud_wood_background.png    18.5 kB          [emitted]
                                         images/level/loading_bar_back.png  299 bytes          [emitted]
                                         images/level/loading_bar_fill.png  514 bytes          [emitted]
                                          images/level/loading_bar_rim.png    25.7 kB          [emitted]
                                   images/level/loading_left_wing_1366.jpg     111 kB          [emitted]
                                   images/level/loading_left_wing_1920.jpg     175 kB          [emitted]
                                  images/level/loading_right_wing_1366.jpg     107 kB          [emitted]
                                  images/level/loading_right_wing_1920.jpg     168 kB          [emitted]
                                                  images/level/pointer.png      13 kB          [emitted]
                                       images/level/popover_background.png    1.88 kB          [emitted]
                                images/level/popover_border_background.png  988 bytes          [emitted]
                                      images/level/scrubber_background.png    5.88 kB          [emitted]
                                          images/level/scrubber_groove.png    1.25 kB          [emitted]
                                            images/level/scrubber_knob.png    2.29 kB          [emitted]
                                       images/level/thang_avatar_frame.png    3.53 kB          [emitted]
                                                  images/level/victory.png    92.7 kB          [emitted]
                                             images/level/wood_texture.png      57 kB          [emitted]
                                                  images/loading_image.png    23.8 kB          [emitted]
                                                 images/minecraft/bans.jpg     104 kB          [emitted]
                                                 images/minecraft/dirt.png  266 bytes          [emitted]
                                           images/minecraft/grass_side.png  408 bytes          [emitted]
                                            images/minecraft/grass_top.png    15.3 kB          [emitted]
                                                images/minecraft/hans4.png     108 kB          [emitted]
                                      images/minecraft/icon_stone_pick.png    20.9 kB          [emitted]
                                       images/pages/about/bracket_left.png    2.74 kB          [emitted]
                                      images/pages/about/bracket_right.png    2.76 kB          [emitted]
                                       images/pages/about/bryukh_small.png    6.45 kB          [emitted]
                                       images/pages/about/carlos_small.png    8.39 kB          [emitted]
                               images/pages/about/character_silouhette.png    8.04 kB          [emitted]
                     images/pages/about/codebackground_zoom_compressed.png    1.29 MB          [emitted]  [big]
                                           javascripts/ace/snippets/sql.js  942 bytes          [emitted]
                                     javascripts/ace/snippets/sqlserver.js    2.14 kB          [emitted]
                                        javascripts/ace/snippets/stylus.js  135 bytes          [emitted]
                                           javascripts/ace/snippets/svg.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/swift.js  133 bytes          [emitted]
                                       javascripts/chunks/editor.bundle.js     633 kB       1  [emitted]  [big]  editor
                                           javascripts/ace/snippets/tcl.js    1.69 kB          [emitted]
                                           javascripts/ace/snippets/tex.js    3.64 kB          [emitted]
                                          javascripts/ace/snippets/text.js  131 bytes          [emitted]
                                       javascripts/ace/snippets/textile.js  540 bytes          [emitted]
                                          javascripts/ace/snippets/toml.js  131 bytes          [emitted]
                                           javascripts/ace/snippets/tsx.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/turtle.js  129 bytes          [emitted]
                                          javascripts/ace/snippets/twig.js  131 bytes          [emitted]
                                    javascripts/ace/snippets/typescript.js  143 bytes          [emitted]
                                          javascripts/ace/snippets/vala.js    3.13 kB          [emitted]
                                      javascripts/ace/snippets/vbscript.js  139 bytes          [emitted]
                                      javascripts/ace/snippets/velocity.js  651 bytes          [emitted]
                                       javascripts/ace/snippets/verilog.js  137 bytes          [emitted]
                                          javascripts/ace/snippets/vhdl.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/wollok.js    1.26 kB          [emitted]
                                           javascripts/ace/snippets/xml.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/xquery.js    1.72 kB          [emitted]
                                          javascripts/ace/snippets/yaml.js  131 bytes          [emitted]
                                         javascripts/ace/theme-ambiance.js    27.8 kB          [emitted]
                                            javascripts/ace/theme-chaos.js    2.84 kB          [emitted]
                                           javascripts/ace/theme-chrome.js    2.71 kB          [emitted]
                                  javascripts/ace/theme-clouds_midnight.js    2.43 kB          [emitted]
                                           javascripts/ace/theme-clouds.js    2.08 kB          [emitted]
                                           javascripts/ace/theme-cobalt.js    2.35 kB          [emitted]
                                   javascripts/ace/theme-crimson_editor.js    2.81 kB          [emitted]
                                             javascripts/ace/theme-dawn.js    2.24 kB          [emitted]
                                          javascripts/ace/theme-dracula.js    2.29 kB          [emitted]
                                      javascripts/ace/theme-dreamweaver.js    3.14 kB          [emitted]
                                          javascripts/ace/theme-eclipse.js    2.13 kB          [emitted]
                                           javascripts/ace/theme-github.js    2.18 kB          [emitted]
                                              javascripts/ace/theme-gob.js    2.38 kB          [emitted]
                                          javascripts/ace/theme-gruvbox.js    1.67 kB          [emitted]
                                     javascripts/ace/theme-idle_fingers.js    2.25 kB          [emitted]
                                         javascripts/ace/theme-iplastic.js    6.48 kB          [emitted]
                                      javascripts/ace/theme-katzenmilch.js    3.13 kB          [emitted]
                                         javascripts/ace/theme-kr_theme.js     2.3 kB          [emitted]
                                           javascripts/ace/theme-kuroir.js    2.05 kB          [emitted]
                                   javascripts/ace/theme-merbivore_soft.js    2.45 kB          [emitted]
                                        javascripts/ace/theme-merbivore.js    2.24 kB          [emitted]
                                  javascripts/ace/theme-mono_industrial.js    2.79 kB          [emitted]
                                          javascripts/ace/theme-monokai.js    2.38 kB          [emitted]
                                   javascripts/ace/theme-pastel_on_dark.js    2.63 kB          [emitted]
                                   javascripts/ace/theme-solarized_dark.js    2.31 kB          [emitted]
                                  javascripts/ace/theme-solarized_light.js    2.36 kB          [emitted]
                                        javascripts/ace/theme-sqlserver.js    2.89 kB          [emitted]
                                         javascripts/ace/theme-terminal.js    2.91 kB          [emitted]
                                         javascripts/ace/theme-textmate.js    2.58 kB          [emitted]
                              javascripts/ace/theme-tomorrow_night_blue.js    3.03 kB          [emitted]
                            javascripts/ace/theme-tomorrow_night_bright.js     3.5 kB          [emitted]
                          javascripts/ace/theme-tomorrow_night_eighties.js    3.22 kB          [emitted]
                                   javascripts/ace/theme-tomorrow_night.js    2.82 kB          [emitted]
                                         javascripts/ace/theme-tomorrow.js    2.56 kB          [emitted]
                                         javascripts/ace/theme-twilight.js     2.5 kB          [emitted]
                                      javascripts/ace/theme-vibrant_ink.js     2.2 kB          [emitted]
                                            javascripts/ace/theme-xcode.js    1.92 kB          [emitted]
                                          javascripts/ace/worker-coffee.js     191 kB          [emitted]
                                             javascripts/ace/worker-css.js     141 kB          [emitted]
                                            javascripts/ace/worker-html.js     217 kB          [emitted]
                                      javascripts/ace/worker-javascript.js     165 kB          [emitted]
                                            javascripts/ace/worker-json.js    32.9 kB          [emitted]
                                             javascripts/ace/worker-lua.js    47.1 kB          [emitted]
                                             javascripts/ace/worker-php.js    78.3 kB          [emitted]
                                             javascripts/ace/worker-xml.js    55.5 kB          [emitted]
                                          javascripts/ace/worker-xquery.js    1.63 MB          [emitted]  [big]
                                      images/pages/about/daniela_small.png    22.4 kB          [emitted]
                                             images/pages/about/desert.jpg     160 kB          [emitted]
                                             images/pages/about/desert.png     498 kB          [emitted]  [big]
                                            images/pages/about/dungeon.jpg    98.3 kB          [emitted]
                                            images/pages/about/dungeon.png     466 kB          [emitted]  [big]
                                             images/pages/about/forest.jpg     239 kB          [emitted]
                                             images/pages/about/forest.png     783 kB          [emitted]  [big]
                                       images/pages/about/george_small.png    7.49 kB          [emitted]
                                     images/pages/about/github_avatars.png     301 kB          [emitted]  [big]
                                             images/pages/about/github.png    6.66 kB          [emitted]
                                            images/pages/about/glacier.jpg     218 kB          [emitted]
                                            images/pages/about/glacier.png    1.04 MB          [emitted]  [big]
                                        images/pages/about/globe_green.png    11.2 kB          [emitted]
                                        images/pages/about/globe_white.png    8.09 kB          [emitted]
                                         images/pages/about/jose_small.png    8.44 kB          [emitted]
                                         images/pages/about/josh_small.png    7.63 kB          [emitted]
                                   images/pages/about/languages_group1.png    10.6 kB          [emitted]
                                   images/pages/about/languages_group2.png    9.28 kB          [emitted]
                                          images/pages/about/languages.png    19.9 kB          [emitted]
                                      images/pages/about/michael_small.png    6.53 kB          [emitted]
                                   images/pages/about/new_languages_xs.png    48.2 kB          [emitted]
                                      images/pages/about/new_languages.png    49.6 kB          [emitted]
                                         images/pages/about/oleg_small.png    7.25 kB          [emitted]
                                        images/pages/about/pavel_small.png    8.12 kB          [emitted]
                                        images/pages/about/placeholder.png    8.82 kB          [emitted]
                                  images/pages/about/screenshot_desert.png     114 kB          [emitted]
                                 images/pages/about/screenshot_dungeon.png    90.9 kB          [emitted]
                                  images/pages/about/screenshot_forest.png     147 kB          [emitted]
                                 images/pages/about/screenshot_glacier.png     151 kB          [emitted]
                                             images/pages/about/sketch.png     197 kB          [emitted]
                            images/pages/about/team-avatars/cat-avatar.png     6.9 kB          [emitted]
                          images/pages/about/team-avatars/david-avatar.png    15.6 kB          [emitted]
                         images/pages/about/team-avatars/dchase-avatar.png    11.2 kB          [emitted]
                         images/pages/about/team-avatars/elliot-avatar.png    22.6 kB          [emitted]
                           images/pages/about/team-avatars/jane-avatar.png    15.6 kB          [emitted]
                           images/pages/about/team-avatars/josh-avatar.png    8.83 kB          [emitted]
                       images/pages/about/team-avatars/lawrence-avatar.png    10.4 kB          [emitted]
                           images/pages/about/team-avatars/lisa-avatar.png    18.1 kB          [emitted]
                            images/pages/about/team-avatars/liz-avatar.png    12.5 kB          [emitted]
                           images/pages/about/team-avatars/maka-avatar.png    8.44 kB          [emitted]
                           images/pages/about/team-avatars/matt-avatar.png      21 kB          [emitted]
                           images/pages/about/team-avatars/nick-avatar.png    11.4 kB          [emitted]
                          images/pages/about/team-avatars/nolan-avatar.png    17.9 kB          [emitted]
                        images/pages/about/team-avatars/phoenix-avatar.png      23 kB          [emitted]
                            images/pages/about/team-avatars/rob-avatar.png    18.1 kB          [emitted]
                        images/pages/about/team-avatars/robarev-avatar.png    10.2 kB          [emitted]
                          images/pages/about/team-avatars/robin-avatar.png    17.5 kB          [emitted]
                          images/pages/about/team-avatars/scott-avatar.png    8.21 kB          [emitted]
                           images/pages/about/team-avatars/sean-avatar.png    22.1 kB          [emitted]
                      images/pages/about/team-avatars/shubhangi-avatar.png    10.9 kB          [emitted]
                          images/pages/about/team-avatars/vicki-avatar.png    13.1 kB          [emitted]
                     images/pages/about/team-headshots/andrew-headshot.png    21.3 kB          [emitted]
                        images/pages/about/team-headshots/cat-headshot.png    21.2 kB          [emitted]
                   images/pages/about/team-headshots/chethana-headshot.png      20 kB          [emitted]
                      images/pages/about/team-headshots/david-headshot.png      22 kB          [emitted]
                     images/pages/about/team-headshots/dchase-headshot.jpg    9.47 kB          [emitted]
                     images/pages/about/team-headshots/dchase-headshot.png    20.6 kB          [emitted]
                     images/pages/about/team-headshots/elliot-headshot.png    22.2 kB          [emitted]
                       images/pages/about/team-headshots/jane-headshot.png      21 kB          [emitted]
                       images/pages/about/team-headshots/josh-headshot.png    26.2 kB          [emitted]
                   images/pages/about/team-headshots/lawrence-headshot.jpg    8.57 kB          [emitted]
                       images/pages/about/team-headshots/lisa-headshot.png    20.7 kB          [emitted]
                        images/pages/about/team-headshots/liz-headshot.png    18.3 kB          [emitted]
                       images/pages/about/team-headshots/maka-headshot.png    22.4 kB          [emitted]
                       images/pages/about/team-headshots/matt-headshot.png    23.2 kB          [emitted]
                       images/pages/about/team-headshots/nick-headshot.png    40.2 kB          [emitted]
                      images/pages/about/team-headshots/nolan-headshot.png    22.4 kB          [emitted]
                    images/pages/about/team-headshots/phoenix-headshot.png    23.8 kB          [emitted]
                        images/pages/about/team-headshots/rob-headshot.png      22 kB          [emitted]
                    images/pages/about/team-headshots/robarev-headshot.jpg    8.79 kB          [emitted]
                      images/pages/about/team-headshots/robin-headshot.png    21.2 kB          [emitted]
                      images/pages/about/team-headshots/scott-headshot.png    25.5 kB          [emitted]
                       images/pages/about/team-headshots/sean-headshot.png    23.2 kB          [emitted]
                  images/pages/about/team-headshots/shubhangi-headshot.jpg    8.81 kB          [emitted]
                  images/pages/about/team-headshots/stephanie-headshot.png    21.6 kB          [emitted]
                      images/pages/about/team-headshots/vicki-headshot.jpg    9.29 kB          [emitted]
                                images/pages/account/profile/education.png  328 bytes          [emitted]
                            images/pages/account/profile/icon_facebook.png  332 bytes          [emitted]
                              images/pages/account/profile/icon_github.png  455 bytes          [emitted]
                               images/pages/account/profile/icon_gplus.png  612 bytes          [emitted]
                            images/pages/account/profile/icon_linkedin.png  381 bytes          [emitted]
                             images/pages/account/profile/icon_twitter.png  410 bytes          [emitted]
                     images/pages/account/profile/sample_profile_thumb.png    65.7 kB          [emitted]
                           images/pages/account/profile/sample_profile.png     306 kB          [emitted]  [big]
                           images/pages/account/profile/sample_project.png    5.17 kB          [emitted]
                                     images/pages/account/profile/work.png  320 bytes          [emitted]
                      images/pages/account/subscription/teacher-banner.png    55.8 kB          [emitted]
                               images/pages/admin/outcomes-report/anya.png     375 kB          [emitted]  [big]
                              images/pages/admin/outcomes-report/arryn.png     690 kB          [emitted]  [big]
                             images/pages/apcsp/APCSP_ProviderBadge_lg.png    27.8 kB          [emitted]
                                          images/pages/base/background.jpg     310 kB          [emitted]  [big]
                              images/pages/base/code-ninjas-logo-right.png    2.91 kB          [emitted]
                          images/pages/base/codecombat_logo_circle_250.png    41.7 kB          [emitted]
                                            images/pages/base/firebase.png    4.67 kB          [emitted]
                          images/pages/base/glyphicons-halflings-white.png    8.74 kB          [emitted]
                                images/pages/base/glyphicons-halflings.png    12.6 kB          [emitted]
                               images/pages/base/glyphicons-simplified.png  650 bytes          [emitted]
                                     images/pages/base/logo_square_120.png    17.6 kB          [emitted]
                                     images/pages/base/logo_square_250.png    26.5 kB          [emitted]
                                                images/pages/base/logo.png    43.8 kB          [emitted]
                                    images/pages/base/modal_background.png    8.13 kB          [emitted]
                                      images/pages/base/nav_background.png    12.3 kB          [emitted]
                                         images/pages/base/play_button.png      32 kB          [emitted]
                                    images/pages/base/recruitment_logo.png    1.29 kB          [emitted]
                                       images/pages/careers/recruiting.png    51.7 kB          [emitted]
                                  images/pages/clans/dashboard_preview.png     119 kB          [emitted]
                                     images/pages/community/adventurer.png    5.66 kB          [emitted]
                                     images/pages/community/ambassador.png    5.65 kB          [emitted]
                                       images/pages/community/archmage.png    5.96 kB          [emitted]
                                        images/pages/community/article.png      13 kB          [emitted]
                                        images/pages/community/artisan.png    5.05 kB          [emitted]
                                       images/pages/community/diplomat.png    5.76 kB          [emitted]
                                          images/pages/community/level.png    27.2 kB          [emitted]
                                 images/pages/community/logo_discourse.png    2.71 kB          [emitted]
                                  images/pages/community/logo_facebook.png    1.22 kB          [emitted]
                                        images/pages/community/logo_g+.png    1.69 kB          [emitted]
                                    images/pages/community/logo_github.png    9.04 kB          [emitted]
                                   images/pages/community/logo_hipchat.png    3.67 kB          [emitted]
                                      images/pages/community/logo_sett.png    3.48 kB          [emitted]
                                     images/pages/community/logo_slack.png    5.07 kB          [emitted]
                                   images/pages/community/logo_twitter.png    2.33 kB          [emitted]
                                         images/pages/community/scribe.png    5.47 kB          [emitted]
                                          images/pages/community/thang.png    24.3 kB          [emitted]
                                    images/pages/contribute/adventurer.png    23.5 kB          [emitted]
                                    images/pages/contribute/ambassador.png    22.2 kB          [emitted]
                                      images/pages/contribute/archmage.png    29.5 kB          [emitted]
                                       images/pages/contribute/artisan.png      23 kB          [emitted]
                       images/pages/contribute/class_detail_adventurer.png    51.3 kB          [emitted]
                       images/pages/contribute/class_detail_ambassador.png    60.8 kB          [emitted]
                         images/pages/contribute/class_detail_archmage.png    48.5 kB          [emitted]
                          images/pages/contribute/class_detail_artisan.png    51.6 kB          [emitted]
                         images/pages/contribute/class_detail_diplomat.png    56.6 kB          [emitted]
                           images/pages/contribute/class_detail_scribe.png    49.7 kB          [emitted]
                             images/pages/contribute/contribute_header.png    50.1 kB          [emitted]
                                     images/pages/contribute/counselor.png    23.4 kB          [emitted]
                                      images/pages/contribute/diplomat.png    24.9 kB          [emitted]
                                        images/pages/contribute/scribe.png    25.4 kB          [emitted]
                               images/pages/contribute/tile_adventurer.png    83.6 kB          [emitted]
                               images/pages/contribute/tile_ambassador.png    48.4 kB          [emitted]
                                 images/pages/contribute/tile_archmage.png    54.8 kB          [emitted]
                                  images/pages/contribute/tile_artisan.png    45.3 kB          [emitted]
                                 images/pages/contribute/tile_diplomat.png    57.8 kB          [emitted]
                                   images/pages/contribute/tile_scribe.png    59.9 kB          [emitted]
                                         images/pages/courses/101_info.png     129 kB          [emitted]
                                         images/pages/courses/102_info.png     166 kB          [emitted]
                                         images/pages/courses/103_info.png    67.7 kB          [emitted]
                                         images/pages/courses/104_info.png    99.6 kB          [emitted]
                                         images/pages/courses/105_info.png     185 kB          [emitted]
                                         images/pages/courses/106_info.png     130 kB          [emitted]
                                         images/pages/courses/107_info.png     138 kB          [emitted]
                                     images/pages/courses/coco_complab.png     520 kB          [emitted]  [big]
                            images/pages/courses/how_to_apply_licenses.png    24.7 kB          [emitted]
                                      images/pages/courses/star-bronze.png    3.73 kB          [emitted]
                                        images/pages/courses/star-gold.png    3.96 kB          [emitted]
                                      images/pages/courses/star-silver.png    4.05 kB          [emitted]
           images/pages/demo-webdev-projects/chaton-en-train-de-dormir.jpg    26.7 kB          [emitted]
                  images/pages/demo-webdev-projects/Kitten_(06)_by_Ron.jpg    20.5 kB          [emitted]
                   images/pages/demo-webdev-projects/my-cute-bunny-pet.jpg    16.6 kB          [emitted]
                        images/pages/editor/level/preset_dungeon_large.jpg    89.8 kB          [emitted]
                        images/pages/editor/level/preset_dungeon_small.jpg    90.4 kB          [emitted]
                         images/pages/editor/level/preset_grassy_large.jpg    75.1 kB          [emitted]
                         images/pages/editor/level/preset_grassy_small.jpg    69.1 kB          [emitted]
                         images/pages/editor/level/preset_indoor_large.jpg    83.4 kB          [emitted]
                         images/pages/editor/level/preset_indoor_small.jpg    85.2 kB          [emitted]
                                       images/pages/employer/anon_user.png  578 bytes          [emitted]
                                 images/pages/employer/artisanal_claim.png    1.67 kB          [emitted]
                                       images/pages/employer/briefcase.png  100 bytes          [emitted]
                                       images/pages/employer/education.png  223 bytes          [emitted]
                                  images/pages/employer/employer_icon1.png     1.2 kB          [emitted]
                                  images/pages/employer/employer_icon2.png  923 bytes          [emitted]
                                  images/pages/employer/employer_icon3.png  885 bytes          [emitted]
                                  images/pages/employer/employer_icon4.png    1.44 kB          [emitted]
                                  images/pages/employer/employer_icon5.png  845 bytes          [emitted]
                                  images/pages/employer/employer_icon6.png  686 bytes          [emitted]
                                        images/pages/employer/location.png  193 bytes          [emitted]
                                             images/pages/employer/tag.png  149 bytes          [emitted]
                                          images/pages/features/banner.png     165 kB          [emitted]
                                             images/pages/features/bg2.png    1.02 MB          [emitted]  [big]
                                 images/pages/features/collect_command.png      96 kB          [emitted]
                                    images/pages/features/game_web_dev.png     412 kB          [emitted]  [big]
                                          images/pages/features/heroes.png     221 kB          [emitted]
                                 images/pages/game-menu/lock-processed.png  688 bytes          [emitted]
                                           images/pages/game-menu/lock.png     2.8 kB          [emitted]
                         images/pages/game-menu/save-load-history-stub.png    79.1 kB          [emitted]
                                 images/pages/game-menu/save-load-stub.png     102 kB          [emitted]
                                     images/pages/game-menu/slot-icons.png    41.2 kB          [emitted]
                                     images/pages/home/app_store_badge.svg    12.2 kB          [emitted]
                                          images/pages/home/boy_coding.png    41.1 kB          [emitted]
                                 images/pages/home/character_jumbotron.png     1.1 MB          [emitted]  [big]
                                    images/pages/home/character_lineup.png     199 kB          [emitted]
                                  images/pages/home/computer-science-2.png    33.8 kB          [emitted]
                                  images/pages/home/computer-science-3.png    24.2 kB          [emitted]
                                  images/pages/home/computer-science-4.png    38.9 kB          [emitted]
                                  images/pages/home/computer-science-5.png    48.2 kB          [emitted]
                                  images/pages/home/computer-science-6.png    28.1 kB          [emitted]
                                    images/pages/home/course_languages.png    3.91 kB          [emitted]
                                               images/pages/home/dylan.png    18.3 kB          [emitted]
                                                images/pages/home/emma.png    23.1 kB          [emitted]
                                        images/pages/home/F1_typedcode.png    6.41 kB          [emitted]
                                    images/pages/home/F2_teacherguides.png    11.4 kB          [emitted]
                                       images/pages/home/F3_accessible.png    11.1 kB          [emitted]
                                   images/pages/home/footer_background.png      15 kB          [emitted]
                                           images/pages/home/G1_reward.png    8.94 kB          [emitted]
                                           images/pages/home/G2_brains.png    7.35 kB          [emitted]
                                             images/pages/home/G3_game.png    4.83 kB          [emitted]
                                          images/pages/home/game-dev-1.png    26.2 kB          [emitted]
                                  images/pages/home/game-development-1.png    26.2 kB          [emitted]
                                  images/pages/home/game-development-2.png    34.6 kB          [emitted]
                                  images/pages/home/game-development-3.png    33.2 kB          [emitted]
                                         images/pages/home/girl_coding.png    32.8 kB          [emitted]
                                          images/pages/home/inprogress.png    4.19 kB          [emitted]
                    images/pages/home/introduction-to-computer-science.png    34.9 kB          [emitted]
                                          images/pages/home/opensource.png    7.49 kB          [emitted]
                                               images/pages/home/pcmag.png    4.24 kB          [emitted]
                                         images/pages/home/play_button.png      32 kB          [emitted]
                                            images/pages/home/play_img.png     115 kB          [emitted]
                                   images/pages/home/student_jumbotron.jpg     186 kB          [emitted]
                                             images/pages/home/timmaki.png    22.9 kB          [emitted]
                                         images/pages/home/video_thumb.png     475 kB          [emitted]  [big]
                                           images/pages/home/web-dev-1.png    20.6 kB          [emitted]
                                   images/pages/home/web-development-1.png    20.6 kB          [emitted]
                                   images/pages/home/web-development-2.png    27.4 kB          [emitted]
                              images/pages/minigames/conditionals/bear.png    12.3 kB          [emitted]
                               images/pages/minigames/conditionals/dog.png    11.1 kB          [emitted]
                         images/pages/minigames/conditionals/fire_trap.png    3.46 kB          [emitted]
                       images/pages/minigames/conditionals/forked-path.jpg     630 kB          [emitted]  [big]
                               images/pages/minigames/conditionals/fox.png    10.7 kB          [emitted]
                               images/pages/minigames/conditionals/gem.png    1.46 kB          [emitted]
                              images/pages/minigames/conditionals/ogre.png    50.3 kB          [emitted]
                               images/pages/minigames/conditionals/rat.jpg    3.28 kB          [emitted]
                             images/pages/minigames/conditionals/raven.png    8.73 kB          [emitted]
                              images/pages/minigames/conditionals/wolf.png    10.1 kB          [emitted]
                      images/pages/modal/assign-courses/select_courses.gif    1.29 MB          [emitted]  [big]
                     images/pages/modal/assign-courses/select_students.gif     532 kB          [emitted]  [big]
                                    images/pages/modal/auth/extra-pane.png      20 kB          [emitted]
                                images/pages/modal/auth/facebook_small.png  730 bytes          [emitted]
                          images/pages/modal/auth/facebook_sso_button2.png    16.4 kB          [emitted]
                                   images/pages/modal/auth/github_icon.png  723 bytes          [emitted]
                                   images/pages/modal/auth/gplus_small.png     1.5 kB          [emitted]
                             images/pages/modal/auth/gplus_sso_button2.png       8 kB          [emitted]
                              images/pages/modal/auth/login-background.png    45.2 kB          [emitted]
                             images/pages/modal/auth/signup-background.png    95.4 kB          [emitted]
                                          images/pages/not_found/404_1.png    31.8 kB          [emitted]
                                          images/pages/not_found/404_2.png    38.7 kB          [emitted]
                                          images/pages/not_found/404_3.png    82.6 kB          [emitted]
                                     images/pages/parents/anya_reading.png      21 kB          [emitted]
                                        images/pages/parents/deepdive1.png     227 kB          [emitted]
                                        images/pages/parents/deepdive2.png     208 kB          [emitted]
                                        images/pages/parents/deepdive3.png     206 kB          [emitted]
                                             images/pages/parents/flag.png    16.1 kB          [emitted]
                               images/pages/parents/jumbotron_students.png    9.56 MB          [emitted]  [big]
                                         images/pages/parents/mission1.png     109 kB          [emitted]
                                         images/pages/parents/mission2.png     114 kB          [emitted]
                                         images/pages/parents/mission3.png     122 kB          [emitted]
                                       images/pages/parents/valueprop1.png     103 kB          [emitted]
                                       images/pages/parents/valueprop2.png    69.6 kB          [emitted]
                                       images/pages/parents/valueprop3.png    88.2 kB          [emitted]
                                  images/pages/play/amazon_horz_lockup.png     198 kB          [emitted]
                                  images/pages/play/amazon_vert_lockup.png    48.1 kB          [emitted]
                                    images/pages/play/aws-educate-logo.png    24.5 kB          [emitted]
                                        images/pages/play/bronze-chest.png    29.4 kB          [emitted]
                                     images/pages/play/campaign-banner.png    10.5 kB          [emitted]
                                      images/pages/play/duck_alejandro.png    77.8 kB          [emitted]
                                           images/pages/play/duck_anya.png    54.6 kB          [emitted]
                                          images/pages/play/duck_anya2.png     124 kB          [emitted]
                                            images/pages/play/duck_ida.png    76.4 kB          [emitted]
                                           images/pages/play/duck_okar.png    72.8 kB          [emitted]
                                         images/pages/play/duck_tharin.png    48.6 kB          [emitted]
                                        images/pages/play/duck_tharin2.png     107 kB          [emitted]
                                images/pages/play/future-engineer-logo.png     228 kB          [emitted]
                                          images/pages/play/gold-chest.png    30.5 kB          [emitted]
                                  images/pages/play/ladder/easy_button.png    15.4 kB          [emitted]
                                  images/pages/play/ladder/hard_button.png    20.5 kB          [emitted]
                           images/pages/play/ladder/humans_ladder_easy.png    33.4 kB          [emitted]
                           images/pages/play/ladder/humans_ladder_hard.png    13.6 kB          [emitted]
                         images/pages/play/ladder/humans_ladder_medium.png    30.6 kB          [emitted]
                       images/pages/play/ladder/humans_ladder_tutorial.png    32.8 kB          [emitted]
                                images/pages/play/ladder/medium_button.png    15.4 kB          [emitted]
                           images/pages/play/ladder/multiplayer_notext.jpg    45.8 kB          [emitted]
                            images/pages/play/ladder/ogres_ladder_easy.png    13.5 kB          [emitted]
                            images/pages/play/ladder/ogres_ladder_hard.png    14.6 kB          [emitted]
                          images/pages/play/ladder/ogres_ladder_medium.png    34.4 kB          [emitted]
                        images/pages/play/ladder/ogres_ladder_tutorial.png    40.9 kB          [emitted]
                                    images/pages/play/ladder/prize_aws.png    1.46 kB          [emitted]
                                  images/pages/play/ladder/prize_cash1.png    2.93 kB          [emitted]
                                  images/pages/play/ladder/prize_cash2.png    2.75 kB          [emitted]
                                  images/pages/play/ladder/prize_cash3.png    2.58 kB          [emitted]
                          images/pages/play/ladder/prize_custom_avatar.png    2.54 kB          [emitted]
                          images/pages/play/ladder/prize_custom_wizard.png    3.99 kB          [emitted]
                          images/pages/play/ladder/prize_digital_ocean.png    2.42 kB          [emitted]
                               images/pages/play/ladder/prize_firebase.png    4.57 kB          [emitted]
                                   images/pages/play/ladder/prize_heap.png    2.35 kB          [emitted]
                              images/pages/play/ladder/prize_one_month.png    2.76 kB          [emitted]
                                images/pages/play/ladder/prize_oreilly.png    2.18 kB          [emitted]
                               images/pages/play/ladder/prize_webstorm.png    2.19 kB          [emitted]
                                images/pages/play/ladder/warmup_button.png    15.4 kB          [emitted]
                            images/pages/play/level-banner-multiplayer.png    8.16 kB          [emitted]
                             images/pages/play/level-banner-replayable.png    6.38 kB          [emitted]
                                images/pages/play/level-banner-special.png    5.94 kB          [emitted]
                                images/pages/play/level-banner-started.png    4.01 kB          [emitted]
                      images/pages/play/level-banner-unlock-subscriber.png    20.3 kB          [emitted]
                                 images/pages/play/level-banner-unlock.png    4.91 kB          [emitted]
                   images/pages/play/level-banner-unstarted-subscriber.png    19.7 kB          [emitted]
                              images/pages/play/level-banner-unstarted.png    4.08 kB          [emitted]
                               images/pages/play/level-info-background.png    55.8 kB          [emitted]
                       images/pages/play/level-info-status-spritesheet.png    9.96 kB          [emitted]
                        images/pages/play/level/modal/reward_icon_gems.png    2.57 kB          [emitted]
                          images/pages/play/level/modal/reward_icon_xp.png    3.53 kB          [emitted]
               images/pages/play/level/modal/reward_plate_wide_premium.png    4.36 kB          [emitted]
                       images/pages/play/level/modal/reward_plate_wide.png     2.2 kB          [emitted]
                            images/pages/play/level/modal/reward_plate.png    2.13 kB          [emitted]
                   images/pages/play/level/modal/share_level_parchment.png    10.9 kB          [emitted]
                            images/pages/play/level/modal/victory_hero.png    20.7 kB          [emitted]
                images/pages/play/level/modal/victory_modal_background.png    58.7 kB          [emitted]
         images/pages/play/level/modal/victory_modal_border_background.png    44.7 kB          [emitted]
                     images/pages/play/level/modal/victory_modal_shelf.png    1.76 kB          [emitted]
                            images/pages/play/level/modal/victory_word.png      15 kB          [emitted]
                       images/pages/play/level/modal/xp_gems_parchment.png    8.73 kB          [emitted]
                                          images/pages/play/menu_icons.png    93.6 kB          [emitted]
                                            images/pages/play/modal/an.svg    1.07 kB          [emitted]
                         images/pages/play/modal/announcement_modal_bg.png    67.7 kB          [emitted]
                         images/pages/play/modal/announcement/pets/ale.png    27.2 kB          [emitted]
    images/pages/play/modal/announcement/pets/ball_no_shadow_only_ball.png  940 bytes          [emitted]
                        images/pages/play/modal/announcement/pets/ball.png    1.06 kB          [emitted]
                        images/pages/play/modal/announcement/pets/base.png     158 kB          [emitted]
            images/pages/play/modal/announcement/pets/bg_baked_shadows.png    28.4 kB          [emitted]
                          images/pages/play/modal/announcement/pets/bg.png    25.6 kB          [emitted]
            images/pages/play/modal/announcement/pets/cougar_no_shadow.png    18.3 kB          [emitted]
                      images/pages/play/modal/announcement/pets/cougar.png    18.8 kB          [emitted]
                   images/pages/play/modal/announcement/pets/fire_elem.png    6.68 kB          [emitted]
                        images/pages/play/modal/announcement/pets/fire.png    6.41 kB          [emitted]
                          images/pages/play/modal/announcement/pets/fo.png    8.61 kB          [emitted]
               images/pages/play/modal/announcement/pets/fox_no_shadow.png    8.38 kB          [emitted]
                       images/pages/play/modal/announcement/pets/grass.png    10.3 kB          [emitted]
                     images/pages/play/modal/announcement/pets/griffin.png    10.4 kB          [emitted]
             images/pages/play/modal/announcement/pets/heroes_and_fire.png    65.2 kB          [emitted]
                         images/pages/play/modal/announcement/pets/ida.png      28 kB          [emitted]
             images/pages/play/modal/announcement/pets/mimic_no_shadow.png    6.47 kB          [emitted]
                       images/pages/play/modal/announcement/pets/mimic.png    6.76 kB          [emitted]
               images/pages/play/modal/announcement/pets/pug_no_shadow.png    10.1 kB          [emitted]
                         images/pages/play/modal/announcement/pets/pug.png    10.5 kB          [emitted]
                       images/pages/play/modal/announcement/pets/raven.png    7.13 kB          [emitted]
              images/pages/play/modal/announcement/pets/wolf_no_shadow.png    11.9 kB          [emitted]
              images/pages/play/modal/announcement/pets/wolf_only_wolf.png    11.3 kB          [emitted]
images/pages/play/modal/announcement/pets/wolf_pup_no_shadow_only_wolf.png    10.6 kB          [emitted]
                        images/pages/play/modal/announcement/pets/wolf.png    12.4 kB          [emitted]
                images/pages/play/modal/announcement/ritic/ability_bar.png    34.1 kB          [emitted]
              images/pages/play/modal/announcement/ritic/assassin-pose.png    63.6 kB          [emitted]
                      images/pages/play/modal/announcement/ritic/blink.gif    4.87 MB          [emitted]  [big]
                      images/pages/play/modal/announcement/ritic/blink.png    5.57 kB          [emitted]
                images/pages/play/modal/announcement/ritic/clear_block.png    26.2 kB          [emitted]
              images/pages/play/modal/announcement/ritic/cracked_block.png    39.8 kB          [emitted]
                   images/pages/play/modal/announcement/ritic/darkness.gif    4.45 MB          [emitted]  [big]
                   images/pages/play/modal/announcement/ritic/darkness.png    10.6 kB          [emitted]
             images/pages/play/modal/announcement/ritic/ice-background.jpg    76.9 kB          [emitted]
                        images/pages/play/modal/announcement/ritic/ray.png    18.8 kB          [emitted]
                 images/pages/play/modal/announcement/ritic/shadowwalk.gif    3.46 MB          [emitted]  [big]
                 images/pages/play/modal/announcement/ritic/shadowwalk.png    6.91 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard1.png    4.17 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard2.png     4.9 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard3.png    4.96 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard4.png    4.47 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard5.png    2.71 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard6.png    2.36 kB          [emitted]
                    images/pages/play/modal/announcement/ritic/tornado.gif    3.67 MB          [emitted]  [big]
                    images/pages/play/modal/announcement/ritic/tornado.png    4.18 kB          [emitted]
         images/pages/play/modal/announcement/ritic/undercracked_block.png    29.6 kB          [emitted]
                           images/pages/play/modal/buy-gems-background.png     209 kB          [emitted]
                                       images/pages/play/modal/captain.png    17.6 kB          [emitted]
                            images/pages/play/modal/challenge_complete.png      36 kB          [emitted]
                            images/pages/play/modal/challenge_unlocked.png    37.7 kB          [emitted]
                                      images/pages/play/modal/champion.png      21 kB          [emitted]
  images/pages/play/modal/code-play-create-account-modal-background-de.png     609 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-en.png     597 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-es.png     863 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-in.png     563 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-uk.png     589 kB          [emitted]  [big]
                                images/pages/play/modal/combo_complete.png    34.6 kB          [emitted]
                              images/pages/play/modal/combo_incomplete.png    37.2 kB          [emitted]
                                images/pages/play/modal/confirm-button.png    3.08 kB          [emitted]
                                       images/pages/play/modal/duelist.png      21 kB          [emitted]
                                 images/pages/play/modal/equip-buttons.png    2.92 kB          [emitted]
                          images/pages/play/modal/game-menu-background.png      41 kB          [emitted]
                                       images/pages/play/modal/goliath.png    17.8 kB          [emitted]
                                      images/pages/play/modal/guardian.png    19.7 kB          [emitted]
                    images/pages/play/modal/hero-portrait-gem-selected.png    8.13 kB          [emitted]
                             images/pages/play/modal/hero-portrait-gem.png    6.59 kB          [emitted]
                        images/pages/play/modal/hero-portrait-selected.png     6.1 kB          [emitted]
                 images/pages/play/modal/hero-portrait-silver-selected.png    11.8 kB          [emitted]
                          images/pages/play/modal/hero-portrait-silver.png    4.82 kB          [emitted]
                                 images/pages/play/modal/hero-portrait.png    6.88 kB          [emitted]
                               images/pages/play/modal/heroes-and-pets.png     302 kB          [emitted]  [big]
                             images/pages/play/modal/heroes-background.png    55.5 kB          [emitted]
                                            images/pages/play/modal/hr.png  511 bytes          [emitted]
                          images/pages/play/modal/inventory-background.png    89.9 kB          [emitted]
                  images/pages/play/modal/item-box-background-selected.png     1.5 kB          [emitted]
                           images/pages/play/modal/item-box-background.png       2 kB          [emitted]
                         images/pages/play/modal/item-icon-accessories.png    2.05 kB          [emitted]
                               images/pages/play/modal/item-icon-armor.png    3.08 kB          [emitted]
                               images/pages/play/modal/item-icon-books.png    2.59 kB          [emitted]
                                images/pages/play/modal/item-icon-misc.png    4.31 kB          [emitted]
                             images/pages/play/modal/item-icon-primary.png    1.75 kB          [emitted]
                           images/pages/play/modal/item-icon-secondary.png    2.78 kB          [emitted]
                       images/pages/play/modal/items-background-narrow.png     116 kB          [emitted]
                              images/pages/play/modal/items-background.png      82 kB          [emitted]
                                       images/pages/play/modal/k-means.gif     311 kB          [emitted]  [big]
                                        images/pages/play/modal/knight.png    19.4 kB          [emitted]
                images/pages/play/modal/lang-nl/buy-gems-background-NL.png     259 kB          [emitted]  [big]
                        images/pages/play/modal/leaderboard-background.png    50.1 kB          [emitted]
                                images/pages/play/modal/level_complete.png    31.2 kB          [emitted]
                                   images/pages/play/modal/lock_banner.png    28.5 kB          [emitted]
                             images/pages/play/modal/menu-tab-selected.png    1.42 kB          [emitted]
                                      images/pages/play/modal/menu-tab.png    1.22 kB          [emitted]
                         images/pages/play/modal/parental_nudge_wizard.png     202 kB          [emitted]
              images/pages/play/modal/parental_prompt_modal_background.png    35.7 kB          [emitted]
                                                  javascripts/run-tests.js  697 bytes          [emitted]
                                        images/pages/play/modal/raider.png    17.5 kB          [emitted]
                        images/pages/play/modal/random-gems-background.png    5.05 kB          [emitted]
                                       images/pages/play/modal/samurai.png    19.9 kB          [emitted]
                                      images/pages/play/modal/stalwart.png    21.5 kB          [emitted]
                    images/pages/play/modal/subscribe-background-blank.png    43.6 kB          [emitted]
                          images/pages/play/modal/subscribe-background.png     224 kB          [emitted]
                                images/pages/play/modal/subscribe-gems.png    27.9 kB          [emitted]
                              images/pages/play/modal/subscribe-heroes.png      55 kB          [emitted]
                                    images/pages/play/modal/three-pets.png    32.1 kB          [emitted]
                                  images/pages/play/picoctf-logo-white.png    3.54 kB          [emitted]
                                    images/pages/play/play-spritesheet.png    16.8 kB          [emitted]
                                   images/pages/play/portal-background.png    2.19 kB          [emitted]
                               images/pages/play/portal-beta-campaigns.png     324 kB          [emitted]  [big]
                                    images/pages/play/portal-campaigns.png     478 kB          [emitted]  [big]
                                   images/pages/play/premium-menu-icon.png    32.2 kB          [emitted]
                                        images/pages/play/silver-chest.png    29.1 kB          [emitted]
                                                images/pages/play/star.png    13.5 kB          [emitted]
                                        images/pages/play/Victory_Pose.png    83.7 kB          [emitted]
                                        images/pages/play/wooden-chest.png    30.3 kB          [emitted]
                                 images/pages/play/worlds/desert_small.png    35.8 kB          [emitted]
                                images/pages/play/worlds/dungeon_small.png    30.4 kB          [emitted]
                                 images/pages/play/worlds/forest_small.png    35.9 kB          [emitted]
                             images/pages/play/worlds/game_dev_1_small.png    29.9 kB          [emitted]
                             images/pages/play/worlds/game_dev_2_small.png      30 kB          [emitted]
                                images/pages/play/worlds/glacier_small.png    29.5 kB          [emitted]
                               images/pages/play/worlds/mountain_small.png    29.7 kB          [emitted]
                                images/pages/play/worlds/volcano_small.png    30.4 kB          [emitted]
                              images/pages/play/worlds/web_dev_1_small.png    27.7 kB          [emitted]
                              images/pages/play/worlds/web_dev_2_small.png    32.1 kB          [emitted]
                                          images/pages/sales/chat_icon.png  234 bytes          [emitted]
                                         images/pages/sales/classroom1.png    96.3 kB          [emitted]
                                         images/pages/sales/classroom2.png    99.9 kB          [emitted]
                                         images/pages/sales/classroom3.png    91.4 kB          [emitted]
                                         images/pages/sales/classroom4.png    98.7 kB          [emitted]
                                         images/pages/sales/classroom5.png     116 kB          [emitted]
                                         images/pages/sales/classroom6.png    70.4 kB          [emitted]
                                      images/pages/sales/content_table.png    67.1 kB          [emitted]
                                         images/pages/sales/down_arrow.png  285 bytes          [emitted]
                                    images/pages/sales/hero_background.png     221 kB          [emitted]
                                             images/pages/sales/quote1.png    21.7 kB          [emitted]
                                             images/pages/sales/quote2.png    21.2 kB          [emitted]
                                            images/pages/sales/screen1.png    57.6 kB          [emitted]
                                            images/pages/sales/screen2.png    29.6 kB          [emitted]
            images/pages/teachers/resources/markdown/compression-grass.png    3.06 kB          [emitted]
         images/pages/teachers/resources/markdown/compression-high-res.jpg     199 kB          [emitted]
          images/pages/teachers/resources/markdown/compression-low-res.jpg    20.5 kB          [emitted]
           images/pages/teachers/resources/markdown/compression-wood-x.png    9.88 kB          [emitted]
                images/pages/teachers/resources/markdown/phishing-scam.jpg     301 kB          [emitted]  [big]
                                          images/pages/user/adventurer.png    49.3 kB          [emitted]
                                          images/pages/user/ambassador.png    36.7 kB          [emitted]
                                            images/pages/user/archmage.png    79.3 kB          [emitted]
                                             images/pages/user/artisan.png    41.5 kB          [emitted]
             images/pages/user/certificates/backgrounds/background-cs1.png    2.33 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs2.png    2.35 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs3.png    2.32 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs4.png    2.31 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs5.png    2.16 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs6.png    2.07 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-gd1.png     3.1 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-gd2.png    2.65 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-gd3.png    2.42 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-wd1.png     1.9 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-wd2.png     1.9 MB          [emitted]  [big]
                       images/pages/user/certificates/certificate-icon.png    2.58 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs1.png     124 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs2.png     132 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs3.png     139 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs4.png     147 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs5.png     155 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs6.png     179 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-gd1.png    95.3 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-gd2.png     169 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-gd3.png     202 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-wd1.png     149 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-wd2.png     168 kB          [emitted]
                     images/pages/user/certificates/poses/pose-captain.png    51.1 kB          [emitted]
                    images/pages/user/certificates/poses/pose-champion.png    98.1 kB          [emitted]
                     images/pages/user/certificates/poses/pose-duelist.png    97.7 kB          [emitted]
                     images/pages/user/certificates/poses/pose-goliath.png     135 kB          [emitted]
                    images/pages/user/certificates/poses/pose-guardian.png     146 kB          [emitted]
                      images/pages/user/certificates/poses/pose-knight.png     117 kB          [emitted]
                      images/pages/user/certificates/poses/pose-raider.png     113 kB          [emitted]
                     images/pages/user/certificates/poses/pose-samurai.png     230 kB          [emitted]
                    images/pages/user/certificates/poses/pose-stalwart.png     178 kB          [emitted]
           images/pages/user/certificates/signatures/signature-captain.png    47.3 kB          [emitted]
          images/pages/user/certificates/signatures/signature-champion.png    49.1 kB          [emitted]
           images/pages/user/certificates/signatures/signature-duelist.png      41 kB          [emitted]
           images/pages/user/certificates/signatures/signature-goliath.png    41.6 kB          [emitted]
          images/pages/user/certificates/signatures/signature-guardian.png    53.3 kB          [emitted]
            images/pages/user/certificates/signatures/signature-knight.png    36.9 kB          [emitted]
            images/pages/user/certificates/signatures/signature-raider.png    50.6 kB          [emitted]
           images/pages/user/certificates/signatures/signature-samurai.png    44.1 kB          [emitted]
          images/pages/user/certificates/signatures/signature-stalwart.png    43.6 kB          [emitted]
                                            images/pages/user/diplomat.png    43.7 kB          [emitted]
                                             images/pages/user/general.png    29.5 kB          [emitted]
                                              images/pages/user/scribe.png    78.6 kB          [emitted]
                                                   images/twitter_icon.png  338 bytes          [emitted]
                                                    index_old_browser.html    1.49 kB          [emitted]
                                                       javascripts/boot.js    6.13 kB          [emitted]
                                               javascripts/setImmediate.js    8.53 kB          [emitted]
                                           javascripts/web-dev-listener.js    9.61 kB          [emitted]
                                      javascripts/workers/aether_worker.js    3.52 kB          [emitted]
                                       javascripts/workers/worker_world.js    21.1 kB          [emitted]
                                          markdown/apcsp-big-data-pt-BR.md    5.33 kB          [emitted]
                                                markdown/apcsp-big-data.md    4.99 kB          [emitted]
                                  markdown/apcsp-binary-sequences-pt-BR.md    2.73 kB          [emitted]
                                        markdown/apcsp-binary-sequences.md    2.49 kB          [emitted]
                                       markdown/apcsp-compression-pt-BR.md    8.75 kB          [emitted]
                                             markdown/apcsp-compression.md    8.26 kB          [emitted]
                                  markdown/apcsp-computing-lesson-pt-BR.md    4.03 kB          [emitted]
                                        markdown/apcsp-computing-lesson.md    3.61 kB          [emitted]
                                        markdown/apcsp-crowdsourcing-he.md    8.32 kB          [emitted]
                                     markdown/apcsp-crowdsourcing-pt-BR.md    6.22 kB          [emitted]
                                           markdown/apcsp-crowdsourcing.md    5.73 kB          [emitted]
                                      markdown/apcsp-data-project-pt-BR.md    4.19 kB          [emitted]
                                            markdown/apcsp-data-project.md    3.88 kB          [emitted]
                                  markdown/apcsp-getting-abstract-pt-BR.md     6.1 kB          [emitted]
                                        markdown/apcsp-getting-abstract.md    5.85 kB          [emitted]
                                    markdown/apcsp-hitchhikers-guide-he.md     2.5 kB          [emitted]
                                 markdown/apcsp-hitchhikers-guide-pt-BR.md     2.1 kB          [emitted]
                                       markdown/apcsp-hitchhikers-guide.md    1.95 kB          [emitted]
                            markdown/apcsp-how-the-internet-works-pt-BR.md    7.13 kB          [emitted]
                                  markdown/apcsp-how-the-internet-works.md    6.51 kB          [emitted]
                              markdown/apcsp-impact-on-industries-pt-BR.md     1.9 kB          [emitted]
                                    markdown/apcsp-impact-on-industries.md    1.75 kB          [emitted]
                           markdown/apcsp-innovations-and-society-pt-BR.md    1.89 kB          [emitted]
                                 markdown/apcsp-innovations-and-society.md    1.79 kB          [emitted]
                             markdown/apcsp-internet-chat-simulation-he.md    9.54 kB          [emitted]
                          markdown/apcsp-internet-chat-simulation-pt-BR.md    7.91 kB          [emitted]
                                markdown/apcsp-internet-chat-simulation.md    7.28 kB          [emitted]
                            markdown/apcsp-internet-cybersecurity-pt-BR.md    5.31 kB          [emitted]
                                  markdown/apcsp-internet-cybersecurity.md    4.86 kB          [emitted]
                               markdown/apcsp-internet-simulation-pt-BR.md    3.04 kB          [emitted]
                                     markdown/apcsp-internet-simulation.md    2.81 kB          [emitted]
                                   markdown/apcsp-pair-algorithms-pt-BR.md    3.19 kB          [emitted]
                                         markdown/apcsp-pair-algorithms.md    3.01 kB          [emitted]
                        markdown/apcsp-personal-and-global-impact-pt-BR.md    4.95 kB          [emitted]
                              markdown/apcsp-personal-and-global-impact.md     4.7 kB          [emitted]
                                       markdown/apcsp-refactoring-pt-BR.md    4.48 kB          [emitted]
                                             markdown/apcsp-refactoring.md    4.25 kB          [emitted]
                                       markdown/apcsp-search-sort-pt-BR.md    8.79 kB          [emitted]
                                             markdown/apcsp-search-sort.md    8.06 kB          [emitted]
                                        markdown/apcsp-simulation-pt-BR.md    3.51 kB          [emitted]
                                              markdown/apcsp-simulation.md    3.23 kB          [emitted]
                                    markdown/apcsp-tech-usability-pt-BR.md    3.23 kB          [emitted]
                                          markdown/apcsp-tech-usability.md    2.99 kB          [emitted]
                                          markdown/apcsp-web-quiz-pt-BR.md    1.99 kB          [emitted]
                                                markdown/apcsp-web-quiz.md    1.79 kB          [emitted]
                                                  markdown/arenas-pt-BR.md    4.14 kB          [emitted]
                                                        markdown/arenas.md    3.96 kB          [emitted]
                                                    markdown/clever-faq.md    4.46 kB          [emitted]
                                  markdown/create-task-practice-1-pt-BR.md    15.5 kB          [emitted]
                                        markdown/create-task-practice-1.md    16.2 kB          [emitted]
                                  markdown/create-task-practice-2-pt-BR.md    5.74 kB          [emitted]
                                        markdown/create-task-practice-2.md    5.87 kB          [emitted]
                                  markdown/create-task-practice-3-pt-BR.md    4.53 kB          [emitted]
                                        markdown/create-task-practice-3.md    4.38 kB          [emitted]
                                                        markdown/cs1-he.md    28.4 kB          [emitted]
                                                     markdown/cs1-pt-BR.md    23.4 kB          [emitted]
                                                   markdown/cs1-zh-HANS.md      19 kB          [emitted]
                                                           markdown/cs1.md    37.3 kB          [emitted]
                                                     markdown/cs2-pt-BR.md      31 kB          [emitted]
                                                           markdown/cs2.md    31.5 kB          [emitted]
                                                     markdown/cs3-pt-BR.md      94 kB          [emitted]
                                                           markdown/cs3.md    93.1 kB          [emitted]
                                                     markdown/cs4-pt-BR.md    56.3 kB          [emitted]
                                                           markdown/cs4.md    58.9 kB          [emitted]
                                                  markdown/cs5_js-pt-BR.md    54.1 kB          [emitted]
                                                        markdown/cs5_js.md      96 kB          [emitted]
                                                  markdown/cs5_py-pt-BR.md    52.8 kB          [emitted]
                                                        markdown/cs5_py.md    94.5 kB          [emitted]
                                                        markdown/faq-he.md    18.9 kB          [emitted]
                                                     markdown/faq-nl-NL.md    16.9 kB          [emitted]
                                                     markdown/faq-pt-BR.md    18.6 kB          [emitted]
                                                           markdown/faq.md    17.1 kB          [emitted]
                                                   markdown/gd1-5day-he.md    32.3 kB          [emitted]
                                                markdown/gd1-5day-pt-BR.md    24.8 kB          [emitted]
                                              markdown/gd1-5day-zh-HANS.md    21.5 kB          [emitted]
                                                      markdown/gd1-5day.md    23.3 kB          [emitted]
                                                     markdown/gd2-pt-BR.md    14.7 kB          [emitted]
                                                           markdown/gd2.md    17.9 kB          [emitted]
                                                     markdown/gd3-pt-BR.md    25.5 kB          [emitted]
                                                           markdown/gd3.md    24.2 kB          [emitted]
                                         markdown/getting-started-pt-BR.md    11.9 kB          [emitted]
                                               markdown/getting-started.md    11.4 kB          [emitted]
                                                           markdown/hoc.md    21.1 kB          [emitted]
                                           markdown/pair-programming-he.md    2.93 kB          [emitted]
                                        markdown/pair-programming-pt-BR.md    2.26 kB          [emitted]
                                              markdown/pair-programming.md    2.16 kB          [emitted]
                                                     markdown/wd1-pt-BR.md    38.3 kB          [emitted]
                                                           markdown/wd1.md    35.4 kB          [emitted]
                                                              nothing.html   13 bytes          [emitted]
                                                                 perf.html     1.2 kB          [emitted]
                      sounds/pages/minigames/conditionals/firetrap_die.mp3    14.8 kB          [emitted]
                        sounds/pages/minigames/conditionals/gem_pickup.mp3    6.75 kB          [emitted]
                sounds/pages/minigames/conditionals/ogre_munchkin_raah.mp3    5.43 kB          [emitted]
                                                       update-billing.html  712 bytes          [emitted]
                                                       web-dev-iframe.html    2.49 kB          [emitted]
  [28] (webpack)/buildin/global.js 509 bytes {86} [built]
  [30] ./app/views/core/RootView.coffee 10.1 kB {86} [built]
  [45] ./app/locale/locale.coffee 9.16 kB {86} [built]
 [313] ./app/core/initialize.coffee 9.59 kB {86} [built]
 [506] ./app/views/TestView.coffee 6.8 kB {86} [built]
 [609] ./app/assets/javascripts/run-tests.js 725 bytes {86} [built]
 [611] ./app/app.js 500 bytes {86} [built]
[1187] ./app/templates/test-view.jade 7.17 kB {86} [built]
[1188] ./app/lib/requireUtils.coffee 1.84 kB {86} [built]
[1189] ./vendor/styles/jasmine.css 917 bytes {86} [built]
[1191] ./node_modules/exports-loader?getJasmineRequireObj!./vendor/scripts/jasmine.js 92.3 kB {86} [built]
[1192] ./node_modules/imports-loader?jasmineRequire=>window.jasmineRequire!./vendor/scripts/jasmine-html.js 11.3 kB {86} [built]
[1193] ./node_modules/imports-loader?jasmineRequire=>window.jasmineRequire!./vendor/scripts/jasmine-boot.js 6.67 kB {86} [built]
[1194] ./node_modules/imports-loader?getJasmineRequireObj=>window.getJasmineRequireObj!./vendor/scripts/jasmine-mock-ajax.js 17.1 kB {86} [built]
[1195] ./test/app .*\.(coffee|js)$ 4.05 kB {86} [built]
    + 1982 hidden modules
WARNING in ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e4028d96","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/template-compiler/preprocessor.js?engine=jade!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/views/play/level/LevelGoals.vue
(Emitted value instead of an instance of Error) <level-goal v-for="goal in conceptGoals">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
 @ ./app/views/play/level/LevelGoals.vue 11:0-345
 @ ./app/views/play/level/LevelGoalsView.coffee
 @ ./app/views/play/level/PlayLevelView.coffee
 @ ./app/lib/dynamicRequire.js
 @ ./app/core/Router.coffee
 @ ./app/core/application.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e4028d96","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/template-compiler/preprocessor.js?engine=jade!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/views/play/level/LevelGoals.vue
(Emitted value instead of an instance of Error) <level-goal v-for="goal in levelGoals">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
 @ ./app/views/play/level/LevelGoals.vue 11:0-345
 @ ./app/views/play/level/LevelGoalsView.coffee
 @ ./app/views/play/level/PlayLevelView.coffee
 @ ./app/lib/dynamicRequire.js
 @ ./app/core/Router.coffee
 @ ./app/core/application.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-779ee37a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/template-compiler/preprocessor.js?engine=pug!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/views/courses/StudentAssessmentsComponent.vue
(Emitted value instead of an instance of Error) <student-assessment-row v-for="level in chunk.assessmentLevels">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
 @ ./app/views/courses/StudentAssessmentsComponent.vue 11:0-353
 @ ./app/views/courses/StudentAssessmentsView.coffee
 @ ./app/lib/dynamicRequire.js
 @ ./app/core/Router.coffee
 @ ./app/core/application.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/jsondiffpatch/src/main.js
56:20-50 Critical dependency: the request of a dependency is an expression
 @ ./node_modules/jsondiffpatch/src/main.js
 @ ./app/core/deltas.coffee
 @ ./test/app/core/deltas.spec.coffee
 @ ./test/app .*\.(coffee|js)$
 @ ./app/views/TestView.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/jsondiffpatch/src/main.js
61:19-47 Critical dependency: the request of a dependency is an expression
 @ ./node_modules/jsondiffpatch/src/main.js
 @ ./app/core/deltas.coffee
 @ ./test/app/core/deltas.spec.coffee
 @ ./test/app .*\.(coffee|js)$
 @ ./app/views/TestView.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./bower_components/moment/min/moment-with-locales.min.js
Module not found: Error: Can't resolve './locale' in '/home/travis/build/codecombat/codecombat/bower_components/moment/min'
 @ ./bower_components/moment/min/moment-with-locales.min.js 1:8507-8529
 @ ./app/vendor.js
 @ ./app/app.js
 @ ./app/assets/javascripts/run-tests.js
ERROR in ./node_modules/coffee-loader!./app/locale/zh-HANS.coffee
Module build failed: Error: /home/travis/build/codecombat/codecombat/app/locale/zh-HANS.coffee:1757:52: error: unexpected newline
#    back_to_course_guides: "Back to Course Guides"
                                                   ^
    L1756: #    back_to_course_guides: "Back to Course Guides"
                                                            ^
  at Object.module.exports (/home/travis/build/codecombat/codecombat/node_modules/coffee-loader/index.js:37:9)
 @ ./node_modules/bundle-loader?lazy&name=locale/[name]!./app/locale/zh-HANS.coffee 3:5-76
 @ ./app/locale ./node_modules/bundle-loader?lazy&name=locale/[name] ^\.\/.*$
 @ ./app/locale/locale.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/test-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/test-view.sass 411 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/course-nag-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/course-nag-modal.sass 446 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/core/loading-error.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/core/loading-error.sass 506 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/core/hero-select-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/core/hero-select-view.sass 758 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/teacher-class-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/teacher-class-view.sass 14.8 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/recover-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/recover-modal.sass 197 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/auth-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/auth-modal.sass 6.95 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/remove-student-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/remove-student-modal.sass 231 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/edit-student-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/edit-student-modal.sass 500 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/subscribe-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/subscribe-modal.sass 7.69 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/activate-licenses-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/activate-licenses-modal.sass 706 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/invite-to-classroom-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/invite-to-classroom-modal.sass 596 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/classroom-settings-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/classroom-settings-modal.sass 431 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/teacher-trial-requests.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/teacher-trial-requests.sass 4.54 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/share-licenses-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/share-licenses-modal.sass 1.08 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/model-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/model-modal.sass 333 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/anonymous-teacher-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/anonymous-teacher-modal.sass 922 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/campaign-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/campaign-view.sass 38.8 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/docs/systems-documentation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/docs/systems-documentation-view.sass 1.23 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/docs/components-documentation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/docs/components-documentation-view.sass 1.27 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/patch.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/patch.sass 208 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/related-achievements.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/related-achievements.sass 303 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/mine-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/mine-modal.sass 4.96 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/save-version-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/save-version-modal.sass 1.43 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/revert-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/revert-modal.sass 201 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/teachers-contact-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/teachers-contact-modal.sass 216 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/hero-select-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/hero-select-modal.sass 530 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/teacher-courses-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/teacher-courses-view.sass 895 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/enrollments-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/enrollments-view.sass 1.99 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/how-to-enroll-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/how-to-enroll-modal.sass 226 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/courses-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/courses-view.sass 2.15 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/choose-language-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/choose-language-modal.sass 354 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/change-course-language-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/change-course-language-modal.sass 216 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/courses-update-account-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/courses-update-account-view.sass 561 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/create-account-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/create-account-modal.sass 3.94 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/school-info-panel.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/school-info-panel.sass 163 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/code-play-create-account-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/code-play-create-account-modal.sass 1.26 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/nces-search-input.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/nces-search-input.sass 582 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/confirmation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/confirmation-view.sass 624 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/extras-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/extras-view.sass 351 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/sso-confirm-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/sso-confirm-view.sass 278 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/sso-already-exists-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/sso-already-exists-view.sass 285 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/basic-info-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/basic-info-view.sass 1.86 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/eu-confirmation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/eu-confirmation-view.sass 163 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/coppa-deny-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/coppa-deny-view.sass 505 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/segment-check-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/segment-check-view.sass 705 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/choose-account-type-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/choose-account-type-view.sass 2.61 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/share-progress-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/share-progress-modal.sass 2.26 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/level/web-surface-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/level/web-surface-view.sass 283 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/image-gallery-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/image-gallery-modal.sass 2.82 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/ladder/ladder-tab-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/ladder/ladder-tab-view.sass 1.9 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/buy-gems-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/buy-gems-modal.sass 1.98 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/amazon-hoc-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/amazon-hoc-modal.sass 1.66 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/play-achievements-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/play-achievements-modal.sass 1.9 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/play-heroes-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/play-heroes-modal.sass 18.6 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/item-details-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/item-details-view.sass 3.38 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/play-items-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/play-items-modal.sass 9.16 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/announcement-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/announcement-modal.sass 7.58 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/poll-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/poll-modal.sass 4.72 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/menu/inventory-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/menu/inventory-modal.sass 21.2 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/documentation_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/documentation_tab.sass 280 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/leaderboard-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/leaderboard-modal.sass 2.47 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/level-feedback-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/level-feedback-view.sass 394 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/tasks-tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/tasks-tab.sass 806 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/systems-tab-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/systems-tab-view.sass 3.4 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/components_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/components_tab.sass 3.29 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/scripts_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/scripts_tab.sass 1.02 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/settings_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/settings_tab.sass 501 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/component/thang-components-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/component/thang-components-edit-view.sass 1.87 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/component/add-thang-components-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/component/add-thang-components-modal.sass 839 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/thangs-tab-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/thangs-tab-view.sass 3.29 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/level/modal/progress-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/level/modal/progress-view.sass 1.24 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/add-thangs-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/add-thangs-view.sass 1.75 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/save-branch-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/save-branch-modal.sass 312 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/load-branch-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/load-branch-modal.sass 316 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/artisan-guide-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/artisan-guide-modal.sass 231 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/lang-nl/buy-gems-modal-nl.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/lang-nl/buy-gems-modal-nl.sass 2.23 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/system/add.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/system/add.sass 357 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/system/new.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/system/new.sass 383 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/system/level-system-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/system/level-system-edit-view.sass 817 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/world-select-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/world-select-modal.sass 856 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/component/new.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/component/new.sass 392 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/component/level-component-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/component/level-component-edit-view.sass 847 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/thang/level-thang-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/thang/level-thang-edit-view.sass 594 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/generate-terrain-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/generate-terrain-modal.sass 3.4 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/app.sass:
       [1] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/app.sass 279 kB {0} [built]
        + 2 hidden modules
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.2 (node_modules/webpack/node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.2 (node_modules/karma/node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none was installed.
npm ERR! Linux 4.4.0-112-generic
npm ERR! argv "/home/travis/.nvm/versions/node/v6.12.2/bin/node" "/home/travis/.nvm/versions/node/v6.12.2/bin/npm" "install"
npm ERR! node v6.12.2
npm ERR! npm  v3.10.10
npm ERR! code ELIFECYCLE
npm ERR! codecombat@1.0.0 postinstall: `bower install && webpack`
npm ERR! Exit status 2
npm ERR!
npm ERR! Failed at the codecombat@1.0.0 postinstall script 'bower install && webpack'.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the codecombat package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     bower install && webpack
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs codecombat
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls codecombat
npm ERR! There is likely additional logging output above.
npm ERR! Please include the following file with any support request:
npm ERR!     /home/travis/build/codecombat/codecombat/npm-debug.log
The command "eval npm install  " failed. Retrying, 2 of 3.
> codecombat@1.0.0 postinstall /home/travis/build/codecombat/codecombat
> bower install && webpack
(node:5318) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
Automatically using Karma webpack config
Starting Webpack...
(node:5328) DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
Compiled static file: about.static.pug
Compiled static file: home.static.pug
Compiled static file: layout.static.pug
Compiled static file: legal.static.pug
Compiled static file: main.static.pug
Compiled static file: mock.static.pug
Compiled static file: overworld.static.pug
Compiled static file: premium-features.static.pug
Compiled static file: privacy.static.pug
Hash: fd0fce8406f204b67150
Version: webpack 3.12.0
Time: 83867ms
                                                                     Asset       Size  Chunks                    Chunk Names
                                          javascripts/ace/snippets/swig.js  131 bytes          [emitted]
                                        javascripts/chunks/admin.bundle.js     730 kB       0  [emitted]  [big]  admin
                                     javascripts/chunks/artisans.bundle.js     203 kB       2  [emitted]         artisans
                                     javascripts/chunks/teachers.bundle.js     277 kB       3  [emitted]  [big]  teachers
                                      javascripts/chunks/courses.bundle.js     175 kB       4  [emitted]         courses
                                         javascripts/chunks/i18n.bundle.js    64.6 kB       5  [emitted]         i18n
                                      javascripts/chunks/account.bundle.js     140 kB       6  [emitted]         account
                                   javascripts/chunks/contribute.bundle.js      96 kB       7  [emitted]         contribute
                                         javascripts/chunks/play.bundle.js    1.47 MB       8  [emitted]  [big]  play
                                         javascripts/chunks/user.bundle.js    80.3 kB       9  [emitted]         user
                                       javascripts/chunks/ladder.bundle.js     672 kB      10  [emitted]  [big]  ladder
                                        javascripts/chunks/clans.bundle.js     118 kB      11  [emitted]         clans
                           javascripts/chunks/locale/zh-WUU-HANT.bundle.js      14 kB      12  [emitted]         locale/zh-WUU-HANT
                           javascripts/chunks/locale/zh-WUU-HANS.bundle.js  695 bytes      13  [emitted]         locale/zh-WUU-HANS
                               javascripts/chunks/locale/zh-HANT.bundle.js    72.1 kB      14  [emitted]         locale/zh-HANT
                               javascripts/chunks/locale/zh-HANS.bundle.js  626 bytes      15  [emitted]         locale/zh-HANS
                                    javascripts/chunks/locale/vi.bundle.js    71.3 kB      16  [emitted]         locale/vi
                                    javascripts/chunks/locale/uz.bundle.js  658 bytes      17  [emitted]         locale/uz
                                    javascripts/chunks/locale/ur.bundle.js  699 bytes      18  [emitted]         locale/ur
                                    javascripts/chunks/locale/uk.bundle.js     121 kB      19  [emitted]         locale/uk
                                    javascripts/chunks/locale/tr.bundle.js    35.2 kB      20  [emitted]         locale/tr
                                    javascripts/chunks/locale/th.bundle.js    6.26 kB      21  [emitted]         locale/th
                                    javascripts/chunks/locale/sv.bundle.js    44.2 kB      22  [emitted]         locale/sv
                                    javascripts/chunks/locale/sr.bundle.js     148 kB      23  [emitted]         locale/sr
                                    javascripts/chunks/locale/sl.bundle.js    1.61 kB      24  [emitted]         locale/sl
                                    javascripts/chunks/locale/sk.bundle.js      66 kB      25  [emitted]         locale/sk
                                    javascripts/chunks/locale/ru.bundle.js     131 kB      26  [emitted]         locale/ru
                                    javascripts/chunks/locale/ro.bundle.js    53.5 kB      27  [emitted]         locale/ro
                                 javascripts/chunks/locale/pt-PT.bundle.js      91 kB      28  [emitted]         locale/pt-PT
                                 javascripts/chunks/locale/pt-BR.bundle.js     154 kB      29  [emitted]         locale/pt-BR
                                    javascripts/chunks/locale/pl.bundle.js     121 kB      30  [emitted]         locale/pl
                                    javascripts/chunks/locale/nn.bundle.js  763 bytes      31  [emitted]         locale/nn
                                    javascripts/chunks/locale/nl.bundle.js     134 kB      32  [emitted]         locale/nl
                                 javascripts/chunks/locale/nl-NL.bundle.js    8.75 kB      33  [emitted]         locale/nl-NL
                                 javascripts/chunks/locale/nl-BE.bundle.js      16 kB      34  [emitted]         locale/nl-BE
                                    javascripts/chunks/locale/nb.bundle.js    58.4 kB      35  [emitted]         locale/nb
                                    javascripts/chunks/locale/my.bundle.js  714 bytes      36  [emitted]         locale/my
                                    javascripts/chunks/locale/ms.bundle.js    5.25 kB      37  [emitted]         locale/ms
                                    javascripts/chunks/locale/mn.bundle.js  244 bytes      38  [emitted]         locale/mn
                                 javascripts/chunks/locale/mk-MK.bundle.js    19.1 kB      39  [emitted]         locale/mk-MK
                                    javascripts/chunks/locale/mi.bundle.js  661 bytes      40  [emitted]         locale/mi
                                    javascripts/chunks/locale/lt.bundle.js    30.4 kB      41  [emitted]         locale/lt
                                    javascripts/chunks/locale/ko.bundle.js    29.1 kB      42  [emitted]         locale/ko
                                    javascripts/chunks/locale/kk.bundle.js  242 bytes      43  [emitted]         locale/kk
                                    javascripts/chunks/locale/ja.bundle.js    37.3 kB      44  [emitted]         locale/ja
                                    javascripts/chunks/locale/it.bundle.js    76.3 kB      45  [emitted]         locale/it
                                    javascripts/chunks/locale/id.bundle.js     109 kB      46  [emitted]         locale/id
                                    javascripts/chunks/locale/hu.bundle.js     102 kB      47  [emitted]         locale/hu
                                    javascripts/chunks/locale/hr.bundle.js  678 bytes      48  [emitted]         locale/hr
                                    javascripts/chunks/locale/hi.bundle.js    1.32 kB      49  [emitted]         locale/hi
                                    javascripts/chunks/locale/he.bundle.js     118 kB      50  [emitted]         locale/he
                                   javascripts/chunks/locale/haw.bundle.js  678 bytes      51  [emitted]         locale/haw
                                    javascripts/chunks/locale/gl.bundle.js    36.8 kB      52  [emitted]         locale/gl
                                    javascripts/chunks/locale/fr.bundle.js     116 kB      53  [emitted]         locale/fr
                                   javascripts/chunks/locale/fil.bundle.js    12.2 kB      54  [emitted]         locale/fil
                                    javascripts/chunks/locale/fi.bundle.js    45.7 kB      55  [emitted]         locale/fi
                                    javascripts/chunks/locale/fa.bundle.js    3.13 kB      56  [emitted]         locale/fa
                                    javascripts/chunks/locale/et.bundle.js  669 bytes      57  [emitted]         locale/et
                                 javascripts/chunks/locale/es-ES.bundle.js    70.7 kB      58  [emitted]         locale/es-ES
                                javascripts/chunks/locale/es-419.bundle.js     103 kB      59  [emitted]         locale/es-419
                                    javascripts/chunks/locale/eo.bundle.js    1.33 kB      60  [emitted]         locale/eo
                                 javascripts/chunks/locale/en-GB.bundle.js    1.81 kB      61  [emitted]         locale/en-GB
                                    javascripts/chunks/locale/el.bundle.js     163 kB      62  [emitted]         locale/el
                                 javascripts/chunks/locale/de-DE.bundle.js     143 kB      63  [emitted]         locale/de-DE
                                 javascripts/chunks/locale/de-CH.bundle.js    20.5 kB      64  [emitted]         locale/de-CH
                                 javascripts/chunks/locale/de-AT.bundle.js    36.5 kB      65  [emitted]         locale/de-AT
                                    javascripts/chunks/locale/da.bundle.js    75.2 kB      66  [emitted]         locale/da
                                    javascripts/chunks/locale/cs.bundle.js    55.8 kB      67  [emitted]         locale/cs
                                    javascripts/chunks/locale/ca.bundle.js    34.5 kB      68  [emitted]         locale/ca
                                    javascripts/chunks/locale/bg.bundle.js    25.2 kB      69  [emitted]         locale/bg
                                    javascripts/chunks/locale/az.bundle.js    1.09 kB      70  [emitted]         locale/az
                                    javascripts/chunks/locale/ar.bundle.js    11.1 kB      71  [emitted]         locale/ar
                                  javascripts/chunks/ParentsView.bundle.js    38.8 kB      72  [emitted]         ParentsView
                                 javascripts/chunks/LicensorView.bundle.js    61.3 kB      73  [emitted]         LicensorView
                             javascripts/chunks/CertificatesView.bundle.js    22.5 kB      74  [emitted]         CertificatesView
                                  javascripts/chunks/PrivacyView.bundle.js    47.5 kB      75  [emitted]         PrivacyView
                          javascripts/chunks/PremiumFeaturesView.bundle.js    19.5 kB      76  [emitted]         PremiumFeaturesView
                                 javascripts/chunks/NotFoundView.bundle.js    9.58 kB      77  [emitted]         NotFoundView
                                    javascripts/chunks/LegalView.bundle.js    13.5 kB      78  [emitted]         LegalView
                                     javascripts/chunks/HomeView.bundle.js      54 kB      79  [emitted]         HomeView
                                javascripts/chunks/CommunityView.bundle.js    14.9 kB      80  [emitted]         CommunityView
                                      javascripts/chunks/CLAView.bundle.js    13.1 kB      81  [emitted]         CLAView
                                    javascripts/chunks/AboutView.bundle.js    46.1 kB      82  [emitted]         AboutView
                     javascripts/chunks/RestrictedToTeachersView.bundle.js    11.1 kB      83  [emitted]         RestrictedToTeachersView
                     javascripts/chunks/RestrictedToStudentsView.bundle.js      11 kB      84  [emitted]         RestrictedToStudentsView
                                        javascripts/chunks/vimeo.bundle.js      55 kB      85  [emitted]         vimeo
                                                       javascripts/test.js    16.8 MB      86  [emitted]  [big]  test
                                                      stylesheets/test.css     469 kB      86  [emitted]  [big]  test
                             javascripts/app/vendor/aether-coffeescript.js    1.07 MB          [emitted]  [big]
                               javascripts/app/vendor/aether-javascript.js     666 kB          [emitted]  [big]
                                      javascripts/app/vendor/aether-lua.js     249 kB          [emitted]
                                     javascripts/app/vendor/aether-java.js     154 kB          [emitted]
                                   javascripts/app/vendor/aether-python.js     366 kB          [emitted]  [big]
                                     javascripts/app/vendor/aether-html.js     277 kB          [emitted]  [big]
                                                      javascripts/esper.js     958 kB          [emitted]  [big]
                                               javascripts/esper.modern.js     512 kB          [emitted]  [big]
                                                    javascripts/ace/ace.js     373 kB          [emitted]  [big]
                                           javascripts/ace/ext-beautify.js    3.82 kB          [emitted]
                                          javascripts/ace/ext-chromevox.js    6.36 kB          [emitted]
                              javascripts/ace/ext-elastic_tabstops_lite.js    3.84 kB          [emitted]
                                              javascripts/ace/ext-emmet.js    21.5 kB          [emitted]
                                       javascripts/ace/ext-error_marker.js  140 bytes          [emitted]
                                    javascripts/ace/ext-keybinding_menu.js    3.64 kB          [emitted]
                                     javascripts/ace/ext-language_tools.js    34.6 kB          [emitted]
                                            javascripts/ace/ext-linking.js    1.03 kB          [emitted]
                                           javascripts/ace/ext-modelist.js    3.97 kB          [emitted]
                                             javascripts/ace/ext-old_ie.js    11.9 kB          [emitted]
                                          javascripts/ace/ext-searchbox.js    11.7 kB          [emitted]
                                      javascripts/ace/ext-settings_menu.js    12.6 kB          [emitted]
                                         javascripts/ace/ext-spellcheck.js    1.44 kB          [emitted]
                                              javascripts/ace/ext-split.js    4.19 kB          [emitted]
                                   javascripts/ace/ext-static_highlight.js    2.82 kB          [emitted]
                                          javascripts/ace/ext-statusbar.js    1.09 kB          [emitted]
                                           javascripts/ace/ext-textarea.js    9.13 kB          [emitted]
                                          javascripts/ace/ext-themelist.js     1.5 kB          [emitted]
                                         javascripts/ace/ext-whitespace.js    2.89 kB          [emitted]
                                       javascripts/ace/keybinding-emacs.js    24.5 kB          [emitted]
                                         javascripts/ace/keybinding-vim.js    97.1 kB          [emitted]
                                              javascripts/ace/mode-abap.js    5.81 kB          [emitted]
                                               javascripts/ace/mode-abc.js    4.72 kB          [emitted]
                                      javascripts/ace/mode-actionscript.js    20.6 kB          [emitted]
                                               javascripts/ace/mode-ada.js    1.76 kB          [emitted]
                                       javascripts/ace/mode-apache_conf.js    13.9 kB          [emitted]
                                       javascripts/ace/mode-applescript.js    5.41 kB          [emitted]
                                          javascripts/ace/mode-asciidoc.js    8.16 kB          [emitted]
                                      javascripts/ace/mode-assembly_x86.js     8.9 kB          [emitted]
                                        javascripts/ace/mode-autohotkey.js    63.6 kB          [emitted]
                                         javascripts/ace/mode-batchfile.js    4.87 kB          [emitted]
                                               javascripts/ace/mode-bro.js    6.22 kB          [emitted]
                                             javascripts/ace/mode-c_cpp.js    11.1 kB          [emitted]
                                          javascripts/ace/mode-c9search.js    4.09 kB          [emitted]
                                             javascripts/ace/mode-cirru.js       3 kB          [emitted]
                                           javascripts/ace/mode-clojure.js    8.03 kB          [emitted]
                                             javascripts/ace/mode-cobol.js    2.31 kB          [emitted]
                                            javascripts/ace/mode-coffee.js    7.42 kB          [emitted]
                                        javascripts/ace/mode-coldfusion.js    62.6 kB          [emitted]
                                            javascripts/ace/mode-csharp.js    8.85 kB          [emitted]
                                   javascripts/ace/mode-csound_document.js    68.1 kB          [emitted]
                                  javascripts/ace/mode-csound_orchestra.js    36.9 kB          [emitted]
                                      javascripts/ace/mode-csound_score.js    7.47 kB          [emitted]
                                               javascripts/ace/mode-css.js    20.1 kB          [emitted]
                                             javascripts/ace/mode-curly.js    61.1 kB          [emitted]
                                                 javascripts/ace/mode-d.js    8.96 kB          [emitted]
                                              javascripts/ace/mode-dart.js    14.4 kB          [emitted]
                                              javascripts/ace/mode-diff.js    2.41 kB          [emitted]
                                            javascripts/ace/mode-django.js    61.4 kB          [emitted]
                                        javascripts/ace/mode-dockerfile.js    8.24 kB          [emitted]
                                               javascripts/ace/mode-dot.js    7.58 kB          [emitted]
                                            javascripts/ace/mode-drools.js    10.8 kB          [emitted]
                                            javascripts/ace/mode-eiffel.js    2.84 kB          [emitted]
                                               javascripts/ace/mode-ejs.js    70.7 kB          [emitted]
                                            javascripts/ace/mode-elixir.js    15.8 kB          [emitted]
                                               javascripts/ace/mode-elm.js    4.94 kB          [emitted]
                                            javascripts/ace/mode-erlang.js    29.7 kB          [emitted]
                                             javascripts/ace/mode-forth.js       7 kB          [emitted]
                                           javascripts/ace/mode-fortran.js    8.44 kB          [emitted]
                                               javascripts/ace/mode-ftl.js    32.5 kB          [emitted]
                                             javascripts/ace/mode-gcode.js    1.46 kB          [emitted]
                                           javascripts/ace/mode-gherkin.js    2.38 kB          [emitted]
                                         javascripts/ace/mode-gitignore.js  899 bytes          [emitted]
                                              javascripts/ace/mode-glsl.js    13.2 kB          [emitted]
                                         javascripts/ace/mode-gobstones.js    20.5 kB          [emitted]
                                            javascripts/ace/mode-golang.js    6.92 kB          [emitted]
                                     javascripts/ace/mode-graphqlschema.js    3.44 kB          [emitted]
                                            javascripts/ace/mode-groovy.js    22.6 kB          [emitted]
                                              javascripts/ace/mode-haml.js    39.4 kB          [emitted]
                                        javascripts/ace/mode-handlebars.js    61.9 kB          [emitted]
                                     javascripts/ace/mode-haskell_cabal.js    2.28 kB          [emitted]
                                           javascripts/ace/mode-haskell.js    11.5 kB          [emitted]
                                              javascripts/ace/mode-haxe.js    6.54 kB          [emitted]
                                             javascripts/ace/mode-hjson.js    5.98 kB          [emitted]
                                       javascripts/ace/mode-html_elixir.js    77.3 kB          [emitted]
                                         javascripts/ace/mode-html_ruby.js      71 kB          [emitted]
                                              javascripts/ace/mode-html.js    60.1 kB          [emitted]
                                               javascripts/ace/mode-ini.js    2.71 kB          [emitted]
                                                javascripts/ace/mode-io.js    5.67 kB          [emitted]
                                              javascripts/ace/mode-jack.js    5.77 kB          [emitted]
                                              javascripts/ace/mode-jade.js    53.3 kB          [emitted]
                                              javascripts/ace/mode-java.js    21.9 kB          [emitted]
                                        javascripts/ace/mode-javascript.js    18.2 kB          [emitted]
                                              javascripts/ace/mode-json.js    5.18 kB          [emitted]
                                            javascripts/ace/mode-jsoniq.js     233 kB          [emitted]
                                               javascripts/ace/mode-jsp.js    36.6 kB          [emitted]
                                              javascripts/ace/mode-jssm.js     5.9 kB          [emitted]
                                               javascripts/ace/mode-jsx.js    6.97 kB          [emitted]
                                             javascripts/ace/mode-julia.js    7.55 kB          [emitted]
                                            javascripts/ace/mode-kotlin.js    11.8 kB          [emitted]
                                             javascripts/ace/mode-latex.js    5.04 kB          [emitted]
                                              javascripts/ace/mode-lean.js    5.58 kB          [emitted]
                                              javascripts/ace/mode-less.js    22.2 kB          [emitted]
                                            javascripts/ace/mode-liquid.js    32.2 kB          [emitted]
                                              javascripts/ace/mode-lisp.js    1.96 kB          [emitted]
                                       javascripts/ace/mode-live_script.js      20 kB          [emitted]
                                        javascripts/ace/mode-livescript.js    4.98 kB          [emitted]
                                            javascripts/ace/mode-logiql.js    5.71 kB          [emitted]
                                               javascripts/ace/mode-lsl.js    26.6 kB          [emitted]
                                               javascripts/ace/mode-lua.js    7.29 kB          [emitted]
                                           javascripts/ace/mode-luapage.js    68.5 kB          [emitted]
                                            javascripts/ace/mode-lucene.js    1.17 kB          [emitted]
                                          javascripts/ace/mode-makefile.js    6.56 kB          [emitted]
                                          javascripts/ace/mode-markdown.js      67 kB          [emitted]
                                              javascripts/ace/mode-mask.js    42.3 kB          [emitted]
                                            javascripts/ace/mode-matlab.js    20.6 kB          [emitted]
                                              javascripts/ace/mode-maze.js    4.89 kB          [emitted]
                                               javascripts/ace/mode-mel.js    24.9 kB          [emitted]
                                    javascripts/ace/mode-mips_assembler.js    5.96 kB          [emitted]
                                     javascripts/ace/mode-mipsassembler.js    3.19 kB          [emitted]
                                          javascripts/ace/mode-mushcode.js    6.71 kB          [emitted]
                                             javascripts/ace/mode-mysql.js    6.52 kB          [emitted]
                                               javascripts/ace/mode-nix.js    13.3 kB          [emitted]
                                              javascripts/ace/mode-nsis.js    10.1 kB          [emitted]
                                        javascripts/ace/mode-objectivec.js    54.7 kB          [emitted]
                                             javascripts/ace/mode-ocaml.js    15.6 kB          [emitted]
                                            javascripts/ace/mode-pascal.js    4.56 kB          [emitted]
                                              javascripts/ace/mode-perl.js    7.39 kB          [emitted]
                                             javascripts/ace/mode-pgsql.js    56.1 kB          [emitted]
                                               javascripts/ace/mode-php.js     473 kB          [emitted]  [big]
                                               javascripts/ace/mode-pig.js    6.32 kB          [emitted]
                                        javascripts/ace/mode-plain_text.js  506 bytes          [emitted]
                                        javascripts/ace/mode-powershell.js    32.7 kB          [emitted]
                                             javascripts/ace/mode-praat.js    10.3 kB          [emitted]
                                            javascripts/ace/mode-prolog.js    8.38 kB          [emitted]
                                        javascripts/ace/mode-properties.js     1.1 kB          [emitted]
                                          javascripts/ace/mode-protobuf.js    12.8 kB          [emitted]
                                            javascripts/ace/mode-python.js    4.69 kB          [emitted]
                                                 javascripts/ace/mode-r.js       5 kB          [emitted]
                                             javascripts/ace/mode-razor.js    67.2 kB          [emitted]
                                              javascripts/ace/mode-rdoc.js    4.69 kB          [emitted]
                                               javascripts/ace/mode-red.js    12.6 kB          [emitted]
                                             javascripts/ace/mode-rhtml.js    65.1 kB          [emitted]
                                               javascripts/ace/mode-rst.js    3.02 kB          [emitted]
                                              javascripts/ace/mode-ruby.js    10.1 kB          [emitted]
                                              javascripts/ace/mode-rust.js    6.53 kB          [emitted]
                                              javascripts/ace/mode-sass.js    11.6 kB          [emitted]
                                              javascripts/ace/mode-scad.js    6.52 kB          [emitted]
                                             javascripts/ace/mode-scala.js    22.8 kB          [emitted]
                                            javascripts/ace/mode-scheme.js    3.66 kB          [emitted]
                                              javascripts/ace/mode-scss.js    14.3 kB          [emitted]
                                                javascripts/ace/mode-sh.js     7.2 kB          [emitted]
                                               javascripts/ace/mode-sjs.js    21.4 kB          [emitted]
                                            javascripts/ace/mode-smarty.js    63.5 kB          [emitted]
                                          javascripts/ace/mode-snippets.js    3.69 kB          [emitted]
                                      javascripts/ace/mode-soy_template.js    68.6 kB          [emitted]
                                             javascripts/ace/mode-space.js    2.24 kB          [emitted]
                                            javascripts/ace/mode-sparql.js    7.87 kB          [emitted]
                                               javascripts/ace/mode-sql.js    1.84 kB          [emitted]
                                         javascripts/ace/mode-sqlserver.js    16.4 kB          [emitted]
                                            javascripts/ace/mode-stylus.js    14.3 kB          [emitted]
                                               javascripts/ace/mode-svg.js    32.1 kB          [emitted]
                                             javascripts/ace/mode-swift.js    6.94 kB          [emitted]
                                              javascripts/ace/mode-swig.js    31.2 kB          [emitted]
                                               javascripts/ace/mode-tcl.js    6.13 kB          [emitted]
                                               javascripts/ace/mode-tex.js    2.76 kB          [emitted]
                                              javascripts/ace/mode-text.js    0 bytes          [emitted]
                                           javascripts/ace/mode-textile.js    2.09 kB          [emitted]
                                              javascripts/ace/mode-toml.js     2.2 kB          [emitted]
                                               javascripts/ace/mode-tsx.js    20.7 kB          [emitted]
                                            javascripts/ace/mode-turtle.js    5.03 kB          [emitted]
                                              javascripts/ace/mode-twig.js    63.7 kB          [emitted]
                                        javascripts/ace/mode-typescript.js    20.3 kB          [emitted]
                                              javascripts/ace/mode-vala.js    16.6 kB          [emitted]
                                          javascripts/ace/mode-vbscript.js    5.07 kB          [emitted]
                                          javascripts/ace/mode-velocity.js    64.8 kB          [emitted]
                                           javascripts/ace/mode-verilog.js    2.69 kB          [emitted]
                                              javascripts/ace/mode-vhdl.js    2.09 kB          [emitted]
                                            javascripts/ace/mode-wollok.js    20.4 kB          [emitted]
                                               javascripts/ace/mode-xml.js    11.8 kB          [emitted]
                                            javascripts/ace/mode-xquery.js     231 kB          [emitted]
                                              javascripts/ace/mode-yaml.js    4.36 kB          [emitted]
                                          javascripts/ace/snippets/abap.js  131 bytes          [emitted]
                                           javascripts/ace/snippets/abc.js  947 bytes          [emitted]
                                  javascripts/ace/snippets/actionscript.js    2.97 kB          [emitted]
                                           javascripts/ace/snippets/ada.js  129 bytes          [emitted]
                                   javascripts/ace/snippets/apache_conf.js  145 bytes          [emitted]
                                   javascripts/ace/snippets/applescript.js  145 bytes          [emitted]
                                      javascripts/ace/snippets/asciidoc.js  139 bytes          [emitted]
                                  javascripts/ace/snippets/assembly_x86.js  147 bytes          [emitted]
                                    javascripts/ace/snippets/autohotkey.js  143 bytes          [emitted]
                                     javascripts/ace/snippets/batchfile.js  141 bytes          [emitted]
                                           javascripts/ace/snippets/bro.js  126 bytes          [emitted]
                                         javascripts/ace/snippets/c_cpp.js    2.66 kB          [emitted]
                                      javascripts/ace/snippets/c9search.js  139 bytes          [emitted]
                                         javascripts/ace/snippets/cirru.js  133 bytes          [emitted]
                                       javascripts/ace/snippets/clojure.js    2.04 kB          [emitted]
                                         javascripts/ace/snippets/cobol.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/coffee.js    2.23 kB          [emitted]
                                    javascripts/ace/snippets/coldfusion.js  143 bytes          [emitted]
                                        javascripts/ace/snippets/csharp.js  135 bytes          [emitted]
                               javascripts/ace/snippets/csound_document.js  302 bytes          [emitted]
                              javascripts/ace/snippets/csound_orchestra.js    1.07 kB          [emitted]
                                  javascripts/ace/snippets/csound_score.js  147 bytes          [emitted]
                                           javascripts/ace/snippets/css.js    19.6 kB          [emitted]
                                         javascripts/ace/snippets/curly.js  133 bytes          [emitted]
                                             javascripts/ace/snippets/d.js  125 bytes          [emitted]
                                          javascripts/ace/snippets/dart.js    1.32 kB          [emitted]
                                          javascripts/ace/snippets/diff.js  551 bytes          [emitted]
                                                      apcsp-local/index.md   86 bytes          [emitted]
                                                   apcsp-local/nested/1.md   22 bytes          [emitted]
                                                              channel.html   59 bytes          [emitted]
                                                    dexecure-c167a5675c.js    2.27 kB          [emitted]
                        fonts/_ySUJH_bn48VBG8sNSi3USBnSvpkopQaUR-2r7iU.ttf     221 kB          [emitted]
                        fonts/702ZOKiLJc3WVjuplzC3USBnSvpkopQaUR-2r7iU.ttf     224 kB          [emitted]
                                                         fonts/cousine.css  776 bytes          [emitted]
                                          fonts/cousine/Apache License.txt    11.3 kB          [emitted]
                                            fonts/cousine/Cousine-Bold.ttf     297 kB          [emitted]  [big]
                                      fonts/cousine/Cousine-BoldItalic.ttf     273 kB          [emitted]  [big]
                                          fonts/cousine/Cousine-Italic.ttf     271 kB          [emitted]  [big]
                                         fonts/cousine/Cousine-Regular.ttf     309 kB          [emitted]  [big]
                        fonts/FxslNkTTHtojXrkp-xBEM87DM3yorPOrvA-vB930.ttf     265 kB          [emitted]  [big]
                                    fonts/glyphicons-halflings-regular.eot    20.3 kB          [emitted]
                                    fonts/glyphicons-halflings-regular.svg    62.9 kB          [emitted]
                                    fonts/glyphicons-halflings-regular.ttf    41.3 kB          [emitted]
                                   fonts/glyphicons-halflings-regular.woff    23.3 kB          [emitted]
                                                        fonts/openSans.css  430 bytes          [emitted]
                                               fonts/openSansCondensed.css  240 bytes          [emitted]
                      images/achievements/achievement_background_light.png     2.6 kB          [emitted]
                     images/achievements/achievement_background_locked.png    2.26 kB          [emitted]
                            images/achievements/achievement_background.png    2.65 kB          [emitted]
                                        images/achievements/bar_border.png     1.2 kB          [emitted]
                             images/achievements/border_diamond_locked.png    16.1 kB          [emitted]
                                    images/achievements/border_diamond.png    22.8 kB          [emitted]
                                images/achievements/border_gold_locked.png    6.28 kB          [emitted]
                                       images/achievements/border_gold.png    9.31 kB          [emitted]
                              images/achievements/border_silver_locked.png    5.96 kB          [emitted]
                                     images/achievements/border_silver.png    8.65 kB          [emitted]
                               images/achievements/border_stone_locked.png    5.35 kB          [emitted]
                                      images/achievements/border_stone.png    7.38 kB          [emitted]
                                images/achievements/border_wood_locked.png    7.39 kB          [emitted]
                                       images/achievements/border_wood.png    11.4 kB          [emitted]
                                          images/achievements/cross-01.png    4.64 kB          [emitted]
                                            images/achievements/cup-01.png    4.02 kB          [emitted]
                                            images/achievements/cup-02.png    7.35 kB          [emitted]
                                           images/achievements/default.png    9.04 kB          [emitted]
                                          images/achievements/level-bg.png    1.19 kB          [emitted]
                                        images/achievements/message-01.png  619 bytes          [emitted]
                                          images/achievements/patch-01.png    4.32 kB          [emitted]
                                        images/achievements/pendant-01.png    5.98 kB          [emitted]
                                         images/achievements/scroll-01.png    5.13 kB          [emitted]
                                              images/achievements/star.png    8.19 kB          [emitted]
                                         images/achievements/swords-01.png    4.73 kB          [emitted]
                                      images/Adobe_PDF_file_icon_32x32.png  917 bytes          [emitted]
                         images/common/button-background-active-border.png    17.4 kB          [emitted]
                                images/common/button-background-active.png     2.4 kB          [emitted]
                  images/common/button-background-danger-active-border.png  705 bytes          [emitted]
                         images/common/button-background-danger-active.png  811 bytes          [emitted]
                images/common/button-background-danger-disabled-border.png  704 bytes          [emitted]
                       images/common/button-background-danger-disabled.png  811 bytes          [emitted]
                 images/common/button-background-danger-pressed-border.png  705 bytes          [emitted]
                        images/common/button-background-danger-pressed.png  810 bytes          [emitted]
                       images/common/button-background-disabled-border.png      17 kB          [emitted]
                              images/common/button-background-disabled.png    1.47 kB          [emitted]
                        images/common/button-background-pressed-border.png    17.3 kB          [emitted]
                               images/common/button-background-pressed.png    2.53 kB          [emitted]
                 images/common/button-background-primary-active-border.png  704 bytes          [emitted]
                        images/common/button-background-primary-active.png  810 bytes          [emitted]
               images/common/button-background-primary-disabled-border.png  704 bytes          [emitted]
                      images/common/button-background-primary-disabled.png  811 bytes          [emitted]
                images/common/button-background-primary-pressed-border.png  704 bytes          [emitted]
                       images/common/button-background-primary-pressed.png  811 bytes          [emitted]
                 images/common/button-background-success-active-border.png  704 bytes          [emitted]
                        images/common/button-background-success-active.png  811 bytes          [emitted]
               images/common/button-background-success-inactive-border.png  705 bytes          [emitted]
                      images/common/button-background-success-inactive.png  811 bytes          [emitted]
                images/common/button-background-success-pressed-border.png  704 bytes          [emitted]
                       images/common/button-background-success-pressed.png  811 bytes          [emitted]
                 images/common/button-background-warning-active-border.png  705 bytes          [emitted]
                        images/common/button-background-warning-active.png  811 bytes          [emitted]
               images/common/button-background-warning-disabled-border.png  704 bytes          [emitted]
                      images/common/button-background-warning-disabled.png  811 bytes          [emitted]
                images/common/button-background-warning-pressed-border.png  703 bytes          [emitted]
                       images/common/button-background-warning-pressed.png  811 bytes          [emitted]
                                 images/common/button-create-new-class.png    3.37 kB          [emitted]
                                images/common/button-finish-signing-up.png    3.31 kB          [emitted]
                                      images/common/button-get-started.png    2.65 kB          [emitted]
                                 images/common/button-go-to-my-classes.png    3.53 kB          [emitted]
                                   images/common/code_languages/c_icon.png  227 bytes          [emitted]
                                  images/common/code_languages/c_small.png     2.9 kB          [emitted]
                             images/common/code_languages/clojure_icon.png  194 bytes          [emitted]
                            images/common/code_languages/clojure_small.png    3.87 kB          [emitted]
                        images/common/code_languages/coffeescript_icon.png  174 bytes          [emitted]
                       images/common/code_languages/coffeescript_small.png    3.34 kB          [emitted]
                                 images/common/code_languages/cpp_icon.png  231 bytes          [emitted]
                                images/common/code_languages/cpp_small.png    2.84 kB          [emitted]
                              images/common/code_languages/csharp_icon.png  217 bytes          [emitted]
                             images/common/code_languages/csharp_small.png     2.7 kB          [emitted]
                                  images/common/code_languages/go_icon.png  165 bytes          [emitted]
                                 images/common/code_languages/go_small.png    2.88 kB          [emitted]
                                  images/common/code_languages/io_icon.png  163 bytes          [emitted]
                                 images/common/code_languages/io_small.png    2.36 kB          [emitted]
                                images/common/code_languages/java_icon.png  197 bytes          [emitted]
                               images/common/code_languages/java_small.png    3.23 kB          [emitted]
                          images/common/code_languages/javascript_icon.png  157 bytes          [emitted]
                         images/common/code_languages/javascript_small.png    2.11 kB          [emitted]
                                 images/common/code_languages/lua_icon.png  132 bytes          [emitted]
                                images/common/code_languages/lua_small.png     2.9 kB          [emitted]
                                 images/common/code_languages/php_icon.png  218 bytes          [emitted]
                                        javascripts/ace/snippets/django.js       4 kB          [emitted]
                                    javascripts/ace/snippets/dockerfile.js  143 bytes          [emitted]
                                           javascripts/ace/snippets/dot.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/drools.js  370 bytes          [emitted]
                                        javascripts/ace/snippets/eiffel.js  135 bytes          [emitted]
                                           javascripts/ace/snippets/ejs.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/elixir.js  129 bytes          [emitted]
                                           javascripts/ace/snippets/elm.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/erlang.js    3.57 kB          [emitted]
                                         javascripts/ace/snippets/forth.js  133 bytes          [emitted]
                                       javascripts/ace/snippets/fortran.js  137 bytes          [emitted]
                                           javascripts/ace/snippets/ftl.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/gcode.js  133 bytes          [emitted]
                                       javascripts/ace/snippets/gherkin.js  137 bytes          [emitted]
                                     javascripts/ace/snippets/gitignore.js  141 bytes          [emitted]
                                          javascripts/ace/snippets/glsl.js  131 bytes          [emitted]
                                     javascripts/ace/snippets/gobstones.js  607 bytes          [emitted]
                                          javascripts/ace/snippets/haml.js  448 bytes          [emitted]
                                    javascripts/ace/snippets/handlebars.js  143 bytes          [emitted]
                                 javascripts/ace/snippets/haskell_cabal.js  149 bytes          [emitted]
                                       javascripts/ace/snippets/haskell.js    1.98 kB          [emitted]
                                          javascripts/ace/snippets/haxe.js  131 bytes          [emitted]
                                         javascripts/ace/snippets/hjson.js  128 bytes          [emitted]
                                   javascripts/ace/snippets/html_elixir.js  145 bytes          [emitted]
                                     javascripts/ace/snippets/html_ruby.js  141 bytes          [emitted]
                                          javascripts/ace/snippets/html.js    19.1 kB          [emitted]
                                           javascripts/ace/snippets/ini.js  129 bytes          [emitted]
                                            javascripts/ace/snippets/io.js    1.22 kB          [emitted]
                                          javascripts/ace/snippets/jack.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/jade.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/java.js    4.32 kB          [emitted]
                                    javascripts/ace/snippets/javascript.js    3.84 kB          [emitted]
                                          javascripts/ace/snippets/json.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/jsoniq.js    1.72 kB          [emitted]
                                           javascripts/ace/snippets/jsp.js    2.78 kB          [emitted]
                                          javascripts/ace/snippets/jssm.js  127 bytes          [emitted]
                                           javascripts/ace/snippets/jsx.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/julia.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/kotlin.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/latex.js  133 bytes          [emitted]
                                          javascripts/ace/snippets/lean.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/less.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/liquid.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/lisp.js  131 bytes          [emitted]
                                   javascripts/ace/snippets/live_script.js  134 bytes          [emitted]
                                    javascripts/ace/snippets/livescript.js  143 bytes          [emitted]
                                        javascripts/ace/snippets/logiql.js  135 bytes          [emitted]
                                           javascripts/ace/snippets/lsl.js    35.4 kB          [emitted]
                                           javascripts/ace/snippets/lua.js  508 bytes          [emitted]
                                       javascripts/ace/snippets/luapage.js  137 bytes          [emitted]
                                        javascripts/ace/snippets/lucene.js  135 bytes          [emitted]
                                      javascripts/ace/snippets/makefile.js  198 bytes          [emitted]
                                      javascripts/ace/snippets/markdown.js    1.97 kB          [emitted]
                                          javascripts/ace/snippets/mask.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/matlab.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/maze.js  270 bytes          [emitted]
                                           javascripts/ace/snippets/mel.js  129 bytes          [emitted]
                                javascripts/ace/snippets/mips_assembler.js  151 bytes          [emitted]
                                 javascripts/ace/snippets/mipsassembler.js  136 bytes          [emitted]
                                      javascripts/ace/snippets/mushcode.js  139 bytes          [emitted]
                                         javascripts/ace/snippets/mysql.js  133 bytes          [emitted]
                                           javascripts/ace/snippets/nix.js  129 bytes          [emitted]
                                          javascripts/ace/snippets/nsis.js  127 bytes          [emitted]
                                    javascripts/ace/snippets/objectivec.js  143 bytes          [emitted]
                                         javascripts/ace/snippets/ocaml.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/pascal.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/perl.js    5.51 kB          [emitted]
                                         javascripts/ace/snippets/pgsql.js  133 bytes          [emitted]
                                           javascripts/ace/snippets/php.js    6.76 kB          [emitted]
                                           javascripts/ace/snippets/pig.js  129 bytes          [emitted]
                                    javascripts/ace/snippets/plain_text.js  143 bytes          [emitted]
                                    javascripts/ace/snippets/powershell.js  143 bytes          [emitted]
                                         javascripts/ace/snippets/praat.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/prolog.js  135 bytes          [emitted]
                                    javascripts/ace/snippets/properties.js  143 bytes          [emitted]
                                      javascripts/ace/snippets/protobuf.js  132 bytes          [emitted]
                                        javascripts/ace/snippets/python.js    3.67 kB          [emitted]
                                             javascripts/ace/snippets/r.js    2.63 kB          [emitted]
                                         javascripts/ace/snippets/razor.js  164 bytes          [emitted]
                                          javascripts/ace/snippets/rdoc.js  131 bytes          [emitted]
                                           javascripts/ace/snippets/red.js  123 bytes          [emitted]
                                         javascripts/ace/snippets/rhtml.js  133 bytes          [emitted]
                                           javascripts/ace/snippets/rst.js  442 bytes          [emitted]
                                          javascripts/ace/snippets/ruby.js    21.3 kB          [emitted]
                                          javascripts/ace/snippets/rust.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/sass.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/scad.js  131 bytes          [emitted]
                                         javascripts/ace/snippets/scala.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/scheme.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/scss.js  131 bytes          [emitted]
                                            javascripts/ace/snippets/sh.js    2.05 kB          [emitted]
                                           javascripts/ace/snippets/sjs.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/smarty.js  135 bytes          [emitted]
                                      javascripts/ace/snippets/snippets.js  297 bytes          [emitted]
                                  javascripts/ace/snippets/soy_template.js  147 bytes          [emitted]
                                         javascripts/ace/snippets/space.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/sparql.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/groovy.js  135 bytes          [emitted]
                                 javascripts/ace/snippets/graphqlschema.js  662 bytes          [emitted]
                                        javascripts/ace/snippets/golang.js  135 bytes          [emitted]
                                images/common/code_languages/php_small.png    2.56 kB          [emitted]
                              images/common/code_languages/python_icon.png  188 bytes          [emitted]
                             images/common/code_languages/python_small.png    3.28 kB          [emitted]
                                images/common/code_languages/ruby_icon.png  254 bytes          [emitted]
                               images/common/code_languages/ruby_small.png    2.51 kB          [emitted]
                               images/common/code_languages/swift_icon.png  170 bytes          [emitted]
                              images/common/code_languages/swift_small.png    2.14 kB          [emitted]
                                images/common/codeplay/CodePlay_Lockup.png    90.9 kB          [emitted]
                                       images/common/codeplay/CodePlay.png    80.2 kB          [emitted]
        images/common/codeplay/DE_ChooseHeroPage_Ideapad710s_800x90_DE.png    65.2 kB          [emitted]
                images/common/codeplay/DE_InLevelPage_Y700_1132X283_DE.png    76.4 kB          [emitted]
               images/common/codeplay/DE_LevelsPage_MIIX510_160x480_DE.png    88.2 kB          [emitted]
                 images/common/codeplay/DE_VictoryPage_Y910_735x100_DE.png    58.5 kB          [emitted]
           images/common/codeplay/MX_ChooseHeroPage_YogaBook_800x90_MX.png    55.3 kB          [emitted]
                images/common/codeplay/MX_InLevelPage_Y700_1132X283_MX.png    89.7 kB          [emitted]
                   images/common/codeplay/MX_LevelsPage_910_160x480_MX.png    91.7 kB          [emitted]
             images/common/codeplay/MX_VictoryPage_YogaBook_735x100_MX.png    46.3 kB          [emitted]
               images/common/codeplay/NA_ChooseHeroPage_Yoga520_800x90.png    47.9 kB          [emitted]
     images/common/codeplay/NA_InLevelPage_Y700_1132X283_ingameProduct.png    65.6 kB          [emitted]
                     images/common/codeplay/NA_LevelsPage_Cube_160x480.png      67 kB          [emitted]
        images/common/codeplay/NA_VictoryPage_Y710_735x100_VictoryPage.png    46.7 kB          [emitted]
                               images/common/codeplay/SweepstakesEntry.png      15 kB          [emitted]
               images/common/codeplay/UK_ChooseHeroPage_Yoga510_800x90.png    47.2 kB          [emitted]
     images/common/codeplay/UK_InLevelPage_Y700_1132X283_ingameProduct.png    65.6 kB          [emitted]
                     images/common/codeplay/UK_LevelsPage_Cube_160x480.png    73.1 kB          [emitted]
     images/common/codeplay/UK_VictoryPage_Miix510_735x100_VictoryPage.png      39 kB          [emitted]
                                                     images/common/gem.png    3.13 kB          [emitted]
           images/common/lang-nl/button-background-ideal-active-border.png    5.36 kB          [emitted]
                                        images/common/particles/bullet.png  443 bytes          [emitted]
                                       images/common/particles/bullet2.png    1.42 kB          [emitted]
                                   images/common/particles/cloud_small.png    7.33 kB          [emitted]
                                         images/common/particles/cloud.png    78.4 kB          [emitted]
                                         images/common/particles/smoke.png    14.2 kB          [emitted]
                                          images/common/particles/star.png    3.62 kB          [emitted]
                                                        images/favicon.ico  461 bytes          [emitted]
                                                   images/generic-icon.png    2.49 kB          [emitted]
                            images/level/code_editor_background_border.png    25.9 kB          [emitted]
                                   images/level/code_editor_background.png    32.3 kB          [emitted]
                       images/level/code_editor_error_background_arrow.png  825 bytes          [emitted]
                             images/level/code_editor_error_background.png    4.61 kB          [emitted]
                              images/level/code_editor_info_background.png    10.4 kB          [emitted]
                                images/level/code_editor_top_bar_hinge.png  478 bytes          [emitted]
                      images/level/code_editor_top_bar_wood_background.png    13.3 kB          [emitted]
                           images/level/code_editor_warning_background.png    9.58 kB          [emitted]
                             images/level/code_palette_wood_background.png    44.9 kB          [emitted]
                                  images/level/code_toolbar_background.png       6 kB          [emitted]
                   images/level/code_toolbar_run_button_active_pressed.png    3.35 kB          [emitted]
                           images/level/code_toolbar_run_button_active.png    3.46 kB          [emitted]
                     images/level/code_toolbar_run_button_zazz_pressed.png    3.67 kB          [emitted]
                             images/level/code_toolbar_run_button_zazz.png    3.74 kB          [emitted]
                images/level/code_toolbar_submit_button_active_pressed.png    3.74 kB          [emitted]
                        images/level/code_toolbar_submit_button_active.png    3.84 kB          [emitted]
                  images/level/code_toolbar_submit_button_zazz_pressed.png    3.95 kB          [emitted]
                          images/level/code_toolbar_submit_button_zazz.png       4 kB          [emitted]
                                   images/level/control_bar_background.png    24.4 kB          [emitted]
                                     images/level/control_bar_cap_left.png    10.6 kB          [emitted]
                                    images/level/control_bar_cap_right.png    8.29 kB          [emitted]
                                 images/level/control_bar_chain_center.png      11 kB          [emitted]
                                  images/level/control_bar_chain_right.png    15.7 kB          [emitted]
                        images/level/control_bar_level_name_background.png    6.36 kB          [emitted]
                                images/level/csedweek-logo-final-small.jpg    52.7 kB          [emitted]
                                      images/level/dialogue_background.png    8.74 kB          [emitted]
                                        images/level/footer_background.jpg     137 kB          [emitted]
                             images/level/goals_background_with_scores.png    9.92 kB          [emitted]
                                         images/level/goals_background.png    4.86 kB          [emitted]
                                          images/level/gold_background.png    1.28 kB          [emitted]
                                                images/level/gold_icon.png    1.15 kB          [emitted]
                                           images/level/hud_background.png    5.04 kB          [emitted]
                                                images/level/hud_hinge.png  973 bytes          [emitted]
                                           images/level/hud_info_icons.png    6.15 kB          [emitted]
                                      images/level/hud_wood_background.png    18.5 kB          [emitted]
                                         images/level/loading_bar_back.png  299 bytes          [emitted]
                                         images/level/loading_bar_fill.png  514 bytes          [emitted]
                                          images/level/loading_bar_rim.png    25.7 kB          [emitted]
                                   images/level/loading_left_wing_1366.jpg     111 kB          [emitted]
                                   images/level/loading_left_wing_1920.jpg     175 kB          [emitted]
                                  images/level/loading_right_wing_1366.jpg     107 kB          [emitted]
                                  images/level/loading_right_wing_1920.jpg     168 kB          [emitted]
                                                  images/level/pointer.png      13 kB          [emitted]
                                       images/level/popover_background.png    1.88 kB          [emitted]
                                images/level/popover_border_background.png  988 bytes          [emitted]
                                      images/level/scrubber_background.png    5.88 kB          [emitted]
                                          images/level/scrubber_groove.png    1.25 kB          [emitted]
                                            images/level/scrubber_knob.png    2.29 kB          [emitted]
                                       images/level/thang_avatar_frame.png    3.53 kB          [emitted]
                                                  images/level/victory.png    92.7 kB          [emitted]
                                             images/level/wood_texture.png      57 kB          [emitted]
                                                  images/loading_image.png    23.8 kB          [emitted]
                                                 images/minecraft/bans.jpg     104 kB          [emitted]
                                                 images/minecraft/dirt.png  266 bytes          [emitted]
                                           images/minecraft/grass_side.png  408 bytes          [emitted]
                                            images/minecraft/grass_top.png    15.3 kB          [emitted]
                                                images/minecraft/hans4.png     108 kB          [emitted]
                                      images/minecraft/icon_stone_pick.png    20.9 kB          [emitted]
                                       images/pages/about/bracket_left.png    2.74 kB          [emitted]
                                      images/pages/about/bracket_right.png    2.76 kB          [emitted]
                                       images/pages/about/bryukh_small.png    6.45 kB          [emitted]
                                       images/pages/about/carlos_small.png    8.39 kB          [emitted]
                               images/pages/about/character_silouhette.png    8.04 kB          [emitted]
                     images/pages/about/codebackground_zoom_compressed.png    1.29 MB          [emitted]  [big]
                                           javascripts/ace/snippets/sql.js  942 bytes          [emitted]
                                     javascripts/ace/snippets/sqlserver.js    2.14 kB          [emitted]
                                        javascripts/ace/snippets/stylus.js  135 bytes          [emitted]
                                           javascripts/ace/snippets/svg.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/swift.js  133 bytes          [emitted]
                                       javascripts/chunks/editor.bundle.js     633 kB       1  [emitted]  [big]  editor
                                           javascripts/ace/snippets/tcl.js    1.69 kB          [emitted]
                                           javascripts/ace/snippets/tex.js    3.64 kB          [emitted]
                                          javascripts/ace/snippets/text.js  131 bytes          [emitted]
                                       javascripts/ace/snippets/textile.js  540 bytes          [emitted]
                                          javascripts/ace/snippets/toml.js  131 bytes          [emitted]
                                           javascripts/ace/snippets/tsx.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/turtle.js  129 bytes          [emitted]
                                          javascripts/ace/snippets/twig.js  131 bytes          [emitted]
                                    javascripts/ace/snippets/typescript.js  143 bytes          [emitted]
                                          javascripts/ace/snippets/vala.js    3.13 kB          [emitted]
                                      javascripts/ace/snippets/vbscript.js  139 bytes          [emitted]
                                      javascripts/ace/snippets/velocity.js  651 bytes          [emitted]
                                       javascripts/ace/snippets/verilog.js  137 bytes          [emitted]
                                          javascripts/ace/snippets/vhdl.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/wollok.js    1.26 kB          [emitted]
                                           javascripts/ace/snippets/xml.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/xquery.js    1.72 kB          [emitted]
                                          javascripts/ace/snippets/yaml.js  131 bytes          [emitted]
                                         javascripts/ace/theme-ambiance.js    27.8 kB          [emitted]
                                            javascripts/ace/theme-chaos.js    2.84 kB          [emitted]
                                           javascripts/ace/theme-chrome.js    2.71 kB          [emitted]
                                  javascripts/ace/theme-clouds_midnight.js    2.43 kB          [emitted]
                                           javascripts/ace/theme-clouds.js    2.08 kB          [emitted]
                                           javascripts/ace/theme-cobalt.js    2.35 kB          [emitted]
                                   javascripts/ace/theme-crimson_editor.js    2.81 kB          [emitted]
                                             javascripts/ace/theme-dawn.js    2.24 kB          [emitted]
                                          javascripts/ace/theme-dracula.js    2.29 kB          [emitted]
                                      javascripts/ace/theme-dreamweaver.js    3.14 kB          [emitted]
                                          javascripts/ace/theme-eclipse.js    2.13 kB          [emitted]
                                           javascripts/ace/theme-github.js    2.18 kB          [emitted]
                                              javascripts/ace/theme-gob.js    2.38 kB          [emitted]
                                          javascripts/ace/theme-gruvbox.js    1.67 kB          [emitted]
                                     javascripts/ace/theme-idle_fingers.js    2.25 kB          [emitted]
                                         javascripts/ace/theme-iplastic.js    6.48 kB          [emitted]
                                      javascripts/ace/theme-katzenmilch.js    3.13 kB          [emitted]
                                         javascripts/ace/theme-kr_theme.js     2.3 kB          [emitted]
                                           javascripts/ace/theme-kuroir.js    2.05 kB          [emitted]
                                   javascripts/ace/theme-merbivore_soft.js    2.45 kB          [emitted]
                                        javascripts/ace/theme-merbivore.js    2.24 kB          [emitted]
                                  javascripts/ace/theme-mono_industrial.js    2.79 kB          [emitted]
                                          javascripts/ace/theme-monokai.js    2.38 kB          [emitted]
                                   javascripts/ace/theme-pastel_on_dark.js    2.63 kB          [emitted]
                                   javascripts/ace/theme-solarized_dark.js    2.31 kB          [emitted]
                                  javascripts/ace/theme-solarized_light.js    2.36 kB          [emitted]
                                        javascripts/ace/theme-sqlserver.js    2.89 kB          [emitted]
                                         javascripts/ace/theme-terminal.js    2.91 kB          [emitted]
                                         javascripts/ace/theme-textmate.js    2.58 kB          [emitted]
                              javascripts/ace/theme-tomorrow_night_blue.js    3.03 kB          [emitted]
                            javascripts/ace/theme-tomorrow_night_bright.js     3.5 kB          [emitted]
                          javascripts/ace/theme-tomorrow_night_eighties.js    3.22 kB          [emitted]
                                   javascripts/ace/theme-tomorrow_night.js    2.82 kB          [emitted]
                                         javascripts/ace/theme-tomorrow.js    2.56 kB          [emitted]
                                         javascripts/ace/theme-twilight.js     2.5 kB          [emitted]
                                      javascripts/ace/theme-vibrant_ink.js     2.2 kB          [emitted]
                                            javascripts/ace/theme-xcode.js    1.92 kB          [emitted]
                                          javascripts/ace/worker-coffee.js     191 kB          [emitted]
                                             javascripts/ace/worker-css.js     141 kB          [emitted]
                                            javascripts/ace/worker-html.js     217 kB          [emitted]
                                      javascripts/ace/worker-javascript.js     165 kB          [emitted]
                                            javascripts/ace/worker-json.js    32.9 kB          [emitted]
                                             javascripts/ace/worker-lua.js    47.1 kB          [emitted]
                                             javascripts/ace/worker-php.js    78.3 kB          [emitted]
                                             javascripts/ace/worker-xml.js    55.5 kB          [emitted]
                                          javascripts/ace/worker-xquery.js    1.63 MB          [emitted]  [big]
                                      images/pages/about/daniela_small.png    22.4 kB          [emitted]
                                             images/pages/about/desert.jpg     160 kB          [emitted]
                                             images/pages/about/desert.png     498 kB          [emitted]  [big]
                                            images/pages/about/dungeon.jpg    98.3 kB          [emitted]
                                            images/pages/about/dungeon.png     466 kB          [emitted]  [big]
                                             images/pages/about/forest.jpg     239 kB          [emitted]
                                             images/pages/about/forest.png     783 kB          [emitted]  [big]
                                       images/pages/about/george_small.png    7.49 kB          [emitted]
                                     images/pages/about/github_avatars.png     301 kB          [emitted]  [big]
                                             images/pages/about/github.png    6.66 kB          [emitted]
                                            images/pages/about/glacier.jpg     218 kB          [emitted]
                                            images/pages/about/glacier.png    1.04 MB          [emitted]  [big]
                                        images/pages/about/globe_green.png    11.2 kB          [emitted]
                                        images/pages/about/globe_white.png    8.09 kB          [emitted]
                                         images/pages/about/jose_small.png    8.44 kB          [emitted]
                                         images/pages/about/josh_small.png    7.63 kB          [emitted]
                                   images/pages/about/languages_group1.png    10.6 kB          [emitted]
                                   images/pages/about/languages_group2.png    9.28 kB          [emitted]
                                          images/pages/about/languages.png    19.9 kB          [emitted]
                                      images/pages/about/michael_small.png    6.53 kB          [emitted]
                                   images/pages/about/new_languages_xs.png    48.2 kB          [emitted]
                                      images/pages/about/new_languages.png    49.6 kB          [emitted]
                                         images/pages/about/oleg_small.png    7.25 kB          [emitted]
                                        images/pages/about/pavel_small.png    8.12 kB          [emitted]
                                        images/pages/about/placeholder.png    8.82 kB          [emitted]
                                  images/pages/about/screenshot_desert.png     114 kB          [emitted]
                                 images/pages/about/screenshot_dungeon.png    90.9 kB          [emitted]
                                  images/pages/about/screenshot_forest.png     147 kB          [emitted]
                                 images/pages/about/screenshot_glacier.png     151 kB          [emitted]
                                             images/pages/about/sketch.png     197 kB          [emitted]
                            images/pages/about/team-avatars/cat-avatar.png     6.9 kB          [emitted]
                          images/pages/about/team-avatars/david-avatar.png    15.6 kB          [emitted]
                         images/pages/about/team-avatars/dchase-avatar.png    11.2 kB          [emitted]
                         images/pages/about/team-avatars/elliot-avatar.png    22.6 kB          [emitted]
                           images/pages/about/team-avatars/jane-avatar.png    15.6 kB          [emitted]
                           images/pages/about/team-avatars/josh-avatar.png    8.83 kB          [emitted]
                       images/pages/about/team-avatars/lawrence-avatar.png    10.4 kB          [emitted]
                           images/pages/about/team-avatars/lisa-avatar.png    18.1 kB          [emitted]
                            images/pages/about/team-avatars/liz-avatar.png    12.5 kB          [emitted]
                           images/pages/about/team-avatars/maka-avatar.png    8.44 kB          [emitted]
                           images/pages/about/team-avatars/matt-avatar.png      21 kB          [emitted]
                           images/pages/about/team-avatars/nick-avatar.png    11.4 kB          [emitted]
                          images/pages/about/team-avatars/nolan-avatar.png    17.9 kB          [emitted]
                        images/pages/about/team-avatars/phoenix-avatar.png      23 kB          [emitted]
                            images/pages/about/team-avatars/rob-avatar.png    18.1 kB          [emitted]
                        images/pages/about/team-avatars/robarev-avatar.png    10.2 kB          [emitted]
                          images/pages/about/team-avatars/robin-avatar.png    17.5 kB          [emitted]
                          images/pages/about/team-avatars/scott-avatar.png    8.21 kB          [emitted]
                           images/pages/about/team-avatars/sean-avatar.png    22.1 kB          [emitted]
                      images/pages/about/team-avatars/shubhangi-avatar.png    10.9 kB          [emitted]
                          images/pages/about/team-avatars/vicki-avatar.png    13.1 kB          [emitted]
                     images/pages/about/team-headshots/andrew-headshot.png    21.3 kB          [emitted]
                        images/pages/about/team-headshots/cat-headshot.png    21.2 kB          [emitted]
                   images/pages/about/team-headshots/chethana-headshot.png      20 kB          [emitted]
                      images/pages/about/team-headshots/david-headshot.png      22 kB          [emitted]
                     images/pages/about/team-headshots/dchase-headshot.jpg    9.47 kB          [emitted]
                     images/pages/about/team-headshots/dchase-headshot.png    20.6 kB          [emitted]
                     images/pages/about/team-headshots/elliot-headshot.png    22.2 kB          [emitted]
                       images/pages/about/team-headshots/jane-headshot.png      21 kB          [emitted]
                       images/pages/about/team-headshots/josh-headshot.png    26.2 kB          [emitted]
                   images/pages/about/team-headshots/lawrence-headshot.jpg    8.57 kB          [emitted]
                       images/pages/about/team-headshots/lisa-headshot.png    20.7 kB          [emitted]
                        images/pages/about/team-headshots/liz-headshot.png    18.3 kB          [emitted]
                       images/pages/about/team-headshots/maka-headshot.png    22.4 kB          [emitted]
                       images/pages/about/team-headshots/matt-headshot.png    23.2 kB          [emitted]
                       images/pages/about/team-headshots/nick-headshot.png    40.2 kB          [emitted]
                      images/pages/about/team-headshots/nolan-headshot.png    22.4 kB          [emitted]
                    images/pages/about/team-headshots/phoenix-headshot.png    23.8 kB          [emitted]
                        images/pages/about/team-headshots/rob-headshot.png      22 kB          [emitted]
                    images/pages/about/team-headshots/robarev-headshot.jpg    8.79 kB          [emitted]
                      images/pages/about/team-headshots/robin-headshot.png    21.2 kB          [emitted]
                      images/pages/about/team-headshots/scott-headshot.png    25.5 kB          [emitted]
                       images/pages/about/team-headshots/sean-headshot.png    23.2 kB          [emitted]
                  images/pages/about/team-headshots/shubhangi-headshot.jpg    8.81 kB          [emitted]
                  images/pages/about/team-headshots/stephanie-headshot.png    21.6 kB          [emitted]
                      images/pages/about/team-headshots/vicki-headshot.jpg    9.29 kB          [emitted]
                                images/pages/account/profile/education.png  328 bytes          [emitted]
                            images/pages/account/profile/icon_facebook.png  332 bytes          [emitted]
                              images/pages/account/profile/icon_github.png  455 bytes          [emitted]
                               images/pages/account/profile/icon_gplus.png  612 bytes          [emitted]
                            images/pages/account/profile/icon_linkedin.png  381 bytes          [emitted]
                             images/pages/account/profile/icon_twitter.png  410 bytes          [emitted]
                     images/pages/account/profile/sample_profile_thumb.png    65.7 kB          [emitted]
                           images/pages/account/profile/sample_profile.png     306 kB          [emitted]  [big]
                           images/pages/account/profile/sample_project.png    5.17 kB          [emitted]
                                     images/pages/account/profile/work.png  320 bytes          [emitted]
                      images/pages/account/subscription/teacher-banner.png    55.8 kB          [emitted]
                               images/pages/admin/outcomes-report/anya.png     375 kB          [emitted]  [big]
                              images/pages/admin/outcomes-report/arryn.png     690 kB          [emitted]  [big]
                             images/pages/apcsp/APCSP_ProviderBadge_lg.png    27.8 kB          [emitted]
                                          images/pages/base/background.jpg     310 kB          [emitted]  [big]
                              images/pages/base/code-ninjas-logo-right.png    2.91 kB          [emitted]
                          images/pages/base/codecombat_logo_circle_250.png    41.7 kB          [emitted]
                                            images/pages/base/firebase.png    4.67 kB          [emitted]
                          images/pages/base/glyphicons-halflings-white.png    8.74 kB          [emitted]
                                images/pages/base/glyphicons-halflings.png    12.6 kB          [emitted]
                               images/pages/base/glyphicons-simplified.png  650 bytes          [emitted]
                                     images/pages/base/logo_square_120.png    17.6 kB          [emitted]
                                     images/pages/base/logo_square_250.png    26.5 kB          [emitted]
                                                images/pages/base/logo.png    43.8 kB          [emitted]
                                    images/pages/base/modal_background.png    8.13 kB          [emitted]
                                      images/pages/base/nav_background.png    12.3 kB          [emitted]
                                         images/pages/base/play_button.png      32 kB          [emitted]
                                    images/pages/base/recruitment_logo.png    1.29 kB          [emitted]
                                       images/pages/careers/recruiting.png    51.7 kB          [emitted]
                                  images/pages/clans/dashboard_preview.png     119 kB          [emitted]
                                     images/pages/community/adventurer.png    5.66 kB          [emitted]
                                     images/pages/community/ambassador.png    5.65 kB          [emitted]
                                       images/pages/community/archmage.png    5.96 kB          [emitted]
                                        images/pages/community/article.png      13 kB          [emitted]
                                        images/pages/community/artisan.png    5.05 kB          [emitted]
                                       images/pages/community/diplomat.png    5.76 kB          [emitted]
                                          images/pages/community/level.png    27.2 kB          [emitted]
                                 images/pages/community/logo_discourse.png    2.71 kB          [emitted]
                                  images/pages/community/logo_facebook.png    1.22 kB          [emitted]
                                        images/pages/community/logo_g+.png    1.69 kB          [emitted]
                                    images/pages/community/logo_github.png    9.04 kB          [emitted]
                                   images/pages/community/logo_hipchat.png    3.67 kB          [emitted]
                                      images/pages/community/logo_sett.png    3.48 kB          [emitted]
                                     images/pages/community/logo_slack.png    5.07 kB          [emitted]
                                   images/pages/community/logo_twitter.png    2.33 kB          [emitted]
                                         images/pages/community/scribe.png    5.47 kB          [emitted]
                                          images/pages/community/thang.png    24.3 kB          [emitted]
                                    images/pages/contribute/adventurer.png    23.5 kB          [emitted]
                                    images/pages/contribute/ambassador.png    22.2 kB          [emitted]
                                      images/pages/contribute/archmage.png    29.5 kB          [emitted]
                                       images/pages/contribute/artisan.png      23 kB          [emitted]
                       images/pages/contribute/class_detail_adventurer.png    51.3 kB          [emitted]
                       images/pages/contribute/class_detail_ambassador.png    60.8 kB          [emitted]
                         images/pages/contribute/class_detail_archmage.png    48.5 kB          [emitted]
                          images/pages/contribute/class_detail_artisan.png    51.6 kB          [emitted]
                         images/pages/contribute/class_detail_diplomat.png    56.6 kB          [emitted]
                           images/pages/contribute/class_detail_scribe.png    49.7 kB          [emitted]
                             images/pages/contribute/contribute_header.png    50.1 kB          [emitted]
                                     images/pages/contribute/counselor.png    23.4 kB          [emitted]
                                      images/pages/contribute/diplomat.png    24.9 kB          [emitted]
                                        images/pages/contribute/scribe.png    25.4 kB          [emitted]
                               images/pages/contribute/tile_adventurer.png    83.6 kB          [emitted]
                               images/pages/contribute/tile_ambassador.png    48.4 kB          [emitted]
                                 images/pages/contribute/tile_archmage.png    54.8 kB          [emitted]
                                  images/pages/contribute/tile_artisan.png    45.3 kB          [emitted]
                                 images/pages/contribute/tile_diplomat.png    57.8 kB          [emitted]
                                   images/pages/contribute/tile_scribe.png    59.9 kB          [emitted]
                                         images/pages/courses/101_info.png     129 kB          [emitted]
                                         images/pages/courses/102_info.png     166 kB          [emitted]
                                         images/pages/courses/103_info.png    67.7 kB          [emitted]
                                         images/pages/courses/104_info.png    99.6 kB          [emitted]
                                         images/pages/courses/105_info.png     185 kB          [emitted]
                                         images/pages/courses/106_info.png     130 kB          [emitted]
                                         images/pages/courses/107_info.png     138 kB          [emitted]
                                     images/pages/courses/coco_complab.png     520 kB          [emitted]  [big]
                            images/pages/courses/how_to_apply_licenses.png    24.7 kB          [emitted]
                                      images/pages/courses/star-bronze.png    3.73 kB          [emitted]
                                        images/pages/courses/star-gold.png    3.96 kB          [emitted]
                                      images/pages/courses/star-silver.png    4.05 kB          [emitted]
           images/pages/demo-webdev-projects/chaton-en-train-de-dormir.jpg    26.7 kB          [emitted]
                  images/pages/demo-webdev-projects/Kitten_(06)_by_Ron.jpg    20.5 kB          [emitted]
                   images/pages/demo-webdev-projects/my-cute-bunny-pet.jpg    16.6 kB          [emitted]
                        images/pages/editor/level/preset_dungeon_large.jpg    89.8 kB          [emitted]
                        images/pages/editor/level/preset_dungeon_small.jpg    90.4 kB          [emitted]
                         images/pages/editor/level/preset_grassy_large.jpg    75.1 kB          [emitted]
                         images/pages/editor/level/preset_grassy_small.jpg    69.1 kB          [emitted]
                         images/pages/editor/level/preset_indoor_large.jpg    83.4 kB          [emitted]
                         images/pages/editor/level/preset_indoor_small.jpg    85.2 kB          [emitted]
                                       images/pages/employer/anon_user.png  578 bytes          [emitted]
                                 images/pages/employer/artisanal_claim.png    1.67 kB          [emitted]
                                       images/pages/employer/briefcase.png  100 bytes          [emitted]
                                       images/pages/employer/education.png  223 bytes          [emitted]
                                  images/pages/employer/employer_icon1.png     1.2 kB          [emitted]
                                  images/pages/employer/employer_icon2.png  923 bytes          [emitted]
                                  images/pages/employer/employer_icon3.png  885 bytes          [emitted]
                                  images/pages/employer/employer_icon4.png    1.44 kB          [emitted]
                                  images/pages/employer/employer_icon5.png  845 bytes          [emitted]
                                  images/pages/employer/employer_icon6.png  686 bytes          [emitted]
                                        images/pages/employer/location.png  193 bytes          [emitted]
                                             images/pages/employer/tag.png  149 bytes          [emitted]
                                          images/pages/features/banner.png     165 kB          [emitted]
                                             images/pages/features/bg2.png    1.02 MB          [emitted]  [big]
                                 images/pages/features/collect_command.png      96 kB          [emitted]
                                    images/pages/features/game_web_dev.png     412 kB          [emitted]  [big]
                                          images/pages/features/heroes.png     221 kB          [emitted]
                                 images/pages/game-menu/lock-processed.png  688 bytes          [emitted]
                                           images/pages/game-menu/lock.png     2.8 kB          [emitted]
                         images/pages/game-menu/save-load-history-stub.png    79.1 kB          [emitted]
                                 images/pages/game-menu/save-load-stub.png     102 kB          [emitted]
                                     images/pages/game-menu/slot-icons.png    41.2 kB          [emitted]
                                     images/pages/home/app_store_badge.svg    12.2 kB          [emitted]
                                          images/pages/home/boy_coding.png    41.1 kB          [emitted]
                                 images/pages/home/character_jumbotron.png     1.1 MB          [emitted]  [big]
                                    images/pages/home/character_lineup.png     199 kB          [emitted]
                                  images/pages/home/computer-science-2.png    33.8 kB          [emitted]
                                  images/pages/home/computer-science-3.png    24.2 kB          [emitted]
                                  images/pages/home/computer-science-4.png    38.9 kB          [emitted]
                                  images/pages/home/computer-science-5.png    48.2 kB          [emitted]
                                  images/pages/home/computer-science-6.png    28.1 kB          [emitted]
                                    images/pages/home/course_languages.png    3.91 kB          [emitted]
                                               images/pages/home/dylan.png    18.3 kB          [emitted]
                                                images/pages/home/emma.png    23.1 kB          [emitted]
                                        images/pages/home/F1_typedcode.png    6.41 kB          [emitted]
                                    images/pages/home/F2_teacherguides.png    11.4 kB          [emitted]
                                       images/pages/home/F3_accessible.png    11.1 kB          [emitted]
                                   images/pages/home/footer_background.png      15 kB          [emitted]
                                           images/pages/home/G1_reward.png    8.94 kB          [emitted]
                                           images/pages/home/G2_brains.png    7.35 kB          [emitted]
                                             images/pages/home/G3_game.png    4.83 kB          [emitted]
                                          images/pages/home/game-dev-1.png    26.2 kB          [emitted]
                                  images/pages/home/game-development-1.png    26.2 kB          [emitted]
                                  images/pages/home/game-development-2.png    34.6 kB          [emitted]
                                  images/pages/home/game-development-3.png    33.2 kB          [emitted]
                                         images/pages/home/girl_coding.png    32.8 kB          [emitted]
                                          images/pages/home/inprogress.png    4.19 kB          [emitted]
                    images/pages/home/introduction-to-computer-science.png    34.9 kB          [emitted]
                                          images/pages/home/opensource.png    7.49 kB          [emitted]
                                               images/pages/home/pcmag.png    4.24 kB          [emitted]
                                         images/pages/home/play_button.png      32 kB          [emitted]
                                            images/pages/home/play_img.png     115 kB          [emitted]
                                   images/pages/home/student_jumbotron.jpg     186 kB          [emitted]
                                             images/pages/home/timmaki.png    22.9 kB          [emitted]
                                         images/pages/home/video_thumb.png     475 kB          [emitted]  [big]
                                           images/pages/home/web-dev-1.png    20.6 kB          [emitted]
                                   images/pages/home/web-development-1.png    20.6 kB          [emitted]
                                   images/pages/home/web-development-2.png    27.4 kB          [emitted]
                              images/pages/minigames/conditionals/bear.png    12.3 kB          [emitted]
                               images/pages/minigames/conditionals/dog.png    11.1 kB          [emitted]
                         images/pages/minigames/conditionals/fire_trap.png    3.46 kB          [emitted]
                       images/pages/minigames/conditionals/forked-path.jpg     630 kB          [emitted]  [big]
                               images/pages/minigames/conditionals/fox.png    10.7 kB          [emitted]
                               images/pages/minigames/conditionals/gem.png    1.46 kB          [emitted]
                              images/pages/minigames/conditionals/ogre.png    50.3 kB          [emitted]
                               images/pages/minigames/conditionals/rat.jpg    3.28 kB          [emitted]
                             images/pages/minigames/conditionals/raven.png    8.73 kB          [emitted]
                              images/pages/minigames/conditionals/wolf.png    10.1 kB          [emitted]
                      images/pages/modal/assign-courses/select_courses.gif    1.29 MB          [emitted]  [big]
                     images/pages/modal/assign-courses/select_students.gif     532 kB          [emitted]  [big]
                                    images/pages/modal/auth/extra-pane.png      20 kB          [emitted]
                                images/pages/modal/auth/facebook_small.png  730 bytes          [emitted]
                          images/pages/modal/auth/facebook_sso_button2.png    16.4 kB          [emitted]
                                   images/pages/modal/auth/github_icon.png  723 bytes          [emitted]
                                   images/pages/modal/auth/gplus_small.png     1.5 kB          [emitted]
                             images/pages/modal/auth/gplus_sso_button2.png       8 kB          [emitted]
                              images/pages/modal/auth/login-background.png    45.2 kB          [emitted]
                             images/pages/modal/auth/signup-background.png    95.4 kB          [emitted]
                                          images/pages/not_found/404_1.png    31.8 kB          [emitted]
                                          images/pages/not_found/404_2.png    38.7 kB          [emitted]
                                          images/pages/not_found/404_3.png    82.6 kB          [emitted]
                                     images/pages/parents/anya_reading.png      21 kB          [emitted]
                                        images/pages/parents/deepdive1.png     227 kB          [emitted]
                                        images/pages/parents/deepdive2.png     208 kB          [emitted]
                                        images/pages/parents/deepdive3.png     206 kB          [emitted]
                                             images/pages/parents/flag.png    16.1 kB          [emitted]
                               images/pages/parents/jumbotron_students.png    9.56 MB          [emitted]  [big]
                                         images/pages/parents/mission1.png     109 kB          [emitted]
                                         images/pages/parents/mission2.png     114 kB          [emitted]
                                         images/pages/parents/mission3.png     122 kB          [emitted]
                                       images/pages/parents/valueprop1.png     103 kB          [emitted]
                                       images/pages/parents/valueprop2.png    69.6 kB          [emitted]
                                       images/pages/parents/valueprop3.png    88.2 kB          [emitted]
                                  images/pages/play/amazon_horz_lockup.png     198 kB          [emitted]
                                  images/pages/play/amazon_vert_lockup.png    48.1 kB          [emitted]
                                    images/pages/play/aws-educate-logo.png    24.5 kB          [emitted]
                                        images/pages/play/bronze-chest.png    29.4 kB          [emitted]
                                     images/pages/play/campaign-banner.png    10.5 kB          [emitted]
                                      images/pages/play/duck_alejandro.png    77.8 kB          [emitted]
                                           images/pages/play/duck_anya.png    54.6 kB          [emitted]
                                          images/pages/play/duck_anya2.png     124 kB          [emitted]
                                            images/pages/play/duck_ida.png    76.4 kB          [emitted]
                                           images/pages/play/duck_okar.png    72.8 kB          [emitted]
                                         images/pages/play/duck_tharin.png    48.6 kB          [emitted]
                                        images/pages/play/duck_tharin2.png     107 kB          [emitted]
                                images/pages/play/future-engineer-logo.png     228 kB          [emitted]
                                          images/pages/play/gold-chest.png    30.5 kB          [emitted]
                                  images/pages/play/ladder/easy_button.png    15.4 kB          [emitted]
                                  images/pages/play/ladder/hard_button.png    20.5 kB          [emitted]
                           images/pages/play/ladder/humans_ladder_easy.png    33.4 kB          [emitted]
                           images/pages/play/ladder/humans_ladder_hard.png    13.6 kB          [emitted]
                         images/pages/play/ladder/humans_ladder_medium.png    30.6 kB          [emitted]
                       images/pages/play/ladder/humans_ladder_tutorial.png    32.8 kB          [emitted]
                                images/pages/play/ladder/medium_button.png    15.4 kB          [emitted]
                           images/pages/play/ladder/multiplayer_notext.jpg    45.8 kB          [emitted]
                            images/pages/play/ladder/ogres_ladder_easy.png    13.5 kB          [emitted]
                            images/pages/play/ladder/ogres_ladder_hard.png    14.6 kB          [emitted]
                          images/pages/play/ladder/ogres_ladder_medium.png    34.4 kB          [emitted]
                        images/pages/play/ladder/ogres_ladder_tutorial.png    40.9 kB          [emitted]
                                    images/pages/play/ladder/prize_aws.png    1.46 kB          [emitted]
                                  images/pages/play/ladder/prize_cash1.png    2.93 kB          [emitted]
                                  images/pages/play/ladder/prize_cash2.png    2.75 kB          [emitted]
                                  images/pages/play/ladder/prize_cash3.png    2.58 kB          [emitted]
                          images/pages/play/ladder/prize_custom_avatar.png    2.54 kB          [emitted]
                          images/pages/play/ladder/prize_custom_wizard.png    3.99 kB          [emitted]
                          images/pages/play/ladder/prize_digital_ocean.png    2.42 kB          [emitted]
                               images/pages/play/ladder/prize_firebase.png    4.57 kB          [emitted]
                                   images/pages/play/ladder/prize_heap.png    2.35 kB          [emitted]
                              images/pages/play/ladder/prize_one_month.png    2.76 kB          [emitted]
                                images/pages/play/ladder/prize_oreilly.png    2.18 kB          [emitted]
                               images/pages/play/ladder/prize_webstorm.png    2.19 kB          [emitted]
                                images/pages/play/ladder/warmup_button.png    15.4 kB          [emitted]
                            images/pages/play/level-banner-multiplayer.png    8.16 kB          [emitted]
                             images/pages/play/level-banner-replayable.png    6.38 kB          [emitted]
                                images/pages/play/level-banner-special.png    5.94 kB          [emitted]
                                images/pages/play/level-banner-started.png    4.01 kB          [emitted]
                      images/pages/play/level-banner-unlock-subscriber.png    20.3 kB          [emitted]
                                 images/pages/play/level-banner-unlock.png    4.91 kB          [emitted]
                   images/pages/play/level-banner-unstarted-subscriber.png    19.7 kB          [emitted]
                              images/pages/play/level-banner-unstarted.png    4.08 kB          [emitted]
                               images/pages/play/level-info-background.png    55.8 kB          [emitted]
                       images/pages/play/level-info-status-spritesheet.png    9.96 kB          [emitted]
                        images/pages/play/level/modal/reward_icon_gems.png    2.57 kB          [emitted]
                          images/pages/play/level/modal/reward_icon_xp.png    3.53 kB          [emitted]
               images/pages/play/level/modal/reward_plate_wide_premium.png    4.36 kB          [emitted]
                       images/pages/play/level/modal/reward_plate_wide.png     2.2 kB          [emitted]
                            images/pages/play/level/modal/reward_plate.png    2.13 kB          [emitted]
                   images/pages/play/level/modal/share_level_parchment.png    10.9 kB          [emitted]
                            images/pages/play/level/modal/victory_hero.png    20.7 kB          [emitted]
                images/pages/play/level/modal/victory_modal_background.png    58.7 kB          [emitted]
         images/pages/play/level/modal/victory_modal_border_background.png    44.7 kB          [emitted]
                     images/pages/play/level/modal/victory_modal_shelf.png    1.76 kB          [emitted]
                            images/pages/play/level/modal/victory_word.png      15 kB          [emitted]
                       images/pages/play/level/modal/xp_gems_parchment.png    8.73 kB          [emitted]
                                          images/pages/play/menu_icons.png    93.6 kB          [emitted]
                                            images/pages/play/modal/an.svg    1.07 kB          [emitted]
                         images/pages/play/modal/announcement_modal_bg.png    67.7 kB          [emitted]
                         images/pages/play/modal/announcement/pets/ale.png    27.2 kB          [emitted]
    images/pages/play/modal/announcement/pets/ball_no_shadow_only_ball.png  940 bytes          [emitted]
                        images/pages/play/modal/announcement/pets/ball.png    1.06 kB          [emitted]
                        images/pages/play/modal/announcement/pets/base.png     158 kB          [emitted]
            images/pages/play/modal/announcement/pets/bg_baked_shadows.png    28.4 kB          [emitted]
                          images/pages/play/modal/announcement/pets/bg.png    25.6 kB          [emitted]
            images/pages/play/modal/announcement/pets/cougar_no_shadow.png    18.3 kB          [emitted]
                      images/pages/play/modal/announcement/pets/cougar.png    18.8 kB          [emitted]
                   images/pages/play/modal/announcement/pets/fire_elem.png    6.68 kB          [emitted]
                        images/pages/play/modal/announcement/pets/fire.png    6.41 kB          [emitted]
                          images/pages/play/modal/announcement/pets/fo.png    8.61 kB          [emitted]
               images/pages/play/modal/announcement/pets/fox_no_shadow.png    8.38 kB          [emitted]
                       images/pages/play/modal/announcement/pets/grass.png    10.3 kB          [emitted]
                     images/pages/play/modal/announcement/pets/griffin.png    10.4 kB          [emitted]
             images/pages/play/modal/announcement/pets/heroes_and_fire.png    65.2 kB          [emitted]
                         images/pages/play/modal/announcement/pets/ida.png      28 kB          [emitted]
             images/pages/play/modal/announcement/pets/mimic_no_shadow.png    6.47 kB          [emitted]
                       images/pages/play/modal/announcement/pets/mimic.png    6.76 kB          [emitted]
               images/pages/play/modal/announcement/pets/pug_no_shadow.png    10.1 kB          [emitted]
                         images/pages/play/modal/announcement/pets/pug.png    10.5 kB          [emitted]
                       images/pages/play/modal/announcement/pets/raven.png    7.13 kB          [emitted]
              images/pages/play/modal/announcement/pets/wolf_no_shadow.png    11.9 kB          [emitted]
              images/pages/play/modal/announcement/pets/wolf_only_wolf.png    11.3 kB          [emitted]
images/pages/play/modal/announcement/pets/wolf_pup_no_shadow_only_wolf.png    10.6 kB          [emitted]
                        images/pages/play/modal/announcement/pets/wolf.png    12.4 kB          [emitted]
                images/pages/play/modal/announcement/ritic/ability_bar.png    34.1 kB          [emitted]
              images/pages/play/modal/announcement/ritic/assassin-pose.png    63.6 kB          [emitted]
                      images/pages/play/modal/announcement/ritic/blink.gif    4.87 MB          [emitted]  [big]
                      images/pages/play/modal/announcement/ritic/blink.png    5.57 kB          [emitted]
                images/pages/play/modal/announcement/ritic/clear_block.png    26.2 kB          [emitted]
              images/pages/play/modal/announcement/ritic/cracked_block.png    39.8 kB          [emitted]
                   images/pages/play/modal/announcement/ritic/darkness.gif    4.45 MB          [emitted]  [big]
                   images/pages/play/modal/announcement/ritic/darkness.png    10.6 kB          [emitted]
             images/pages/play/modal/announcement/ritic/ice-background.jpg    76.9 kB          [emitted]
                        images/pages/play/modal/announcement/ritic/ray.png    18.8 kB          [emitted]
                 images/pages/play/modal/announcement/ritic/shadowwalk.gif    3.46 MB          [emitted]  [big]
                 images/pages/play/modal/announcement/ritic/shadowwalk.png    6.91 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard1.png    4.17 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard2.png     4.9 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard3.png    4.96 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard4.png    4.47 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard5.png    2.71 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard6.png    2.36 kB          [emitted]
                    images/pages/play/modal/announcement/ritic/tornado.gif    3.67 MB          [emitted]  [big]
                    images/pages/play/modal/announcement/ritic/tornado.png    4.18 kB          [emitted]
         images/pages/play/modal/announcement/ritic/undercracked_block.png    29.6 kB          [emitted]
                           images/pages/play/modal/buy-gems-background.png     209 kB          [emitted]
                                       images/pages/play/modal/captain.png    17.6 kB          [emitted]
                            images/pages/play/modal/challenge_complete.png      36 kB          [emitted]
                            images/pages/play/modal/challenge_unlocked.png    37.7 kB          [emitted]
                                      images/pages/play/modal/champion.png      21 kB          [emitted]
  images/pages/play/modal/code-play-create-account-modal-background-de.png     609 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-en.png     597 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-es.png     863 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-in.png     563 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-uk.png     589 kB          [emitted]  [big]
                                images/pages/play/modal/combo_complete.png    34.6 kB          [emitted]
                              images/pages/play/modal/combo_incomplete.png    37.2 kB          [emitted]
                                images/pages/play/modal/confirm-button.png    3.08 kB          [emitted]
                                       images/pages/play/modal/duelist.png      21 kB          [emitted]
                                 images/pages/play/modal/equip-buttons.png    2.92 kB          [emitted]
                          images/pages/play/modal/game-menu-background.png      41 kB          [emitted]
                                       images/pages/play/modal/goliath.png    17.8 kB          [emitted]
                                      images/pages/play/modal/guardian.png    19.7 kB          [emitted]
                    images/pages/play/modal/hero-portrait-gem-selected.png    8.13 kB          [emitted]
                             images/pages/play/modal/hero-portrait-gem.png    6.59 kB          [emitted]
                        images/pages/play/modal/hero-portrait-selected.png     6.1 kB          [emitted]
                 images/pages/play/modal/hero-portrait-silver-selected.png    11.8 kB          [emitted]
                          images/pages/play/modal/hero-portrait-silver.png    4.82 kB          [emitted]
                                 images/pages/play/modal/hero-portrait.png    6.88 kB          [emitted]
                               images/pages/play/modal/heroes-and-pets.png     302 kB          [emitted]  [big]
                             images/pages/play/modal/heroes-background.png    55.5 kB          [emitted]
                                            images/pages/play/modal/hr.png  511 bytes          [emitted]
                          images/pages/play/modal/inventory-background.png    89.9 kB          [emitted]
                  images/pages/play/modal/item-box-background-selected.png     1.5 kB          [emitted]
                           images/pages/play/modal/item-box-background.png       2 kB          [emitted]
                         images/pages/play/modal/item-icon-accessories.png    2.05 kB          [emitted]
                               images/pages/play/modal/item-icon-armor.png    3.08 kB          [emitted]
                               images/pages/play/modal/item-icon-books.png    2.59 kB          [emitted]
                                images/pages/play/modal/item-icon-misc.png    4.31 kB          [emitted]
                             images/pages/play/modal/item-icon-primary.png    1.75 kB          [emitted]
                           images/pages/play/modal/item-icon-secondary.png    2.78 kB          [emitted]
                       images/pages/play/modal/items-background-narrow.png     116 kB          [emitted]
                              images/pages/play/modal/items-background.png      82 kB          [emitted]
                                       images/pages/play/modal/k-means.gif     311 kB          [emitted]  [big]
                                        images/pages/play/modal/knight.png    19.4 kB          [emitted]
                images/pages/play/modal/lang-nl/buy-gems-background-NL.png     259 kB          [emitted]  [big]
                        images/pages/play/modal/leaderboard-background.png    50.1 kB          [emitted]
                                images/pages/play/modal/level_complete.png    31.2 kB          [emitted]
                                   images/pages/play/modal/lock_banner.png    28.5 kB          [emitted]
                             images/pages/play/modal/menu-tab-selected.png    1.42 kB          [emitted]
                                      images/pages/play/modal/menu-tab.png    1.22 kB          [emitted]
                         images/pages/play/modal/parental_nudge_wizard.png     202 kB          [emitted]
              images/pages/play/modal/parental_prompt_modal_background.png    35.7 kB          [emitted]
                                                  javascripts/run-tests.js  697 bytes          [emitted]
                                        images/pages/play/modal/raider.png    17.5 kB          [emitted]
                        images/pages/play/modal/random-gems-background.png    5.05 kB          [emitted]
                                       images/pages/play/modal/samurai.png    19.9 kB          [emitted]
                                      images/pages/play/modal/stalwart.png    21.5 kB          [emitted]
                    images/pages/play/modal/subscribe-background-blank.png    43.6 kB          [emitted]
                          images/pages/play/modal/subscribe-background.png     224 kB          [emitted]
                                images/pages/play/modal/subscribe-gems.png    27.9 kB          [emitted]
                              images/pages/play/modal/subscribe-heroes.png      55 kB          [emitted]
                                    images/pages/play/modal/three-pets.png    32.1 kB          [emitted]
                                  images/pages/play/picoctf-logo-white.png    3.54 kB          [emitted]
                                    images/pages/play/play-spritesheet.png    16.8 kB          [emitted]
                                   images/pages/play/portal-background.png    2.19 kB          [emitted]
                               images/pages/play/portal-beta-campaigns.png     324 kB          [emitted]  [big]
                                    images/pages/play/portal-campaigns.png     478 kB          [emitted]  [big]
                                   images/pages/play/premium-menu-icon.png    32.2 kB          [emitted]
                                        images/pages/play/silver-chest.png    29.1 kB          [emitted]
                                                images/pages/play/star.png    13.5 kB          [emitted]
                                        images/pages/play/Victory_Pose.png    83.7 kB          [emitted]
                                        images/pages/play/wooden-chest.png    30.3 kB          [emitted]
                                 images/pages/play/worlds/desert_small.png    35.8 kB          [emitted]
                                images/pages/play/worlds/dungeon_small.png    30.4 kB          [emitted]
                                 images/pages/play/worlds/forest_small.png    35.9 kB          [emitted]
                             images/pages/play/worlds/game_dev_1_small.png    29.9 kB          [emitted]
                             images/pages/play/worlds/game_dev_2_small.png      30 kB          [emitted]
                                images/pages/play/worlds/glacier_small.png    29.5 kB          [emitted]
                               images/pages/play/worlds/mountain_small.png    29.7 kB          [emitted]
                                images/pages/play/worlds/volcano_small.png    30.4 kB          [emitted]
                              images/pages/play/worlds/web_dev_1_small.png    27.7 kB          [emitted]
                              images/pages/play/worlds/web_dev_2_small.png    32.1 kB          [emitted]
                                          images/pages/sales/chat_icon.png  234 bytes          [emitted]
                                         images/pages/sales/classroom1.png    96.3 kB          [emitted]
                                         images/pages/sales/classroom2.png    99.9 kB          [emitted]
                                         images/pages/sales/classroom3.png    91.4 kB          [emitted]
                                         images/pages/sales/classroom4.png    98.7 kB          [emitted]
                                         images/pages/sales/classroom5.png     116 kB          [emitted]
                                         images/pages/sales/classroom6.png    70.4 kB          [emitted]
                                      images/pages/sales/content_table.png    67.1 kB          [emitted]
                                         images/pages/sales/down_arrow.png  285 bytes          [emitted]
                                    images/pages/sales/hero_background.png     221 kB          [emitted]
                                             images/pages/sales/quote1.png    21.7 kB          [emitted]
                                             images/pages/sales/quote2.png    21.2 kB          [emitted]
                                            images/pages/sales/screen1.png    57.6 kB          [emitted]
                                            images/pages/sales/screen2.png    29.6 kB          [emitted]
            images/pages/teachers/resources/markdown/compression-grass.png    3.06 kB          [emitted]
         images/pages/teachers/resources/markdown/compression-high-res.jpg     199 kB          [emitted]
          images/pages/teachers/resources/markdown/compression-low-res.jpg    20.5 kB          [emitted]
           images/pages/teachers/resources/markdown/compression-wood-x.png    9.88 kB          [emitted]
                images/pages/teachers/resources/markdown/phishing-scam.jpg     301 kB          [emitted]  [big]
                                          images/pages/user/adventurer.png    49.3 kB          [emitted]
                                          images/pages/user/ambassador.png    36.7 kB          [emitted]
                                            images/pages/user/archmage.png    79.3 kB          [emitted]
                                             images/pages/user/artisan.png    41.5 kB          [emitted]
             images/pages/user/certificates/backgrounds/background-cs1.png    2.33 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs2.png    2.35 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs3.png    2.32 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs4.png    2.31 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs5.png    2.16 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs6.png    2.07 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-gd1.png     3.1 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-gd2.png    2.65 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-gd3.png    2.42 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-wd1.png     1.9 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-wd2.png     1.9 MB          [emitted]  [big]
                       images/pages/user/certificates/certificate-icon.png    2.58 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs1.png     124 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs2.png     132 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs3.png     139 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs4.png     147 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs5.png     155 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs6.png     179 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-gd1.png    95.3 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-gd2.png     169 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-gd3.png     202 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-wd1.png     149 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-wd2.png     168 kB          [emitted]
                     images/pages/user/certificates/poses/pose-captain.png    51.1 kB          [emitted]
                    images/pages/user/certificates/poses/pose-champion.png    98.1 kB          [emitted]
                     images/pages/user/certificates/poses/pose-duelist.png    97.7 kB          [emitted]
                     images/pages/user/certificates/poses/pose-goliath.png     135 kB          [emitted]
                    images/pages/user/certificates/poses/pose-guardian.png     146 kB          [emitted]
                      images/pages/user/certificates/poses/pose-knight.png     117 kB          [emitted]
                      images/pages/user/certificates/poses/pose-raider.png     113 kB          [emitted]
                     images/pages/user/certificates/poses/pose-samurai.png     230 kB          [emitted]
                    images/pages/user/certificates/poses/pose-stalwart.png     178 kB          [emitted]
           images/pages/user/certificates/signatures/signature-captain.png    47.3 kB          [emitted]
          images/pages/user/certificates/signatures/signature-champion.png    49.1 kB          [emitted]
           images/pages/user/certificates/signatures/signature-duelist.png      41 kB          [emitted]
           images/pages/user/certificates/signatures/signature-goliath.png    41.6 kB          [emitted]
          images/pages/user/certificates/signatures/signature-guardian.png    53.3 kB          [emitted]
            images/pages/user/certificates/signatures/signature-knight.png    36.9 kB          [emitted]
            images/pages/user/certificates/signatures/signature-raider.png    50.6 kB          [emitted]
           images/pages/user/certificates/signatures/signature-samurai.png    44.1 kB          [emitted]
          images/pages/user/certificates/signatures/signature-stalwart.png    43.6 kB          [emitted]
                                            images/pages/user/diplomat.png    43.7 kB          [emitted]
                                             images/pages/user/general.png    29.5 kB          [emitted]
                                              images/pages/user/scribe.png    78.6 kB          [emitted]
                                                   images/twitter_icon.png  338 bytes          [emitted]
                                                    index_old_browser.html    1.49 kB          [emitted]
                                                       javascripts/boot.js    6.13 kB          [emitted]
                                               javascripts/setImmediate.js    8.53 kB          [emitted]
                                           javascripts/web-dev-listener.js    9.61 kB          [emitted]
                                      javascripts/workers/aether_worker.js    3.52 kB          [emitted]
                                       javascripts/workers/worker_world.js    21.1 kB          [emitted]
                                          markdown/apcsp-big-data-pt-BR.md    5.33 kB          [emitted]
                                                markdown/apcsp-big-data.md    4.99 kB          [emitted]
                                  markdown/apcsp-binary-sequences-pt-BR.md    2.73 kB          [emitted]
                                        markdown/apcsp-binary-sequences.md    2.49 kB          [emitted]
                                       markdown/apcsp-compression-pt-BR.md    8.75 kB          [emitted]
                                             markdown/apcsp-compression.md    8.26 kB          [emitted]
                                  markdown/apcsp-computing-lesson-pt-BR.md    4.03 kB          [emitted]
                                        markdown/apcsp-computing-lesson.md    3.61 kB          [emitted]
                                        markdown/apcsp-crowdsourcing-he.md    8.32 kB          [emitted]
                                     markdown/apcsp-crowdsourcing-pt-BR.md    6.22 kB          [emitted]
                                           markdown/apcsp-crowdsourcing.md    5.73 kB          [emitted]
                                      markdown/apcsp-data-project-pt-BR.md    4.19 kB          [emitted]
                                            markdown/apcsp-data-project.md    3.88 kB          [emitted]
                                  markdown/apcsp-getting-abstract-pt-BR.md     6.1 kB          [emitted]
                                        markdown/apcsp-getting-abstract.md    5.85 kB          [emitted]
                                    markdown/apcsp-hitchhikers-guide-he.md     2.5 kB          [emitted]
                                 markdown/apcsp-hitchhikers-guide-pt-BR.md     2.1 kB          [emitted]
                                       markdown/apcsp-hitchhikers-guide.md    1.95 kB          [emitted]
                            markdown/apcsp-how-the-internet-works-pt-BR.md    7.13 kB          [emitted]
                                  markdown/apcsp-how-the-internet-works.md    6.51 kB          [emitted]
                              markdown/apcsp-impact-on-industries-pt-BR.md     1.9 kB          [emitted]
                                    markdown/apcsp-impact-on-industries.md    1.75 kB          [emitted]
                           markdown/apcsp-innovations-and-society-pt-BR.md    1.89 kB          [emitted]
                                 markdown/apcsp-innovations-and-society.md    1.79 kB          [emitted]
                             markdown/apcsp-internet-chat-simulation-he.md    9.54 kB          [emitted]
                          markdown/apcsp-internet-chat-simulation-pt-BR.md    7.91 kB          [emitted]
                                markdown/apcsp-internet-chat-simulation.md    7.28 kB          [emitted]
                            markdown/apcsp-internet-cybersecurity-pt-BR.md    5.31 kB          [emitted]
                                  markdown/apcsp-internet-cybersecurity.md    4.86 kB          [emitted]
                               markdown/apcsp-internet-simulation-pt-BR.md    3.04 kB          [emitted]
                                     markdown/apcsp-internet-simulation.md    2.81 kB          [emitted]
                                   markdown/apcsp-pair-algorithms-pt-BR.md    3.19 kB          [emitted]
                                         markdown/apcsp-pair-algorithms.md    3.01 kB          [emitted]
                        markdown/apcsp-personal-and-global-impact-pt-BR.md    4.95 kB          [emitted]
                              markdown/apcsp-personal-and-global-impact.md     4.7 kB          [emitted]
                                       markdown/apcsp-refactoring-pt-BR.md    4.48 kB          [emitted]
                                             markdown/apcsp-refactoring.md    4.25 kB          [emitted]
                                       markdown/apcsp-search-sort-pt-BR.md    8.79 kB          [emitted]
                                             markdown/apcsp-search-sort.md    8.06 kB          [emitted]
                                        markdown/apcsp-simulation-pt-BR.md    3.51 kB          [emitted]
                                              markdown/apcsp-simulation.md    3.23 kB          [emitted]
                                    markdown/apcsp-tech-usability-pt-BR.md    3.23 kB          [emitted]
                                          markdown/apcsp-tech-usability.md    2.99 kB          [emitted]
                                          markdown/apcsp-web-quiz-pt-BR.md    1.99 kB          [emitted]
                                                markdown/apcsp-web-quiz.md    1.79 kB          [emitted]
                                                  markdown/arenas-pt-BR.md    4.14 kB          [emitted]
                                                        markdown/arenas.md    3.96 kB          [emitted]
                                                    markdown/clever-faq.md    4.46 kB          [emitted]
                                  markdown/create-task-practice-1-pt-BR.md    15.5 kB          [emitted]
                                        markdown/create-task-practice-1.md    16.2 kB          [emitted]
                                  markdown/create-task-practice-2-pt-BR.md    5.74 kB          [emitted]
                                        markdown/create-task-practice-2.md    5.87 kB          [emitted]
                                  markdown/create-task-practice-3-pt-BR.md    4.53 kB          [emitted]
                                        markdown/create-task-practice-3.md    4.38 kB          [emitted]
                                                        markdown/cs1-he.md    28.4 kB          [emitted]
                                                     markdown/cs1-pt-BR.md    23.4 kB          [emitted]
                                                   markdown/cs1-zh-HANS.md      19 kB          [emitted]
                                                           markdown/cs1.md    37.3 kB          [emitted]
                                                     markdown/cs2-pt-BR.md      31 kB          [emitted]
                                                           markdown/cs2.md    31.5 kB          [emitted]
                                                     markdown/cs3-pt-BR.md      94 kB          [emitted]
                                                           markdown/cs3.md    93.1 kB          [emitted]
                                                     markdown/cs4-pt-BR.md    56.3 kB          [emitted]
                                                           markdown/cs4.md    58.9 kB          [emitted]
                                                  markdown/cs5_js-pt-BR.md    54.1 kB          [emitted]
                                                        markdown/cs5_js.md      96 kB          [emitted]
                                                  markdown/cs5_py-pt-BR.md    52.8 kB          [emitted]
                                                        markdown/cs5_py.md    94.5 kB          [emitted]
                                                        markdown/faq-he.md    18.9 kB          [emitted]
                                                     markdown/faq-nl-NL.md    16.9 kB          [emitted]
                                                     markdown/faq-pt-BR.md    18.6 kB          [emitted]
                                                           markdown/faq.md    17.1 kB          [emitted]
                                                   markdown/gd1-5day-he.md    32.3 kB          [emitted]
                                                markdown/gd1-5day-pt-BR.md    24.8 kB          [emitted]
                                              markdown/gd1-5day-zh-HANS.md    21.5 kB          [emitted]
                                                      markdown/gd1-5day.md    23.3 kB          [emitted]
                                                     markdown/gd2-pt-BR.md    14.7 kB          [emitted]
                                                           markdown/gd2.md    17.9 kB          [emitted]
                                                     markdown/gd3-pt-BR.md    25.5 kB          [emitted]
                                                           markdown/gd3.md    24.2 kB          [emitted]
                                         markdown/getting-started-pt-BR.md    11.9 kB          [emitted]
                                               markdown/getting-started.md    11.4 kB          [emitted]
                                                           markdown/hoc.md    21.1 kB          [emitted]
                                           markdown/pair-programming-he.md    2.93 kB          [emitted]
                                        markdown/pair-programming-pt-BR.md    2.26 kB          [emitted]
                                              markdown/pair-programming.md    2.16 kB          [emitted]
                                                     markdown/wd1-pt-BR.md    38.3 kB          [emitted]
                                                           markdown/wd1.md    35.4 kB          [emitted]
                                                              nothing.html   13 bytes          [emitted]
                                                                 perf.html     1.2 kB          [emitted]
                      sounds/pages/minigames/conditionals/firetrap_die.mp3    14.8 kB          [emitted]
                        sounds/pages/minigames/conditionals/gem_pickup.mp3    6.75 kB          [emitted]
                sounds/pages/minigames/conditionals/ogre_munchkin_raah.mp3    5.43 kB          [emitted]
                                                       update-billing.html  712 bytes          [emitted]
                                                       web-dev-iframe.html    2.49 kB          [emitted]
  [28] (webpack)/buildin/global.js 509 bytes {86} [built]
  [30] ./app/views/core/RootView.coffee 10.1 kB {86} [built]
  [45] ./app/locale/locale.coffee 9.16 kB {86} [built]
 [313] ./app/core/initialize.coffee 9.59 kB {86} [built]
 [506] ./app/views/TestView.coffee 6.8 kB {86} [built]
 [610] ./app/assets/javascripts/run-tests.js 725 bytes {86} [built]
 [611] ./app/app.js 500 bytes {86} [built]
[1187] ./app/templates/test-view.jade 7.17 kB {86} [built]
[1188] ./app/lib/requireUtils.coffee 1.84 kB {86} [built]
[1189] ./vendor/styles/jasmine.css 917 bytes {86} [built]
[1191] ./node_modules/exports-loader?getJasmineRequireObj!./vendor/scripts/jasmine.js 92.3 kB {86} [built]
[1192] ./node_modules/imports-loader?jasmineRequire=>window.jasmineRequire!./vendor/scripts/jasmine-html.js 11.3 kB {86} [built]
[1193] ./node_modules/imports-loader?jasmineRequire=>window.jasmineRequire!./vendor/scripts/jasmine-boot.js 6.67 kB {86} [built]
[1194] ./node_modules/imports-loader?getJasmineRequireObj=>window.getJasmineRequireObj!./vendor/scripts/jasmine-mock-ajax.js 17.1 kB {86} [built]
[1195] ./test/app .*\.(coffee|js)$ 4.05 kB {86} [built]
    + 1982 hidden modules
WARNING in ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e4028d96","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/template-compiler/preprocessor.js?engine=jade!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/views/play/level/LevelGoals.vue
(Emitted value instead of an instance of Error) <level-goal v-for="goal in conceptGoals">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
 @ ./app/views/play/level/LevelGoals.vue 11:0-345
 @ ./app/views/play/level/LevelGoalsView.coffee
 @ ./app/views/play/level/PlayLevelView.coffee
 @ ./app/lib/dynamicRequire.js
 @ ./app/core/Router.coffee
 @ ./app/core/application.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e4028d96","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/template-compiler/preprocessor.js?engine=jade!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/views/play/level/LevelGoals.vue
(Emitted value instead of an instance of Error) <level-goal v-for="goal in levelGoals">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
 @ ./app/views/play/level/LevelGoals.vue 11:0-345
 @ ./app/views/play/level/LevelGoalsView.coffee
 @ ./app/views/play/level/PlayLevelView.coffee
 @ ./app/lib/dynamicRequire.js
 @ ./app/core/Router.coffee
 @ ./app/core/application.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-779ee37a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/template-compiler/preprocessor.js?engine=pug!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/views/courses/StudentAssessmentsComponent.vue
(Emitted value instead of an instance of Error) <student-assessment-row v-for="level in chunk.assessmentLevels">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
 @ ./app/views/courses/StudentAssessmentsComponent.vue 11:0-353
 @ ./app/views/courses/StudentAssessmentsView.coffee
 @ ./app/lib/dynamicRequire.js
 @ ./app/core/Router.coffee
 @ ./app/core/application.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/jsondiffpatch/src/main.js
56:20-50 Critical dependency: the request of a dependency is an expression
 @ ./node_modules/jsondiffpatch/src/main.js
 @ ./app/core/deltas.coffee
 @ ./test/app/core/deltas.spec.coffee
 @ ./test/app .*\.(coffee|js)$
 @ ./app/views/TestView.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/jsondiffpatch/src/main.js
61:19-47 Critical dependency: the request of a dependency is an expression
 @ ./node_modules/jsondiffpatch/src/main.js
 @ ./app/core/deltas.coffee
 @ ./test/app/core/deltas.spec.coffee
 @ ./test/app .*\.(coffee|js)$
 @ ./app/views/TestView.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./bower_components/moment/min/moment-with-locales.min.js
Module not found: Error: Can't resolve './locale' in '/home/travis/build/codecombat/codecombat/bower_components/moment/min'
 @ ./bower_components/moment/min/moment-with-locales.min.js 1:8507-8529
 @ ./app/vendor.js
 @ ./app/app.js
 @ ./app/assets/javascripts/run-tests.js
ERROR in ./node_modules/coffee-loader!./app/locale/zh-HANS.coffee
Module build failed: Error: /home/travis/build/codecombat/codecombat/app/locale/zh-HANS.coffee:1757:52: error: unexpected newline
#    back_to_course_guides: "Back to Course Guides"
                                                   ^
    L1756: #    back_to_course_guides: "Back to Course Guides"
                                                            ^
  at Object.module.exports (/home/travis/build/codecombat/codecombat/node_modules/coffee-loader/index.js:37:9)
 @ ./node_modules/bundle-loader?lazy&name=locale/[name]!./app/locale/zh-HANS.coffee 3:5-76
 @ ./app/locale ./node_modules/bundle-loader?lazy&name=locale/[name] ^\.\/.*$
 @ ./app/locale/locale.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/test-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/test-view.sass 411 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/course-nag-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/course-nag-modal.sass 446 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/core/loading-error.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/core/loading-error.sass 506 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/core/hero-select-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/core/hero-select-view.sass 758 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/teacher-class-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/teacher-class-view.sass 14.8 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/recover-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/recover-modal.sass 197 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/auth-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/auth-modal.sass 6.95 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/remove-student-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/remove-student-modal.sass 231 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/edit-student-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/edit-student-modal.sass 500 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/subscribe-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/subscribe-modal.sass 7.69 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/activate-licenses-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/activate-licenses-modal.sass 706 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/invite-to-classroom-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/invite-to-classroom-modal.sass 596 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/classroom-settings-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/classroom-settings-modal.sass 431 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/teacher-trial-requests.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/teacher-trial-requests.sass 4.54 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/share-licenses-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/share-licenses-modal.sass 1.08 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/model-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/model-modal.sass 333 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/anonymous-teacher-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/anonymous-teacher-modal.sass 922 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/campaign-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/campaign-view.sass 38.8 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/docs/systems-documentation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/docs/systems-documentation-view.sass 1.23 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/docs/components-documentation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/docs/components-documentation-view.sass 1.27 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/patch.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/patch.sass 208 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/related-achievements.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/related-achievements.sass 303 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/mine-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/mine-modal.sass 4.96 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/save-version-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/save-version-modal.sass 1.43 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/revert-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/revert-modal.sass 201 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/teachers-contact-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/teachers-contact-modal.sass 216 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/hero-select-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/hero-select-modal.sass 530 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/teacher-courses-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/teacher-courses-view.sass 895 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/enrollments-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/enrollments-view.sass 1.99 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/how-to-enroll-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/how-to-enroll-modal.sass 226 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/courses-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/courses-view.sass 2.15 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/choose-language-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/choose-language-modal.sass 354 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/change-course-language-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/change-course-language-modal.sass 216 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/courses-update-account-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/courses-update-account-view.sass 561 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/create-account-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/create-account-modal.sass 3.94 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/school-info-panel.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/school-info-panel.sass 163 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/code-play-create-account-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/code-play-create-account-modal.sass 1.26 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/nces-search-input.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/nces-search-input.sass 582 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/confirmation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/confirmation-view.sass 624 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/extras-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/extras-view.sass 351 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/sso-confirm-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/sso-confirm-view.sass 278 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/sso-already-exists-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/sso-already-exists-view.sass 285 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/basic-info-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/basic-info-view.sass 1.86 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/eu-confirmation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/eu-confirmation-view.sass 163 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/coppa-deny-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/coppa-deny-view.sass 505 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/segment-check-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/segment-check-view.sass 705 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/choose-account-type-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/choose-account-type-view.sass 2.61 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/share-progress-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/share-progress-modal.sass 2.26 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/level/web-surface-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/level/web-surface-view.sass 283 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/image-gallery-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/image-gallery-modal.sass 2.82 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/ladder/ladder-tab-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/ladder/ladder-tab-view.sass 1.9 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/buy-gems-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/buy-gems-modal.sass 1.98 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/amazon-hoc-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/amazon-hoc-modal.sass 1.66 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/play-achievements-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/play-achievements-modal.sass 1.9 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/play-heroes-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/play-heroes-modal.sass 18.6 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/play-items-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/play-items-modal.sass 9.16 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/item-details-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/item-details-view.sass 3.38 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/announcement-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/announcement-modal.sass 7.58 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/poll-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/poll-modal.sass 4.72 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/leaderboard-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/leaderboard-modal.sass 2.47 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/documentation_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/documentation_tab.sass 280 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/menu/inventory-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/menu/inventory-modal.sass 21.2 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/level-feedback-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/level-feedback-view.sass 394 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/tasks-tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/tasks-tab.sass 806 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/systems-tab-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/systems-tab-view.sass 3.4 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/components_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/components_tab.sass 3.29 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/scripts_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/scripts_tab.sass 1.02 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/settings_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/settings_tab.sass 501 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/component/thang-components-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/component/thang-components-edit-view.sass 1.87 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/component/add-thang-components-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/component/add-thang-components-modal.sass 839 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/thangs-tab-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/thangs-tab-view.sass 3.29 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/level/modal/progress-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/level/modal/progress-view.sass 1.24 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/add-thangs-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/add-thangs-view.sass 1.75 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/save-branch-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/save-branch-modal.sass 312 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/load-branch-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/load-branch-modal.sass 316 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/artisan-guide-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/artisan-guide-modal.sass 231 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/lang-nl/buy-gems-modal-nl.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/lang-nl/buy-gems-modal-nl.sass 2.23 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/system/add.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/system/add.sass 357 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/system/new.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/system/new.sass 383 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/system/level-system-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/system/level-system-edit-view.sass 817 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/world-select-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/world-select-modal.sass 856 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/component/new.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/component/new.sass 392 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/component/level-component-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/component/level-component-edit-view.sass 847 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/thang/level-thang-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/thang/level-thang-edit-view.sass 594 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/generate-terrain-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/generate-terrain-modal.sass 3.4 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/app.sass:
       [1] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/app.sass 279 kB {0} [built]
        + 2 hidden modules
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.2 (node_modules/webpack/node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.2 (node_modules/karma/node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none was installed.
npm ERR! Linux 4.4.0-112-generic
npm ERR! argv "/home/travis/.nvm/versions/node/v6.12.2/bin/node" "/home/travis/.nvm/versions/node/v6.12.2/bin/npm" "install"
npm ERR! node v6.12.2
npm ERR! npm  v3.10.10
npm ERR! code ELIFECYCLE
npm ERR! codecombat@1.0.0 postinstall: `bower install && webpack`
npm ERR! Exit status 2
npm ERR!
npm ERR! Failed at the codecombat@1.0.0 postinstall script 'bower install && webpack'.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the codecombat package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     bower install && webpack
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs codecombat
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls codecombat
npm ERR! There is likely additional logging output above.
npm ERR! Please include the following file with any support request:
npm ERR!     /home/travis/build/codecombat/codecombat/npm-debug.log
The command "eval npm install  " failed. Retrying, 3 of 3.
> codecombat@1.0.0 postinstall /home/travis/build/codecombat/codecombat
> bower install && webpack
(node:5351) fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.
Automatically using Karma webpack config
Starting Webpack...
(node:5361) DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
Compiled static file: about.static.pug
Compiled static file: home.static.pug
Compiled static file: layout.static.pug
Compiled static file: legal.static.pug
Compiled static file: main.static.pug
Compiled static file: mock.static.pug
Compiled static file: overworld.static.pug
Compiled static file: premium-features.static.pug
Compiled static file: privacy.static.pug
Hash: 525e43e28f98b0967bf4
Version: webpack 3.12.0
Time: 85942ms
                                                                     Asset       Size  Chunks                    Chunk Names
                                          javascripts/ace/snippets/swig.js  131 bytes          [emitted]
                                        javascripts/chunks/admin.bundle.js     730 kB       0  [emitted]  [big]  admin
                                     javascripts/chunks/artisans.bundle.js     203 kB       2  [emitted]         artisans
                                     javascripts/chunks/teachers.bundle.js     277 kB       3  [emitted]  [big]  teachers
                                      javascripts/chunks/courses.bundle.js     175 kB       4  [emitted]         courses
                                         javascripts/chunks/i18n.bundle.js    64.6 kB       5  [emitted]         i18n
                                      javascripts/chunks/account.bundle.js     140 kB       6  [emitted]         account
                                   javascripts/chunks/contribute.bundle.js      96 kB       7  [emitted]         contribute
                                         javascripts/chunks/play.bundle.js    1.47 MB       8  [emitted]  [big]  play
                                         javascripts/chunks/user.bundle.js    80.3 kB       9  [emitted]         user
                                       javascripts/chunks/ladder.bundle.js     672 kB      10  [emitted]  [big]  ladder
                                        javascripts/chunks/clans.bundle.js     118 kB      11  [emitted]         clans
                           javascripts/chunks/locale/zh-WUU-HANT.bundle.js      14 kB      12  [emitted]         locale/zh-WUU-HANT
                           javascripts/chunks/locale/zh-WUU-HANS.bundle.js  695 bytes      13  [emitted]         locale/zh-WUU-HANS
                               javascripts/chunks/locale/zh-HANT.bundle.js    72.1 kB      14  [emitted]         locale/zh-HANT
                               javascripts/chunks/locale/zh-HANS.bundle.js  626 bytes      15  [emitted]         locale/zh-HANS
                                    javascripts/chunks/locale/vi.bundle.js    71.3 kB      16  [emitted]         locale/vi
                                    javascripts/chunks/locale/uz.bundle.js  658 bytes      17  [emitted]         locale/uz
                                    javascripts/chunks/locale/ur.bundle.js  699 bytes      18  [emitted]         locale/ur
                                    javascripts/chunks/locale/uk.bundle.js     121 kB      19  [emitted]         locale/uk
                                    javascripts/chunks/locale/tr.bundle.js    35.2 kB      20  [emitted]         locale/tr
                                    javascripts/chunks/locale/th.bundle.js    6.26 kB      21  [emitted]         locale/th
                                    javascripts/chunks/locale/sv.bundle.js    44.2 kB      22  [emitted]         locale/sv
                                    javascripts/chunks/locale/sr.bundle.js     148 kB      23  [emitted]         locale/sr
                                    javascripts/chunks/locale/sl.bundle.js    1.61 kB      24  [emitted]         locale/sl
                                    javascripts/chunks/locale/sk.bundle.js      66 kB      25  [emitted]         locale/sk
                                    javascripts/chunks/locale/ru.bundle.js     131 kB      26  [emitted]         locale/ru
                                    javascripts/chunks/locale/ro.bundle.js    53.5 kB      27  [emitted]         locale/ro
                                 javascripts/chunks/locale/pt-PT.bundle.js      91 kB      28  [emitted]         locale/pt-PT
                                 javascripts/chunks/locale/pt-BR.bundle.js     154 kB      29  [emitted]         locale/pt-BR
                                    javascripts/chunks/locale/pl.bundle.js     121 kB      30  [emitted]         locale/pl
                                    javascripts/chunks/locale/nn.bundle.js  763 bytes      31  [emitted]         locale/nn
                                    javascripts/chunks/locale/nl.bundle.js     134 kB      32  [emitted]         locale/nl
                                 javascripts/chunks/locale/nl-NL.bundle.js    8.75 kB      33  [emitted]         locale/nl-NL
                                 javascripts/chunks/locale/nl-BE.bundle.js      16 kB      34  [emitted]         locale/nl-BE
                                    javascripts/chunks/locale/nb.bundle.js    58.4 kB      35  [emitted]         locale/nb
                                    javascripts/chunks/locale/my.bundle.js  714 bytes      36  [emitted]         locale/my
                                    javascripts/chunks/locale/ms.bundle.js    5.25 kB      37  [emitted]         locale/ms
                                    javascripts/chunks/locale/mn.bundle.js  244 bytes      38  [emitted]         locale/mn
                                 javascripts/chunks/locale/mk-MK.bundle.js    19.1 kB      39  [emitted]         locale/mk-MK
                                    javascripts/chunks/locale/mi.bundle.js  661 bytes      40  [emitted]         locale/mi
                                    javascripts/chunks/locale/lt.bundle.js    30.4 kB      41  [emitted]         locale/lt
                                    javascripts/chunks/locale/ko.bundle.js    29.1 kB      42  [emitted]         locale/ko
                                    javascripts/chunks/locale/kk.bundle.js  242 bytes      43  [emitted]         locale/kk
                                    javascripts/chunks/locale/ja.bundle.js    37.3 kB      44  [emitted]         locale/ja
                                    javascripts/chunks/locale/it.bundle.js    76.3 kB      45  [emitted]         locale/it
                                    javascripts/chunks/locale/id.bundle.js     109 kB      46  [emitted]         locale/id
                                    javascripts/chunks/locale/hu.bundle.js     102 kB      47  [emitted]         locale/hu
                                    javascripts/chunks/locale/hr.bundle.js  678 bytes      48  [emitted]         locale/hr
                                    javascripts/chunks/locale/hi.bundle.js    1.32 kB      49  [emitted]         locale/hi
                                    javascripts/chunks/locale/he.bundle.js     118 kB      50  [emitted]         locale/he
                                   javascripts/chunks/locale/haw.bundle.js  678 bytes      51  [emitted]         locale/haw
                                    javascripts/chunks/locale/gl.bundle.js    36.8 kB      52  [emitted]         locale/gl
                                    javascripts/chunks/locale/fr.bundle.js     116 kB      53  [emitted]         locale/fr
                                   javascripts/chunks/locale/fil.bundle.js    12.2 kB      54  [emitted]         locale/fil
                                    javascripts/chunks/locale/fi.bundle.js    45.7 kB      55  [emitted]         locale/fi
                                    javascripts/chunks/locale/fa.bundle.js    3.13 kB      56  [emitted]         locale/fa
                                    javascripts/chunks/locale/et.bundle.js  669 bytes      57  [emitted]         locale/et
                                 javascripts/chunks/locale/es-ES.bundle.js    70.7 kB      58  [emitted]         locale/es-ES
                                javascripts/chunks/locale/es-419.bundle.js     103 kB      59  [emitted]         locale/es-419
                                    javascripts/chunks/locale/eo.bundle.js    1.33 kB      60  [emitted]         locale/eo
                                 javascripts/chunks/locale/en-GB.bundle.js    1.81 kB      61  [emitted]         locale/en-GB
                                    javascripts/chunks/locale/el.bundle.js     163 kB      62  [emitted]         locale/el
                                 javascripts/chunks/locale/de-DE.bundle.js     143 kB      63  [emitted]         locale/de-DE
                                 javascripts/chunks/locale/de-CH.bundle.js    20.5 kB      64  [emitted]         locale/de-CH
                                 javascripts/chunks/locale/de-AT.bundle.js    36.5 kB      65  [emitted]         locale/de-AT
                                    javascripts/chunks/locale/da.bundle.js    75.2 kB      66  [emitted]         locale/da
                                    javascripts/chunks/locale/cs.bundle.js    55.8 kB      67  [emitted]         locale/cs
                                    javascripts/chunks/locale/ca.bundle.js    34.5 kB      68  [emitted]         locale/ca
                                    javascripts/chunks/locale/bg.bundle.js    25.2 kB      69  [emitted]         locale/bg
                                    javascripts/chunks/locale/az.bundle.js    1.09 kB      70  [emitted]         locale/az
                                    javascripts/chunks/locale/ar.bundle.js    11.1 kB      71  [emitted]         locale/ar
                                  javascripts/chunks/ParentsView.bundle.js    38.8 kB      72  [emitted]         ParentsView
                                 javascripts/chunks/LicensorView.bundle.js    61.3 kB      73  [emitted]         LicensorView
                             javascripts/chunks/CertificatesView.bundle.js    22.5 kB      74  [emitted]         CertificatesView
                                  javascripts/chunks/PrivacyView.bundle.js    47.5 kB      75  [emitted]         PrivacyView
                          javascripts/chunks/PremiumFeaturesView.bundle.js    19.5 kB      76  [emitted]         PremiumFeaturesView
                                 javascripts/chunks/NotFoundView.bundle.js    9.58 kB      77  [emitted]         NotFoundView
                                    javascripts/chunks/LegalView.bundle.js    13.5 kB      78  [emitted]         LegalView
                                     javascripts/chunks/HomeView.bundle.js      54 kB      79  [emitted]         HomeView
                                javascripts/chunks/CommunityView.bundle.js    14.9 kB      80  [emitted]         CommunityView
                                      javascripts/chunks/CLAView.bundle.js    13.1 kB      81  [emitted]         CLAView
                                    javascripts/chunks/AboutView.bundle.js    46.1 kB      82  [emitted]         AboutView
                     javascripts/chunks/RestrictedToTeachersView.bundle.js    11.1 kB      83  [emitted]         RestrictedToTeachersView
                     javascripts/chunks/RestrictedToStudentsView.bundle.js      11 kB      84  [emitted]         RestrictedToStudentsView
                                        javascripts/chunks/vimeo.bundle.js      55 kB      85  [emitted]         vimeo
                                                       javascripts/test.js    16.8 MB      86  [emitted]  [big]  test
                                                      stylesheets/test.css     469 kB      86  [emitted]  [big]  test
                             javascripts/app/vendor/aether-coffeescript.js    1.07 MB          [emitted]  [big]
                               javascripts/app/vendor/aether-javascript.js     666 kB          [emitted]  [big]
                                      javascripts/app/vendor/aether-lua.js     249 kB          [emitted]
                                     javascripts/app/vendor/aether-java.js     154 kB          [emitted]
                                   javascripts/app/vendor/aether-python.js     366 kB          [emitted]  [big]
                                     javascripts/app/vendor/aether-html.js     277 kB          [emitted]  [big]
                                                      javascripts/esper.js     958 kB          [emitted]  [big]
                                               javascripts/esper.modern.js     512 kB          [emitted]  [big]
                                                    javascripts/ace/ace.js     373 kB          [emitted]  [big]
                                           javascripts/ace/ext-beautify.js    3.82 kB          [emitted]
                                          javascripts/ace/ext-chromevox.js    6.36 kB          [emitted]
                              javascripts/ace/ext-elastic_tabstops_lite.js    3.84 kB          [emitted]
                                              javascripts/ace/ext-emmet.js    21.5 kB          [emitted]
                                       javascripts/ace/ext-error_marker.js  140 bytes          [emitted]
                                    javascripts/ace/ext-keybinding_menu.js    3.64 kB          [emitted]
                                     javascripts/ace/ext-language_tools.js    34.6 kB          [emitted]
                                            javascripts/ace/ext-linking.js    1.03 kB          [emitted]
                                           javascripts/ace/ext-modelist.js    3.97 kB          [emitted]
                                             javascripts/ace/ext-old_ie.js    11.9 kB          [emitted]
                                          javascripts/ace/ext-searchbox.js    11.7 kB          [emitted]
                                      javascripts/ace/ext-settings_menu.js    12.6 kB          [emitted]
                                         javascripts/ace/ext-spellcheck.js    1.44 kB          [emitted]
                                              javascripts/ace/ext-split.js    4.19 kB          [emitted]
                                   javascripts/ace/ext-static_highlight.js    2.82 kB          [emitted]
                                          javascripts/ace/ext-statusbar.js    1.09 kB          [emitted]
                                           javascripts/ace/ext-textarea.js    9.13 kB          [emitted]
                                          javascripts/ace/ext-themelist.js     1.5 kB          [emitted]
                                         javascripts/ace/ext-whitespace.js    2.89 kB          [emitted]
                                       javascripts/ace/keybinding-emacs.js    24.5 kB          [emitted]
                                         javascripts/ace/keybinding-vim.js    97.1 kB          [emitted]
                                              javascripts/ace/mode-abap.js    5.81 kB          [emitted]
                                               javascripts/ace/mode-abc.js    4.72 kB          [emitted]
                                      javascripts/ace/mode-actionscript.js    20.6 kB          [emitted]
                                               javascripts/ace/mode-ada.js    1.76 kB          [emitted]
                                       javascripts/ace/mode-apache_conf.js    13.9 kB          [emitted]
                                       javascripts/ace/mode-applescript.js    5.41 kB          [emitted]
                                          javascripts/ace/mode-asciidoc.js    8.16 kB          [emitted]
                                      javascripts/ace/mode-assembly_x86.js     8.9 kB          [emitted]
                                        javascripts/ace/mode-autohotkey.js    63.6 kB          [emitted]
                                         javascripts/ace/mode-batchfile.js    4.87 kB          [emitted]
                                               javascripts/ace/mode-bro.js    6.22 kB          [emitted]
                                             javascripts/ace/mode-c_cpp.js    11.1 kB          [emitted]
                                          javascripts/ace/mode-c9search.js    4.09 kB          [emitted]
                                             javascripts/ace/mode-cirru.js       3 kB          [emitted]
                                           javascripts/ace/mode-clojure.js    8.03 kB          [emitted]
                                             javascripts/ace/mode-cobol.js    2.31 kB          [emitted]
                                            javascripts/ace/mode-coffee.js    7.42 kB          [emitted]
                                        javascripts/ace/mode-coldfusion.js    62.6 kB          [emitted]
                                            javascripts/ace/mode-csharp.js    8.85 kB          [emitted]
                                   javascripts/ace/mode-csound_document.js    68.1 kB          [emitted]
                                  javascripts/ace/mode-csound_orchestra.js    36.9 kB          [emitted]
                                      javascripts/ace/mode-csound_score.js    7.47 kB          [emitted]
                                               javascripts/ace/mode-css.js    20.1 kB          [emitted]
                                             javascripts/ace/mode-curly.js    61.1 kB          [emitted]
                                                 javascripts/ace/mode-d.js    8.96 kB          [emitted]
                                              javascripts/ace/mode-dart.js    14.4 kB          [emitted]
                                              javascripts/ace/mode-diff.js    2.41 kB          [emitted]
                                            javascripts/ace/mode-django.js    61.4 kB          [emitted]
                                        javascripts/ace/mode-dockerfile.js    8.24 kB          [emitted]
                                               javascripts/ace/mode-dot.js    7.58 kB          [emitted]
                                            javascripts/ace/mode-drools.js    10.8 kB          [emitted]
                                            javascripts/ace/mode-eiffel.js    2.84 kB          [emitted]
                                               javascripts/ace/mode-ejs.js    70.7 kB          [emitted]
                                            javascripts/ace/mode-elixir.js    15.8 kB          [emitted]
                                               javascripts/ace/mode-elm.js    4.94 kB          [emitted]
                                            javascripts/ace/mode-erlang.js    29.7 kB          [emitted]
                                             javascripts/ace/mode-forth.js       7 kB          [emitted]
                                           javascripts/ace/mode-fortran.js    8.44 kB          [emitted]
                                               javascripts/ace/mode-ftl.js    32.5 kB          [emitted]
                                             javascripts/ace/mode-gcode.js    1.46 kB          [emitted]
                                           javascripts/ace/mode-gherkin.js    2.38 kB          [emitted]
                                         javascripts/ace/mode-gitignore.js  899 bytes          [emitted]
                                              javascripts/ace/mode-glsl.js    13.2 kB          [emitted]
                                         javascripts/ace/mode-gobstones.js    20.5 kB          [emitted]
                                            javascripts/ace/mode-golang.js    6.92 kB          [emitted]
                                     javascripts/ace/mode-graphqlschema.js    3.44 kB          [emitted]
                                            javascripts/ace/mode-groovy.js    22.6 kB          [emitted]
                                              javascripts/ace/mode-haml.js    39.4 kB          [emitted]
                                        javascripts/ace/mode-handlebars.js    61.9 kB          [emitted]
                                     javascripts/ace/mode-haskell_cabal.js    2.28 kB          [emitted]
                                           javascripts/ace/mode-haskell.js    11.5 kB          [emitted]
                                              javascripts/ace/mode-haxe.js    6.54 kB          [emitted]
                                             javascripts/ace/mode-hjson.js    5.98 kB          [emitted]
                                       javascripts/ace/mode-html_elixir.js    77.3 kB          [emitted]
                                         javascripts/ace/mode-html_ruby.js      71 kB          [emitted]
                                              javascripts/ace/mode-html.js    60.1 kB          [emitted]
                                               javascripts/ace/mode-ini.js    2.71 kB          [emitted]
                                                javascripts/ace/mode-io.js    5.67 kB          [emitted]
                                              javascripts/ace/mode-jack.js    5.77 kB          [emitted]
                                              javascripts/ace/mode-jade.js    53.3 kB          [emitted]
                                              javascripts/ace/mode-java.js    21.9 kB          [emitted]
                                        javascripts/ace/mode-javascript.js    18.2 kB          [emitted]
                                              javascripts/ace/mode-json.js    5.18 kB          [emitted]
                                            javascripts/ace/mode-jsoniq.js     233 kB          [emitted]
                                               javascripts/ace/mode-jsp.js    36.6 kB          [emitted]
                                              javascripts/ace/mode-jssm.js     5.9 kB          [emitted]
                                               javascripts/ace/mode-jsx.js    6.97 kB          [emitted]
                                             javascripts/ace/mode-julia.js    7.55 kB          [emitted]
                                            javascripts/ace/mode-kotlin.js    11.8 kB          [emitted]
                                             javascripts/ace/mode-latex.js    5.04 kB          [emitted]
                                              javascripts/ace/mode-lean.js    5.58 kB          [emitted]
                                              javascripts/ace/mode-less.js    22.2 kB          [emitted]
                                            javascripts/ace/mode-liquid.js    32.2 kB          [emitted]
                                              javascripts/ace/mode-lisp.js    1.96 kB          [emitted]
                                       javascripts/ace/mode-live_script.js      20 kB          [emitted]
                                        javascripts/ace/mode-livescript.js    4.98 kB          [emitted]
                                            javascripts/ace/mode-logiql.js    5.71 kB          [emitted]
                                               javascripts/ace/mode-lsl.js    26.6 kB          [emitted]
                                               javascripts/ace/mode-lua.js    7.29 kB          [emitted]
                                           javascripts/ace/mode-luapage.js    68.5 kB          [emitted]
                                            javascripts/ace/mode-lucene.js    1.17 kB          [emitted]
                                          javascripts/ace/mode-makefile.js    6.56 kB          [emitted]
                                          javascripts/ace/mode-markdown.js      67 kB          [emitted]
                                              javascripts/ace/mode-mask.js    42.3 kB          [emitted]
                                            javascripts/ace/mode-matlab.js    20.6 kB          [emitted]
                                              javascripts/ace/mode-maze.js    4.89 kB          [emitted]
                                               javascripts/ace/mode-mel.js    24.9 kB          [emitted]
                                    javascripts/ace/mode-mips_assembler.js    5.96 kB          [emitted]
                                     javascripts/ace/mode-mipsassembler.js    3.19 kB          [emitted]
                                          javascripts/ace/mode-mushcode.js    6.71 kB          [emitted]
                                             javascripts/ace/mode-mysql.js    6.52 kB          [emitted]
                                               javascripts/ace/mode-nix.js    13.3 kB          [emitted]
                                              javascripts/ace/mode-nsis.js    10.1 kB          [emitted]
                                        javascripts/ace/mode-objectivec.js    54.7 kB          [emitted]
                                             javascripts/ace/mode-ocaml.js    15.6 kB          [emitted]
                                            javascripts/ace/mode-pascal.js    4.56 kB          [emitted]
                                              javascripts/ace/mode-perl.js    7.39 kB          [emitted]
                                             javascripts/ace/mode-pgsql.js    56.1 kB          [emitted]
                                               javascripts/ace/mode-php.js     473 kB          [emitted]  [big]
                                               javascripts/ace/mode-pig.js    6.32 kB          [emitted]
                                        javascripts/ace/mode-plain_text.js  506 bytes          [emitted]
                                        javascripts/ace/mode-powershell.js    32.7 kB          [emitted]
                                             javascripts/ace/mode-praat.js    10.3 kB          [emitted]
                                            javascripts/ace/mode-prolog.js    8.38 kB          [emitted]
                                        javascripts/ace/mode-properties.js     1.1 kB          [emitted]
                                          javascripts/ace/mode-protobuf.js    12.8 kB          [emitted]
                                            javascripts/ace/mode-python.js    4.69 kB          [emitted]
                                                 javascripts/ace/mode-r.js       5 kB          [emitted]
                                             javascripts/ace/mode-razor.js    67.2 kB          [emitted]
                                              javascripts/ace/mode-rdoc.js    4.69 kB          [emitted]
                                               javascripts/ace/mode-red.js    12.6 kB          [emitted]
                                             javascripts/ace/mode-rhtml.js    65.1 kB          [emitted]
                                               javascripts/ace/mode-rst.js    3.02 kB          [emitted]
                                              javascripts/ace/mode-ruby.js    10.1 kB          [emitted]
                                              javascripts/ace/mode-rust.js    6.53 kB          [emitted]
                                              javascripts/ace/mode-sass.js    11.6 kB          [emitted]
                                              javascripts/ace/mode-scad.js    6.52 kB          [emitted]
                                             javascripts/ace/mode-scala.js    22.8 kB          [emitted]
                                            javascripts/ace/mode-scheme.js    3.66 kB          [emitted]
                                              javascripts/ace/mode-scss.js    14.3 kB          [emitted]
                                                javascripts/ace/mode-sh.js     7.2 kB          [emitted]
                                               javascripts/ace/mode-sjs.js    21.4 kB          [emitted]
                                            javascripts/ace/mode-smarty.js    63.5 kB          [emitted]
                                          javascripts/ace/mode-snippets.js    3.69 kB          [emitted]
                                      javascripts/ace/mode-soy_template.js    68.6 kB          [emitted]
                                             javascripts/ace/mode-space.js    2.24 kB          [emitted]
                                            javascripts/ace/mode-sparql.js    7.87 kB          [emitted]
                                               javascripts/ace/mode-sql.js    1.84 kB          [emitted]
                                         javascripts/ace/mode-sqlserver.js    16.4 kB          [emitted]
                                            javascripts/ace/mode-stylus.js    14.3 kB          [emitted]
                                               javascripts/ace/mode-svg.js    32.1 kB          [emitted]
                                             javascripts/ace/mode-swift.js    6.94 kB          [emitted]
                                              javascripts/ace/mode-swig.js    31.2 kB          [emitted]
                                               javascripts/ace/mode-tcl.js    6.13 kB          [emitted]
                                               javascripts/ace/mode-tex.js    2.76 kB          [emitted]
                                              javascripts/ace/mode-text.js    0 bytes          [emitted]
                                           javascripts/ace/mode-textile.js    2.09 kB          [emitted]
                                              javascripts/ace/mode-toml.js     2.2 kB          [emitted]
                                               javascripts/ace/mode-tsx.js    20.7 kB          [emitted]
                                            javascripts/ace/mode-turtle.js    5.03 kB          [emitted]
                                              javascripts/ace/mode-twig.js    63.7 kB          [emitted]
                                        javascripts/ace/mode-typescript.js    20.3 kB          [emitted]
                                              javascripts/ace/mode-vala.js    16.6 kB          [emitted]
                                          javascripts/ace/mode-vbscript.js    5.07 kB          [emitted]
                                          javascripts/ace/mode-velocity.js    64.8 kB          [emitted]
                                           javascripts/ace/mode-verilog.js    2.69 kB          [emitted]
                                              javascripts/ace/mode-vhdl.js    2.09 kB          [emitted]
                                            javascripts/ace/mode-wollok.js    20.4 kB          [emitted]
                                               javascripts/ace/mode-xml.js    11.8 kB          [emitted]
                                            javascripts/ace/mode-xquery.js     231 kB          [emitted]
                                              javascripts/ace/mode-yaml.js    4.36 kB          [emitted]
                                          javascripts/ace/snippets/abap.js  131 bytes          [emitted]
                                           javascripts/ace/snippets/abc.js  947 bytes          [emitted]
                                  javascripts/ace/snippets/actionscript.js    2.97 kB          [emitted]
                                           javascripts/ace/snippets/ada.js  129 bytes          [emitted]
                                   javascripts/ace/snippets/apache_conf.js  145 bytes          [emitted]
                                   javascripts/ace/snippets/applescript.js  145 bytes          [emitted]
                                      javascripts/ace/snippets/asciidoc.js  139 bytes          [emitted]
                                  javascripts/ace/snippets/assembly_x86.js  147 bytes          [emitted]
                                    javascripts/ace/snippets/autohotkey.js  143 bytes          [emitted]
                                     javascripts/ace/snippets/batchfile.js  141 bytes          [emitted]
                                           javascripts/ace/snippets/bro.js  126 bytes          [emitted]
                                         javascripts/ace/snippets/c_cpp.js    2.66 kB          [emitted]
                                      javascripts/ace/snippets/c9search.js  139 bytes          [emitted]
                                         javascripts/ace/snippets/cirru.js  133 bytes          [emitted]
                                       javascripts/ace/snippets/clojure.js    2.04 kB          [emitted]
                                         javascripts/ace/snippets/cobol.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/coffee.js    2.23 kB          [emitted]
                                    javascripts/ace/snippets/coldfusion.js  143 bytes          [emitted]
                                        javascripts/ace/snippets/csharp.js  135 bytes          [emitted]
                               javascripts/ace/snippets/csound_document.js  302 bytes          [emitted]
                              javascripts/ace/snippets/csound_orchestra.js    1.07 kB          [emitted]
                                  javascripts/ace/snippets/csound_score.js  147 bytes          [emitted]
                                           javascripts/ace/snippets/css.js    19.6 kB          [emitted]
                                         javascripts/ace/snippets/curly.js  133 bytes          [emitted]
                                             javascripts/ace/snippets/d.js  125 bytes          [emitted]
                                          javascripts/ace/snippets/dart.js    1.32 kB          [emitted]
                                          javascripts/ace/snippets/diff.js  551 bytes          [emitted]
                                                      apcsp-local/index.md   86 bytes          [emitted]
                                                   apcsp-local/nested/1.md   22 bytes          [emitted]
                                                              channel.html   59 bytes          [emitted]
                                                    dexecure-c167a5675c.js    2.27 kB          [emitted]
                        fonts/_ySUJH_bn48VBG8sNSi3USBnSvpkopQaUR-2r7iU.ttf     221 kB          [emitted]
                        fonts/702ZOKiLJc3WVjuplzC3USBnSvpkopQaUR-2r7iU.ttf     224 kB          [emitted]
                                                         fonts/cousine.css  776 bytes          [emitted]
                                          fonts/cousine/Apache License.txt    11.3 kB          [emitted]
                                            fonts/cousine/Cousine-Bold.ttf     297 kB          [emitted]  [big]
                                      fonts/cousine/Cousine-BoldItalic.ttf     273 kB          [emitted]  [big]
                                          fonts/cousine/Cousine-Italic.ttf     271 kB          [emitted]  [big]
                                         fonts/cousine/Cousine-Regular.ttf     309 kB          [emitted]  [big]
                        fonts/FxslNkTTHtojXrkp-xBEM87DM3yorPOrvA-vB930.ttf     265 kB          [emitted]  [big]
                                    fonts/glyphicons-halflings-regular.eot    20.3 kB          [emitted]
                                    fonts/glyphicons-halflings-regular.svg    62.9 kB          [emitted]
                                    fonts/glyphicons-halflings-regular.ttf    41.3 kB          [emitted]
                                   fonts/glyphicons-halflings-regular.woff    23.3 kB          [emitted]
                                                        fonts/openSans.css  430 bytes          [emitted]
                                               fonts/openSansCondensed.css  240 bytes          [emitted]
                      images/achievements/achievement_background_light.png     2.6 kB          [emitted]
                     images/achievements/achievement_background_locked.png    2.26 kB          [emitted]
                            images/achievements/achievement_background.png    2.65 kB          [emitted]
                                        images/achievements/bar_border.png     1.2 kB          [emitted]
                             images/achievements/border_diamond_locked.png    16.1 kB          [emitted]
                                    images/achievements/border_diamond.png    22.8 kB          [emitted]
                                images/achievements/border_gold_locked.png    6.28 kB          [emitted]
                                       images/achievements/border_gold.png    9.31 kB          [emitted]
                              images/achievements/border_silver_locked.png    5.96 kB          [emitted]
                                     images/achievements/border_silver.png    8.65 kB          [emitted]
                               images/achievements/border_stone_locked.png    5.35 kB          [emitted]
                                      images/achievements/border_stone.png    7.38 kB          [emitted]
                                images/achievements/border_wood_locked.png    7.39 kB          [emitted]
                                       images/achievements/border_wood.png    11.4 kB          [emitted]
                                          images/achievements/cross-01.png    4.64 kB          [emitted]
                                            images/achievements/cup-01.png    4.02 kB          [emitted]
                                            images/achievements/cup-02.png    7.35 kB          [emitted]
                                           images/achievements/default.png    9.04 kB          [emitted]
                                          images/achievements/level-bg.png    1.19 kB          [emitted]
                                        images/achievements/message-01.png  619 bytes          [emitted]
                                          images/achievements/patch-01.png    4.32 kB          [emitted]
                                        images/achievements/pendant-01.png    5.98 kB          [emitted]
                                         images/achievements/scroll-01.png    5.13 kB          [emitted]
                                              images/achievements/star.png    8.19 kB          [emitted]
                                         images/achievements/swords-01.png    4.73 kB          [emitted]
                                      images/Adobe_PDF_file_icon_32x32.png  917 bytes          [emitted]
                         images/common/button-background-active-border.png    17.4 kB          [emitted]
                                images/common/button-background-active.png     2.4 kB          [emitted]
                  images/common/button-background-danger-active-border.png  705 bytes          [emitted]
                         images/common/button-background-danger-active.png  811 bytes          [emitted]
                images/common/button-background-danger-disabled-border.png  704 bytes          [emitted]
                       images/common/button-background-danger-disabled.png  811 bytes          [emitted]
                 images/common/button-background-danger-pressed-border.png  705 bytes          [emitted]
                        images/common/button-background-danger-pressed.png  810 bytes          [emitted]
                       images/common/button-background-disabled-border.png      17 kB          [emitted]
                              images/common/button-background-disabled.png    1.47 kB          [emitted]
                        images/common/button-background-pressed-border.png    17.3 kB          [emitted]
                               images/common/button-background-pressed.png    2.53 kB          [emitted]
                 images/common/button-background-primary-active-border.png  704 bytes          [emitted]
                        images/common/button-background-primary-active.png  810 bytes          [emitted]
               images/common/button-background-primary-disabled-border.png  704 bytes          [emitted]
                      images/common/button-background-primary-disabled.png  811 bytes          [emitted]
                images/common/button-background-primary-pressed-border.png  704 bytes          [emitted]
                       images/common/button-background-primary-pressed.png  811 bytes          [emitted]
                 images/common/button-background-success-active-border.png  704 bytes          [emitted]
                        images/common/button-background-success-active.png  811 bytes          [emitted]
               images/common/button-background-success-inactive-border.png  705 bytes          [emitted]
                      images/common/button-background-success-inactive.png  811 bytes          [emitted]
                images/common/button-background-success-pressed-border.png  704 bytes          [emitted]
                       images/common/button-background-success-pressed.png  811 bytes          [emitted]
                 images/common/button-background-warning-active-border.png  705 bytes          [emitted]
                        images/common/button-background-warning-active.png  811 bytes          [emitted]
               images/common/button-background-warning-disabled-border.png  704 bytes          [emitted]
                      images/common/button-background-warning-disabled.png  811 bytes          [emitted]
                images/common/button-background-warning-pressed-border.png  703 bytes          [emitted]
                       images/common/button-background-warning-pressed.png  811 bytes          [emitted]
                                 images/common/button-create-new-class.png    3.37 kB          [emitted]
                                images/common/button-finish-signing-up.png    3.31 kB          [emitted]
                                      images/common/button-get-started.png    2.65 kB          [emitted]
                                 images/common/button-go-to-my-classes.png    3.53 kB          [emitted]
                                   images/common/code_languages/c_icon.png  227 bytes          [emitted]
                                  images/common/code_languages/c_small.png     2.9 kB          [emitted]
                             images/common/code_languages/clojure_icon.png  194 bytes          [emitted]
                            images/common/code_languages/clojure_small.png    3.87 kB          [emitted]
                        images/common/code_languages/coffeescript_icon.png  174 bytes          [emitted]
                       images/common/code_languages/coffeescript_small.png    3.34 kB          [emitted]
                                 images/common/code_languages/cpp_icon.png  231 bytes          [emitted]
                                images/common/code_languages/cpp_small.png    2.84 kB          [emitted]
                              images/common/code_languages/csharp_icon.png  217 bytes          [emitted]
                             images/common/code_languages/csharp_small.png     2.7 kB          [emitted]
                                  images/common/code_languages/go_icon.png  165 bytes          [emitted]
                                 images/common/code_languages/go_small.png    2.88 kB          [emitted]
                                  images/common/code_languages/io_icon.png  163 bytes          [emitted]
                                 images/common/code_languages/io_small.png    2.36 kB          [emitted]
                                images/common/code_languages/java_icon.png  197 bytes          [emitted]
                               images/common/code_languages/java_small.png    3.23 kB          [emitted]
                          images/common/code_languages/javascript_icon.png  157 bytes          [emitted]
                         images/common/code_languages/javascript_small.png    2.11 kB          [emitted]
                                 images/common/code_languages/lua_icon.png  132 bytes          [emitted]
                                images/common/code_languages/lua_small.png     2.9 kB          [emitted]
                                 images/common/code_languages/php_icon.png  218 bytes          [emitted]
                                        javascripts/ace/snippets/django.js       4 kB          [emitted]
                                    javascripts/ace/snippets/dockerfile.js  143 bytes          [emitted]
                                           javascripts/ace/snippets/dot.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/drools.js  370 bytes          [emitted]
                                        javascripts/ace/snippets/eiffel.js  135 bytes          [emitted]
                                           javascripts/ace/snippets/ejs.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/elixir.js  129 bytes          [emitted]
                                           javascripts/ace/snippets/elm.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/erlang.js    3.57 kB          [emitted]
                                         javascripts/ace/snippets/forth.js  133 bytes          [emitted]
                                       javascripts/ace/snippets/fortran.js  137 bytes          [emitted]
                                           javascripts/ace/snippets/ftl.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/gcode.js  133 bytes          [emitted]
                                       javascripts/ace/snippets/gherkin.js  137 bytes          [emitted]
                                     javascripts/ace/snippets/gitignore.js  141 bytes          [emitted]
                                          javascripts/ace/snippets/glsl.js  131 bytes          [emitted]
                                     javascripts/ace/snippets/gobstones.js  607 bytes          [emitted]
                                          javascripts/ace/snippets/haml.js  448 bytes          [emitted]
                                    javascripts/ace/snippets/handlebars.js  143 bytes          [emitted]
                                 javascripts/ace/snippets/haskell_cabal.js  149 bytes          [emitted]
                                       javascripts/ace/snippets/haskell.js    1.98 kB          [emitted]
                                          javascripts/ace/snippets/haxe.js  131 bytes          [emitted]
                                         javascripts/ace/snippets/hjson.js  128 bytes          [emitted]
                                   javascripts/ace/snippets/html_elixir.js  145 bytes          [emitted]
                                     javascripts/ace/snippets/html_ruby.js  141 bytes          [emitted]
                                          javascripts/ace/snippets/html.js    19.1 kB          [emitted]
                                           javascripts/ace/snippets/ini.js  129 bytes          [emitted]
                                            javascripts/ace/snippets/io.js    1.22 kB          [emitted]
                                          javascripts/ace/snippets/jack.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/jade.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/java.js    4.32 kB          [emitted]
                                    javascripts/ace/snippets/javascript.js    3.84 kB          [emitted]
                                          javascripts/ace/snippets/json.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/jsoniq.js    1.72 kB          [emitted]
                                           javascripts/ace/snippets/jsp.js    2.78 kB          [emitted]
                                          javascripts/ace/snippets/jssm.js  127 bytes          [emitted]
                                           javascripts/ace/snippets/jsx.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/julia.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/kotlin.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/latex.js  133 bytes          [emitted]
                                          javascripts/ace/snippets/lean.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/less.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/liquid.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/lisp.js  131 bytes          [emitted]
                                   javascripts/ace/snippets/live_script.js  134 bytes          [emitted]
                                    javascripts/ace/snippets/livescript.js  143 bytes          [emitted]
                                        javascripts/ace/snippets/logiql.js  135 bytes          [emitted]
                                           javascripts/ace/snippets/lsl.js    35.4 kB          [emitted]
                                           javascripts/ace/snippets/lua.js  508 bytes          [emitted]
                                       javascripts/ace/snippets/luapage.js  137 bytes          [emitted]
                                        javascripts/ace/snippets/lucene.js  135 bytes          [emitted]
                                      javascripts/ace/snippets/makefile.js  198 bytes          [emitted]
                                      javascripts/ace/snippets/markdown.js    1.97 kB          [emitted]
                                          javascripts/ace/snippets/mask.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/matlab.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/maze.js  270 bytes          [emitted]
                                           javascripts/ace/snippets/mel.js  129 bytes          [emitted]
                                javascripts/ace/snippets/mips_assembler.js  151 bytes          [emitted]
                                 javascripts/ace/snippets/mipsassembler.js  136 bytes          [emitted]
                                      javascripts/ace/snippets/mushcode.js  139 bytes          [emitted]
                                         javascripts/ace/snippets/mysql.js  133 bytes          [emitted]
                                           javascripts/ace/snippets/nix.js  129 bytes          [emitted]
                                          javascripts/ace/snippets/nsis.js  127 bytes          [emitted]
                                    javascripts/ace/snippets/objectivec.js  143 bytes          [emitted]
                                         javascripts/ace/snippets/ocaml.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/pascal.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/perl.js    5.51 kB          [emitted]
                                         javascripts/ace/snippets/pgsql.js  133 bytes          [emitted]
                                           javascripts/ace/snippets/php.js    6.76 kB          [emitted]
                                           javascripts/ace/snippets/pig.js  129 bytes          [emitted]
                                    javascripts/ace/snippets/plain_text.js  143 bytes          [emitted]
                                    javascripts/ace/snippets/powershell.js  143 bytes          [emitted]
                                         javascripts/ace/snippets/praat.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/prolog.js  135 bytes          [emitted]
                                    javascripts/ace/snippets/properties.js  143 bytes          [emitted]
                                      javascripts/ace/snippets/protobuf.js  132 bytes          [emitted]
                                        javascripts/ace/snippets/python.js    3.67 kB          [emitted]
                                             javascripts/ace/snippets/r.js    2.63 kB          [emitted]
                                         javascripts/ace/snippets/razor.js  164 bytes          [emitted]
                                          javascripts/ace/snippets/rdoc.js  131 bytes          [emitted]
                                           javascripts/ace/snippets/red.js  123 bytes          [emitted]
                                         javascripts/ace/snippets/rhtml.js  133 bytes          [emitted]
                                           javascripts/ace/snippets/rst.js  442 bytes          [emitted]
                                          javascripts/ace/snippets/ruby.js    21.3 kB          [emitted]
                                          javascripts/ace/snippets/rust.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/sass.js  131 bytes          [emitted]
                                          javascripts/ace/snippets/scad.js  131 bytes          [emitted]
                                         javascripts/ace/snippets/scala.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/scheme.js  135 bytes          [emitted]
                                          javascripts/ace/snippets/scss.js  131 bytes          [emitted]
                                            javascripts/ace/snippets/sh.js    2.05 kB          [emitted]
                                           javascripts/ace/snippets/sjs.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/smarty.js  135 bytes          [emitted]
                                      javascripts/ace/snippets/snippets.js  297 bytes          [emitted]
                                  javascripts/ace/snippets/soy_template.js  147 bytes          [emitted]
                                         javascripts/ace/snippets/space.js  133 bytes          [emitted]
                                        javascripts/ace/snippets/sparql.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/groovy.js  135 bytes          [emitted]
                                 javascripts/ace/snippets/graphqlschema.js  662 bytes          [emitted]
                                        javascripts/ace/snippets/golang.js  135 bytes          [emitted]
                                images/common/code_languages/php_small.png    2.56 kB          [emitted]
                              images/common/code_languages/python_icon.png  188 bytes          [emitted]
                             images/common/code_languages/python_small.png    3.28 kB          [emitted]
                                images/common/code_languages/ruby_icon.png  254 bytes          [emitted]
                               images/common/code_languages/ruby_small.png    2.51 kB          [emitted]
                               images/common/code_languages/swift_icon.png  170 bytes          [emitted]
                              images/common/code_languages/swift_small.png    2.14 kB          [emitted]
                                images/common/codeplay/CodePlay_Lockup.png    90.9 kB          [emitted]
                                       images/common/codeplay/CodePlay.png    80.2 kB          [emitted]
        images/common/codeplay/DE_ChooseHeroPage_Ideapad710s_800x90_DE.png    65.2 kB          [emitted]
                images/common/codeplay/DE_InLevelPage_Y700_1132X283_DE.png    76.4 kB          [emitted]
               images/common/codeplay/DE_LevelsPage_MIIX510_160x480_DE.png    88.2 kB          [emitted]
                 images/common/codeplay/DE_VictoryPage_Y910_735x100_DE.png    58.5 kB          [emitted]
           images/common/codeplay/MX_ChooseHeroPage_YogaBook_800x90_MX.png    55.3 kB          [emitted]
                images/common/codeplay/MX_InLevelPage_Y700_1132X283_MX.png    89.7 kB          [emitted]
                   images/common/codeplay/MX_LevelsPage_910_160x480_MX.png    91.7 kB          [emitted]
             images/common/codeplay/MX_VictoryPage_YogaBook_735x100_MX.png    46.3 kB          [emitted]
               images/common/codeplay/NA_ChooseHeroPage_Yoga520_800x90.png    47.9 kB          [emitted]
     images/common/codeplay/NA_InLevelPage_Y700_1132X283_ingameProduct.png    65.6 kB          [emitted]
                     images/common/codeplay/NA_LevelsPage_Cube_160x480.png      67 kB          [emitted]
        images/common/codeplay/NA_VictoryPage_Y710_735x100_VictoryPage.png    46.7 kB          [emitted]
                               images/common/codeplay/SweepstakesEntry.png      15 kB          [emitted]
               images/common/codeplay/UK_ChooseHeroPage_Yoga510_800x90.png    47.2 kB          [emitted]
     images/common/codeplay/UK_InLevelPage_Y700_1132X283_ingameProduct.png    65.6 kB          [emitted]
                     images/common/codeplay/UK_LevelsPage_Cube_160x480.png    73.1 kB          [emitted]
     images/common/codeplay/UK_VictoryPage_Miix510_735x100_VictoryPage.png      39 kB          [emitted]
                                                     images/common/gem.png    3.13 kB          [emitted]
           images/common/lang-nl/button-background-ideal-active-border.png    5.36 kB          [emitted]
                                        images/common/particles/bullet.png  443 bytes          [emitted]
                                       images/common/particles/bullet2.png    1.42 kB          [emitted]
                                   images/common/particles/cloud_small.png    7.33 kB          [emitted]
                                         images/common/particles/cloud.png    78.4 kB          [emitted]
                                         images/common/particles/smoke.png    14.2 kB          [emitted]
                                          images/common/particles/star.png    3.62 kB          [emitted]
                                                        images/favicon.ico  461 bytes          [emitted]
                                                   images/generic-icon.png    2.49 kB          [emitted]
                            images/level/code_editor_background_border.png    25.9 kB          [emitted]
                                   images/level/code_editor_background.png    32.3 kB          [emitted]
                       images/level/code_editor_error_background_arrow.png  825 bytes          [emitted]
                             images/level/code_editor_error_background.png    4.61 kB          [emitted]
                              images/level/code_editor_info_background.png    10.4 kB          [emitted]
                                images/level/code_editor_top_bar_hinge.png  478 bytes          [emitted]
                      images/level/code_editor_top_bar_wood_background.png    13.3 kB          [emitted]
                           images/level/code_editor_warning_background.png    9.58 kB          [emitted]
                             images/level/code_palette_wood_background.png    44.9 kB          [emitted]
                                  images/level/code_toolbar_background.png       6 kB          [emitted]
                   images/level/code_toolbar_run_button_active_pressed.png    3.35 kB          [emitted]
                           images/level/code_toolbar_run_button_active.png    3.46 kB          [emitted]
                     images/level/code_toolbar_run_button_zazz_pressed.png    3.67 kB          [emitted]
                             images/level/code_toolbar_run_button_zazz.png    3.74 kB          [emitted]
                images/level/code_toolbar_submit_button_active_pressed.png    3.74 kB          [emitted]
                        images/level/code_toolbar_submit_button_active.png    3.84 kB          [emitted]
                  images/level/code_toolbar_submit_button_zazz_pressed.png    3.95 kB          [emitted]
                          images/level/code_toolbar_submit_button_zazz.png       4 kB          [emitted]
                                   images/level/control_bar_background.png    24.4 kB          [emitted]
                                     images/level/control_bar_cap_left.png    10.6 kB          [emitted]
                                    images/level/control_bar_cap_right.png    8.29 kB          [emitted]
                                 images/level/control_bar_chain_center.png      11 kB          [emitted]
                                  images/level/control_bar_chain_right.png    15.7 kB          [emitted]
                        images/level/control_bar_level_name_background.png    6.36 kB          [emitted]
                                images/level/csedweek-logo-final-small.jpg    52.7 kB          [emitted]
                                      images/level/dialogue_background.png    8.74 kB          [emitted]
                                        images/level/footer_background.jpg     137 kB          [emitted]
                             images/level/goals_background_with_scores.png    9.92 kB          [emitted]
                                         images/level/goals_background.png    4.86 kB          [emitted]
                                          images/level/gold_background.png    1.28 kB          [emitted]
                                                images/level/gold_icon.png    1.15 kB          [emitted]
                                           images/level/hud_background.png    5.04 kB          [emitted]
                                                images/level/hud_hinge.png  973 bytes          [emitted]
                                           images/level/hud_info_icons.png    6.15 kB          [emitted]
                                      images/level/hud_wood_background.png    18.5 kB          [emitted]
                                         images/level/loading_bar_back.png  299 bytes          [emitted]
                                         images/level/loading_bar_fill.png  514 bytes          [emitted]
                                          images/level/loading_bar_rim.png    25.7 kB          [emitted]
                                   images/level/loading_left_wing_1366.jpg     111 kB          [emitted]
                                   images/level/loading_left_wing_1920.jpg     175 kB          [emitted]
                                  images/level/loading_right_wing_1366.jpg     107 kB          [emitted]
                                  images/level/loading_right_wing_1920.jpg     168 kB          [emitted]
                                                  images/level/pointer.png      13 kB          [emitted]
                                       images/level/popover_background.png    1.88 kB          [emitted]
                                images/level/popover_border_background.png  988 bytes          [emitted]
                                      images/level/scrubber_background.png    5.88 kB          [emitted]
                                          images/level/scrubber_groove.png    1.25 kB          [emitted]
                                            images/level/scrubber_knob.png    2.29 kB          [emitted]
                                       images/level/thang_avatar_frame.png    3.53 kB          [emitted]
                                                  images/level/victory.png    92.7 kB          [emitted]
                                             images/level/wood_texture.png      57 kB          [emitted]
                                                  images/loading_image.png    23.8 kB          [emitted]
                                                 images/minecraft/bans.jpg     104 kB          [emitted]
                                                 images/minecraft/dirt.png  266 bytes          [emitted]
                                           images/minecraft/grass_side.png  408 bytes          [emitted]
                                            images/minecraft/grass_top.png    15.3 kB          [emitted]
                                                images/minecraft/hans4.png     108 kB          [emitted]
                                      images/minecraft/icon_stone_pick.png    20.9 kB          [emitted]
                                       images/pages/about/bracket_left.png    2.74 kB          [emitted]
                                      images/pages/about/bracket_right.png    2.76 kB          [emitted]
                                       images/pages/about/bryukh_small.png    6.45 kB          [emitted]
                                       images/pages/about/carlos_small.png    8.39 kB          [emitted]
                               images/pages/about/character_silouhette.png    8.04 kB          [emitted]
                     images/pages/about/codebackground_zoom_compressed.png    1.29 MB          [emitted]  [big]
                                           javascripts/ace/snippets/sql.js  942 bytes          [emitted]
                                     javascripts/ace/snippets/sqlserver.js    2.14 kB          [emitted]
                                        javascripts/ace/snippets/stylus.js  135 bytes          [emitted]
                                           javascripts/ace/snippets/svg.js  129 bytes          [emitted]
                                         javascripts/ace/snippets/swift.js  133 bytes          [emitted]
                                       javascripts/chunks/editor.bundle.js     633 kB       1  [emitted]  [big]  editor
                                           javascripts/ace/snippets/tcl.js    1.69 kB          [emitted]
                                           javascripts/ace/snippets/tex.js    3.64 kB          [emitted]
                                          javascripts/ace/snippets/text.js  131 bytes          [emitted]
                                       javascripts/ace/snippets/textile.js  540 bytes          [emitted]
                                          javascripts/ace/snippets/toml.js  131 bytes          [emitted]
                                           javascripts/ace/snippets/tsx.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/turtle.js  129 bytes          [emitted]
                                          javascripts/ace/snippets/twig.js  131 bytes          [emitted]
                                    javascripts/ace/snippets/typescript.js  143 bytes          [emitted]
                                          javascripts/ace/snippets/vala.js    3.13 kB          [emitted]
                                      javascripts/ace/snippets/vbscript.js  139 bytes          [emitted]
                                      javascripts/ace/snippets/velocity.js  651 bytes          [emitted]
                                       javascripts/ace/snippets/verilog.js  137 bytes          [emitted]
                                          javascripts/ace/snippets/vhdl.js  131 bytes          [emitted]
                                        javascripts/ace/snippets/wollok.js    1.26 kB          [emitted]
                                           javascripts/ace/snippets/xml.js  129 bytes          [emitted]
                                        javascripts/ace/snippets/xquery.js    1.72 kB          [emitted]
                                          javascripts/ace/snippets/yaml.js  131 bytes          [emitted]
                                         javascripts/ace/theme-ambiance.js    27.8 kB          [emitted]
                                            javascripts/ace/theme-chaos.js    2.84 kB          [emitted]
                                           javascripts/ace/theme-chrome.js    2.71 kB          [emitted]
                                  javascripts/ace/theme-clouds_midnight.js    2.43 kB          [emitted]
                                           javascripts/ace/theme-clouds.js    2.08 kB          [emitted]
                                           javascripts/ace/theme-cobalt.js    2.35 kB          [emitted]
                                   javascripts/ace/theme-crimson_editor.js    2.81 kB          [emitted]
                                             javascripts/ace/theme-dawn.js    2.24 kB          [emitted]
                                          javascripts/ace/theme-dracula.js    2.29 kB          [emitted]
                                      javascripts/ace/theme-dreamweaver.js    3.14 kB          [emitted]
                                          javascripts/ace/theme-eclipse.js    2.13 kB          [emitted]
                                           javascripts/ace/theme-github.js    2.18 kB          [emitted]
                                              javascripts/ace/theme-gob.js    2.38 kB          [emitted]
                                          javascripts/ace/theme-gruvbox.js    1.67 kB          [emitted]
                                     javascripts/ace/theme-idle_fingers.js    2.25 kB          [emitted]
                                         javascripts/ace/theme-iplastic.js    6.48 kB          [emitted]
                                      javascripts/ace/theme-katzenmilch.js    3.13 kB          [emitted]
                                         javascripts/ace/theme-kr_theme.js     2.3 kB          [emitted]
                                           javascripts/ace/theme-kuroir.js    2.05 kB          [emitted]
                                   javascripts/ace/theme-merbivore_soft.js    2.45 kB          [emitted]
                                        javascripts/ace/theme-merbivore.js    2.24 kB          [emitted]
                                  javascripts/ace/theme-mono_industrial.js    2.79 kB          [emitted]
                                          javascripts/ace/theme-monokai.js    2.38 kB          [emitted]
                                   javascripts/ace/theme-pastel_on_dark.js    2.63 kB          [emitted]
                                   javascripts/ace/theme-solarized_dark.js    2.31 kB          [emitted]
                                  javascripts/ace/theme-solarized_light.js    2.36 kB          [emitted]
                                        javascripts/ace/theme-sqlserver.js    2.89 kB          [emitted]
                                         javascripts/ace/theme-terminal.js    2.91 kB          [emitted]
                                         javascripts/ace/theme-textmate.js    2.58 kB          [emitted]
                              javascripts/ace/theme-tomorrow_night_blue.js    3.03 kB          [emitted]
                            javascripts/ace/theme-tomorrow_night_bright.js     3.5 kB          [emitted]
                          javascripts/ace/theme-tomorrow_night_eighties.js    3.22 kB          [emitted]
                                   javascripts/ace/theme-tomorrow_night.js    2.82 kB          [emitted]
                                         javascripts/ace/theme-tomorrow.js    2.56 kB          [emitted]
                                         javascripts/ace/theme-twilight.js     2.5 kB          [emitted]
                                      javascripts/ace/theme-vibrant_ink.js     2.2 kB          [emitted]
                                            javascripts/ace/theme-xcode.js    1.92 kB          [emitted]
                                          javascripts/ace/worker-coffee.js     191 kB          [emitted]
                                             javascripts/ace/worker-css.js     141 kB          [emitted]
                                            javascripts/ace/worker-html.js     217 kB          [emitted]
                                      javascripts/ace/worker-javascript.js     165 kB          [emitted]
                                            javascripts/ace/worker-json.js    32.9 kB          [emitted]
                                             javascripts/ace/worker-lua.js    47.1 kB          [emitted]
                                             javascripts/ace/worker-php.js    78.3 kB          [emitted]
                                             javascripts/ace/worker-xml.js    55.5 kB          [emitted]
                                          javascripts/ace/worker-xquery.js    1.63 MB          [emitted]  [big]
                                      images/pages/about/daniela_small.png    22.4 kB          [emitted]
                                             images/pages/about/desert.jpg     160 kB          [emitted]
                                             images/pages/about/desert.png     498 kB          [emitted]  [big]
                                            images/pages/about/dungeon.jpg    98.3 kB          [emitted]
                                            images/pages/about/dungeon.png     466 kB          [emitted]  [big]
                                             images/pages/about/forest.jpg     239 kB          [emitted]
                                             images/pages/about/forest.png     783 kB          [emitted]  [big]
                                       images/pages/about/george_small.png    7.49 kB          [emitted]
                                     images/pages/about/github_avatars.png     301 kB          [emitted]  [big]
                                             images/pages/about/github.png    6.66 kB          [emitted]
                                            images/pages/about/glacier.jpg     218 kB          [emitted]
                                            images/pages/about/glacier.png    1.04 MB          [emitted]  [big]
                                        images/pages/about/globe_green.png    11.2 kB          [emitted]
                                        images/pages/about/globe_white.png    8.09 kB          [emitted]
                                         images/pages/about/jose_small.png    8.44 kB          [emitted]
                                         images/pages/about/josh_small.png    7.63 kB          [emitted]
                                   images/pages/about/languages_group1.png    10.6 kB          [emitted]
                                   images/pages/about/languages_group2.png    9.28 kB          [emitted]
                                          images/pages/about/languages.png    19.9 kB          [emitted]
                                      images/pages/about/michael_small.png    6.53 kB          [emitted]
                                   images/pages/about/new_languages_xs.png    48.2 kB          [emitted]
                                      images/pages/about/new_languages.png    49.6 kB          [emitted]
                                         images/pages/about/oleg_small.png    7.25 kB          [emitted]
                                        images/pages/about/pavel_small.png    8.12 kB          [emitted]
                                        images/pages/about/placeholder.png    8.82 kB          [emitted]
                                  images/pages/about/screenshot_desert.png     114 kB          [emitted]
                                 images/pages/about/screenshot_dungeon.png    90.9 kB          [emitted]
                                  images/pages/about/screenshot_forest.png     147 kB          [emitted]
                                 images/pages/about/screenshot_glacier.png     151 kB          [emitted]
                                             images/pages/about/sketch.png     197 kB          [emitted]
                            images/pages/about/team-avatars/cat-avatar.png     6.9 kB          [emitted]
                          images/pages/about/team-avatars/david-avatar.png    15.6 kB          [emitted]
                         images/pages/about/team-avatars/dchase-avatar.png    11.2 kB          [emitted]
                         images/pages/about/team-avatars/elliot-avatar.png    22.6 kB          [emitted]
                           images/pages/about/team-avatars/jane-avatar.png    15.6 kB          [emitted]
                           images/pages/about/team-avatars/josh-avatar.png    8.83 kB          [emitted]
                       images/pages/about/team-avatars/lawrence-avatar.png    10.4 kB          [emitted]
                           images/pages/about/team-avatars/lisa-avatar.png    18.1 kB          [emitted]
                            images/pages/about/team-avatars/liz-avatar.png    12.5 kB          [emitted]
                           images/pages/about/team-avatars/maka-avatar.png    8.44 kB          [emitted]
                           images/pages/about/team-avatars/matt-avatar.png      21 kB          [emitted]
                           images/pages/about/team-avatars/nick-avatar.png    11.4 kB          [emitted]
                          images/pages/about/team-avatars/nolan-avatar.png    17.9 kB          [emitted]
                        images/pages/about/team-avatars/phoenix-avatar.png      23 kB          [emitted]
                            images/pages/about/team-avatars/rob-avatar.png    18.1 kB          [emitted]
                        images/pages/about/team-avatars/robarev-avatar.png    10.2 kB          [emitted]
                          images/pages/about/team-avatars/robin-avatar.png    17.5 kB          [emitted]
                          images/pages/about/team-avatars/scott-avatar.png    8.21 kB          [emitted]
                           images/pages/about/team-avatars/sean-avatar.png    22.1 kB          [emitted]
                      images/pages/about/team-avatars/shubhangi-avatar.png    10.9 kB          [emitted]
                          images/pages/about/team-avatars/vicki-avatar.png    13.1 kB          [emitted]
                     images/pages/about/team-headshots/andrew-headshot.png    21.3 kB          [emitted]
                        images/pages/about/team-headshots/cat-headshot.png    21.2 kB          [emitted]
                   images/pages/about/team-headshots/chethana-headshot.png      20 kB          [emitted]
                      images/pages/about/team-headshots/david-headshot.png      22 kB          [emitted]
                     images/pages/about/team-headshots/dchase-headshot.jpg    9.47 kB          [emitted]
                     images/pages/about/team-headshots/dchase-headshot.png    20.6 kB          [emitted]
                     images/pages/about/team-headshots/elliot-headshot.png    22.2 kB          [emitted]
                       images/pages/about/team-headshots/jane-headshot.png      21 kB          [emitted]
                       images/pages/about/team-headshots/josh-headshot.png    26.2 kB          [emitted]
                   images/pages/about/team-headshots/lawrence-headshot.jpg    8.57 kB          [emitted]
                       images/pages/about/team-headshots/lisa-headshot.png    20.7 kB          [emitted]
                        images/pages/about/team-headshots/liz-headshot.png    18.3 kB          [emitted]
                       images/pages/about/team-headshots/maka-headshot.png    22.4 kB          [emitted]
                       images/pages/about/team-headshots/matt-headshot.png    23.2 kB          [emitted]
                       images/pages/about/team-headshots/nick-headshot.png    40.2 kB          [emitted]
                      images/pages/about/team-headshots/nolan-headshot.png    22.4 kB          [emitted]
                    images/pages/about/team-headshots/phoenix-headshot.png    23.8 kB          [emitted]
                        images/pages/about/team-headshots/rob-headshot.png      22 kB          [emitted]
                    images/pages/about/team-headshots/robarev-headshot.jpg    8.79 kB          [emitted]
                      images/pages/about/team-headshots/robin-headshot.png    21.2 kB          [emitted]
                      images/pages/about/team-headshots/scott-headshot.png    25.5 kB          [emitted]
                       images/pages/about/team-headshots/sean-headshot.png    23.2 kB          [emitted]
                  images/pages/about/team-headshots/shubhangi-headshot.jpg    8.81 kB          [emitted]
                  images/pages/about/team-headshots/stephanie-headshot.png    21.6 kB          [emitted]
                      images/pages/about/team-headshots/vicki-headshot.jpg    9.29 kB          [emitted]
                                images/pages/account/profile/education.png  328 bytes          [emitted]
                            images/pages/account/profile/icon_facebook.png  332 bytes          [emitted]
                              images/pages/account/profile/icon_github.png  455 bytes          [emitted]
                               images/pages/account/profile/icon_gplus.png  612 bytes          [emitted]
                            images/pages/account/profile/icon_linkedin.png  381 bytes          [emitted]
                             images/pages/account/profile/icon_twitter.png  410 bytes          [emitted]
                     images/pages/account/profile/sample_profile_thumb.png    65.7 kB          [emitted]
                           images/pages/account/profile/sample_profile.png     306 kB          [emitted]  [big]
                           images/pages/account/profile/sample_project.png    5.17 kB          [emitted]
                                     images/pages/account/profile/work.png  320 bytes          [emitted]
                      images/pages/account/subscription/teacher-banner.png    55.8 kB          [emitted]
                               images/pages/admin/outcomes-report/anya.png     375 kB          [emitted]  [big]
                              images/pages/admin/outcomes-report/arryn.png     690 kB          [emitted]  [big]
                             images/pages/apcsp/APCSP_ProviderBadge_lg.png    27.8 kB          [emitted]
                                          images/pages/base/background.jpg     310 kB          [emitted]  [big]
                              images/pages/base/code-ninjas-logo-right.png    2.91 kB          [emitted]
                          images/pages/base/codecombat_logo_circle_250.png    41.7 kB          [emitted]
                                            images/pages/base/firebase.png    4.67 kB          [emitted]
                          images/pages/base/glyphicons-halflings-white.png    8.74 kB          [emitted]
                                images/pages/base/glyphicons-halflings.png    12.6 kB          [emitted]
                               images/pages/base/glyphicons-simplified.png  650 bytes          [emitted]
                                     images/pages/base/logo_square_120.png    17.6 kB          [emitted]
                                     images/pages/base/logo_square_250.png    26.5 kB          [emitted]
                                                images/pages/base/logo.png    43.8 kB          [emitted]
                                    images/pages/base/modal_background.png    8.13 kB          [emitted]
                                      images/pages/base/nav_background.png    12.3 kB          [emitted]
                                         images/pages/base/play_button.png      32 kB          [emitted]
                                    images/pages/base/recruitment_logo.png    1.29 kB          [emitted]
                                       images/pages/careers/recruiting.png    51.7 kB          [emitted]
                                  images/pages/clans/dashboard_preview.png     119 kB          [emitted]
                                     images/pages/community/adventurer.png    5.66 kB          [emitted]
                                     images/pages/community/ambassador.png    5.65 kB          [emitted]
                                       images/pages/community/archmage.png    5.96 kB          [emitted]
                                        images/pages/community/article.png      13 kB          [emitted]
                                        images/pages/community/artisan.png    5.05 kB          [emitted]
                                       images/pages/community/diplomat.png    5.76 kB          [emitted]
                                          images/pages/community/level.png    27.2 kB          [emitted]
                                 images/pages/community/logo_discourse.png    2.71 kB          [emitted]
                                  images/pages/community/logo_facebook.png    1.22 kB          [emitted]
                                        images/pages/community/logo_g+.png    1.69 kB          [emitted]
                                    images/pages/community/logo_github.png    9.04 kB          [emitted]
                                   images/pages/community/logo_hipchat.png    3.67 kB          [emitted]
                                      images/pages/community/logo_sett.png    3.48 kB          [emitted]
                                     images/pages/community/logo_slack.png    5.07 kB          [emitted]
                                   images/pages/community/logo_twitter.png    2.33 kB          [emitted]
                                         images/pages/community/scribe.png    5.47 kB          [emitted]
                                          images/pages/community/thang.png    24.3 kB          [emitted]
                                    images/pages/contribute/adventurer.png    23.5 kB          [emitted]
                                    images/pages/contribute/ambassador.png    22.2 kB          [emitted]
                                      images/pages/contribute/archmage.png    29.5 kB          [emitted]
                                       images/pages/contribute/artisan.png      23 kB          [emitted]
                       images/pages/contribute/class_detail_adventurer.png    51.3 kB          [emitted]
                       images/pages/contribute/class_detail_ambassador.png    60.8 kB          [emitted]
                         images/pages/contribute/class_detail_archmage.png    48.5 kB          [emitted]
                          images/pages/contribute/class_detail_artisan.png    51.6 kB          [emitted]
                         images/pages/contribute/class_detail_diplomat.png    56.6 kB          [emitted]
                           images/pages/contribute/class_detail_scribe.png    49.7 kB          [emitted]
                             images/pages/contribute/contribute_header.png    50.1 kB          [emitted]
                                     images/pages/contribute/counselor.png    23.4 kB          [emitted]
                                      images/pages/contribute/diplomat.png    24.9 kB          [emitted]
                                        images/pages/contribute/scribe.png    25.4 kB          [emitted]
                               images/pages/contribute/tile_adventurer.png    83.6 kB          [emitted]
                               images/pages/contribute/tile_ambassador.png    48.4 kB          [emitted]
                                 images/pages/contribute/tile_archmage.png    54.8 kB          [emitted]
                                  images/pages/contribute/tile_artisan.png    45.3 kB          [emitted]
                                 images/pages/contribute/tile_diplomat.png    57.8 kB          [emitted]
                                   images/pages/contribute/tile_scribe.png    59.9 kB          [emitted]
                                         images/pages/courses/101_info.png     129 kB          [emitted]
                                         images/pages/courses/102_info.png     166 kB          [emitted]
                                         images/pages/courses/103_info.png    67.7 kB          [emitted]
                                         images/pages/courses/104_info.png    99.6 kB          [emitted]
                                         images/pages/courses/105_info.png     185 kB          [emitted]
                                         images/pages/courses/106_info.png     130 kB          [emitted]
                                         images/pages/courses/107_info.png     138 kB          [emitted]
                                     images/pages/courses/coco_complab.png     520 kB          [emitted]  [big]
                            images/pages/courses/how_to_apply_licenses.png    24.7 kB          [emitted]
                                      images/pages/courses/star-bronze.png    3.73 kB          [emitted]
                                        images/pages/courses/star-gold.png    3.96 kB          [emitted]
                                      images/pages/courses/star-silver.png    4.05 kB          [emitted]
           images/pages/demo-webdev-projects/chaton-en-train-de-dormir.jpg    26.7 kB          [emitted]
                  images/pages/demo-webdev-projects/Kitten_(06)_by_Ron.jpg    20.5 kB          [emitted]
                   images/pages/demo-webdev-projects/my-cute-bunny-pet.jpg    16.6 kB          [emitted]
                        images/pages/editor/level/preset_dungeon_large.jpg    89.8 kB          [emitted]
                        images/pages/editor/level/preset_dungeon_small.jpg    90.4 kB          [emitted]
                         images/pages/editor/level/preset_grassy_large.jpg    75.1 kB          [emitted]
                         images/pages/editor/level/preset_grassy_small.jpg    69.1 kB          [emitted]
                         images/pages/editor/level/preset_indoor_large.jpg    83.4 kB          [emitted]
                         images/pages/editor/level/preset_indoor_small.jpg    85.2 kB          [emitted]
                                       images/pages/employer/anon_user.png  578 bytes          [emitted]
                                 images/pages/employer/artisanal_claim.png    1.67 kB          [emitted]
                                       images/pages/employer/briefcase.png  100 bytes          [emitted]
                                       images/pages/employer/education.png  223 bytes          [emitted]
                                  images/pages/employer/employer_icon1.png     1.2 kB          [emitted]
                                  images/pages/employer/employer_icon2.png  923 bytes          [emitted]
                                  images/pages/employer/employer_icon3.png  885 bytes          [emitted]
                                  images/pages/employer/employer_icon4.png    1.44 kB          [emitted]
                                  images/pages/employer/employer_icon5.png  845 bytes          [emitted]
                                  images/pages/employer/employer_icon6.png  686 bytes          [emitted]
                                        images/pages/employer/location.png  193 bytes          [emitted]
                                             images/pages/employer/tag.png  149 bytes          [emitted]
                                          images/pages/features/banner.png     165 kB          [emitted]
                                             images/pages/features/bg2.png    1.02 MB          [emitted]  [big]
                                 images/pages/features/collect_command.png      96 kB          [emitted]
                                    images/pages/features/game_web_dev.png     412 kB          [emitted]  [big]
                                          images/pages/features/heroes.png     221 kB          [emitted]
                                 images/pages/game-menu/lock-processed.png  688 bytes          [emitted]
                                           images/pages/game-menu/lock.png     2.8 kB          [emitted]
                         images/pages/game-menu/save-load-history-stub.png    79.1 kB          [emitted]
                                 images/pages/game-menu/save-load-stub.png     102 kB          [emitted]
                                     images/pages/game-menu/slot-icons.png    41.2 kB          [emitted]
                                     images/pages/home/app_store_badge.svg    12.2 kB          [emitted]
                                          images/pages/home/boy_coding.png    41.1 kB          [emitted]
                                 images/pages/home/character_jumbotron.png     1.1 MB          [emitted]  [big]
                                    images/pages/home/character_lineup.png     199 kB          [emitted]
                                  images/pages/home/computer-science-2.png    33.8 kB          [emitted]
                                  images/pages/home/computer-science-3.png    24.2 kB          [emitted]
                                  images/pages/home/computer-science-4.png    38.9 kB          [emitted]
                                  images/pages/home/computer-science-5.png    48.2 kB          [emitted]
                                  images/pages/home/computer-science-6.png    28.1 kB          [emitted]
                                    images/pages/home/course_languages.png    3.91 kB          [emitted]
                                               images/pages/home/dylan.png    18.3 kB          [emitted]
                                                images/pages/home/emma.png    23.1 kB          [emitted]
                                        images/pages/home/F1_typedcode.png    6.41 kB          [emitted]
                                    images/pages/home/F2_teacherguides.png    11.4 kB          [emitted]
                                       images/pages/home/F3_accessible.png    11.1 kB          [emitted]
                                   images/pages/home/footer_background.png      15 kB          [emitted]
                                           images/pages/home/G1_reward.png    8.94 kB          [emitted]
                                           images/pages/home/G2_brains.png    7.35 kB          [emitted]
                                             images/pages/home/G3_game.png    4.83 kB          [emitted]
                                          images/pages/home/game-dev-1.png    26.2 kB          [emitted]
                                  images/pages/home/game-development-1.png    26.2 kB          [emitted]
                                  images/pages/home/game-development-2.png    34.6 kB          [emitted]
                                  images/pages/home/game-development-3.png    33.2 kB          [emitted]
                                         images/pages/home/girl_coding.png    32.8 kB          [emitted]
                                          images/pages/home/inprogress.png    4.19 kB          [emitted]
                    images/pages/home/introduction-to-computer-science.png    34.9 kB          [emitted]
                                          images/pages/home/opensource.png    7.49 kB          [emitted]
                                               images/pages/home/pcmag.png    4.24 kB          [emitted]
                                         images/pages/home/play_button.png      32 kB          [emitted]
                                            images/pages/home/play_img.png     115 kB          [emitted]
                                   images/pages/home/student_jumbotron.jpg     186 kB          [emitted]
                                             images/pages/home/timmaki.png    22.9 kB          [emitted]
                                         images/pages/home/video_thumb.png     475 kB          [emitted]  [big]
                                           images/pages/home/web-dev-1.png    20.6 kB          [emitted]
                                   images/pages/home/web-development-1.png    20.6 kB          [emitted]
                                   images/pages/home/web-development-2.png    27.4 kB          [emitted]
                              images/pages/minigames/conditionals/bear.png    12.3 kB          [emitted]
                               images/pages/minigames/conditionals/dog.png    11.1 kB          [emitted]
                         images/pages/minigames/conditionals/fire_trap.png    3.46 kB          [emitted]
                       images/pages/minigames/conditionals/forked-path.jpg     630 kB          [emitted]  [big]
                               images/pages/minigames/conditionals/fox.png    10.7 kB          [emitted]
                               images/pages/minigames/conditionals/gem.png    1.46 kB          [emitted]
                              images/pages/minigames/conditionals/ogre.png    50.3 kB          [emitted]
                               images/pages/minigames/conditionals/rat.jpg    3.28 kB          [emitted]
                             images/pages/minigames/conditionals/raven.png    8.73 kB          [emitted]
                              images/pages/minigames/conditionals/wolf.png    10.1 kB          [emitted]
                      images/pages/modal/assign-courses/select_courses.gif    1.29 MB          [emitted]  [big]
                     images/pages/modal/assign-courses/select_students.gif     532 kB          [emitted]  [big]
                                    images/pages/modal/auth/extra-pane.png      20 kB          [emitted]
                                images/pages/modal/auth/facebook_small.png  730 bytes          [emitted]
                          images/pages/modal/auth/facebook_sso_button2.png    16.4 kB          [emitted]
                                   images/pages/modal/auth/github_icon.png  723 bytes          [emitted]
                                   images/pages/modal/auth/gplus_small.png     1.5 kB          [emitted]
                             images/pages/modal/auth/gplus_sso_button2.png       8 kB          [emitted]
                              images/pages/modal/auth/login-background.png    45.2 kB          [emitted]
                             images/pages/modal/auth/signup-background.png    95.4 kB          [emitted]
                                          images/pages/not_found/404_1.png    31.8 kB          [emitted]
                                          images/pages/not_found/404_2.png    38.7 kB          [emitted]
                                          images/pages/not_found/404_3.png    82.6 kB          [emitted]
                                     images/pages/parents/anya_reading.png      21 kB          [emitted]
                                        images/pages/parents/deepdive1.png     227 kB          [emitted]
                                        images/pages/parents/deepdive2.png     208 kB          [emitted]
                                        images/pages/parents/deepdive3.png     206 kB          [emitted]
                                             images/pages/parents/flag.png    16.1 kB          [emitted]
                               images/pages/parents/jumbotron_students.png    9.56 MB          [emitted]  [big]
                                         images/pages/parents/mission1.png     109 kB          [emitted]
                                         images/pages/parents/mission2.png     114 kB          [emitted]
                                         images/pages/parents/mission3.png     122 kB          [emitted]
                                       images/pages/parents/valueprop1.png     103 kB          [emitted]
                                       images/pages/parents/valueprop2.png    69.6 kB          [emitted]
                                       images/pages/parents/valueprop3.png    88.2 kB          [emitted]
                                  images/pages/play/amazon_horz_lockup.png     198 kB          [emitted]
                                  images/pages/play/amazon_vert_lockup.png    48.1 kB          [emitted]
                                    images/pages/play/aws-educate-logo.png    24.5 kB          [emitted]
                                        images/pages/play/bronze-chest.png    29.4 kB          [emitted]
                                     images/pages/play/campaign-banner.png    10.5 kB          [emitted]
                                      images/pages/play/duck_alejandro.png    77.8 kB          [emitted]
                                           images/pages/play/duck_anya.png    54.6 kB          [emitted]
                                          images/pages/play/duck_anya2.png     124 kB          [emitted]
                                            images/pages/play/duck_ida.png    76.4 kB          [emitted]
                                           images/pages/play/duck_okar.png    72.8 kB          [emitted]
                                         images/pages/play/duck_tharin.png    48.6 kB          [emitted]
                                        images/pages/play/duck_tharin2.png     107 kB          [emitted]
                                images/pages/play/future-engineer-logo.png     228 kB          [emitted]
                                          images/pages/play/gold-chest.png    30.5 kB          [emitted]
                                  images/pages/play/ladder/easy_button.png    15.4 kB          [emitted]
                                  images/pages/play/ladder/hard_button.png    20.5 kB          [emitted]
                           images/pages/play/ladder/humans_ladder_easy.png    33.4 kB          [emitted]
                           images/pages/play/ladder/humans_ladder_hard.png    13.6 kB          [emitted]
                         images/pages/play/ladder/humans_ladder_medium.png    30.6 kB          [emitted]
                       images/pages/play/ladder/humans_ladder_tutorial.png    32.8 kB          [emitted]
                                images/pages/play/ladder/medium_button.png    15.4 kB          [emitted]
                           images/pages/play/ladder/multiplayer_notext.jpg    45.8 kB          [emitted]
                            images/pages/play/ladder/ogres_ladder_easy.png    13.5 kB          [emitted]
                            images/pages/play/ladder/ogres_ladder_hard.png    14.6 kB          [emitted]
                          images/pages/play/ladder/ogres_ladder_medium.png    34.4 kB          [emitted]
                        images/pages/play/ladder/ogres_ladder_tutorial.png    40.9 kB          [emitted]
                                    images/pages/play/ladder/prize_aws.png    1.46 kB          [emitted]
                                  images/pages/play/ladder/prize_cash1.png    2.93 kB          [emitted]
                                  images/pages/play/ladder/prize_cash2.png    2.75 kB          [emitted]
                                  images/pages/play/ladder/prize_cash3.png    2.58 kB          [emitted]
                          images/pages/play/ladder/prize_custom_avatar.png    2.54 kB          [emitted]
                          images/pages/play/ladder/prize_custom_wizard.png    3.99 kB          [emitted]
                          images/pages/play/ladder/prize_digital_ocean.png    2.42 kB          [emitted]
                               images/pages/play/ladder/prize_firebase.png    4.57 kB          [emitted]
                                   images/pages/play/ladder/prize_heap.png    2.35 kB          [emitted]
                              images/pages/play/ladder/prize_one_month.png    2.76 kB          [emitted]
                                images/pages/play/ladder/prize_oreilly.png    2.18 kB          [emitted]
                               images/pages/play/ladder/prize_webstorm.png    2.19 kB          [emitted]
                                images/pages/play/ladder/warmup_button.png    15.4 kB          [emitted]
                            images/pages/play/level-banner-multiplayer.png    8.16 kB          [emitted]
                             images/pages/play/level-banner-replayable.png    6.38 kB          [emitted]
                                images/pages/play/level-banner-special.png    5.94 kB          [emitted]
                                images/pages/play/level-banner-started.png    4.01 kB          [emitted]
                      images/pages/play/level-banner-unlock-subscriber.png    20.3 kB          [emitted]
                                 images/pages/play/level-banner-unlock.png    4.91 kB          [emitted]
                   images/pages/play/level-banner-unstarted-subscriber.png    19.7 kB          [emitted]
                              images/pages/play/level-banner-unstarted.png    4.08 kB          [emitted]
                               images/pages/play/level-info-background.png    55.8 kB          [emitted]
                       images/pages/play/level-info-status-spritesheet.png    9.96 kB          [emitted]
                        images/pages/play/level/modal/reward_icon_gems.png    2.57 kB          [emitted]
                          images/pages/play/level/modal/reward_icon_xp.png    3.53 kB          [emitted]
               images/pages/play/level/modal/reward_plate_wide_premium.png    4.36 kB          [emitted]
                       images/pages/play/level/modal/reward_plate_wide.png     2.2 kB          [emitted]
                            images/pages/play/level/modal/reward_plate.png    2.13 kB          [emitted]
                   images/pages/play/level/modal/share_level_parchment.png    10.9 kB          [emitted]
                            images/pages/play/level/modal/victory_hero.png    20.7 kB          [emitted]
                images/pages/play/level/modal/victory_modal_background.png    58.7 kB          [emitted]
         images/pages/play/level/modal/victory_modal_border_background.png    44.7 kB          [emitted]
                     images/pages/play/level/modal/victory_modal_shelf.png    1.76 kB          [emitted]
                            images/pages/play/level/modal/victory_word.png      15 kB          [emitted]
                       images/pages/play/level/modal/xp_gems_parchment.png    8.73 kB          [emitted]
                                          images/pages/play/menu_icons.png    93.6 kB          [emitted]
                                            images/pages/play/modal/an.svg    1.07 kB          [emitted]
                         images/pages/play/modal/announcement_modal_bg.png    67.7 kB          [emitted]
                         images/pages/play/modal/announcement/pets/ale.png    27.2 kB          [emitted]
    images/pages/play/modal/announcement/pets/ball_no_shadow_only_ball.png  940 bytes          [emitted]
                        images/pages/play/modal/announcement/pets/ball.png    1.06 kB          [emitted]
                        images/pages/play/modal/announcement/pets/base.png     158 kB          [emitted]
            images/pages/play/modal/announcement/pets/bg_baked_shadows.png    28.4 kB          [emitted]
                          images/pages/play/modal/announcement/pets/bg.png    25.6 kB          [emitted]
            images/pages/play/modal/announcement/pets/cougar_no_shadow.png    18.3 kB          [emitted]
                      images/pages/play/modal/announcement/pets/cougar.png    18.8 kB          [emitted]
                   images/pages/play/modal/announcement/pets/fire_elem.png    6.68 kB          [emitted]
                        images/pages/play/modal/announcement/pets/fire.png    6.41 kB          [emitted]
                          images/pages/play/modal/announcement/pets/fo.png    8.61 kB          [emitted]
               images/pages/play/modal/announcement/pets/fox_no_shadow.png    8.38 kB          [emitted]
                       images/pages/play/modal/announcement/pets/grass.png    10.3 kB          [emitted]
                     images/pages/play/modal/announcement/pets/griffin.png    10.4 kB          [emitted]
             images/pages/play/modal/announcement/pets/heroes_and_fire.png    65.2 kB          [emitted]
                         images/pages/play/modal/announcement/pets/ida.png      28 kB          [emitted]
             images/pages/play/modal/announcement/pets/mimic_no_shadow.png    6.47 kB          [emitted]
                       images/pages/play/modal/announcement/pets/mimic.png    6.76 kB          [emitted]
               images/pages/play/modal/announcement/pets/pug_no_shadow.png    10.1 kB          [emitted]
                         images/pages/play/modal/announcement/pets/pug.png    10.5 kB          [emitted]
                       images/pages/play/modal/announcement/pets/raven.png    7.13 kB          [emitted]
              images/pages/play/modal/announcement/pets/wolf_no_shadow.png    11.9 kB          [emitted]
              images/pages/play/modal/announcement/pets/wolf_only_wolf.png    11.3 kB          [emitted]
images/pages/play/modal/announcement/pets/wolf_pup_no_shadow_only_wolf.png    10.6 kB          [emitted]
                        images/pages/play/modal/announcement/pets/wolf.png    12.4 kB          [emitted]
                images/pages/play/modal/announcement/ritic/ability_bar.png    34.1 kB          [emitted]
              images/pages/play/modal/announcement/ritic/assassin-pose.png    63.6 kB          [emitted]
                      images/pages/play/modal/announcement/ritic/blink.gif    4.87 MB          [emitted]  [big]
                      images/pages/play/modal/announcement/ritic/blink.png    5.57 kB          [emitted]
                images/pages/play/modal/announcement/ritic/clear_block.png    26.2 kB          [emitted]
              images/pages/play/modal/announcement/ritic/cracked_block.png    39.8 kB          [emitted]
                   images/pages/play/modal/announcement/ritic/darkness.gif    4.45 MB          [emitted]  [big]
                   images/pages/play/modal/announcement/ritic/darkness.png    10.6 kB          [emitted]
             images/pages/play/modal/announcement/ritic/ice-background.jpg    76.9 kB          [emitted]
                        images/pages/play/modal/announcement/ritic/ray.png    18.8 kB          [emitted]
                 images/pages/play/modal/announcement/ritic/shadowwalk.gif    3.46 MB          [emitted]  [big]
                 images/pages/play/modal/announcement/ritic/shadowwalk.png    6.91 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard1.png    4.17 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard2.png     4.9 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard3.png    4.96 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard4.png    4.47 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard5.png    2.71 kB          [emitted]
                     images/pages/play/modal/announcement/ritic/shard6.png    2.36 kB          [emitted]
                    images/pages/play/modal/announcement/ritic/tornado.gif    3.67 MB          [emitted]  [big]
                    images/pages/play/modal/announcement/ritic/tornado.png    4.18 kB          [emitted]
         images/pages/play/modal/announcement/ritic/undercracked_block.png    29.6 kB          [emitted]
                           images/pages/play/modal/buy-gems-background.png     209 kB          [emitted]
                                       images/pages/play/modal/captain.png    17.6 kB          [emitted]
                            images/pages/play/modal/challenge_complete.png      36 kB          [emitted]
                            images/pages/play/modal/challenge_unlocked.png    37.7 kB          [emitted]
                                      images/pages/play/modal/champion.png      21 kB          [emitted]
  images/pages/play/modal/code-play-create-account-modal-background-de.png     609 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-en.png     597 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-es.png     863 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-in.png     563 kB          [emitted]  [big]
  images/pages/play/modal/code-play-create-account-modal-background-uk.png     589 kB          [emitted]  [big]
                                images/pages/play/modal/combo_complete.png    34.6 kB          [emitted]
                              images/pages/play/modal/combo_incomplete.png    37.2 kB          [emitted]
                                images/pages/play/modal/confirm-button.png    3.08 kB          [emitted]
                                       images/pages/play/modal/duelist.png      21 kB          [emitted]
                                 images/pages/play/modal/equip-buttons.png    2.92 kB          [emitted]
                          images/pages/play/modal/game-menu-background.png      41 kB          [emitted]
                                       images/pages/play/modal/goliath.png    17.8 kB          [emitted]
                                      images/pages/play/modal/guardian.png    19.7 kB          [emitted]
                    images/pages/play/modal/hero-portrait-gem-selected.png    8.13 kB          [emitted]
                             images/pages/play/modal/hero-portrait-gem.png    6.59 kB          [emitted]
                        images/pages/play/modal/hero-portrait-selected.png     6.1 kB          [emitted]
                 images/pages/play/modal/hero-portrait-silver-selected.png    11.8 kB          [emitted]
                          images/pages/play/modal/hero-portrait-silver.png    4.82 kB          [emitted]
                                 images/pages/play/modal/hero-portrait.png    6.88 kB          [emitted]
                               images/pages/play/modal/heroes-and-pets.png     302 kB          [emitted]  [big]
                             images/pages/play/modal/heroes-background.png    55.5 kB          [emitted]
                                            images/pages/play/modal/hr.png  511 bytes          [emitted]
                          images/pages/play/modal/inventory-background.png    89.9 kB          [emitted]
                  images/pages/play/modal/item-box-background-selected.png     1.5 kB          [emitted]
                           images/pages/play/modal/item-box-background.png       2 kB          [emitted]
                         images/pages/play/modal/item-icon-accessories.png    2.05 kB          [emitted]
                               images/pages/play/modal/item-icon-armor.png    3.08 kB          [emitted]
                               images/pages/play/modal/item-icon-books.png    2.59 kB          [emitted]
                                images/pages/play/modal/item-icon-misc.png    4.31 kB          [emitted]
                             images/pages/play/modal/item-icon-primary.png    1.75 kB          [emitted]
                           images/pages/play/modal/item-icon-secondary.png    2.78 kB          [emitted]
                       images/pages/play/modal/items-background-narrow.png     116 kB          [emitted]
                              images/pages/play/modal/items-background.png      82 kB          [emitted]
                                       images/pages/play/modal/k-means.gif     311 kB          [emitted]  [big]
                                        images/pages/play/modal/knight.png    19.4 kB          [emitted]
                images/pages/play/modal/lang-nl/buy-gems-background-NL.png     259 kB          [emitted]  [big]
                        images/pages/play/modal/leaderboard-background.png    50.1 kB          [emitted]
                                images/pages/play/modal/level_complete.png    31.2 kB          [emitted]
                                   images/pages/play/modal/lock_banner.png    28.5 kB          [emitted]
                             images/pages/play/modal/menu-tab-selected.png    1.42 kB          [emitted]
                                      images/pages/play/modal/menu-tab.png    1.22 kB          [emitted]
                         images/pages/play/modal/parental_nudge_wizard.png     202 kB          [emitted]
              images/pages/play/modal/parental_prompt_modal_background.png    35.7 kB          [emitted]
                                                  javascripts/run-tests.js  697 bytes          [emitted]
                                        images/pages/play/modal/raider.png    17.5 kB          [emitted]
                        images/pages/play/modal/random-gems-background.png    5.05 kB          [emitted]
                                       images/pages/play/modal/samurai.png    19.9 kB          [emitted]
                                      images/pages/play/modal/stalwart.png    21.5 kB          [emitted]
                    images/pages/play/modal/subscribe-background-blank.png    43.6 kB          [emitted]
                          images/pages/play/modal/subscribe-background.png     224 kB          [emitted]
                                images/pages/play/modal/subscribe-gems.png    27.9 kB          [emitted]
                              images/pages/play/modal/subscribe-heroes.png      55 kB          [emitted]
                                    images/pages/play/modal/three-pets.png    32.1 kB          [emitted]
                                  images/pages/play/picoctf-logo-white.png    3.54 kB          [emitted]
                                    images/pages/play/play-spritesheet.png    16.8 kB          [emitted]
                                   images/pages/play/portal-background.png    2.19 kB          [emitted]
                               images/pages/play/portal-beta-campaigns.png     324 kB          [emitted]  [big]
                                    images/pages/play/portal-campaigns.png     478 kB          [emitted]  [big]
                                   images/pages/play/premium-menu-icon.png    32.2 kB          [emitted]
                                        images/pages/play/silver-chest.png    29.1 kB          [emitted]
                                                images/pages/play/star.png    13.5 kB          [emitted]
                                        images/pages/play/Victory_Pose.png    83.7 kB          [emitted]
                                        images/pages/play/wooden-chest.png    30.3 kB          [emitted]
                                 images/pages/play/worlds/desert_small.png    35.8 kB          [emitted]
                                images/pages/play/worlds/dungeon_small.png    30.4 kB          [emitted]
                                 images/pages/play/worlds/forest_small.png    35.9 kB          [emitted]
                             images/pages/play/worlds/game_dev_1_small.png    29.9 kB          [emitted]
                             images/pages/play/worlds/game_dev_2_small.png      30 kB          [emitted]
                                images/pages/play/worlds/glacier_small.png    29.5 kB          [emitted]
                               images/pages/play/worlds/mountain_small.png    29.7 kB          [emitted]
                                images/pages/play/worlds/volcano_small.png    30.4 kB          [emitted]
                              images/pages/play/worlds/web_dev_1_small.png    27.7 kB          [emitted]
                              images/pages/play/worlds/web_dev_2_small.png    32.1 kB          [emitted]
                                          images/pages/sales/chat_icon.png  234 bytes          [emitted]
                                         images/pages/sales/classroom1.png    96.3 kB          [emitted]
                                         images/pages/sales/classroom2.png    99.9 kB          [emitted]
                                         images/pages/sales/classroom3.png    91.4 kB          [emitted]
                                         images/pages/sales/classroom4.png    98.7 kB          [emitted]
                                         images/pages/sales/classroom5.png     116 kB          [emitted]
                                         images/pages/sales/classroom6.png    70.4 kB          [emitted]
                                      images/pages/sales/content_table.png    67.1 kB          [emitted]
                                         images/pages/sales/down_arrow.png  285 bytes          [emitted]
                                    images/pages/sales/hero_background.png     221 kB          [emitted]
                                             images/pages/sales/quote1.png    21.7 kB          [emitted]
                                             images/pages/sales/quote2.png    21.2 kB          [emitted]
                                            images/pages/sales/screen1.png    57.6 kB          [emitted]
                                            images/pages/sales/screen2.png    29.6 kB          [emitted]
            images/pages/teachers/resources/markdown/compression-grass.png    3.06 kB          [emitted]
         images/pages/teachers/resources/markdown/compression-high-res.jpg     199 kB          [emitted]
          images/pages/teachers/resources/markdown/compression-low-res.jpg    20.5 kB          [emitted]
           images/pages/teachers/resources/markdown/compression-wood-x.png    9.88 kB          [emitted]
                images/pages/teachers/resources/markdown/phishing-scam.jpg     301 kB          [emitted]  [big]
                                          images/pages/user/adventurer.png    49.3 kB          [emitted]
                                          images/pages/user/ambassador.png    36.7 kB          [emitted]
                                            images/pages/user/archmage.png    79.3 kB          [emitted]
                                             images/pages/user/artisan.png    41.5 kB          [emitted]
             images/pages/user/certificates/backgrounds/background-cs1.png    2.33 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs2.png    2.35 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs3.png    2.32 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs4.png    2.31 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs5.png    2.16 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-cs6.png    2.07 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-gd1.png     3.1 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-gd2.png    2.65 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-gd3.png    2.42 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-wd1.png     1.9 MB          [emitted]  [big]
             images/pages/user/certificates/backgrounds/background-wd2.png     1.9 MB          [emitted]  [big]
                       images/pages/user/certificates/certificate-icon.png    2.58 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs1.png     124 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs2.png     132 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs3.png     139 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs4.png     147 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs5.png     155 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-cs6.png     179 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-gd1.png    95.3 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-gd2.png     169 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-gd3.png     202 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-wd1.png     149 kB          [emitted]
               images/pages/user/certificates/medallions/medallion-wd2.png     168 kB          [emitted]
                     images/pages/user/certificates/poses/pose-captain.png    51.1 kB          [emitted]
                    images/pages/user/certificates/poses/pose-champion.png    98.1 kB          [emitted]
                     images/pages/user/certificates/poses/pose-duelist.png    97.7 kB          [emitted]
                     images/pages/user/certificates/poses/pose-goliath.png     135 kB          [emitted]
                    images/pages/user/certificates/poses/pose-guardian.png     146 kB          [emitted]
                      images/pages/user/certificates/poses/pose-knight.png     117 kB          [emitted]
                      images/pages/user/certificates/poses/pose-raider.png     113 kB          [emitted]
                     images/pages/user/certificates/poses/pose-samurai.png     230 kB          [emitted]
                    images/pages/user/certificates/poses/pose-stalwart.png     178 kB          [emitted]
           images/pages/user/certificates/signatures/signature-captain.png    47.3 kB          [emitted]
          images/pages/user/certificates/signatures/signature-champion.png    49.1 kB          [emitted]
           images/pages/user/certificates/signatures/signature-duelist.png      41 kB          [emitted]
           images/pages/user/certificates/signatures/signature-goliath.png    41.6 kB          [emitted]
          images/pages/user/certificates/signatures/signature-guardian.png    53.3 kB          [emitted]
            images/pages/user/certificates/signatures/signature-knight.png    36.9 kB          [emitted]
            images/pages/user/certificates/signatures/signature-raider.png    50.6 kB          [emitted]
           images/pages/user/certificates/signatures/signature-samurai.png    44.1 kB          [emitted]
          images/pages/user/certificates/signatures/signature-stalwart.png    43.6 kB          [emitted]
                                            images/pages/user/diplomat.png    43.7 kB          [emitted]
                                             images/pages/user/general.png    29.5 kB          [emitted]
                                              images/pages/user/scribe.png    78.6 kB          [emitted]
                                                   images/twitter_icon.png  338 bytes          [emitted]
                                                    index_old_browser.html    1.49 kB          [emitted]
                                                       javascripts/boot.js    6.13 kB          [emitted]
                                               javascripts/setImmediate.js    8.53 kB          [emitted]
                                           javascripts/web-dev-listener.js    9.61 kB          [emitted]
                                      javascripts/workers/aether_worker.js    3.52 kB          [emitted]
                                       javascripts/workers/worker_world.js    21.1 kB          [emitted]
                                          markdown/apcsp-big-data-pt-BR.md    5.33 kB          [emitted]
                                                markdown/apcsp-big-data.md    4.99 kB          [emitted]
                                  markdown/apcsp-binary-sequences-pt-BR.md    2.73 kB          [emitted]
                                        markdown/apcsp-binary-sequences.md    2.49 kB          [emitted]
                                       markdown/apcsp-compression-pt-BR.md    8.75 kB          [emitted]
                                             markdown/apcsp-compression.md    8.26 kB          [emitted]
                                  markdown/apcsp-computing-lesson-pt-BR.md    4.03 kB          [emitted]
                                        markdown/apcsp-computing-lesson.md    3.61 kB          [emitted]
                                        markdown/apcsp-crowdsourcing-he.md    8.32 kB          [emitted]
                                     markdown/apcsp-crowdsourcing-pt-BR.md    6.22 kB          [emitted]
                                           markdown/apcsp-crowdsourcing.md    5.73 kB          [emitted]
                                      markdown/apcsp-data-project-pt-BR.md    4.19 kB          [emitted]
                                            markdown/apcsp-data-project.md    3.88 kB          [emitted]
                                  markdown/apcsp-getting-abstract-pt-BR.md     6.1 kB          [emitted]
                                        markdown/apcsp-getting-abstract.md    5.85 kB          [emitted]
                                    markdown/apcsp-hitchhikers-guide-he.md     2.5 kB          [emitted]
                                 markdown/apcsp-hitchhikers-guide-pt-BR.md     2.1 kB          [emitted]
                                       markdown/apcsp-hitchhikers-guide.md    1.95 kB          [emitted]
                            markdown/apcsp-how-the-internet-works-pt-BR.md    7.13 kB          [emitted]
                                  markdown/apcsp-how-the-internet-works.md    6.51 kB          [emitted]
                              markdown/apcsp-impact-on-industries-pt-BR.md     1.9 kB          [emitted]
                                    markdown/apcsp-impact-on-industries.md    1.75 kB          [emitted]
                           markdown/apcsp-innovations-and-society-pt-BR.md    1.89 kB          [emitted]
                                 markdown/apcsp-innovations-and-society.md    1.79 kB          [emitted]
                             markdown/apcsp-internet-chat-simulation-he.md    9.54 kB          [emitted]
                          markdown/apcsp-internet-chat-simulation-pt-BR.md    7.91 kB          [emitted]
                                markdown/apcsp-internet-chat-simulation.md    7.28 kB          [emitted]
                            markdown/apcsp-internet-cybersecurity-pt-BR.md    5.31 kB          [emitted]
                                  markdown/apcsp-internet-cybersecurity.md    4.86 kB          [emitted]
                               markdown/apcsp-internet-simulation-pt-BR.md    3.04 kB          [emitted]
                                     markdown/apcsp-internet-simulation.md    2.81 kB          [emitted]
                                   markdown/apcsp-pair-algorithms-pt-BR.md    3.19 kB          [emitted]
                                         markdown/apcsp-pair-algorithms.md    3.01 kB          [emitted]
                        markdown/apcsp-personal-and-global-impact-pt-BR.md    4.95 kB          [emitted]
                              markdown/apcsp-personal-and-global-impact.md     4.7 kB          [emitted]
                                       markdown/apcsp-refactoring-pt-BR.md    4.48 kB          [emitted]
                                             markdown/apcsp-refactoring.md    4.25 kB          [emitted]
                                       markdown/apcsp-search-sort-pt-BR.md    8.79 kB          [emitted]
                                             markdown/apcsp-search-sort.md    8.06 kB          [emitted]
                                        markdown/apcsp-simulation-pt-BR.md    3.51 kB          [emitted]
                                              markdown/apcsp-simulation.md    3.23 kB          [emitted]
                                    markdown/apcsp-tech-usability-pt-BR.md    3.23 kB          [emitted]
                                          markdown/apcsp-tech-usability.md    2.99 kB          [emitted]
                                          markdown/apcsp-web-quiz-pt-BR.md    1.99 kB          [emitted]
                                                markdown/apcsp-web-quiz.md    1.79 kB          [emitted]
                                                  markdown/arenas-pt-BR.md    4.14 kB          [emitted]
                                                        markdown/arenas.md    3.96 kB          [emitted]
                                                    markdown/clever-faq.md    4.46 kB          [emitted]
                                  markdown/create-task-practice-1-pt-BR.md    15.5 kB          [emitted]
                                        markdown/create-task-practice-1.md    16.2 kB          [emitted]
                                  markdown/create-task-practice-2-pt-BR.md    5.74 kB          [emitted]
                                        markdown/create-task-practice-2.md    5.87 kB          [emitted]
                                  markdown/create-task-practice-3-pt-BR.md    4.53 kB          [emitted]
                                        markdown/create-task-practice-3.md    4.38 kB          [emitted]
                                                        markdown/cs1-he.md    28.4 kB          [emitted]
                                                     markdown/cs1-pt-BR.md    23.4 kB          [emitted]
                                                   markdown/cs1-zh-HANS.md      19 kB          [emitted]
                                                           markdown/cs1.md    37.3 kB          [emitted]
                                                     markdown/cs2-pt-BR.md      31 kB          [emitted]
                                                           markdown/cs2.md    31.5 kB          [emitted]
                                                     markdown/cs3-pt-BR.md      94 kB          [emitted]
                                                           markdown/cs3.md    93.1 kB          [emitted]
                                                     markdown/cs4-pt-BR.md    56.3 kB          [emitted]
                                                           markdown/cs4.md    58.9 kB          [emitted]
                                                  markdown/cs5_js-pt-BR.md    54.1 kB          [emitted]
                                                        markdown/cs5_js.md      96 kB          [emitted]
                                                  markdown/cs5_py-pt-BR.md    52.8 kB          [emitted]
                                                        markdown/cs5_py.md    94.5 kB          [emitted]
                                                        markdown/faq-he.md    18.9 kB          [emitted]
                                                     markdown/faq-nl-NL.md    16.9 kB          [emitted]
                                                     markdown/faq-pt-BR.md    18.6 kB          [emitted]
                                                           markdown/faq.md    17.1 kB          [emitted]
                                                   markdown/gd1-5day-he.md    32.3 kB          [emitted]
                                                markdown/gd1-5day-pt-BR.md    24.8 kB          [emitted]
                                              markdown/gd1-5day-zh-HANS.md    21.5 kB          [emitted]
                                                      markdown/gd1-5day.md    23.3 kB          [emitted]
                                                     markdown/gd2-pt-BR.md    14.7 kB          [emitted]
                                                           markdown/gd2.md    17.9 kB          [emitted]
                                                     markdown/gd3-pt-BR.md    25.5 kB          [emitted]
                                                           markdown/gd3.md    24.2 kB          [emitted]
                                         markdown/getting-started-pt-BR.md    11.9 kB          [emitted]
                                               markdown/getting-started.md    11.4 kB          [emitted]
                                                           markdown/hoc.md    21.1 kB          [emitted]
                                           markdown/pair-programming-he.md    2.93 kB          [emitted]
                                        markdown/pair-programming-pt-BR.md    2.26 kB          [emitted]
                                              markdown/pair-programming.md    2.16 kB          [emitted]
                                                     markdown/wd1-pt-BR.md    38.3 kB          [emitted]
                                                           markdown/wd1.md    35.4 kB          [emitted]
                                                              nothing.html   13 bytes          [emitted]
                                                                 perf.html     1.2 kB          [emitted]
                      sounds/pages/minigames/conditionals/firetrap_die.mp3    14.8 kB          [emitted]
                        sounds/pages/minigames/conditionals/gem_pickup.mp3    6.75 kB          [emitted]
                sounds/pages/minigames/conditionals/ogre_munchkin_raah.mp3    5.43 kB          [emitted]
                                                       update-billing.html  712 bytes          [emitted]
                                                       web-dev-iframe.html    2.49 kB          [emitted]
  [28] (webpack)/buildin/global.js 509 bytes {86} [built]
  [30] ./app/views/core/RootView.coffee 10.1 kB {86} [built]
  [45] ./app/locale/locale.coffee 9.16 kB {86} [built]
 [313] ./app/core/initialize.coffee 9.59 kB {86} [built]
 [506] ./app/views/TestView.coffee 6.8 kB {86} [built]
 [610] ./app/assets/javascripts/run-tests.js 725 bytes {86} [built]
 [611] ./app/app.js 500 bytes {86} [built]
[1187] ./app/templates/test-view.jade 7.17 kB {86} [built]
[1188] ./app/lib/requireUtils.coffee 1.84 kB {86} [built]
[1189] ./vendor/styles/jasmine.css 917 bytes {86} [built]
[1191] ./node_modules/exports-loader?getJasmineRequireObj!./vendor/scripts/jasmine.js 92.3 kB {86} [built]
[1192] ./node_modules/imports-loader?jasmineRequire=>window.jasmineRequire!./vendor/scripts/jasmine-html.js 11.3 kB {86} [built]
[1193] ./node_modules/imports-loader?jasmineRequire=>window.jasmineRequire!./vendor/scripts/jasmine-boot.js 6.67 kB {86} [built]
[1194] ./node_modules/imports-loader?getJasmineRequireObj=>window.getJasmineRequireObj!./vendor/scripts/jasmine-mock-ajax.js 17.1 kB {86} [built]
[1195] ./test/app .*\.(coffee|js)$ 4.05 kB {86} [built]
    + 1982 hidden modules
WARNING in ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e4028d96","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/template-compiler/preprocessor.js?engine=jade!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/views/play/level/LevelGoals.vue
(Emitted value instead of an instance of Error) <level-goal v-for="goal in conceptGoals">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
 @ ./app/views/play/level/LevelGoals.vue 11:0-345
 @ ./app/views/play/level/LevelGoalsView.coffee
 @ ./app/views/play/level/PlayLevelView.coffee
 @ ./app/lib/dynamicRequire.js
 @ ./app/core/Router.coffee
 @ ./app/core/application.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e4028d96","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/template-compiler/preprocessor.js?engine=jade!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/views/play/level/LevelGoals.vue
(Emitted value instead of an instance of Error) <level-goal v-for="goal in levelGoals">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
 @ ./app/views/play/level/LevelGoals.vue 11:0-345
 @ ./app/views/play/level/LevelGoalsView.coffee
 @ ./app/views/play/level/PlayLevelView.coffee
 @ ./app/lib/dynamicRequire.js
 @ ./app/core/Router.coffee
 @ ./app/core/application.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-779ee37a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/template-compiler/preprocessor.js?engine=pug!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/views/courses/StudentAssessmentsComponent.vue
(Emitted value instead of an instance of Error) <student-assessment-row v-for="level in chunk.assessmentLevels">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
 @ ./app/views/courses/StudentAssessmentsComponent.vue 11:0-353
 @ ./app/views/courses/StudentAssessmentsView.coffee
 @ ./app/lib/dynamicRequire.js
 @ ./app/core/Router.coffee
 @ ./app/core/application.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/jsondiffpatch/src/main.js
56:20-50 Critical dependency: the request of a dependency is an expression
 @ ./node_modules/jsondiffpatch/src/main.js
 @ ./app/core/deltas.coffee
 @ ./test/app/core/deltas.spec.coffee
 @ ./test/app .*\.(coffee|js)$
 @ ./app/views/TestView.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./node_modules/jsondiffpatch/src/main.js
61:19-47 Critical dependency: the request of a dependency is an expression
 @ ./node_modules/jsondiffpatch/src/main.js
 @ ./app/core/deltas.coffee
 @ ./test/app/core/deltas.spec.coffee
 @ ./test/app .*\.(coffee|js)$
 @ ./app/views/TestView.coffee
 @ ./app/assets/javascripts/run-tests.js
WARNING in ./bower_components/moment/min/moment-with-locales.min.js
Module not found: Error: Can't resolve './locale' in '/home/travis/build/codecombat/codecombat/bower_components/moment/min'
 @ ./bower_components/moment/min/moment-with-locales.min.js 1:8507-8529
 @ ./app/vendor.js
 @ ./app/app.js
 @ ./app/assets/javascripts/run-tests.js
ERROR in ./node_modules/coffee-loader!./app/locale/zh-HANS.coffee
Module build failed: Error: /home/travis/build/codecombat/codecombat/app/locale/zh-HANS.coffee:1757:52: error: unexpected newline
#    back_to_course_guides: "Back to Course Guides"
                                                   ^
    L1756: #    back_to_course_guides: "Back to Course Guides"
                                                            ^
  at Object.module.exports (/home/travis/build/codecombat/codecombat/node_modules/coffee-loader/index.js:37:9)
 @ ./node_modules/bundle-loader?lazy&name=locale/[name]!./app/locale/zh-HANS.coffee 3:5-76
 @ ./app/locale ./node_modules/bundle-loader?lazy&name=locale/[name] ^\.\/.*$
 @ ./app/locale/locale.coffee
 @ ./app/core/initialize.coffee
 @ ./app/assets/javascripts/run-tests.js
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/test-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/test-view.sass 411 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/course-nag-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/course-nag-modal.sass 446 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/core/loading-error.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/core/loading-error.sass 506 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/core/hero-select-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/core/hero-select-view.sass 758 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/teacher-class-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/teacher-class-view.sass 14.8 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/recover-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/recover-modal.sass 197 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/auth-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/auth-modal.sass 6.95 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/remove-student-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/remove-student-modal.sass 231 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/edit-student-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/edit-student-modal.sass 500 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/activate-licenses-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/activate-licenses-modal.sass 706 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/invite-to-classroom-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/invite-to-classroom-modal.sass 596 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/classroom-settings-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/classroom-settings-modal.sass 431 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/subscribe-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/subscribe-modal.sass 7.69 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/teacher-trial-requests.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/teacher-trial-requests.sass 4.54 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/share-licenses-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/share-licenses-modal.sass 1.08 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/model-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/model-modal.sass 333 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/anonymous-teacher-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/anonymous-teacher-modal.sass 922 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/campaign-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/campaign-view.sass 38.8 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/docs/systems-documentation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/docs/systems-documentation-view.sass 1.23 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/docs/components-documentation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/docs/components-documentation-view.sass 1.27 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/patch.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/patch.sass 208 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/related-achievements.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/related-achievements.sass 303 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/save-version-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/save-version-modal.sass 1.43 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/mine-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/mine-modal.sass 4.96 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/revert-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/revert-modal.sass 201 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/teachers-contact-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/teachers-contact-modal.sass 216 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/hero-select-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/hero-select-modal.sass 530 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/teacher-courses-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/teacher-courses-view.sass 895 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/enrollments-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/enrollments-view.sass 1.99 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/teachers/how-to-enroll-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/teachers/how-to-enroll-modal.sass 226 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/courses-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/courses-view.sass 2.15 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/choose-language-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/choose-language-modal.sass 354 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/change-course-language-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/change-course-language-modal.sass 216 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/courses/courses-update-account-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/courses/courses-update-account-view.sass 561 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/create-account-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/create-account-modal.sass 3.94 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/school-info-panel.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/school-info-panel.sass 163 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/code-play-create-account-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/code-play-create-account-modal.sass 1.26 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/nces-search-input.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/nces-search-input.sass 582 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/extras-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/extras-view.sass 351 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/confirmation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/confirmation-view.sass 624 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/sso-confirm-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/sso-confirm-view.sass 278 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/sso-already-exists-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/sso-already-exists-view.sass 285 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/basic-info-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/basic-info-view.sass 1.86 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/eu-confirmation-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/eu-confirmation-view.sass 163 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/coppa-deny-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/coppa-deny-view.sass 505 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/segment-check-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/segment-check-view.sass 705 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/modal/create-account-modal/choose-account-type-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/modal/create-account-modal/choose-account-type-view.sass 2.61 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/share-progress-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/share-progress-modal.sass 2.26 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/level/web-surface-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/level/web-surface-view.sass 283 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/image-gallery-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/image-gallery-modal.sass 2.82 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/ladder/ladder-tab-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/ladder/ladder-tab-view.sass 1.9 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/buy-gems-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/buy-gems-modal.sass 1.98 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/amazon-hoc-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/amazon-hoc-modal.sass 1.66 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/play-achievements-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/play-achievements-modal.sass 1.9 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/play-heroes-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/play-heroes-modal.sass 18.6 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/play-items-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/play-items-modal.sass 9.16 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/item-details-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/item-details-view.sass 3.38 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/announcement-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/announcement-modal.sass 7.58 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/poll-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/poll-modal.sass 4.72 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/leaderboard-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/leaderboard-modal.sass 2.47 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/menu/inventory-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/menu/inventory-modal.sass 21.2 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/documentation_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/documentation_tab.sass 280 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/level-feedback-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/level-feedback-view.sass 394 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/tasks-tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/tasks-tab.sass 806 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/systems-tab-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/systems-tab-view.sass 3.4 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/components_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/components_tab.sass 3.29 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/scripts_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/scripts_tab.sass 1.02 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/settings_tab.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/settings_tab.sass 501 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/component/thang-components-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/component/thang-components-edit-view.sass 1.87 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/component/add-thang-components-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/component/add-thang-components-modal.sass 839 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/thangs-tab-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/thangs-tab-view.sass 3.29 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/level/modal/progress-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/level/modal/progress-view.sass 1.24 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/add-thangs-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/add-thangs-view.sass 1.75 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/save-branch-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/save-branch-modal.sass 312 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/load-branch-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/load-branch-modal.sass 316 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/artisan-guide-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/artisan-guide-modal.sass 231 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/play/modal/lang-nl/buy-gems-modal-nl.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/play/modal/lang-nl/buy-gems-modal-nl.sass 2.23 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/system/add.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/system/add.sass 357 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/system/new.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/system/new.sass 383 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/system/level-system-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/system/level-system-edit-view.sass 817 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/component/new.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/component/new.sass 392 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/world-select-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/world-select-modal.sass 856 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/component/level-component-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/component/level-component-edit-view.sass 847 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/thang/level-thang-edit-view.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/thang/level-thang-edit-view.sass 594 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/styles/editor/level/modal/generate-terrain-modal.sass:
       [0] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/styles/editor/level/modal/generate-terrain-modal.sass 3.4 kB {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/sass-loader/lib/loader.js!node_modules/import-glob-loader/index.js!app/app.sass:
       [1] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/import-glob-loader!./app/app.sass 279 kB {0} [built]
        + 2 hidden modules
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.2 (node_modules/webpack/node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.2 (node_modules/karma/node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none was installed.
npm ERR! Linux 4.4.0-112-generic
npm ERR! argv "/home/travis/.nvm/versions/node/v6.12.2/bin/node" "/home/travis/.nvm/versions/node/v6.12.2/bin/npm" "install"
npm ERR! node v6.12.2
npm ERR! npm  v3.10.10
npm ERR! code ELIFECYCLE
npm ERR! codecombat@1.0.0 postinstall: `bower install && webpack`
npm ERR! Exit status 2
npm ERR!
npm ERR! Failed at the codecombat@1.0.0 postinstall script 'bower install && webpack'.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the codecombat package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     bower install && webpack
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs codecombat
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls codecombat
npm ERR! There is likely additional logging output above.
npm ERR! Please include the following file with any support request:
npm ERR!     /home/travis/build/codecombat/codecombat/npm-debug.log
The command "eval npm install  " failed 3 times.
The command "npm install " failed and exited with 1 during .
Your build has been stopped.
Top
©TRAVIS CI, GMBH
Rigaer Straße 8
10247 Berlin, Germany
Work with Travis CI
HELP
Documentation
Community
Changelog
Blog
Email
Twitter
LEGAL
Imprint
Terms of Service
Privacy Policy
Security Statement
TRAVIS CI STATUS
Status: Travis CI Status
~~~
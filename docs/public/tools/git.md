# git 常用命令

## 基本操作

- git add
- git reset
- git commit
- git push
- git checkout

### 同步代码

1. git pull
2. git fetch

### 合并代码

1. git merge
2. git rebase

## 提交&推送远程

1. git commit

- git commit --amend 修改当前的 commit

2. git push

## 分支管理

1. git branch
2. git checkout

## tag管理
1. 列举tag

```sh
git tag -l # 列举所有本地tag

```
2. 创建tag

```shell
git tag -a v1.0 -m 'my version 1.0'
```
3. 推送tag到远程仓库(和创建分支的命令是一样的), 需注意不能和分支同名

```sh
git push origin v1.0 #同步单个tag到remote
git push origin --tags # 同步所有的本地tag到remote
```
4. 删除本地tag

```sh
git tag -d v1.0
```
5. 删除远程tag

```sh
git push origin :refs/tags/v1.0 # 方法1
git push  origin --delete v1.0 # 方法2, 同删除远程分支的语法一致
```
6. 同步远程tag(远程存在, 本地不存在)

```sh
git fetch origin tag v17.0.1
```
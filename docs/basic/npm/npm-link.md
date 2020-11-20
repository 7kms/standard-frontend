# NPM 使用技巧

### [npm link](https://docs.npmjs.com/cli/link.html)

语法:
```sh
npm link (in package dir)
npm link [<@scope>/]<pkg>[@<version>]
```

1. 执行 `npm link` 创建一个软链, 将`{prefix}/lib/node_modules/<package>`链接到当前目录. 同时如果`package.json`中有`bin`配置项, 则会依次创建新的软链`{prefix}/bin/{name}`链接到`bin`中配置的可执行文件(可以制作nodejs的命令行工具, 脚手架等).

2. 执行 `npm link package-name` 创建一个软链, 将`{prefix}/lib/node_modules/<package-name>`链接到当前目录下的`node_modules`中.

3. 执行`npm unlink`, 可以删除创建的软链

操作示例:
```sh
cd ~/projects/node-redis    # go into the package directory
npm link                    # creates global link
cd ~/projects/node-bloggy   # go into some other package directory.
npm link redis              # link-install the package
```

此时在`~/projects/node-redis`中的任何改动都会关联到`~/projects/node-bloggy/node_modules/node-redis/`中. 

将两个步骤合二为一:
```sh
cd ~/projects/node-bloggy  # go into the dir of your main project
npm link ../node-redis     # link the dir of your dependency
```
其中第二步相当于:
```sh
(cd ../node-redis; npm link)
npm link redis
```
首先创建全局软链(把`node-redis`链接到全局的`node_modules`下),然后将已经安装到全局的目标对象(这里是`redis`)链接到当前的`node_modules`目录下
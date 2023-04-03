---
title: 使用 husky 和 lint-staged 在提交前做代码检查
date: 2021-11-17 19:42:00
tags:
  - git
  - eslint
---

git 提供了一系列的 [hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) ，
这些钩子会在 commit, pull, push 这些操作的之前或之后的时机执行。这些 hook 定义在 `.git/hooks`
文件夹。常见的有：`.git/hooks/commit-msg` `.git/hooks/pre-commit`

## husky

[husky](https://github.com/typicode/husky) 可以让 GitHooks 写起来更简单，通过如下示例即可以添加一个 _pre-commit hook_

```bash

npm install -D husky

# 添加 npm script prepare (prepare 会在发布前或 npm install 之后执行)
npm pkg set scripts.prepare="husky install"
# 执行 & 生成 .husky 文件夹
npm run prepare

# 添加一个 pre-commit hook, 内容是 `npx lint-staged`
npx husky add .husky/pre-commit "npx lint-staged"
git add .husky/pre-commit

# 提交刚才的改动
git commit -m "chore: husky pre-commit init"
```

如果很不幸，你的项目文件夹不是你的 git 仓库的根目录（即 package.json 和 .git 不在同一目录），那么可以参考[文档这里](https://typicode.github.io/husky/#/?id=custom-directory)配置。

## lint-staged

顾名思义，这个库是用来 lint 那些位于 staged (暂存) 状态的文件。[lint-staged](https://github.com/okonet/lint-staged) 接受一个配置，配置中可定义脚本，lint-staged 会将暂存区的文件传递给脚本。这个配置可以在 package.json 中定义，也可以单独有一个配置文件。以 package.json 为例：

```json
{
  "lint-staged": {
    "*.{js,vue}": ["env FORCE_COLOR=1 npm run script:lint"]
  }
}
```

执行 `npx lint-staged`，程序会读取相应的配置，执行 `npm run script:lint`，而在这个 npm script 中，
可以定义 js 脚本使用 eslint 的 node api 去做一些校验，staged 状态的文件可以通过 `process.argv.slice(2)` 拿到。
结合上面提到的 husky，我们不必手动调用 `npx lint-staged`，在 `.husky/pre-commit` 文件中，加入 `npx lint-staged --verbose`
这样在每次提交之前都会执行 `lint-staged` 命令，这个命令又会去执行我们自己定义的脚本 (定义在 `npm scrip:lint` 中)。

## yorkie

如果是 vue 用户，而且是使用 vue-cli 创建的项目，那么有很大可能项目已经自带了 yorkie ，那么你不需要使用 husky 。
只需要在 package.json 中加入一个 `gitHooks` 字段，指定 hook 需要执行的脚本：

```json
{
  "gitHooks": {
    "pre-commit": "lint-staged --verbose"
  }
}
```

原理：  
在安装 yorkie 的时候，会执行[相应的 npm script](https://github.com/yyx990803/yorkie/blob/a4cf01d789da2633a33a888b496fa35395e72109/package.json?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L11): `node bin/install.js`，
在 .git/hooks 文件夹中写入 pre-commit 文件，pre-commit 是一个 bash 脚本，可以在里面调用 `package.json/gitHooks` 字段定义的 node 脚本。

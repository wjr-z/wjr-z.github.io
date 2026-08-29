---
title: "常用markdown介绍"
date: 2021-01-15
updated: 2021-01-26
tags: []
section: "notes"
---
## 标题

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

效果如下：

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 插入代码

  
  
  
  
  
  
  
效果如下  

```c++
#include <bits/stdc++.h>
using namespace std;
int main(){
    return 0;
}
```

此处以C++为例，\`\`\`后面是代码语言。

## 字体

```
**我是sb** （粗体）
*tql* （斜体）
~~啊这~~ （划线）
```

效果如下：  
**我是sb** （粗体）  
*tql* （斜体）  
啊这 （划线）

## 插入链接

```
[链接文本](链接地址)
```

效果如下：  
[myblog](https://wjr-z.com/)

## 插入图片

```
![图片文字描述](图片地址)
```

效果如下：  

若觉得图片位置或者大小不太适合，可以尝试用html语言设置高度和宽以及位置等。

## 插入引用

```
> 啊这
```

> 啊这

## 插入表格

```
|name|age|address|
|---|:----:|---:|
|zhang|18|beijing|
|wang|22|shandong|
```

> 居中 `:------`  
> 局左 `-------` 或 `:-----:`  
> 居右 `------:`

效果如下：

name

age

address

zhang

18

beijing

wang

22

shandong

## 换行

两个空格一个回车

## 分割线

```
LCT

--- 
splay
```

效果如下：  
LCT

* * *

splay

(yysy这个分割线好丑，以后改一下样式)

## 无序列表

```
- a
- b
- c
```

效果如下：

-   a
-   b
-   c

> 参考文章 [常用Markdown语法归纳](https://www.cnblogs.com/zhangjinzhe/p/8252893.html)

---
title: "QtCreator开启-O编译优化的方式"
date: 2021-03-06
updated: 2021-03-30
tags: ["Qt"]
section: "engineering"
---
首先，编译优化必须是在Release模式下进行，保证程序没有任何bug的条件下进行执行。

如果程序开了编译优化，部分错误不会报错且debug会出问题，因此需要在没有bug后再进行优化

编译优化能极大提升程序的运行效率，级别越高速度越快，但是对代码健壮性要求也越高！

选择编译release模式，在pro文件根据优化的需要添加下面的语句：

```c++
QMAKE_CXXFLAGS_RELEASE += -O        # Release -O
QMAKE_CXXFLAGS_RELEASE += -O1       # Release -O1
QMAKE_CXXFLAGS_RELEASE += -O2       # Release -O2
QMAKE_CXXFLAGS_RELEASE += -O3       # Release -O3
```

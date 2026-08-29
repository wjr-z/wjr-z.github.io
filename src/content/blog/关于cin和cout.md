---
title: "关于cin和cout"
date: 2021-04-05
updated: 2021-04-05
tags: []
section: "computer-contest"
---
在我ICPC 昆明赛区因为使用 cin 和 cout TLE一发后，我改成了scanf和printf，从 2s 的TLE变成了 267 ms …

然后我在赛后进行了一些测试

cin和cout是挺慢的，但我真没想到能差这么多，以至于比我的$O(nlogn)$算法还慢上几倍。

[测试题目](https://ac.nowcoder.com/acm/contest/12548/L)

效率测试：

1.  scanf和printf
    
    [测试代码](https://ac.nowcoder.com/acm/contest/view-submission?submissionId=47383595)
    
    用时：267ms
    
2.  cin和cout（不关闭流同步以及使用endl）
    
    [测试代码](https://ac.nowcoder.com/acm/contest/view-submission?submissionId=47383665)
    
    用时：2001 ms（TLE)
    
3.  cin和cout（关闭流同步以及使用endl）
    
    [测试代码](https://ac.nowcoder.com/acm/contest/view-submission?submissionId=47383690)
    
    用时：2001ms（TLE）
    
4.  cin和cout(不关闭流同步和不使用endl)
    
    [测试代码](https://ac.nowcoder.com/acm/contest/view-submission?submissionId=47383667)
    
    用时：1425ms
    
5.  cin和cout（关闭流同步和不使用endl）
    
    [测试代码](https://ac.nowcoder.com/acm/contest/view-submission?submissionId=47383694)
    
    用时：218ms
    

关闭流同步会使得cin和cout速度变快，这我早就知道了

从 4 和 5 的对比就能看得出来，还是快了很多的

并且可以发现**频繁使用endl刷新缓冲区**会导致速度严重降低，即便关闭了流同步也会导致效率相差很大

题外话：

我第一次TLE后，我是真的不太相信就是cin 和 cout 会导致效率低那么多…

然后犹豫了几分钟后才抱着试试的心态交了一发，结果过了…

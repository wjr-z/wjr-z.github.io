---
title: "Educational Codeforces Round 99"
date: 2020-12-01
updated: 2021-01-22
tags: ["cf比赛","博弈论"]
section: "computer-contest"
---
## A. Strange Functions

[题目链接](https://codeforces.ml/contest/1455/problem/A)  
题意:g(x)定义为$\frac{x}{f(f(x))}$(f(x)表示将x翻转后的数),例如f(10)=1,对于给定的n求出1~n中有多少不同的g(x)  
题解:  
即n的长度数  

## B. Jumps

[题目链接](https://codeforces.ml/contest/1455/problem/B)  
题意:初始在0,第k次可以选择+k或者-1,问到达n的最小次数  
题解:  
对于$\frac{n*(n+1)}{2}$,即为n次  
  
对于这n次中任意一次变成-1,可以得到$\frac{(n-1)*n}{2}-1\sim\frac{n*(n+1)}{2}-1$  
  
令$F_{k}=\frac{k*(k+1)}{2}$  
  
则对于$n=F_{k}$,最小次数为k  
  
对于$F_{k-1}\leq n\leq F_{k}-1$,最小次数为k  
  
对于$n=F_{k}-1$,最小次数为k+1  

## C. Ping-pong

[题目链接](https://codeforces.ml/contest/1455/problem/C)  
题意:详见题目  
题解:  
因为只是最大化自己的获胜次数  
因此如果是Alice先手,Alice赢,则Bob必定不回球  
如果是Alice先手,Bob赢,若Alice还能回球,则必定能降低Bob的获胜次数,因此这种情况不会发生  
因此若输入为(n,m),输出(n-1,m)即可

## D.Sequence and Swaps

[题目链接](https://codeforces.ml/contest/1455/problem/D)  
题意:详见题目  
题解:  
否则对于$a_{i},a_{j}>x$,如果先把$a_{j}$替换成x,则$a_{i}$永远不可能小于等于x,因此每次都交换第一个符合的即可。  
如果本身就是有序,则输出0  
如果在交换若干次变成有序,则break并输出  
如果交换后并非非递减,则break并输出-1即可

## E,F待填坑

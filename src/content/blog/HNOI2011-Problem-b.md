---
title: "HNOI2011 Problem b"
date: 2021-01-22
updated: 2021-01-22
tags: ["莫比乌斯反演"]
section: "computer-contest"
---
-   莫比乌斯反演入门题，让刚学莫比乌斯反演的我有了继续学下去的欲望。

## 题目描述

n 次询问 $\sum\_{i=a}^{b}\sum\_{j=c}^{d} [gcd(i,j)==k]$ 。  
[题目链接](https://www.luogu.com.cn/problem/P2522)

## 题解

数学题没啥好说的，这题显然的莫比乌斯反演题，把其变为可以莫比乌斯反演的形式即可。  
并且可以用一个简单地容斥将下限都换成 1 。  
设 $f(k)=\sum\_{i=1}^{n}\sum\_{j=1}^{m}[gcd(i,j)==k]$ ， $F(k)=\sum\_{i=1}^{n}\sum\_{j=1}^{m}[k|gcd(i,j)]$  
  
则有  
$F(k)=\sum\_{k|d}f(d)=\lfloor\frac{n}{k}\rfloor\lfloor\frac{m}{k}\rfloor$  
前者很显然，后者因为只要求是 k 倍数的gcd，则 i , j 均为 k 的倍数即可。  
然后我们开始愉快的推式子：

$$

\begin{aligned} &\because F(k)=\sum_{k|d}f(d) \\ &\therefore f(k) =\sum_{k|d}\mu(\frac{d}{k})F(d) \\ \end{aligned}

$$

即

$$

f(k) = \sum_{k|d}\mu(\frac{d}{k})\lfloor\frac{n}{d}\rfloor \lfloor\frac{m}{d}\rfloor

$$

再令 $T=\frac{d}{k}$

$$

f(k)=\sum_{T}^{\frac{min(n,m)}{k}}\mu(R)\lfloor\frac{n}{kT}\rfloor \lfloor\frac{m}{kT}\rfloor

$$

然后整除分块即可。  
关于整除分块，其实就是将$\frac{n}{kT}\frac{m}{KT}$相同的一起处理  
  
比如当$T\in(L,R)$时$\frac{n}{kT}\frac{m}{KT}$相同，则这一部分答案为$\frac{n}{kT}\frac{m}{KT}\sum\_{i=L}^{R}\mu(i)$，预处理一下莫比乌斯函数的前缀和就好。

代码如下  

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=5e4+10;
int prime[N],mu[N];
long long sum[N];
bool f[N];
int a,b,c,d,k;
int n;
inline void init(){
    mu[1]=1,f[1]=true;
    int maxn=5e4;
    for(int i=2;i<=maxn;++i){
        if(!f[i]){
            prime[++prime[0]]=i;
            mu[i]=-1;
        }
        for(int j=1;j<=prime[0]&&i*prime[j]<=maxn;++j){
            f[i*prime[j]]=true;
            if(i%prime[j]==0)break;
            mu[i*prime[j]]=-mu[i];
        }
    }
    for(int i=1;i<=maxn;++i)
        sum[i]=sum[i-1]+mu[i];
}inline long long F(int n,int m,int k){
    n/=k,m/=k;
    int maxn=min(n,m);
    long long ans=0;
    for(int l=1,r=1;l<=maxn;l=r+1){
        r=min(n/(n/l),m/(m/l));
        ans+=(sum[r]-sum[l-1])*(n/l)*(m/l);
    }return ans;
}
int main(){
    init();
    scanf("%d",&n);
    while(n--){
        scanf("%d%d%d%d%d",&a,&b,&c,&d,&k);
        printf("%lld\n",F(b,d,k)-F(b,c-1,k)-F(a-1,d,k)+F(a-1,c-1,k));
    }
    return 0;
}
```

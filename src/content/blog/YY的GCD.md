---
title: "YY的GCD"
date: 2021-01-22
updated: 2021-01-22
tags: ["莫比乌斯反演"]
section: "computer-contest"
---
入门级别的题（不过貌似我一开始想复杂了  
[题目链接](https://www.luogu.com.cn/problem/P2257)  

## 题目描述

给定 $N, M$，求 $1 \leq x \leq N$，$1 \leq y \leq M$ 且 $\gcd(x, y)$ 为质数的 $(x, y)$ 有多少对。

## 题解

直接上柿子

$$

Ans=\sum_{k\in prime}\sum_{i=1}^{N}\sum_{j=1}^{M}[gcd(i,j)==k]

$$

如果莫比乌斯反演做了个几道题，就会知道要化简后面那个式子  
我们令$f(k)=\sum\_{i=1}^{N}\sum\_{j=1}^{M}[gcd(i,j)==k],F(k)=\sum\_{i=1}^{N}\sum\_{j=1}^{M}[k|gcd(i,j)]$  
  
然后可以得到

$$

\begin{aligned} &F(k)=\sum_{k|d}f(d)=\lfloor\frac{N}{k}\rfloor\lfloor\frac{M}{k}\rfloor \\ \therefore &f(k)=\sum_{k|d}\mu(\frac{d}{k})F(d)=\sum_{k|d}\mu(\frac{d}{k})\lfloor\frac{N}{d}\rfloor\lfloor\frac{M}{d}\rfloor \end{aligned}

$$

代入到 Ans 中，可以得到

$$

Ans=\sum_{k\in prime}\sum_{k|d}\mu(\frac{d}{k})\lfloor\frac{N}{d}\rfloor\lfloor\frac{M}{d}\rfloor

$$

这题因为是多组询问，如果我们将$\lfloor\frac{N}{d}\rfloor\lfloor\frac{M}{d}\rfloor$放在内层的话不好进行整数分块，因此要想办法将其放到外层  
  
因此我们外层枚举 d ：

$$

Ans=\sum_{d=1}^{min(n,m)}\lfloor\frac{N}{d}\rfloor\lfloor\frac{M}{d}\rfloor(\sum_{k|d,k\in prime}\mu(\frac{d}{k}))

$$

内层的这个与 N 和 M 无关，因此是可以预处理出其前缀和的，之后就可以进行整除分块了。

代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=1e7+10,M=1e6+10;
int mu[N],prime[M];
bool f[N];
long long sum[N];
inline void init(){
    f[1]=true,mu[1]=1;
    int maxn=1e7;
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
    for(int j=1;j<=prime[0];++j)
        for(int i=1;i*prime[j]<=maxn;++i)
            sum[i*prime[j]]+=mu[i];
    for(int i=1;i<=maxn;++i)
        sum[i]+=sum[i-1];
}inline long long F(int n,int m){
    int maxn=min(n,m);
    long long ans=0;
    for(int l=1,r=1;l<=maxn;l=r+1){
        r=min(n/(n/l),m/(m/l));
        ans+=(sum[r]-sum[l-1])*(n/l)*(m/l);
    }return ans;
}
int main(){
    int T,n,m;
    init();
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&n,&m);
        printf("%lld\n",F(n,m));
    }
    return 0;
}
```

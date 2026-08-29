---
title: "Steps to One"
date: 2021-01-25
updated: 2021-01-31
tags: ["莫比乌斯反演","DP","牛客每日一题","数论"]
section: "computer-contest"
---
这一题质量是真的不错，做了很久才做出来（初学莫比乌斯反演，别骂了  

题目描述：  
每次随机选出 $1\sim m$中的一个数，当已有的数的 gcd 为 1 时停止，问停止时的期望次数。  
  
[题目链接](https://ac.nowcoder.com/acm/problem/113552)

题解：

-   看到的一个[神仙题解](https://blog.nowcoder.net/n/46a56b6019d34eb399a82c56bced2f2c)，复杂度是O(m)。
-   我的题解  
    假设$F\_i$是 gcd 为 i 时变成 1 的期望次数，则不难得出$F\_i=1+\frac{1}{m}\sum\_{j=1}^{m}F\_{gcd(i,j)}$  
      
    这个$gcd(i,j)$下标不好处理，我们将其变为枚举 $gcd(i,j)$，则可以得到：  
    
$$

F_{i}=1+\frac{1}{m}\sum_{d|i}F_{d}\sum_{j=1}^{m}[gcd(i,j)==d]

$$
    
    内层循环是可以进一步化简的，我们设$g(d)=\sum\_{i=1}^{m}[gcd(i,n)==d],G(d)=\sum\_{i=1}^{m}[d|gcd(i,n)]$  
      
    可以得出
    
$$

\begin{aligned} &G(d)=\sum_{d|k}g(k)=\lfloor\frac{m}{d}\rfloor[n\%d==0] \\ &g(d)=\sum_{d|k}\mu(\frac{k}{d})G(k)=\sum_{d|k}\mu(\frac{k}{d})\lfloor\frac{m}{k}\rfloor[n\%k==0] \end{aligned}

$$
    
    然后可以将原式稍微变形，并将上式代入：
    
$$

\sum_{j=1}^{m}[gcd(i,j)==d]=\sum_{j=1}^{\lfloor\frac{m}{d}\rfloor}[gcd(\frac{i}{d},j)==1]

$$
    
    代入 g(1) ，得
    
$$

\begin{aligned} \sum_{k}\mu(k)\lfloor\frac{m}{dk}\rfloor[\frac{i}{d}\%k==0]=\sum_{k|\frac{i}{d}}\mu(k)\lfloor\frac{m}{dk}\rfloor \end{aligned}

$$
    
    令 $T=dk$
    
$$

\sum_{T|i}\mu(\frac{T}{d})\lfloor\frac{m}{T}\rfloor

$$
    
    代入原式
    
$$

\begin{aligned} F_i&=1+\frac{1}{m}\sum_{d|i}F_d\sum_{T|i}\mu(\frac{T}{d})\lfloor\frac{m}{T}\rfloor \\ &=1+\frac{1}{m}\sum_{T|i}\lfloor\frac{m}{T}\rfloor\sum_{d|T}\mu(\frac{T}{d})F_d \end{aligned}

$$
    
    内层循环与 i 无关，因此可以进行处理，在求 F 的同时进行更新。  
    注意到左右两边均存在 $F\_i$ ，将右边的 $F\_i$提出并合并到左边即可
    
$$

\begin{aligned} F_i&=1+\frac{1}{m}\sum_{T|i}\lfloor\frac{m}{T}\rfloor\sum_{d|T}\mu(\frac{T}{d})F_d \\ &=1+\frac{1}{m}\sum_{T|i}\lfloor\frac{m}{T}\rfloor\sum_{d|T}\mu(\frac{T}{d})F_d[d\neq i]+\frac{1}{m}\lfloor\frac{m}{i}\rfloor\mu(1)F_i \\ &=1+\frac{1}{m}\sum_{T|i}\lfloor\frac{m}{T}\rfloor\sum_{d|T}\mu(\frac{T}{d})F_d[d\neq i]+\frac{1}{m}\lfloor\frac{m}{i}\rfloor F_i \\ F_{i}&=\frac{m+\sum_{T|i}\lfloor\frac{m}{T}\rfloor\sum_{d|T}\mu(\frac{T}{d})F_d[d\neq i]}{m-\lfloor\frac{m}{i}\rfloor} \end{aligned}

$$
    
    记$g\_T=\sum\_{d|T}\mu(\frac{T}{d})F\_d[d\neq i]$即可，每次求出$F\_i$后更新 g ，因为 $g\_T$在求出 $F\_T$后被更新，因此求$F\_T$时不需要特判$T\neq i$。  
    

代码如下  

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=1e5+10,M=1e5,mod=1e9+7;
inline int add(int a,int b){return a+b>=mod?a+b-mod:a+b;}
inline int del(int a,int b){return a<b?a-b+mod:a-b;}
inline int mul(int a,int b){return a*1ll*b%mod;}
inline int qpow(int a,int b){
    int s=1;
    while(b){
        if(b&1)s=mul(s,a);
        a=mul(a,a);
        b>>=1;
    }
    return s;
}
int prime[N],mu[N];
vector<int>q[N];
bool f[N];
int F[N],g[N];
inline void init(){
    f[1]=true,mu[1]=1;
    for(int i=2;i<=M;++i){
        if(!f[i]){
            prime[++prime[0]]=i;
            mu[i]=-1;
        }
        for(int j=1;j<=prime[0]&&i*prime[j]<=M;++j){
            f[i*prime[j]]=true;
            if(i%prime[j]==0)break;
            mu[i*prime[j]]=-mu[i];
        }
    }
    for(int i=1;i<=M;++i)
        mu[i]=mu[i]<0?mu[i]+mod:mu[i];
    for(int i=1;i<=M;++i)
        for(int j=i;j<=M;j+=i)
            q[j].push_back(i);
    F[1]=0,g[1]=0;
}int m;
int main(){
    init();
    scanf("%d",&m);
    for(int i=2;i<=m;++i){
        for(int j=q[i].size()-1;~j;--j)
            F[i]=add(F[i],mul(m/q[i][j],g[q[i][j]]));
        F[i]=add(F[i],m);
        F[i]=mul(F[i],qpow(m-m/i,mod-2));
        for(int j=i;j<=m;j+=i)
            g[j]=add(g[j],mul(F[i],mu[j/i]));
    }
    int ans=0;
    for(int i=1;i<=m;++i)
        ans=add(ans,F[i]);
    ans=add(1,mul(ans,qpow(m,mod-2)));
    printf("%d\n",ans);
    return 0;
}
```

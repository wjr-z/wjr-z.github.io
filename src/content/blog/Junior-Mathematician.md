---
title: "2019-2020 ICPC Asia Hong Kong Regional Contest J.Junior Mathematician"
date: 2021-03-10
updated: 2021-03-10
tags: ["ICPC","数位DP"]
section: "computer-contest"
---
### 数位DP题

此题可以选择从高位到低位转移或者低位到高位转移，我两种都试了一下，其实差不多。

最简单的方法是记$dp[i][j][k][l]$表示转移到第$i$位（从高到低或者从低到高）$x\\%m==j$并且$f(x)\\%m==k$并且各位数字和$\\%m==l$的方案数  

不过这样空间和时间复杂度都太高了

不难发现可以将第二维和第三维合并，即$dp[i][j][k]$表示转移到第$i$位且$(x-f(x))\\%m==0$且各位数字和$\\%m==l$的方案数  

转移方程并不是难点。

对于数位DP，想降低错误率，尽量减少调试时间或者不调试，建议用**记忆化搜索**，递推虽然会快一些但是记忆化更容易写。

#### 记忆化搜索版本：

基本写完调了一下就过了

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=5050,M=61,mod=1e9+7;
int dp[N][M][M],q[N],a[N],len1,len2,m;
char s[N],g[N];
inline void init() {
    q[1]=1;
    for(int i=2;i<=len2;++i)
        q[i]=(q[i-1]*10)%m;
}
inline int dfs(int now, int s, int p, int lim) {
    if(!now)return s==0;
    if(!lim&&~dp[now][s][p])return dp[now][s][p];
    int Max=lim?a[now]:9;
    int ans=0;
    for (int i = 0; i <= Max; ++i) {
        int u=((s+q[now]*i-i*p)%m+m)%m,v=(p+i)%m;
        ans=((ans+dfs(now-1,u,v,lim&i==Max))%mod+mod)%mod;
    }
    if(!lim)dp[now][s][p]=ans;
    return ans;
}inline int getans(char* s,int len,bool gg) {
    for(int i=1;i<=len;++i)
        a[i]=s[len-i+1]-'0';
    if (gg) {
        --a[1];
        for (int i = 1; i <= len; ++i) {
            if (a[i] < 0) {
                a[i] += 10;
                --a[i + 1];
            }else break;
        }
        while(!a[len])--len;
    }
    return dfs(len,0,0,1);
}int T;
int main() {
    scanf("%d",&T);
    while (T--) {
        scanf("%s%s%d",s+1,g+1,&m);
        len1=strlen(s+1),len2=strlen(g+1);
        init();
        for(int i=1;i<=len2;++i)
            for(int j=0;j<m;++j)
                for(int k=0;k<m;++k)
                    dp[i][j][k]=-1;
        printf("%d\n",(getans(g,len2,0)-getans(s,len1,1)+mod)%mod);
    }
    return 0;
}
```

#### 递推版本：

写完还调试了半天才过qwq

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=5010,M=62,mod=1e9+7;
int f[N][M][M],g[N][M][M];
int a[N],q[N],len;
int m;
char s[N],h[N];
inline void init() {
    q[1]=1;
    for(int i=2;i<=5000;++i)
        q[i]=(q[i-1]*10)%m;
}
inline int getans(char*s,bool gg) {
    len=strlen(s+1);
    for(int i=1;i<=len;++i)
        for(int j=0;j<m;++j)
            for(int k=0;k<m;++k)
                f[i][j][k]=g[i][j][k]=0;
    for(int i=1;i<=len;++i)
        a[i]=s[len-i+1]-'0';
    if (gg) {
        --a[1];
        for (int i = 1; i <= len; ++i) {
            if (a[i] < 0) {
                a[i]+=10;
                --a[i+1];
            }else break;
        }
        while(!a[len])--len;
    }
    for (int i = 0; i < 10; ++i) {
        ++f[1][i%m][i%m];
        if(i<=a[1])++g[1][i%m][i%m];
    }
    for (int i = 2; i <= len; ++i) {
        for(int j=0;j<m;++j)
            for (int k = 0; k < m; ++k) {
                for (int p = 0; p < 10; ++p) {
                    int u=((j + q[i] * p - k * p)%m+m)%m,v=(k+p)%m;
                    f[i][u][v]=(f[i][u][v]+f[i-1][j][k])%mod;
                    if(p<a[i])
                        g[i][u][v]=(g[i][u][v]+f[i-1][j][k])%mod;
                    if(p==a[i])
                        g[i][u][v]=(g[i][u][v]+g[i-1][j][k])%mod;
                }
            }
    }
    int ans=0;
    for(int i=0;i<m;++i)
        ans=(ans+g[len][0][i])%mod;
    return ans;
}
int T;
int main() {
    scanf("%d",&T);
    while (T--) {
        scanf("%s%s%d",s+1,h+1,&m);
        init();
        int u=getans(s,1),v=getans(h,0);
        printf("%d\n",((v-u)%mod+mod)%mod);
    }
    return 0;
}
```

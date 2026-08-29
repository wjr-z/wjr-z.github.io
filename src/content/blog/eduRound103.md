---
title: "Educational Codeforces Round 103 (Rated for Div. 2)"
date: 2021-01-30
updated: 2021-01-30
tags: ["cf比赛"]
section: "computer-contest"
---
## 前言

我居然能在B题上因为 long long 和向上取整错四次…（人才  
好在之后几题比较顺  

## A. K-divisible Sum

[题目链接](https://codeforces.com/contest/1476/problem/A)

### 题目描述：

给出 n 和 k ，你要构造一个 n 个元素的数组 a ，a 所有元素的和可以被 k 整除，求出 a 最大元素最小可能是多少。

### 题解：

假设 a 中最大元素是 MAX ，则可以得到的数是 $MAX+n-1\sim n*MAX$  

-   $k\geq n$时，找到最小的MAX使得$n*MAX\geq k$即可，即$\lceil\frac{k}{n}\rceil$  
    
-   $k < n$时，如果$n\\%k=0$则 MAX = 1 即可满足题意，如果$n\\%k\neq 0$，当 MAX = 2 时，可以得到$n+1 \sim 2n$，必定存在一个数能被 k 整除。

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
int main(){
    int n,x,T;
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&n,&x);
        if(n>x){
            if(n%x==0)
            	printf("1\n");
            else 
            	printf("2\n");
            continue;
        }
        if(x%n==0)printf("%d\n",x/n);
        else printf("%d\n",x/n+1);
    }
    return 0;
}
```

## B. Inflation

[题目链接](https://codeforces.com/contest/1476/problem/B)

### 题目描述：

给定一个数组$p\_0,p\_1…p\_{n-1}$，可以令每个$p\_i$加上一个非负整数$a\_i$，使得$\frac{p\_i}{p\_0+p\_1+…+p\_{i-1}}\leq k\\%$，要求$\sum\_{i=0}^{n-1}a\_i$的最小值。

### 题解：

这题我花了23分钟，还错了4次…  
这题是贪心，结论其实可以直接猜出来。  
我们从前往后处理每个数，如果$\frac{p\_i}{p\_0+p\_1+…+p\_{i-1}} > k\\%$，则将$p\_i$加到使得$\frac{p\_i}{p\_0+p\_1+…+p\_{i-1}} \leq k\\%$，顺便更新答案即可。  
  
这样我们确实前面的是最小化了，但是能否保证后面也能最小化答案呢？  
如果 $\frac{x}{y}=\frac{k}{100}$ ，则当 y 变化 100 时， x 只变化 k  
  
我们假设我们贪心到 i 有 $\frac{p\_i+a\_i}{p\_0+p\_1+…+p\_{i-1}+x}=\frac{k}{100}$ ，如果分母增大，则分子减少的小于等于分母增加的，因此不会更优，往后处理时均如此。  
  
因此这个贪心策略是正确的。

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
int  T,n,k;
int a[105],d[105];
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&n,&k);
        for(int i=1;i<=n;++i)
            scanf("%d",&a[i]);
        long long s=a[1];
        long long ans=0;
        for(int i=2;i<=n;++i){
            if(a[i]*100ll>k*s){
                long long x=ceil((100ll*a[i]-k*s)*1.0/k);
                ans+=x;
                s+=x;
            }
            s+=a[i];
        }
        printf("%lld\n",ans);
    }
    return 0;
}
```

那个向上取整其实可以用更好的写法，即$long long x=(100ll*a[i]+k-1)/k-s;$，这样避免了精度问题。

## C. Longest Simple Cycle

[题目链接](https://codeforces.com/contest/1476/problem/C)

### 题目描述：

给出 n 条链，每条链的首、尾与上一条链的两个点相连，请求出最大的简单环。  

### 题解：

其实真的很简单。  
我们设$dp\_i$表示第 i 条链和在其之前的链构成的最大简单环的长度，则很显然第 i 条链要么通过与上一条链连接的两个点以及自己构成一个简单环，要么是通过与上一条链构成的最大简单环构成一个新的最大简单环（需要减去重复部分）  
因此顺着这样求就行了，我为了简便书写就改了一点变量（感觉貌似更复杂了，服了我自己

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
int T,n;
const int N=1e5+10,inf=1e9+7;
int a[N],b[N],c[N];
long long dp[N];
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d",&n);
        for(int i=1;i<=n;++i)
            scanf("%d",&c[i]);
        for(int i=1;i<=n;++i)
            scanf("%d",&a[i]);
        for(int i=1;i<=n;++i)
            scanf("%d",&b[i]);
        dp[1]=-inf;
        long long ans=0;
        for(int i=2;i<=n;++i){
            dp[i]=2+abs(a[i]-b[i]);
            int L=min(a[i],b[i]),R=max(a[i],b[i]);
            if(a[i]!=b[i])
                dp[i]=max(dp[i],2+dp[i-1]+L-1+c[i-1]-R);
            ans=max(ans,dp[i]+c[i]-1);
        }
        printf("%lld\n",ans);
    }
    return 0;
}
```

## D. Journey

[题目链接](https://codeforces.com/contest/1476/problem/D)

### 题目描述：

n + 1 个城市，从 $0\sim n$  
  
给出一个长度为 n 的字符串，如果第 i 位是 L ，表示有一条从 i 到 i-1 的有向边；如果是 R ，表示有一条从 i-1 到 i 的有向边。  
且每次经过一条边后所有边的朝向改变，对于每一个城市，求出以其为初始位置时能经过的最多城市数。

### 题解：

每次朝向会改变，我想都没想直接以时间点为奇数/偶数拆点建图了，初始时间为 0 。  
然后把样例手模一下，发现一个简单的并查集就能做了，因为每条边都是双向边，并且连接着的是相邻且时间奇偶性不同的连个点，这样一来既不会有一个城市既能在偶数时间点被访问又在奇数时间点被访问，而且因为双向可以互相到达。  
那么其实缩点也可以做到，不过我这里为了代码书写起来简单直接写了个并查集，其他方法没想过了，反正我觉得拆点后可以秒出。

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=3e5+10;
int fa[N<<1],siz[N<<1],T,n;
inline int get(int x){return x==fa[x]?x:fa[x]=get(fa[x]);}
char s[N];
inline void link(int x,int y){
    x=get(x),y=get(y);
    if(x==y)return;
    fa[x]=y;
    siz[y]+=siz[x];
}
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d",&n);
        scanf("%s",s+1);
        int c=2*(n+1),S=n+1;
        for(int i=1;i<=c;++i)
            fa[i]=i,siz[i]=1;
        for(int i=1;i<=n;++i){
            if(s[i]=='L')
                link(i+1,i+S);
            else link(i,i+1+S);
        }
        for(int i=1;i<=S;++i)
            printf("%d ",siz[get(i)]);
        printf("\n");
    }
    return 0;
}
```

## E. Pattern Matching

[题目链接](https://codeforces.com/contest/1476/problem/E)

### 题目描述：

见题目。

### 题解：

想清楚就不难，但就是想不清楚，想出来后又觉得我当时为啥这么蠢。

其实每个字符串最多能匹配$2^4$个模式串，利用拓扑排序的方式即可，如果字符串能匹配 mt 模式串，则将 mt 模式串与其他所有该字符串能匹配的模式串连有向边（起点是 mt ）；如果不能匹配则说明无解。  
之后拓扑排序即可的出答案。  
然后就要考虑如何快速得到字符串能匹配到的所有模式串了，可以字典树或者map，具体就不细讲了。

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=1e5+10;
int ch[N<<2][27],val[N<<2],cnt;
int d[N<<1],nxt[N<<4],to[N<<4],tot;
int deg[N<<1];
queue<int>q;
int ans[N<<1],ans2[N<<1];
inline void ins(int a,int b){
    to[++tot]=b;
    nxt[tot]=d[a];
    d[a]=tot;
    ++deg[b];
}
int n,m,k;
inline void insert(char*s,int id){
    int p=1;
    for(int i=1;i<=k;++i){
        int j;
        if(s[i]=='_')j=26;
        else j=s[i]-'a';
        if(!ch[p][j])ch[p][j]=++cnt;
        p=ch[p][j];
    }
    val[p]=id;
}
bool f;
bool g;
int num,mt;
inline void work(int p,char*s,int now){
    if(!p)return;
    if(now>k){
        if(val[p]==mt){
            g=true;
            ins(mt,num+n);
        }else{
            ins(num+n,val[p]);
        }
        return;
    }
    work(ch[p][s[now]-'a'],s,now+1);
    work(ch[p][26],s,now+1);
}
char s[10];
int main(){
    scanf("%d%d%d",&n,&m,&k);
    cnt=1;
    for(int i=1;i<=n;++i)
        scanf("%s",s+1),insert(s,i);
    f=true;
    for(int i=1;i<=m;++i){
        num=i;
        scanf("%s%d",s+1,&mt);
        g=false;
        work(1,s,1);
        if(!g)f=false;
    }
    if(!f){
        printf("NO\n");
        return 0;
    }
    for(int i=1;i<=n;++i){
        if(!deg[i])
            q.push(i);
    }int Tim=0;
    while(!q.empty()){
        int x=q.front();
        q.pop();
        if(x<=n)
            ans[x]=++Tim;
        for(int i=d[x];i;i=nxt[i]){
            int u=to[i];
            if(--deg[u]==0)q.push(u);
        }
    }
    for(int i=1;i<=n;++i)
        if(deg[i]){
            f=false;
            break;
        }
    if(!f){
        printf("NO\n");
        return 0;
    }
    for(int i=1;i<=n;++i)
        if(!ans[i])
            ans[i]=++Tim;
    for(int i=1;i<=n;++i)
        ans2[ans[i]]=i;
    printf("YES\n");
    for(int i=1;i<=n;++i)
        printf("%d ",ans2[i]);
    printf("\n");
    return 0;
}
```

---
title: "Codeforces Round 703 (Div. 2)"
date: 2021-02-19
updated: 2021-02-19
tags: ["cf比赛"]
section: "computer-contest"
---
## 前言

达成寒假目标：codeforces 2000分！  
这场比赛题目还比较有趣的

## A. Shifting Stacks

### 题目描述：

有 n 堆石子，每堆石子数量为 $h\_i$ ($0\leq h\_i \leq 10^9$)，每次可以将第 i 堆石子中的一颗石子移动到第 i + 1 堆（ i < n ) ，请问是否可以让石子高度严格递增。

### 题解：

其实很简单，最好的情况是第 1 堆全部移给第 2 堆，如果第 2 堆至少为 1 则继续，否则说明不能满足题意；然后让第 2 堆石子高度为 1 ，其余的给第 3 堆 ，如果第 3 堆至少为 2 则继续，否则说明不能满足题意…  
不难发现这样其实对于每一个 i 都要满足 $\sum\_{j=1}^{i}h\_j \geq \frac{i*(i-1)}{2}$  

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=1e4+10;
int main(){
    int T,n;
    scanf("%d",&T);
    while(T--){
        scanf("%d",&n);
        long long sum;
        int x;
        sum=0;
        bool f=1;
        for(int i=1;i<=n;++i){ 
            scanf("%d",&x),sum+=x;
            if(sum<(i*1ll*(i-1)/2))f=0;
        }
        if(f)printf("YES\n");
        else printf("NO\n");
    }
    return 0;
}
```

## B. Eastern Exhibition

### 题目描述：

给出 n 个平面上的点，两点间距离为 $|x\_1-x\_2|+|y\_1-y\_2|$ ，求出该平面有多少个点可以使得该点到 n 个点的距离之和最小。

### 题解：

我们可以将二维点映射成一维点来看  
距离之和 = $\sum\_{i=1}^{n}|X-x\_i|+\sum\_{i=1}^{n}|Y-y\_i|$  
  
则，仅对于 x 坐标，求出有多少个 X 满足 $\sum\_{i=1}^{n}|X-x\_i|$最小，和对于 y 坐标，求出有多少个 Y 满足 $\sum\_{i=1}^{n}|Y-y\_i|$最小，两者相乘即可。  

-   如果 n 为奇数，则很显然为 1
-   如果 n 为偶数，假设已经按照 x 排好序，则有 $x\_{\frac{n}{2}+1}-x\_{\frac{n}{2}}+1$ 个 X 满足，Y 求法类似。

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=1010;
int T,n;
struct node{
    int x,y;
}a[N];
inline bool cmp1(node a,node b){return a.x<b.x;}
inline bool cmp2(node a,node b){return a.y<b.y;}
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d",&n);
        for(int i=1;i<=n;++i)
            scanf("%d%d",&a[i].x,&a[i].y);
        if(n&1){
            printf("1\n");
        }else{
            sort(a+1,a+1+n,cmp1);
            int mid=n>>1;
            int X=a[mid+1].x-a[mid].x+1;
            sort(a+1,a+1+n,cmp2);
            int Y=a[mid+1].y-a[mid].y+1;
            printf("%lld\n",X*1ll*Y);
        }
    }
    return 0;
}
```

## C. Guessing the Greatest

### 题目描述：

现有一个长度为 n 的无重复数字的数列，只给了你 n ，并未给出每个元素大小  
你可以进行询问，询问格式为 ? L R ，询问后会返回 \[L,R\] 中第二大的元素所在位置  
现在你需要在 20 次询问内找出数组中最大元素的位置。

### 题解：

一道简单的交互题  
首先我们询问 \[1,n\] 找出第二大元素的位置，假设该位置为 mid  
接着我们询问 \[1,mid\] 和 \[mid,n\] （$mid \neq 1,mid \neq n$），如果其中一个区间询问的答案是 mid 说明最大的元素就在该区间  
  
假设最大元素在\[1,mid\]，我们如果询问 \[Mid,mid\] 的答案是 mid 说明最大元素在 Mid 右边 ，否则就是在 Mid 左边，这样就可以二分了  
对于 \[mid,n\] 同理

不过有些细节要处理下，比如 mid 为 1 或者 n

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
int n;
inline int ask(int L,int R){
    printf("? %d %d\n",L,R);
    fflush(stdout);
    int x;
    scanf("%d",&x);
    return x;
}
int main(){
    scanf("%d",&n);
    int mid=ask(1,n);
    int L,R;
    bool f;
    if(mid==1||mid==n){
        if(mid==1){
            L=2,R=n;
            f=1;
        }else{
            L=1,R=n-1;
            f=0;
        }
    }else{
        int p=ask(1,mid);
        if(p==mid){
            L=1,R=mid-1;
            f=0;
        }else{
            L=mid+1,R=n;
            f=1;
        }
    }int ans=0;
    if(!f){
        int Mid;
        while(L<=R){
            Mid=L+R>>1;
            if(ask(Mid,mid)!=mid)R=Mid-1;
            else L=Mid+1,ans=Mid;
        }
    }else{
        int Mid;
        while(L<=R){
            Mid=L+R>>1;
            if(ask(mid,Mid)!=mid)L=Mid+1;
            else R=Mid-1,ans=Mid;
        }
    }
    printf("! %d\n",ans);
    return 0;
}
```

yysy代码好丑啊qwq

## D. Max Median

### 题目描述：

给定以长度为 n 的数列，求出所有长度至少为 k 的子序列中位数的最大值。  
例如：median(\[1,2,3,4\])=2 , median(\[3,2,1\])=2, median(\[2,1,2,1\])=1

### 题解：

这题很简单，就是有点难  
求中位数其实有套路的，假如我们想求一个数列的中位数，我们可以直接排序，然后求出  
但其实还可以直接二分中位数的值，我们假设二分的值为 x ，我们让小于 x 的为 1 ，让大于等于 x 的为 -1  
要注意一下，这里如果元素总数为偶数，中位数并不是中间两个数的平均数，而是中间两个数中较小的一个  
我们通过分类讨论可以得出，如果总和小于等于 -1 说明中位数大于等于 x

那么这题就好解决了  
我们二分中位数的大小，然后判断是否存在一个长度至少为 k 的区间的和小于等于 -1  
很显然可以用前缀和将判断的复杂度优化到 O ( n )  
一个区间\[L,R\]的和为 $s\_R-s\_{L-1}$，我们要找到长度至少为 k 的区间且区间和小于等于-1，即找到$s\_R\leq s\_{L-1}-1$，且$R-L+1\geq k$，枚举 R ，我们设 $Max=max{s\_{0},s\_1…s\_{R-k}}$，判断$s\_R\leq Max-1$即可  

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
int n,k;
const int N=2e5+10;
int a[N],b[N];
int c[N],s[N];
inline bool check(int x){
    for(int i=1;i<=n;++i)
        if(a[i]<x)c[i]=1;
        else c[i]=-1;
    for(int i=1;i<=n;++i)s[i]=s[i-1]+c[i];
    int Max=0;
    for(int i=k;i<=n;++i){
        if(s[i]<=Max-1)return true;
        Max=max(Max,s[i-k+1]);
    }
    return false;
}
int main(){
    scanf("%d%d",&n,&k);
    for(int i=1;i<=n;++i)
        scanf("%d",&a[i]),b[i]=a[i];
    sort(b+1,b+1+n);
    int L=1,R=n,mid,ans=0;
    while(L<=R){
        mid=L+R>>1;
        if(check(b[mid]))L=mid+1,ans=mid;
        else R=mid-1;
    }
    printf("%d\n",b[ans]);
    return 0;
}
```

## E. Paired Payment

### 题目描述：

给定 n 个点 m 条边的无向图（无自环和重边）  
规定你每次必须走两条边，即每次从 a 到 b ，再从 b 到 c ，花费为 $(w\_{ab}+w\_{bc})^2$ ，求从 1 到 所有点的最短路，如果不存在则输出 -1 。  

### 题解：

首先，非常重要的一个条件：**边权很小！**  
我们不妨将其按照奇/偶分层

-   第 0 层代表通过偶数条边到达
-   第 i 层代表通过奇数条边到达，且上一条边的权值是 i

假设有边 u - > v ，边权为 w  
将第 0 层的 u 连边权为 0 的边到第 w 层的 v  
将第 $i(i\in [1,50])$层的 u 连边权为 $(i+w)^2$ 的边到第 0 层的 v  
对于 v - > u 同理。

那么事实上没必要建这个分层图，只需要在转移的时候改改原图的边权即可  
很显然分层图可以跑dijkstra，那么不分层也是可以跑dijkstra的  
让 dis\[x\]\[i\] 表示第 i 层的 x 点的最短路，然后转移即可。

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=2e5+10,inf=1e9;
int n,m,d[N],nxt[N<<1],to[N<<1],cost[N<<1],tot;
inline void ins(int a, int b, int c) {
    to[++tot]=b;
    nxt[tot]=d[a];
    d[a]=tot;
    cost[tot]=c;
}
struct node {
    int x,w,dis;
    node(int a = 0, int b = 0, int c = 0) {
        x=a,w=b,dis=c;
    }inline bool operator<(const node& other)const {
        return dis>other.dis;
    }
};
priority_queue<node>q;
int dis[N][51];
inline int sqr(int x){return x*x;}
inline void dijkstra() {
    memset(dis,0x3f,sizeof(dis));
    dis[1][0]=0;
    q.push(node(1,0,0));
    while (!q.empty()) {
        node x=q.top();
        q.pop();
        if(x.dis>dis[x.x][x.w])continue;
        for (int i = d[x.x]; i; i = nxt[i]) {
            int u=to[i];
            if (!x.w) {
                if (dis[u][cost[i]] > dis[x.x][x.w]) {
                    dis[u][cost[i]]=dis[x.x][x.w];
                    q.push(node(u,cost[i],dis[u][cost[i]]));
                }
            }
            else {
                if (dis[u][0] > dis[x.x][x.w] + sqr(x.w + cost[i])) {
                    dis[u][0]=dis[x.x][x.w]+sqr(x.w+cost[i]);
                    q.push(node(u,0,dis[u][0]));
                }
            }
        }
    }
    for (int i = 1; i <= n; ++i) {
        if(dis[i][0]<=inf)printf("%d ",dis[i][0]);
        else printf("-1 ");
    }
}
int main() {
    scanf("%d%d",&n,&m);
    int u,v,w;
    for (int i = 1; i <= m; ++i) {
        scanf("%d%d%d",&u,&v,&w);
        ins(u,v,w);
        ins(v,u,w);
    }
    dijkstra();
    return 0;
}
```

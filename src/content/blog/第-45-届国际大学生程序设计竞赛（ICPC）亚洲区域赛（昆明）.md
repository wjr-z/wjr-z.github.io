---
title: "第 45 届国际大学生程序设计竞赛（ICPC）亚洲区域赛（昆明）"
date: 2021-04-03
updated: 2021-04-05
tags: ["ACM"]
section: "computer-contest"
---
战绩：

H、I、J、M、L

排名86，银牌

这一场 A 题就是在钓鱼…

题目名字叫AC ，通过率 2/515，幸亏没做

刚开始我也觉得是一道签到题，但是当我看到0/60的时候我就果断放弃了

### H.Hard Calculation

#### 题目大意：

昆明赛区2021年第一次举办ICPC，假设每年举办一次，问第x届是多少年？

#### 题解：

直接输出2020+x即可

### L.Simone and graph coloring

#### 题目大意：

T组，每一组给出n个数的排列$a\_1,a\_2…a\_n$，对于每个$ia\_j$有一条边，你现在要给每条点染上一种颜色$c\_i$，使得任意一条边的两个点颜色不同，并最小化不同颜色数，任意输出一种方案即可。

#### 题解：

$a\_i>a\_j$看着不太舒服

我们不妨将序列旋转过来（从尾到头）

对于一个点x，会与所有在他前面且小于他的连边，其中有一个是最长的链，不难发现我们让x的颜色为最长的链的长度即可

这样一定是最小的，且一定能满足题目要求

### I.Mr. Main and Windmills

#### 题目大意：

说不清楚，具体看原题吧

#### 题解：

枚举所有点对$(i,j)$，先判断是否和ST线段平行，平行则跳过

否则求出和ST的交点P，然后要判断P是否在线段上，如果不在则跳过

否则说明 P前和P后这两个点相对的 左/右 发生了改变

记$vector\\,v[N]$ ，其中$v[x]$代表 x 点所有得到的这样的点P，$v[i]$和$v[j]$都push\_back(P)即可

之后根据P到S的距离将对于每个$v[x]$排序即可

然后对于询问$h,k$

我们先看$v[h].size()$是否大于等于k

不是的话输出-1

否则输出$v[h][k-1]$即可

### J.Parallel Sort

#### 题目大意：

n个数的一个排列$a\_1,a\_2…a\_n$

每轮可以交换任意多次$i,j$位置上的数

但是每个位置$i$每轮最多被交换一次

问需要多少轮交换使得对于$\forall i,a\_i=i$

现在要最小化交换轮数，但对于交换次数没有要求

例如：

```c++
4
3 1 2 4 
```

我不能直接第一轮交换$(1,2)$变成$1,3,2,4$再交换$(2,3)$变成$(1,2,3,4)$

因为这样2交换了两次

最少需要两轮

第一轮：交换$(1,2)$变成$1,3,2,4$

第二轮：交换$(2,3)$变成$1,2,3,4$

#### 题解：

我们将所有$i$点与$a\_i$点连边，不难发现肯定能构成一个环

如果$a\_i=i$则说明不用交换

其余都是需要交换的情况

对于所有环最多只有两个点的情况，那么只需要最多一轮

对于有的环有大于两个点时，我们可以任意取环中任意一个点作为中心点，然后交换这个点左右两边第一个，左右两边第二个…直到让这个环变成若干个最多只有两个点的环

例：

对于任意多个点都可以这样子通过某个点将左右两边交换变成一个更小的环和一个点数为2的环

而且可以发现第$i$次交换的就是第一次选的中心点的左右两边$i$个（也可能有其他方法，但是本质一样的）

这样这题就做出来了

特判 m = 0 和 m = 1

然后对于 m = 2

我们对于每个点 dfs 找环，每个点最多被找到 1 次

找环时按照先后顺序将这些点记到数组

如果点数小于等于2 continue即可

否则我们以最后一个点（或者第一个点或者其他）为中心点，然后中心点左右两边第$1,2,…k$个交换即可

比如最后一个点为中心点时，假设总共k个数

那么是交换$(1,k-1),(2,k-2)…(i,k-i)(i<k-i)$

代码如下：

```c++
#include <bits/stdc++.h>
using namespace std;
int n;
const int N=1e5+10;
int a[N];
struct node {
    int l,r;
}b[N];
bool used[N];
int m;
int cnt,c[N];
void dfs(int x) {
    if(used[x])return;
    used[x]=true;
    c[++cnt]=x;
    dfs(a[x]);
}
int main() {
    scanf("%d",&n);
    for(int i=1;i<=n;++i)
        scanf("%d",&a[i]);
    bool f=true;
    for (int i = 1; i <= n; ++i) {
        if (a[i] != i) {
            f=false;
            break;
        }
    }
    if (f) {
        printf("0\n");
        return 0;
    }
    f=true;
    for (int i = 1; i <= n; ++i) {
        if (a[i] != i) {
            if (a[a[i]] != i) {
                f=false;
                break;
            }
        }
    }
    if (f) {
        printf("1\n");

        for (int i = 1; i <= n; ++i) {
            if(a[i]>i)
                ++m;
        }
        printf("%d ",m);
        for (int i = 1; i <= n; ++i) {
            if (a[i] > i) {
                printf("%d %d ",i,a[i]);
            }
        }
        return 0;
    }

    printf("2\n");
    for (int i = 1; i <= n; ++i) {
        cnt=0;
        dfs(i);
        if (cnt > 2) {
            for (int j = 1; j < cnt-j; ++j) {
                b[++m].l=c[j];
                b[m].r=c[cnt-j];
            }
        }
    }
    printf("%d ",m);
    for(int i=1;i<=m;++i)
        printf("%d %d ",b[i].l,b[i].r),swap(a[b[i].l],a[b[i].r]);
    m=0;
    for (int i = 1; i <= n; ++i) {
        if (a[i] > i)
            ++m;
    }
    printf("\n");
    printf("%d ", m);
    for (int i = 1; i <= n; ++i) {
        if (a[i] > i) {
            printf("%d %d ", i, a[i]);
        }
    }
    return 0;
}
```

### M.Stone Games

#### 题目大意：

给出一个n，给出一个长度为n的序列$a\_1,a\_2…a\_n$

每次询问给出一个$L,R$（强制在线了，需要自己转换下）

求出下标在$[L,R]$中最小的不能得到的非负整数（每个数可以选或者不选，这样能得出一个能得到的数的序列）

假设现在有 1 ，2 ，4 ，9

则可以得到的数是 0，1 , 2 , 3 , 4 , 5 , 6 , 7 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16

那么最小的不能得到的数是8

#### 题解：

一开始想了一堆乱七八糟的

后来想到初步正解

假设序列是从小到大排序好了的

那么我们顺着做

假设前i个数最大能得到的数是$A$，如果第i+1个数$P$小于等于$A+1$则前$i+1$个数最大能得到的数是$P+A$

否则的话后面的数都大于$A+1$了，则$A+1$永远不能得到

这样的话就变成了找到第一个$i$使得前$i$个数的和+1小于第$i+1$个数即可

因为不一定有序，所以我们选择用主席树将他变成有序

这样变成了求出一个区间内第一个i，使得前$i$个最小的数的和+1小于第$i+1$小的数即可

我一开始以为这个满足二分性质，但后来发现错了

之后我队友（tql)提到了一个方法

我之前是想着枚举第几个，这样复杂度肯定超了

但是如果是枚举$A$这样就不会超了

我们假设当前能得到的数最大是$A$（初始为0）

我们在区间求$\leq A+1$的和，将这个和作为新的$A$

如果这个和就是$A$那么break出来（因为找不到数能让他更大了）

然后是复杂度证明

我们假设当前是$A$，我们现在将$A$更新为所有$\leq A+1$的和

假设变为了$S$

则下一次的和为$S$+所有权值在$[A+2,S+1]$中的和 或者是break

因为下一次我们会更新为$\leq S+1$的和，而上次更新到了$\leq A+1$的和

没有算权值在$[A+2,S+1]$中的和，所以这次要加上这一部分的和

因为至少存在一个

则经过两次后$A$至少变为了$2*A$

那么这个复杂度是最多$log\_2 n$的

实际上呢完全跑不满！因为这是最极端情况

所以正解就是个while + 主席树

代码如下：

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=1e6+10;
const long long maxn=1e15;
int ch[N*70][2];
int cnt;
int rt[N];
int a[N];
long long s[N],sum[N*70];
void ins(int& las, int& now, long long L, long long R, long long pos) {
    now=++cnt;
    sum[now]=sum[las]+pos;
    if(L==R)return;
    long long mid=L+R>>1;
    if (pos <= mid) {
        ch[now][1]=ch[las][1];
        ins(ch[las][0],ch[now][0],L,mid,pos);
    }
    else {
        ch[now][0]=ch[las][0];
        ins(ch[las][1],ch[now][1],mid+1,R,pos);
    }
}
long long query(int& las, int& now, long long L, long long R, long long pos) {//区间第k小
    if (L == R)return sum[now] - sum[las];
    long long mid = L + R >> 1;
    if(pos<=mid)return query(ch[las][0],ch[now][0],L,mid,pos);
    else return sum[ch[now][0]]-sum[ch[las][0]]+query(ch[las][1],ch[now][1],mid+1,R,pos);
}
int n,k;
long long lastans;
inline int get(int x){return(x+lastans)%n+1; }
int main() {
    scanf("%d%d",&n,&k);
    for(int i=1;i<=n;++i)
        scanf("%d",&a[i]);
    for(int i=1;i<=n;++i)
        ins(rt[i-1],rt[i],1,maxn,a[i]),s[i]=s[i-1]+a[i];
    while (k--) {
        int L,R;
        scanf("%d%d",&L,&R);
        L=get(L),R=get(R);
        if(L>R)swap(L,R);
        long long r=0;
        while (1) {
            long long k = query(rt[L - 1], rt[R], 1, maxn, r+1);
            if(k<=r)break;
            else r=k;
        }
        printf("%lld\n",lastans=(r+1));
        lastans%=n;
    }
    return 0;
}
```

只用了 1400ms ，没有管常数啥的

### C. Cities

#### 题目大意：

有T组数据

每组给出n个数$a\_1,a\_2…a\_n(a\_i\leq n)$

每次可以将连续的相同的数并将他们变成任意数

问最小需要多少次可以将所有数变成相同的

#### 题解：

这题有一个非常重要的性质！

知道了这个性质，这题就是大水题了

对于任意一个区间$[L,R]$最优解一定包含了整个区间变成$a\_L$或者是$a\_R$的解

所以对于任意区间$[L,R]$，都可以看做是将其变为$a\_L$

下面证明此性质（给出了全部变成$a\_L$的证明，$a\_R$同理）：

对于**任意一个长度为1的区间**，很显然该性质成立

对于**任意一个长度为2的区间**，很显然也成立

对于**任意一个长度为$i$的区间$[L,R](L+i-1=R)$**：

我们假设$[L,R]$最优解是$[L,k]$和$[k+1,R]$的最优解合并

如果我们能证明任意长度为$k-L+1$和$R-k$的区间最优解包括全变成左端点的解

则可将问题简化为$a\_L$和$a\_{k+1}$合并，这样的话，很显然最优解也包括左端点的解

这样我们就能用归纳法证明对于**任意一个区间**，其最优解必定包括整个区间变为左端点的解（右端点同理）

定义$dp[L][R]$为$[L,R]$变为$a\_L$的最优解

答案统计就变为$dp[L][R]=min(dp[L][k-1]+dp[k][R]+(a\_k\neq a\_L))$

不过这个方法会超时，因此考虑进一步优化

发现题目有一个关键的条件，相同的数最多不超过15个

我们不妨对于$a\_k=a\_L$和$a\_k\neq a\_L$分别考虑：

-   $a\_k=a\_L$
    
    $dp[L][R]=min(dp[L][k-1]+dp[k][R])$即可
    
-   $a\_k\neq a\_L$
    
    $dp[L+1][R]+1\leq min(dp[L][k-1]+dp[k][R]+1)$
    
    证明：
    
    欲证明$dp[L+1][R]+1\leq min(dp[L][k-1]+dp[k][R]+1)$
    
    即证明$dp[L+1][R]\leq min(dp[L][k-1]+dp[k][R])$
    
    即证明$min(dp[L+1][k’-1]+dp[k’][R]+(a\_{k’}\neq a\_{L+1}))\leq min(dp[L][k-1]+dp[k][R])$
    
    即证明$min(dp[L][k’])$

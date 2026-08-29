---
title: "Codeforces Round#694 (Div. 2)"
date: 2021-01-14
updated: 2021-01-17
tags: ["cf比赛","贪心"]
section: "computer-contest"
---
[比赛链接](https://codeforces.ml/contest/1471)

## A.Strange Partition

[题目链接](https://codeforces.ml/contest/1471/problem/A)

题目描述：给定长度为n的数组，可以任意次合并相邻元素，假设合并后长度为k，求$\sum\_{i=1}^{k}{\lceil\frac{a\_i}{k}\rceil}$的最小值和最大值。

题解：  
简单的贪心。  
很显然，当不合并时最大，当所有的合并时最小，这是因为可以证明任意合并两个变成一个后一定不会比不合并的更大，因此得证。

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=1e5+10;
int T,n,x;
long long s1,s2;
int main(){
    scanf("%d",&T);
    while(T--){
        s1=s2=0;
        scanf("%d%d",&n,&x);
        int p;
        for(int i=1;i<=n;++i){
            scanf("%d",&p);
            if(p%x==0)
                s1+=p/x;
            else s1+=p/x+1;
            s2+=p;
        }
        if(s2%x==0)s2/=x;
        else s2=s2/x+1;
        printf("%lld %lld\n",s2,s1);
    }
    return 0;
}
```

## B.Strange List

[题目链接](https://codeforces.ml/contest/1471/problem/A)

题目描述：  
给定n个元素的数组，从左到右，假设当前元素是q，如果x可以整除q，则在数组末尾增加x个$\frac{q}{x}$，如果x不可以整除q，则停止。  
  
问最终所有元素的和。

题解：  
实际上如果q可以被x整除，则总和加上q，且如果$\frac{q}{x}$可以被x整除，总和仍然是加上q。  
因此就简单了，因为x至少为2，则每个数最多被加上$log\_{2}{n}$，这样纯模拟就行了，不过也可以稍作优化。  
即记下每个数最多可以整除x的多少次方，取所有中最小的，假设都能被$x^k$整除，则接下来只有模拟至多n次。  
复杂度就可以从$O(nlogn)$降低到$O(n)$

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=1e5+10;
int n,x;
int T;
int cnt[N],a[N];
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&n,&x);
        cnt[0]=1e9;
        for(int i=1;i<=n;++i){
            scanf("%d",&a[i]);
            int p=a[i];
            cnt[i]=1;
            while(p%x==0){
                ++cnt[i];
                p/=x;
            }
            cnt[i]=min(cnt[i],cnt[i-1]);
        }
        for(int i=1;i<=n;++i)
            cnt[i]=min(cnt[i],cnt[n]+1);
        long long ans=0;
        for(int i=1;i<=n;++i)
            ans+=a[i]*1ll*cnt[i];
        printf("%lld\n",ans);
    }
    return 0;
}
```

## C.Strange Birthday Party

[题目链接](https://codeforces.ml/contest/1471/problem/C)

题目描述：  
略。

题解：  
题目中有个很关键的条件，结果我半天没看到

考虑 ( i , j ) ，假设 i 选的是$c\_a$， j 选的是$c\_b$，且$b\geq a$，$a\leq k\_i,b\leq k\_j$  
  
$\because c\_1\leq c\_2\leq c\_3…\leq c\_n$  
  
1.当$b\leq k\_i$时，$c\_a+c\_b \leq c\_b+c\_a$，即交换后不变。  
  
2.当$b> k\_i$时，且$k\_i$内还有未选的时，将$c\_b$换成$k\_i$内未选的更优，此时情况转化为第一种。  
  
3.当$b> k\_i$时，且$k\_i$内已满时，将$c\_b$换成$c\_a$，将$c\_a$换成$c\_{k\_i}$更优。  
  
因此可以得到一个贪心策略，即序号大的优先选择较小的 c ，且必定从c的第一个开始连续取，否则总能变得更优。  
可能说的不是很清楚，看代码吧。

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=3e5+10;
int T,n,m;
int k[N];
int c[N];
inline bool cmp(int a,int b){return a>b;}
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&n,&m);
        for(int i=1;i<=n;++i)scanf("%d",&k[i]);
        for(int i=1;i<=m;++i)scanf("%d",&c[i]);
        sort(k+1,k+1+n,cmp);
        int fir=1;
        long long ans=0;
        for(int i=1;i<=n;++i){
            if(k[i]>=fir)
                ans+=c[fir++];
            else ans+=c[k[i]];
        }
        printf("%lld\n",ans);
    }
    return 0;
}
```

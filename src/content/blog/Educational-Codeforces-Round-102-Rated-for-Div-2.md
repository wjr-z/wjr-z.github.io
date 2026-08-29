---
title: "Educational Codeforces Round 102 (Rated for Div. 2)"
date: 2021-01-15
updated: 2021-01-17
tags: ["cf比赛"]
section: "computer-contest"
---
[比赛链接](https://codeforces.ml/contest/1473/)

## A.Replacing Elements

[题目链接](https://codeforces.ml/contest/1473/problem/A)  
题目描述：  
n个元素的数组，可以任取$(i,j,k)$，令 $a\_i=a\_j+a\_k$，问是否可以使得所有数小于等于给定的数d。

题解：  
很显然，将n个数从小到大排序后，所有$i\geq 3$的数均可被替换成$a\_1+a\_2$，则判断$a\_1+a\_2$是否小于等于d或者$a\_n$是否小于等于d即可。

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
int T,d;
const int N=105;
int a[N];
int main(){
    scanf("%d",&T);
    int n;
    while(T--){
        scanf("%d%d",&n,&d);
        for(int i=1;i<=n;++i)scanf("%d",&a[i]);
        sort(a+1,a+1+n);
        if(a[1]+a[2]<=d)printf("YES\n");
        else if(a[n]<=d)printf("YES\n");
        else printf("NO\n");
    }
    return 0;
}
```

## B.String LCM

[题目链接](https://codeforces.ml/contest/1473/problem/B)

题目描述：  
见原题。

题解：  
1.暴力。直接从大到小枚举gcd长度，并且暴力判断是否符合题意，假设gcd长度为l，第一个串长度为n,第二个为m，则将gcd字符串输出$\frac{n*m}{l*l}$次即可。  
  
2.某个引理。待填坑。

## C.No More Inversions

[题目链接](https://codeforces.ml/contest/1473/problem/C)

题目描述：  
逆序对定义为$ia\_j$。  
  
求出一个数组p，令b\[i\]=p\[a\[i\]\]，且要求b的逆序对数小于等于a的逆序对数，并且要最大化b的字典序。

题解：  
$\because a[k-i]=a[k+i]$  
  
$\therefore b[k-i]=b[k+i]$  
  
且a数组的逆序对数可以求出来，然后b数组关于k对称，b数组$2*k-n \sim n$的逆序对数也很容易求，即等于a的逆序对数，与p无关。  
因此b数组前$2*k-n-1$个数不能与任何数形成逆序对，且$2*k-n \sim n$可以任意排列，则前$2*k-n-1$个数从1开始从小到大排，$2*k-n\sim n$从n开始从大到小即可。

参考代码

```c++
#include <bits/stdc++.h>
int T;
const int N=2e5+10;
int a[N];
int n,k;
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&n,&k);
        for(int i=1;i<=2*k-n-1;++i){
            printf("%d ",i);
        }
        int Max=k;
        for(int i=2*k-n;i<=k;++i)
            printf("%d ",Max--);
        printf("\n");
    }
    return 0;
}
```

## D.Program

[题目链接](https://codeforces.ml/contest/1473/problem/D)

题目描述：  
初始x是0，给定长度为n的字符串，’+’表示x++，’-‘表示x—，给出m次询问\[L,R\]，忽略\[L,R\]，问x有多少种取值。  
例如： ++—+ 若忽略\[2,3\]则为+-+，x依次为0，1，0，1，共两个取值。

题解：  
x的值始终是连续的，则求出x的最大值和最小值即可，即前缀和的最大值和最小值。  
用重载运算符简化代码。

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=2e5+10,M=N<<1;
int ch[M][2];
struct node{
    int s,Min,Max;
    node(){
        s=Min=Max=0;
    }
};
node q[M];
inline node operator+(node a,node b){
    node c;
    c.Min=min(a.Min,a.s+b.Min);
    c.Max=max(a.Max,a.s+b.Max);
    c.s=a.s+b.s;
    return c;
}
int cnt;
int n,m,T;
char s[N];
#define lc ch[x][0]
#define rc ch[x][1]
inline void build(int &x,int L,int R){
    x=++cnt;
    if(L==R){
        int val=s[L]=='+'?1:-1;
        q[x].Min=min(val,0);
        q[x].Max=max(val,0);
        q[x].s=val;
        return;
    }int mid=L+R>>1;
    build(lc,L,mid);
    build(rc,mid+1,R);
    q[x]=q[lc]+q[rc];
}
inline node query(int x,int L,int R,int ll,int rr){
    if(ll<=L&&R<=rr)return q[x];
    int mid=L+R>>1;
    if(rr<=mid)return query(lc,L,mid,ll,rr);
    else if(ll>mid)return query(rc,mid+1,R,ll,rr);
    else return query(lc,L,mid,ll,rr)+query(rc,mid+1,R,ll,rr);
}
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&n,&m);
        scanf("%s",s+1);
        cnt=0;
        build(ch[0][0],1,n);
        while(m--){
            int L,R;
            scanf("%d%d",&L,&R);
            node x;
            if(L!=1){
                if(R!=n)x=query(1,1,n,1,L-1)+query(1,1,n,R+1,n);
                else x=query(1,1,n,1,L-1);
            }else
                if(R!=n)x=query(1,1,n,R+1,n);
            printf("%d\n",-x.Min+x.Max+1);
        }
    }
    return 0;
}
```

## E、F、G待填坑

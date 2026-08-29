---
title: "Problem Buyer"
date: 2021-06-12
updated: 2021-06-12
tags: ["贪心"]
section: "computer-contest"
---
### 题意：

给定 $n$个题目，每个题目有一个难度范围$[a\_i,b\_i]$。你需要举办一场$m$个题目的比赛，其中第$i$题难度应该是$c\_i$，若你选择的题目难度范围是$[A,B]且A\leq c\_i \leq B$，则可以作为第$i$题。现在你需要买给定的$n$题中的$k$题，但是买到的题目是随机的，求出能保证可以举办比赛的最小的$k$。

### 题解：

看着很像是点覆盖之类的，不过又是要求任意$k$题可以构成比赛，因此考虑贪心。

如果每道题的难度区间只会覆盖至多一个考题，设第$i$题被$d\_i$个区间覆盖。最坏情况是第$i$题外的每一道题对应区间都被选了，然后我们第$i$题随意来一题即可，枚举所有的$i$并取max，所以答案$ans=max\\{n-d\_i+1\\}$。

考虑一个区间可能覆盖多个点，那么我们将$c$从小到大排序，从左往右选择考题时，每次选出一题将符合这题的区间右端点最左的一道题去掉即可。可以证明，这样对于后面选择影响是最小的，会使得后面的$d\_i$尽可能小，使得答案尽可能大。

代码如下：

```c++
#include <bits/stdc++.h>
using namespace std;

priority_queue<int,vector<int>,greater<int>>q;

const int N=1e5+10;
struct node {
    int l,r;
    const bool operator<(const node& other)const {
        return l<other.l;
    }
}a[N];
int c[N];
int T,n,m;

int main() {
    scanf("%d",&T);
    for (int ii = 1; ii <= T; ++ii) {
        scanf("%d%d",&n,&m);
        for(int i=1;i<=n;++i)
            scanf("%d%d",&a[i].l,&a[i].r);
        for(int i=1;i<=m;++i)
            scanf("%d",&c[i]);
        sort(c+1,c+1+m);
        sort(a+1,a+1+n);
        while(!q.empty())q.pop();
        int ans=0;
        for (int i = 1,j=1; i <= m; ++i) {
            while(j<=n&&a[j].l<=c[i])
                q.push(a[j++].r);
            while(!q.empty()&&q.top()<c[i])q.pop();
            ans=max(ans,n-(int)q.size()+1);
            if(!q.empty())
                q.pop();
        }
        printf("Case #%d: ",ii);
        if(ans<=n)
            printf("%d\n",ans);
        else printf("IMPOSSIBLE!\n");
        
    }

    return 0;
}
```

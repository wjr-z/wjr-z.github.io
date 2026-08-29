---
title: "第十八届浙江省大学生程序设计大赛F. Fair Distribution"
date: 2021-04-26
updated: 2021-04-26
tags: ["思维题"]
section: "computer-contest"
---
#### 题目描述：

给定T组询问，每次给出一个n，m

每次你可以让n减一或者m加一

问使得m是n的倍数最小步数

#### 题解：

有趣的脑子题

我们枚举A，使得n变为A

让m变成kA

则有$k=\lceil\frac{m}{A}\rceil$

这是使得m变成kA最小的k

所以步数即为$n-A+\lceil\frac{m}{A}\rceil*A-m$

即$n-m+A*(\lceil\frac{m}{A}\rceil-1)$

我的写法是把A替换为k了（不替换的可以自己想怎么写，其实差不多）

因为$k=\lceil\frac{m}{A}\rceil$

所以$A=\lceil\frac{m}{k}\rceil$

然后变为$n-m+\lceil\frac{m}{k}\rceil*(k-1)$

这样的话对于相同的$\lceil\frac{m}{k}\rceil$只用求一个最小的k

然后这个的取值是$O(\sqrt{m})$的

就做完了

枚举不同的$\lceil\frac{m}{k}\rceil$可以用整除分块，不过其实二分也行的，跑的也还挺快

下面附上代码：

```c++
#include <bits/stdc++.h>
using namespace std;
int T;
int n,m;
inline int Floor(int n, int m) {
    return n/m+(n%m!=0);
}
int getMaxK(int k) {
    int L=k,R=m,mid,ans=L;
    while (L <= R) {
        mid=L+R>>1;
        if(Floor(m,mid)==Floor(m,k))ans=mid,L=mid+1;
        else R=mid-1;
    }return ans;
}
int main() {
    scanf("%d",&T);
    while (T--) {
        scanf("%d%d",&n,&m);
        int K=Floor(m,n);
        int ans=1e9;
        for (int k = K; k <= m; ++k) {
            ans=min(ans,Floor(m,k)*(k-1));
            k=getMaxK(k);
        }
        printf("%d\n",ans+n-m);
    }
    return 0;
}
```

是不是超简单！

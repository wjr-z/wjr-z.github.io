---
title: "Gym - 102433J Interstellar Travel"
date: 2021-08-13
updated: 2021-08-13
tags: ["模拟退火"]
section: "computer-contest"
---
### 题意：

给定$n$​个实数三元组$(t\_i,s\_i,a\_i)$​，选定一个$a$，使得$\sum\_{i=1}^{n}max(0,t\_i-s\_i*dist(a,a\_i))$最大，其中$dist(a\_i,a)=min(|a-a\_i|,2\pi-|a-a\_i| )$。

数据范围：$n\leq 10^5,0<t\leq 1000,0\leq s\_i\leq1000,0\leq a\_i<2*\pi$

### 题解：

可以不用分段的方法，使用模拟退火可做。

类似于[平衡点](https://www.luogu.org/problemnew/show/P1337)的做法

我们定义初始delta为$\pi$，每次加$delta*rd,rd\in[-1,1]$

每次使delta减少，例如每次乘0.99，当delta<1e-8时退出循环

此题不难想到一个贪心我们可以将所有的点表示为$(si*cos(a\_i),s\_i*sin(a\_i))$，并且将所有的向量加起来，其合向量的方向作为为我们的初始向量

代码如下

```c++
#include <bits/stdc++.h>
using namespace std;

const double PI=acos(-1);

const int N=1e5+10;

double T[N],s[N],a[N];
int n;

inline double dist(double angle1, double angle2) {
    double delta=fabs(angle1-angle2);
    return min(delta,2*PI-delta);
}

double calc(double angle) {
    double sum=0;
    for(int i=1;i<=n;++i)
        sum+=max(0.0,T[i]-s[i]*dist(a[i],angle));
    return sum;
}

#include <random>
mt19937 mt_rand(time(NULL));
uniform_real_distribution<double> rd(-1.0,1.0);

double maintain(double Angle) {
    if(Angle<0)Angle+=2*PI;
    else if(Angle>=2*PI)Angle-=2*PI;
    return Angle;
}

double initAngle() {
    double X=0,Y=0;
    for(int i=1;i<=n;++i)
        X+=cos(a[i])*s[i]/n,Y+=sin(a[i])*s[i]/n;
    return maintain(atan(Y/X));
}

const double eps=1e-8;

double solve() {
    double delta=PI;
    double angle=0;
    double ans=calc(angle);
    int step=0;
    while (delta>eps) {
        double RandAngle=maintain(angle+delta*rd(mt_rand));
        double RandAns=calc(RandAngle);
        if (RandAns > ans) {
            angle=RandAngle;
            ans=RandAns;
        }
        delta*=0.99;
    }
    return ans;
}

int main() {
    scanf("%d",&n);
    for(int i=1;i<=n;++i)
        scanf("%lf%lf%lf",&T[i],&s[i],&a[i]);
    solve();
    double ans=0;
    for(int i=0;i<5;++i)
        ans=max(ans,solve());
    printf("%.10f\n",ans);
    return 0;
}
```

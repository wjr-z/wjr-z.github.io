---
title: "2018-2019 ACM-ICPC EC Final I - Misunderstood … Missing"
date: 2021-04-10
updated: 2021-04-10
tags: ["ACM","模拟退火"]
section: "computer-contest"
---
这题正解是反着DP，不过我用模拟退火就过了。

因此分享下模拟退火做法

关于模拟退火的讲解可以看下[这一篇博客](https://www.cnblogs.com/flashhu/p/8884132.html)

这题的话实际上就是很基础的模拟退火应用了

我令$k[i]$代表第$i$次是哪个操作

每次随机找到一个$x$，将$k[x]$改为一个随机数$y$（$1\leq y\leq 3$）

然后如果更优直接修改，如果更劣，则有一定概率接受，具体概率见那篇博客。

然后这样其实不太保险，因为还是可能陷入局部最优解，注意到这题$n$很小，所以我们可以在外层继续套循环

如果我们一次掉入了局部最优解，我们下一次开始重新模拟退火，就有可能跳出该局部最优解，跑个几千次还在局部最优解的概率就很低了。

对了，随机化最好用$mt\_rand$，会快很多，并且更加随机。

```c++
#include <bits/stdc++.h>
#include <random>
using namespace std;
int T;
int n;
const int N = 105;
int a[N], b[N], c[N];
int k[N];
inline long long work() {
    long long A, D;
    A = D = 0;
    long long ans = 0;
    for (int i = 1; i <= n; ++i) {
        A += D;
        switch (k[i]) {
        case 1:ans += A + a[i]; break;
        case 2:D += b[i]; break;
        case 3:A += c[i]; break;
        default:break;
        }
    }
    return ans;
}
int ansk[N];
const double tmp = 0.99, e = 2.714;
double R[1000], temp[1000];
double qpow(double a, long long b) {
    double s = 1;
    while (b) {
        if (b & 1)s *= a;
        a *= a;
        b >>= 1;
    }return s;
}
unsigned int Maxd;
int main() {
    for (int i = 0; i < 32; ++i)
        Maxd |= (1u << i);
    mt19937 mt_rand(time(0));
    scanf("%d", &T);
    temp[1] = 1; R[1] = pow(e, 1);
    for (int i = 2; i <= 500; ++i) {
        temp[i] = temp[i - 1] * tmp;
        R[i] = pow(e, -1.0 / temp[i]);
    }
    while (T--) {
        scanf("%d", &n);
        for (int i = 1; i <= n; ++i)
            scanf("%d%d%d", &a[i], &b[i], &c[i]);
        for (int i = 1; i <= n; ++i)ansk[i] = k[i] = mt_rand() % 3 + 1;
        long long Mans = work();
        for (int kase = 1; kase <= 15 * n; ++kase) {
            long long ans = work();
            for (int Case = 1; Case <= 5 * n; ++Case) {
                int x = mt_rand() % n + 1;
                int y = mt_rand() % 3 + 1;
                int nowk = k[x];
                if(y==k[x])continue;
                k[x] = y;
                long long kans = work();
                if (kans >= ans)
                    ans = kans;
                else {
                    double zz = qpow(R[Case], ans - kans);
                    if (mt_rand() <= zz * Maxd) {
                        ans = kans;
                    }
                    else k[x] = nowk;
                }
            }
            if (ans > Mans)
                Mans = ans, memcpy(ansk, k, sizeof(k));
            else memcpy(k, ansk, sizeof(k));
        }

        printf("%lld\n", Mans);
    }
    return 0;
}
```

参数啥的都可以调调，如果求稳，就把循环调大点，如果速度慢了，求把循环调小点。

这个复杂度是$O(75*n^3)$

然后跑的还挺快，实际上把参数调小点，可以达到最快大概$O(12*n^3)$，不过就是正确率低了点。

这个代码正确率还挺高的。

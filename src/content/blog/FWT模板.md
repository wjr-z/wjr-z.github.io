---
title: "FWT模板"
date: 2021-03-30
updated: 2021-03-30
tags: ["FWT","快速沃尔什变换"]
section: "computer-contest"
---
## FWT（快速沃尔什变换）

可用于求解形如

$$

C[i\oplus j]=\sum_{i}\sum_{j}a[i]*b[j]

$$

的式子

其中运算符可以取 异或（^)，或（|），与（&）

证明在此省略，在此只给出封装过后的代码

```c++
namespace wjr {
    const int mod = 998244353, inv2 = 499122177, inf = 1 << 30;
    inline int mul(int a, int b) { return a * 1ll * b % mod; }
    inline int add(int a, int b) { return a += b, a >= mod ? a - mod : a; }
    inline int del(int a, int b) { return a -= b, a < 0 ? a + mod : a; }
    inline int qpow(int a, int b) { int s = 1; for (; b; b >>= 1, a = mul(a, a))if (b & 1)s = mul(s, a); return s; }
    template<typename T>
    inline T sqr(register T x) { return x * x; }
}using namespace wjr;
namespace FWT {
    const int N=1<<20;
    void maintain(int& n) {
        int q=1;
        while(q<n)
            q<<=1;
        n=q;
    }
    void FWT_and(int* a, int n, int p) {
        int step, s, i, j;
        for (step = 1, s = 2; step < n; step <<= 1, s <<= 1)
            for (i = 0; i < n; i += s)
                for (j = i; j < i + step; ++j)
                    a[j] = ~p ? add(a[j], a[j + step]) : del(a[j], a[j + step]);
    }void FWT_or(int* a, int n, int p) {
        int step, s, i, j;
        for (step = 1, s = 2; step < n; step <<= 1, s <<= 1)
            for (i = 0; i < n; i += s)
                for (j = i; j < i + step; ++j)
                    a[j + step] = ~p ? add(a[j + step], a[j]) : del(a[j + step], a[j]);
    }void FWT_xor(int* a, int n, int p) {
        int step, s, i, j, x;
        for (step = 1, s = 2; step < n; step <<= 1, s <<= 1)
            for (i = 0; i < n; i += s)
                for (j = i; j < i + step; ++j) {
                    x = a[j];
                    a[j] = add(a[j], a[j + step]);
                    a[j + step] = del(x, a[j + step]);
                    if (~p)continue;
                    a[j] = mul(a[j], inv2);
                    a[j + step] = mul(a[j + step], inv2);
                }
    }
    void FWTAND(int* a, int n,int* b,int m,int*c) {
        static int A[N],B[N];
        int len=max(n,m);
        maintain(len);
        memcpy(A,a,sizeof(int)*len);
        memcpy(B,b,sizeof(int)*len);
        FWT_and(A,len,1);
        FWT_and(B,len,1);
        for(int i=0;i<len;++i)
            A[i]=mul(A[i],B[i]);
        FWT_and(A,len,-1);
        len=max(n,m);
        for(int i=0;i<len;++i)
            c[i]=A[i];
    }
    void FWTOR(int* a, int n, int* b, int m, int* c) {
        static int A[N], B[N];
        int len = max(n, m);
        maintain(len);
        memcpy(A, a, sizeof(int) * len);
        memcpy(B, b, sizeof(int) * len);
        FWT_or(A, len, 1);
        FWT_or(B, len, 1);
        for (int i = 0; i < len; ++i)
            A[i] = mul(A[i], B[i]);
        FWT_or(A, len, -1);
        len = max(n, m);
        for (int i = 0; i < len; ++i)
            c[i] = A[i];
    }
    void FWTXOR(int* a, int n, int* b, int m, int* c) {
        static int A[N], B[N];
        int len = max(n, m);
        maintain(len);
        memcpy(A, a, sizeof(int) * len);
        memcpy(B, b, sizeof(int) * len);
        FWT_xor(A, len, 1);
        FWT_xor(B, len, 1);
        for (int i = 0; i < len; ++i)
            A[i] = mul(A[i], B[i]);
        FWT_xor(A, len, -1);
        len = max(n, m);
        for (int i = 0; i < len; ++i)
            c[i] = A[i];
    }
}
```

这是需要进行取模的代码，模数如有变动请修改参数 mod 以及 inv2 (inv2=(mod+1)>>1)

如果不需要取模的话请自行进行修改，inv2即除以2。

使用方法：

传入 a 数组及大小，b数组及大小，接受答案的数组 c

注意，需要初始化 a，b 数组

对于$len=2^k,len\geq n且2^{k-1}<n$，将a数组从第 n 位到 len-1 位置为0

对于b同理

这是因为快速变换等都只能跑2的整次幂，因此需要初始化（其实是我懒，没有封装初始化）。

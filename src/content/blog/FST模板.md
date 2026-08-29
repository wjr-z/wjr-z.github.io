---
title: "FST模板"
date: 2021-03-30
updated: 2021-03-30
tags: ["FST","快速子集变换"]
section: "computer-contest"
---
可用于求

$$

C[T]=\sum a[S]*b[T \oplus S]

$$

逻辑运算符为异或

也可以写成

$$

C[k]=\sum_{i\&j=0\i|j=k}a[i]*[j]

$$

如果只有 $i | j=k$

那么就是求

$$

C[i|j]=\sum a[i]*b[j]

$$

因为还有个$i\&j=0$的限制

所以还需要$ctz[i]+ctz[j]=ctz[k]$，其中$ctz[i]$表示i中1的个数

这样的话将原数组$a[1<<N]$拆成 $A[N][1< < N]$即可

$A[ctz[i]][i]=a[i]$初始化

然后再跑FWT即可

```c++
namespace wjr {
#define lb(x) x&-x
    int mod=1e9+9,inv2,inf=1e9+7;
    inline void initial() {
        inv2=(mod+1)>>1;
    }
    inline int mul(int a, int b) { return a * 1ll * b % mod; }
    inline int add(int a, int b) { return a += b, a >= mod ? a - mod : a; }
    inline int del(int a, int b) { return a -= b, a < 0 ? a + mod : a; }
    inline int qpow(int a, int b) { int s = 1; for (; b; b >>= 1, a = mul(a, a))if (b & 1)s = mul(s, a); return s; }
    template<typename T>
    inline T sqr(register T x) { return x * x; }
}using namespace wjr;
namespace FST {
    const int N=1<<20;
    int ctz[N];
    void initial() {
        ctz[0]=0;
        ctz[1]=1;
        for (int i = 2; i < N; ++i) {
            ctz[i]=ctz[i^(i&-i)]+1;
        }
    }
    void maintain(int& n) {
        int q = 1;
        while (q < n)
            q <<= 1;
        n = q;
    }void FWT_or(int* a, int n, int p) {
        int step, s, i, j;
        for (step = 1, s = 2; step < n; step <<= 1, s <<= 1)
            for (i = 0; i < n; i += s)
                for (j = i; j < i + step; ++j)
                    a[j + step] = ~p ? add(a[j + step], a[j]) : del(a[j + step], a[j]);
    }
    void FST(int* a, int n,int*b,int m,int*c) {
        static int A[21][1<<20],B[21][1<<20],C[21][1<<20];
        //没考虑初始化
        for(int i=0;i<n;++i)
            A[ctz[i]][i]=a[i];
        for(int i=0;i<m;++i)
            B[ctz[i]][i]=b[i];
        int len=max(n,m);
        maintain(len);
        int lim=0;
        while((1<<lim)<len)
            ++lim;

        for(int i=0;i<=lim;++i)
            FWT_or(A[i],len,1), FWT_or(B[i], len, 1);
        for (int i = 0; i <= lim; ++i) 
            for(int j=0;j<=i;++j)
                for (int k = 0; k < len; ++k) 
                    C[i][k]=add(C[i][k],mul(A[j][k],B[i-j][k]));
        for(int i=0;i<=lim;++i)
            FWT_or(C[i],len,-1);
        for(int i=0;i<(1<<lim);++i)
            c[i]=C[ctz[i]][i];
    }
}
```

答案即是$C[ctz[i]][i]$

我已经封装好了

传入数组a及大小，数组b及大小，以及接受答案的数组c即可

这是需要进行取模的代码，模数如有变动请修改参数 mod 以及 inv2 (inv2=(mod+1)>>1)

如果不需要取模的话请自行进行修改，inv2即除以2。

请自行初始化数组a和b！

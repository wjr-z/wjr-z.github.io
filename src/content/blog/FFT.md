---
title: "FFT学习"
date: 2021-01-18
updated: 2021-02-21
tags: ["FFT"]
section: "computer-contest"
---
## FFT定义

> FFT（Fast Fourier Transformation）是离散傅氏变换（DFT）的快速算法。即为快速傅氏变换。它是根据离散傅氏变换的奇、偶、虚、实等特性，对离散傅立叶变换的算法进行改进获得的。  
> (yysy这个定义看着乐呵就好)  

## FFT的用处

在算法竞赛中会碰到卷积形式的计数，或者说多项式乘法，但是常规的计算复杂度是$O(n^2)$的，当 n 比较大的时候，很显然不能满足我们的要求。  
而FFT将这个过程的复杂度降低到了$O(nlog n)$。

## 前置芝士

### 多项式

简单来说，形如$a\_0+a\_1 x+a\_2 x^{2}…+a\_n a^{n}$的代数表达式叫做多项式，可以记做$f(x)=a\_0+a\_1 x+a\_2 x^{2}…+a\_n a^{n}$

### 复数

复数形如$a+bi$，其中$i=\sqrt{-1},i*i=-1$  
  
a 叫做复数的实部， b 叫做复数的虚部。  
复数相乘：

$$

(a1+b1i)*(a2+b2i)=(a1*a2-b1*b2)+(a1*b2+a2*b1)i

$$

复数$c+di$可以用这种方式表示出来：  
  
复数乘法的在复平面中表现为**辐角相加，模长相乘**

### 单位根

复数 w 满足$w^n=1$，则称 w 是 n 次单位根，下图包含了所有的 8 次方根 （下图中圆的半径是1）  

n 次单位根用 $w\_n$ 表示  
  
关于单位根有如下性质：  
1.$w\_{2n}^{2}=w\_{n}$，因此有$w\_{2n}^{2m}=w\_{n}^{m}$  
  
2.$w\_{n}^{\frac{n}{2}}=-1$，因此有$w\_{2n}^{m}=-w\_{2n}^{m+\frac{n}{2}}$  
  
这两个很有用，一定要记住。

### 多项式的系数表示法

这是我们常用的表示方法，即$f(x)=a\_0+a\_1 x+a\_2 x^{2}…+a\_n a^{n}$的形式，称$A(X)$是多项式$f(x)$的系数表示法。  
  
这样多项式乘法是$O(n^2)$

### 多项式的点值表示法

即用 n+1 个点表示多项式，可以证明 n+1 个不同的点可以唯一确定一个 n 次多项式。  
其实就是相当于有 n+1 个方程求 n+1 个未知数（ n 次多项式最高此项是n，最多是 n+1 项）  
也可以将其理解为解系数矩阵。  
这样多项式乘法是$O(n)$，因为我们只需要两个多项式分别求出$O(n)$个点，然后相乘即可确定两个多项式相乘后的多项式。  

## FFT的具体过程

我们可以看到点值表示法多项式相乘是$O(n)$的，不过要转化为点值相乘却要$O(n^2)$，因此我们要想办法降低这些点值的复杂度。  
  
所以FFT即将系数表示法转化为点值表示法再转化回来，其中第一个过程叫 **求值(DFT)**，第二个过程叫 **插值(IDFT)**。

### 求值

还记得我们之前提到的单位根吗？回顾一下：

$$

\begin{aligned} &w_{2n}^{2m}=w_{n}^{m}\\ &w_{n}^{m}=-w_{n}^{m+\frac{n}{2}}\\ \end{aligned}

$$

设$A\_0(X)$为$A(X)$（这里设其为n次多项式，共n+1项，n+1为偶数）偶数项的和，设$A\_1(X)$为$A(X)$奇数项的和，即

$$

\begin{aligned} &A_0(X)=a_0+a_2X+...+a_{n-1}X^{\frac{n}{2}}\\ &A_1(X)=a_1+a_3X+...+a_{n}X^{\frac{n}{2}}\\ \end{aligned}

$$

因为$A(w\_{n}^{m})=a\_0w\_{n}^{0}+a\_1w\_n^{m}+a\_2w\_n^{2m}+…+a\_{n}w\_{n}^{nm}$  
  
将此多项式偶数项和奇数项分别提出来可以得到

$$

\begin{aligned} &a_0w_n^0+a_2w_n^{2m}+a_4w_n^{4m}+...+a_{n-1}w_n^{(n-1)m}\\ &a_1w_n^m+a_3w_n^{3m}+a_5w_n^{5m}+...+a_{n}w_n^{nm}\\ \end{aligned}

$$

根据之前的性质可以得出

$$

\begin{aligned} &A_0(w_{\frac{n}{2}}^{m})=A_0({w_n^{2m}})=a_0w_n^0+a_2w_n^{2m}+a_4w_n^{4m}+...+a_{n-1}w_n^{(n-1)m} \\ &A_1(w_{\frac{n}{2}}^{m})=A_1({w_n^{2m}})=a_1w_n^0+a_3w_n^{2m}+a_5w_n^{4m}+...+a_{n}w_n^{(n-1)m}\\ \end{aligned}

$$

因此有$A(w\_n^m)=A\_0(w\_{\frac{n}{2}}^m)+w\_n^m*A\_1(w\_{\frac{n}{2}}^m)$  

且有$A(w\_n^{m+\frac{n}{2}})=A\_0(w\_{\frac{n}{2}}^{m+\frac{n}{2}})+w\_{n}^{m+\frac{n}{2}}*A\_1(w\_{\frac{n}{2}}^{m+\frac{n}{2}})$  

$\because w\_{\frac{n}{2}}^{m+\frac{n}{2}}=w\_{\frac{n}{2}}^{m}，w\_{n}^{m+\frac{n}{2}}=-w\_{n}^{m}$  

$\therefore A(w\_n^{m+\frac{n}{2}})=A\_0(w\_{\frac{n}{2}}^{m})-w\_{n}^{m}*A\_1(w\_{\frac{n}{2}}^{m})$  

这样的话，只要知道了$A\_0(X)$和$A\_1(X)$的点值表示，就可以$O(n)$求出$A(X)$的点值表示。  
  
我们将 $2^k$ 次单位根看做是第 k 层，这样我们知道了第 k-1 层的点值表示，就可以推出第 k 层。  
  
假设$f(2^k)$是求$2^k$多项式的复杂度，则有$f(2^k)=2*f(2^{k-1})+2^k$，因此复杂度是$O(k*2^k)$，令$n=2^k$，即$O(n log n)$。

因为这个过程一定要求每层都可以分成两大小相等的部分，所以求的点值必须是$2^k(k\in N)$个，则最高次至多为$2^k-1$，项数至多为$2^k$，如果次数不够，可以将高次项设置为0。

于是我们就有了递归写法：  

```c++
void FFT(Complex* a,int len){
    if(len==1) return;
    Complex* a0=new Complex[len/2];
    Complex* a1=new Complex[len/2];
    for(int i=0;i<len;i+=2){
        a0[i/2]=a[i];
        a1[i/2]=a[i+1];
    }
    FFT(a0,len/2);FFT(a1,len/2);
    Complex wn(cos(2*Pi/len),sin(2*Pi/len));
    Complex w(1,0);
    for(int i=0;i<(len/2);i++){
        a[i]=a0[i]+w*a1[i];
        a[i+len/2]=a0[i]-w*a1[i];
        w=w*wn;
    }
    return;
}
```

  
但递归版的FFT常数巨大，实现起来比较复杂，于是又有了迭代的写法

重新考虑下递归FFT的过程，在第 i 次求解中，我们将所有元素二进制 i 位为 0 的放在了左面，i 位为 1 的放在了右面，事实上，每个元素最终到的是他二进制颠倒过来的位置  
例如：

000

001

010

011

100

101

110

111

000

010

100

110

001

011

101

111

000

100

001

101

010

110

011

111

000

001

010

011

100

101

110

111

这样子我们将原数组顺序替换成最下面之后就不用再像递归一样每次把原数组的偶数项放左边，奇数项放右边了。  
关于如何将二进制反转，其实也不难。  
假设有个数 x ，我们知道了 x>>1 反转后的数，那么 x 反转后的数和 x>>1 反转后的数就差最高位，而这个最高位是 x 的最低位反转后的，然后就很简单了。  

```c++
inline void get_rev(int s){
    int n=1<<s;
    for(int i=0;i<n;++i)
        rev[i]=(rev[i>>1]>>1)|((i&1)<<(s-1));
}
```

然后我们再看看非递归版该怎么向上合并。  
我们对应要求的$x$的值列出来

$w\_8^0$

$w\_8^1$

$w\_8^2$

$w\_8^3$

$w\_8^4$

$w\_8^5$

$w\_8^6$

$w\_8^7$

$w\_4^0$

$w\_4^1$

$w\_4^2$

$w\_4^3$

$w\_4^0$

$w\_4^1$

$w\_4^2$

$w\_4^3$

$w\_2^0$

$w\_2^1$

$w\_2^0$

$w\_2^1$

$w\_2^0$

$w\_2^1$

$w\_2^0$

$w\_2^1$

$w\_1^0$

$w\_1^0$

$w\_1^0$

$w\_1^0$

$w\_1^0$

$w\_1^0$

$w\_1^0$

$w\_1^0$

首先最下面一层，只用求一个点，这个点只用求$x=w\_{1}^{0}=1$的值即可，所以交换后的数组即为最下面一层的初始值。  
然后从最下面一层慢慢往上推就行了，可以通过手动模拟画图来找到递推的规律。  
迭代写法：

```c++
inline void DFT(Complex*a,int n){
    for(int i=0;i<n;++i)
        if(i<rev[i])//没这个条件的话，交换两次就会恢复原状
            swap(a[i],a[rev[i]]);
    for(int i=2,mid=1;i<=n;i<<=1,mid<<=1){
        Complex wn(cos(2*PI/i),sin(2*PI/i));
        for(int j=0;j<n;j+=i){
            Complex w(1,0);
            for(int k=j;k<j+mid;++k){
                Complex x=a[k],y=w*a[k+mid];
                a[k]=x+y,a[k+mid]=x-y;
                w=w*wn;
            }
        }
    }
}
```

### 插值

刚刚计算的是 $\vec y = DFT\_n(\vec a)$，可以将多项式转化成点值表示，现在为了将点值表示转化成系数表示，需要计算 IDFT（Inverse Discrete Fourier Transform），它是 DFT 的逆

这个问题实际上相当于是一个解线性方程组的问题，也就是给出了 $n$ 个线性方程 \\(\\begin{equation\*} \\left\\{ \\begin{array}{ccccccccc} a\_0(\\omega\_n^0)^{0}&+&\\cdots&+&a\_{n-2}(\\omega\_n^0)^{n-2}&+&+a\_{n-1}(\\omega\_n^0)^{n-1}&=&A(\\omega\_n^0) \\\\ a\_0(\\omega\_n^1)^{0}&+&\\cdots&+&a\_{n-2}(\\omega\_n^1)^{n-2}&+&+a\_{n-1}(\\omega\_n^1)^{n-1}&=&A(\\omega\_n^1) \\\\ \\vdots & & \\vdots & &\\vdots& & \\vdots & & \\vdots\\\\ a\_0(\\omega\_n^{n-1})^{0}&+&\\cdots&+&a\_{n-2}(\\omega\_n^{n-1})^{n-2}&+&+a\_{n-1}(\\omega\_n^{n-1})^{n-1}&=&A(\\omega\_n^{n-1}) \\end{array} \\right. \\end{equation\*}\\)

写成矩阵方程的形式就是

\\begin{equation} \\label{IDFT-equation} \\begin{bmatrix} (\\omega\_n^0)^0 & (\\omega\_n^0)^1 & \\cdots & (\\omega\_n^0)^{n-1} \\\\ (\\omega\_n^1)^0 & (\\omega\_n^1)^1 & \\cdots & (\\omega\_n^1)^{n-1} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ (\\omega\_n^{n-1})^0 & (\\omega\_n^{n-1})^1 & \\cdots & (\\omega\_n^{n-1})^{n-1} \\end{bmatrix} \\begin{bmatrix} a\_0 \\\\ a\_1 \\\\ \\vdots \\\\ a\_{n-1} \\end{bmatrix} = \\begin{bmatrix} A(\\omega\_n^0) \\\\ A(\\omega\_n^1) \\\\ \\vdots \\\\ A(\\omega\_n^{n-1}) \\end{bmatrix} \\end{equation}

记上面的系数矩阵为 $\mathbf V$ 现在考虑下面这个矩阵 $d\_{ij}=\omega\_n^{-ij}$

\\begin{equation} \\mathbf D = \\begin{bmatrix} (\\omega\_n^{-0})^0 & (\\omega\_n^{-0})^1 & \\cdots & (\\omega\_n^{-0})^{n-1} \\\\ (\\omega\_n^{-1})^0 & (\\omega\_n^{-1})^1 & \\cdots & (\\omega\_n^{-1})^{n-1} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ (\\omega\_n^{-(n-1)})^0 & (\\omega\_n^{-(n-1)})^1 & \\cdots & (\\omega\_n^{-(n-1)})^{n-1} \\end{bmatrix} \\end{equation}

设它们相乘后的结果是 $\mathbf E=\mathbf D \cdot \mathbf V$

\\begin{eqnarray} e\_{ij} &=& \\sum\_{k=0}^{n-1} d\_{ik} v\_{kj} \\\\ &=& \\sum\_{k=0}^{n-1} \\omega\_n^{-ik}\\omega\_n^{kj} \\\\ &=& \\sum\_{k=0}^{n-1} \\omega\_n^{k(j-i)} \\end{eqnarray}

当 $i=j$ 时，$e\_{ij}=n$

当 $i\neq j$ 时，

\\begin{eqnarray} e\_{ij} &=& \\sum\_{k=0}^{n-1} (\\omega\_n^{j-i})^k \\\\ &=& \\frac{1-(\\omega\_n^{j-i})^n}{1-\\omega\_n^{j-i}}\\\\ &=& 0 \\end{eqnarray}

因此可以知道 $\mathbf I\_n=\frac{1}{n}\mathbf E$，所以 $\frac{1}{n}\mathbf D = \mathbf V^{-1}$

将 $\frac{1}{n}\mathbf D$ 在 $\ref{IDFT-equation}$ 左乘就会得到

\\begin{equation} \\begin{bmatrix} a\_0 \\\\ a\_1 \\\\ \\vdots \\\\ a\_{n-1} \\end{bmatrix} = \\frac{1}{n} \\begin{bmatrix} (\\omega\_n^{-0})^0 & (\\omega\_n^{-0})^1 & \\cdots & (\\omega\_n^{-0})^{n-1} \\\\ (\\omega\_n^{-1})^0 & (\\omega\_n^{-1})^1 & \\cdots & (\\omega\_n^{-1})^{n-1} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ (\\omega\_n^{-(n-1)})^0 & (\\omega\_n^{-(n-1)})^1 & \\cdots & (\\omega\_n^{-(n-1)})^{n-1} \\end{bmatrix} \\begin{bmatrix} A(\\omega\_n^0) \\\\ A(\\omega\_n^1) \\\\ \\vdots \\\\ A(\\omega\_n^{n-1}) \\end{bmatrix} \\end{equation}

这样，IDFT 就相当于把 DFT 过程中的 $\omega\_n^i$ 换成 $\omega\_n^{-i}$，然后做一次 DFT，之后结果除以 $n$ 就可以了。

## 例题

### 洛谷P3803 多项式乘法模板题

[多项式乘法模板](https://www.luogu.com.cn/problem/P3803)  
多项式乘法还是有些细节需要注意：  
1.自带的complex速度不如手写一个Complex，推荐手写一个Complex，并重载运算符。  
2.注意数组开的大小。  
3.此题相乘后是最高次是 n+m 次，因此需要至少 n+m+1 个点值。  
4.因为精度可能出问题，因此最后需要四舍五入。

下面上代码

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
struct Complex{
    double x,y;//实部和虚部
    Complex(double a=0,double b=0){
        x=a;
        y=b;
    }
};
inline Complex operator+(Complex a,Complex b){return Complex(a.x+b.x,a.y+b.y);}
inline Complex operator-(Complex a,Complex b){return Complex(a.x-b.x,a.y-b.y);}
inline Complex operator*(Complex a,Complex b){return Complex(a.x*b.x-a.y*b.y,a.x*b.y+a.y*b.x);}
const int N=1<<21|1;
const double PI=acos(-1);
int rev[N];
inline void get_rev(int s){
    int n=1<<s;
    for(int i=0;i<n;++i)
        rev[i]=(rev[i>>1]>>1)|((i&1)<<(s-1));
}
inline void FFT(Complex*a,int n,int p){//p为1即DFT，p为-1即为IDFT
    for(int i=0;i<n;++i)
        if(i<rev[i])
            swap(a[i],a[rev[i]]);
    for(int i=2,mid=1;i<=n;i<<=1,mid<<=1){
        Complex wn(cos(2*PI/i),p*sin(2*PI/i));
        for(int j=0;j<n;j+=i){
            Complex w(1,0);
            for(int k=j;k<j+mid;++k){
                Complex x=a[k],y=w*a[k+mid];
                a[k]=x+y,a[k+mid]=x-y;
                w=w*wn;
            }
        }
    }
    if(p==-1)
        for(int i=0;i<n;++i)a[i].x/=n;
}int n,m;
Complex a[N],b[N];
int main(){
    scanf("%d%d",&n,&m);
    for(int i=0;i<=n;++i)scanf("%lf",&a[i].x);
    for(int i=0;i<=m;++i)scanf("%lf",&b[i].x);
    int len=n+m+1,s=1,bit=0;
    while(s<len)++bit,s<<=1;
    get_rev(bit);
    FFT(a,s,1),FFT(b,s,1);
    for(int i=0;i<s;++i)a[i]=a[i]*b[i];
    FFT(a,s,-1);
    for(int i=0;i<len;++i)
        printf("%d ",int(a[i].x+0.5));
    printf("\n");
    return 0;
}
```

### 牛客挑战赛47 E.路径

[点分治+FFT](https://ac.nowcoder.com/acm/contest/10743/E)  
[题解](/牛客挑战赛47E-路径/)

> 参考文章  
> [FFT算法讲解](https://blog.csdn.net/WADuan2/article/details/79529900)  
> [从多项式乘法到快速傅里叶变换](http://blog.miskcoo.com/2015/04/polynomial-multiplication-and-fast-fourier-transform#mjx-eqn-IDFT-equation)

第一篇讲的是针不戳，就是有些细节有点问题，本文已经处理过了（不保证修bug一定不出新bug qwq）

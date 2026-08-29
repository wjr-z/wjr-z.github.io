---
title: "codeforces Round 698(Div.2)"
date: 2021-01-29
updated: 2021-01-30
tags: ["cf比赛"]
section: "computer-contest"
---
## 前言

（其实是吐槽  
昨天比赛刚开始换了三次网，换了两次镜像网站才勉强能看到题…  
游戏体验极差，而且最后还掉了一点分。

## A.Nezzar and Colorful Balls

[题目链接](https://codeforces.ml/contest/1478/problem/A)

### 题目描述：

给定 n 个球，每个球上有一个数字 a ，现在为每个球染色，要使得相同颜色球上的数组 a 是严格递增的，且 a 数组是递增的，求最小颜色数。

### 题解：

其实即 a 数组中出现次数最多的次数。  
证明、代码略。

## B.Nezzar and Lucky Number

[题目链接](https://codeforces.ml/contest/1478/problem/B)

### 题目描述：

给定一个整数 $d(d\in[1,9])$ ，称一个数字为幸运数字当且仅当这个数字是正整数且至少有一位是 d ，给出 n 个数，对于每个数如果能由若干个幸运数字相加得到，则输出”YES”，否则输出”NO”。

### 题解：

我是真没想到这又是一场猜结论场…  
（是我很菜，所以不能及时推出结论…

-   若 $x \geq 10*d$ ，则一定是 YES  
      
    如果$x\in[10*d,11*d)$，则是 YES  
      
    如果$x\geq 11*d$，则减去若干个 d 后必定能得到$x’\in[10*d,11*d)$，则是 YES  
    
-   若 $x < 10* d$  
    此时暴力判断即可，最简单的判断方式就是 x 减去若干个 d ，判断个位是否为 0 ，因为十位可以任取所以可以不管，如果个位为 0 则一定可以。

参考代码如下：  

```c++
#include <bits/stdc++.h>
using namespace std;
int T;
int q,d;
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&q,&d);
        int x;
        for(int i=1;i<=q;++i){
            scanf("%d",&x);
            if(x>=10*d){
                printf("YES\n");
            }else{
                bool f=0;
                for(int j=1;j<=9;++j){
                    if(x>=j*d&&((x-j*d)%10==0)){
                        f=1;
                        break;
                    }
                }
                if(f)printf("YES\n");
                else printf("NO\n");
            }
        }
    }
    return 0;
}
```

## C.Nezzar and Symmetric Array

[题目链接](https://codeforces.ml/contest/1478/problem/C)

### 题目描述：

某数组有 2\*n 个互不相同的数，每个数都能在数组中找到一个相反数。  
令$d\_i=\sum\_{j=1}^{2n}|a\_i-a\_j|$，现在给了你数组 d ，试判断是否存在至少一种可能的原数组 a 。

### 题解：

前四题三个数学题…  
首先互不相同且能找出相反数，可以得到不能有 0 ，如果仅存在一个 0 ，则 必定有一个数在原数组中无相反数。  
然后我们将 a 数组从大到小排序，则前 n 个是正数，后 n 个是负数，并且因为从大到小排序，可以得到：

$$

d_{i}=(a_1-a_i)+(a_2-a_i)+...+(a_i-a_i)+(a_i-a_{i+1})+(a_i-a_{i+2})...+(a_i-a_{2n})

$$

然后根据相反数的条件，继续化简得到：

$$

\begin{aligned} d_{i}&=(a_1-a_i)+...+(a_i-a_i)+(a_i-a_{i+1})...+(a_i-a_{n})+(a_i+a_{n})+(a_i+a_{n-1})...+(a_i+a_1) \\ &=2(a_1+a_2+...+a_i)+(2n-2i)a_i \end{aligned}

$$

因为原数组从大到小排序了，则 d 应该是先递减后递增，且$d\_{i}=d\_{2*n-i+1}$  
  
为了方便，直接将 d 从小到大排序或者从大到小排序然后每两个判断下是否相同，即初步判断是否合法。  
然后根据上述的式子推出原数组即可，例如 $2n\*a\_1=d\_1$ ，然后后面的做差即可求出。  
我当时脑子有点乱，所以代码写的有点乱…  

```c++
#include <bits/stdc++.h>
using namespace std;
int T ;
int n;
 
const int N=2e5+10;
long long d[N],a[N];
int main(){
    scanf("%d",&T);
    while(T--){
        scanf("%d",&n);
        for(int i=1;i<=2*n;++i)
            scanf("%lld",&d[i]);
        sort(d+1,d+2*n+1);
        bool f=true;
        for(int i=1;i<=2*n;i+=2){
            if(d[i]!=d[i+1]){
                f=false;
                break;
            }
        }
        if(d[2*n]%(2*n)!=0||d[2*n]==0)f=false;
        if(!f){
            printf("NO\n");
            continue;
        }
        a[n]=d[2*n]/(2*n);
        for(int i=n-1;i>=1;--i){
            int j=n-i+1;
            long long p=(2*n-2*j+2)*a[i+1]+d[2*i]-d[2*(i+1)];
            if(p%(2*n-2*j+2)!=0){
                f=false;
                break;
            }
            a[i]=p/(2*n-2*j+2);
            if(!a[i]||a[i]==a[i+1]||a[i]<0){
                f=false;
                break;
            }
        }
        if(!f){
            printf("NO\n");
            continue;
        }else printf("YES\n");
    }
    return 0;
}
```

## D.Nezzar and Board

[题目链接](https://codeforces.ml/contest/1478/problem/D)

### 题目描述：

给出 n 个数，每次任选两个数 x , y ，并向数组中加一个数 2x - y ，问是否能得到 k

### 题解：

1.  若 n = 2 ，则可以得到的数是 x + k ( x - y ) ，即得到的数相差均为 ( x - y ) 的倍数，并且 x 和 y 均在得到的数中（这不是废话么
2.  若 n = 3 ，任意取一个前两个数能得到的数 o ，则可以得到所有和 o 相差 x - y 和 z - o （z为第三个数）的数，然后这些数相差最小为 gcd( x - y , z - o )，既可以得到所有和 o 相差 gcd( x - y , z - o )的数  
    然后 o 随便取都行，只要是前两个数能得到的数即可，反正最后不会影响 gcd 的取值
3.  n 无限制，即求出查分数组的 gcd ，然后判断 gcd 是否能整除 $k-a\_1$即可。

参考代码：  

```c++
#include <bits/stdc++.h>
using namespace std;
inline long long gcd(long long a,long long b){return !b?a:gcd(b,a%b);}
const int N=2e5+10;
long long a[N];
int main(){
    int T,n;
    long long k;
    scanf("%d",&T);
    while(T--){
        scanf("%d%lld",&n ,&k);
        for(int i=1;i<=n;++i)
            scanf("%lld",&a[i]);
        long long GCD=abs(a[2]-a[1]);
        for(int i=3;i<=n;++i)
            GCD=gcd(GCD,abs(a[i]-a[i-1]));
        if((k-a[1])%GCD==0)printf("YES\n");
        else printf("NO\n");
    }
    return 0;
}
```

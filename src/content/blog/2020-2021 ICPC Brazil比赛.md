---
title: "2020-2021 ICPC Brazil比赛"
date: 2020-12-10
updated: 2021-01-17
tags: ["ICPC"]
section: "computer-contest"
---
[题目链接](https://codeforces.ml/gym/102861)

## A.Sticker Album

题目描述：  
买卡包，每包里有卡片\[A,B\]张，获得每个卡片的概率都相同，问买多少卡包能组成N张卡片的期望。

题解：  
细节题。  
我们令dp\[i\]表示n-i张卡片所需卡包的期望值。（避免出现下标为负数）  
对于A!=0有  
$dp[i]=\frac{\sum\_{j=i+A}^{i+B}dp[j]}{R-L+1}+1$

对于A==0有  
$dp[i]=\frac{\sum\_{j=i}^{i+B}dp[j]+dp[i]}{p}+1$

化简可得  
$dp[i]=\frac{\sum\_{j=i}^{i+B}dp[j]+p}{p-1}$

然后就可以线性递推了。

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=2e6+10;
double dp[N];
//dp[i]表示n-i的期望卡包数量
int n,L,R;
int main(){
    scanf("%d%d%d",&n,&L,&R);
    double sum=0;
    double p=(double)(R-L+1);
    if(L){
        for(int i=n-1;i>=0;--i){
            dp[i]=sum/p+1;
            sum-=dp[i+R];
            sum+=dp[i+L-1];
        }printf("%.5f\n",dp[0]);
    }else{
        for(int i=n-1;i>=0;--i){
            dp[i]=(sum+p)/(p-1);
            sum-=dp[i+R];
            sum+=dp[i];
        }printf("%.5f\n",dp[0]);
    }
    return 0;
}
```

## B.Battleship

题目描述：  
给出若干个船的朝向和初始位置，且网格为10\*10，问初始位置是否合理。

题解：  
水题。直接模拟就行了，将每艘船占据的位置打上标记，以后每一艘进来判断是否已经存在即可。

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
int n;
bool f[12][12];
inline bool ck(int i,int j){
    if(i<1||i>10||j<1||j>10)return 0;
    if(f[i][j])return 0;
    return 1;
}
int main(){
    scanf("%d",&n);
    int D,R,C,L;
    bool g=1;
    for(int i=1;i<=n;++i){
        scanf("%d%d%d%d",&D,&L,&R,&C);
        if(!D){
            for(int j=1;j<=L;++j){
                if(!ck(R,C+j-1)){
                    g=0;
                    break;
                }f[R][C+j-1]=1;
            }
        }else{
            for(int j=1;j<=L;++j){
                if(!ck(R+j-1,C)){
                    g=0;
                    break;
                }f[R+j-1][C]=1;
            }
        }
    }if(g)printf("Y\n");
    else printf("N\n");
    return 0;
}
```

## C.Concatenating Teams

## D.Divisibility Dance

## E.Party Company

题目描述：  
题面什么东西，看半天没看懂

给定一棵树，每个点i有一个权值$a_i$，现有m次派对$(O_j,L_j,R_j)$，第j次参加派对的为含O的连通块，且连通块内所有点权值在$[L,R]$之间(数据保证$L_j \leq a_{O_j} \leq R_j$)

## F.Fastminton

## G.Game Show!

题目描述：  
给了你100块钱和n个a\[i\]，你可以拿前面连续的若干个，问最后最多你还有多少钱。

题解：  
水题。找出最大的前缀和即可。

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=105;
int a[N];
int n;
int main(){
    scanf("%d",&n);
    for(int i=1;i<=n;++i)
        scanf("%d",&a[i]);
    for(int i=1;i<=n;++i)
        a[i]+=a[i-1];
    int ans=100;
    for(int i=1;i<=n;++i)
        ans=max(ans,a[i]+100);
    printf("%d\n",ans);
    return 0;
}
```

## H.SBC’s Hangar

## I.Interactivity

## J.Collecting Data

## K.Between Us

## L.Lavaspar

题目描述：  
给你L\*C(我用的n\*m表示的)的图，每个点有一个字符，给定N个字符串，可以横着、竖着、斜着在图上匹配，只要每个字符出现次数相同即可，问有多少个点可以匹配至少两个字符串。  
  
例如上图，每种颜色框表示不同字符串匹配，黄色代表的是特殊位置即他们至少能匹配两个字符串。

题解：  
水题。每个字符串找出所有和他匹配的所有点，然后更新每个点可以匹配字符串数目即可。

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
const int N=45;
int cnt[N][N],now_cnt[N][N];
int n,m;
int Q;
int py[4][2]={{-1,1},{0,1},{1,1},{1,0}};
char s[N][N],p[N];
int c[30],d[30];
inline bool ck(int i,int j){
    if(i<1||j<1||i>n||j>m)return 0;
    return 1;
}
int main(){
    scanf("%d%d",&n,&m);
    for(int i=1;i<=n;++i)
        scanf("%s",s[i]+1);
    scanf("%d",&Q);
    while(Q--){
        scanf("%s",p+1);
        int K=strlen(p+1);
        memset(d,0,sizeof(d));
        for(int i=1;i<=K;++i)
            ++d[p[i]-'A'];
        memset(now_cnt,0,sizeof(now_cnt));
        for(int i=1;i<=n;++i)
            for(int j=1;j<=m;++j){
                for(int k=0;k<4;++k){
                    int x=i,y=j;
                    bool is=1;
                    memcpy(c,d,sizeof(c));
                    for(int step=1;step<=K;++step){
                        if(!ck(x,y)){
                            is=0;
                            break;
                        }
                        if(--c[s[x][y]-'A']<0){
                            is=0;
                            break;
                        }
                        x+=py[k][0],y+=py[k][1];
                    }
                    if(is){
                        x=i,y=j;
                        for(int step=1;step<=K;++step){
                            ++now_cnt[x][y];
                            x+=py[k][0],y+=py[k][1];
                        }
                    }
                }
            }
        for(int i=1;i<=n;++i)
            for(int j=1;j<=m;++j)
                cnt[i][j]+=now_cnt[i][j]>=1;
    }int ans=0;
    for(int i=1;i<=n;++i)
        for(int j=1;j<=m;++j)
            ans+=cnt[i][j]>=2;
    printf("%d\n",ans);
    return 0;
}
```

## M.Machine Gun

## N.Number Multiplication

题目描述：  
数学题，自己看描述吧。

题解：  
因为a是递增的，且我们知道对于$n$最多只存在一个$\sqrt{n}$以上的质因数，因此这题就好做了。

我们找到第一个满足条件的质数a\[i\]即可开始找a\[i+1\]，因为如果存在多种满足条件的a\[i\]，我们只能选择最小的一个，否则最后肯定不满足条件，因为a数组是递增的，如果当前不取最小的，则后面都无法取到。

且我们对于一个质数只用判断一个相连的b\[j\]是否满足即可，如果我们当前不选prime，则后面无论怎么选都无法满足条件(b\[j\]总会剩下若干个prime的乘积)。

然后对于大于$10^{7.5}$的a\[i\]直接令他等于与他相连的b\[j\]即可，因为最多只存在一个嘛，上面说了的。

参考代码

```c++
#include <bits/stdc++.h>
using namespace std;
int n,m,K;
const int N=1e3+10,M=1e4+10;
long long b[N],a[N];
struct node{
    int index,d;
    node(int a=0,int b=0){index=a,d=b;}
    inline bool operator<(const node&other)const{
        return index<other.index;
    }
};
vector<node>q[N];
inline long long qpow(long long a,int b){
    long long s=1;
    while(b){
        if(b&1)s*=a;
        a*=a;
        b>>=1;
    }return s;
}
const int Max=sqrt(1e15)+1;
int main(){
    scanf("%d%d%d",&n,&m,&K);
    for(int i=1;i<=m;++i)
        scanf("%lld",&b[i]);
    int u,v,d;
    for(int i=1;i<=K;++i){
        scanf("%d%d%d",&u,&v,&d);
        q[u].push_back(node(v,d));
    }
    long long Min_pr=1;
    int i;
    for(i=1;i<=n;++i){
        int c=q[i].size();
        for(++Min_pr;Min_pr<=Max;++Min_pr){
            bool g=1;
            for(int j=0;j<1;++j){
                node now=q[i][j];
                if(b[now.index]%qpow(Min_pr,now.d))
                    g=0;
            }
            if(g){
                a[i]=Min_pr;
                for(int j=0;j<c;++j){
                    node now=q[i][j];
                    b[now.index]/=qpow(Min_pr,now.d);
                }
                break;
            }
        }
        if(Min_pr>Max)break;
    }
    for(;i<=n;++i)
        a[i]=b[q[i][0].index];
    for(int i=1;i<=n;++i)
        printf("%lld ",a[i]);
    printf("\n");
    return 0;

}
```

## O.Venusian Shuttle

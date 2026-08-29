---
title: "最小斯坦纳树学习"
date: 2021-01-16
updated: 2021-02-21
tags: ["最小斯坦纳树"]
section: "computer-contest"
---
> 转载自:[https://www.cnblogs.com/sqrtyz/p/13427868.html](https://www.cnblogs.com/sqrtyz/p/13427868.html)

## 定义

> 摘自百度百科的定义：  
> 斯坦纳树问题是组合优化问题，与 最小生成树相似 ，是最短网络的一种。最小生成树是在给定的点集和边中寻求最短网络使所有点连通。而最小斯坦纳树允许在给定点外增加额外的点，使生成的最短网络开销最小。

可以这么理解：一个图的生成树是构造一棵树把所有点给联通，而斯坦纳树则是构造一棵树把给定的几个点联通。如同生成树有最小的一棵，斯坦纳树也有最小的。如何求最小斯坦纳树，是我们今天要探讨的话题。

## 实现

-   例题：[Luogu P6192【模板】最小斯坦纳树](https://www.luogu.com.cn/problem/P6192)

> 给定一个包含 $n$ 个结点和 $m$ 条带权边的无向连通图 $G=(V,E)$。  
>   
> 再给定包含 $k$ 个结点的点集 $S$，选出 $G$ 的子图 $G'=(V',E')$，使得：  
> 
> 1.  $S\subseteq V'$；  
>     
> 2.  $G'$ 为连通图；  
>     
> 3.  $E'$ 中所有边的权值和最小。  
>       
>     你只需要求出 $E'$ 中所有边的权值和。</div>  
>     

求最小斯坦纳树，我们使用的是 **状压DP**。

首先非常显然的是，这个选出来的子图 \\(G'\\) 一定是个树。

令 \\(f\_{i,S}\\) 表示当前这个树的根为 \\(i\\)，选出的点的集合为 \\(S\\)（注意这里选出的点专指那 \\(k\\) 个点中的点），这里的 \\(S\\) 在 dp 中是被状压的。

-   第一种转移方式：

\\\[f\_{i,S} = f\_{i,T} + f\_{i,S-T} \\ \\ \\ (T \\subseteq S) \\\]

这种转移方式意义在于把一个根可能会连出多棵 \\(S\\) 互不相交的树，该方程可以合并它们。此时这个根的度数 \\(\\geq 1\\)。以下是一个示意图，其中 \\(5,6,7\\) 三个点属于目标的那 \\(k\\) 个点，\\(3\\) 是目前的 \\(i\\)。

-   第二种转移方式：

\\\[f\_{i,S} = f\_{j,S} + w(i,j) \\\]

这种转移方式意义在于把一个根的状态转移到与他相邻的一个根上。此时根 \\(i\\) 的度数 \\(=1\\)。示意图如下，其中 \\(i = 1，j=3\\)，\\(S=\\{5,6\\}\\)，橙色虚线代表待扩展的边 \\((i,j)\\)。

考虑 dp 顺序，显然 \\(S\\) 从小到大枚举即可。

对于第一种转移方式，只需枚举 \\(S\\) 的子集 \\(T\\)。对于第二种转移方式，注意到这玩意儿是个 **三角不等式**，联想到最短路也是如此——没错，用最短路跑一遍就行了。

### 参考代码

```c++
int n, m, k, f[Maxn][1 << Maxk];

struct Edge {
    int next, to, dis;
}
edge[Maxm * 2];
int head[Maxn], edge_num;

void add_edge(int from, int to, int dis) {
    edge[++edge_num].next = head[from];
    edge[edge_num].to = to;
    edge[edge_num].dis = dis;
    head[from] = edge_num;
}

queue <int> Q; int dist[Maxn]; bool inq[Maxn];
void SPFA(int S) {
    memset(inq, 0, sizeof(inq));
    for(int i = 1; i <= n; ++i) {
        dist[i] = f[i][S];
        if(dist[i] != 1061109567) Q.push(i), inq[i] = 1;
    }
    while(Q.size()) {
        int u = Q.front();
        Q.pop();
        inq[u] = 0;
        for(int i = head[u]; i; i = edge[i].next) {
            int v = edge[i].to;
            if(dist[v] > dist[u] + edge[i].dis) {
                dist[v] = dist[u] + edge[i].dis;
                if(!inq[v]) {
                    inq[v] = 1;
                    Q.push(v);
                }
            }
        }
    }
    for(int i = 1; i <= n; ++i) f[i][S] = dist[i];
}

int main() {
    n = read(); m = read(); k = read();
    int u, v, w;
    for(int i = 1; i <= m; ++i) {
        u = read(); v = read(); w = read();
        add_edge(u, v, w);
        add_edge(v, u, w);
    }
    memset(f, 63, sizeof(f));
    for(int i = 1; i <= k; ++i) {
        u = read();
        f[u][1 << (i - 1)] = 0;
    }
    for(int i = 1; i <= n; ++i) f[i][0] = 0;
    for(int S = 0; S < (1 << k); ++S) {
        for(int i = 1; i <= n; ++i)
            for(int T = S & (S - 1); T; T = S & (T - 1))
                f[i][S] = min(f[i][S], f[i][T] + f[i][T ^ S]);
        SPFA(S);
    }
    int ans = 2e9;
    for(int i = 1; i <= n; ++i) ans = min(ans, f[i][(1 << k) - 1]);
    cout << ans << endl;
    return 0;
}
```

### 例题

-   \[WC2008\] 游览计划

考虑把每个方格当成一个点，最小斯坦纳树搞它就完了。

需要注意的是，由于这道题从边权变成了点权，因此需要把第一种转移方式改成

\\\[f\_{i,S} = f\_{i,T} + f\_{i,S-T} - w\_i\\ \\ \\ (T \\subseteq S) \\\]

原因显然，因为合并状态时 \\(i\\) 的点权被算了两次，需要减去一次。

另外，这道题需要输出方案。一个解决方法是记录前驱、回溯解决。怎么 dp 过来，就怎么找回去，如果某个状态和上个状态满足 dp 方程，说明这个状态是从上个状态转移过来的，从而可以计算出哪些点是选了的。具体请参见代码的 dfs 部分。

代码：

  

```c++
int w, h, n, cnt, root, val[Maxn], dp[Maxn][1 << Maxk], pre[Maxn][1 << Maxk];
struct Edge {
    int next, to;
}
edge[Maxm];
int head[Maxn], edge_num;

inline void add_edge(int from, int to) {
    edge[++edge_num].next = head[from];
    edge[edge_num].to = to;
    head[from] = edge_num;
}

inline int f(int i, int j) {
    return h * (i - 1) + j;
}

queue <int> Q; bool inq[Maxn];
void SPFA(int S) {
    for(int i = 1; i <= n; ++i) if(dp[i][S] != 1061109567) Q.push(i), inq[i] = 1;
    while(Q.size()) {
        int u = Q.front();
        Q.pop();
        inq[u] = 0;
        for(rg int i = head[u]; i; i = edge[i].next) {
            int v = edge[i].to;
            if(dp[v][S] > dp[u][S] + val[v]) {
                dp[v][S] = dp[u][S] + val[v];
                pre[v][S] = u;
                if(!inq[v]) inq[v] = 1, Q.push(v);
            }
        }
    }
}

bool ans[Maxn], vis[Maxn][1 << Maxk];
void dfs(int u, int S) {
    if(!S || vis[u][S]) return;
    vis[u][S] = 1;
    if(pre[u][S] && dp[pre[u][S]][S] + val[u] == dp[u][S]) dfs(pre[u][S], S), ans[u] = 1;
    for(rg int T = S & (S - 1); T; T = S & (T - 1))
        if(dp[u][T] + dp[u][S ^ T] - val[u] == dp[u][S]) dfs(u, T), dfs(u, S ^ T);
}

int main() {
    w = read(); h = read(); n = w * h;
    for(rg int i = 1; i <= w; ++i)
        for(rg int j = 1; j <= h; ++j) {
            val[f(i, j)] = read();
            if(i > 1) add_edge(f(i, j), f(i - 1, j));
            if(j > 1) add_edge(f(i, j), f(i, j - 1));
            if(i < w) add_edge(f(i, j), f(i + 1, j));
            if(j < h) add_edge(f(i, j), f(i, j + 1));
        }
    memset(dp, 63, sizeof(dp));
    for(rg int i = 1; i <= n; ++i) {
        if(!val[i]) dp[i][1 << (cnt++)] = 0, root = i;
        dp[i][0] = 0;
    }
    for(rg int S = 0; S < (1 << cnt); ++S) {
        for(rg int i = 1; i <= n; ++i)
            for(rg int T = S & (S - 1); T; T = S & (T - 1))
                dp[i][S] = min(dp[i][S], dp[i][T] + dp[i][S ^ T] - val[i]);
        SPFA(S);
    }
    dfs(root, (1 << cnt) - 1);
    cout << dp[root][(1 << cnt) - 1] << endl;
    for(rg int i = 1; i <= w; ++i) {
        for(rg int j = 1; j <= h; ++j) {
            int pos = f(i, j);
            if(!val[pos]) printf("x");
            else if(ans[pos]) printf("o");
            else printf("_");
        }
        printf("\n");
    }
    return 0;
}
```

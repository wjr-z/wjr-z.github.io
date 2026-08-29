---
title: "2020 ICPC Asia East Continent Final J.Circle 题解"
date: 2021-07-10
updated: 2021-08-04
tags: ["计算几何"]
section: "computer-contest"
---
### 题意：

给出$n$个半径相同的圆，求出$n$个圆的公共面积。

### 题解：

将每个圆按照相同方法近似成正$C$边形，然后对于$C*n$条边进行半平面交，但很显然这样做$C$取大了会TLE，取小了会精度不够WA。

我们取三角形上$C$个点，这$C$个点均匀分布，第$i$个点$P\_i$为$(r*cos(\frac{2*\pi*i}{C}), r * sin (\frac{2*\pi*i}{C})) , i\in [0,C)$，第$i$条线段即$\vec{p_{i}p_{i+1}},i\in [0,C)$

这样对于每个圆上的第$i$条线段其极角相同，对于极角相同且直线也重合的两个圆，可以推出这条线段对于答案没有贡献（画个图很容易看出），可以不用考虑。

则对于$n$个圆上的第$i$条线段，因为极角均相同，实际上只有一个圆的第$i$条线段可以对答案产生贡献。

因此实际上$n$个圆总共只用取出$C$条线段均可。

假设有一条线段是$(0,1)$，那么这条线段很显然是圆心坐标最小的圆的最右侧最优，如果是$(0,-1)$，是圆心左边最大的圆的左侧最优。

题目还好心的给了我们圆心的凸包，因为半径相同，所以可以将问题转化为比较圆心的相对位置（如果半径不同，则比较麻烦，但我感觉还是可以用数据结构进行查找）

第一条线段我们先找到一个圆心坐标最小的圆$t$，我们设$vec=\vec{O\_{t+1}O{t}}$，如果$\vec{p\_{i}p\_{i+1}}$在$vec$左侧，说明下一个圆更优，直到找到一个最优的圆。就有点像是旋转卡壳。可以画两个圆理解一下，其实很简单。

然后就可以半平面交求面积了。

不过因为我们用了线段去切圆，所以最后需要加一些弓形面积进行矫正，可以直接求出答案多边形边数乘以每一个小弓形面积（均相同）或者对于答案凸包的每条线段求出小弓形面积（不一定相同），$C$取4000就可以过这题。

不过这题因为可能出现测试点很多，$n$很小的情况，此时固定取点并不太好，可以使用暴力。

代码如下：

```c++
#include <bits/stdc++.h>
using namespace std;
double r;
const double pi = acos(-1.0);
const int C = 4000;
struct vec {
    double x, y;
    vec() {}
    vec(double a, double b) { x = a, y = b; }
    double len() { return sqrt(dot(*this, *this)); }
    friend double dot(vec a, vec b) { return a.x * b.x + a.y * b.y; }
    vec rotate(double a) {
        return vec(x * cos(a) - y * sin(a), x * sin(a) + y * cos(a));
    }
    vec operator-(vec a) { return vec(x - a.x, y - a.y); }
    vec operator+(vec a) { return vec(x + a.x, y + a.y); }
    vec operator*(double a) { return vec(x * a, y * a); }
    vec operator/(double a) { return vec(x / a, y / a); }
    double ang() { return atan2(y, x); }
    friend double cross(vec a, vec b) { return a.x * b.y - a.y * b.x; }
} p[C + 10];
 
struct line {
    vec s, e;
    double ang;
    line() {}
    line(vec a, vec b) { s = a, e = b; }
    friend vec inter(line a, line b) {  // 直线交点解方程
        double s1 = cross(a.e - b.s, a.s - b.s);
        double s2 = cross(b.e - a.e, a.s - a.e);
        return (b.s * s2 + b.e * s1) / (s1 + s2);
    }
    friend bool cut(line a, line b, line c) {  // 若ab交点在c右侧则删除
        return cross(c.e - c.s, inter(a, b) - c.s) <= 0;
    }
} l[C + 10];
 
int n;
int nxt(int x) { return (x + 1) % n; }
 
int half_plane(line* l, vec* p, int n) {
    int len = n;
    int head = 0, tail = 1;
    for (int i = 2; i < len; i++) {
        while (head < tail && cut(l[tail - 1], l[tail], l[i]))
            tail--;  // i对上一个的影响
        while (head < tail && cut(l[head], l[head + 1], l[i]))
            head++;  // i对第一个的影响
        l[++tail] = l[i];
    }
    while (head < tail && cut(l[tail - 1], l[tail], l[head]))
        tail--;  //删除最后多加的边
    l[++tail] = l[head];
    for (int i = 0; i < tail - head; i++) {
        p[i] = inter(l[head + i], l[head + i + 1]);
    }
    return tail - head;
}
 
double size(vec* p, int n) {  //多边形边面积s
    if (n < 3) return 0;
    double ans = 0;
    p[n] = p[0], p[n + 1] = p[1];
    for (int i = 0; i < n; i++) ans += p[i + 1].y * (p[i].x - p[i + 2].x);
    return fabs(ans / 2);
}

//这下面是暴力
 
const double eps = 1e-8;
const int MOD = 100000007;
const int MAXN = 1000010;
const double PI = acos(-1.0);
template <typename Ty>
inline Ty sqr(const Ty& x) {
    return x * x;
}
const int N = 1010;
double area[N];
double R;
int dcmp(double x) {
    if (x < -eps)
        return -1;
    else
        return x > eps;
}
 
int read() {
    int x = 0;
    bool f = true;
    char c = getchar();
    while (c < '0' || c > '9') {
        if (c == '-') f = false;
        c = getchar();
    }
    while (c >= '0' && c <= '9') {
        x = (x << 1) + (x << 3) + (c - '0');
        c = getchar();
    }
    return f ? x : -x;
}
 
struct cp {
    double x, y, r, angle;
    int d;
    cp() {}
    cp(const double& xx, const double& yy, const double& ang = 0, int t = 0) {
        x = xx;
        y = yy;
        angle = ang;
        d = t;
    }
    void get() {
        x = read();
        y = read();
 
        r = R;
        d = 1;
    }
} cir[N], tp[N * 2];
double dis(const cp& a, const cp& b) {
    return sqrt(sqr(a.x - b.x) + sqr(a.y - b.y));
}
double cross(const cp& p0, const cp& p1, const cp& p2) {
    return (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
}
int CirCrossCir(const cp& p1, const double& r1, const cp& p2, const double& r2,
                cp& cp1, cp& cp2) {
    double mx = p2.x - p1.x, sx = p2.x + p1.x, mx2 = mx * mx;
    double my = p2.y - p1.y, sy = p2.y + p1.y, my2 = my * my;
    double sq = mx2 + my2, d = -(sq - sqr(r1 - r2)) * (sq - sqr(r1 + r2));
    if (d + eps < 0) return 0;
 
    d = d < eps ? 0 : sqrt(d);
 
    double x = mx * ((r1 + r2) * (r1 - r2) + mx * sx) + sx * my2;
    double y = my * ((r1 + r2) * (r1 - r2) + my * sy) + sy * mx2;
    double dx = mx * d, dy = my * d;
    sq *= 2;
    double g = 1.0 / sq;
    cp1.x = (x - dy) * g;
    cp1.y = (y + dx) * g;
    cp2.x = (x + dy) * g;
    cp2.y = (y - dx) * g;
    return d > eps ? 2 : 1;
}
bool circmp(const cp& u, const cp& v) { return dcmp(u.r - v.r) < 0; }
bool cmp(const cp& u, const cp& v) {
    if (dcmp(u.angle - v.angle)) return u.angle < v.angle;
    return u.d > v.d;
}
double calc(cp cir, cp cp1, cp cp2) {
    double ans = (cp2.angle - cp1.angle) * sqr(cir.r) - cross(cir, cp1, cp2) +
                 cross(cp(0, 0), cp1, cp2);
    return ans * 0.5;
}
void CirUnion(cp cir[], int n) {
    cp cp1, cp2;
    sort(cir, cir + n, circmp);
    for (int i = 0; i < n; ++i)
        for (int j = i + 1; j < n; ++j)
            if (dcmp(dis(cir[i], cir[j]) + cir[i].r - cir[j].r) <= 0)
                cir[i].d++;
 
    for (int i = 0; i < n; ++i) {
        int tn = 0, cnt = 0;
        for (int j = 0; j < n; ++j) {
            if (i == j) continue;
            if (CirCrossCir(cir[i], cir[i].r, cir[j], cir[j].r, cp2, cp1) < 2)
                continue;
            cp1.angle = atan2(cp1.y - cir[i].y, cp1.x - cir[i].x);
            cp2.angle = atan2(cp2.y - cir[i].y, cp2.x - cir[i].x);
            cp1.d = 1;
            tp[tn++] = cp1;
            cp2.d = -1;
            tp[tn++] = cp2;
            if (dcmp(cp1.angle - cp2.angle) > 0) cnt++;
        }
 
        tp[tn++] = cp(cir[i].x - cir[i].r, cir[i].y, PI, -cnt);
        tp[tn++] = cp(cir[i].x - cir[i].r, cir[i].y, -PI, cnt);
        sort(tp, tp + tn, cmp);
        int p, s = cir[i].d + tp[0].d;
        for (int j = 1; j < tn; ++j) {
            p = s;
            s += tp[j].d;
            area[p] += calc(cir[i], tp[j - 1], tp[j]);
        }
    }
}
void solve() {
    R = r;
    for (int i = 0; i < n; ++i) cir[i].get();
    memset(area, 0, sizeof(area));
    CirUnion(cir, n);
    for (int i = 1; i <= n; ++i)  //去掉重复计算的
        area[i] -= area[i + 1];   // area[i]为重叠了i次的面积
    double tot = 0;               // tot 为总面积
    for (int i = 1; i <= n; i++) tot += area[i];
    printf("%.11lf\n", area[n]);
    // printf("%f\n", tot);  //这句就是求总面积
}

//以上是暴力
 
int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        scanf("%d%lf", &n, &r);
        if (n <= 40) {
            solve();
            continue;
        }
        int t = 0, tt;
        for (int i = 0; i < n; i++) {
            scanf("%lf%lf", &p[i].x, &p[i].y);
        }
        for (int i = 0; i < n; i++) {
            if (p[i].x < p[t].x || p[i].x == p[t].x && p[i].y < p[t].y) t = i;
            //初始选点
        }
        tt = nxt(t);
        double theta = 2 * pi / C;
        double tql = r * r / 2 * (theta - sin(theta));
        for (int i = 0; i < C; i++) {
            double q = 2 * pi * i / C;
            vec x = vec(r * cos(q), r * sin(q));
            vec y = x.rotate(theta);
            while (dcmp(cross(y - x, p[t] - p[tt])) <= 0) {
                t = tt;
                tt = nxt(t);
            }
            //找到最优圆
 
            l[i] = line(x + p[t], y + p[t]);
        }
        int m = half_plane(l, p, C);
        double ans = size(p, m);
        if (m > 2)//误差矫正
            for (int i = 0; i < m; i++) {
                double x = (p[i + 1] - p[i]).len();
                double y = asin(x / (r * 2)) * 2;
                ans += (y - sin(y)) * r * r / 2;
            }
        printf("%.12f\n", ans);
    }
    return 0;
}
```

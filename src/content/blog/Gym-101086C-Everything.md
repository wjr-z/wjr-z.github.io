---
title: "Gym - 101086C Everything"
date: 2021-08-17
updated: 2021-08-17
tags: ["trie树"]
section: "computer-contest"
---
### 题意

给定$n$​个字符串，询问每次查询每一个字符串最少需要操作数

### 题解

对于一个字符串，不妨考虑枚举对于其每一个前缀统计答案

我们求出所有前缀为S的大于当前字符串的数目为suf，前缀为S的字符串的个数为size,则最小操作数为|S|+min(size-suf-1,suf+1)+1

即输入|S|的操作数，第一次向下的操作

然后有两种选择，一种是不断按down，一种是先按end，再不断按up，取min即可

```c++
#include <bits/stdc++.h>
using namespace std;
int T, n;
const int N = 1e5 + 10, M = N * 6;

int ch[M][26], tot;
int siz[M];
int pos[N];
int dep[M];

int fa[M];

void clear() {
    for (int i = 1; i <= tot; ++i)
        siz[i] = fa[i] = 0, memset(ch[i], 0, sizeof(ch[i]));
    tot = 1;
    pos[0] = 0;
}
void insert(const char* s) {
    int x = 1;
    int len = strlen(s);
    for (int i = 0; i < len; ++i) {
        int p = s[i] - 'a';
        if (!ch[x][p]) {
            ch[x][p] = ++tot;
            fa[tot] = x;
            dep[tot] = dep[x] + 1;
        }
        x = ch[x][p];
    }
    pos[++pos[0]] = x;
    siz[x] = 1;
}

void dfs1(int x) {
    //预处理出size
    if (!x)return;
    for (int i = 0; i < 26; ++i) {
        dfs1(ch[x][i]);
        siz[x] += siz[ch[x][i]];
    }
}

int query(int x) {
    //向上跳
    int suf = siz[x] - 1;
    //pre表示该子树下小于该字符串的数目
    //suf表示大于该字符串的数目
    int ans = 1e9;
    while (true) {
        int pre = siz[x] - suf - 1;
        ans = min(ans, dep[x] + min(pre, suf + 1) + 1);
        if (x == 1)break;
        int p = 0;
        int Fa = fa[x];
        for (p = 0; p < 26; ++p)
            if (ch[Fa][p] == x)
                break;
        for (int i = p + 1; i < 26; ++i) {
            suf += siz[ch[Fa][i]];
        }
        x = Fa;
    }
    return ans;
}
char s[N];
int main() {
    scanf("%d", &T);
    while (T--) {
        tot = 1;
        scanf("%d", &n);
        for (int i = 1; i <= n; ++i) {
            scanf("%s", s);
            insert(s);
        }
        dfs1(1);
        for (int i = 1; i <= n; ++i)
            printf("%d ", query(pos[i]));
        clear();
        printf("\n");
    }
    return 0;
}
```

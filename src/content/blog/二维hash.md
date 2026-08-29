---
title: "二维hash"
date: 2021-01-10
updated: 2021-01-17
tags: ["hash"]
section: "computer-contest"
---
设sum\[i\]\[j\]表示左上角为(1,1)，右下角为(i,j)的hash值，mod为模数。  
  
则

$$

sum[i][j]=(a[i][j]+sum[i-1][j-1]*base1*base2+sum[i-1][j]*base1+sum[i][j-1]*base2)\%mod

$$

即可。  
求左上角为(A,B)，右下角为(C,D)的hash值：

$$

return (sum[C][D]+sum[A][B]*base1^{C-A}*base2^{D-B}-sum[A][D]*base1^{C-A}-sum[C][B]*base2^{D-B}+mod)\%mod;

$$

和二维前缀和及其相似。  
细节未处理，比如可能会溢出。  
mod可以取1e9+7,base1和base2可以取孪生素数。

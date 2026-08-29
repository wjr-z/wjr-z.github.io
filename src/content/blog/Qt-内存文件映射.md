---
title: "Qt 内存文件映射"
date: 2021-03-28
updated: 2021-03-30
tags: ["Qt","内存文件映射"]
section: "engineering"
---
其实很简单

Qt都封装好了

映射一个文件：

```c++
QFile file;
file.setFileName(path);//设置文件路径
file.open(QIODevice::ReadOnly);//只读，读写为ReadWrite
int len=file.size();
uchar*ptr=file.map(0,len);//ptr即为文件字符串
if(!ptr){
    len=0;
    file.close();
    ptr=nullptr;
}
uchar*tail=ptr+len;//尾指针
```

读取文件（和从字符串中读取没任何区别）：

```c++
QString QuickFile::QStringLine(){//读取一行
    QString s="";
    while(ptr<tail&&*ptr!='\r'&&*ptr!='\n')
        s.push_back(*ptr++);
    if(*ptr=='\r')++ptr;
    if(*ptr=='\n')++ptr;
    return s;
}
```

其余读取操作请自行完善

下面附上我封装好的读取文件类

#### quickfile.h

```c++
#ifndef MYFILE_H
#define MYFILE_H
#include <thread>
#include <QFile>
using namespace std;
class QuickFile{//读入的文件
private:
public:
    int len;
    QFile file;
    uchar*ptr,*tail;
    QuickFile();
    ~QuickFile();
    void QuickFileRead(const string&path,const int &MinSize=0,const int&MaxSize=-1);
    void close();
    QString QStringAll();
    QString QStringLine();
    int IntAll();
    int IntLine();
};


#endif // MYFILE_H
```

#### quickfile.cpp

```c++
#include "quickfile.h"
#include "function.h"
QuickFile::QuickFile(){

}
QuickFile::~QuickFile(){

}
void QuickFile::QuickFileRead(const string &path,const int &MinSize,const int&MaxSize){
    file.setFileName(QString::fromLocal8Bit(path.data()));
    file.open(QIODevice::ReadOnly);
    len=file.size();
    if(~MaxSize&&(len<MinSize||len>MaxSize)){
        len=0;
        file.close();
        ptr=nullptr;
        return;
    }
    ptr=file.map(0,len);
    if(!ptr){
        len=0;
        file.close();
        ptr=nullptr;
        return;
    }
    tail=ptr+len;
}
void QuickFile::close(){
    if(len)file.unmap(ptr);
    file.close();
}
QString QuickFile::QStringAll(){
    QString s="";
    while(ptr<tail)
        s.push_back(*ptr++);
    return s;
}
QString QuickFile::QStringLine(){
    QString s="";
    while(ptr<tail&&*ptr!='\r'&&*ptr!='\n')
        s.push_back(*ptr++);
    if(*ptr=='\r')++ptr;
    if(*ptr=='\n')++ptr;
    return s;
}
int QuickFile::IntAll(){
    int s=0;
    while(ptr<tail)
        s=(s<<1)+(s<<3)+(*(ptr++)-'0');
    return s;
}
int QuickFile::IntLine(){
    int s=0;
    while(ptr<tail&&*ptr!='\r'&&*ptr!='\n')
        s=(s<<1)+(s<<3)+(*(ptr++)-'0');
    if(*ptr=='\r')++ptr;
    if(*ptr=='\n')++ptr;
    return s;
}
```

### 使用方法：

QuickFileRead:

读取路径为path，文件大小在\[MinSize,MaxSize\]（不在的话len=0,ptr=nullptr，即文件置为空）之间的文件，MaxSize=-1即无限制。

ptr指针即为文件内容指针,uchar类型。

读取完后需要用close()进行关闭

close:

关闭读取的文件以及映射

QStringAll:

返回文件剩余内容，类型为QString

ptr移至尾指针tail

QStringLine:

返回一行，类型为QString

ptr移至下一行

IntAll:

返回文件剩余内容，类型为int

ptr移至尾指针tail

IntLine:

返回一行，类型为int

ptr移至下一行

为啥要用文件内容映射？

使用这个可以减少I/O操作，并且对于性能提升有好处

同时降低了程序内存使用（节省了接收文件内容所需要的字符数组）

对于快速写入，我暂时用不上，因此没写

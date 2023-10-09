---
author: 人间白头　
title: python 获取子进程print信息 　
date: 2019-05-24 14:39:44
tags:
 - Python
 - subprocess.Popen
 - 拦截print
categories: 随笔
---

在PyQt中使用子线程读取子进程Python脚本的print输出流内容。

<!-- more -->

问题所在：

![image.png](https://i.loli.net/2019/05/24/5ce793171984f27031.png)

如果模块都由自己开发， 正常操作 

![image.png](https://i.loli.net/2019/05/24/5ce7933994a0090037.png)

但是因为不能改, 所以只能拦截：
代码：
```python
pythonPath = self.pythonPath_cb.currentText()

if suffix == "py":
    # 首次
    self.pyCommand = [pythonPath, path]
    self.modifiedReloadPython(path)
def modifiedReloadPython(self, path_):
    os.chdir(os.path.dirname(path_))
    # 子进程调用
    self.p = subprocess.Popen(self.pyCommand, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    # self.stdoutWorker.p = self.p
    self.stdoutWorker = Worker(self.p)
    self.stdoutWorker.stdout_signal.connect(lambda x: self.error_te.append("PYDEBUG:\n" + x))
    self.stdoutWorker.start()
class Worker(QThread):
    stdout_signal = pyqtSignal(str)

    def __init__(self, p, parent=None):
        super().__init__(parent)
        self.p = p

    def run(self):
        while True:
            QApplication.processEvents()
            if self.p is not None:
                line = self.p.stdout.readline()
                # line = line.strip()
                if line != b'':
                    try:
                        info = line.decode()
                        self.stdout_signal.emit(info)
                    except:
                        self.stdout_signal.emit(repr(line))
    
```

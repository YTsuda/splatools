#! /usr/bin/python
import os

for i in range(1, 171):
    if os.path.exists('../src/images/clothes/' + str(i) + '.jpg'):
        print 1
    else:
        print 0

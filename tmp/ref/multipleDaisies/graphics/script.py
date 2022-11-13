
import os

path = 'C:\\Users\\Talita Halboth\\Documents\\GitHub\\The-Great-Daisy-Experiment\\src\\graphics'

files = []

map = {}

# r=root, d=directories, f = files
for r, d, f in os.walk(path):
    for file in f:
        if '.svg' in file:
            imgSize = r.split('\\')[-1]
            # print(map[imgSize])
            if (imgSize in map):
                map[imgSize] = map[imgSize] + 1
            else:
                map[imgSize] = 0
            # mapp[imgSize]
            print(imgSize + "_"+str(map[imgSize]) + "svg")
            files.append(os.path.join(r, file))

# for f in files:
#     print(f)


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
            newFileName = imgSize + "_"+str(map[imgSize]) + ".svg"
            newFileName = os.path.join(r, newFileName)
            print(newFileName)
            fileName = os.path.join(r, file)
            print(fileName)
            # if(not(imgSize == "small" or imgSize == "icon")):
            os.rename(os.path.join(r, file), os.path.join(r, newFileName))

# for f in files:
#     print(f)

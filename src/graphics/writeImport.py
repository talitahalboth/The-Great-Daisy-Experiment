
import os

path = 'C:\\Users\\Talita Halboth\\Documents\\GitHub\\The-Great-Daisy-Experiment\\src\\graphics'

files = []

map = {}
icon = []
small = []
medium = []
large = []
# r=root, d=directories, f = files
for r, d, f in os.walk(path):
    for file in f:
        if '.svg' in file:
            dir = file.split("_")[0]
            print("require('./graphics/"+dir+"/"+file+"')")
            fileDir = "document.location.href + \"" + file + "\""
            if (dir == "icon"):
                icon.append(fileDir)
            if (dir == "small"):
                small.append(fileDir)
            if (dir == "medium"):
                medium.append(fileDir)
            if (dir == "large"):
                large.append(fileDir)

print("export const sourcesIcon = ", icon)
print("export const sourcesSmall = ", small)
print("export const sourcesMedium = ", medium)
print("export const sourcesLarge = ", large)

# for f in small:
#     print(f)

# for f in medium:
#     print(f)

# for f in large:
#     print(f)

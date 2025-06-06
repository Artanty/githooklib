# What is it?
It is a small library that overrides git hooks folder on: 
```
{urProject}\build\node_modules\githooklib\hooks
```
and provides following 
## git hooks:

### pre-commit

bump version based on back & web package.jsons
and save it to TAG_VERSION variable in build/.env file

### post-commit

push tag with TAG_VERSION from build/.env file
if commit contains "-d"

# Installation
1. make sure the project has web & back folders.
2. prepare /build folder in project
3. init npm in it and install the package:
```
mkdir build
cd build 
npm init --yes
npm install --save-dev githooklib
```
4. add .gitignore file to build folder:
```
node_modules
.env
logs
```
4. add .env file to build folder:

### Final project structure:
```
your-project/
├── build/
│   ├── logs/
│   ├── .gitignore
│   └── .env
├── back
└── web
```

### Verify configuration after installing package:
git config --get core.hooksPath

### Reverting Changes, switch back to default hooks:
git config --unset core.hooksPath



# Plans (doesnt work now):

1. Manually provide folders (if not web & back) in .env file:
```
VBH_WEB_PATH
VBH_WEB_FOLDER
VBH_BACK_PATH
VBH_BACK_FOLDER
```

# 使用

## ng add

```bash
$ ng new testProject
$ cd testProject
$ ng add ng-zorro-schematics

# 集成在 ng-zorro-antd 内后无需手动安装
$ npm i
```

## ng generate

### table

```bash
ng g ng-zorro-schematics:nz-table --name=my-table --prefix=app
```

# 开发

## 安装全局依赖

```bash
$ npm i -g @angular-devkit/{schematics,schematics-cli,core} @schematics/schematics rxjs
```

## 创建

```bash
$ schematics @schematics/schematics:schematic --name collection-name
$ cd collection-name
$ npm i
```

# 参考

### 相关库

- [material2](https://github.com/angular/material2/tree/master/src/lib/schematics)
- [delon](https://github.com/cipchk/delon/tree/master/packages/cli)
- [@schematics/angular](https://github.com/angular/devkit/blob/master/packages/schematics/angular/app-shell/index.ts)
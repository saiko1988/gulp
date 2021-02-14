# gulp4 メモ

## gulpコマンドが使えない場合

gulpコマンドがグローバルな設定になっていない。以下のコマンドを実施してリンクを張る。

```
$ npm link gulp
```

参考：https://note.com/shimos/n/n8cd95805b027

## dart-sassでgulp-sass-globが使えない

@useに非対応のため。/node_modules/gulp-sass-glob/dist/index.js内の'@import'を'@use'に置換すると使えるようになる。
（が、バージョン管理等の点からやってはいけない気がする）
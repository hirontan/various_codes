# TypeScriptの基礎

## 初期構築
```
$ npm install
```

## テスト実行

### サーバ起動
```
$ npm start
```

### お試しコンパイル
```
$ tsc app.ts
```

### お試しWatchモード
```
$ tsc app.ts -w
```

### 全体Watchモード
```
$ tsc -w
```

### GetterとSetterを扱う場合
- `Accessors are only available when targeting ECMAScript 5 and higher.`のエラーが発生するため、下記で実行する
```
$ tsc -t ES5 app.ts
```

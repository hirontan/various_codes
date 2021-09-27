# Laravel 5.7

## 準備

### Mac

##### PHPインストール
```
brew install php@7.3
```

##### Composerインストール
```
brew install composer
```


## Laravel関連のコマンド

### サンプルプロジェクト作成
- Laravel 5.7の環境で実行するプロジェクトがあったため、わざとこちらの環境にしています
```
composer create-project "laravel/laravel=5.7" sample
```

### モデル作成
```
php artisan make:model Task -m -c -r
```

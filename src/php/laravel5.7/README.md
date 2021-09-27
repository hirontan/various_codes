# Laravel 5.7

## 準備

### Docker起動
```
docker-compose up -d --build --force-recreate
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

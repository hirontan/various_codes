<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# サンプルプロジェクト

## バージョン確認

```command
$ php artisan --version
Laravel Framework 9.10.1
```

## Docker実行

```command
docker-compose up --build --force-recreate -d
```

## Passport利用手順の記録

```command
$ composer require laravel/passport

$ php artisan migrate
Migrating: 2016_06_01_000001_create_oauth_auth_codes_table
Migrated:  2016_06_01_000001_create_oauth_auth_codes_table (28.37ms)
Migrating: 2016_06_01_000002_create_oauth_access_tokens_table
Migrated:  2016_06_01_000002_create_oauth_access_tokens_table (18.20ms)
Migrating: 2016_06_01_000003_create_oauth_refresh_tokens_table
Migrated:  2016_06_01_000003_create_oauth_refresh_tokens_table (21.12ms)
Migrating: 2016_06_01_000004_create_oauth_clients_table
Migrated:  2016_06_01_000004_create_oauth_clients_table (10.39ms)
Migrating: 2016_06_01_000005_create_oauth_personal_access_clients_table
Migrated:  2016_06_01_000005_create_oauth_personal_access_clients_table (4.76ms)

$ php artisan passport:install
Encryption keys generated successfully.
Personal access client created successfully.
Client ID: 1
Client secret: xxx
Password grant client created successfully.
Client ID: 2
Client secret: xxx

>> idをuuidに変更
$ php artisan passport:install --uuids
Encryption keys already exist. Use the --force option to overwrite them.
Copied File [/vendor/laravel/passport/config/passport.php] To [/config/passport.php]
Publishing complete.
Copied Directory [/vendor/laravel/passport/database/migrations] To [/database/migrations]
Publishing complete.

 In order to finish configuring client UUIDs, we need to rebuild the Passport database tables. Would you like to rollback and re-run your last migration? (yes/no) [no]:
 > yes

Rolling back: 2016_06_01_000005_create_oauth_personal_access_clients_table
Rolled back:  2016_06_01_000005_create_oauth_personal_access_clients_table (11.66ms)
Rolling back: 2016_06_01_000004_create_oauth_clients_table
Rolled back:  2016_06_01_000004_create_oauth_clients_table (2.60ms)
Rolling back: 2016_06_01_000003_create_oauth_refresh_tokens_table
Rolled back:  2016_06_01_000003_create_oauth_refresh_tokens_table (2.34ms)
Rolling back: 2016_06_01_000002_create_oauth_access_tokens_table
Rolled back:  2016_06_01_000002_create_oauth_access_tokens_table (2.69ms)
Rolling back: 2016_06_01_000001_create_oauth_auth_codes_table
Rolled back:  2016_06_01_000001_create_oauth_auth_codes_table (3.26ms)
Migrating: 2016_06_01_000001_create_oauth_auth_codes_table
Migrated:  2016_06_01_000001_create_oauth_auth_codes_table (17.93ms)
Migrating: 2016_06_01_000002_create_oauth_access_tokens_table
Migrated:  2016_06_01_000002_create_oauth_access_tokens_table (27.86ms)
Migrating: 2016_06_01_000003_create_oauth_refresh_tokens_table
Migrated:  2016_06_01_000003_create_oauth_refresh_tokens_table (13.39ms)
Migrating: 2016_06_01_000004_create_oauth_clients_table
Migrated:  2016_06_01_000004_create_oauth_clients_table (18.22ms)
Migrating: 2016_06_01_000005_create_oauth_personal_access_clients_table
Migrated:  2016_06_01_000005_create_oauth_personal_access_clients_table (4.10ms)

Personal access client created successfully.
Client ID: 96803da0-3432-47d3-91c1-d5d906964e53
Client secret: xxx
Password grant client created successfully.
Client ID: 96803da0-3ca4-4832-b9f5-3bbc77467d54
Client secret: xxx

>> 初期設定を実施

$ php artisan route:list

  GET|HEAD  / .......................................................................................................................
  POST      _ignition/execute-solution ................ ignition.executeSolution › Spatie\LaravelIgnition › ExecuteSolutionController
  GET|HEAD  _ignition/health-check ............................ ignition.healthCheck › Spatie\LaravelIgnition › HealthCheckController
  POST      _ignition/update-config ......................... ignition.updateConfig › Spatie\LaravelIgnition › UpdateConfigController
  GET|HEAD  api/test ................................................................................................................
  POST      api/test ................................................................................................................
  GET|HEAD  api/user ................................................................................................................
  GET|HEAD  oauth/authorize ................ passport.authorizations.authorize › Laravel\Passport › AuthorizationController@authorize
  POST      oauth/authorize ............. passport.authorizations.approve › Laravel\Passport › ApproveAuthorizationController@approve
  DELETE    oauth/authorize ...................... passport.authorizations.deny › Laravel\Passport › DenyAuthorizationController@deny
  GET|HEAD  oauth/clients ...................................... passport.clients.index › Laravel\Passport › ClientController@forUser
  POST      oauth/clients ........................................ passport.clients.store › Laravel\Passport › ClientController@store
  PUT       oauth/clients/{client_id} .......................... passport.clients.update › Laravel\Passport › ClientController@update
  DELETE    oauth/clients/{client_id} ........................ passport.clients.destroy › Laravel\Passport › ClientController@destroy
  GET|HEAD  oauth/personal-access-tokens .. passport.personal.tokens.index › Laravel\Passport › PersonalAccessTokenController@forUser
  POST      oauth/personal-access-tokens .... passport.personal.tokens.store › Laravel\Passport › PersonalAccessTokenController@store
  DELETE    oauth/personal-access-tokens/{token_id} passport.personal.tokens.destroy › Laravel\Passport › PersonalAccessTokenControl…
  GET|HEAD  oauth/scopes ............................................. passport.scopes.index › Laravel\Passport › ScopeController@all
  POST      oauth/token ........................................ passport.token › Laravel\Passport › AccessTokenController@issueToken
  POST      oauth/token/refresh ........................ passport.token.refresh › Laravel\Passport › TransientTokenController@refresh
  GET|HEAD  oauth/tokens ......................... passport.tokens.index › Laravel\Passport › AuthorizedAccessTokenController@forUser
  DELETE    oauth/tokens/{token_id} ............ passport.tokens.destroy › Laravel\Passport › AuthorizedAccessTokenController@destroy
  GET|HEAD  sanctum/csrf-cookie ......................................................... Laravel\Sanctum › CsrfCookieController@show


$ php artisan tinker
Psy Shell v0.11.2 (PHP 8.1.6 — cli) by Justin Hileman
>>> \DB::table('oauth_clients')->get();
=> Illuminate\Support\Collection {#3563
     all: [
       {#3572
         +"id": "96803da0-3432-47d3-91c1-d5d906964e53",
         +"user_id": null,
         +"name": "Laravel Personal Access Client",
         +"secret": "xxx",
         +"provider": null,
         +"redirect": "http://localhost",
         +"personal_access_client": 1,
         +"password_client": 0,
         +"revoked": 0,
         +"created_at": "2022-06-09 11:48:58",
         +"updated_at": "2022-06-09 11:48:58",
       },
       {#3574
         +"id": "96803da0-3ca4-4832-b9f5-3bbc77467d54",
         +"user_id": null,
         +"name": "Laravel Password Grant Client",
         +"secret": "xxx",
         +"provider": "users",
         +"redirect": "http://localhost",
         +"personal_access_client": 0,
         +"password_client": 1,
         +"revoked": 0,
         +"created_at": "2022-06-09 11:48:58",
         +"updated_at": "2022-06-09 11:48:58",
       },
     ],
   }

>> テストユーザ作成
$ php artisan db:seed

>> アクセストークンの発行
下記で、cliend_idとclient_secretを取得
mysql> select * from oauth_clients;

Postman等で、/oauth/token に下記をBodyに入力し、送信してみる
===================
grant_type:password
client_id:xxx
client_secret:xxx
username:user@example.com
password:password
scope:*
===================
```

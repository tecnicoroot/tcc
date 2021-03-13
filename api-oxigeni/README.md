# Lumen PHP Framework

## Primeiro comando:
composer create-project --prefer-dist laravel/lumen api-oxigeni

Configurar o .env

## Comando para rodar o servidor
php -S localhost:8080 -t public public/index.php

## Criando a migration User
php artisan make:migration create_users_table

## Criando um Seeder
php artisan make:seeder UsersTableSeeder 

## Aplicar Seeder
php artisan db:seed

## Implementação JWT
instalar com o comando abaixo:
composer require tymon/jwt-auth

Após a instalação, copie o config.php que esta no caminho vendor/tymon/jwt-auth/config/config.php em uma pasta config na raiz  de seu aplicativo Lumen e renomeie-o para jwt.php

Registre sua configuração adicionando o seguinte na bootstrap/app.php declaração antes do middleware.

$app->configure('jwt');

Adicione o seguinte snippet ao bootstrap/app.phparquivo na seção de provedores da seguinte maneira:

// Uncomment this line
$app->register(App\Providers\AuthServiceProvider::class);

// Add this line
$app->register(Tymon\JWTAuth\Providers\LumenServiceProvider::class);
Em seguida, descomente o authmiddleware no mesmo arquivo:

$app->routeMiddleware([
    'auth' => App\Http\Middleware\Authenticate::class,
]);

Incluí um comando auxiliar para gerar uma chave para você:

php artisan jwt:secret
Isso irá atualizar seu .envarquivo com algo comoJWT_SECRET=foobar

É a chave que será usada para assinar seus tokens. Como isso acontecerá exatamente dependerá do algoritmo que você escolher usar.

## Utilização do service-repository-pattern
Primeiro criamos os repositories.
    Criar arquivo RepositoryInterface.php
    Criar arquivo AbstractRepository.php
    Criar pasta User
        Criar arquivo UserRepository.php

Segundo criamos os Services.

    Criar arquivo ServiceInterface.php
    Criar arquivo AbstractService.php
    Criar pasta User
        Criar arquivo UserService.php

Terceiro criamos os Controller.
    Criar arquivo ControllerInterface.php
    Criar arquivo AbstractController.php
    Criar a pasta V1
        Criar pasta User
            Criar arquivo UserController.php

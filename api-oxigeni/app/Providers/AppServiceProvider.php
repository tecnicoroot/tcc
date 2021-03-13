<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        # evitar erro ao criar as migrates.
        Schema::defaultStringLength(191);
        $this->app->register(\Tymon\JWTAuth\Providers\LumenServiceProvider::class);
        $this->app->bind(
            'App\Repositories\UserRepositoryInterface', 'App\Repositories\UserRepositoryEloquent'
        );
    }
}
<?php

declare(strict_types=1);

namespace App\Repositories\User;

use App\Repositories\AbstractRepository;
use App\Models\User;

/**
 * Class AuthRepository
 * @package App\Repositories\Auth
 */

 class AuthRepository extends AbstractRepository
 {
    public function __construct(User $user)
    {

    }

    public function login(Request $request)
    {
        return $this->model->login($request);
    }

    public function logout()
    {
        return $this->model->logout();
    }

    public function refresh()
    {
        return $this->model->refresh();
    }

 }

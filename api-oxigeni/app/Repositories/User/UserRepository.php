<?php

declare(strict_types=1);

namespace App\Repositories\User;

use App\Repositories\AbstractRepository;
use App\Models\User;

/**
 * Class UserRepository
 * @package App\Repositories\User
 */

 class UserRepository extends AbstractRepository
 {
    public function __construct(User $model)
    {
        $this->model =  $model;
    }
    public function updatePassword($id, array $data)
    {
        return $this->model->find($id)->update($data);
    }

 }

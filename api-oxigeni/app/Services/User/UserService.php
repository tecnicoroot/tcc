<?php
namespace App\Services\User;

use App\Repositories\User\UserRepository;
use Illuminate\Http\Request;
#use App\Models\Validations\ValidationUser;
#use App\Models\Validations\ValidationUserEdit;
#use Illuminate\Database\QueryException;
#use Illuminate\Support\Facades\Validator;
#use Symfony\Component\HttpFoundation\Response;
#use App\Models\Validations\ValidationAuth;
use App\Services\AbstractService;
use DB;


class UserService extends AbstractService
{
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
    * @param int $id
    * @param array $data
    * @return bool
    */
   public function updatePassword(int $id, array $data): bool
   {
        return $this->repository->updatePassword($id, $data);
   }
}

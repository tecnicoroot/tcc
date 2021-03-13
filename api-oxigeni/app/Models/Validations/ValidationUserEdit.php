<?php

namespace App\Models\Validations;

class ValidationUserEdit
{
    const RULE_USER = [
        'name' => 'required | max: 80',
        'email' => 'required|email',

    ];
}
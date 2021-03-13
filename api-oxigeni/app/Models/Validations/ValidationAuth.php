<?php

namespace App\Models\Validations;

class ValidationAuth
{
    const RULE_AUTH = [
        'email' => 'required|email',
        'password'	=> 'required',
    ];
}
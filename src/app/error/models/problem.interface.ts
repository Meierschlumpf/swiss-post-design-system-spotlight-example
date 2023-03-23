/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import {ValidationError} from './validation-error.interface';

export interface Problem {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    validationErrors: ValidationError[];
}

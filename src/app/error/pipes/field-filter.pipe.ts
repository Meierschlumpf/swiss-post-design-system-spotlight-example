import {Pipe, PipeTransform} from '@angular/core';
import {ValidationError} from '../models/validation-error.interface';

@Pipe({
    name: 'field'
})
export class FieldFilter implements PipeTransform {

    transform(errors: ValidationError[], property: string): ValidationError[] {
        if (!errors) {
            return null;
        }
        return errors.filter(error => error.property === property);
    }
}

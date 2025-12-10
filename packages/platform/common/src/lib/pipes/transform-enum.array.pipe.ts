import { Pipe, PipeTransform } from '@angular/core'
import { Nilable, TransformEnumPipeSignature } from '../model'
import { isNil, transformEnumArray } from '../utils'

@Pipe({ name: 'zwpTransformEnumArray' })
export class ZWPTransformEnumArrayPipe implements PipeTransform {
    transform(value: Nilable<string[]>, arg1: TransformEnumPipeSignature, arg2: 'array' | 'concatenated' = 'array'): string[] | string {
        if (isNil(value)) { return arg2 === 'array' ? [] : '' }
        const transformed =  transformEnumArray(value, arg1.input, arg1.output)
        return arg2 === 'array' ? transformed : transformed.join(', ')
    }
}
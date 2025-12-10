import { Pipe, PipeTransform } from '@angular/core'
import { Nilable, TransformEnumPipeSignature } from '../model'
import { isNil, transformEnum } from '../utils'

@Pipe({ name: 'zwpTransformEnum' })
export class ZWPTransformEnumPipe implements PipeTransform {
    transform(value: Nilable<string>, arg1: TransformEnumPipeSignature): string {
        if (isNil(value)) { return '' }
        return transformEnum(value, arg1.input, arg1.output)
    }
}
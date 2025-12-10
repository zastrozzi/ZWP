export interface TransformEnumPipeSignature<Input = object, Output extends object = object> {
    input: Input
    output: Output
}

export const makeTransformEnumPipeSignature = <Input, Output extends object>(input: Input, output: Output): TransformEnumPipeSignature<Input, Output> => {
    return { input, output }
}
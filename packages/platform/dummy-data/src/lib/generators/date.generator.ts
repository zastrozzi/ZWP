export interface DateGeneratorOptions {
    before?: Date
    after?: Date
}

export const generateRandomDate = (options: DateGeneratorOptions = {}): Date => {
    const { before, after } = options

    const minTime = after ? after.getTime() : new Date('1970-01-01').getTime()
    const maxTime = before ? before.getTime() : new Date().getTime()

    if (minTime > maxTime) {
        throw new Error('after date must be before the before date')
    }

    const randomTime = minTime + Math.random() * (maxTime - minTime)

    return new Date(randomTime)
}

import { arrayDistinctRemove } from './array.utils'

// eslint-disable-next-line no-prototype-builtins
const hasProperty = <X extends object, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> => obj.hasOwnProperty(prop)
const isDate = (d: any) => d instanceof Date
const isBoolean = (d: any) => typeof d == 'boolean'
const isTrue = (d: any) => isBoolean(d) && (d as boolean) === true
const isEmpty = (o: any) => Object.keys(o).length === 0
const isObject = (o: any) => o != null && typeof o === 'object'
const isArray = (o: any) => o != null && o instanceof Array
const isEmptyObject = (o: any) => isObject(o) && isEmpty(o)
const isNonEmptyObject = (o: any) => isObject(o) && !isEmpty(o)
const makeObjectWithoutPrototype = () => Object.create(null)

const calculateDiff = (lhs: any, rhs: any, exclusive: boolean = false) => {
    if (lhs === rhs) return {}
    if (isArray(lhs) || isArray(rhs)) {
        if (exclusive === true) {
            return rhs.filter((x: any) => !lhs.includes(x))
        } else {
            return rhs
        }
    }
    // if (isArray(lhs) || isArray(rhs)) {
    //     return rhs
    // }
    if (!isObject(lhs) || !isObject(rhs)) return rhs

    const deletedValues = Object.keys(lhs).reduce((acc, key) => {
        if (!hasProperty(rhs, key)) {
            acc[key] = undefined
        }
        return acc
    }, makeObjectWithoutPrototype())

    if (isDate(lhs) || isDate(rhs)) {
        if (lhs.valueOf() == rhs.valueOf()) return {}
        return rhs
    }

    return Object.keys(rhs).reduce((acc, key) => {
        if (!hasProperty(lhs, key)) {
            acc[key] = rhs[key]
            return acc
        }

        const difference = calculateDiff(lhs[key], rhs[key], exclusive)

        // If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
        if (isEmptyObject(difference) && !isDate(difference) && (isEmptyObject(lhs[key]) || !isEmptyObject(rhs[key]))) {
            return acc
        }
        acc[key] = difference // return updated key
        return acc // return updated key
    }, deletedValues)
}

const deletedDiff = (lhs: any, rhs: any, exclusive: boolean = false) => {
    if (lhs === rhs || !isObject(lhs) || !isObject(rhs)) return {}
    if (isArray(lhs) || isArray(rhs)) {
        if (exclusive === true) {
            return rhs.filter((x: any) => !lhs.includes(x))
        } else {
            return rhs
        }
    }

    return Object.keys(lhs).reduce((acc, key) => {
        if (hasProperty(rhs, key)) {
            const difference = deletedDiff(lhs[key], rhs[key], exclusive)

            if (isObject(difference) && isEmpty(difference)) return acc

            acc[key] = difference
            return acc
        }

        acc[key] = undefined
        return acc
    }, makeObjectWithoutPrototype())
}

// const calculateDiff2 = (lhs: any, rhs: any, exclusive: boolean = false) => {
//   if (lhs === rhs) return {}
//   if (isArray(lhs) || isArray(rhs)) { if (exclusive === true) { return rhs.filter((x: any) => !lhs.includes(x)) } else { return rhs } }
//   // if (isArray(lhs) || isArray(rhs)) {
//   //     return rhs
//   // }
//   if (!isObject(lhs) || !isObject(rhs)) return rhs

//   const deletedValues = Object.keys(lhs).reduce((acc, key) => {
//       if (!hasOwnProperty(rhs, key)) { acc[key] = undefined }
//       return acc
//   }, makeObjectWithoutPrototype())

//   if (isDate(lhs) || isDate(rhs)) {
//       if (lhs.valueOf() == rhs.valueOf()) return {}
//       return rhs
//   }

//   return Object.keys(rhs).reduce((acc, key) => {
//       if (!hasOwnProperty(lhs, key)){
//           acc[key] = rhs[key]
//           return acc
//       }

//       const difference = calculateDiff(lhs[key], rhs[key], exclusive)

//     // If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
//       if (isEmptyObject(difference) && !isDate(difference) && (isEmptyObject(lhs[key]) || !isEmptyObject(rhs[key]))) { return acc }
//       acc[key] = difference // return updated key
//       return acc // return updated key
//   }, deletedValues)
// }

function mergeDeep(target: any, ...sources: any): any {
    if (!sources.length) return target
    const source = sources.shift()
    if (DiffingUtils.isObject(target) && DiffingUtils.isObject(source)) {
        for (const key in source) {
            if (DiffingUtils.isArray(source[key])) {
                Object.assign(target, { [key]: source[key] })
            } else if (DiffingUtils.isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} })
                }
                mergeDeep(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return mergeDeep(target, ...sources)
}

function addDeep(target: any, ...sources: any): any {
    if (!sources.length) return target
    const source = sources.shift()
    if (DiffingUtils.isObject(target) && DiffingUtils.isObject(source)) {
        for (const key in source) {
            if (DiffingUtils.isArray(source[key])) {
                Object.assign(target, { [key]: [...new Set([...target[key], ...source[key]])] })
            } else if (DiffingUtils.isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} })
                }
                addDeep(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return addDeep(target, ...sources)
}

function subtractDeep2(body: any, instance: any) {
    if (body == undefined) {
        return
    } else if (Array.isArray(instance)) {
        const new_array: any = []
        instance.forEach(function (element) {
            if (
                body
                    .map(function (e: any) {
                        return JSON.stringify(e)
                    })
                    .indexOf(JSON.stringify(element)) < 0
            ) {
                new_array.push(element)
            }
        })

        return new_array
    } else if (typeof instance == 'object' && !(instance instanceof Date)) {
        if (isEmptyObject(body)) {
            return instance
        }
        const new_instance: any = {}
        Object.keys(instance).forEach(function (key) {
            if (Object.hasOwnProperty.bind(body)(key)) {
                const new_value = subtractDeep2(body[key], instance[key])

                if (new_value == undefined) {
                    delete new_instance[key]
                } else {
                    new_instance[key] = new_value
                }
            } else {
                new_instance[key] = instance[key]
            }
        })

        return new_instance
    } else if (body == instance) {
        return
    } else {
        return instance
    }
}

function subtractDeep(target: any, ...sources: any): any {
    if (!sources.length) return target
    const source = sources.shift()
    if (DiffingUtils.isObject(target) && DiffingUtils.isObject(source)) {
        for (const key in source) {
            if (DiffingUtils.isArray(source[key])) {
                Object.assign(target, { [key]: arrayDistinctRemove(target[key] ?? [], source[key]) })
            } else if (DiffingUtils.isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} })
                }
                subtractDeep(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return subtractDeep(target, ...sources)
}

export const DiffingUtils = {
    hasProperty,
    isArray,
    isBoolean,
    isTrue,
    isDate,
    isEmpty,
    isObject,
    isEmptyObject,
    isNonEmptyObject,
    makeObjectWithoutPrototype,
    calculateDiff,
    mergeDeep,
    subtractDeep,
    subtractDeep2,
    addDeep,
    deletedDiff
}

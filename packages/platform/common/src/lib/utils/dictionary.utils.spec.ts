import { arrayToDictionary, arrayToDictionaryStrict, arrayToDictionaryMulti, arrayToEnumDictionaryMulti } from './dictionary.utils'

describe('dictionary.utils', () => {
  describe('arrayToDictionary', () => {
    it('maps array to dictionary by key (last wins for duplicates)', () => {
      const arr = [
        { id: 'a', v: 1 },
        { id: 'b', v: 2 },
        { id: 'a', v: 3 },
      ]
      const d = arrayToDictionary(arr, 'id')
      expect(Object.keys(d).sort()).toEqual(['a', 'b'])
      expect(d['a'].v).toBe(3)
      expect(d['b'].v).toBe(2)
    })
  })

  describe('arrayToDictionaryStrict', () => {
    it('throws when a key is not a string', () => {
      const arr = [{ id: 1, v: 1 } as any]
      expect(() => arrayToDictionaryStrict(arr, 'id')).toThrow(TypeError)
    })

    it('throws on duplicate keys', () => {
      const arr = [{ id: 'x', v: 1 }, { id: 'x', v: 2 }]
      expect(() => arrayToDictionaryStrict(arr, 'id')).toThrow(/duplicate key/)
    })

    it('builds dictionary for valid data', () => {
      const arr = [{ id: 'one', v: 1 }, { id: 'two', v: 2 }]
      const res = arrayToDictionaryStrict(arr, 'id')
      expect(res['one'].v).toBe(1)
      expect(res['two'].v).toBe(2)
    })
  })

  describe('arrayToDictionaryMulti', () => {
    it('groups items with the same key into arrays', () => {
      const arr = [
        { id: 'a', v: 1 },
        { id: 'b', v: 2 },
        { id: 'a', v: 3 },
      ]
      const d = arrayToDictionaryMulti(arr, 'id')
      expect(Array.isArray(d['a'])).toBe(true)
      expect(d['a'].length).toBe(2)
      expect(d['b'].length).toBe(1)
      expect(d['a'][0].v).toBe(1)
      expect(d['a'][1].v).toBe(3)
    })

    it('skips items where the key is not a string', () => {
      const arr = [{ id: 'a', v: 1 }, { id: 2, v: 2 } as any]
      const d = arrayToDictionaryMulti(arr, 'id')
      expect(Object.keys(d)).toEqual(['a'])
    })
  })

  describe('arrayToEnumDictionaryMulti', () => {
    enum TestEnum {
      alpha = 'alpha',
      beta = 'beta',
    }

    it('groups items by enum named-keys and skips non-enum keys', () => {
      const arr = [
        { cat: TestEnum.alpha, val: 1 },
        { cat: TestEnum.beta, val: 2 },
        { cat: TestEnum.alpha, val: 3 },
        { cat: 'other', val: 9 } as any,
      ]
      const d = arrayToEnumDictionaryMulti<typeof TestEnum, { cat: string; val: number }, 'cat'>(arr, 'cat', TestEnum)
      expect(d.alpha).toBeDefined()
      expect(d.alpha?.length).toBe(2)
      expect(d.beta).toBeDefined()
      expect(d.beta?.length).toBe(1)
      expect((d as any).other).toBeUndefined()
    })
  })
})

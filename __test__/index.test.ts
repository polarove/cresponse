import { expect, test } from 'vitest'
import checkInterface from '../src'
import { resolve } from 'path'

// @ts-ignore
interface TestEntity {
	test: number
}

test('缺失key', async () => {
	expect(
		await checkInterface(
			'/some/path',
			{ test: 2, missingKey: 'a' },
			'TestEntity',
			resolve(__dirname, __filename)
		)
	).toBe(false)
})

// @ts-ignore
interface TestEntiti {
	test: number
}

test('不缺失key', async () => {
	expect(
		await checkInterface(
			'/some/path',
			{ test: 2 },
			'TestEntiti',
			resolve(__dirname, __filename)
		)
	).toBe(true)
})

test('缺失key，类型声明在当前文件外', async () => {
	expect(
		await checkInterface(
			'/some/path',
			{ test: 2 },
			'TestEntiti',
			resolve(__dirname, 'types.d.ts')
		)
	).toBe(true)
})

test('不缺失key，类型声明在当前文件外', async () => {
	expect(
		await checkInterface(
			'/some/path',
			{ test: 2 },
			'TestEntiti',
			resolve(__dirname, 'types.d.ts')
		)
	).toBe(true)
})

test('待实现：解析 extends interface', () => {
	console.log('待实现')
})

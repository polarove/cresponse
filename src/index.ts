import { readFile } from 'fs/promises'
import path, { resolve } from 'path'
import { log } from 'console'
import chalk from 'chalk'

const PREFIX = '[cresponse]'

/**
 *
 * @param apiPath 请求的 api 路径
 * @param matchingData 要比对的数据，由 api 请求而来
 * @param interfaceName 要比对的 interface 的名字
 * @param typeFile 类型文件的路径
 */
const checkInterface = async <T extends object>(
	apiPath: string,
	matchingData: T,
	interfaceName: string,
	typeFile: string
) => {
	const check = (data: string) => {
		data = data.slice(
			data.indexOf(interfaceName) + interfaceName.length + 2
		)
		data = data.slice(0, data.indexOf('}'))
		const keyInInterface = data
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line.length > 0)
			.map((line) => {
				return { key: line.split(':')[0], type: line.split(':')[1] }
			})

		const missingKeys = Object.keys(matchingData).filter(
			(key) => !keyInInterface.map((kv) => kv.key).includes(key)
		)

		if (missingKeys.length > 0) return alert(missingKeys)
		else return pass()
	}

	const alert = (missingKey: string[]) => {
		log(
			`${chalk.red(
				'---------------------------------------------------------------'
			)}`
		)
		log(`⚠️ ${PREFIX}：${chalk.green(apiPath)} 请求完毕`)
		log(
			`⚠️ ${PREFIX}：检测到 ${chalk.red(
				interfaceName
			)} 缺失了如下 key，请及时修改`
		)
		log(`⚠️ ${PREFIX}：${missingKey.toString()}`)
		log(`⚠️ ${PREFIX}：${chalk.blue(path.resolve(__dirname, typeFile))}`)
		log(
			`${chalk.red(
				'---------------------------------------------------------------'
			)}`
		)
		return false
	}

	const pass = () => {
		log(
			`${chalk.green(
				'---------------------------------------------------------------'
			)}`
		)
		log(`✨ ${PREFIX}：${chalk.green(`${apiPath} 的请求检查完毕`)}`)
		log(
			`✨ ${PREFIX}：${chalk.green(
				`${interfaceName} 类型定义满足请求返回的数据`
			)}`
		)
		log(
			`${chalk.green(
				'---------------------------------------------------------------'
			)}`
		)
		return true
	}

	const skip = () => {
		return Promise.reject(
			`🧐 ${PREFIX}：${chalk.gray(
				`未找到 interface ${interfaceName}, 跳过检查`
			)}`
		)
	}

	return readFile(resolve(__dirname, typeFile), 'utf8')
		.then((res) => {
			if (res.includes(interfaceName)) return check(res)
			else return skip()
		})
		.catch((err) => console.log(err))
}

export default checkInterface

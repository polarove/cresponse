"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = __importStar(require("path"));
const console_1 = require("console");
const chalk_1 = __importDefault(require("chalk"));
const PREFIX = '[cresponse]';
/**
 *
 * @param apiPath 请求的 api 路径
 * @param matchingData 要比对的数据，由 api 请求而来
 * @param interfaceName 要比对的 interface 的名字
 * @param typeFile 类型文件的路径
 */
const checkInterface = (apiPath, matchingData, interfaceName, typeFile) => __awaiter(void 0, void 0, void 0, function* () {
    const check = (data) => {
        data = data.slice(data.indexOf(interfaceName) + interfaceName.length + 2);
        data = data.slice(0, data.indexOf('}'));
        const keyInInterface = data
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => {
            return { key: line.split(':')[0], type: line.split(':')[1] };
        });
        const missingKeys = Object.keys(matchingData).filter((key) => !keyInInterface.map((kv) => kv.key).includes(key));
        if (missingKeys.length > 0)
            return alert(missingKeys);
        else
            return pass();
    };
    const alert = (missingKey) => {
        (0, console_1.log)(`${chalk_1.default.red('---------------------------------------------------------------')}`);
        (0, console_1.log)(`⚠️ ${PREFIX}：${chalk_1.default.green(apiPath)} 请求完毕`);
        (0, console_1.log)(`⚠️ ${PREFIX}：检测到 ${chalk_1.default.red(interfaceName)} 缺失了如下 key，请及时修改`);
        (0, console_1.log)(`⚠️ ${PREFIX}：${missingKey.toString()}`);
        (0, console_1.log)(`⚠️ ${PREFIX}：${chalk_1.default.blue(path_1.default.resolve(__dirname, typeFile))}`);
        (0, console_1.log)(`${chalk_1.default.red('---------------------------------------------------------------')}`);
        return false;
    };
    const pass = () => {
        (0, console_1.log)(`${chalk_1.default.green('---------------------------------------------------------------')}`);
        (0, console_1.log)(`✨ ${PREFIX}：${chalk_1.default.green(`${apiPath} 的请求检查完毕`)}`);
        (0, console_1.log)(`✨ ${PREFIX}：${chalk_1.default.green(`${interfaceName} 类型定义满足请求返回的数据`)}`);
        (0, console_1.log)(`${chalk_1.default.green('---------------------------------------------------------------')}`);
        return true;
    };
    const skip = () => {
        return Promise.reject(`🧐 ${PREFIX}：${chalk_1.default.gray(`未找到 interface ${interfaceName}, 跳过检查`)}`);
    };
    return (0, promises_1.readFile)((0, path_1.resolve)(__dirname, typeFile), 'utf8')
        .then((res) => {
        if (res.includes(interfaceName))
            return check(res);
        else
            return skip();
    })
        .catch((err) => console.log(err));
});
exports.default = checkInterface;

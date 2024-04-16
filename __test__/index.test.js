"use strict";
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
const vitest_1 = require("vitest");
const src_1 = __importDefault(require("../src"));
const path_1 = require("path");
(0, vitest_1.test)('缺失key', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, vitest_1.expect)(yield (0, src_1.default)('/some/path', { test: 2, missingKey: 'a' }, 'TestEntity', (0, path_1.resolve)(__dirname, __filename))).toBe(false);
}));
(0, vitest_1.test)('不缺失key', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, vitest_1.expect)(yield (0, src_1.default)('/some/path', { test: 2 }, 'TestEntiti', (0, path_1.resolve)(__dirname, __filename))).toBe(true);
}));
(0, vitest_1.test)('缺失key，类型声明在当前文件外', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, vitest_1.expect)(yield (0, src_1.default)('/some/path', { test: 2 }, 'TestEntiti', (0, path_1.resolve)(__dirname, 'types.d.ts'))).toBe(true);
}));
(0, vitest_1.test)('不缺失key，类型声明在当前文件外', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, vitest_1.expect)(yield (0, src_1.default)('/some/path', { test: 2 }, 'TestEntiti', (0, path_1.resolve)(__dirname, 'types.d.ts'))).toBe(true);
}));
(0, vitest_1.test)('待实现：解析 extends interface', () => {
    console.log('待实现');
});

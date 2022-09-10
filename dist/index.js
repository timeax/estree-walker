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
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWalk = exports.walk = void 0;
// @ts-check
const sync_js_1 = require("./sync.js");
const async_js_1 = require("./async.js");
/** @typedef { import('estree').BaseNode} BaseNode */
/** @typedef { import('./sync.js').SyncHandler} SyncHandler */
/** @typedef { import('./async.js').AsyncHandler} AsyncHandler */
/**
 *
 * @param {BaseNode} ast
 * @param {{
 *   enter?: SyncHandler
 *   leave?: SyncHandler
 * }} walker
 * @returns {BaseNode}
 */
function walk(ast, { enter, leave }) {
    const instance = new sync_js_1.SyncWalker(enter, leave);
    return instance.visit(ast, null);
}
exports.walk = walk;
/**
 *
 * @param {BaseNode} ast
 * @param {{
 *   enter?: AsyncHandler
 *   leave?: AsyncHandler
 * }} walker
 * @returns {Promise<BaseNode>}
 */
function asyncWalk(ast, { enter, leave }) {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = new async_js_1.AsyncWalker(enter, leave);
        return yield instance.visit(ast, null);
    });
}
exports.asyncWalk = asyncWalk;

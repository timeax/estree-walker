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
exports.AsyncWalker = void 0;
// @ts-check
const walker_js_1 = require("./walker.js");
/** @typedef { import('estree').BaseNode} BaseNode */
/** @typedef { import('./walker').WalkerContext} WalkerContext */
/** @typedef {(
 *    this: WalkerContext,
 *    node: BaseNode,
 *    parent: BaseNode,
 *    key: string,
 *    index: number
 * ) => Promise<void>} AsyncHandler */
class AsyncWalker extends walker_js_1.WalkerBase {
    /**
     *
     * @param {AsyncHandler} enter
     * @param {AsyncHandler} leave
     */
    constructor(enter, leave) {
        super();
        /** @type {AsyncHandler} */
        this.enter = enter;
        /** @type {AsyncHandler} */
        this.leave = leave;
    }
    /**
     *
     * @param {BaseNode} node
     * @param {BaseNode} parent
     * @param {string} [prop]
     * @param {number} [index]
     * @returns {Promise<BaseNode>}
     */
    visit(node, parent, prop, index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (node) {
                if (this.enter) {
                    const _should_skip = this.should_skip;
                    const _should_remove = this.should_remove;
                    const _replacement = this.replacement;
                    this.should_skip = false;
                    this.should_remove = false;
                    this.replacement = null;
                    yield this.enter.call(this.context, node, parent, prop, index);
                    if (this.replacement) {
                        node = this.replacement;
                        this.replace(parent, prop, index, node);
                    }
                    if (this.should_remove) {
                        this.remove(parent, prop, index);
                    }
                    const skipped = this.should_skip;
                    const removed = this.should_remove;
                    this.should_skip = _should_skip;
                    this.should_remove = _should_remove;
                    this.replacement = _replacement;
                    if (skipped)
                        return node;
                    if (removed)
                        return null;
                }
                for (const key in node) {
                    const value = node[key];
                    if (typeof value !== "object") {
                        continue;
                    }
                    else if (Array.isArray(value)) {
                        for (let i = 0; i < value.length; i += 1) {
                            if (value[i] !== null && typeof value[i].type === 'string') {
                                if (!(yield this.visit(value[i], node, key, i))) {
                                    // removed
                                    i--;
                                }
                            }
                        }
                    }
                    else if (value !== null && typeof value.type === "string") {
                        yield this.visit(value, node, key, null);
                    }
                }
                if (this.leave) {
                    const _replacement = this.replacement;
                    const _should_remove = this.should_remove;
                    this.replacement = null;
                    this.should_remove = false;
                    yield this.leave.call(this.context, node, parent, prop, index);
                    if (this.replacement) {
                        node = this.replacement;
                        this.replace(parent, prop, index, node);
                    }
                    if (this.should_remove) {
                        this.remove(parent, prop, index);
                    }
                    const removed = this.should_remove;
                    this.replacement = _replacement;
                    this.should_remove = _should_remove;
                    if (removed)
                        return null;
                }
            }
            return node;
        });
    }
}
exports.AsyncWalker = AsyncWalker;

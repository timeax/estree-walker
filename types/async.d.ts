/** @typedef { import('estree').BaseNode} BaseNode */
/** @typedef { import('./walker').WalkerContext} WalkerContext */
/** @typedef {(
 *    this: WalkerContext,
 *    node: BaseNode,
 *    parent: BaseNode,
 *    key: string,
 *    index: number
 * ) => Promise<void>} AsyncHandler */
export class AsyncWalker extends WalkerBase {
    /**
     *
     * @param {AsyncHandler} enter
     * @param {AsyncHandler} leave
     */
    constructor(enter: AsyncHandler, leave: AsyncHandler);
    /** @type {AsyncHandler} */
    enter: AsyncHandler;
    /** @type {AsyncHandler} */
    leave: AsyncHandler;
    /**
     *
     * @param {BaseNode} node
     * @param {BaseNode} parent
     * @param {string} [prop]
     * @param {number} [index]
     * @returns {Promise<BaseNode>}
     */
    visit(node: BaseNode, parent: BaseNode, prop?: string, index?: number): Promise<BaseNode>;
    should_skip: any;
    should_remove: any;
    replacement: any;
}
export type BaseNode = import('estree').BaseNode;
export type WalkerContext = import('./walker').WalkerContext;
export type AsyncHandler = (this: WalkerContext, node: BaseNode, parent: BaseNode, key: string, index: number) => Promise<void>;
import { WalkerBase } from "./walker.js";

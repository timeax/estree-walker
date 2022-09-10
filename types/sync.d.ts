/** @typedef { import('estree').BaseNode} BaseNode */
/** @typedef { import('./walker.js').WalkerContext} WalkerContext */
/** @typedef {(
 *    this: WalkerContext,
 *    node: BaseNode,
 *    parent: BaseNode,
 *    key: string,
 *    index: number
 * ) => void} SyncHandler */
export class SyncWalker extends WalkerBase {
    /**
     *
     * @param {SyncHandler} enter
     * @param {SyncHandler} leave
     */
    constructor(enter: SyncHandler, leave: SyncHandler);
    /** @type {SyncHandler} */
    enter: SyncHandler;
    /** @type {SyncHandler} */
    leave: SyncHandler;
    /**
     *
     * @param {BaseNode} node
     * @param {BaseNode} parent
     * @param {string} [prop]
     * @param {number} [index]
     * @returns {BaseNode}
     */
    visit(node: BaseNode, parent: BaseNode, prop?: string, index?: number): BaseNode;
    should_skip: any;
    should_remove: any;
    replacement: any;
}
export type BaseNode = import('estree').BaseNode;
export type WalkerContext = import('./walker.js').WalkerContext;
export type SyncHandler = (this: WalkerContext, node: BaseNode, parent: BaseNode, key: string, index: number) => void;
import { WalkerBase } from "./walker.js";

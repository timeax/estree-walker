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
export function walk(ast: BaseNode, { enter, leave }: {
    enter?: SyncHandler;
    leave?: SyncHandler;
}): BaseNode;
/**
 *
 * @param {BaseNode} ast
 * @param {{
 *   enter?: AsyncHandler
 *   leave?: AsyncHandler
 * }} walker
 * @returns {Promise<BaseNode>}
 */
export function asyncWalk(ast: BaseNode, { enter, leave }: {
    enter?: AsyncHandler;
    leave?: AsyncHandler;
}): Promise<BaseNode>;
export type BaseNode = import('estree').BaseNode;
export type SyncHandler = import('./sync.js').SyncHandler;
export type AsyncHandler = import('./async.js').AsyncHandler;

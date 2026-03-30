import { TreeNodeList, TreeNodePatch, TreeNodeWithChildren } from '../types';
import { getUUID } from './getUUID';

export const INITIAL_TREE_NODES: TreeNodeList[] = [
  { body: { id: '1', count: 10, sum: 100, name: 'Элемент 1' }, parentId: null },
  { body: { id: '2', count: 20, sum: 200, name: 'Элемент 2' }, parentId: '1' },
  { body: { id: '3', count: 30, sum: 300, name: 'Элемент 3' }, parentId: '1' },
  { body: { id: '4', count: 40, sum: 400, name: 'Элемент 4' }, parentId: '3' },
  { body: { id: '5', count: 50, sum: 500, name: 'Элемент 5' }, parentId: null },
  { body: { id: '6', count: 60, sum: 600, name: 'Элемент 6' }, parentId: '5' },
  { body: { id: '7', count: 70, sum: 700, name: 'Элемент 7' }, parentId: '4' },
  { body: { id: '8', count: 80, sum: 800, name: 'Элемент 8' }, parentId: '7' },
  { body: { id: '9', count: 90, sum: 900, name: 'Элемент 9' }, parentId: '4' },
  { body: { id: '10', count: 100, sum: 1000, name: 'Элемент 10' }, parentId: '9' },
  { body: { id: '11', count: 110, sum: 1100, name: 'Элемент 11' }, parentId: '3' },
  { body: { id: '12', count: 120, sum: 1200, name: 'Элемент 12' }, parentId: '11' },
];

export const createTreeNode = (parentId: string | null): TreeNodeList => ({
  body: {
    id: getUUID(),
    name: 'Новый элемент',
    count: 0,
    sum: 0,
  },
  parentId,
});

export const buildTree = (treeNodeList: TreeNodeList[]): TreeNodeWithChildren[] => {
  const nodeMap = new Map<string, TreeNodeWithChildren>();
  const roots: TreeNodeWithChildren[] = [];

  treeNodeList.forEach((node) => {
    nodeMap.set(node.body.id, { ...node, children: [] });
  });

  nodeMap.forEach((node) => {
    if (node.parentId === null) {
      roots.push(node);
      return;
    }

    const parent = nodeMap.get(node.parentId);

    if (parent) {
      parent.children.push(node);
      return;
    }

    roots.push(node);
  });

  return roots;
};

export const appendTreeNode = (
  treeNodeList: TreeNodeList[],
  parentId: string | null,
): TreeNodeList[] => [...treeNodeList, createTreeNode(parentId)];

export const removeTreeNode = (treeNodeList: TreeNodeList[], id: string): TreeNodeList[] => {
  const idsToDelete = new Set<string>([id]);
  let hasChanges = true;

  while (hasChanges) {
    hasChanges = false;

    treeNodeList.forEach((node) => {
      if (node.parentId !== null && idsToDelete.has(node.parentId) && !idsToDelete.has(node.body.id)) {
        idsToDelete.add(node.body.id);
        hasChanges = true;
      }
    });
  }

  return treeNodeList.filter((node) => !idsToDelete.has(node.body.id));
};

export const updateTreeNode = (
  treeNodeList: TreeNodeList[],
  id: string,
  patch: TreeNodePatch,
): TreeNodeList[] =>
  treeNodeList.map((node) =>
    node.body.id === id ? { ...node, body: { ...node.body, ...patch } } : node,
  );

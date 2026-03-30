import { useCallback, useState } from 'react';
import { OutlayList } from './OutlayList';
import { TreeNodePatch } from './types';
import {
  appendTreeNode,
  INITIAL_TREE_NODES,
  removeTreeNode,
  updateTreeNode,
} from './utils/tree';

export const TreeList = () => {
  const [treeList, setTreeList] = useState(INITIAL_TREE_NODES);

  const handleCreate = useCallback((parentId: string | null) => {
    setTreeList((prev) => appendTreeNode(prev, parentId));
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTreeList((prev) => removeTreeNode(prev, id));
  }, []);

  const handleUpdate = useCallback((id: string, body: TreeNodePatch) => {
    setTreeList((prev) => updateTreeNode(prev, id, body));
  }, []);

  return (
    <>
      <div className='p-5 text-[#666]'>
        Чтобы добавить новый пункт, нажмите на иконку рядом с нужной строкой. При
        удалении пункта автоматически удаляются все вложенные в него элементы.
      </div>
      <div>
        <OutlayList
          treeNodeList={treeList}
          onCreate={handleCreate}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </>
  );
};

import { useMemo } from 'react';
import { ListItemIcon } from './assets/icon';
import OutlayListItem from './OutlayListItem';
import { TreeNodeList, TreeNodePatch } from './types';
import { buildTree } from './utils/tree';

interface OutlayListProps {
  treeNodeList: TreeNodeList[];
  onCreate: (parentId: string | null) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, body: TreeNodePatch) => void;
}

export const OutlayList = ({
  treeNodeList,
  onCreate,
  onDelete,
  onUpdate,
}: OutlayListProps) => {
  const tree = useMemo(() => buildTree(treeNodeList), [treeNodeList]);

  return (
    <div className='flex flex-grow flex-col overflow-y-auto p-4'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='text-left text-[#A1A1AA]'>
            <th className='p-2'>
              <span className='relative flex items-center gap-3'>
                <button
                  className='relative z-10 flex h-8 w-8'
                  title='Создать корневой элемент'
                  onClick={() => onCreate(null)}
                >
                  <ListItemIcon />
                </button>
                <span>Уровень</span>
              </span>
            </th>
            <th className='min-w-[400px] p-2 pl-4'>Наименование</th>
            <th className='min-w-[200px] p-2 pl-4'>Кол-во</th>
            <th className='min-w-[200px] p-2 pl-4'>Сумма</th>
          </tr>
        </thead>

        <tbody>
          {tree.map((item, index) => (
            <OutlayListItem
              key={item.body.id}
              item={item}
              ancestorsHasNext={[]}
              isLast={index === tree.length - 1}
              isFirstChild={false}
              onCreate={onCreate}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

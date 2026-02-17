import { ListItemIcon } from './assets/icon';
import OutlayListItem from './OutlayListItem';
import { TreeNodeList, TreeNodeWithChildren } from './types';

interface OutlayListProps {
  treeNodeList: TreeNodeList[];
  onCreate: (parentId: string | null) => void;
  onDelete: (id: string) => void;
}

const buildTree = (treeNodeList: TreeNodeList[]): TreeNodeWithChildren[] => {
  const nodeMap = new Map<string, TreeNodeWithChildren>();
  const roots: TreeNodeWithChildren[] = [];

  treeNodeList.forEach((node) => {
    nodeMap.set(node.body.id, { ...node, children: [] });
  });

  nodeMap.forEach((node) => {
    if (!node.parentId) {
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

export const OutlayList = ({ treeNodeList, onCreate, onDelete }: OutlayListProps) => {
  const tree = buildTree(treeNodeList);

  return (
    <div className='p-4 overflow-y-auto flex-grow flex flex-col'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='text-[#A1A1AA] text-left'>
            <th className='p-2'>
              <span className='flex gap-3 relative items-center'>
                <button
                  className='w-8 h-8 relative z-10 flex'
                  title='Создать корневой элемент'
                  onClick={() => onCreate(null)}
                >
                  <ListItemIcon />
                </button>
                <span>Уровень</span>
              </span>
            </th>
            <th className='p-2 min-w-[400px]'>Наименование</th>
            <th className='p-2 min-w-[200px]'>Кол-во</th>
            <th className='p-2 min-w-[200px]'>Сумма</th>
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

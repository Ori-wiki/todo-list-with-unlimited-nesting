import { ListItemIcon, TrashItemIcon } from './assets/icon';
import ListConnection from './ListConnection';
import { ListPosition, TreeNodeWithChildren } from './types';

interface TreeNode {
  item: TreeNodeWithChildren;
  ancestorsHasNext: boolean[];
  isLast: boolean;
  isFirstChild: boolean;
  onCreate: (parentId: string | null) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    body: Partial<Pick<TreeNodeWithChildren['body'], 'name' | 'count' | 'sum'>>,
  ) => void;
}

const OutlayListItem = ({
  item,
  ancestorsHasNext,
  isLast,
  isFirstChild,
  onCreate,
  onDelete,
  onUpdate,
}: TreeNode) => {
  const parseOnlyDigits = (value: string): number => {
    const digits = value.replace(/\D/g, '');
    return digits === '' ? 0 : Number(digits);
  };

  const listPosition = [
    ...ancestorsHasNext.map((hasNext) =>
      hasNext ? ListPosition.BOUND : ListPosition.EMPTY,
    ),
    isLast
      ? ListPosition.END
      : isFirstChild && ancestorsHasNext.length > 0
        ? ListPosition.START
        : ListPosition.CENTER,
  ];

  return (
    <>
      <tr className='border-b border-[#414144]'>
        <td className='flex h-14 pr-3'>
          <ListConnection
            listPosition={listPosition}
            deep={listPosition.length}
          >
            <div className='flex gap-[2px] rounded-md justify-center w-fit bg-[#414144]'>
              <button
                className='w-[30px] h-[30px] relative z-10 flex'
                title='Create child element'
                onClick={() => onCreate(item.body.id)}
              >
                <ListItemIcon />
              </button>
              <button
                className='w-[30px] h-[30px] relative z-10 flex'
                title='Delete element'
                onClick={() => onDelete(item.body.id)}
              >
                <TrashItemIcon />
              </button>
            </div>
          </ListConnection>
        </td>
        <td className='px-2 h-16 align-middle min-w-[400px]'>
          <input
            className='bg-transparent pl-2 pr-2 pt-1 pb-1 w-full border border-transparent rounded-md outline-none focus:border-[#7890B2]'
            value={item.body.name}
            onChange={(e) => onUpdate(item.body.id, { name: e.target.value })}
          />
        </td>
        <td className='px-2 h-16 align-middle min-w-[200px]'>
          <input
            className='bg-transparent pl-2 pr-2 pt-1 pb-1 w-full border border-transparent rounded-md outline-none focus:border-[#7890B2]'
            inputMode='numeric'
            pattern='[0-9]*'
            value={item.body.count}
            onChange={(e) =>
              onUpdate(item.body.id, { count: parseOnlyDigits(e.target.value) })
            }
          />
        </td>
        <td className='px-2 h-16 align-middle min-w-[200px]'>
          <input
            className='bg-transparent pl-2 pr-2 pt-1 pb-1 w-full border border-transparent rounded-md outline-none focus:border-[#7890B2]'
            inputMode='numeric'
            pattern='[0-9]*'
            value={item.body.sum}
            onChange={(e) =>
              onUpdate(item.body.id, { sum: parseOnlyDigits(e.target.value) })
            }
          />
        </td>
      </tr>

      {item.children.map((child, index) => (
        <OutlayListItem
          key={child.body.id}
          item={child}
          ancestorsHasNext={[...ancestorsHasNext, !isLast]}
          isLast={index === item.children.length - 1}
          isFirstChild={index === 0}
          onCreate={onCreate}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
};

export default OutlayListItem;

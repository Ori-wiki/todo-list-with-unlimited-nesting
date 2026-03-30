import { memo } from 'react';
import { ListItemIcon, TrashItemIcon } from './assets/icon';
import ListConnection from './ListConnection';
import { ListPosition, TreeNodePatch, TreeNodeWithChildren } from './types';
import { parseNumericInput } from './utils/parseNumericInput';

interface OutlayListItemProps {
  item: TreeNodeWithChildren;
  ancestorsHasNext: boolean[];
  isLast: boolean;
  isFirstChild: boolean;
  onCreate: (parentId: string | null) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, body: TreeNodePatch) => void;
}

const inputClassName =
  'w-full rounded-md border border-transparent bg-transparent px-2 py-1 outline-none focus:border-[#7890B2]';

const getListPosition = (
  ancestorsHasNext: boolean[],
  isLast: boolean,
  isFirstChild: boolean,
): ListPosition[] => [
  ...ancestorsHasNext.map((hasNext) => (hasNext ? ListPosition.BOUND : ListPosition.EMPTY)),
  isLast
    ? ListPosition.END
    : isFirstChild && ancestorsHasNext.length > 0
      ? ListPosition.START
      : ListPosition.CENTER,
];

const OutlayListItemComponent = ({
  item,
  ancestorsHasNext,
  isLast,
  isFirstChild,
  onCreate,
  onDelete,
  onUpdate,
}: OutlayListItemProps) => {
  const listPosition = getListPosition(ancestorsHasNext, isLast, isFirstChild);

  return (
    <>
      <tr className='border-b border-[#414144]'>
        <td className='flex h-14 pr-3'>
          <ListConnection listPosition={listPosition}>
            <div className='flex w-fit justify-center gap-[2px] rounded-md bg-[#414144]'>
              <button
                className='relative z-10 flex h-[30px] w-[30px]'
                title='Создать дочерний элемент'
                onClick={() => onCreate(item.body.id)}
              >
                <ListItemIcon />
              </button>
              <button
                className='relative z-10 flex h-[30px] w-[30px]'
                title='Удалить элемент'
                onClick={() => onDelete(item.body.id)}
              >
                <TrashItemIcon />
              </button>
            </div>
          </ListConnection>
        </td>
        <td className='h-16 min-w-[400px] px-2 align-middle'>
          <input
            className={inputClassName}
            value={item.body.name}
            onChange={(event) => onUpdate(item.body.id, { name: event.target.value })}
          />
        </td>
        <td className='h-16 min-w-[200px] px-2 align-middle'>
          <input
            className={inputClassName}
            inputMode='numeric'
            pattern='[0-9]*'
            value={item.body.count}
            onChange={(event) =>
              onUpdate(item.body.id, { count: parseNumericInput(event.target.value) })
            }
          />
        </td>
        <td className='h-16 min-w-[200px] px-2 align-middle'>
          <input
            className={inputClassName}
            inputMode='numeric'
            pattern='[0-9]*'
            value={item.body.sum}
            onChange={(event) =>
              onUpdate(item.body.id, { sum: parseNumericInput(event.target.value) })
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

const OutlayListItem = memo(OutlayListItemComponent);

export default OutlayListItem;

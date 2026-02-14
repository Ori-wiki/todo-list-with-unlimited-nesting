import { ListItemIcon, TrashItemIcon } from './assets/icon';
import ListConnection from './ListConnection';
import { ListPosition, TreeNodeWithChildren } from './types';

interface TreeNode {
  item: TreeNodeWithChildren;
  ancestorsHasNext: boolean[];
  isLast: boolean;
  isFirstChild: boolean;
}

const OutlayListItem = ({
  item,
  ancestorsHasNext,
  isLast,
  isFirstChild,
}: TreeNode) => {
  const listPosition = [
    ...ancestorsHasNext.map((hasNext) =>
      hasNext ? ListPosition.BOUND : ListPosition.EMPTY
    ),
    isLast
      ? ListPosition.END
      : isFirstChild && ancestorsHasNext.length > 0
      ? ListPosition.START
      : ListPosition.CENTER,
  ];

  return (
    <>
      <tr>
        <td className='flex h-14 pr-3'>
          <ListConnection
            listPosition={listPosition}
            deep={listPosition.length}
          >
            <div className='flex gap-[2px] rounded-md justify-center w-fit bg-[#414144]'>
              <button
                className='w-[30px] h-[30px] relative z-10 flex'
                title='Create child element'
              >
                <ListItemIcon />
              </button>
              <button
                className='w-[30px] h-[30px] relative z-10 flex'
                title='Delete element'
              >
                <TrashItemIcon />
              </button>
            </div>
          </ListConnection>
        </td>
        <td className='p-2 h-16 align-middle min-w-[400px]'>{item.body.name}</td>
        <td className='p-2 h-16 align-middle min-w-[200px]'>{item.body.count}</td>
        <td className='p-2 h-16 align-middle min-w-[200px]'>{item.body.sum}</td>
      </tr>

      {item.children.map((child, index) => (
        <OutlayListItem
          key={child.body.id}
          item={child}
          ancestorsHasNext={[...ancestorsHasNext, !isLast]}
          isLast={index === item.children.length - 1}
          isFirstChild={index === 0}
        />
      ))}
    </>
  );
};

export default OutlayListItem;

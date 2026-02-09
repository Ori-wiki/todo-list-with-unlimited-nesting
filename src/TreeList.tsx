import { OutlayList } from './OutlayList';

const treeList = [
  {
    body: {
      id: '3e3e3e',
      count: 10,
      sum: 1000,
      name: 'zxc',
    },
    parentId: null,
  },
  {
    body: {
      id: '4e3e3e',
      count: 20,
      sum: 2000,
      name: 'zxc',
    },
    parentId: null,
  },
  {
    body: {
      id: '5e3e3e',
      count: 30,
      sum: 3000,
      name: 'zxc',
    },
    parentId: null,
  },
  {
    body: {
      id: '6e3e3e',
      count: 40,
      sum: 4000,
      name: 'zxc',
    },
    parentId: null,
  },
];

export const TreeList = () => {
  return (
    <>
      <div className='p-5 text-[#666]'>
        ***& Для редактирования элемента дважды кликнете по нужной строке. По
        нажатию Escape можно выйти из режима редактирования или создания нового
        элемента. Для создания элемента или его удаления (вместе с дочерними),
        нажмите иконки в соответствущей строке
      </div>
      <div className=''>
        <OutlayList treeNodeList={treeList} />
      </div>
    </>
  );
};

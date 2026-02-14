import { OutlayList } from './OutlayList';
import { TreeNodeList } from './types';

const treeList: TreeNodeList[] = [
  {
    body: {
      id: '1',
      count: 10,
      sum: 100,
      name: 'Элемент 1',
    },
    parentId: null,
  },
  {
    body: {
      id: '2',
      count: 20,
      sum: 200,
      name: 'Элемент 2',
    },
    parentId: '1',
  },
  {
    body: {
      id: '3',
      count: 30,
      sum: 300,
      name: 'Элемент 3',
    },
    parentId: '1',
  },
  {
    body: {
      id: '4',
      count: 40,
      sum: 400,
      name: 'Элемент 4',
    },
    parentId: '3',
  },
  {
    body: {
      id: '5',
      count: 50,
      sum: 500,
      name: 'Элемент 5',
    },
    parentId: null,
  },
  {
    body: {
      id: '6',
      count: 60,
      sum: 600,
      name: 'Элемент 6',
    },
    parentId: '5',
  },
  {
    body: {
      id: '7',
      count: 70,
      sum: 700,
      name: 'Элемент 7',
    },
    parentId: '4',
  },
  {
    body: {
      id: '8',
      count: 80,
      sum: 800,
      name: 'Элемент 8',
    },
    parentId: '7',
  },
  {
    body: {
      id: '9',
      count: 90,
      sum: 900,
      name: 'Элемент 9',
    },
    parentId: '4',
  },
  {
    body: {
      id: '10',
      count: 100,
      sum: 1000,
      name: 'Элемент 10',
    },
    parentId: '9',
  },
  {
    body: {
      id: '11',
      count: 110,
      sum: 1100,
      name: 'Элемент 11',
    },
    parentId: '3',
  },
  {
    body: {
      id: '12',
      count: 120,
      sum: 1200,
      name: 'Элемент 12',
    },
    parentId: '11',
  },
];

export const TreeList = () => {
  return (
    <>
      <div className='p-5 text-[#666]'>
        *** Для редактирования элемента дважды кликнете по нужной строке. По
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

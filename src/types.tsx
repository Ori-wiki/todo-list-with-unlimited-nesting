export interface DataBodyItem {
  name: string;
  count: number;
  sum: number;
}

export interface DataItem extends DataBodyItem {
  id: string;
  children: DataItem[];
}

export type TreeNodeBody = Omit<DataItem, 'children'>;

export interface TreeNodeList {
  body: TreeNodeBody;
  parentId: string | null;
}

export interface TreeNodeWithChildren extends TreeNodeList {
  children: TreeNodeWithChildren[];
}

export enum ListPosition {
  START = '+',
  END = '-',
  CENTER = '>',
  EMPTY = '#',
  BOUND = '|',
}

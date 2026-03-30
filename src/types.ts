export interface TreeNodeBody {
  id: string;
  name: string;
  count: number;
  sum: number;
}

export interface TreeNodeList {
  body: TreeNodeBody;
  parentId: string | null;
}

export interface TreeNodeWithChildren extends TreeNodeList {
  children: TreeNodeWithChildren[];
}

export type TreeNodePatch = Partial<Pick<TreeNodeBody, 'name' | 'count' | 'sum'>>;

export enum ListPosition {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  EMPTY = 'empty',
  BOUND = 'bound',
}

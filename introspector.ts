
export type CallbackInput = {
       name:string;
}

export type CallbackOutput = {
       name:string;
}

export interface iFrame {
    id: number;
    name: string;
    fileName: string;
    functionName: string;
    lineNumber: number;
    columnNumber: number;
    target: string;
    type: string;
    category: string;
    isOptimized: boolean,
    isUnoptimized: boolean;
    isInlinable: boolean;
    isInit: boolean;
    isWasm: boolean;
    value: number;
    onStackTop: string;
    children: iFrame[];
};

export interface TreeNode {
  id?: string;
  children?: TreeNode[];
  onStackTop: {
    asViewed: number;
    rootFromMean?: number;
  };
  value?: number;
  original?: number;
  category?: string;
  type?: string;
  data?: TreeNode;
}

export interface Tree {
  merged: TreeNode;
  unmerged: TreeNode;
  codeAreas: any;
  appName: string;
  pathSeparator: string;
}

class DataTree {
  merged!: TreeNode;
  unmerged!: TreeNode;
  codeAreas: any;
  appName!: string;
  pathSeparator!: string;
  mergedNodes!: TreeNode[];
  unmergedNodes!: TreeNode[];
  useMerged!: boolean;
  showOptimizationStatus!: boolean;
  exclude!: Set<string>;
  flatByHottest!: TreeNode[] | null;
  mean!: number;
  highestStackTop!: number;
  maxRootAboveMean!: number;
  maxRootBelowMean!: number;
  totalFrames!: number | null;
  groupedSortValues!: Map<TreeNode, number> | null;
}



export type StringCallback = (x: string) => CallbackOutput;
export type FilterFunctionCallback = (function_name: iFrame) => boolean
//export type Example1 = (event: any) => DataFrame<number, never>;
export interface Introspector {
    (): Callback;// the default function
    filter_current_value: FilterFunctionCallback;
//    enter_test_driver:Callback
//    leave_test_driver:Callback
//    wrapper_rdf:Callback
    debug:StringCallback
}

export function isp_self(subj:string,callback:Introspector) :void {
  console.log("self"+ subj);
  //return {name:"nope"}
}
export type Callback = (x: CallbackInput, y:Introspector) => CallbackOutput;
export type MaybeTree = Tree | undefined;
export type StringToTreeCallback = (x:string, y:Introspector) => MaybeTree;
export type RdfCallback = (subj: string,callback:Introspector) => void;
export type RdfPredCallback = (x: RdfCallback,subj:string,callback:Introspector) => void;

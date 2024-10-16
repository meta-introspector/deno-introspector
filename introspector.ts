
export type CallbackInput = {
       name:string;
}
export type CallbackOutput = {
       name:string;
}
export type Callback = (x: CallbackInput) => CallbackOutput;
export type StringCallback = (x: string) => CallbackOutput;
export type FilterFunctionCallback = (function_name: string) => boolean
//export type Example1 = (event: any) => DataFrame<number, never>;
export interface Introspector {
    (): Callback;// the default function
    filter_current_value: FilterFunctionCallback;
//    enter_test_driver:Callback
//    leave_test_driver:Callback
//    wrapper_rdf:Callback
    debug:StringCallback
}

export function isp_self(x: CallbackInput) :CallbackOutput {
    console.log("self"+ x);
}

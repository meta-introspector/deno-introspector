import type { Functions } from "./functions.ts";
import { statement } from "./statement.ts";
import { isp_clinic_report } from "./clinic_report.ts";
import { isp_self } from "./introspector.ts";
import type { _Introspetor,CallbackOutput } from "./introspector.ts";
import { rdf_type } from "./rdf_type.ts";

const functions: Functions = {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement' : statement,
    'isp:clinic_report' : isp_clinic_report,
    'isp:self' : isp_self,
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': rdf_type
}

export function find_function(x:string, _callback:Introspector):CallbackOutput {
    // skip callback for now
    return functions[x];
}

export type Callback = (x: string) => void;
export function set_function(x:string,y:Callback):Callback {
    return functions[x]=y;
}

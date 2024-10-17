//import type { Functions } from "./functions.ts";
import { statement } from "./statement.ts";
import { isp_clinic_report } from "./clinic_report.ts";
import { isp_self } from "./introspector.ts";
import type { Introspector,
  //CallbackOutput,
  RdfCallback, RdfPredCallback } from "./introspector.ts";
import { rdf_type } from "./rdf_type.ts";

export interface ObjFunctions {
  [key: string]: RdfCallback;
}
export interface PredFunctions {
  [key: string]: RdfPredCallback;
}

const functions: ObjFunctions = {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement' : statement,
    'isp:clinic_report' : isp_clinic_report,
    'isp:self' : isp_self,
  //    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': rdf_type
}



//import type { Callback } from "./introspector.ts";

export function find_function(x:string, _callback:Introspector):RdfCallback {
    // skip callback for now
    return functions[x];
}

const pred_functions: PredFunctions = {
  //'http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement' : statement,
  //'isp:clinic_report' : isp_clinic_report,
  //'isp:self' : isp_self,
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': rdf_type
}

export function find_pred_function(x:string, _callback:Introspector):RdfPredCallback {
    // skip callback for now
    return pred_functions[x];
}


//export function set_function(x:string,y:RdfCallback):Callback {
//    return functions[x]=y;
//}

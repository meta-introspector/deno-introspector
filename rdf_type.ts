
import type { Introspector,CallbackOutput,RdfCallback,RdfPredCallback } from "./introspector.ts";

//type TypeObjectCallback = (subject:string,callback:Introspector) => string;
export function rdf_type(type_function: RdfCallback, subj:string,callback:Introspector):void {
    //const obj =  obj;
    //console.log("rdf_type type_obj: " + type_obj);
//    console.log("type_obj:" + typeof(type_obj) );
    //console.log("rdf type subj:" + typeof(subj) );
  if (typeof(type_function)=="function") {
    if(callback.debug){
      callback.debug("rdf_type");
    }
    const instance = type_function(subj,callback);
    //console.log("rdf_type instance:" + type_function + " result: "+ instance );
    return instance;
  }    
}

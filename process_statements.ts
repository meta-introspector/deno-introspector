import type { RdfObject } from "./rdf.ts";
import { find_function, set_function } from "./rdf_callbacks.ts";
import { missing } from "./missing.ts";
import type { Introspector } from "./introspector.ts";

export function process_statement (_z:Error,y:RdfObject,callback:Introspector) {
    //console.log(z);
  if (y) {
    if (callback){
      if (callback.debug) {
	callback.debug("process_statement");
      }
    }
    const obj:string = y._object.id;
    const ofun = find_function(obj,callback);  // isp_report	
    const pred:string = y._predicate.id;
    const pfun = find_function(pred,callback); // type
    const subj:string = y._subject.id;
    if (pfun) {
      if (ofun) {
	if (callback.debug) {
	  callback.debug("pfun");
	}
	pfun(ofun, subj, callback); // type(isp_report, data
      } else {
	set_function(obj,missing);
      }
    }
  }
}

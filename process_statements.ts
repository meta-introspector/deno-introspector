import type { RdfObject } from "./rdf.ts";
import { find_function, find_pred_function,
} from "./rdf_callbacks.ts";
//, set_function
import { missing } from "./missing.ts";
import type { Introspector,  RdfCallback,
  RdfPredCallback
 } from "./introspector.ts";

export function process_statement (_z:string,y:RdfObject,callback:Introspector) {
    //console.log(z);
  if (y) {
    if (callback){
      if (callback.debug) {
	callback.debug("process_statement");
      }
    }
    const obj:string = y._object.id;
    const ofun:RdfCallback = find_function(obj,callback);  // isp_report	
    const pred:string = y._predicate.id;
    const pfun:RdfPredCallback = find_pred_function(pred,callback); // type
    const subj:string = y._subject.id;
    if (pfun) {
      if (ofun) {
	if (callback.debug) {
	  callback.debug("pfun");
	}
	pfun(ofun, subj, callback); // type(isp_report, data
      } else {
	//set_function(obj,missing);
      }
    }
  }
}

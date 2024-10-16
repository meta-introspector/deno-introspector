import type { RdfObject } from "./rdf.ts";
import type { CallbackOutput } from "./introspector.ts";
export function missing(x: RdfObject):CallbackOutput {
    if (x) {
	if (x._object) {
	    if (x._object.id) {
		console.log("missing"+ x._object.id);
	    }}}
}

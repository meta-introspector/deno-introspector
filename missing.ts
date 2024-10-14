export function missing(x: any) {
    if (x) {
	if (x._object) {
	    if (x._object.id) {
		console.log("missing"+ x._object.id);
	    }}}
}

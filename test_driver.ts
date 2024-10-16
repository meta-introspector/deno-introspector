import * as N3 from "npm:n3@1.22.3"
//import * as fs from 'node:fs';
import { process_statement } from "./process_statements.ts";
//import type { Callback } from "./introspector.ts";

import type { rdf_type } from "./rdf_type.ts";
type Error=string;

export function test_driver(callback:Introspector) {
//    callback.enter_test_driver();
  const parser = new N3.Parser();
  // function chunk(chunk) {
  //     console.log(chunk.toString());
  // };
  // function end() {
  //   console.log("END");
  // }

  
  function wrapper(x:Error,y:rdf_type //,prefixes:any
  ){
    //callback.wrapper_rdf();
    //console.log("wrapper1",x,y,prefixes);
    process_statement(x,y,callback);
  }
  
  const bytes = Deno.readFileSync("introspector.ttl");
  const decoder = new TextDecoder().decode(bytes);
  const ret = parser.parse(decoder, wrapper);
  console.log("finished",ret);
  //  rdfStream.close();
}

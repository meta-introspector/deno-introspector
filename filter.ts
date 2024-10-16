import { test_driver } from "./test_driver.ts";
import type { Introspector,CallbackOutput,CallbackInput } from "./introspector.ts";
import * as dataForge from "npm:data-forge@1.10.2"

export function add_to_frame(_results:string,
  _name:string,
  _value:string):void {
    console.log(name,value);
}

export function find_calls(_event:string,
  _filter:string):void {
}

//(event: any) => DataFrame<number, never>

export function test_frame():void{
  console.log("hello test frame");
  const empty_frame =  new dataForge.DataFrame([]);
  
  function filter_function_name(function_name:string):boolean {
    console.log("filter"+function_name);
    return true;
  }
  
  //  let visitor2 = <Introspector>function (event:CallbackInput) {
  //    return {name:"foo"} as CallbackOutput;
  //}
  
  const visitor = <Introspector>function (_event: CallbackInput) : CallbackOutput{
    console.log("visitor");
    //function visit_function_name(function_name:string, function_value:any):void {
    // add_to_frame(empty_frame,function_name, function_value);
    //}
    return function returnframe() { return empty_frame;  };
  };
  
  visitor.filter_current_value= filter_function_name; // save part of the callback
  
  visitor.debug= function(x:string):CallbackOutput{
    console.log("debug",x);
    return {name:x};
    }

  test_driver(visitor);

  console.log("frame count",empty_frame.count());
}// test frame


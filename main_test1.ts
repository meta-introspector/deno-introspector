//import { assertEquals } from "@std/assert";
//import { add } from "./main.ts";
import type { _Introspector,
  //CallbackOutput,
  //CallbackInput
} from "./introspector.ts";

//import { test_driver } from "./test_driver.ts";
import { test_frame } from "./filter.ts";

// function foo(a:CallbackInput):CallbackOutput
// {
//   console.log(a);
//   return a;
// }

function main():void {
  console.log("debug1");
  const a = test_frame();
  console.log("debugb",a);
}

main();
  
//console.log("debug2");
//test_frame();
//console.log("debug3");





import { test_driver } from "./test_driver.ts";
import type { Introspector,CallbackOutput,CallbackInput,iFrame,Accumulator,Accumulated } from "./introspector.ts";
//import type * as dataForge from "npm:data-forge@1.10.2"

// export function add_to_frame(_results:string,
//   name:string,
//   value:string):void {
//     console.log(name,value);
// }

export function find_calls(_event:string,
  _filter:string):void {
}

//(event: any) => DataFrame<number, never>

// Define the type for the accumulator instance
interface NameCount {
  name: string;
  count: number;
}

// Create a singleton functor with many properties
function createAccumulator(): Accumulator {
  const resultsList: Accumulated[] = [];

  // the function returned
  function accumulator(value: Accumulated): Accumulated {
    resultsList.push(value);
    return value;
  }

  function getResults(): Accumulated[] {
    return resultsList;
  }

  function renderHtml(): string {
    const html = resultsList.map((result) => `<p>${result}</p>`).join('');
    return `<html><body>${html}</body></html>`;
  }

  function renderJson(): string {
    return JSON.stringify(resultsList, null, 2);
  }

  function renderConsole(): void {
    console.log('Accumulator Results:');
    resultsList.forEach((result) => console.log(result));
  }

  accumulator.results = getResults;
  accumulator.renderHtml = renderHtml;
  accumulator.renderJson = renderJson;
  accumulator.renderConsole = renderConsole;

  return accumulator;
}

// Create a singleton functor with many properties
function createAccumulated(value:NameCount): Accumulated {
  let _result: NameCount=value;
  function accumulator(value: NameCount): NameCount {
    _result = value;
    return value;
  }
  function getResult(): NameCount {
    return _result;
  }

  function renderHtml(): string {
    const html = `<p>${JSON.stringify(_result)}</p>`;
    return `<html><body>${html}</body></html>`;
  }

  function renderJson(): string {
    return JSON.stringify(_result, null, 2);
  }
 
  function renderConsole(): void {
    console.log('Accumulator Results:');
    console.log(_result);
  }

  accumulator.results = getResult;
  accumulator.renderHtml = renderHtml;
  accumulator.renderJson = renderJson;
  accumulator.renderConsole = renderConsole;

  return accumulator;
}


// Create a singleton instance of the accumulator
const nameCountAccumulator = createAccumulator();


export function test_frame():void{
  console.log("hello test frame");

  //  var data_list = [];
  //var empty_frame1 =  new dataForge.DataFrame([]);
  
  function filter_function_name(_frame:iFrame):boolean {
    //console.log("filter"+frame);
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
    return {name:"fixme"};
  };  
  visitor.filter_current_value= filter_function_name; // save part of the callback
  visitor.accumulator = createAccumulator();
  visitor.debug= function(x:string):CallbackOutput{
    
    //console.log("debug",x);
    //const callback =foo;
    const a = createAccumulated({count:1,name:x});
    //a[x]=1;
    //let newRow = new dataForge.DataFrame([a]);
    //empty_frame1 = empty_frame1.concat(newRow);
    visitor.accumulator(a);

    //empty_frame.count()
    //console.log("frame count",empty_frame.count());
    return {name:x};
    }

  //console.log("frame count before",empty_frame);
  
  //  console.log("frame count",empty_frame1.count());
  test_driver(visitor);
  //var empty_frame1 =  new dataForge.DataFrame(data_list);
  //console.log("frame count after",empty_frame);
  //console.log("frame count",empty_frame1.count());
}// test frame


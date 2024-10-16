import type { Functions } from "./functions.ts"
import { missing } from "./missing.ts"
import { associate_cache, save_cache } from "./cache.ts"
import type { Introspector,CallbackReturn,Callback } from "./introspector.ts";
import * as fs from 'node:fs';

function process_chunk(line:string,callback:Callback)
{
    const begins = "module.exports="
    if (line) {
	if (line.includes) {
	    if (line.includes("childrenVisibilityToggle") && (line.includes(begins))) {
		const bl = begins.length;
		//console.log("chunk: " + line.substring(bl,20));
		const chunk = line.substring(bl,line.length);
		const obj = JSON.parse(chunk)
		//let runnable = eval(line);
		//runnable.Run("module.exports").then((result:string)=>{console.log(result);});
		// console.log(JSON.stringify(obj,null,2));
		//	callback.process_raw_module_export(obj);
	      if(callback.debug) {
		callback.debug("got chunk");
	      }
	      return obj;
	    }	    
	}
	else {
	    //console.log("no function")
	}
    }
    else {
	//console.log("no line")
    }

    return undefined;
}

export interface iFrame {
    id: number;
    name: string;
    fileName: string;
    functionName: string;
    lineNumber: number;
    columnNumber: number;
    target: string;
    type: string;
    category: string;
    isOptimized: boolean,
    isUnoptimized: boolean;
    isInlinable: boolean;
    isInit: boolean;
    isWasm: boolean;
    value: number;
    onStackTop: string;
    children: iFrame[];
};

//Object.getOwnPropertyNames(obj).forEach(report);
//appName
//pathSeparator
//codeAreas
//merged
//unmerged


function frame_test(f: iFrame,parent:string,callback:Callback){
    function report_child(_previousValue: iFrame,
			  currentValue: iFrame,
			  _currentIndex: number,
			  _array: iFrame[],
			  parent_name:string,
			  callback:Callback): iFrame {

			    if(callback.debug) {
			      callback.debug("report child");
			    }
	if(!callback.filter_current_value(currentValue))
	    //	if (! currentValue.name.includes("o1js"))
	{
	    return {value: 0} as iFrame // return a new object with just the value
	}
	const name = parent_name + "|" +currentValue.name;
	//console.log(	    "previousValue",	    JSON.stringify(previousValue).length);
	//console.log("previousValue.name",previousValue.name);
//	console.log("currentValue",JSON.stringify(currentValue).length);
	//console.log("name",currentValue.name);

//	console.log("name",name);
//	console.log("functionName",currentValue.functionName);
	//console.log("type",currentValue.type); v8
	//console.log("target",currentValue.target); empty
	//console.log("category",currentValue.category);  all-v8
	
//	console.log("currentIndex",JSON.stringify(currentIndex));
//	console.log("array",JSON.stringify(array.length))
	
///	console.log("array[*] join name",array.map( (x) => x.name).join("|"))
	
	let sum = 0;
	if (currentValue){
	  sum = sum + currentValue.value; // add the current value
	  //if(callback.debug) {
	    //	    callback.debug("check")
	    //}
	    sum = sum + frame_test(currentValue,name,callback); // add the children
	}
	const ret  = {value: sum} as iFrame // return a new object with just the value
	return ret;
    }
    
    function wrapper(previousValue: iFrame, currentValue: iFrame, currentIndex: number, array: iFrame[]): iFrame {
	return report_child(previousValue,
			    currentValue,
			    currentIndex,
			    array,
			    parent,
			    callback);
    }
  if(callback.debug) {
    callback.debug("reduce");
  }
  const res = f.children.reduce(wrapper,{value:f.value} as iFrame); //recurse
  //console.log(JSON.stringify(res.value));
  return res.value;
}

function createRunningSumFunctor(f:Callback,callback:Introspector) {
  if(callback.debug) {
    callback.debug("runningsum");
  }
  //let objects:object[] = [];
    let sum:number = 0;
    return function(value?: string): number {
	if (value !== undefined) {
	    
	    const obj = f(value,callback);// apply f
	    if (obj !== undefined) {
	      const report_child2=(value:object,_index:number)=>{
		if (value){
		  const res = frame_test(value as iFrame, "root", callback);
		  sum = sum + res
		}
	      }
	      //obj.merged.children.forEach(report);
	      obj.unmerged.children.forEach(report_child2);		
	      //obj.merged.forEach(report);
	      //obj.unmerged.forEach(report);	      
	      //sum.push(obj);
	    }
	}
	return sum;
    };
}

function process_flame_report(filename:string, data:string, callback:Introspector) {
  if(callback.debug) {
    callback.debug("flame");
  }
  const sumfunc:Callback = createRunningSumFunctor(process_chunk,callback);
  if (data) {
    data.split("\n").forEach(sumfunc);
  }
  const sum:number = sumfunc(callback);
  console.log(filename + "sum : " + sum);
  return sum;
}

function createProcessor(filename:string,callback:Introspector) {
    return function(_err:string, data:string) {	
	return process_flame_report(filename, data, callback);
    }
}

function isp_clinic_flame_report(report_url:string, data:CallbackInput, callback:Introspector) {
  //console.log("file: " + data.newpath);
  if(callback.debug) {
    callback.debug("ispflame");
  }
  const functor = createProcessor(data.newpath,callback);
  fs.readFile(data.newpath, "utf-8",functor);
  return "flame report:" + report_url;
}

const clinic_functions: Functions = {
    'clinic-flame': isp_clinic_flame_report
}

export function isp_clinic_report(report_url:string,callback:Introspector):CallbackReturn {

  if(callback.debug) {
    callback.debug("clinic report");
  }
    const reportUrl = new URL(report_url);
    const parts = reportUrl.pathname.split("/");
    const hostname = reportUrl.hostname;
    const filename  = parts[parts.length-1];
    const fnparts  = filename.split(".")
    const fntype  = fnparts[fnparts.length -2];

    const callback_function = clinic_functions[fntype]
    // now lets construct a cache
    const cached = associate_cache(report_url,hostname,parts,fnparts);
    const data = "missing";

    if (callback_function) {
	data = callback_function(report_url, cached, callback);
    } else {
	console.log("missing: " + fntype);
	clinic_functions[fntype] = missing;
    }

    return save_cache(report_url, hostname, parts, fnparts, cached,data);
}

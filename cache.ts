//
export interface Struct {
 newpath : string;
};

export function associate_cache(_url: string,
				hostname: string,
				url_parts :string[],
				fn_parts:string[]): Struct {
				  //    const alen = url_parts.length-1;
    //const filename  = url_parts[url_parts.length-1];
    //console.log("cache url: " + url);
    //console.log("cache: parts:" + url_parts.slice(6,alen +1));
    const hostname_base = hostname.split(".")[0]
    const newpath = "../inputs/" + hostname_base + url_parts.slice(0,4).join("/") + "/"+ fn_parts.join(".");
    //console.log("cache: slice:" + newpath);
    return {
	"newpath" : newpath
    };    
}

export function save_cache(_url:string,
			   _hostname: string,
			   _url_parts:string[],
			   _fn_parts: string[],
			   _cached:Struct,
  _results:Struct):void {}

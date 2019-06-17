
export interface iActionType{
    type:number, 
    data:any|any[],
}

export interface Dictionary<T>{
	[idx:string]:T;
}



export interface iGesture{
    key:string;
    label:string;
    icon:string;
    beats:string[];
}
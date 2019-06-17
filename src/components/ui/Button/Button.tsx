import * as React from 'react'; 


export interface ButtonProps{
    onClick:(e:any)=>void;
    className?:string;
}

export const Button:React.SFC<ButtonProps> = (props)=>{
    let cls = props.className || ""; 
    return (
        <div className={"button " + cls} onClick={props.onClick} >
            <div className="button__label">
                {props.children}
            </div>
        </div>
    )
}



import * as React from 'react'; 


export interface PanelProps{
    className?:string;
}


export const Panel: React.SFC<PanelProps> = (props)=>{

    let cls = props.className || "";
    return (
        <div className={"panel " + cls}>
            {props.children}
        </div>
    )
}
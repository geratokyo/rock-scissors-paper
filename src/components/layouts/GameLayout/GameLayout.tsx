import * as React from 'react'; 


export interface GameLayoutProps{
    className?:string;
}


export const GameLayout: React.SFC<GameLayoutProps> = (props)=>{

    let cls = props.className || "";
    return (
        <div className={"game-layout " + cls}>
            {
                props.children
            }
        </div>
    )
}
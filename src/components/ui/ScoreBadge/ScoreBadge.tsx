import * as React from 'react';
import * as _ from 'lodash';

export interface ScoreBadgeProps {
    className?: string;
    score: number;
}

const count = [1,2,3]; 
export const ScoreBadge: React.SFC<ScoreBadgeProps> = (props) => {

    let cls = props.className || "";
    return (
        <div className={"score-badge " + cls}>
            {
                count.map((e) => {
                    return <ScoreBullet isActive={e <= props.score} key={e} />
                })
            }
        </div>
    )
}


const ScoreBullet: React.SFC<any> = (props) => {
    return <div className={"score-badge__bullet " + (props.isActive && "score-badge__bullet--active")}></div>
}

import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IStoreState } from '../../_reducers';
import { RouteComponentProps } from 'react-router';
import { iPlayer } from '../../services/Player';
import { Button } from '../../components/ui/Button/Button';


export interface ResultProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    winner: iPlayer;
}

const INIT_STATE: ResultState = {

}

export interface ResultState {

}


export class Result extends React.Component<ResultProps, ResultState>{

    constructor(props: ResultProps) {
        super(props);
        this.state = INIT_STATE;
    }

    render() {
        let { props, state } = this;
        let cls = this.props.className || "";
        return (
            <div className={"result " + cls}>
                <h3 className="animated fadeInUp delay-2 speed-6">The winner of the game</h3>
                <h1 className="animated fadeInUp delay-4 speed-6">{props.winner.label}</h1>
                <a className="animated fadeInUp delay-6 speed-6" href="">Restart</a>
            </div>
        )
    }
}




const mapStateToProps = (state: IStoreState, ownProps): Partial<ResultProps> => {
    return {
        winner: state.app.winningPlayer
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Result);
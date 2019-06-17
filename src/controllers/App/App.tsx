import * as React from 'react';
import { AppProps, inAppState, inAppInitialState } from './StateAndProps';
import { ACTIONS, TYPES } from './Actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
    HashRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import IntroPage from '../../pages/IntroPage/IntroPage';
import PlayerVsNpc from '../../pages/PlayerVsNpc/PlayerVsNpc';
import NpcVsNpc from '../../pages/NpcVsNpc/NpcVsNpc';
import Result from '../../pages/Result/Result';

export const STATE_KEY = 'app';

class App extends React.Component<AppProps, inAppState>{
    constructor(props:AppProps) {
        super(props);
        this.state = inAppInitialState;
    }

    componentDidMount(){
    }

    render() {
        let state = this.state,
            props = this.props;
        return (
            <div className={`app`}>
                <Router hashType="noslash">
                    <Switch>
                        <Route exact path="/" component={IntroPage} />
                        <Route exact path="/player-v-npc" component={PlayerVsNpc} />
                        <Route exact path="/npc-v-npc" component={NpcVsNpc} />
                        <Route exact path="/result" component={Result} />
                    </Switch>
                </Router>
            </div>
        );
    }
};

function mapStateToProps(state: any, ownProps) {
    return {
        appState: state.app
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({loadData: ACTIONS.DATA_LOADED}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(App);
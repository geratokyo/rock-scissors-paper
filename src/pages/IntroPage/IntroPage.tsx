
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IStoreState } from '../../_reducers';
import { iActionType, iGesture } from '../../models/models';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Gestures } from '../../services/api/Gestures';
import { ACTIONS } from '../../controllers/App/Actions';
import { AxiosResponse } from 'axios';
import { Spinner } from '../../components/ui/Spinner/Spinner';


export interface IntroPageProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    loadGestures: (data: iGesture[]) => iActionType;
    gestures: iGesture[];
}

const INIT_STATE: IntroPageState = {
}

export interface IntroPageState {
}


export class IntroPage extends React.Component<IntroPageProps, IntroPageState>{

    constructor(props: IntroPageProps) {
        super(props);
        this.state = INIT_STATE;
    }

    componentDidMount() {
        Gestures.GET_GESTURES().then((e: any) => {
            // Gestures.GET_GESTURES().then((e:AxiosResponse<iGesture[]>)=>{
            this.props.loadGestures(e.data);
            this.setState({
                isDataLoaded: true
            })
        })
    }



    render() {
        let { props, state } = this;
        let cls = this.props.className || "";

        return (
            <div className={"intro-page " + cls}>
                {
                    props.gestures.length === 0 &&
                        <Spinner />
                    ||
                    <>
                        <Link className="intro-page__link"
                            to="/player-v-npc">
                            <h1 className="intro-page__title">
                                Player <span>vs</span> NPC
                            </h1>
                        </Link>
                        <Link className="intro-page__link"
                            to="npc-v-npc">
                            <h1 className="intro-page__title">
                                NPC <span>vs</span> NPC
                            </h1>
                        </Link>
                    </>
                }
            </div>
        )
    }
}




const mapStateToProps = (state: IStoreState, ownProps): Partial<IntroPageProps> => {
    return {
        gestures: state.app.gestures
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    loadGestures: ACTIONS.DATA_LOADED
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IntroPage);
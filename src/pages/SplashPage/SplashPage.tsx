import * as React from 'react'; 
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
  
import { IStoreState } from '../../_reducers';


export interface SplashPageProps extends ReactRedux.DispatchProp<any>{
    className?:string;
}

const INIT_STATE:SplashPageState = {

}

export interface SplashPageState{

}


export class SplashPage extends React.Component<SplashPageProps, SplashPageState>{

    constructor(props:SplashPageProps){
        super(props); 
        this.state = INIT_STATE; 
    }

    render(){
        let cls = this.props.className || "";
        return (
            <div className={"splash-page " + cls}>
                <div className="row">
                    <div className="col s12 m12 l12 center">
                        <img className="splash-page__image" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt=""/>
                        <h1>React Studio</h1>
                    </div>
                </div>
            </div>
        )
    }
}




const mapStateToProps = (state: IStoreState, ownProps):Partial<SplashPageProps> =>{
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  }, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(SplashPage);
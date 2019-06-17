import { Network } from "./Network";
import { AxiosResponse, AxiosPromise } from "axios";
import { iGesture } from "../../models/models";



export class Gestures{
    constructor(){

    }

    static GET_GESTURES = ():AxiosPromise<AxiosResponse<iGesture[]>>=>{
        return Network.GET("api/gestures");
        // return Network.GET("api/gestures/extended");
    }
}
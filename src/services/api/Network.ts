import { AxiosResponse } from "axios";

const DELAY = 1000; 

export const delay = (ms) =>{
    return new Promise<any>((res)=>setTimeout(res, ms))
}


const INIT_RES:AxiosResponse = {
    data:"", 
    status:-1, 
    statusText:"", 
    headers:"", 
    config:null
}

export class Network {

    constructor() {

    }

    static GET = (url: string) => {
        return new Promise<AxiosResponse>((res) => {
            delay(DELAY).then(() => {
                let result: AxiosResponse = INIT_RES;
                let opts;
                if (url === "api/gestures") {
                    opts = [
                        {
                            key:"rock", 
                            label:"Rock", 
                            icon:"icon-s-rock", 
                            beats:["scissors"]
                        },
                        {
                            key:"scissors", 
                            label:"Scissors", 
                            icon:"icon-s-scissors", 
                            beats:["paper"]
                        },
                        {
                            key:"paper", 
                            label:"Paper", 
                            icon:"icon-s-paper", 
                            beats:["rock"]
                        }
                    ];
                }else if(url === "api/gestures/extended"){
                    opts = [
                        {
                            key:"rock", 
                            label:"Rock", 
                            icon:"icon-s-rock", 
                            beats:["scissors", "lizard"]
                        },
                        {
                            key:"scissors", 
                            label:"Scissors", 
                            icon:"icon-s-scissors", 
                            beats:["paper", "lizard"]
                        },
                        {
                            key:"paper", 
                            label:"Paper", 
                            icon:"icon-s-paper", 
                            beats:["rock", "spock"]
                        },
                        {
                            key:"lizard", 
                            label:"Lizard", 
                            icon:"icon-s-lizard", 
                            beats:["paper", "spock"]
                        },
                        {
                            key:"spock", 
                            label:"Spock", 
                            icon:"icon-s-spock", 
                            beats:["rock", "scissors"]
                        }
                    ]
                }
                result.data = opts;
                res(result);
            })
        })
    }

}
import { iGesture } from "../models/models";


export interface iPlayer {
    /**
     * object unique identifier
     */
    key: string;

    /**
     * Player Label to be displayed in the UI
     */
    label: string;

    /**
     * the score of the player
     */
    score: number;

    /**
     * is a real or npc user
     */
    type:"npc" | "real";  

    /**
     * this holds the gesture that the user selects
     */
    userChoice: iGesture; 

    /**
     * is the player the winner of the round
     */
    isWinner: boolean; 

    /**
     * Generates a random gesture
     * @return {iGesture}
     */
    generateResponse: () => iGesture;

    /**
     * Resets players opts, to be called at the end of every round
     */
    resetPlayer: ()=>void;
}

export class NPCPlayer implements iPlayer {
    gestures: iGesture[];
    key: string;
    label: string;
    score: number;
    type:"npc" | "real";
    isWinner:boolean; 
    userChoice:iGesture; 
    constructor(key: string, label: string, gestures: iGesture[], type?:"npc"|"real") {
        this.gestures = gestures;
        this.label = label;
        this.key = key;
        this.score = 0;
        this.type= type || "npc";
        this.isWinner = false;
    }
    
    setuserChoice = (gesture:iGesture)=>{
        this.userChoice = gesture;
    }
    
    resetPlayer= ()=>{
        this.isWinner = false;
        this.userChoice = null;
    }


    /**
     * Generate a random response based on the number of gestures
     */
    generateRandomResponse = () => {
        let random = Math.floor(Math.random() * this.gestures.length)
        return this.gestures[random]; 
    }

    generateResponse = () => {
        this.userChoice = this.generateRandomResponse();
        return this.userChoice;
    }
}
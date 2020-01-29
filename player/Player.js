import { Audio } from 'expo-av';


export default class Player {
    
    constructor() {
        soundObject = new Audio.Sound();
        console.log("HERE")
    }
    
    static instance = Player.instance || new Player()

}
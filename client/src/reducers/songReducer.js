import { FETCH_SONG } from '../actions/types';

export default function (state="", action){
    switch(action.type){
        case FETCH_SONG:
            return action.payload;
        default:
            return state;
    }
}
import { FETCH_SONGS, SEARCH_SONGS, FETCH_PUBLISHED_SONGS } from '../actions/types';

export default function (state=[], action){
    switch(action.type){
        case FETCH_SONGS:
            return action.payload;
        case SEARCH_SONGS:
            return action.payload;
        default:
            return state;
    }
}
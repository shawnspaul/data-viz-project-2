import List from './assets/new_raw_tweets.json';
import users from './assets/list.json';

export type LumResults = {
    [x: string]: {
        count: number;
        percentage: number;
    }
}

export const getLum = (group_id: number, keys: string[]) => {
    const numberOfTweets = List.length;
    const results: LumResults = {};
    List.forEach(listItem => {
        keys.forEach(k => {
            if (!results.hasOwnProperty(k)) {
                results[k] = {
                    count: 0,
                    percentage: 0
                }
            }
            if (listItem['tweet_text'].toLowerCase().includes(k.toLowerCase()) && listItem['topic_num'] === group_id) {
                results[k].count++;
            }
        });
    });
    
    Object.entries(results).forEach(([k,_]) => {
        results[k].percentage = results[k].count / numberOfTweets;
    });

    return results;
}

export const getProfileFromHandle = (handle: string) => {
    for (let u of users) {
        if (u["handle"] === handle) {
            return u;
        }
    }
    return users[0];
}
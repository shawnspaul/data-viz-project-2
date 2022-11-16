import List from './assets/list.json';

type LumResults = {
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
            if (listItem['last tweet text'].toLowerCase().includes(k.toLowerCase()) && listItem['modularity class'] === group_id) {
                results[k].count++;
            }
        });
    });
    
    Object.entries(results).forEach(([k,v]) => {
        results[k].percentage = results[k].count / numberOfTweets;
    });

    return results;
}

export const getProfileFromHandle = (handle: string) => {
    for (let u of List) {
        if (u.handle === handle) {
            return u;
        }
    }
    return List[0];
}
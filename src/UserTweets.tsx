import React, { useEffect, useState } from 'react';
import tweets from './assets/new_raw_tweets.json';
import { getModColor } from './State/ModularityGroups';
import Table from './Table';

type Props = {
    user: string;
}

const UserTweets = (props: Props) => {
    const [userTweets, setUserTweets] = useState(tweets);

    useEffect(() => {
        const ts: any = [];
        for (let tweet of tweets) {
            if (tweet["screen_name"] === props.user) {
                ts.push(tweet);
            }
        }
        setUserTweets(ts);
    },[props.user]);

    return <Table data={userTweets.map(ut => ({
        //@ts-ignore
        "__color__": getModColor(ut["luminaries group number"]),
        "Date": ut.tweet_date,
        "Luminary Group": ut['Luminary Group Name'],
        "Tweet": ut.tweet_text,
    }))}/>
}

export default UserTweets
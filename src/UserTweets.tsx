import React, { useEffect, useState } from 'react';
import tweets from './assets/raw_tweets.json';
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
        "Date": ut.date,
        "Tweet": ut.tweet_text,
    }))}/>
}

export default UserTweets
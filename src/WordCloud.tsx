import React from 'react';
import { TagCloud } from 'react-tagcloud'

export type Word = {
    value: string;
    count: number;
}

type Props = {
    words: Word[]
}

const WordCloud = (props: Props) => {
    return <TagCloud
        minSize={12}
        maxSize={35}
        tags={props.words}
        colorOptions={{
            count: 1,
            hue: "white"
        }}
    />;
}

export default WordCloud
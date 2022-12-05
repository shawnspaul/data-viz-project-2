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
    const options = {
        luminosity: 'light',
        hue: 'green',
      }
    return <TagCloud
        minSize={12}
        maxSize={35}
        tags={props.words}
        colorOptions={options}
        // disableRandomColor
    />;
}


export default WordCloud

import { atom } from 'recoil';

export type ModGroup = {
    id: number;
    title: string;
    anchor_words: string[];
}

export const ModGroups: ModGroup[] = [
    {
        id: 1,
        title: 'Technology Development',
        anchor_words: ['digital', 'data', 'technology', 'annual', 'cost', 'register', 'tool', 'mental', 'sharing', 'summit', 'monitoring', 'remote']
    },
    {
        id: 3,
        title: 'Telehealth & Policy',
        anchor_words: ['patients', 'help', 'learn', 'medical', 'better', 'experience', 'dr', 'connect', 'device', 'clinicians', 'complex', 'google', 'devices', 'fitbit', 'host', 'telemedicine', 'signs', 'societies']
        
    },
    {
        id: 2,
        title: 'Media, Marketing, and Business Development',
        anchor_words: ['join', 'future', 'october', 'discuss', 'tomorrow', 'officer', 'chief', 'webinar', 'chance', '@colin_hung', 'failure', '#hcldr', 'retail', 'fad']
    },
    {
        id: 4,
        title: 'Health & Wellness',
        anchor_words: ['2022', 'patient', 'read', 'key', 'latest', 'disease', 'virtual', 'post', 'heart', 'blog', 'changing', 'prices', 'rare', 'feeling']
    },
    {
        id: 5,
        title: 'Emergency Medicine',
        anchor_words: ['top', 'ai', '#ai', 'women', 'incredible', '10', '25', 'benefits', '#pharma', 'edition', 'honor', 'pharma', '#bigdata', 'recognized', '@glfceo', '#biotech', '#he']
    }
]

const ModularityGroup = atom<ModGroup>({
    key: 'modGroup',
    default: ModGroups[0]
});

export default ModularityGroup
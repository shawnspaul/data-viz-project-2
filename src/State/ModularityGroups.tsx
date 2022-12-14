import { atom, selector } from 'recoil';
import list from '../assets/list.json';

export type ModGroup = {
    id: number;
    title: string;
    anchor_words: string[];
    color: string;
}

export const ModGroups: ModGroup[] = [
    {
        id: 1,
        color: "#0b84a5",
        title: 'Technology',
        anchor_words: ['digital', 'data', 'technology', 'annual', 'cost', 'register', 'tool', 'mental', 'sharing', 'summit', 'monitoring', 'remote']
    },
    {
        id: 3,
        color: "#f6c85f",
        title: 'Telehealth & Policy',
        anchor_words: ['patients', 'help', 'learn', 'medical', 'better', 'experience', 'dr', 'connect', 'device', 'clinicians', 'complex', 'google', 'devices', 'fitbit', 'host', 'telemedicine', 'signs', 'societies']
        
    },
    {
        id: 2,
        color: "#6f4e7c",
        title: 'Media & Marketing',
        anchor_words: ['join', 'future', 'october', 'discuss', 'tomorrow', 'officer', 'chief', 'webinar', 'chance', '@colin_hung', 'failure', '#hcldr', 'retail', 'fad']
    },
    {
        id: 4,
        color: "#ca472e",
        title: 'Health and Wellness',
        anchor_words: ['2022', 'patient', 'read', 'key', 'latest', 'disease', 'virtual', 'post', 'heart', 'blog', 'changing', 'prices', 'rare', 'feeling']
    },
    {
        id: 5,
        color: "#8dddd0",
        title: 'Emergency Medicine',
        anchor_words: ['top', 'ai', '#ai', 'women', 'incredible', '10', '25', 'benefits', '#pharma', 'edition', 'honor', 'pharma', '#bigdata', 'recognized', '@glfceo', '#biotech', '#he']
    }
];

export const getModColor = (modGroup: number) => {
    for (let g of ModGroups) {
        if (g.id === modGroup) {
            return g.color;
        }
    }
    return "#000000";
}

const ModularityGroup = atom<number[]>({
    key: 'modGroup',
    default: ModGroups.map((mg) => mg.id)
});

export const ModGroupsSelector = selector({
    key: 'modGroupSelector',
    get: ({get}) => {
        const groups = get(ModularityGroup);
        return groups.map((g) => g);
    }
});

export const ModGroupUsers = selector({
    key: 'modGroupUsers',
    get: ({get}) => {
        const groups = get(ModularityGroup);
        const groupList = groups.map((g) => g);
        const users = [];
        for (let user of list) {
            if (groupList.includes(user['luminaries group number'])) {
                users.push(user);
            }
        }
        return users;
    }
})

export default ModularityGroup
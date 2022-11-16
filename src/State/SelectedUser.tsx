import { atom } from 'recoil';

const SelectedUser = atom<string|null>({
    key: 'selectedUser',
    default: null
});

export default SelectedUser
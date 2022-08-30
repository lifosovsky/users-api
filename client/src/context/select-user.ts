import { createContext } from 'react';

interface ISelectUserContext {
    selectedUserId: null | number
    selectUserById: (arg: number | null) => void
}

function pooh(id: number | null) {

}

export const SelectUserContext = createContext<ISelectUserContext>({
    selectedUserId: null,
    selectUserById: pooh
})
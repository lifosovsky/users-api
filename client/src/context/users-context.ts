import { createContext } from 'react';
import {User} from "../types/user";

function pooh() {

}

interface IUsersContext {
    isActualData: boolean
    setActualData: () => void
    setInvalidData: () => void
    users: User[]
}

export const UsersContext = createContext<IUsersContext>({
    isActualData: false,
    setActualData: pooh,
    setInvalidData: pooh,
    users: []
})
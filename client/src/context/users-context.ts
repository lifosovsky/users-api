import { createContext } from 'react';
import {User} from "../types/user";

interface IUsersContext {
    updateData: () => void,
    users: User[]
}

export const UsersContext = createContext<IUsersContext>({
    updateData: () => undefined,
    users: []
})
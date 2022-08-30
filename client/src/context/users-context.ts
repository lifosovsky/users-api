import { createContext } from 'react';

function pooh() {

}

export const UsersContext = createContext({
    isActualData: false,
    setActualData: pooh,
    setInvalidData: pooh,
})
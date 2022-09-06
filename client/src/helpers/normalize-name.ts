import {User} from "../types/user";

export function normalizeUserData(u: User): User {
    const {Name, SecondName, FatherName} = u
    return {
        ...u,
        Name: normalizeUserString(Name),
        SecondName: normalizeUserString(SecondName),
        FatherName: normalizeUserString(FatherName)
    }
}

function normalizeUserString(s: string): string {
    return s[0].toUpperCase() + s.slice(1, s.length).toLowerCase()
}
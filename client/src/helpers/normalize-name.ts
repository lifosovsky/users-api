export function normalizeName(s: string): string {
    return s[0].toUpperCase() + s.slice(1, s.length).toLowerCase()
}
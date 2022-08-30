//export const ServerUrl = "http://localhost:8000"
export const ServerUrl = ''
export const ServerEndPoints = {
    getAllUsers: "/api/users",
    postCreateUser: "/api/users",
    getUserById: (id: number) => "/api/users/" + id,
    putEditUser: (id: number) => "/api/users/" + id,
    deleteRemoveUser: (id: number) => "/api/users/" + id,
}
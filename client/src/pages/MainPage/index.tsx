import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import UserInteraction from '../../components/user-interaction/user-interaction';
import UserList from '../../components/user-list/user-list';
import {SelectUserContext} from '../../context/select-user';
import {Outlet} from "react-router-dom";
import './index.css'
import {UsersContext} from "../../context/users-context";

const MainPage: FC = () => {

    const [selectedUser, setSelectedUser] = useState<null | number>(null);
    const {users} = useContext(UsersContext)


    useEffect(() => {
        if (users !== null) {
            let isSelectedUserInUserList = false
            for (const user of users) {
                if (user.Id === selectedUser) {
                    isSelectedUserInUserList = true
                    break
                }
            }
            if (!isSelectedUserInUserList) {
                setSelectedUser(null)
            }
        }
    }, [users])

    const selectUser = (id: number | null) => {
        setSelectedUser(id)
    };

    return (
        <SelectUserContext.Provider value={{
            selectedUserId: selectedUser,
            selectUserById: selectUser
        }}>
            <div className="page__content">
                <h1 className="page-header">Список пользователей</h1>
                <UserInteraction/>
                <UserList/>
            </div>
            <Outlet/>
        </SelectUserContext.Provider>
    );
};

export default MainPage;
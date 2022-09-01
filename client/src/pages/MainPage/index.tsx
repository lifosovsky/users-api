import React, { FC, useState } from 'react';
import UserInteraction from '../../components/user-interaction/user-interaction';
import UserList from '../../components/user-list/user-list';
import { SelectUserContext } from '../../context/select-user';
import {localStorageUserKey} from "../../consts/localstorage";
import './index.css'
import {Outlet} from "react-router-dom";

const MainPage: FC = () => {

    const selectedUserFromStorage = Number(localStorage.getItem(localStorageUserKey))

    const [selectedUser, setSelectedUser] = useState<null | number>(selectedUserFromStorage || null);

    const selectUser = (id: number | null) => {
        if (id == null) {
            localStorage.removeItem(localStorageUserKey)
            setSelectedUser(id)
        } else {
            setSelectedUser(id);
            localStorage.setItem(localStorageUserKey, JSON.stringify(id))
        }
    };

    return (
        <SelectUserContext.Provider value={{
            selectedUserId: selectedUser,
            selectUserById: selectUser
        }}>
                <div className="page__content">
                    <h1 className="page-header">Список пользователей</h1>
                    <UserInteraction/>
                    <UserList />
                    <Outlet />
                </div>
        </SelectUserContext.Provider>
    );
};

export default MainPage;
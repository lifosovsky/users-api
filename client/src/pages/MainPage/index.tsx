import React, { FC, useState } from 'react';
import UserInteraction from '../../components/user-interaction/user-interaction';
import UserList from '../../components/user-list/user-list';
import { SelectUserContext } from '../../context/select-user';
import {Outlet} from "react-router-dom";
import './index.css'

const MainPage: FC = () => {

    const [selectedUser, setSelectedUser] = useState<null | number>(  null);

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
                    <UserList />
                    <Outlet />
                </div>
        </SelectUserContext.Provider>
    );
};

export default MainPage;
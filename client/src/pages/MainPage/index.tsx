import React, { FC, useContext, useEffect, useState } from 'react';
import UserInteraction from '../../components/user-interaction/user-interaction';
import UserList from '../../components/user-list/user-list';
import PopupLayout from '../../components/Popups/PopupLayout';
import { useQuery } from '../../hooks/router/useQuery';
import { User } from '../../types/user';
import { ServerEndPoints, ServerUrl } from '../../consts/server';
import { UsersContext } from '../../context/users-context';
import { SelectUserContext } from '../../context/select-user';

const MainPage: FC = () => {

    const [usersData, setUsersData] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<null | number>(null);
    const {isActualData, setActualData} = useContext(UsersContext);

    const selectUser = (id: number | null) => {
        setSelectedUser(id);
    };

    useEffect(() => {
        if (isActualData) return;
        const getUsersData = async () => {
            try {
                const response = await fetch(ServerUrl + ServerEndPoints.getAllUsers);
                const users = await response.json();
                if (users == null) {
                    setUsersData([])
                    setActualData();
                    return
                }
                setUsersData(users);
                setActualData();
            } catch (e) {
                console.log(e);
            }
        };
        getUsersData();
    }, [isActualData]);

    const query = useQuery();
    return (
        <SelectUserContext.Provider value={{
            selectedUserId: selectedUser,
            selectUserById: selectUser
        }}>
            <PopupLayout popup={'' + query.get('popup')}>
                <div className="page__content">
                    <h1 className="page-header">It's Users time!</h1>
                    <UserInteraction/>
                    <UserList users={usersData}/>
                </div>
            </PopupLayout>
        </SelectUserContext.Provider>
    );
};

export default MainPage;
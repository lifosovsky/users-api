import React, {FC, useContext} from 'react';
import './user-list.css';
import {SelectUserContext} from '../../context/select-user';
import {UsersContext} from "../../context/users-context";

const avatarTest = require('../../assets/images/edit.png')

interface UserListProps {

}

const UserList: FC<UserListProps> = () => {
    const {selectedUserId, selectUserById} = useContext(SelectUserContext);
    const {users} = useContext(UsersContext)

    const handleTrClick = (id: number) => {
        if (id === selectedUserId) {
            selectUserById(null)
        } else {
            selectUserById(id)
        }
    }

    if (users.length === 0) {
        return (
            <div className="user-list">
                <h1 className="alert">В списке пока ни одного пользователя</h1>
            </div>
        )
    }


    return (
        <div className="user-list">
            <table className="user-list__table">
                <thead>
                <tr>
                    <th className="th__name">Id</th>
                    <th className="th__name">Фотография</th>
                    <th className="th__name">Имя</th>
                    <th className="th__name">Фамилия</th>
                    <th className="th__name">Отчество</th>
                    <th className="th__name">Псевдоним</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.sort((a, b) => a.Id - b.Id).map((item, index) =>
                        <tr key={Date.now() + index}
                            className={`table__line ${index % 2 === 0 ? 'even' : 'odd'} ${item.Id === selectedUserId ?
                                'selected' : ''}`}
                            onClick={() => handleTrClick(item.Id)}
                        >
                            <td className="user-list__item">{item.Id}</td>
                            <td className="user-list__item">{
                                <img
                                    src={avatarTest}
                                    alt='avatar'
                                    width={20}
                                    height={20}
                                />
                            }</td>
                            <td className="user-list__item">{item.Name}</td>
                            <td className="user-list__item">{item.SecondName}</td>
                            <td className="user-list__item">{item.FatherName}</td>
                            <td className="user-list__item">{item.UserName}</td>
                        </tr>,
                    )
                }
                </tbody>

            </table>

        </div>
    );
};

export default UserList;
import React, { FC, useContext } from 'react';
import { User } from '../../types/user';
import './user-list.css';
import { SelectUserContext } from '../../context/select-user';

interface UserListProps {
    users: User[];
}

const UserList: FC<UserListProps> = ({users}) => {
    const {selectedUserId, selectUserById} = useContext(SelectUserContext);

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
                    <th className="th__name">Name</th>
                    <th className="th__name">Surname</th>
                    <th className="th__name">FatherName</th>
                    <th className="th__name">User-Name</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map((item, index) =>
                        <tr key={Date.now() + index}
                            className={`table__line ${index % 2 === 0 ? 'even' : 'odd'} ${item.Id === selectedUserId ?
                            'selected' : ''
                            }`}
                            onClick={() => handleTrClick(item.Id)}
                        >
                            <td className="user-list__item">{item.Id}</td>
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
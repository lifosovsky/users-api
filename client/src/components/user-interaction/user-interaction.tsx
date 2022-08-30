import React, { FC, useContext } from 'react';
import "./user-interaction.css"
import { useNavigate } from 'react-router-dom';
import { SelectUserContext } from '../../context/select-user';

const UserInteraction: FC = () => {
    const history = useNavigate()
    const {selectedUserId} = useContext(SelectUserContext)
    return (
        <div className="interaction-panel">
            <h2 className="interaction-panel__header">Список пользователей</h2>
            <div className="interaction-panel__buttons">
                <button className="add-user interaction-btn" onClick={() => history(`?popup=add`)}/>
                <button className="edit-user interaction-btn" disabled={!selectedUserId}
                        onClick={() => history(`?popup=edit&id=${selectedUserId}`)}>
                    EDIT
                </button>
                <button className="delete-user interaction-btn" disabled={!selectedUserId}
                        onClick={() => history(`?popup=remove&id=${selectedUserId}`)}
                />
            </div>
        </div>
    )
}

export default UserInteraction

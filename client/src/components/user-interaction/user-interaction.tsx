import React, {FC, useContext} from 'react';
import "./user-interaction.css"
import {Link} from 'react-router-dom';
import {SelectUserContext} from '../../context/select-user';
import {toast} from "react-toastify";

const addIcon = require('../../assets/images/person-add-outline.svg').default
const removeIcon: string = require('../../assets/images/trash-outline.svg').default
const editIcon: string = require('../../assets/images/edit.png')

const popupUrl = 'user'

const UserInteraction: FC = () => {
    const {selectedUserId} = useContext(SelectUserContext)

    const onCheckIsUserIdHandler = () => {
        if (!selectedUserId) return toast.warn("Выберите пользователя")
    }

    return (
        <div className="interaction-panel">
            <div className="interaction-panel__buttons">
                <Link className="add-user interaction-btn" to={popupUrl + '?type=add'}>
                    <img width={50} height={50} src={addIcon} alt="add"/>
                </Link>
                <Link className="edit-user interaction-btn"
                      onClick={onCheckIsUserIdHandler}
                      to={selectedUserId ? `${popupUrl}?type=edit&id=${selectedUserId}` : '#'}
                >
                    <img src={editIcon} alt="edit" width={50} height={50}/>
                </Link>
                <Link className="delete-user interaction-btn"
                      onClick={onCheckIsUserIdHandler}
                      to={selectedUserId ? popupUrl + `?type=remove&id=${selectedUserId}` : '#'}
                >
                    <img src={removeIcon} alt="delete" width={50} height={50}/>
                </Link>
            </div>
        </div>
    )
}

export default UserInteraction

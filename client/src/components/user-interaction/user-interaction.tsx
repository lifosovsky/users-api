import React, { FC, useContext } from 'react';
import "./user-interaction.css"
import { useNavigate } from 'react-router-dom';
import { SelectUserContext } from '../../context/select-user';
import {toast} from "react-toastify";
const addIcon = require('../../assets/images/person-add-outline.svg').default
const removeIcon: string = require('../../assets/images/trash-outline.svg').default
const  editIcon: string = require('../../assets/images/person-outline.svg').default

const popupUrl = '/user'

const UserInteraction: FC = () => {
    const history = useNavigate()
    const {selectedUserId} = useContext(SelectUserContext)

    const onDeleteHandler = () => {
        if (!selectedUserId) return toast.warn("Выберите пользователя")
        history(popupUrl + `?type=remove&id=${selectedUserId}`)
    }

    const onEditHandler = () => {
        if (!selectedUserId) return toast.warn("Выберите пользователя")
        history(popupUrl + `?type=edit&id=${selectedUserId}`)
    }

    return (
        <div className="interaction-panel">
            <div className="interaction-panel__buttons">
                <button className="add-user interaction-btn" onClick={() => history(popupUrl + '?type=add')}>
                    <img width={50} height={50} src={addIcon} alt="add"/>
                </button>
                <button className="edit-user interaction-btn" onClick={onEditHandler}>
                        <img src={editIcon} alt="edit" width={50} height={50}/>
                </button>
                <button className="delete-user interaction-btn" onClick={onDeleteHandler}>
                        <img src={removeIcon} alt="delete" width={50} height={50}/>
                </button>
            </div>
        </div>
    )
}

export default UserInteraction

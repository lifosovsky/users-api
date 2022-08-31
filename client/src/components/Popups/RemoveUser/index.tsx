import React, { FC, useContext } from 'react';
import './index.css'
import { useQuery } from '../../../hooks/router/useQuery';
import { ServerEndPoints, ServerUrl } from '../../../consts/server';
import { UsersContext } from '../../../context/users-context';
import {useNavigate} from "react-router-dom";
import {localStorageUserKey} from "../../../consts/localstorage";

const closeIcon: string = require('../../../assets/images/close-circle-outline.svg').default

interface RemoveUserProps {

}

const RemoveUser: FC<RemoveUserProps> = () => {
    const query = useQuery()
    const id: number = Number(query.get('id'))
    const {setInvalidData} = useContext(UsersContext)
    const navigate = useNavigate()

    const handlerAccept = async () => {
        const response = await fetch(ServerUrl + ServerEndPoints.deleteRemoveUser(id), {method: 'DELETE'})
        const json = await response.json()
        console.log(json);
        localStorage.removeItem(localStorageUserKey)
        setInvalidData()
        closePopup()
    }

    const closePopup = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/', { replace: true });
        }
    }

    return (
        <div className="popup-remove popup__window" onClick={(e) => e.stopPropagation()}>
            <div className="popup-top">
                <h1 className="popup__header">Удалить пользователя с ID {id} ?</h1>
                <button className='close-btn' onClick={closePopup}>
                    <img alt='close-btn' src={closeIcon} width={50} height={50}/>
                </button>
            </div>
            <div className="buttons">
                <button className="btn" onClick={handlerAccept}>Да, удалить</button>
                <button className="btn" onClick={closePopup}>Нет, отменить</button>
            </div>
        </div>
    )
}

export default RemoveUser
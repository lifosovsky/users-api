import React, { FC, useContext } from 'react';
import './index.css'
import { useQuery } from '../../../hooks/router/useQuery';
import { ServerEndPoints, ServerUrl } from '../../../consts/server';
import { UsersContext } from '../../../context/users-context';

const closeIcon: string = require('../../../assets/images/close-circle-outline.svg').default

interface IRemoveUser {
    closePopup: () => void;
}

const RemoveUser: FC<IRemoveUser> = ({closePopup}) => {
    const query = useQuery()
    const id: number = Number(query.get('id'))
    const {setInvalidData} = useContext(UsersContext)

    const handlerAccept = async () => {
        const response = await fetch(ServerUrl + ServerEndPoints.deleteRemoveUser(id), {method: 'DELETE'})
        const json = await response.json()
        console.log(json);
        setInvalidData()
        closePopup()
    }

    return (
        <div className={'popup-remove'}>
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
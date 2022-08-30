import React, { FC, useContext } from 'react';
import './index.css'
import { useQuery } from '../../../hooks/router/useQuery';
import { ServerEndPoints, ServerUrl } from '../../../consts/server';
import { UsersContext } from '../../../context/users-context';

interface RemoveUserProps {
    closePopup: () => void;
}

const RemoveUser: FC<RemoveUserProps> = ({closePopup}) => {
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
        <div className="popup-remove popup__window" onClick={(e) => e.stopPropagation()}>
            <h1 className="popup__header">Remove user with {id} id</h1>
            <div className="buttons">
                <button className="btn" onClick={handlerAccept}>accept</button>
                <button className="btn" onClick={closePopup}>reject</button>
            </div>
        </div>
    )
}

export default RemoveUser
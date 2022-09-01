import React, {FC, useContext, useEffect, useState} from 'react';
import {useQuery} from '../../../hooks/router/useQuery';
import {User} from '../../../types/user';
import {ServerEndPoints, ServerUrl} from '../../../consts/server';
import {UsersContext} from '../../../context/users-context';
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import './index.css'

const closeIcon: string = require('../../../assets/images/close-circle-outline.svg').default

enum userFields {
    Name = 'Name',
    SecondName = 'SecondName',
    FatherName = 'FatherName',
    UserName = 'UserName'
}

const formInit: User = {
    Id: -1,
    Name: '',
    SecondName: '',
    FatherName: '',
    UserName: '',
};

interface IEditUser {
    closePopup: () => void;
}

const EditUser: FC<IEditUser> = ({closePopup}) => {
    const query = useQuery()
    const [value, setValue] = useState<User>(formInit);
    const {setInvalidData} = useContext(UsersContext)
    const navigate = useNavigate()
    const id: number = Number(query.get('id'))

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value)) return;
        setValue(prevState => Object.assign({}, prevState, {
            [event.target.name]: event.target.value,
        }));
    };

    const isInputsCorrect = (): boolean => {
        for (const argumentsKey in value) {
            if (argumentsKey !== 'Id') {
                if (('' + value[argumentsKey as keyof User]).length < 3) {
                    return false;
                }
            }
        }
        return true;
    };

    const submitHandle = async () => {
        if (!isInputsCorrect()) {
            return toast.warn('Заполните все поля!');
        }
        try {
            const response = await fetch(ServerUrl + ServerEndPoints.putEditUser(id), {
                method: 'PUT',
                body: JSON.stringify({
                    Name: value.Name,
                    SecondName: value.SecondName,
                    FatherName: value.FatherName,
                    UserName: value.UserName,
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const answer = await response.json();
            console.log(answer);
            setInvalidData()
            navigate(-1)
        } catch (e) {
            toast.error('' + e)
        }
    };

    useEffect(() => {
        (async () => {
            const response = await fetch(ServerUrl + ServerEndPoints.getUserById(id))
            const user = await response.json()
            setValue(user)
        })()
    }, [])

    return (
        <div className={'popup-edit'}>
            <div className="popup-top">
                <h1 className="popup__header">Изменить пользователя с ID {id}</h1>
                <button className='close-btn' onClick={closePopup}>
                    <img alt='close-btn' src={closeIcon} width={50} height={50}/>
                </button>
            </div>
            <div className="form">
                <label>
                    Имя:
                    <input className="form__input" type="text" onChange={inputHandler} name={userFields.Name}
                           value={value[userFields.Name] || ''}
                    />
                </label>
                <label>
                    Фамилия:
                    <input className="form__input" type="text" onChange={inputHandler}
                           name={userFields.SecondName}
                           value={value[userFields.SecondName] || ''}
                    />
                </label>
                <label>
                    Отчество:
                    <input className="form__input" type="text" onChange={inputHandler}
                           name={userFields.FatherName}
                           value={value[userFields.FatherName] || ''}
                    />
                </label>
                <label>
                    Псевдоним:
                    <input className="form__input" type="text" onChange={inputHandler} name={userFields.UserName}
                           value={value[userFields.UserName] || ''}
                    />
                </label>
                <button className="form__submit" onClick={submitHandle}>SUBMIT</button>
            </div>
        </div>
    )
}

export default EditUser
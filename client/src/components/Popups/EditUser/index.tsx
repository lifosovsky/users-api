import React, {FC, useContext, useEffect, useState} from 'react';
import {useQuery} from '../../../hooks/router/useQuery';
import {User} from '../../../types/user';
import {ServerEndPoints, ServerUrl} from '../../../consts/server';
import {UsersContext} from '../../../context/users-context';
import {toast} from "react-toastify";
import './index.css'
import {Blob} from "buffer";
import buffer from "buffer";

const closeIcon: string = require('../../../assets/images/close-circle-outline.svg').default
const undefinedUserAvatar = require('../../../assets/images/undefined-user-avatar.png')

enum userFields {
    Name = 'Name',
    SecondName = 'SecondName',
    FatherName = 'FatherName',
    UserName = 'UserName'
}

interface IEditUser {
    closePopup: () => void;
}

const EditUser: FC<IEditUser> = ({closePopup}) => {
    const query = useQuery()
    const {updateData} = useContext(UsersContext)
    const id: number = Number(query.get('id'))
    const [value, setValue] = useState<User | null>(null);

    const onImageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        setValue(prevState => Object.assign({}, prevState, {
            profilePhoto: files[0],
        }))
    }

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
        if (value === null || !isInputsCorrect()) {
            return toast.warn('Заполните все поля!');
        }

        const formData = new FormData()

        for (const key in value) {
            formData.append(key, value[key as keyof User] as string)
        }


        const resposne = await fetch(ServerUrl + ServerEndPoints.putEditUser(id), {
            method: "PUT",
            body: formData
        })
        updateData()
        closePopup();
    };

    useEffect(() => {
        (async () => {
            const response = await fetch(ServerUrl + ServerEndPoints.getUserById(id))
            const user = await response.json()
            console.log(user)
            setValue({
                Id: 0,
                Name: "test",
                SecondName: "test",
                FatherName: "test",
                UserName: "test",
                profilePhoto: user.Avatar.Image,
            })
        })()
    }, [])

    if (value === null) {
        return (
            <div className="popup-top">
                <h1 className="popup__header">Loading...</h1>
            </div>
        )
    }

    return (
        <div className={'popup-edit'}>
            <div className="popup-top">
                <h1 className="popup__header">Изменить пользователя с ID {id}</h1>
                <button className='close-btn' onClick={closePopup}>
                    <img alt='close-btn' src={closeIcon} width={50} height={50}/>
                </button>
            </div>
            <div className="form">
                <label className='label-image'>
                    <input
                        className='input-image'
                        type='file'
                        multiple={false}
                        accept='image/*'
                        onChange={onImageChangeHandler}
                    />
                    <img
                        src={value.profilePhoto ? `data:image/jpeg;base64, ${value.profilePhoto}` : undefinedUserAvatar}
                        alt='avatar'
                        width={100}
                        height={100}
                    >
                    </img>
                </label>
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
                <button className="form__submit" onClick={submitHandle}>Редактировать</button>
            </div>
        </div>
    )
}

export default EditUser
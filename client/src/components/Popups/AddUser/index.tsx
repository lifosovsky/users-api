import React, {FC, useContext, useState} from 'react';
import './index.css';
import {User} from '../../../types/user';
import {UsersContext} from '../../../context/users-context';
import {toast} from "react-toastify";
import {ServerEndPoints, ServerUrl} from "../../../consts/server";

const closeIcon: string = require('../../../assets/images/close-circle-outline.svg').default
const undefinedUserAvatar = require('../../../assets/images/undefined-user-avatar.png')

const formInit: User = {
    Id: -1,
    profilePhoto: null,
    Name: '',
    SecondName: '',
    FatherName: '',
    UserName: '',
};

enum userFields {
    UserPhoto = 'UserPhoto',
    Name = 'Name',
    SecondName = 'SecondName',
    FatherName = 'FatherName',
    UserName = 'UserName'
}

interface IAddUser {
    closePopup: () => void;
}

const AddUser: FC<IAddUser> = ({closePopup}) => {

    const [value, setValue] = useState<User>(formInit);
    const {updateData} = useContext(UsersContext)

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
        if (!isInputsCorrect()) {
            return toast.warn('Заполните все поля!');
        }

        const formData = new FormData()

        for (const key in value) {
            formData.append(key, value[key as keyof User] as Blob)
        }

        if (value.profilePhoto === null) {
            formData.append("profilePhoto", undefinedUserAvatar)
        }

        const response = await fetch(ServerUrl + ServerEndPoints.postCreateUser, {
            method: "POST",
            body: formData
        })
        updateData()
        closePopup()
    };

    return (
        <div className={'popup-add'}>
            <div className="popup-top">
                <h1 className="popup__header">Создать нового пользователя</h1>
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
                        src={value.profilePhoto ? URL.createObjectURL(value.profilePhoto) : undefinedUserAvatar}
                        alt='avatar'
                        width={100}
                        height={100}
                    />
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
                <button className="form__submit" onClick={submitHandle}>Создать</button>
            </div>
        </div>
    );
};

export default AddUser;
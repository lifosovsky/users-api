import React, { FC, useContext, useState } from 'react';
import './index.css';
import { User } from '../../../types/user';
import { ServerEndPoints, ServerUrl } from '../../../consts/server';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../../../context/users-context';
import {normalizeName} from "../../../helpers/normalize-name";

const formInit: User = {
    Id: -1,
    Name: '',
    SecondName: '',
    FatherName: '',
    UserName: '',
};

enum userFields {
    Name = 'Name',
    SecondName = 'SecondName',
    FatherName = 'FatherName',
    UserName = 'UserName'
}

const AddUser: FC = () => {

    const [value, setValue] = useState<User>(formInit);
    const {setInvalidData} = useContext(UsersContext)
    const nav = useNavigate();

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
            return alert('Fill all field!');
        }
        const response = await fetch(ServerUrl + ServerEndPoints.postCreateUser, {
            method: 'POST',
            body: JSON.stringify({
                Name: normalizeName(value.Name),
                SecondName: normalizeName(value.SecondName),
                FatherName: normalizeName(value.FatherName),
                UserName: value.UserName,
            }),
        });

        const answer = await response.json();
        console.log(answer);
        setInvalidData()
        nav(-1)
    };

    return (
        <>
            <div className="popup-add popup__window" onClick={(e) => e.stopPropagation()}>
                <h1 className="popup__header">Create a new user</h1>
                <div className="form">
                    <label>
                        Name:
                        <input className="form__input" type="text" onChange={inputHandler} name={userFields.Name}
                               value={value[userFields.Name] || ''}
                        />
                    </label>
                    <label>
                        Surname:
                        <input className="form__input" type="text" onChange={inputHandler}
                               name={userFields.SecondName}
                               value={value[userFields.SecondName] || ''}
                        />
                    </label>
                    <label>
                        Fathername:
                        <input className="form__input" type="text" onChange={inputHandler}
                               name={userFields.FatherName}
                               value={value[userFields.FatherName] || ''}
                        />
                    </label>
                    <label>
                        UserName:
                        <input className="form__input" type="text" onChange={inputHandler} name={userFields.UserName}
                               value={value[userFields.UserName] || ''}
                        />
                    </label>
                    <button className="form__submit" onClick={submitHandle}>SUBMIT</button>
                </div>
            </div>
        </>
    );
};

export default AddUser;
import React, {FC, useContext, useState} from 'react';
import './index.css';
import {User} from '../../../types/user';
import {ServerEndPoints, ServerUrl} from '../../../consts/server';
import {useNavigate} from 'react-router-dom';
import {UsersContext} from '../../../context/users-context';
import {normalizeName} from "../../../helpers/normalize-name";
import {toast} from "react-toastify";

const closeIcon: string = require('../../../assets/images/close-circle-outline.svg').default

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
    const navigate = useNavigate();

    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        dragging: false,
        styles: {left: 0, top: 0}
    })

    const dragStart = (e: React.MouseEvent) => {
        setPosition(Object.assign({}, position, {
            x: e.screenX - e.currentTarget.getBoundingClientRect().left,
            y: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true
        }))
    }

    const dragging = (e: React.MouseEvent) => {
        if (position.dragging) {
            const left = e.screenX - position.x;
            const top = e.screenY - position.y;

            setPosition(Object.assign({}, position, {
                styles: {
                    top: top,
                    left: left
                }
            }))
        }
    }

    const dragEnd = (e: React.MouseEvent) => {
        setPosition(Object.assign({}, position, {
            dragging: false
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
        navigate(-1)
    };

    const closePopup = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/', {replace: true});
        }
    }

    return (
        <>
            <div className="popup-add popup__window"
                 onClick={(e) => e.stopPropagation()}
                 style={{
                     top: position.styles.top || '20%',
                     left: position.styles.left || '25%/',
                     position: "absolute"
                 }}
                 onMouseDown={dragStart}
                 onMouseMove={dragging}
                 onMouseUp={dragEnd}
            >
                <div className="popup-top">
                    <h1 className="popup__header">Создать нового пользователя</h1>
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
        </>
    );
};

export default AddUser;
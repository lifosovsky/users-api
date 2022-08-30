import React, { FC } from 'react';
import { GET_ENUMS } from '../../../consts/router';
import AddUser from '../AddUser';
import RemoveUser from '../RemoveUser';
import EditUser from '../EditUser';
import { useNavigate } from 'react-router-dom';
import './index.css'

interface PopupLayoutProps {
    children: React.ReactNode;
    popup: string;
}

const popups = {
    ADD: AddUser,
    REMOVE: RemoveUser,
    EDIT: EditUser,
};

const PopupLayout: FC<PopupLayoutProps> = ({children, popup}) => {
    const nav = useNavigate();

    const closePopup= () => {
        nav(-1)
    }

    return (
        <>
            {children}
            {
                popup.toUpperCase() === 'ADD'
                    ?
                    <div className={'popup'} onClick={closePopup}><AddUser/></div>
                    :
                    popup.toUpperCase() === 'EDIT'
                        ?
                        <div className={'popup'} onClick={closePopup}><EditUser/></div>
                        :
                        popup.toUpperCase() === 'REMOVE'
                            ?
                            <div className={'popup'} onClick={closePopup}><RemoveUser closePopup={closePopup}/></div>
                            :
                            null
            }

        </>
    );
};

export default PopupLayout;
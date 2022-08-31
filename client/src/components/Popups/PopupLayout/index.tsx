import React, {FC, useContext} from 'react';
import AddUser from '../AddUser';
import RemoveUser from '../RemoveUser';
import EditUser from '../EditUser';
import { useNavigate } from 'react-router-dom';
import {useQuery} from "../../../hooks/router/useQuery";
import {UsersContext} from "../../../context/users-context";
import './index.css'

interface PopupLayoutProps {
    children: React.ReactNode;
}

const popupEnum = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    REMOVE: 'REMOVE'
}

const PopupLayout: FC<PopupLayoutProps> = ({children}) => {
    const  {setInvalidData} = useContext(UsersContext)
    const navigate = useNavigate();
    const query = useQuery();
    const popup = ('' + query.get("type")).toUpperCase()

    const closePopup = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/', { replace: true });
        }
    }

    return (
        <>
            {children}
            {
                popup === popupEnum.ADD
                    ?
                    <div className={'popup'} onClick={closePopup}><AddUser /></div>
                    :
                    popup === popupEnum.EDIT
                        ?
                        <div className={'popup'} onClick={closePopup}><EditUser/></div>
                        :
                        popup === popupEnum.REMOVE
                            ?
                            <div className={'popup'} onClick={closePopup}><RemoveUser /></div>
                            :
                            null
            }

        </>
    );
};

export default PopupLayout;

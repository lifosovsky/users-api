import React, {FC, useState} from 'react';
import AddUser from '../AddUser';
import RemoveUser from '../RemoveUser';
import EditUser from '../EditUser';
import {useNavigate} from 'react-router-dom';
import {useQuery} from "../../../hooks/router/useQuery";
import './index.css'

interface PopupLayoutProps {

}

const popupEnum = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    REMOVE: 'REMOVE'
}

const PopupLayout: FC<PopupLayoutProps> = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const popup = ('' + query.get("type")).toUpperCase()

    const closePopup = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/', {replace: true});
        }
    }

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

    const dragEnd = () => {
        setPosition(Object.assign({}, position, {
            dragging: false
        }))
    }

    if (popup === popupEnum.ADD) {
        return (
            <div className={'popup'} onClick={closePopup}>
                <div className="popup__window"
                     onClick={(e) => e.stopPropagation()}
                     onMouseDown={dragStart}
                     onMouseMove={dragging}
                     onMouseUp={dragEnd}
                     style={{
                         top: position.styles.top || '10%',
                         left: position.styles.left || '30%',
                     }}
                >
                    <AddUser closePopup={closePopup}/></div>
            </div>
        )
    }

    if (popup === popupEnum.EDIT) {
        return (
            <div className={'popup'} onClick={closePopup}>
                <div className="popup__window"
                     onClick={(e) => e.stopPropagation()}
                     onMouseDown={dragStart}
                     onMouseMove={dragging}
                     onMouseUp={dragEnd}
                     style={{
                         top: position.styles.top || '20%',
                         left: position.styles.left || '25%',
                     }}
                >
                    <EditUser closePopup={closePopup}/></div>
            </div>
        )
    }

    if (popup === popupEnum.REMOVE) {
        return (
            <div className={'popup'} onClick={closePopup}>
                <div className="popup__window"
                     onClick={(e) => e.stopPropagation()}
                     style={{
                         top: position.styles.top || '20%',
                         left: position.styles.left || '30%',
                     }}
                     onMouseDown={dragStart}
                     onMouseMove={dragging}
                     onMouseUp={dragEnd}
                >
                    <RemoveUser closePopup={closePopup}/>
                </div>
            </div>
        )
    }

    return null
};

export default PopupLayout;

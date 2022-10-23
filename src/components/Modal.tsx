import React, {useState, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import DragLine from './DragLine';

interface cartModalProps {
    children: React.ReactNode;
    title: string;
    text?: string;
    isModal: boolean;
    close: () => void;
}

const Modal:React.FC<cartModalProps> = ({children, text, title, isModal, close}) => {
    const [isScrolledTop, setIsScrolledTop] = useState(true);
    const [isSwiped, setIsSwiped] = useState(false);

    /* Swipe Handlers */
    const handlers = useSwipeable({
        onSwiping: (e) => {
            if(isScrolledTop && e.dir === "Down"){
                setIsSwiped(true);
                if(isSwiped){
                    close();
                }
            }
        }
    })

    return (
        <div style={isModal ? {'bottom': '0'} : {'bottom': '-100%'} } className='modal'>
            <DragLine />
            <h3 className='modal__title'>{title}</h3>
            <h4 className='modal__text'>{text}</h4>
            {children}
        </div>
    );
};

export default Modal;
import React, {useState} from 'react';
import DragLine from './DragLine';

interface cartModalProps {
    children: React.ReactNode;
    title: string;
    text: string;
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal:React.FC<cartModalProps> = ({children, text, title, isModal, setIsModal, setIsOpacity}) => {
    const [fullOpen, setFullOpen] = useState(false);

    const close = () => {
        setIsModal(false);
        setIsOpacity(false);
    }

    return (
        <div style={isModal ? {'bottom': '0'} : {'bottom': '-100%'} } className={fullOpen ? 'modal modal_full' : 'modal'}>
            <DragLine fullOpen={fullOpen} setFullOpen={setFullOpen} close={close} />
            <h3 className='modal__title'>{title}</h3>
            <h4 className='modal__text'>{text}</h4>
            {children}
        </div>
    );
};

export default Modal;
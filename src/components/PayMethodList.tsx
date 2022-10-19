import React from 'react';
import PayMethod from './PayMethod';

interface payMethodListProps {
    isRadioChecked: boolean;
    setIsRadioChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModal2: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    formsRef: React.RefObject<HTMLFormElement>;
}

const PayMethodList:React.FC<payMethodListProps> = ({isRadioChecked, setIsRadioChecked, setIsValidated, setIsModal2, setIsOpacity, formsRef}) => {

    /* Handlers */
    const onClickHandler = () => {
        setIsRadioChecked(true);
    }
    
    return (
        <form ref={formsRef} className='pay-methods'>
            <PayMethod onClick={onClickHandler} imgSrc='../images/fast-payment.svg' price={0} id='1' label='Система быстрых платежей' text='Оплата через приложение вашего банка' inputName='payMethod'/>
            <PayMethod onClick={onClickHandler} imgSrc='../images/rouble.svg' price={0} id='2' label='Наличные' text='Позовём официанта' inputName='payMethod'/>
            <PayMethod onClick={onClickHandler} imgSrc='../images/card.svg' price={0} id='3' label='Картой **** 7777' inputName='payMethod'/>
            <p className='pay-methods__terms'>Совершая оплату, вы соглашаетесь <br/> с <a href='#'>условиями сервиса</a></p>
            <button 
                type='button'
                onClick={() => {
                    if(!isRadioChecked){
                        setIsValidated(true);
                    } else {
                        setIsValidated(false);
                        setIsModal2(false);
                        setIsOpacity(false);
                        setIsRadioChecked(false);
                    } 
                }}    
            >Continue</button>
        </form>
    );
};

export default PayMethodList;
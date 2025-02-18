'use client'

import React, { useEffect, useState } from 'react'
import styles from './form.module.css';
import Image from 'next/image';

interface Option {
    label: string;
    value: string;
}

interface Car {
    brand: string;
}

interface FormProps {
    options: Option[];
    onSelect: (value: string) => void;
    selectedOption: string | null;
    formOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}


const Form: React.FC<FormProps> = ({ options, onSelect, selectedOption, formOnSubmit, isLoading }) => {

    const [ carName, setCarBrand ] = useState('Select Car')
    const [ carsList, setData] = useState<Car[] | null>(null);
    const [ isOpen, setMenuState ] = useState<boolean>(false);
    const [numberPlate, setNumberPlate] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleCarBrandChange = ( car: Car): void => {
      setCarBrand(car.brand);
      setMenuState(false);
      setErrorMessage('');
    }

    const handleNumberPlateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberPlate(event.target.value);
        setErrorMessage('');
    }
    
    useEffect(() => {
            fetch('/api/cars')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
          })
    }, [])
    
    const changeMenuState = (): void => {
        setMenuState(!isOpen);
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (carName === 'Select Car' && selectedOption === 'no') {
            event.preventDefault();
            setErrorMessage('Please select a car');
            return; 
        }

        if (numberPlate.length !== 6  && selectedOption === 'yes') {
            event.preventDefault();
            setErrorMessage('Number plate must be 6 characters long');
            return; 
        }

        formOnSubmit(event);
    }

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event?.target.value;
        onSelect(value)
        setErrorMessage('');
    }
  
    return (
    <div className={styles.formContainer}>
        <h3 className={styles.header}>Do you own a car?</h3>
        {options?.map((option)=> (
            <div key ={option.value}>
            <input type='radio' name='carOwner' id={option.value} value={option.value} checked={selectedOption === option.value} onChange={handleOptionChange}/>
            <label className={styles.labelText} htmlFor={option.value}>
                {option.label}
            </label>
            </div>
        ))}
        <form className={styles.form} onSubmit={handleSubmit}>
        {selectedOption === 'yes' && (<div className={styles.numberPlateContainer}>
            <label className={styles.labelText} htmlFor="numberPlate">Enter Your Number Plate</label>
            <input className={styles.numberPlateField} type="text" name="numberPlate" minLength={6} maxLength={6} onChange={handleNumberPlateChange}/>
        </div>)}
        {selectedOption === 'no' && (<div className={styles.carChoiceContainer}>
            <label className={styles.labelText} htmlFor="wantedCarMake">What Car would you like to own? </label>
            <menu>
        <div className={styles.dropDownMenuContainer}>
            <div className={styles.selectCarHeaderContainer} onClick={() => changeMenuState()}>
                <div className={styles.selectedFont}><b>{carName}</b></div>
                <Image className={styles.downArrowLogo} src='/img/icon-arrow-down.svg' height={3} width={3} alt="down arrow"/>
                </div></div>
        <div className={styles.optionsMenu}>
            {isOpen ?
    <ul className={styles.dropDown}>{carsList?.map((item, index) => {
       return <li className={styles.menuItem} key={index} value={item.brand} onClick={() =>handleCarBrandChange(item)}>{item.brand}
        </li>
    })}</ul>
     : null }
    </div>
    </menu>
    <input type="hidden" name="selectedCar" value={carName} />
        </div>)}

        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        {(selectedOption === 'yes' || selectedOption === 'no') && (
  <button className={styles.submitButton} type='submit'>{!isLoading ? 'submit' : 'loading'}</button>
)}</form>
    </div>
  )
}

export default Form
'use client'

import React, { useState, FormEvent, useEffect } from 'react';
import styles from './page.module.css';
import Form from "./components/form/form";

type Value = string | null ;

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<Value>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
      if(storedData) {
        const parsedData = JSON.parse(storedData);
        const urlParams = new URLSearchParams(parsedData).toString();
        window.location.href = `/details?${urlParams}`;
        return;
      }
  })

  async function formOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
 
    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      })

      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  

  const handleOptionSelect = (value: Value) => {
    setSelectedOption(value);
  };

  const options = [
    {label: 'yes', value: 'yes'},
    {label: 'no', value: 'no'}
  ]

  return (<div className={styles.backgroundContainer}>
    <div className={styles.formContainer}>
      <Form options={options} onSelect={handleOptionSelect} selectedOption={selectedOption} formOnSubmit={formOnSubmit} isLoading={isLoading}/>
    </div>
  </div>);
}

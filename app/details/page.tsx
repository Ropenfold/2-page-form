'use client'
 
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import styles from './detailsPage.module.css'

const DetailsPage = () => {
    const searchParams = useSearchParams();
    const formData = Object.fromEntries(searchParams.entries());

    const amendDetails = () => {
        localStorage.removeItem('formData');
        window.location.href = `/`
        return;
    }

    useEffect(() => {
        if(Object.keys(formData).length > 0) {
            localStorage.setItem('formData', JSON.stringify(formData));
        }
    })

  return (
    <div className={styles.backgroundContainer}>
         <ul className={styles.list}>
        {Object.entries(formData).map(([key, value]) => (
          <li className={styles.listItem} key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <button className={styles.amendButton} onClick={amendDetails}>Amend</button>
    </div>

  )
}

export default DetailsPage;
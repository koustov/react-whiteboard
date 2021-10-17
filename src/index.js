import React from 'react'
import styles from './styles.module.css'
import { Container } from './components/container'

export const Whiteboard = ({ text }) => {
  return (
    <Container className={styles.test}>Example Component: {text}</Container>
  )
}

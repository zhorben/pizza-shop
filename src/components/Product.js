import React from 'react'
import { css } from 'astroturf'

const styles = css`
  .product {
    display: flex;
    flex-direction: column;
    width: calc((100% - 6rem) / 4);
    margin-bottom: 3rem;
    background: #fff;

    &:not(:nth-of-type(4n)) {
      margin-right: 2rem;
    }
  }

  .imageWrapper {
    position: relative;
    padding-top: 100%;
    overflow: hidden;
  }

  .container {
    height: 100%;
  }

  .image {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    max-height: 100%;
  }

  .details {
    padding: 1.5rem;
  }

  .title,
  .description {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .title {
    font-family: 'Open Sans';
    font-weight: 700;
    font-size: 1.6rem;
    height: 4.4rem;
  }

  .description {
    color: rgb(122, 133, 141);
    font-size: 1.4rem;
    height: 3.8rem;
    margin: 1.5rem 0 0;
  }

  .footer {
    padding: 1.5rem;
    border-top: 1px solid rgb(233, 235, 238);
    display: flex;
    align-items: center;
  }

  .price {
    font-size: 1.8rem;
    font-family: 'Barlow Condensed', sans-serif;
  }

  .addButton {
    flex: 1;
    background-color: rgb(30, 48, 110);
    color: rgb(255, 255, 255);
    font-family: 'Open Sans';
    font-size: 1.4rem;
    height: 3.6rem;
    border: none;
    border-radius: 0.5rem;
    margin: 0 0 0 10px;
    padding: 0px 1rem;
    cursor: pointer;
    transition: background-color 150ms ease-out 0s;

    &:hover {
      background-color: rgb(82, 102, 153);
    }
  }
`

export default function Product({ title, description, price, images }) {
  return (
    <div className={styles.product}>
      <a className={styles.imageWrapper} href="#">
        <div className={styles.container}>
          <img className={styles.image} src={images[0]} />
        </div>
      </a>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>{price} USD</span>
        <button className={styles.addButton} type="button">
          Add
        </button>
      </div>
    </div>
  )
}

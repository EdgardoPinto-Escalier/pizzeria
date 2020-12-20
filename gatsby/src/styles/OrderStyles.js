import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  fieldset {
    display: grid;
    grid-gap: 1rem;
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    label {
      display: grid;
      grid-gap: 1rem;
      align-content: start;
    }
    label + label {
      margin-top: 1rem;
    }
    &.order,
    &.menu {
      grid-column: span 1;
      align-content: flex-start;
      height: 600px;
    }
  }
  .nypon {
    display: none;
  }

  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
  @media (max-width: 450px) {
    h2 {
      font-size: 1.5rem;
    }
    button {
      padding: 0.3rem;
      margin: 0.5rem 0rem 0.5rem 1rem;
    }
  }
`;

export default OrderStyles;

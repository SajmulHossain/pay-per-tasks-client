/* eslint-disable react/prop-types */


const PaymentRow = ({payment, index}) => {
  const {name, amount, id} = payment || {};
  return (
    <tr>
      <td>{index+1}</td>
      <td>{name}</td>
      <td>{amount/100}$</td>
      <td>{id}</td>
    </tr>
  );
};

export default PaymentRow;
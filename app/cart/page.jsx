import { age, name } from './data';

export default function Cart() {
    let 장바구니 = ['tomato', 'pasta'];
    
    return (
      <div>
        <h4 className="title">Cart</h4>

        {장바구니.map((name, i ) => {
            return (
                <CartItem key={i} name={name}/>
            )
        })}
        
      </div>
    )
  }
  
  function CartItem(props) {
    return (
      <div className="cart-item">
        <p>상품명 {props.name} </p>
        <p>$40</p>
        <p>1개</p>
      </div>
    )
  }
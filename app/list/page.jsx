'use client';

import Image from "next/image";
// import 이미지 from '/public/food0.png';
import { useState } from "react";


export default function List() {
    let products = ['tomato', 'pasta', 'coconut'];
    let [count, setCount] = useState(0);

    function up() {
        setCount(count + 1);
    }

    function down() {
        if (count > 0) {
            setCount(count -1 );
        }
    }

    return (
        <div>
            <h4 className="title">상품목록</h4>
            {products.map((product, i) => {
                return (
                    <div className="food" key={product}>
                        <h4>{product} $40</h4>
                        <img className="food-img" src={`/food${i}.png`} alt={product} />
                        {/* <Image className="food-img" src={이미지} width={500} height={500} /> */}

                        <span> {count} </span>
                        <button onClick={up}>+</button>
                        <button onClick={down}>-</button>
                    </div>
                )
            })}
        </div>
    )
}
// 'use client';

// import Image from "next/image";
// // import 이미지 from '/public/food0.png';
// import { useState } from "react";


// export default function List() {
//     let products = ['tomato', 'pasta', 'coconut'];
//     let [count, setCount] = useState(0);

//     function up() {
//         setCount(count + 1);
//     }

//     function down() {
//         if (count > 0) {
//             setCount(count -1 );
//         }
//     }

//     return (
//         <div>
//             <h4 className="title">상품목록</h4>
//             {products.map((product, i) => {
//                 return (
//                     <div className="food" key={product}>
//                         <h4>{product} $40</h4>
//                         <img className="food-img" src={`/food${i}.png`} alt={product} />
//                         {/* <Image className="food-img" src={이미지} width={500} height={500} /> */}

//                         <span> {count} </span>
//                         <button onClick={up}>+</button>
//                         <button onClick={down}>-</button>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

import { connectDB } from '@/util/database'
import Link from 'next/link'
import DetailLink from './DetailLink'

export default async function List() {
    const db = (await connectDB).db('forum')
    const result = await db.collection('post').find().toArray()

    return (
      <div className="list-bg">
        { result.map((item, i) => 
            <div className="list-item" key={item._id.toString()}>
                <Link href={`/detail/${item._id.toString()}`}>
                    <h4>{item.title}</h4>
                </Link>
                <DetailLink id={item._id.toString()} />
                <p>{item.content}</p>
                <p>ID: {item._id.toString()}</p>
            </div>
        )}
        
        {/* 게시글이 없을 때 */}
        {result.length === 0 && (
            <div className="list-item">
                <h4>게시글이 없습니다</h4>
                <p>첫 번째 게시글을 작성해보세요!</p>
            </div>
        )}
      </div>
    )
  } 

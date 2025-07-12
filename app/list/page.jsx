import Image from "next/image";
// import 이미지 from '/public/food0.png';

export default function List() {
    let products = ['tomato', 'pasta', 'coconut'];

    return (
        <div>
            <h4 className="title">상품목록</h4>
            {products.map((product, i) => {
                return (
                    <div className="food" key={product}>
                        <h4>{product} $40</h4>
                        <img className="food-img" src={`/food${i}.png`} alt={product} />
                        {/* <Image className="food-img" src={이미지} width={500} height={500} /> */}
                    </div>
                )
            })}
        </div>
    )
}
'use client'

export default function Error({error, reset}) {

    return (
        <div>
            <h4>에러발생!!!!!!!!! 비상!!!!!!!!</h4>
            <button onClick={() => reset()}>다시시도(새고)</button>
        </div>
    )
}
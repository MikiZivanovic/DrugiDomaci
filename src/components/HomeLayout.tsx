import React from 'react'

export default function HomeLayout(props: React.PropsWithChildren) {
    return (
        <div className='home-layout'>
            <div className='container home-content'>
                {props.children}
            </div>
        </div>
    )
}

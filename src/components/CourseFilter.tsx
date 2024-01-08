import React from 'react'
import { Label } from '../model'
import Form from './form/Form'

interface Props {
    onChange: (val: React.SetStateAction<any>) => void,
    value: any,
    labels: Label[],
    maxPage: number
}

export default function CourseFilter(props: Props) {
    return (
        <div className='search-filter'>
            <Form formValue={props.value} onChange={modifier => {
                props.onChange((prev: any) => {
                    if (typeof modifier === 'function') {
                        return {
                            ...modifier(prev),
                            page: 0,
                        }
                    }
                    return {
                        ...modifier,
                        page: 0
                    }
                })
            }} className='search-form'>
                <Form.Input name='name' placeholder='Search...' />
            </Form>
            <button
                onClick={() => {
                    props.onChange((prev: any) => {
                        return {
                            ...prev,
                            page: (prev.page || 0) - 1
                        }
                    })
                }}
                disabled={props.value.page === 0}
                className="btn btn-white mt-3 border-dark"
            > &laquo;</button>
            <button
                onClick={() => {
                    props.onChange((prev: any) => {
                        return {
                            ...prev,
                            page: (prev.page || 0) + 1
                        }
                    })
                }}
                disabled={props.value.page >= props.maxPage}
                className="btn btn-white mt-3 border-dark"
            > &raquo;</button>
        </div>
    )
}

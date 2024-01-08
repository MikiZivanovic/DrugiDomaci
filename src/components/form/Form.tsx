import React, { useContext, useState } from 'react'

interface FormValue {
    [key: string]: any
}

const FormContext = React.createContext({
    value: {} as FormValue,
    onChange: (name: string, value: any) => { }
});

export function useFormContext() {
    return useContext(FormContext);
}

interface Props {
    title: string;
    onSubmit: (val: FormValue) => void,
    children: React.ReactNode
}

export default function Form(props: Props) {
    const [formValue, setFormValue] = useState<FormValue>({})
    return (
        <div>
            <h2 className='text-center'>
                <strong>{props.title}</strong>
            </h2>
            <form onSubmit={e => {
                e.preventDefault();
                props.onSubmit(formValue);
            }}>
                <FormContext.Provider value={{
                    value: formValue,
                    onChange: (name, value) => {
                        setFormValue(prev => {
                            return {
                                ...prev,
                                [name]: value
                            }
                        })
                    }
                }}>
                    {props.children}
                </FormContext.Provider>
            </form>
        </div>
    )
}

interface InputProps {
    name: string,
    required?: boolean,
    type?: React.HTMLInputTypeAttribute,
    label: string,
    textArea?: boolean,
    placeholder: string
}

function FormInput(props: InputProps) {
    const { value, onChange } = useFormContext();
    return <div className='form-group mt-3'>
        {props.label && <label >{props.label}</label>}
        {
            props.textArea ? (
                <textarea className='form-control' required={props.required}
                    value={value[props.name]} placeholder={props.placeholder} onChange={e => onChange(props.name, e.currentTarget.value)}></textarea>
            ) : (
                <input className='form-control' required={props.required} type={props.type}
                    value={value[props.name]} placeholder={props.placeholder} onChange={e => onChange(props.name, e.currentTarget.value)} />
            )
        }
    </div>
}

Form.Input = FormInput;
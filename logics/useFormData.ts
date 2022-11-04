
import _ from "lodash";
import React, { Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";


export const useFormData = <TData = any>(props: Props<TData>): UseFormData<TData> => {

    const [formData, setFormData] = useState<TData>(props.formData);
    const [errors, setErrors] = useState<any>()
    const [changedField, setChangedField] = useState<string[]>([])

    const handleInputChange = (key: string, value: any) => {
        setChangedField(_.uniq([...changedField!, key]))
        let obj = updateValue(formData, key, value)
        setFormData(obj)
    }

    const getTextFieldProps = useCallback((name: string): FieldProps => {
        return {
            name,
            error: errors?.[name] !== undefined,
            helperText: errors?.[name],
            value: read(formData, name) || undefined,
            required: props.required?.includes(name),
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean) => {
                if (checked !== undefined) {
                    return handleInputChange(name, checked)
                }
                handleInputChange(name, e.target.value)
            }
        }

    }, [formData])

    const isValid = (render: boolean = true): boolean => {
        const _errors = evalErrors()
        if (render) {
            setErrors(_errors)
            // scroll to invalid element
        }
        return _.isEmpty(_errors)
    }

    const evalErrors = useCallback(() => {
        let _errors: ErrorType = {}
        Object.keys(formData as any).forEach((key) => {
            const value = (formData as any)?.[key]
            const error = props.validate?.(key, value, formData)
            if (error) {
                _errors[key] = error
            }
        })

        props.required?.forEach((key) => {
            const value = (formData as any)?.[key]
            if (value === null || value === undefined || value === '') {
                _errors[key] = "Ce champ est requis"
            }
        })

        return _errors
    }, [formData])

    return {
        formData,
        setFormData,
        handleInputChange,
        getTextFieldProps,
        isValid,
        changedField
    }
}


type Props<TData = any> = {
    id?: string

    formData: TData,
    /**
     * Array that contain all required fields
     */
    required?: Array<string>
    /**
     * Function that check if the entiere form is valid
     * @param name Field name
     * @param value field value
     * @param formData all form data
     * @returns The new error message
     */
    validate?: (name: string, value: any, formData?: TData) =>  string | React.ReactNode | undefined | void

    /**
     * Array that contain field to a live validation
     */
    liveValidation?: Array<string>
}

export type UseFormData<TData> = {
    formData: TData
    setFormData: Dispatch<SetStateAction<TData>>
    /** Callback that will set form hooks global value */
    handleInputChange: (key: string, value: any) => void

    /** 
     * Array of string containing all changed fields
    */
    changedField?: string[]

    getTextFieldProps: (name: string) => FieldProps
    /**
     * Function that will check if formData is valid
     * It will check if required field is empty and show error
     * Then will execute "validate" function
     * @param render false will prevent rendering of components
     */
     isValid: (render?: boolean) => boolean
}

type FieldProps = {
    name: string
    value: any
    error?: boolean
    required?: boolean
    helperText?: string | React.ReactNode,
    onChange?: ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean) => void)
        | ((e: React.ChangeEvent<HTMLInputElement>, value?: string) => void)
        | ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)
}

type ErrorType = Record<string, string | ReactNode>


/**
 * @param obj object to update
 * @param path path to update
 * @param value value to set
 * @returns a new object with the updated value even if the path is nested
 */
const updateValue = (obj: any, path: string, value: any) => {
    let clonedObj = _.cloneDeep(obj)
    const keys = path.split('.')
    const lastKey = keys.pop()
    const lastObj = keys.reduce((obj, key) => obj[key] = obj[key] || {}, clonedObj)
    lastObj[lastKey!] = value
    return clonedObj
}

/**
 * 
 * @param obj object to read
 * @param path path to read
 * @returns value from a path even if the path is nested
 */
const read = (obj: any, path: string) => {
    let clonedObj = _.cloneDeep(obj)
    return path.split('.').reduce((o, i) => o?.[i], clonedObj)
}
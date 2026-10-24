import React, {ReactNode, useRef, useState} from 'react';
import './inputFile.scss';
import {FormState, UseFormSetValue, UseFormTrigger} from 'react-hook-form';
import {useTranslation} from "react-i18next";

interface RduInputFileProps {
    id: string;
    name: string;
    feature: string;
    multiple: boolean;
    autoFocus?: boolean;
    autoComplete: 'none' | 'inline' | 'list' | 'both' | undefined;
    disabled: boolean;
    accept: string;
    formState: FormState<any>
    successMsg?: boolean;
    errorMsg?: boolean;
    helpMsg?: boolean;
    setValue: UseFormSetValue<any>;
    trigger: UseFormTrigger<any>;
    schema: any;
    deleteIcon?: ReactNode;
}

export function RDU_InputFile({
                                 id,
                                 name,
                                 feature,
                                 multiple,
                                 autoFocus,
                                 autoComplete,
                                 disabled,
                                 accept,
                                 formState,
                                 successMsg,
                                 errorMsg,
                                 helpMsg,
                                 setValue,
                                 trigger,
                                 schema,
                                 deleteIcon
                             }: RduInputFileProps) {
    const { t } = useTranslation()

    const [localFiles, setLocalFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSelectFile = (input: FileList | File[]) => {
        const files = Array.isArray(input) ? input : Array.from(input);
        const data = new DataTransfer();
        if (multiple) {
            const update = [...localFiles, ...files];
            setLocalFiles(update);
            update.forEach((file) => { data.items.add(file); });
        } else {
            setLocalFiles(files);
            files.forEach((file) => { data.items.add(file); });
        }
        setValue(name, data.files);
        trigger(name);
    }

    const handleRemoveFile = (index: number) => {
        const filtered = localFiles.filter((_, i) => i !== index);
        setLocalFiles(filtered);
        const data = new DataTransfer();
        filtered.forEach((file) => { data.items.add(file) });
        setValue(name, data.files);
        trigger(name);
    }


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFiles = e.dataTransfer.files;
        if(droppedFiles && droppedFiles.length > 0){
            if(multiple){
                handleSelectFile(Array.from(droppedFiles));
            } else {
                handleSelectFile([droppedFiles[0]]);
            }

        }
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }


    return (
        <fieldset className={'rdu-input-file'}>
            <label htmlFor={id}>
                { t(`${feature}.${name}.label`) }
                {!schema.shape[name]?.isOptional() && '*'}
            </label>
                <div className={'rdu-input-file-drop-zone'}
                     onDragEnter={handleDragEnter}
                     onDragOver={handleDragOver}
                     onDragLeave={handleDragLeave}
                     onDrop={handleDrop}
                >
                    <p>
                        { t(`${feature}.${name}.dropMessage`) }
                    </p>
                    <button
                        title={ t(`${feature}.${name}.buttonAddFile`) }
                        type="button"
                        className={'rdu-add'}
                        onClick={() => inputRef.current?.click()}
                    >
                        { t(`${feature}.${name}.buttonAddFile`) }
                    </button>
                    <ul>
                        { localFiles.map((file, i) => (
                            <li key={i}>
                                {file.name}
                                <button
                                    title={ t(`${feature}.${name}.buttonRemove`) }
                                    type="button"
                                    className={'rdu-remove'}
                                    onClick={() => handleRemoveFile(i)}>
                                    {deleteIcon}
                                </button>
                            </li>))
                        }
                    </ul>
                </div>

            <input
                type="file"
                id={id}
                ref={inputRef}
                name={name}
                className={`
                ${errorMsg && formState.errors?.[name] ? 'rdu-is-invalid' : ''}
                ${successMsg && !formState.errors[name] && formState.isValid ? 'rdu-is-valid' : ''}
                ${helpMsg ? 'rdu-show-help' : ''}`}
                multiple={multiple}
                accept={accept}
                autoFocus={autoFocus}
                disabled={disabled}
                required={!schema.shape[name]?.isOptional()}
                autoComplete={autoComplete}
                onChange={(e) => {
                    if(e.target.files) {
                        handleSelectFile(e.target.files);
                    }
                }}
            />

            { helpMsg && <div className={'rdu-help-feedback'}>
                { t(`${feature}.${name}.help`) }
            </div> }

            {
                errorMsg && <div className={'rdu-invalid-feedback'}>
                    { t(`${feature}.${name}.${formState.errors?.[name]?.message}`) }
                </div>
            }

            {
                successMsg && <div className={'rdu-valid-feedback'}>
                    { t(`${feature}.${name}.success`) }
                </div>
            }

        </fieldset>
    );
}

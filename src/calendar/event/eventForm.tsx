import React, { ReactElement, useState, SetStateAction, Dispatch, FormEvent } from "react";

type InputFieldProps = {
    name: string; 
    type: string;
    onInputSubmit: (content: string, setError: Dispatch<SetStateAction<string>>) => void;
    error?: string;
};

function InputField({name, type, onInputSubmit}: InputFieldProps): ReactElement {
    const [error, setError] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        const content = e.target.value;
        onInputSubmit(content, setError);
    };

    return (
        <>
            <label>{name}</label>
            <input 
                className="form-text" 
                name={name} 
                type={type} 
                autoComplete="off" 
                onSubmit={onSubmit}
            />

            {(error === "") ? 
                "" : <label className="warning">{error}</label>
            }
        </>
    );
}

type TextAreaFieldProps = {
    name: string;
    onInputSubmit: (content: string, setError: Dispatch<SetStateAction<string>>) => void;
};

function TextAreaField({name, onInputSubmit}: TextAreaFieldProps): ReactElement {
    const [error, setError] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        const content = e.target.value;
        onInputSubmit(content, setError);
    };
    
    return (
        <>
            <label>{name}</label>
            <textarea 
                className="form-text" 
                name={name} 
                autoComplete="off" 
                onSubmit={onSubmit}
            >
            </textarea>
        </>
    );
}

export function EventForm(): ReactElement {
    const onTitleSubmit = {}
    
    
    const onFormClose = (e: FormEvent) => {
        e.preventDefault();
    };

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    
    return (
        <div className="event-menu">
            <h1>Create new event</h1>

            <form>
                <div className="form-group">
                    <InputField 
                        key="title-field"
                        name="Title"
                        type="text"
                        onInputSubmit={(content, setError) => {}}
                    />
                </div>

                <div className="form-group">
                    <TextAreaField 
                        key="description-field"
                        name="Description"
                        onInputSubmit={(content, setError) => {}}
                    />
                </div>

                <div className="form-group">
                    <InputField 
                        key="title-field"
                        name="Event start time"
                        type="datetime-local"
                        onInputSubmit={(content, setError) => {}}
                    />
                </div>

                <div className="form-group">
                    <InputField 
                        key="title-field"
                        name="Event end time"
                        type="datetime-local"
                        onInputSubmit={(content, setError) => {}}
                    />
                </div>

                <div className="form-submit-container">
                    <input 
                        type="submit" 
                        value="Create" 
                        className="button submit-button" 
                        id="create-event-button" 
                        onClick={onFormSubmit}
                    />

                    <input 
                        type="submit" 
                        value="Close" 
                        className="button submit-button" 
                        id="close-event-button"
                        onClick={onFormClose} 
                    />
                </div>
            </form>
        </div>
    );
}
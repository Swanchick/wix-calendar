import React, { ReactElement, useState, SetStateAction, Dispatch, FormEvent } from "react";
import { EventData } from "./eventData";
import { getCurrentSecondsInPercentage } from "../../global";

type InputFieldProps = {
    name: string; 
    type: string;
    onInputSubmit: (content: string, setError: Dispatch<SetStateAction<string>>) => void;
    error?: string;
};

function InputField({name, type, onInputSubmit}: InputFieldProps): ReactElement {
    const [error, setError] = useState("");
    
    const onBlur = (e) => {
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
                onBlur={onBlur}
            />

            {(error === "") ? 
                "" : 
                <label className="warning">{error}</label>
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
    
    const onBlur = (e) => {
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
                onBlur={onBlur}
            >
            </textarea>

            {(error === "") ? 
                "" : <label className="warning">{error}</label>
            }
        </>
    );
}

export function EventForm(): ReactElement {    
    const onFormClose = (e: FormEvent) => {
        e.preventDefault();
    };

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    const event: EventData = {
        title: null,
        description: null,
        startDate: null,
        endDate: null
    };

    const onTitleSubmit = (content: string, setError: Dispatch<SetStateAction<string>>) => {
        if (content === "") {
            setError("This field should not be empty!");
            return;
        }
        
        setError("");
        event.title = content;
    };

    const onDescriptionSubmit = (content: string, setError: Dispatch<SetStateAction<string>>) => {
        if (content === "") {
            setError("This field should not be empty!");
            return;
        }

        setError("");
        event.description = content;
    };


    const onStartDateSubmit = (content: string, setError: Dispatch<SetStateAction<string>>) => {
        const date = new Date(content);
        if (isNaN(date.valueOf())) {
            setError("Invalid date field");
            return;
        }

        setError("");
        event.startDate = date;
    };
    
    const onEndDateSubmit = (content: string, setError: Dispatch<SetStateAction<string>>) => {
        const date = new Date(content);
        if (isNaN(date.valueOf())) {
            setError("Invalid date field");
            return;
        }

        if (event.startDate === null) {
            setError("Please enter \"Start Date\" before \"End Date\"!");
            return;
        }

        const startDateInPercentage = getCurrentSecondsInPercentage(event.startDate);
        const endDateInPercentage = getCurrentSecondsInPercentage(date);

        if (startDateInPercentage >= endDateInPercentage) {
            setError("\"End Date\" should not be later or same time than \"Start Date\"!");
            return;
        }

        setError("");
        event.endDate = date;
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
                        onInputSubmit={onTitleSubmit}
                    />
                </div>

                <div className="form-group">
                    <TextAreaField 
                        key="description-field"
                        name="Description"
                        onInputSubmit={onDescriptionSubmit}
                    />
                </div>

                <div className="form-group">
                    <InputField 
                        key="title-field"
                        name="Event start time"
                        type="datetime-local"
                        onInputSubmit={onStartDateSubmit}
                    />
                </div>

                <div className="form-group">
                    <InputField 
                        key="title-field"
                        name="Event end time"
                        type="datetime-local"
                        onInputSubmit={onEndDateSubmit}
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

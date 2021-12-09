import React, {useEffect, useState} from "react";
import './Form.css';
import Field from "./Field";
import FieldGroup from "./FieldGroup";
import Option from "./Option";
import Textbox from "./Textbox";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const fieldMeetsCondition = (values) => (field) => {
    if (field.conditional && field.conditional.field) {
        const segments = field.conditional.field.split("_");
        const fieldId = segments[segments.length - 1];
        return values[fieldId] === field.conditional.value;
    }
    return true;
};

const formatRequest = (values) => {
    let description = "Overview\n" + values.overview + "\n\nAcceptance Criteria\n" + values.acceptanceCriteria

    switch (values.issueType) {
        case "story":
            if (values.scenarios) {
                description = description + "\n\n" + values.scenarios
            }
    }

    return {
        "fields": {
            "project":
                {
                    "key": "CME"
                },
            "summary": values.cardName,
            "description": description,
            "issuetype": {
                "name": capitalizeFirstLetter(values.issueType)
            },
            "customfield_11501": ["Bifrost"]
        }
    }
}

const Form = ({ formData }) => {
    const [page, setPage] = useState(0);
    const [currentPageData, setCurrentPageData] = useState(formData[page]);
    const [values, setValues] = useState({});

    const onSubmit = e => {
        e.preventDefault();
        let requestBody = formatRequest(values)
        console.log(requestBody)
    };

    useEffect(() => {
        const upcomingPageData = formData[page];
        setCurrentPageData(upcomingPageData);
        setValues((currentValues) => {
            const newValues = upcomingPageData.fields.reduce((obj, field) => {
                if (field.component === "field_group") {
                    for (const subField of field.fields) {
                        obj[subField._uid] = "";
                    }
                } else {
                    obj[field._uid] = "";
                }

                return obj;
            }, {});

            return Object.assign({}, newValues, currentValues);
        });
    }, [page, formData]);

    const fieldChanged = (fieldId, value) => {
        setValues(currentValues => {
            currentValues[fieldId] = value;
            return currentValues;
        });

        setCurrentPageData(currentPageData => {
            return Object.assign({}, currentPageData);
        });
    };

    const navigatePages = (direction) => () => {
        const findNextPage = (page) => {
            const upcomingPageData = formData[page];
            if (upcomingPageData.conditional && upcomingPageData.conditional.field) {
                // we're going to a conditional page, make sure it's the right one
                const segments = upcomingPageData.conditional.field.split("_");
                const fieldId = segments[segments.length - 1];

                const fieldToMatchValue = values[fieldId];

                if (fieldToMatchValue !== upcomingPageData.conditional.value) {
                    // if we didn't find a match, try the next page
                    return findNextPage(direction === "next" ? page + 1 : page - 1);
                }
            }
            // all tests for the page we want to go to pass, so go to it
            return page;
        };

        setPage(findNextPage(direction === "next" ? page + 1 : page - 1));
    };

    const nextPage = navigatePages("next");
    const prevPage = navigatePages("prev");

    return (
        <form onSubmit={onSubmit}>
            <h2>{currentPageData.label}</h2>
            {currentPageData.fields
                .filter(fieldMeetsCondition(values))
                .map(field => {
                switch (field.component) {
                    case "field_group":
                        return (
                            <FieldGroup
                                key={field._uid}
                                field={field}
                                fieldChanged={fieldChanged}
                                values={values}
                            />
                        );
                    case "options":
                        return (
                            <Option
                                key={field._uid}
                                field={field}
                                fieldChanged={fieldChanged}
                                value={values[field._uid]}
                            />
                        );
                    case "textbox":
                        return (
                            <Textbox
                                key={field._uid}
                                field={field}
                                fieldChanged={fieldChanged}
                                value={values[field._uid]}
                                required={field.required}
                            />
                        );
                    default:
                        return (
                            <Field
                                key={field._uid}
                                field={field}
                                fieldChanged={fieldChanged}
                                value={values[field._uid]}
                                required={field.required}
                            />
                        );
                }
            })}
            {page > 0 && <button onClick={prevPage}>Back</button>}&nbsp;
            {page < formData.length - 1 && <button onClick={nextPage}>Next</button>}
            <hr />
            <input type="submit" value="Submit" onClick={onSubmit}/>
        </form>
    );
}

export default Form;
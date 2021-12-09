export const formData = [
    {
        component: "page",
        label: "Bifrost Jira Issue Generator",
        _uid: "0c946643-5a83-4545-baea-055b27b51e8a",
        fields: [
            {
                component: "options",
                label: "Issue Type",
                type: "radio",
                _uid: "issueType",
                options: [
                    {
                        component: "option",
                        label: "Story",
                        value: "story"
                    },
                    {
                        component: "option",
                        label: "Bug",
                        value: "bug"
                    },
                    {
                        component: "option",
                        label: "Spike",
                        value: "spike"
                    }
                ]
            },
            {
                component: "text",
                label: "Card Name",
                type: "text",
                _uid: "cardName",
                required: true
            },
            {
                component: "textbox",
                label: "Overview",
                _uid: "overview",
                required: true
            },
            {
                component: "textbox",
                label: "Acceptance Criteria",
                _uid: "acceptanceCriteria",
                conditional: {
                    value: "story",
                    field: "issueType"
                }
            },
            {
                component: "text",
                label: "Scenarios",
                type: "text",
                _uid: "storyScenarios",
                conditional: {
                    value: "story",
                    field: "issueType"
                }
            },
            {
                component: "text",
                label: "Technical Notes",
                type: "textarea",
                _uid: "storyTechnicalNotes",
                conditional: {
                    value: "story",
                    field: "issueType"
                }
            },
            {
                component: "text",
                label: "Actual Result",
                type: "text",
                _uid: "bugActualResult",
                conditional: {
                    value: "bug",
                    field: "issueType"
                }
            },
            {
                component: "text",
                label: "Expected Result",
                type: "text",
                _uid: "bugExpectedResult",
                conditional: {
                    value: "bug",
                    field: "issueType"
                }
            },
            {
                component: "text",
                label: "Steps to Reproduce",
                type: "text",
                _uid: "bugStepsToReproduce",
                conditional: {
                    value: "bug",
                    field: "issueType"
                }
            }
        ]
    }
];
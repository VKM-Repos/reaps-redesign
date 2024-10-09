type Requirement = {
    id: string;
    name: string;
    label: string;
  };
  
  type RequirementMapping = {
    [key: string]: Requirement[];
  };
  

export const questions = [
    {
        name: "question1",
        label: "Are you the principal investigator or Local Principal Investigator?",
    },
    {
        name: "question2",
        label: "How would you describe yourself?",
    },
    {
        name: "question3",
        label: "Is there a Co-Principal Investigator?",
    },
    {
        name: "question4",
        label: "Is the project sponsored?",
    },
    {
        name: "question5",
        label: "Did You Complete Ethics Training?",
    },
    {
        name: "question6",
        label: "Will materials or tissue specimens be shipped out of the country?",
    }
]

// ids are all unique. useful for flatmapping
export const requirements: RequirementMapping = {
    question1: [
      { id: "requirement1", 
        name: "CV",
        label: "2-page curriculum vitae" 
    },
      
    ],
    question2: [
        {
            id: "requirement2",
            name: "supervisorAttestation",
            label: "Supervisor's attestation statement"
        }
    ],
    question4: [
        {
            id: "requirement3",
            name: "Sponsor's attestation statement",
            label: "Sponsor's attestation statement"
        }
    ],
    question5: [
        {
            id: "requirement4",
            name: "Evidence of ethics training",
            label: "Evidence of ethics training",
        },
        {
            id: "requirement5",
            name: "Cover Letter/Application Letter",
            label: "Cover Letter/Application Letter"
        },
        {
            id: "requirement6",
            name: "Proposal",
            label: "Proposal"
        },
        {
            id: "requirement7",
            name: "Research tools/Questionnaire",
            label: "Research tools/Questionnaire"
        },
        {
            id: "requirement8",
            name: "Evidence of Completion",
            label: "Evidence of Completion"
        },
    ],
    question6: [
        {
            id: "requirement9",
            name: "Materials transfer agreement form",
            label: "Materials transfer agreement form",
        }
    ],
    
}

export const requestsArray = [
    "Application Info",
    "Research Info",
    "Supporting docs",
    "Summary"
]

export const signupArray = [
    "Email",
    "Verification",
    "Personal Info",
    "Password"
]

export const application = [
    {
        name: "question1",
        label: "Are you the principal investigator or Local Principal Investigator?",
        options: [
            {
                label: "Yes",
                value: "Yes",
            }
        ]
    },
    {
        name: "question2",
        label: "How would you describe yourself?",
        options: [
            {
                label: "Student",
                value: "Student",
            }
        ]
    },
    {
        name: "question3",
        label: "Is there a Co-Principal Investigator?",
        options: [
            {
                label: "No",
                value: "No",
            }
        ]
    },
    {
        name: "question4",
        label: "Is the project sponsored?",
        options: [
            {
                label: "No",
                value: "No",
            }
        ]
    },
    {
        name: "question5",
        label: "Did You Complete Ethics Training?",
        options: [
            {
                label: "No",
                value: "No",
            }
        ]
    },
    {
        name: "question6",
        label: "Will materials or tissue specimens be shipped out of the country?",
        options: [
            {
                label: "Yes",
                value: "Yes",                
            }
        ]
    }
]

export type ColumnSetup<T> = {
    header: string;
    accessor: keyof T;
    cellType?: 'text' | 'badge' | 'custom';
    customRender?: (data: any) => JSX.Element;
    headerClass?: string;
    cellClass?: string;
}


export const tableData = [
    {
        id: "1",
        title: "The Impact of MicroInteractions on Us...",
        specialization: "Medicine",
        submission: "19-01-2024",
        expiry: "-- -- -----",
        status: "Pending",
    },
    {
        id: "2",
        title: "Hands-on Science Experiments on Stu...",
        specialization: "Medicine",
        submission: "20-01-2024",
        expiry: "-- -- -----",
        status: "Declined",
    },
    {
        id: "3",
        title: "Knowledge Acquisition in Online Health",
        specialization: "Medicine",
        submission: "30-07-2024",
        expiry: "-- -- -----",
        status: "Under Review",
    },
    {
        id: "4",
        title: "A Comparative Analysis of Health...",
        specialization: "Medicine",
        submission: "19-01-2024",
        expiry: "-- -- -----",
        status: "Approved",
    },
    {
        id: "5",
        title: "Anatomy and Physiology",
        specialization: "Medicine",
        submission: "19-01-2024",
        expiry: "-- -- -----",
        status: "Draft",
    },
    {
        id: "6",
        title: "A Study of Chronic Disease Manage...",
        specialization: "Medicine",
        submission: "26-09-2024",
        expiry: "-- -- -----",
        status: "Approved"
    },
  ]
export const reviewTableData = [
    {
        id: "1",
        title: "The Impact of MicroInteractions on Us...",
        applicantName: "Abubakar Joseph",
        submission: "19-01-2024",
        status: "Unreviewed"
    },
    {
        id: "2",
        title: "Hands-on Science Experiments on Stu...",
        applicantName: "Daniel Oladejo",
        submission: "19-01-2024",
        status: "Reviewed"
    },
    {
        id: "3",
        title: "Knowledge Acquisition in Online Health",
        applicantName: "Danjuma Daramola",
        submission: "19-01-2024",
        status: "Reopened"
    },
    {
        id: "4",
        title: "A Comparative Analysis of Health...",
        applicantName: "Albert Godiya",
        submission: "19-01-2024",
        status: "Unreviewed"
    },
    {
        id: "5",
        title: "Anatomy and Physiology",
        applicantName: "Thinkerbell Bolly",
        submission: "19-01-2024",
        status: "Reviewed"
    }
  ]

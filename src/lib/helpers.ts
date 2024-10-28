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
    label:
      "Are you the principal investigator or Local Principal Investigator?",
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
  },
];

// ids are all unique. useful for flatmapping
export const requirements: RequirementMapping = {
  question1: [
    { id: "requirement1", name: "CV", label: "2-page curriculum vitae" },
    {
      id: "requirement2",
      name: "Cover Letter",
      label: "Cover Letter/Application Letter",
    },
    {
      id: "requirement3",
      name: "Proposal",
      label: "Proposal",
    },
    {
      id: "requirement4",
      name: "Research tools",
      label: "Research tools/Questionnaire",
    },
    {
      id: "requirement5",
      name: "Informed Consent Form",
      label: "Informed Consent Form",
    },
    {
      id: "requirement6",
      name: "HOD Attestation",
      label: "HOD Attestation",
    },
    {
      id: "requirement7",
      name: "One-page Plain Language Summary",
      label: "One-page Plain Language Summary",
    },
  ],
  question2: [
    {
      id: "requirement8",
      name: "supervisorAttestation",
      label: "Supervisor's attestation statement",
    },
  ],
  question4: [
    {
      id: "requirement9",
      name: "Sponsor's attestation statement",
      label: "Sponsor's attestation statement",
    },
  ],
  question5: [
    {
      id: "requirement10",
      name: "Evidence of ethics training",
      label: "Evidence of ethics training",
    },
    {
      id: "requirement11",
      name: "Evidence of Completion",
      label: "Evidence of Completion",
    },
  ],
  question6: [
    {
      id: "requirement12",
      name: "Materials transfer agreement form",
      label: "Materials transfer agreement form",
    },
  ],
};

export const requestsArray = [
  "Application Info",
  "Research Info",
  "Supporting docs",
  "Summary",
];

export const signupArray = [
  "Email",
  "Verification",
  "Personal Info",
  "Password",
];

export const application = [
  {
    name: "question1",
    label:
      "Are you the principal investigator or Local Principal Investigator?",
    value: "Yes",
  },
  {
    name: "question2",
    label: "How would you describe yourself?",
    value: "An academic/Researcher",
  },
  {
    name: "question3",
    label: "Is there a Co-Principal Investigator?",
    value: "Yes",
  },
  {
    name: "question4",
    label: "Is the project sponsored?",
    value: "No",
  },
  {
    name: "question5",
    label: "Did You Complete Ethics Training?",
    value: "Yes",
  },
  {
    name: "question6",
    label: "Will materials or tissue specimens be shipped out of the country?",
    value: "No",
  },
  {
    name: "question7",
    label: "What is the duration of the Research? (months)",
    value: "8",
  },
];

export const supportDocData = [
  {
    id: "requirement1",
    label: "2-page Curriculum Vitae",
    name: "John Doe CV",
  },
  {
    id: "requirement2",
    label: "Cover Letter/Application Letter",
    name: "Cover Letter",
  },
  {
    id: "requirement3",
    label: "Proposal",
    name: "John Doe Proposal",
  },
  {
    id: "requirement4",
    label: "Research Tools/Questionaire",
    name: "Research Tools",
  },
  {
    id: "requirement5",
    label: "Informed Consent Form",
    name: "Informed Consent Form",
  },
  {
    id: "requirement6",
    label: "Materials Transfer Agreement Form",
    name: "Materials Transfer Agreement Form",
  },
];

export type ColumnSetup<T> = {
  header: string;
  accessor: keyof T;
  cellType?: "text" | "badge" | "custom";
  customRender?: (data: any) => JSX.Element;
  headerClass?: string;
  cellClass?: string;
};

export const usersTableHeader = [];
export const usersData = [
  {
    id: 2,
    firstName: "Jawn",
    lastName: "Murray",
    email: "jawn.murray@example.com",
  },
  {
    id: 3,
    firstName: "Eric",
    lastName: "Harris",
    email: "eric.harris@example.com",
  },
  {
    id: 4,
    firstName: "Steve",
    lastName: "Smith",
    email: "steve.smith@example.com",
  },
  {
    id: 5,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
  },
  {
    id: 6,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Johnson",
    email: "david.johnson@example.com",
  },
  {
    id: 8,
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
  },
];

export const reviewersTableData = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Williams",
    email: "david.williams@example.com",
  },
  {
    id: 5,
    firstName: "Eve",
    lastName: "Davis",
    email: "eve.davis@example.com",
  },
  {
    id: 6,
    firstName: "Frank",
    lastName: "Miller",
    email: "frank.miller@example.com",
  },
];
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
    status: "Approved",
  },
];
export const reviewTableData = [
  {
    id: "1",
    title: "The Impact of MicroInteractions on Us...",
    applicantName: "Abubakar Joseph",
    submission: "19-01-2024",
    status: "Unreviewed",
  },
  {
    id: "2",
    title: "Hands-on Science Experiments on Stu...",
    applicantName: "Daniel Oladejo",
    submission: "19-01-2024",
    status: "Reviewed",
  },
  {
    id: "3",
    title: "Knowledge Acquisition in Online Health",
    applicantName: "Danjuma Daramola",
    submission: "19-01-2024",
    status: "Reopened",
  },
  {
    id: "4",
    title: "A Comparative Analysis of Health...",
    applicantName: "Albert Godiya",
    submission: "19-01-2024",
    status: "Unreviewed",
  },
  {
    id: "5",
    title: "Anatomy and Physiology",
    applicantName: "Thinkerbell Bolly",
    submission: "19-01-2024",
    status: "Reviewed",
  },
];

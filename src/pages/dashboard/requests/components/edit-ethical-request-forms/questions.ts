import useUserStore from "@/store/user-store";

export interface DocumentRequirement {
  name: string;
  label: string;
  type: "required" | "optional";
}

export interface Question {
  name: string;
  label: string;
  type: "boolean" | "string" | "counter";
  requiresFile?: string[];
  documentLabel?: string;
}

export interface QuestionsData {
  questions: Question[];
  documents: { [key: string]: DocumentRequirement[] };
}

const user = useUserStore.getState().user;

export const questionsData: QuestionsData = {
  questions: [
    {
      name: "are_you_investigator_or_local_principal_investigator",
      label:
        "Are you the principal investigator or Local Principal Investigator?",
      type: "boolean",
    },
    {
      name: "has_co_principal_investigator",
      label: "Is there a Co-Principal Investigator?",
      type: "boolean",
      requiresFile: ["letter_of_support_from_investigator"],
      documentLabel: "Letter of Support from Investigator",
    },
    {
      name: "has_project_sponsored",
      label: "Is the project sponsored?",
      type: "boolean",
      requiresFile: ["sponsor_attestation_letter"],
      documentLabel: "Sponsor Attestation Letter",
    },
    {
      name: "completed_ethics_training",
      label: "Did you complete ethics training?",
      type: "boolean",
      requiresFile: ["evidence_of_completion"],
      documentLabel: "Evidence of Completion",
    },
    {
      name: "specimen_will_be_shipped_out",
      label:
        "Will materials or tissue specimens be shipped out of the country?",
      type: "boolean",
      requiresFile: ["specimen_will_be_shipped_out_letter"],
      documentLabel: "Materials transfer agreement form",
    },
    {
      name: "duration_of_research_in_years", //change to months
      label: "What is the duration of the research (months)?",
      type: "counter",
    },
    {
      name: "research_title",
      label: "Research Title",
      type: "string",
    },
    {
      name: "objectives_of_the_study",
      label: "Objectives of the study",
      type: "string",
    },
  ],
  documents: {
    required: [
      { name: "proposal", label: "Proposal", type: "required" },
      { name: "cv", label: "2-page curriculum vitae (CV)", type: "required" },
      {
        name: "cover_letter",
        label: "Cover Letter/Application Letter",
        type: "required",
      },

      ...(user?.description === "Student"
        ? [
            {
              name: "supervisor_attestation_statement",
              label: "Supervisor Attestation Statement",
              type: "required" as const,
            },
          ]
        : []),
    ],
    optional: [
      {
        name: "language_summary",
        label: "One-page Plain Language Summary",
        type: "optional",
      },
      { name: "consent_form", label: "Consent Form", type: "optional" },
      {
        name: "questionnaire",
        label: "Research tools / Questionnaire",
        type: "optional",
      },
      { name: "hod_attestation", label: "HOD Attestation", type: "optional" },
    ],
  },
};

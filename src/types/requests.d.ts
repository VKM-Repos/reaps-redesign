import { User } from "./user";

export interface RequestItems {
  id: string;
  research_title: string;
  has_co_principal_investigator: boolean;
  has_project_sponsored: boolean;
  are_you_investigator_or_local_principal_investigator: boolean;
  user_type: string;
  duration_of_research_in_years: number;
  objectives_of_the_study: string;
  completed_ethics_training: boolean;
  specimen_will_be_shipped_out: boolean;
  expiration_date: string;
  supervisor_attestation_statement: string;
  cv: string;
  status: string;
  letter_of_support_from_investigator: string;
  cover_letter: string;
  proposal: string;
  language_summary: string;
  consent_form: string;
  evidence_of_completion: string;
  sponsor_attestation_letter: string;
  specimen_will_be_shipped_out_letter: string;
  approval_status_file: string;
  questionnaire: string;
  hod_attestation: string;
  created_at: string;
  updated_at: string;
  can_edit: boolean;
  user: User;
  request: RequestItems
}

export interface RequestArray {
  items: RequestItems[];
}

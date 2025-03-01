import { RequestItems } from "@/types/requests";
import Download from "@/components/custom/Icons/Download";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import User from "@/components/custom/Icons/User";
import Smile from "@/assets/smile.svg";
import Unhappy from "@/assets/unhappy.svg";
import Line from "@/assets/line.svg";

export const getApplicationData = (request: RequestItems) => [
    {
      name: "question1",
      label: "Are you the principal investigator or Local Principal Investigator?",
      value: request?.are_you_investigator_or_local_principal_investigator ? "Yes" : "No",
    },
    {
      name: "question3",
      label: "Is there a Co-Principal Investigator?",
      value: request?.has_co_principal_investigator ? "Yes" : "No",
    },
    {
      name: "question4",
      label: "Is the project sponsored?",
      value: request?.has_project_sponsored ? "Yes" : "No",
    },
    {
      name: "question5",
      label: "Did You Complete Ethics Training?",
      value: request?.completed_ethics_training ? "Yes" : "No",
    },
    {
      name: "question6",
      label: "Will materials or tissue specimens be shipped out of the country?",
      value: request?.specimen_will_be_shipped_out ? "Yes" : "No",
    },
    {
      name: "question7",
      label: "What is the duration of the Research? (months)",
      value: request?.duration_of_research_in_years ?? "N/A",
    },
  ];
  
  export const getSupportDocs = (request: RequestItems) =>
    [
      { id: "requirement1", label: "Curriculum Vitae", name: "CV", href: request?.cv },
      { id: "requirement2", label: "Cover Letter/Application Letter", name: "Cover Letter", href: request?.cover_letter },
      { id: "requirement3", label: "Proposal", name: "Proposal", href: request?.proposal },
      { id: "requirement4", label: "Research Tools/Questionnaire", name: "Research Tools", href: request?.questionnaire },
      { id: "requirement5", label: "Informed Consent Form", name: "Informed Consent Form", href: request?.consent_form },
      { id: "requirement6", label: "Materials Transfer Agreement Form", name: "Materials Transfer Agreement Form", href: request?.specimen_will_be_shipped_out_letter },
      { id: "requirement7", label: "Sponsor Attestation Statement", name: "Sponsor Attestation Statement", href: request?.sponsor_attestation_letter },
      { id: "requirement8", label: "Supervisor Attestation Statement", name: "Supervisor Attestation Statement", href: request?.supervisor_attestation_statement },
      { id: "requirement9", label: "HOD Attestation Form", name: "HOD Attestation Form", href: request?.hod_attestation },
      { id: "requirement10", label: "Letter of Support", name: "Letter of Support", href: request?.letter_of_support_from_investigator },
      { id: "requirement11", label: "Evidence of Completion", name: "Evidence of Completion", href: request?.evidence_of_completion },
    ].filter((doc) => doc.href);
  
  
  export const renderReview = (reviewer: any) => (
    <div
      key={reviewer.id}
      className="p-3 flex flex-col gap-[0.625rem] border-b border-b-[#0E0F0C1F]"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[0.625rem]">
          <div className="rounded-full bg-[#14155E14] p-2">
            <User />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-sm">
              {reviewer.reviewer?.first_name} {reviewer.reviewer?.last_name}
            </p>
            <p className="text-sm text-[#868687]">
              {reviewer.reviewer?.last_name}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 items-center">
          <span className="w-fit justify-self-end">
            <img
              src={["Satisfactory", "Approved"].includes(reviewer.status) ? Smile : Unhappy}
              alt={reviewer.reviewer?.first_name}
            />
          </span>
          <span
            style={{
              color: ["Satisfactory", "Approved"].includes(reviewer.status)
                ? "#34A853"
                : "#000",
            }}
            className="text-sm justify-self-end"
          >
            {reviewer.status}
          </span>
        </div>
      </div>
      <div className="pl-2 flex gap-1">
        <div className="py-2 px-3">
          <img src={Line} alt="image_photo" />
          <p>&nbsp;</p>
        </div>
        <div className="grid grid-rows-2 gap-y-1">
          <p key={reviewer.id} className="text-sm text-[#6A6A6B]">
            {reviewer?.comment || "No Comment Yet"}
          </p>
          {reviewer?.review_document && (
            <div
              key={reviewer.id}
              className="w-full min-w-[25rem] flex justify-between items-center border border-gray-300 px-6 rounded-md mb-2 bg-inherit"
            >
              <span className="flex gap-2 items-center justify-center">
                <span className="text-black text-[0.8rem]">
                  <GoogleDoc />
                </span>
                <span>Correction/Explanatory Document</span>
              </span>
              <a href={reviewer.review_document} className="p-2">
                <Download />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
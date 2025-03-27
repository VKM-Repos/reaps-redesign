import {
  EthicalRequestStore,
  useEthicalRequestStore,
} from "@/store/ethicalRequestStore";

type RequestAction = "save" | "payment";

interface RequestFormData {
  files: Record<string, File | null>;
  questions: Record<string, string | number | boolean | null>;
  evidenceOfPayment?: File;
  canEdit: boolean;
}

export class RequestService {
  private static instance: RequestService;
  private store: typeof useEthicalRequestStore;

  private constructor() {
    this.store = useEthicalRequestStore;
  }

  public static getInstance(): RequestService {
    if (!RequestService.instance) {
      RequestService.instance = new RequestService();
    }
    return RequestService.instance;
  }

  private createFormData(data: RequestFormData): FormData {
    const formData = new FormData();

    // Append files
    Object.entries(data.files).forEach(([fileName, file]) => {
      if (file) {
        formData.append(fileName, file);
      }
    });

    // Append questions
    Object.entries(data.questions).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Append evidence of payment if exists
    if (data.evidenceOfPayment) {
      formData.append("evidence_of_payment", data.evidenceOfPayment);
    }

    // Append can_edit flag
    formData.append("can_edit", JSON.stringify(data.canEdit));

    return formData;
  }

  private getStoreData(): EthicalRequestStore["data"] {
    return this.store.getState().data;
  }

  private updateStore(action: RequestAction): void {
    const currentData = this.getStoreData();
    this.store.getState().setData({
      ...currentData,
      can_edit: action === "save",
    });
  }

  public async createRequest(
    action: RequestAction,
    isManualPayment: boolean
  ): Promise<FormData> {
    // Update store with the correct action
    this.updateStore(action);

    // Get the latest store data
    const storeData = this.getStoreData();

    // Prepare form data
    const formData: RequestFormData = {
      files: storeData.ethical_request_files,
      questions: storeData.ethical_request_questions,
      canEdit: action === "save",
    };

    // Add evidence of payment for manual payments
    if (isManualPayment && action === "payment") {
      const fileEntries = Object.entries(storeData.evidence_of_payment);
      const [, file] = fileEntries[0];
      if (file instanceof File) {
        formData.evidenceOfPayment = file;
      }
    }

    return this.createFormData(formData);
  }

  public async editRequest(
    action: RequestAction,
    isManualPayment: boolean
  ): Promise<FormData> {
    // Update store with the correct action
    this.updateStore(action);

    // Get the latest store data
    const storeData = this.getStoreData();

    // Prepare form data
    const formData: RequestFormData = {
      files: storeData.ethical_request_files,
      questions: storeData.ethical_request_questions,
      canEdit: action === "save",
    };

    // Add evidence of payment for manual payments
    if (isManualPayment && action === "payment") {
      const fileEntries = Object.entries(storeData.evidence_of_payment);
      const [, file] = fileEntries[0];
      if (file instanceof File) {
        formData.evidenceOfPayment = file;
      }
    }

    return this.createFormData(formData);
  }
}

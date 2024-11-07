import { Form } from "@/components/ui/form"
import { useDonorInvestigatorStore } from "@/store/DonorsandInvestigatorsStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function AddDonor() {
    const formSchema = z.object({
        donors: z.array(z.string()).optional()
    })

    const { donor_investigator_data, setDonorInvestigatorData } = useDonorInvestigatorStore();
    const donors = ["USAID", "UNICEF", "BMGF", "WHO", "Others"]
    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                donors: donor_investigator_data.details.donors || []
            }
        },
       
    );
   
    
    const handleCheckboxChange = (donor: string, checked: boolean) => {
        const currentDonors = form.getValues("donors") || [];
        const updatedDonors = checked
          ? [...currentDonors, donor]
          : currentDonors.filter((d) => d !== donor);
    
        form.setValue("donors", updatedDonors);
        setDonorInvestigatorData({
            details: {
                ...donor_investigator_data.details, 
                donors: updatedDonors,
            },
        });
      };

    return (
        <div className="w-full">
            <Form {...form}>
                <form className="flex gap-1 items-center justify-start flex-wrap">
                    {donors.map((donor) => (
                        <label key={donor} className="flex py-3 px-4 gap-4 items-center">
                            <input 
                                id={donor}
                                value={donor}
                                type="checkbox"
                                className="w-[1.375rem] h-[1.375rem]"
                                {...form.register('donors')}
                                onChange={(e) => handleCheckboxChange(donor, e.target.checked)}
                                checked={form.watch('donors')?.includes(donor)} />
                                {donor}
                        </label>
                    ))}   
                </form>
            </Form>
        </div>
    )
}
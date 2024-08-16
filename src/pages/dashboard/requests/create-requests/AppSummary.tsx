// set up summary of all steps so far
// import { useRequestsStore } from '@/context/RequestFormStore';
import { Button } from '@/components/ui/button';
import { useStepper } from '@/context/StepperContext';
import { useEffect } from 'react'

// type Props = {
//     handleNext: Function
// }

const AppSummary = () => {

    // const { data, setData } = useRequestsStore();

    // const form = useForm<z.infer<typeof formSchema>>({
    //   resolver: zodResolver(formSchema),
    // });
    const { setStep } = useStepper();
  
      const updateStep = () => {
          setStep(3);
        }
  
        
      useEffect(() => {
        updateStep();
      }, [updateStep])
  
      
  return (
    <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
      <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Your application summary</h1>
          <p className='text-sm text-[#868786]'>Please ensure all data is inputted correctly  before making payments</p>
      </div>
      <div className="md:w-4/5 w-full max-w-[368px] md:max-w-[526px] mx-auto my-0 flex flex-col gap-4">
        <div className='flex justify-between '>
          <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Application Summary</h1>
          <Button>
          </Button>
        </div>

      </div>
      </div>
  )
}

export default AppSummary
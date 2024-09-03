import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Please fill this field" }),
  email: z.string()
    .min(1, { message: "Please fill this field" })
    .email({ message: "Invalid email address" }),
  institution: z.string().min(1, { message: "Please fill this field" }),
  notifications: z.boolean().optional(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Please fill this field" })
    .min(7, {message: "Password must contain a minimum of 7 characters"})
});

export type FormSchemaType = z.infer<typeof formSchema>;

const settings = [
    {
        title: "Profile",
        label: "Change your Personal Information",
        icon: "",
        content: ""
    },
    {
        title: "Email Settings",
        label: "holumidey22@gmail.com",
        icon: "",
        content: ""
    },
    {
        title: "Institution",
        label: "IChange your institution",
        icon: "",
        content: ""
    },
    {
        title: "Education",
        label: "Update your education level and ORCID ID",
        icon: "",
        content: ""
    },
    {
        title: "Notifications",
        label: "Choose what we get in touch about",
        icon: "",
        content: ""
    },
    {
        title: "Change Password",
        label: "********",
        icon: "",
        content: ""
    },
]
export default function Settings() {
    return (
        <div className="flex flex-col gap-[1.25rem] mb-20">
            <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                <h1 className="text-[1.875rem] font-bold">Settings</h1>
            </div>

        </div>
    )
}
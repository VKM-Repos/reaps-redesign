// add all forms
import { UseFormRegister } from "react-hook-form";
import { FormSchemaType } from "..";
import FormInput from "@/components/custom/FormInput";

type SettingsProps = {
  register: UseFormRegister<FormSchemaType>;
};

export const ProfileSettings = ({ register }: { register: SettingsProps }) => {
    return (
        <>
            <FormInput 
                />
        </>
    )
}
export const EmailSettings = ({ register }: { register: SettingsProps }) => {

}
export const InstitutionSettings = ({ register }: { register: SettingsProps }) => {

}
export const EducationSettings = ({ register }: { register: SettingsProps }) => {

}
export const NotificationsSettings = ({ register }: { register: SettingsProps }) => {

}
export const PasswordSettings = ({ register }: { register: SettingsProps }) => {

}
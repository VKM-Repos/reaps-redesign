/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EducationLevel, Gender } from "@/types/enums";

interface AdminDetailsFormProps {
  form: any;
}

const AdminDetailsForm = ({ form }: AdminDetailsFormProps) => {
  return (
    <div>
      <h2 className="font-semibold my-5">Institution Administrator Details</h2>
      <div className="flex flex-col gap-8 border p-5 rounded-xl">
        {/* First Name & Last Name */}
        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="admin_email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="admin_phone_number"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ORCID Number (Optional) */}
        <FormField
          control={form.control}
          name="orcid"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>ORCID Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter ORCID (if applicable)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border border-black/20">
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Gender.MALE}>Male</SelectItem>
                  <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Education Level */}
        <FormField
          control={form.control}
          name="education_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border border-black/20">
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={EducationLevel.HIGH_SCHOOL}>
                    High School
                  </SelectItem>
                  <SelectItem value={EducationLevel.BACHELORS}>
                    Bachelors
                  </SelectItem>
                  <SelectItem value={EducationLevel.MASTERS}>
                    Masters
                  </SelectItem>
                  <SelectItem value={EducationLevel.PHD}>PhD</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AdminDetailsForm;

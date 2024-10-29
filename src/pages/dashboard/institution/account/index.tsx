import { accountData } from "@/lib/helpers";
import AccountTable from "../components/AccountTable";
import CreateAccountDialog from "../components/CreateAccountDialog";
import { Link } from "react-router-dom";

export default function InstitutionAccount() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className=" text-xl3 font-inter font-semibold">Account</h2>
        <Link
          to={"transactions"}
          className="font-inter font-semibold text-primary cursor-pointer"
        >
          Payment transactions
          <hr className="border-primary border-1" />
        </Link>
      </div>
      <p className="text-xs mt-5 mb-16">
        The pricing page helps you to get information on what you will be
        charged based on your category as a researcher.{" "}
      </p>
      <CreateAccountDialog action="new" />
      <div className="my-10">
        <AccountTable accountTableData={accountData} />
      </div>
    </div>
  );
}

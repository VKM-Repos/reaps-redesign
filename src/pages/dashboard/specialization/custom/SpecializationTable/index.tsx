import CustomTable from '@/components/custom/CustomTable';
import EmptySpecializations from '../EmptySpecialization';
import { columns } from './columns';
import { SpecializationItems } from '@/types/specialization';
import AddSpecialization from '../AddSpecialization';

type Props = {
  data: SpecializationItems[];
};

const SpecializationTable = ({ data }: Props) => {
  return (
    <div>
      {data.length > 0 ? (
        <CustomTable data={data} columns={columns} />
      ) : (
        <EmptySpecializations>
          <AddSpecialization />
        </EmptySpecializations>
      )}
    </div>
  );
};

export default SpecializationTable;

import React from 'react';
import { TextField, Divider } from '@UiKitComponents';
import { Company, TFormCreateCompany, TUpdateCompany } from '@Types/company.types';
import { HeaderSaveAction, InputContainer } from '@components';
import { useDispatch } from 'react-redux';
import { updateCompany } from '@Actions/company.action';
import { schemaCompany } from '@schema/company';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditProps {
  currentCompany: Company;
  backToPreview: (modeEdit: boolean) => void;
}

const Edit: React.FC<EditProps> = (props) => {
  const { currentCompany, backToPreview } = props;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormCreateCompany>({
    resolver: yupResolver(schemaCompany),
  });

  const onSubmit = (company: TFormCreateCompany) => {
    console.log(company);
    const newCompany: TUpdateCompany = {
      ...company,
      companyId: currentCompany.companyId,
      cityId: company.cityId.value,
      countryId: company.countryId.value,
    };
    dispatch(updateCompany(newCompany));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderSaveAction
        title={currentCompany.name}
        errors={errors}
        onCancelButton={backToPreview}
      />
      <div className="form_box">
        <InputContainer title="Summary" columns={2}>
          <TextField
            errorText={errors.name?.message}
            id="CompanyName"
            placeholder="Company name"
            label="Company name"
            defaultValue={currentCompany.name}
            isActive
            {...register('name')}
          />

          <TextField
            errorText={errors.taxOffice?.message}
            id="TaxOffice"
            placeholder="Tax Office"
            label="Tax Office"
            defaultValue={currentCompany.taxOffice}
            isActive
            {...register('taxOffice')}
          />

          <TextField
            errorText={errors.companyCode?.message}
            id="CompanyCode"
            placeholder="Company code"
            label="Company code"
            defaultValue={currentCompany.companyCode}
            isActive
            {...register('companyCode')}
          />
          <TextField
            errorText={errors.taxNumber?.message}
            id="TXN"
            placeholder="TXN"
            label="TXN"
            defaultValue={currentCompany.taxNumber}
            isActive
            {...register('taxNumber', { valueAsNumber: true })}
          />
        </InputContainer>
        <Divider margin="40px 0 20px 0" />
        <div className="markup_helper-box">
          <InputContainer title="Location">
            <TextField
              errorText={errors.address?.message}
              id="Address"
              placeholder="Add address"
              label="Address"
              defaultValue={currentCompany.address}
              isActive
              {...register('address')}
            />
          </InputContainer>
          <InputContainer title="Contacts">
            <TextField
              errorText={errors.contactName?.message}
              id="Email"
              placeholder="Email"
              label="Email"
              defaultValue={currentCompany.contactName}
              isActive
              {...register('contactName')}
            />
            <TextField
              errorText={errors.phone?.message}
              id="PhoneNumber"
              placeholder="Phone number"
              label="Phone number"
              defaultValue={currentCompany.phone}
              isActive
              {...register('phone')}
            />
          </InputContainer>
        </div>
      </div>
    </form>
  );
};
export default Edit;

import * as yup from 'yup';

export const costCenterSchema = yup.object({
  costCenterCode: yup
    .string()
    .required('This field is required')
    .max(50, 'Max length 50 characters'),
  name: yup.string().required('This field is required').max(150, 'Max length 150 characters'),
});

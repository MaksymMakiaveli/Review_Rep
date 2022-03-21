import * as yup from 'yup';

export const exitTypeSchema = yup.object({
  exitTypeCode: yup
    .string()
    .required('This field is required')
    .min(1, 'Min length 1 character')
    .max(50, 'Max length 150 characters'),
  name: yup
    .string()
    .required('This field is required')
    .min(1, 'Min length 1 character')
    .max(50, 'Max length 150 characters'),
});

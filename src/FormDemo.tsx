import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CheckboxProps,
  FormGroup,
  Box,
  Button,
} from '@material-ui/core';
import { Field, Form, Formik, useField, ErrorMessage } from 'formik';
import { object, string, number, array, boolean, mixed } from 'yup';
import { InvestmentDetails } from './InvestmentDetails';

const initialValues: InvestmentDetails = {
  fullName: '',
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: '',
  dependents: 0,
  acceptedTermsAndConditions: false,
};

export function FormDemo() {
  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>New Account</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={object({
            fullName: string()
              .required('Name is required blyatt')
              .min(2)
              .max(100),
            initialInvestment: number().required().min(100),
            investmentRisk: array(
              string().oneOf(['High', 'Medium', 'Low'])
            ).min(1),
            dependents: number().required().min(0).max(5),
            acceptedTermsAndConditions: boolean().oneOf([true]),
            commentAboutInvestmentRisk: mixed().when('investmentRisk', {
              is: (investmentRisk: string[]) =>
                investmentRisk.find((ir) => ir === 'High'),
              then: string().required().min(20).max(100),
              otherwise: string().min(20).max(100),
            }),
          })}
          onSubmit={(values, formikHelpers) => {
            return new Promise((res) => {
              setTimeout(() => {
                console.log(values);
                console.log(formikHelpers);
                console.log('---------------');
                formikHelpers.resetForm();
                res();
              }, 5000);
            });
          }}>
          {({ values, errors, isSubmitting }) => (
            <Form>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name='fullName' as={TextField} label='Full Name' />
                  <ErrorMessage name='fullName' />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name='initialInvestment'
                    type='number'
                    as={TextField}
                    label='Initial Investment'
                  />
                  <ErrorMessage name='initialInvestment' />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <MyCheckbox name='investmentRisk' value='High' label='High' />
                  <MyCheckbox
                    name='investmentRisk'
                    value='Medium'
                    label='Medium'
                  />
                  <MyCheckbox name='investmentRisk' value='Low' label='Low' />
                  <ErrorMessage name='investmentRisk' />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name='commentAboutInvestmentRisk'
                    as={TextField}
                    multiline
                    rows={3}
                    rowsMax={10}
                  />
                  <ErrorMessage name='commentAboutInvestmentRisk' />
                </FormGroup>
              </Box>

              <Box>
                <FormGroup>
                  <Field name='dependents' as={TextField} select>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Field>
                  <ErrorMessage name='dependents' />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <MyCheckbox
                    name='acceptedTermsAndConditions'
                    label='Accept terms and conditions'
                  />
                  <ErrorMessage name='acceptedTermsAndConditions' />
                </FormGroup>
              </Box>

              <Box>
                <Button type='submit' disabled={isSubmitting}>
                  Submit
                </Button>
              </Box>
              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export function MyCheckbox(props: MyCheckboxProps) {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  });
  return (
    <FormControlLabel
      control={<Checkbox {...field} {...props} />}
      label={props.label}
    />
  );
}

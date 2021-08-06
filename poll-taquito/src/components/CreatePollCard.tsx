import * as React from "react";
import * as Yup from "yup";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import DatePicker from "@material-ui/lab/DatePicker";
import { Formik, Form, Field } from "formik";
import { Button, Grid, TextField } from "@material-ui/core";
import { useWallet } from "@tz-contrib/react-wallet-provider";
import { createPoll } from "../contract";
import { useToasts } from "react-toast-notifications";
import { FormikTextField } from "./FormikTextField";


async function getNextPollId() {
  return await fetch(`https://api.florencenet.tzkt.io/v1/bigmaps/${process.env.REACT_APP_BIGMAP_POLLS}/keys`)
    .then(response => response.json())
    .then(polls => {
      return polls.length + 1
    });
}

export default function CreatePollCard() {
  const { connected } = useWallet();
  const { addToast } = useToasts();
  const validationSchema = Yup.object().shape({
    pollId: Yup.string().required("Required"),
    endDate: Yup.date().required("Required"),
    startDate: Yup.date().required("Required"),
    noOfOptions: Yup.number()
      .min(2, "Min 2 options required")
      .required("Required"),
    title: Yup.string().required("Required"),
    category: Yup.string().required("Required")
  });
  const [nextPollId, setNextPollId] = React.useState("1");
  React.useEffect(() => {
    getNextPollId()
      .then(pollId =>{
        setNextPollId(pollId.toString())
      })
      .catch(err => console.error(err));
  }, []);
  const handleSubmit = async (values: any, helper: any) => {
    if (connected) {
      try {
        const hash = await createPoll(
          values.category,
          values.endDate,
          values.noOfOptions,
          values.startDate,
          values.title,
          {
            discourse: 'test-thread-1',
            description: 'Lorem ipsum hic et nuncum'
          }
        );
        if (hash) {
          addToast("Tx Submitted", {
            appearance: "success",
            autoDismiss: true,
          });
          helper.resetForm();
        }
      } catch (error) {
        console.log(error);
        const errorMessage = error?.data[1]?.with?.string || "Tx Failed";
        addToast(errorMessage, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };
  const dateStart = new Date()
  var dateEnd = new Date()
  dateEnd.setDate(dateEnd.getDate() + 1)

  return (
    <Card sx={{ maxWidth: "21.5rem" }}>
      <CardHeader title="Create A Poll" subheader="Start a new poll" />
      <CardContent>
        <Formik
          initialValues={{ 
            pollId: nextPollId, 
            startDate: dateStart, 
            endDate: dateEnd, 
            noOfOptions: 2,
            title: "",
            category: ""
          }}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange
        >
          {({ setFieldValue, errors, values, touched, isValid, dirty }) => (
            <Form>
              <Grid direction="column" container spacing={3}>
                <Grid item>
                  <Field
                    component={FormikTextField}
                    name="pollId"
                    type="text"
                    label="Poll ID"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    label="Start Date"
                    name="startDate"
                    component={DatePicker}
                    onChange={(value: any) => {
                      setFieldValue("startDate", value);
                    }}
                    renderInput={(params: any) => (
                      <TextField {...params} fullWidth />
                    )}
                    error={touched.startDate && Boolean(errors.startDate)}
                    helperText={touched.startDate ? errors.startDate : ""}
                    disablePast
                  />
                </Grid>
                <Grid item>
                  <Field
                    label="End Date"
                    name="endDate"
                    component={DatePicker}
                    onChange={(value: any) => {
                      setFieldValue("endDate", value);
                    }}
                    renderInput={(params: any) => (
                      <TextField {...params} fullWidth />
                    )}
                    error={touched.endDate && Boolean(errors.endDate)}
                    helperText={touched.endDate ? errors.endDate : ""}
                    disablePast
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={FormikTextField}
                    name="noOfOptions"
                    type="number"
                    label="Number of options"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={FormikTextField}
                    name="title"
                    type="text"
                    label="Title"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    name="category"
                    as="select"
                  >
                    <option value="">Select Category</option>
                    <option value="1">Proposal</option>
                    <option value="2">Question</option>
                  </Field>
                </Grid>
                {/* <Grid item>
                  <Field
                    component={FormikTextField}
                    name="ipfsMeta"
                    type="textarea"
                    label="Extra metadata"
                    fullWidth
                  />
                </Grid> */}
                <Grid item>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={!connected || !isValid || !dirty}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

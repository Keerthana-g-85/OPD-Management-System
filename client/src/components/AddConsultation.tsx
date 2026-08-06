import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useApi from "./Api";
import type { PrescriptionInput } from "../Types";
export default function AddConsultation() {
  const [consultation, setConsultation] = useState({
    appointment: "",
    notes: "",
    follow_up: "",
    status: "",
  });
  const [prescriptions, setPrescriptions] = useState([
    {
      consultattion: "",
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
    },
  ]);

  const [error, setError] = useState({
    appointment: false,
    notes: false,
    follow_up: false,
    status: false,
    consultattion: false,
    name: false,
    dosage: false,
    frequency: false,
    duration: false,
  });
  const [message, setMessage] = useState({
    appointment: "",
    notes: "",
    follow_up: "",
    status: "",
    consultattion: "",
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
  });

  function handlePrescription({
    index,
    field,
    value,
  }: PrescriptionInput) {
    setPrescriptions((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  }
  function handleAddPrescription() {
    setPrescriptions((prev) => [
      ...prev,
      {
        consultattion: "",
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  }

  // const queryClient = useQueryClient();
  function handleConsultation() {
    if (!consultation.notes) {
      setError((prev) => ({ ...prev, notes: true }));
      setMessage((prev) => ({ ...prev, notes: "Notes is required" }));
    }

    if (!consultation.follow_up) {
      setError((prev) => ({ ...prev, follow_up: true }));
      setMessage((prev) => ({ ...prev, follow_up: "Notes is required" }));
    }

    if (!consultation.notes || !consultation.follow_up) {
      return;
    } else {
      addConsultationMutataion.mutate();
    }
  }

  const addConsultationMutataion = useMutation({
    mutationFn: handleAddConsultation,
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({
    //     queryKey: ["consultation"],
    //   });
    // },
  });
  async function handleAddConsultation() {
    const prescriptionData = prescriptions
      .map(
        (item) => `{
        name: "${item.name}"
        dosage: "${item.dosage}"
        frequency: ${item.frequency}
        duration: ${item.duration}
      }`,
      )
      .join(",");

    const response = await useApi({
      query: `mutation {
      addConsultation(
        input: {
          appointment_id: "eca0bc71-4783-4725-9359-c74973404979"
          notes: "${consultation.notes}"
          follow_up: "${consultation.follow_up}"
          status: true
          prescriptions: [${prescriptionData}]
        }
      ) {
        success
        message
      }
    }`,
    });

    console.log(response);
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Notes</Typography>
          <TextField
            required
            fullWidth
            id={error.notes ? "outlined-error" : "outlined-required"}
            value={consultation.notes}
            error={error.notes}
            helperText={message.notes}
            onChange={(e) => {
              setConsultation((prev) => ({ ...prev, notes: e.target.value }));
              setError((prev) => ({ ...prev, notes: false }));
              setMessage((prev) => ({ ...prev, notes: "" }));
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Follow Up</Typography>
          <TextField
            required
            fullWidth
            id={error.follow_up ? "outlined-error" : "outlined-required"}
            value={consultation.follow_up}
            error={error.follow_up}
            helperText={message.follow_up}
            onChange={(e) => {
              setConsultation((prev) => ({
                ...prev,
                follow_up: e.target.value,
              }));
              setError((prev) => ({ ...prev, follow_up: false }));
              setMessage((prev) => ({ ...prev, follow_up: "" }));
            }}
          />
        </Grid>
      </Grid>
      {prescriptions.map((item, index) => (
        <Grid
          container
          spacing={3}
          key={index}
          sx={{ border: "1px solid #ddd", p: 2, mb: 2 }}
        >
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Prescription {index + 1}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>Name</Typography>
            <TextField
              fullWidth
              value={item.name}
              onChange={(e) =>
                handlePrescription({index:index, field :"name", value: e.target.value})
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>Dosage</Typography>
            <TextField
              fullWidth
              value={item.dosage}
              onChange={(e) =>
                handlePrescription({index:index, field :"dosage", value: e.target.value})
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>Frequency</Typography>
            <TextField
              fullWidth
              value={item.frequency}
              onChange={(e) =>
                handlePrescription({index:index, field :"frequency", value: e.target.value})
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>Duration</Typography>
            <TextField
              fullWidth
              value={item.duration}
              onChange={(e) =>
                handlePrescription({index:index, field :"duration", value: e.target.value})
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            {index > 0 && (
              <Button
                color="error"
                onClick={() =>
                  setPrescriptions((prev) => prev.filter((a, i) => i !== index))
                }
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
      <Button variant="contained" onClick={handleAddPrescription}>
        + Add Prescription
      </Button>
      <Button onClick={handleConsultation}>ADD CONSULTATION</Button>
    </>
  );
}

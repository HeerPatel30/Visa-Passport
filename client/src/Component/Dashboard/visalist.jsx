// VisaListMUI.jsx
import React, { useEffect, useState } from "react";
import {
  Box, Button, IconButton, InputAdornment, MenuItem, Modal, Pagination,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Divider, Grid, Snackbar, Tooltip
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import MuiAlert from '@mui/material/Alert';

const visaTypeMap = {
  1: "Tourist",
  2: "Business",
  3: "Student",
  4: "Work",
  5: "Travel",
};

const statusMap = {
  0: "Pending",
  1: "Approved",
  2: "Rejected",
  3: "Under Review",
};

export default function VisaListMUI() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [visaDetail, setVisaDetail] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const limit = 3;

  const fetchData = async () => {
    try {
      const res = await fetch("https://visa-passport.onrender.com/admin/visalist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          uid: localStorage.getItem("uid"),
          unqkey: localStorage.getItem("unqkey"),
        },
        body: JSON.stringify({
          search,
          page,
          limit,
          filter: {
            ...(fromDate && { fromDate }),
            ...(toDate && { toDate }),
            ...(status !== "" && { status }),
          },
        }),
      });
      const result = await res.json();
      if (result.status === 200) {
        const nested = result?.data?.[0];
        setApplications(Array.isArray(nested?.data) ? nested.data : []);
        setTotalCount(nested?.totalCount?.[0]?.count || 0);
      } else {
        setApplications([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error("Error fetching visa data", err);
    }
  };

  const fetchVisaDetail = async (visano) => {
    try {
      const res = await fetch("https://visa-passport.onrender.com/visa/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visano }),
      });
      const result = await res.json();
      if (result.status === 200) {
        const nestedData = result?.data;
        setVisaDetail(nestedData || null);
      }
    } catch (err) {
      console.error("Error fetching visa detail", err);
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Delete this visa application?")) return;
    try {
      const res = await fetch("https://visa-passport.onrender.com/admin/visadelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          uid: localStorage.getItem("uid"),
          unqkey: localStorage.getItem("unqkey"),
        },
        body: JSON.stringify({ _id }),
      });
      const result = await res.json();
      if (result.status === 200) fetchData();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleStatusUpdate = async (_id, status) => {
    try {
      const res = await fetch("https://visa-passport.onrender.com/admin/visaupdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          uid: localStorage.getItem("uid"),
          unqkey: localStorage.getItem("unqkey"),
        },
        body: JSON.stringify({ _id, status }),
      });
      const result = await res.json();
      if (result.status === 200) {
        fetchData();
        setSnackbar({ open: true, message: "Status updated successfully", severity: "success" });
      }
    } catch (err) {
      console.error("Status update failed", err);
      setSnackbar({ open: true, message: "Status update failed", severity: "error" });
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [search, fromDate, toDate, status]);

  const renderDetails = (data) => {
    const fields = {
      "Full Name": data.fullName,
      "DOB": new Date(data.dateOfBirth).toLocaleDateString(),
      Gender: data.gender,
      Nationality: data.nationality,
      Email: data.email,
      Phone: data.phone,
      Address: data.address,
      "Passport No": data.passportNumber,
      "Passport Issue Date": new Date(data.passportIssueDate).toLocaleDateString(),
      "Passport Expiry Date": new Date(data.passportExpiryDate).toLocaleDateString(),
      "Visa Type": visaTypeMap[data.visaType],
      Purpose: data.travelPurpose,
      "Travel From": new Date(data.travelFromDate).toLocaleDateString(),
      "Travel To": new Date(data.travelToDate).toLocaleDateString(),
      Destination: data.destinationCountry,
      Status: statusMap[data.status],
      Submitted: new Date(data.submittedAt).toLocaleString(),
    };

    const docGroups = [
      { label: "Passport Copy", files: data.passportCopy },
      { label: "Photo", files: data.photo },
      { label: "Invitation Letter", files: data.invitationLetter },
      { label: "Financial Support", files: data.financialSupport },
    ];

    return (
      <Box>
        <Grid container spacing={2}>
          {Object.entries(fields).map(([label, val]) => (
            <Grid item xs={12} sm={6} key={label}>
              <Typography variant="body2"><strong>{label}:</strong> {val || "N/A"}</Typography>
            </Grid>
          ))}
        </Grid>

        <Box mt={3}>
          <Typography variant="h6">Uploaded Documents</Typography>
          <Grid container spacing={2} mt={1}>
            {docGroups.flatMap((group) =>
              (group.files || []).map((doc, idx) => (
                <Grid item xs={12} sm={6} md={4} key={doc._id || `${group.label}-${idx}`}>
                  <Typography variant="subtitle2">{group.label} {idx + 1}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="small"
                    onClick={() => window.open(doc.url, "_blank")}
                  >
                    View
                  </Button>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h5" align="center" gutterBottom>Visa Applications</Typography>

      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          size="small"
          type="date"
          label="From"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          size="small"
          type="date"
          label="To"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          size="small"
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {Object.entries(statusMap).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={fetchData}>Apply</Button>
        <Button variant="outlined" onClick={() => {
          setSearch("");
          setFromDate("");
          setToDate("");
          setStatus("");
          setPage(1);
          fetchData();
        }}>Reset</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Visa Type</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app, index) => (
              <TableRow key={index}>
                <TableCell>{app.fullName || "N/A"}</TableCell>
                <TableCell>{visaTypeMap[app.visaType] || "Unknown"}</TableCell>
                <TableCell>{app.phone || "N/A"}</TableCell>
                <TableCell>
                  {/* <Typography variant="body2" fontWeight="bold" gutterBottom>
                    {statusMap[app.status] || "Unknown"}
                  </Typography> */}
                  <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                    <Tooltip title="Mark as Pending">
                      <Button size="small" variant={app.status === 0 ? "contained" : "outlined"} color="warning" onClick={() => handleStatusUpdate(app._id, 0)}>Pending</Button>
                    </Tooltip>
                    <Tooltip title="Mark as Approved">
                      <Button size="small" variant={app.status === 1 ? "contained" : "outlined"} color="success" onClick={() => handleStatusUpdate(app._id, 1)}>Approve</Button>
                    </Tooltip>
                    <Tooltip title="Mark as Rejected">
                      <Button size="small" variant={app.status === 2 ? "contained" : "outlined"} color="error" onClick={() => handleStatusUpdate(app._id, 2)}>Reject</Button>
                    </Tooltip>
                    <Tooltip title="Mark as Under Review">
                      <Button size="small" variant={app.status === 3 ? "contained" : "outlined"} color="info" onClick={() => handleStatusUpdate(app._id, 3)}>Review</Button>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button size="small" onClick={() => {
                    setSelectedVisa(app);
                    fetchVisaDetail(app.visano);
                  }} color="primary">View</Button>
                  <Button size="small" onClick={() => handleDelete(app._id)} color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} />
      </Box>

      <Modal open={!!selectedVisa} onClose={() => {
        setSelectedVisa(null);
        setVisaDetail(null);
      }}>
        <Box sx={{
          bgcolor: 'background.paper',
          m: 'auto',
          mt: 4,
          p: 4,
          borderRadius: 2,
          width: '90%',
          maxWidth: 800,
          position: 'relative',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <IconButton onClick={() => {
            setSelectedVisa(null);
            setVisaDetail(null);
          }} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
          <Typography variant="h6" gutterBottom>Visa Application Details</Typography>
          {visaDetail ? renderDetails(visaDetail) : <Typography variant="body2">Loading...</Typography>}
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

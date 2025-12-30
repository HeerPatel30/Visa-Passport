import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Divider,
  Grid,
  Link,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";

export default function PassportListMUI() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [bookletType, setBookletType] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [notification, setNotification] = useState(null);
  const limit = 2;

  const showNotification = (msg, type = "info") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchData = async () => {
    try {
      const res = await fetch("https://visa-passport.onrender.com/admin/passportlist", {
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
          filter: search
            ? {}
            : {
                ...(fromDate && { fromDate }),
                ...(toDate && { toDate }),
                ...(status && { status }),
                ...(bookletType && { bookletType }),
              },
        }),
      });
      const result = await res.json();
      if (result.status === 200) {
        const nested = result?.data?.[0];
        setApplications(Array.isArray(nested?.data) ? nested.data : []);
        setTotalCount(nested?.totalCount?.[0]?.count || 0);
      } else {
        showNotification(result.message || "Failed to fetch applications", "error");
        setApplications([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error("Failed to fetch applications", err);
      showNotification("Failed to fetch applications", "error");
      setApplications([]);
      setTotalCount(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleStatusChange = async (_id, newStatus) => {
    try {
      const res = await fetch("https://visa-passport.onrender.com/admin/passportupdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          uid: localStorage.getItem("uid"),
          unqkey: localStorage.getItem("unqkey"),
        },
        body: JSON.stringify({ _id, status: newStatus }),
      });
      const result = await res.json();
      if (result.status === 200) {
        showNotification("Status updated successfully", "success");
        fetchData();
      } else {
        showNotification("Failed to update status", "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("Error updating status", "error");
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await fetch("https://visa-passport.onrender.com/admin/passportdelete", {
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
      if (result.status === 200) {
        showNotification("Application deleted successfully", "success");
        fetchData();
      } else {
        showNotification("Failed to delete application", "error");
      }
    } catch (err) {
      console.error("Delete failed", err);
      showNotification("Error deleting application", "error");
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  const renderDetails = (app) => {
    const infoSections = {
      "Personal Information": {
        Name: `${app.firstname} ${app.middlename} ${app.lastname}`,
        Gender: app.gender,
        DOB: app.dob,
        Nationality: app.nationality,
        MaritalStatus: app.maritalstatus,
      },
      "Contact Information": {
        Email: app.email,
        Phone: app.phone,
        AlternatePhone: app.alternatePhone,
      },
      "Address Information": {
        PresentAddress: app.presentAddress,
        PermanentAddress: app.permanentAddress,
      },
      "Family Details": {
        Father: app.fatherName,
        Mother: app.motherName,
        Spouse: app.spouseName,
      },
      "Employment Details": {
        Occupation: app.occupation,
        Organization: app.organization,
        Designation: app.designation,
      },
      "Passport Details": {
        BookletType: app.bookletType,
        Status: app.status,
        SubmissionDate: new Date(app.submissionDate).toLocaleString(),
      },
    };

    return (
      <Box>
        {Object.entries(infoSections).map(([section, fields]) => (
          <Box key={section} mb={3}>
            <Typography variant="h6" gutterBottom>{section}</Typography>
            <Grid container spacing={2}>
              {Object.entries(fields).map(([label, val]) => (
                <Grid item xs={12} sm={6} key={label}>
                  <Typography variant="body2"><strong>{label}:</strong> {val || "N/A"}</Typography>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}

        <Typography variant="h6" gutterBottom>Uploaded Documents</Typography>
        <Grid container spacing={2}>
          {app.documents && Object.entries(app.documents).map(([docKey, value]) => {
            const displayName = docKey
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase());

            if (Array.isArray(value)) {
              return value.map((url, idx) => (
                <Grid item xs={12} sm={6} md={4} key={`${docKey}-${idx}`}>
                  <Typography variant="subtitle2" gutterBottom>
                    {displayName} {idx + 1}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="small"
                    onClick={() => window.open(url, "_blank")}
                  >
                    View
                  </Button>
                </Grid>
              ));
            }

            return (
              <Grid item xs={12} sm={6} md={4} key={docKey}>
                <Typography variant="subtitle2" gutterBottom>{displayName}</Typography>
                {value ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="small"
                    onClick={() => window.open(value, "_blank")}
                  >
                    View
                  </Button>
                ) : (
                  <Typography variant="body2" color="text.secondary">Not Uploaded</Typography>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h5" align="center" gutterBottom>Passport Applications</Typography>

      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField size="small" label="Search" value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ endAdornment: <InputAdornment position="end"><Search /></InputAdornment> }} />
        <TextField size="small" type="date" label="From" value={fromDate} onChange={(e) => setFromDate(e.target.value)} InputLabelProps={{ shrink: true }} />
        <TextField size="small" type="date" label="To" value={toDate} onChange={(e) => setToDate(e.target.value)} InputLabelProps={{ shrink: true }} />
          <TextField size="small" select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ minWidth: 200 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>
        <TextField size="small" select label="Booklet" value={bookletType} onChange={(e) => setBookletType(e.target.value)} sx={{ minWidth: 200 }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="30 pages">30 pages</MenuItem>
          <MenuItem value="60 pages">60 pages</MenuItem>
        </TextField>
        <Button variant="contained" onClick={fetchData}>Apply</Button>
        <Button variant="outlined" onClick={() => { setSearch(""); setFromDate(""); setToDate(""); setStatus(""); setBookletType(""); setPage(1); fetchData(); }}>Reset</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Booklet</TableCell>
              <TableCell>Documents</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.firstname} {item.middlename} {item.lastname}</TableCell>
                <TableCell>{item.gender || "N/A"}</TableCell>
                <TableCell>{item.bookletType || "N/A"}</TableCell>
                <TableCell>{item.documents?.aadhaarCard ? "✅" : "❌"}</TableCell>
                <TableCell>{item.phone || "N/A"}</TableCell>
                <TableCell>
                  {["Pending", "Approved", "Rejected"].map(statusOption => (
                    <Button
                      key={statusOption}
                      size="small"
                      variant={item.status === statusOption ? "contained" : "outlined"}
                      color={statusOption === "Approved" ? "success" : statusOption === "Rejected" ? "error" : "warning"}
                      onClick={() => item.status !== statusOption && handleStatusChange(item._id, statusOption)}
                      sx={{ m: 0.3 }}
                    >
                      {statusOption}
                    </Button>
                  ))}
                </TableCell>
                <TableCell>
                  <Button size="small" onClick={() => setSelectedApplication(item)} color="success">View</Button>
                  <Button size="small" onClick={() => handleDelete(item._id)} color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} />
      </Box>

      <Modal open={!!selectedApplication} onClose={() => setSelectedApplication(null)}>
        <Box sx={{ bgcolor: 'background.paper', m: 'auto', mt: 4, p: 4, borderRadius: 2, width: '90%', maxWidth: 800, position: 'relative', maxHeight: '90vh', overflow: 'auto' }}>
          <IconButton onClick={() => setSelectedApplication(null)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
          <Typography variant="h6" gutterBottom>Application Details</Typography>
          {selectedApplication && renderDetails(selectedApplication)}
        </Box>
      </Modal>
    </Box>
  );
}

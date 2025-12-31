import React, { useEffect, useState } from "react";
import {
  Box, Button, IconButton, InputAdornment, MenuItem, Modal, Pagination,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Divider, Grid, Chip, Card, CardContent,
  Tooltip, Fade, CircularProgress, Avatar
} from "@mui/material";
import { 
  X, Search, Trash2, Eye, RefreshCw, 
  FileText, CheckCircle, Clock, Maximize2, User, MapPin, Briefcase
} from "lucide-react";
import { motion } from "framer-motion";

export default function PassportListMUI() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const fetchData = async () => {
    setLoading(true);
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
          filter: search ? {} : {
            ...(fromDate && { fromDate }),
            ...(toDate && { toDate }),
            ...(status && { status }),
          },
        }),
      });
      const result = await res.json();
      if (result.status === 200) {
        const nested = result?.data?.[0];
        setApplications(Array.isArray(nested?.data) ? nested.data : []);
        setTotalCount(nested?.totalCount?.[0]?.count || 0);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [page, status]);

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
      if (res.ok) {
        if (selectedApplication) setSelectedApplication({ ...selectedApplication, status: newStatus });
        fetchData();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Delete this application permanently?")) return;
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
      if (res.ok) fetchData();
    } catch (err) { console.error(err); }
  };

  const getStatusColor = (s) => {
    const cleanS = s?.trim();
    if (cleanS === "Approved") return "success";
    if (cleanS === "Rejected") return "error";
    return "warning";
  };

  return (
    <Box p={4} sx={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="800" color="primary.dark">Passport Console</Typography>
          <Typography variant="body2" color="text.secondary">Verification & Management System</Typography>
        </Box>
        <Button variant="contained" startIcon={<RefreshCw size={18}/>} onClick={fetchData} sx={{ borderRadius: 3, px: 3 }}>
          Sync Records
        </Button>
      </Box>

      {/* Filter Bar */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center', boxShadow: 'none', border: '1px solid #e0e4ec' }}>
        <TextField
          size="small"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search size={18} /></InputAdornment> }}
        />
        <TextField select size="small" label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ minWidth: 150 }}>
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </TextField>
        <Button variant="contained" onClick={fetchData}>Apply</Button>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <Table>
          <TableHead sx={{ bgcolor: "#fafafa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Applicant</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Booklet</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} align="center" sx={{ py: 8 }}><CircularProgress /></TableCell></TableRow>
            ) : (
              applications.map((item) => (
                <TableRow key={item._id} hover component={motion.tr} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{item.firstname.trim()[0]}</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="600">{`${item.firstname} ${item.lastname}`}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.nationality}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell><Chip label={item.bookletType} size="small" variant="outlined" /></TableCell>
                  <TableCell>
                    <Typography variant="caption" display="block">{item.email}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.phone}</Typography>
                  </TableCell>
                  <TableCell><Chip label={item.status} color={getStatusColor(item.status)} size="small" /></TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => { setSelectedApplication(item); setPreviewUrl(item.documents?.aadhaarCard); }} color="primary"><Eye size={18}/></IconButton>
                    <IconButton onClick={() => handleDelete(item._id)} color="error"><Trash2 size={18}/></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination count={Math.ceil(totalCount/limit)} page={page} onChange={(_,v) => setPage(v)} color="primary" />
      </Box>

      {/* Verification Workspace Modal */}
      <Modal open={!!selectedApplication} onClose={() => { setSelectedApplication(null); setPreviewUrl(null); }} closeAfterTransition>
        <Fade in={!!selectedApplication}>
          <Box sx={{ 
            bgcolor: 'background.paper', m: 'auto', mt: { xs: 2, md: 4 }, p: 0, 
            borderRadius: 4, width: '95%', maxWidth: 1200, outline: 'none',
            height: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
          }}>
            <Box p={2} display="flex" justifyContent="space-between" alignItems="center" bgcolor="primary.dark" color="white">
              <Typography variant="h6" fontWeight="600">Verification Workspace</Typography>
              <IconButton onClick={() => { setSelectedApplication(null); setPreviewUrl(null); }} sx={{ color: 'white' }}><X /></IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Left Side: Full Details */}
              <Box sx={{ width: '40%', p: 4, overflowY: 'auto', borderRight: '1px solid #eee' }}>
                {selectedApplication && (
                  <>
                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.light' }}>{selectedApplication.firstname.trim()[0]}</Avatar>
                        <Box>
                            <Typography variant="h6" lineHeight={1}>{`${selectedApplication.firstname} ${selectedApplication.lastname}`}</Typography>
                            <Typography variant="caption" color="text.secondary">Code: {selectedApplication.code}</Typography>
                        </Box>
                    </Box>

                    <Typography variant="overline" color="primary" fontWeight="700"><User size={14} style={{verticalAlign:'middle', marginRight:4}}/>Personal & Family</Typography>
                    <Grid container spacing={2} mt={0.5} mb={3}>
                        <Grid item xs={6}><Typography variant="caption" color="text.secondary">Father</Typography><Typography variant="body2" fontWeight="500">{selectedApplication.fatherName}</Typography></Grid>
                        <Grid item xs={6}><Typography variant="caption" color="text.secondary">Mother</Typography><Typography variant="body2" fontWeight="500">{selectedApplication.motherName}</Typography></Grid>
                        <Grid item xs={6}><Typography variant="caption" color="text.secondary">DOB</Typography><Typography variant="body2">{selectedApplication.dob}</Typography></Grid>
                        <Grid item xs={6}><Typography variant="caption" color="text.secondary">Gender</Typography><Typography variant="body2">{selectedApplication.gender}</Typography></Grid>
                    </Grid>

                    <Typography variant="overline" color="primary" fontWeight="700"><Briefcase size={14} style={{verticalAlign:'middle', marginRight:4}}/>Employment</Typography>
                    <Box mb={3} mt={1}>
                        <Typography variant="body2" fontWeight="600">{selectedApplication.occupation} @ {selectedApplication.organization}</Typography>
                        <Typography variant="caption" color="text.secondary">{selectedApplication.designation}</Typography>
                    </Box>

                    <Typography variant="overline" color="primary" fontWeight="700"><MapPin size={14} style={{verticalAlign:'middle', marginRight:4}}/>Address</Typography>
                    <Box sx={{ bgcolor: '#f8f9fa', p: 1.5, borderRadius: 2, mb: 3, mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">Present Address</Typography>
                        <Typography variant="body2">{selectedApplication.presentAddress}</Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="overline" color="text.secondary" fontWeight="700">Documents</Typography>
                    <Grid container spacing={1} mt={1}>
                        {selectedApplication.documents && Object.entries(selectedApplication.documents).map(([key, val]) => {
                            if (Array.isArray(val)) {
                                return val.map((url, i) => (
                                    <Grid item xs={12} key={i}>
                                        <Button fullWidth variant={previewUrl === url ? "contained" : "outlined"} startIcon={<FileText size={16}/>} onClick={() => setPreviewUrl(url)} sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                                            {`${key.toUpperCase()} - PART ${i + 1}`}
                                        </Button>
                                    </Grid>
                                ));
                            }
                            return (
                                <Grid item xs={12} key={key}>
                                    <Button fullWidth variant={previewUrl === val ? "contained" : "outlined"} startIcon={<FileText size={16}/>} onClick={() => setPreviewUrl(val)} sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>

                    <Box mt={4} pt={2} sx={{ borderTop: '1px solid #eee' }}>
                        <Typography variant="subtitle2" mb={2}>Decision</Typography>
                        <Box display="flex" gap={2}>
                            <Button fullWidth variant="contained" color="success" onClick={() => handleStatusChange(selectedApplication._id, "Approved")}>Approve</Button>
                            <Button fullWidth variant="outlined" color="error" onClick={() => handleStatusChange(selectedApplication._id, "Rejected")}>Reject</Button>
                        </Box>
                    </Box>
                  </>
                )}
              </Box>

              {/* Right Side: Preview */}
              <Box sx={{ width: '60%', bgcolor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
                {previewUrl ? (
                  <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Paper elevation={0} sx={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'white', borderRadius: 4, overflow: 'hidden' }}>
                      <Box component="img" src={previewUrl} sx={{ maxWidth: '95%', maxHeight: '95%', objectFit: 'contain' }} />
                    </Paper>
                    <Button startIcon={<Maximize2 size={16}/>} sx={{ mt: 2 }} onClick={() => window.open(previewUrl, '_blank')}>View Full Resolution</Button>
                  </Box>
                ) : (
                  <Typography color="text.secondary">Select a document to preview</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
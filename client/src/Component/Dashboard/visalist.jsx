import React, { useEffect, useState } from "react";
import {
  Box, Button, IconButton, InputAdornment, MenuItem, Modal, Pagination,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Divider, Grid, Snackbar, Tooltip, Chip, Avatar,
  Fade, CircularProgress, Stack
} from "@mui/material";
import { 
  X, Search, Trash2, Eye, Globe, 
  FileText, Check, AlertCircle, RefreshCcw, Info, Maximize2, User, MapPin, FileCheck
} from "lucide-react";
import MuiAlert from '@mui/material/Alert';
import { motion } from "framer-motion";

// Configurations
const visaTypeMap = { 1: "Tourist", 2: "Business", 3: "Student", 4: "Work", 5: "Travel" };
const statusMap = {
  0: { label: "Pending", color: "warning", icon: <AlertCircle size={14} /> },
  1: { label: "Approved", color: "success", icon: <Check size={14} /> },
  2: { label: "Rejected", color: "error", icon: <X size={14} /> },
  3: { label: "Under Review", color: "info", icon: <Info size={14} /> },
};

// --- LIGHT THEME HELPER COMPONENTS ---
const DetailSection = ({ title, icon, children }) => (
  <Box sx={{ mb: 3 }}>
    <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
      <Box sx={{ color: 'primary.main', display: 'flex' }}>{icon}</Box>
      <Typography variant="overline" color="primary.main" fontWeight="900" sx={{ letterSpacing: 1.2 }}>
        {title}
      </Typography>
    </Stack>
    {children}
  </Box>
);

const DetailItem = ({ label, value, fullWidth = false }) => (
  <Grid item xs={fullWidth ? 12 : 6}>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 700, textTransform: 'uppercase', mb: 0.2, fontSize: '0.65rem' }}>
      {label}
    </Typography>
    <Typography variant="body2" fontWeight="600" color="text.primary" sx={{ wordBreak: 'break-all' }}>
      {value || '---'}
    </Typography>
  </Grid>
);

// --- MAIN COMPONENT ---
export default function VisaListMUI() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const limit = 5;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://visa-passport.onrender.com/admin/visalist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          uid: localStorage.getItem("uid"),
          unqkey: localStorage.getItem("unqkey"),
        },
        body: JSON.stringify({ search, page, limit, filter: { ...(status !== "" && { status }) } }),
      });
      const result = await res.json();
      if (result.status === 200) {
        const nested = result?.data?.[0];
        setApplications(Array.isArray(nested?.data) ? nested.data : []);
        setTotalCount(nested?.totalCount?.[0]?.count || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [page, search, status]);

  const handleStatusUpdate = async (_id, newStatus) => {
    try {
      const res = await fetch("https://visa-passport.onrender.com/admin/visaupdate", {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.getItem("token") },
        body: JSON.stringify({ _id, status: newStatus }),
      });
      if (res.ok) {
        if (selectedVisa) setSelectedVisa({ ...selectedVisa, status: newStatus });
        fetchData();
        setSnackbar({ open: true, message: "Status updated successfully", severity: "success" });
      }
    } catch (err) {
      setSnackbar({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const renderDetails = (data) => (
    <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', height: '100%', bgcolor: '#fff' }}>
      {/* Left Column: Form Details */}
      <Box sx={{ width: '45%', p: 3, overflowY: 'auto', borderRight: '1px solid #edf2f7', bgcolor: '#fff' }}>
        
        <DetailSection title="Personal Information" icon={<User size={18} />}>
          <Grid container spacing={2}>
            <DetailItem label="Full Name" value={data.fullName} />
            <DetailItem label="Contact Email" value={data.email} />
            <DetailItem label="Phone Number" value={data.phone} />
            <DetailItem label="Nationality" value={data.nationality} />
            <DetailItem label="Residential Address" value={data.address} fullWidth />
          </Grid>
        </DetailSection>

        <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />

        <DetailSection title="Travel Data" icon={<Globe size={18} />}>
          <Grid container spacing={2}>
            <DetailItem label="Destination" value={data.destinationCountry} />
            <DetailItem label="Visa Class" value={visaTypeMap[data.visaType]} />
            <DetailItem label="Valid From" value={new Date(data.travelFromDate).toLocaleDateString()} />
            <DetailItem label="Valid Until" value={new Date(data.travelToDate).toLocaleDateString()} />
            <DetailItem label="Purpose of Visit" value={data.travelPurpose} fullWidth />
          </Grid>
        </DetailSection>

        <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />

        <DetailSection title="Passport Registry" icon={<FileCheck size={18} />}>
          <Grid container spacing={2}>
            <DetailItem label="Passport ID" value={data.passportNumber} />
            <DetailItem label="Reference No" value={data.visano} />
            <DetailItem label="Expiry Date" value={new Date(data.passportExpiryDate).toLocaleDateString()} />
          </Grid>
        </DetailSection>

        <Box mt={3}>
          <Typography variant="overline" color="primary" fontWeight="900" display="block" mb={1} sx={{ fontSize: '0.7rem' }}>Registry Documents</Typography>
          <Stack spacing={1.5}>
            {data.passportCopy?.map((doc, i) => (
              <Button 
                key={i}
                fullWidth 
                variant={previewUrl === doc.url ? "contained" : "outlined"} 
                onClick={() => setPreviewUrl(doc.url)}
                startIcon={<Eye size={16}/>}
                sx={{ justifyContent: 'flex-start', borderRadius: 2.5, py: 1, textTransform: 'none', fontWeight: 600 }}
              >
                Passport Document Page {i + 1}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box mt={4} p={2.5} sx={{ bgcolor: '#f8fafc', borderRadius: 4, border: '1px solid #e2e8f0' }}>
          <Typography variant="subtitle2" fontWeight="900" mb={2} color="#1e293b">Admin Action</Typography>
          <Grid container spacing={1.5}>
            {Object.entries(statusMap).map(([key, val]) => (
              <Grid item xs={6} key={key}>
                <Button
                  fullWidth
                  variant={data.status == key ? "contained" : "outlined"}
                  color={val.color}
                  size="small"
                  onClick={() => handleStatusUpdate(data._id, parseInt(key))}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, py: 0.8 }}
                >
                  {val.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Right Column: Light Preview Area */}
      <Box sx={{ width: '55%', bgcolor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
        {previewUrl ? (
          <Stack spacing={2.5} sx={{ width: '100%', height: '100%' }}>
            <Paper elevation={0} sx={{ flexGrow: 1, bgcolor: '#fff', borderRadius: 5, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <Box component="img" src={previewUrl} sx={{ maxWidth: '92%', maxHeight: '92%', objectFit: 'contain' }} />
            </Paper>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" disableElevation sx={{ borderRadius: 3, px: 4, bgcolor: '#1e293b', '&:hover': { bgcolor: '#0f172a' } }} startIcon={<Maximize2 size={16}/>} onClick={() => window.open(previewUrl, '_blank')}>
                Open Original File
              </Button>
            </Box>
          </Stack>
        ) : (
          <Box color="#94a3b8" textAlign="center">
            <FileText size={80} strokeWidth={1.5} />
            <Typography variant="h6" fontWeight="600" mt={2}>Verification Preview</Typography>
            <Typography variant="body2">Select a document from the left to verify details</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: '-1px', color: '#0f172a' }}>Visa Records</Typography>
          <Typography variant="body2" fontWeight="500" color="text.secondary">Administrative Verification Desk</Typography>
        </Box>
        <Button variant="contained" disableElevation startIcon={<RefreshCcw size={18} />} onClick={fetchData} sx={{ borderRadius: 3, px: 3, fontWeight: 700 }}>Registry Refresh</Button>
      </Stack>

      {/* Search & Filter */}
      <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 4, display: 'flex', gap: 2, border: '1px solid #e2e8f0' }}>
        <TextField fullWidth size="small" placeholder="Search applicant name or reference..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} InputProps={{ startAdornment: <InputAdornment position="start"><Search size={18} color="#64748b" /></InputAdornment> }} />
        <TextField select size="small" label="Status Filter" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ minWidth: 180, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
          <MenuItem value="">Show All</MenuItem>
          {Object.entries(statusMap).map(([key, val]) => <MenuItem key={key} value={key}>{val.label}</MenuItem>)}
        </TextField>
      </Paper>

      {/* Registry Table */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 5, border: '1px solid #e2e8f0' }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, py: 2.5 }}>Applicant Details</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Destination & ID</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Visa Type</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800 }}>Verification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} align="center" sx={{ py: 12 }}><CircularProgress size={32} /></TableCell></TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app._id} hover component={motion.tr} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ '&:last-child td': { border: 0 } }}>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 800, width: 40, height: 40 }}>{app.fullName?.trim().charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="800" color="#0f172a">{app.fullName}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight="500">{app.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="700" color="#1e293b">{app.destinationCountry}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>{app.visano}</Typography>
                  </TableCell>
                  <TableCell><Chip label={visaTypeMap[app.visaType]} size="small" variant="outlined" sx={{ fontWeight: 800, color: '#475569', borderColor: '#e2e8f0' }} /></TableCell>
                  <TableCell><Chip label={statusMap[app.status]?.label} color={statusMap[app.status]?.color} size="small" variant="filled" sx={{ fontWeight: 900, fontSize: '0.65rem' }} /></TableCell>
                  <TableCell align="right">
                    <Tooltip title="Open Verification Desktop">
                      <IconButton color="primary" onClick={() => { setSelectedVisa(app); setPreviewUrl(app.passportCopy?.[0]?.url); }} sx={{ bgcolor: '#eff6ff', mr: 1, '&:hover': { bgcolor: '#dbeafe' } }}>
                        <Eye size={18} />
                      </IconButton>
                    </Tooltip>
                    <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#ef4444' } }}><Trash2 size={18} /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={5}>
        <Pagination count={Math.ceil(totalCount / limit)} page={page} onChange={(_, v) => setPage(v)} sx={{ '& .MuiPaginationItem-root': { fontWeight: 700, borderRadius: 2 } }} />
      </Box>

      {/* LIGHT THEME MODAL */}
      <Modal open={!!selectedVisa} onClose={() => { setSelectedVisa(null); setPreviewUrl(null); }} closeAfterTransition>
        <Fade in={!!selectedVisa}>
          <Box sx={{ bgcolor: '#fff', m: 'auto', mt: 3, borderRadius: 6, width: '96%', maxWidth: 1300, height: '90vh', outline: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)' }}>
            <Box p={2.5} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #edf2f7">
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ bgcolor: '#f1f5f9', color: '#1e293b' }}><FileCheck size={20} /></Avatar>
                <Box>
                   <Typography variant="subtitle1" fontWeight="900" color="#0f172a" lineHeight={1.2}>Verification Desktop</Typography>
                   <Typography variant="caption" color="text.secondary" fontWeight="600">Reviewing application: {selectedVisa?.visano}</Typography>
                </Box>
              </Stack>
              <IconButton onClick={() => setSelectedVisa(null)} sx={{ bgcolor: '#f8fafc' }}><X size={20} /></IconButton>
            </Box>
            {selectedVisa && renderDetails(selectedVisa)}
          </Box>
        </Fade>
      </Modal>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <MuiAlert severity={snackbar.severity} variant="filled" elevation={6} sx={{ borderRadius: 3, fontWeight: 700 }}>{snackbar.message}</MuiAlert>
      </Snackbar>
    </Box>
  );
}
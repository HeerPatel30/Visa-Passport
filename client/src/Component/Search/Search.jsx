import React, { useState } from 'react';
import {
  Box, Container, TextField, Button, Typography, Paper, Chip,
  IconButton, Modal, Fade, Backdrop, CircularProgress, Avatar, Stack, Card, CardActionArea, Tab, Tabs, InputAdornment
} from "@mui/material";
import { 
  Search, Eye, X, Clock, CheckCircle2, AlertCircle,
  Plane, ShieldCheck, Fingerprint, FileText, Globe, User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

// --- ANIMATIONS ---

const moveGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

// --- MODERN BACKGROUND COMPONENT ---

const GlobalNetworkBackground = () => (
  <Box sx={{
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    zIndex: -1, overflow: 'hidden',
    background: "linear-gradient(-45deg, #f0f4ff, #ffffff, #e0e7ff, #f8fafc)",
    backgroundSize: "400% 400%",
    animation: `${moveGradient} 15s ease infinite`,
  }}>
    {/* Animated Blobs for Depth */}
    <Box sx={{
      position: 'absolute', top: '10%', right: '10%',
      width: '500px', height: '500px',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(255,255,255,0) 70%)',
      animation: `${float} 10s ease-in-out infinite`,
    }} />
    <Box sx={{
      position: 'absolute', bottom: '5%', left: '-5%',
      width: '600px', height: '600px',
      background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(255,255,255,0) 70%)',
      animation: `${float} 12s ease-in-out infinite reverse`,
    }} />

    {/* Subtle Tech Grid */}
    <Box sx={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      opacity: 0.3,
      backgroundImage: `linear-gradient(#cbd5e1 0.5px, transparent 0.5px), linear-gradient(90deg, #cbd5e1 0.5px, transparent 0.5px)`,
      backgroundSize: '40px 40px',
      maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
    }} />
  </Box>
);

// --- MAIN COMPONENT ---

const PassportSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchMode, setSearchMode] = useState(0); 
  
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const endpoint = searchMode === 0 ? "/passport/search" : "/visa/search";
    try {
      const response = await fetch(`https://visa-passport.onrender.com${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: query }),
      });
      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.error("Search Error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    let s = status;
    if (typeof status === 'number') {
      const statusMap = { 0: 'pending', 1: 'approved', 2: 'rejected', 3: 'under review' };
      s = statusMap[status] || 'pending';
    } else if (typeof status === 'string') {
      s = status.toLowerCase().trim();
    }
    const config = {
      approved: { color: "#10b981", bg: "#ecfdf5", label: "Approved", icon: <CheckCircle2 size={14}/>, step: 3 },
      rejected: { color: "#ef4444", bg: "#fef2f2", label: "Rejected", icon: <AlertCircle size={14}/>, step: 3 },
      pending: { color: "#f59e0b", bg: "#fffbeb", label: "Pending", icon: <Clock size={14}/>, step: 1 },
      'under review': { color: "#6366f1", bg: "#eef2ff", label: "Under Review", icon: <ShieldCheck size={14}/>, step: 2 }
    };
    return config[s] || config.pending;
  };

  return (
   <Box
  sx={{
    minHeight: "100vh",
    position: "relative",
    pb: 10,
    background: `
      radial-gradient(circle at 10% 20%, rgba(180,210,255,.45) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(120,180,255,.35) 0%, transparent 40%),
      linear-gradient(135deg, #E5F0FF 0%, #F7FBFF 60%, #FFFFFF 100%)
    `
  }}
>



      <GlobalNetworkBackground />
      
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        
        {/* --- HEADER --- */}
        <Stack spacing={2} alignItems="center" sx={{ mb: 8 }}>
          <Chip 
            label="Official Document Registry" 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.8)', 
              color: '#4338ca', 
              fontWeight: 800, 
              border: '1px solid rgba(79, 70, 229, 0.2)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }} 
          />
          <Typography variant="h3" sx={{ fontWeight: 900, color: "#0f172a", textAlign: "center", letterSpacing: "-2px" }}>
            Global Registry <span style={{ color: '#4f46e5' }}>Search</span>
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', textAlign: 'center', maxWidth: 600, lineHeight: 1.6 }}>
            Access the centralized secure database for real-time status updates on passport applications and visa processing.
          </Typography>
        </Stack>

        {/* --- ACTION CARDS --- */}
        <Box sx={{ 
          display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 4, mb: 8, maxWidth: 850, mx: 'auto'
        }}>
          <ActionCard title="Passport Enrollment" desc="Create new passport applications or renewals." icon={<Fingerprint size={28} />} color="#4f46e5" onClick={() => navigate("/passportform")} />
          <ActionCard title="Visa Application" desc="Apply for travel, work, or residency permits." icon={<Plane size={28} />} color="#0ea5e9" onClick={() => navigate("/visaform")} />
        </Box>

        {/* --- SEARCH BOX (Glassmorphism) --- */}
        <Box sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.5)', 
          backdropFilter: 'blur(24px) saturate(180%)',
          p: { xs: 3, md: 6 }, 
          borderRadius: 10, 
          boxShadow: '0 40px 80px rgba(0,0,0,0.07), inset 0 0 0 1px rgba(255,255,255,0.6)', 
          border: '1px solid rgba(255, 255, 255, 0.3)',
          maxWidth: 900,
          mx: 'auto'
        }}>
          <Tabs 
            value={searchMode} 
            onChange={(e, v) => { setSearchMode(v); setResults([]); setQuery(""); }}
            centered
            sx={{ mb: 5, '& .MuiTabs-indicator': { height: 4, borderRadius: 2, bgcolor: '#4f46e5' } }}
          >
            <Tab icon={<ShieldCheck size={18}/>} iconPosition="start" label="Passport Search" sx={{ fontWeight: 800, textTransform: 'none', px: 4 }} />
            <Tab icon={<Globe size={18}/>} iconPosition="start" label="Visa Search" sx={{ fontWeight: 800, textTransform: 'none', px: 4 }} />
          </Tabs>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <TextField
              fullWidth
              placeholder={`Enter Reference Number...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              sx={{ 
                maxWidth: 500, 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 5, 
                  bgcolor: 'white',
                  '& fieldset': { borderColor: 'rgba(0,0,0,0.05)' }
                } 
              }}
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#94a3b8" />
                  </InputAdornment>
                ) 
              }}
            />
            <Button 
              variant="contained" 
              onClick={handleSearch} 
              sx={{ 
                borderRadius: 5, px: 6, py: 1.5, fontWeight: 800, bgcolor: '#4f46e5', 
                textTransform: 'none', fontSize: '1rem',
                boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)',
                '&:hover': { bgcolor: '#4338ca' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Verify Status"}
            </Button>
          </Stack>

          {/* --- RESULTS LIST --- */}
          <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {results.length > 0 ? results.map((item) => (
              <ResultCard key={item._id} item={item} config={getStatusConfig(item.status)} onOpen={() => setSelectedItem(item)} />
            )) : query && !loading && (
              <Typography textAlign="center" color="text.secondary" sx={{ py: 6, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 4 }}>
                No records found in the current registry for this reference.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>

      {/* --- STATUS MODAL --- */}
      <Modal open={!!selectedItem} onClose={() => setSelectedItem(null)} closeAfterTransition BackdropComponent={Backdrop}>
        <Fade in={!!selectedItem}>
          <Box sx={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '95%', maxWidth: 520, bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRadius: 8, p: 4, outline: 'none',
            boxShadow: '0 40px 100px rgba(0,0,0,0.2)', border: '1px solid white'
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h6" fontWeight={900} sx={{ color: '#1e293b' }}>Application Tracker</Typography>
              <IconButton onClick={() => setSelectedItem(null)} sx={{ bgcolor: '#f1f5f9' }}><X size={20}/></IconButton>
            </Stack>
            
            {selectedItem && (
              <Stack spacing={4}>
                <Box sx={{ p: 2.5, bgcolor: '#f8fafc', borderRadius: 5, display: 'flex', alignItems: 'center', gap: 2.5, border: '1px solid #e2e8f0' }}>
                  <Avatar 
                    src={selectedItem.documents?.photo || (selectedItem.passportCopy && selectedItem.passportCopy[0]?.url)} 
                    sx={{ width: 64, height: 64, borderRadius: 3, bgcolor: '#4f46e5', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' }}
                  >
                    {(selectedItem.fullName || selectedItem.firstname)?.[0] || <User size={24}/>}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={900} sx={{ color: '#0f172a', fontSize: '1.1rem' }}>
                        {selectedItem.fullName || `${selectedItem.firstname} ${selectedItem.lastname}`}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6366f1', fontFamily: 'monospace', fontWeight: 800, letterSpacing: 1 }}>
                        {selectedItem.visano || selectedItem.code}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ px: 1 }}>
                   <TimelineItem active label="Registration" date="Request submitted to registry" icon={<FileText size={16}/>} />
                   <TimelineItem 
                      active={getStatusConfig(selectedItem.status).step >= 2} 
                      label="Security Clearance" 
                      date={getStatusConfig(selectedItem.status).step >= 2 ? "Identity & Background verified" : "Awaiting verification"} 
                      icon={<ShieldCheck size={16}/>} 
                   />
                   <TimelineItem 
                      active={getStatusConfig(selectedItem.status).step === 3} 
                      label="Issuance / Result" 
                      date={getStatusConfig(selectedItem.status).label} 
                      isLast 
                      icon={getStatusConfig(selectedItem.status).icon} 
                   />
                </Box>
              </Stack>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

// --- HELPER COMPONENTS ---

const TimelineItem = ({ active, label, date, icon, isLast }) => (
  <Box sx={{ display: 'flex', gap: 2.5 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ 
        width: 40, height: 40, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        bgcolor: active ? '#4f46e5' : '#f1f5f9', color: active ? '#fff' : '#94a3b8', zIndex: 1,
        boxShadow: active ? '0 8px 16px rgba(79, 70, 229, 0.2)' : 'none'
      }}>
        {icon}
      </Box>
      {!isLast && <Box sx={{ width: 2, flexGrow: 1, bgcolor: active ? '#4f46e5' : '#e2e8f0', my: 0.5, minHeight: 45 }} />}
    </Box>
    <Box sx={{ pb: isLast ? 0 : 4, mt: 0.5 }}>
      <Typography variant="subtitle2" fontWeight={900} color={active ? '#1e293b' : '#94a3b8'}>{label}</Typography>
      <Typography variant="caption" sx={{ color: '#64748b', display: 'block', fontWeight: 500 }}>{date}</Typography>
    </Box>
  </Box>
);

const ResultCard = ({ item, config, onOpen }) => (
  <Paper elevation={0} sx={{ 
    p: 2.5, borderRadius: 5, border: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', 
    justifyContent: 'space-between', transition: '0.3s', bgcolor: 'white',
    '&:hover': { borderColor: '#4f46e5', transform: 'scale(1.01)', boxShadow: '0 12px 30px rgba(0,0,0,0.04)' } 
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
      <Avatar 
        src={item.documents?.photo || (item.passportCopy && item.passportCopy[0]?.url)} 
        sx={{ width: 52, height: 52, borderRadius: '12px', bgcolor: '#f8fafc', color: '#4f46e5', border: '1px solid #f1f5f9' }}
      >
        {(item.fullName || item.firstname)?.[0]}
      </Avatar>
      <Box>
        <Typography variant="subtitle1" fontWeight={900} color="#1e293b">
            {item.fullName || `${item.firstname || ''} ${item.lastname || ''}`}
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>
            {item.visano || item.code}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Chip 
        label={config.label} 
        icon={config.icon} 
        size="medium" 
        sx={{ 
          bgcolor: config.bg, color: config.color, fontWeight: 900, px: 1,
          '& .MuiChip-icon': { color: 'inherit' }
        }} 
      />
      <IconButton 
        onClick={onOpen} 
        sx={{ 
          bgcolor: '#f8fafc', border: '1px solid #e2e8f0', color: '#4f46e5',
          '&:hover': { bgcolor: '#4f46e5', color: 'white' }
        }}
      >
        <Eye size={20}/>
      </IconButton>
    </Box>
  </Paper>
);

const ActionCard = ({ title, desc, icon, color, onClick }) => (
  <Card sx={{ 
    borderRadius: 8, 
    bgcolor: 'white', 
    border: '1px solid rgba(0,0,0,0.03)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
    transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '&:hover': { transform: 'translateY(-8px)', borderColor: color, boxShadow: `0 20px 40px ${color}15` } 
  }}>
    <CardActionArea onClick={onClick} sx={{ p: 4 }}>
      <Box sx={{ 
        width: 56, height: 56, borderRadius: '16px', bgcolor: `${color}10`, color: color, 
        display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
        boxShadow: `0 8px 20px ${color}10`
      }}>
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={900} sx={{ color: '#0f172a', mb: 0.5 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.5 }}>{desc}</Typography>
    </CardActionArea>
  </Card>
);

export default PassportSearch;
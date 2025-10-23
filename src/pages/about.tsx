import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/about')({
  component: About,
});

/**
 * About page - Overview of the HRL Science Program
 */
function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeSection, setActiveSection] = useState('overview');

  // Table of contents navigation items
  const tocItems = [
    { id: 'overview', label: 'Program Overview' },
    { id: 'quick-reference', label: 'Quick Reference' },
    { id: 'goals', label: 'Program Goals' },
    { id: 'hypothesis', label: 'Hypothesis Framework' },
    { id: 'measures', label: 'Program Measures' },
    { id: 'species', label: 'Target Species' },
    { id: 'tributaries', label: 'Tributary Systems' },
    { id: 'science-committee', label: 'Science Committee' },
    { id: 'data-management', label: 'Data Management' },
    { id: 'peer-review', label: 'Peer Review' },
    { id: 'monitoring', label: 'Monitoring Gaps' },
    { id: 'models', label: 'Decision Support Models' },
    { id: 'reporting', label: 'Reporting Timeline' },
    { id: 'best-science', label: 'Best Available Science' },
    { id: 'thresholds', label: 'Important Thresholds' },
  ];

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tocItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar Navigation - Hidden on mobile */}
      {!isMobile && (
        <Paper
          elevation={0}
          sx={{
            width: 280,
            position: 'fixed',
            top: 80,
            left: 20,
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Contents
          </Typography>
          <List dense>
            {tocItems.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 1,
                  mb: 0.5,
                  bgcolor: activeSection === item.id ? 'primary.main' : 'transparent',
                  color: activeSection === item.id ? 'primary.contrastText' : 'text.primary',
                  '&:hover': {
                    bgcolor: activeSection === item.id ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    variant: 'body2',
                    fontWeight: activeSection === item.id ? 600 : 400
                  }} 
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Main Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          marginTop: 4, 
          marginBottom: 4,
          marginLeft: isMobile ? 'auto' : '320px',
          width: isMobile ? '100%' : 'calc(100% - 320px)',
        }}
      >
        {/* Header */}
        <Box mb={4}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            HRL Program Reference Guide
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Compiled: October 23, 2025
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sources: <Link href="https://resources.ca.gov/Initiatives/Voluntary-Agreements-Page" target="_blank" rel="noopener">HRL webpage</Link>, <Link href="https://resources.ca.gov/-/media/CNRA-Website/Files/Initiatives/Voluntary-Watershed-Agreements/Draft_VA_Science_Plan.pdf" target="_blank" rel="noopener">Science Plan</Link>, <Link href="https://resources.ca.gov/-/media/CNRA-Website/Files/Initiatives/Support-Healthy-Rivers-and-Landscape/VASciProgramDraftCharter.pdf" target="_blank" rel="noopener">Science Committee Charter</Link>
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Program Overview Section */}
        <Box id="overview" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Program Overview
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            What is the Healthy Rivers and Landscapes Program?
          </Typography>
          <Typography variant="body1" paragraph>
            The Healthy Rivers and Landscapes (HRL) Program is a voluntary collaborative agreement between 
            state agencies, federal agencies, and water agencies, serving as an alternative Program of 
            Implementation for the Sacramento River, Delta, and Tributaries update to the Bay-Delta Water Quality Control Plan (WQCP).
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Relationship to Bay-Delta Water Quality Control Plan
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Alternative Approach" 
                secondary="The HRL Program provides a voluntary, collaborative alternative to traditional regulatory implementation of water quality objectives"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Program of Implementation" 
                secondary="Serves as the implementation mechanism for achieving water quality objectives in the WQCP update"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="State Water Board Role" 
                secondary="As the regulatory agency, the State Water Resources Control Board will assess the Program in Year 8 to determine whether to continue, modify, or discontinue it based on progress toward Narrative Objectives"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Integrated Solution" 
                secondary="Combines environmental flows and habitat restoration to achieve water quality conditions that support native fish populations"
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Collaborative Governance Model
          </Typography>
          <Typography variant="body1" paragraph>
            The Program operates through a multi-tiered governance structure:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="1. Systemwide Governance Committee (SWGC): Oversees Program-wide implementation, coordinates across tributaries and Delta" />
            </ListItem>
            <ListItem>
              <ListItemText primary="2. Tributary/Delta Governance Entities: Manage implementation within their specific geographic areas" />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. Science Committee: Provides independent scientific advice and tracks ecological outcomes (advisory role)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="4. Participating Parties: Water agencies, irrigation districts, public utilities, and resource agencies working collaboratively" />
            </ListItem>
          </List>
          <Paper sx={{ p: 2, bgcolor: 'info.light', mt: 2 }}>
            <Typography variant="body2" fontWeight="600">
              Key Principle: Voluntary agreements with shared responsibility and risk and novel approaches 
              that are more expansive than those that the regulatory agency can independently mandate
            </Typography>
          </Paper>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            The Comprehensive Approach: Flow + Habitat
          </Typography>
          <Typography variant="body1" paragraph>
            The Program combines two complementary strategies:
          </Typography>
          
          <Typography variant="h6" gutterBottom fontWeight="600" mt={2}>
            Environmental Flow Measures
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Tributary Flows: Pulse flows timed to support salmon migration, reduce disease, and activate restored habitats" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Delta Outflows: Increased spring flows (January-June) to benefit Delta smelt, longfin smelt, and ecosystem processes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Flexible Implementation: Flow schedules designed with flexibility brackets to adapt to hydrologic conditions and biological needs" />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom fontWeight="600" mt={2}>
            Habitat Restoration (Non-Flow Measures)
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Spawning Habitat: Gravel augmentation and channel modifications for Chinook salmon" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Rearing Habitat: Side channels, floodplain restoration, and tidal wetlands" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Fish Passage: Screening diversions, removing/modifying barriers to access" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ecosystem Enhancement: Predator management, water quality improvements" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Scale: Hundreds of acres of habitat restoration across seven tributary systems and the Delta" />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Quick Reference Section */}
        <Box id="quick-reference" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Quick Reference
          </Typography>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Full Name</Typography>
                <Typography variant="body1">Healthy Rivers and Landscapes (HRL) Program</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Type</Typography>
                <Typography variant="body1">Voluntary agreement between California and water agencies</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Geography</Typography>
                <Typography variant="body1">Sacramento River, Delta, and tributaries</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                <Typography variant="body1">8-year term with Year 8 assessment for continuation</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Key Resources</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Link href="https://resources.ca.gov/Initiatives/Voluntary-Agreements-Page" target="_blank" rel="noopener">Program Website</Link>
                  <Typography>•</Typography>
                  <Link href="https://github.com/Healthy-Rivers-and-Landscapes-Science" target="_blank" rel="noopener">Science Program GitHub</Link>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Program Goals Section */}
        <Box id="goals" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Program Goals: Two Narrative Objectives
          </Typography>
          <Stack spacing={2} mt={2}>
            <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
              <Typography variant="h6" fontWeight="600">1. Salmon Objective</Typography>
              <Typography variant="body1">Achieve doubling of reference salmon populations</Typography>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
              <Typography variant="h6" fontWeight="600">2. Native Fish Viability Objective</Typography>
              <Typography variant="body1">Support natural production of native fish populations</Typography>
            </Paper>
          </Stack>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Hypothesis Framework Section */}
        <Box id="hypothesis" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Three-Tiered Hypothesis Framework
          </Typography>
          
          <Stack spacing={3} mt={2}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="600" color="primary.main">
                Local Tier (Project Scale - Annual)
              </Typography>
              <Typography variant="body1" paragraph>
                Individual habitat project effectiveness and species utilization of restored habitats
              </Typography>
              <Typography variant="body2" fontWeight="600">5 Assessment Types:</Typography>
              <List dense>
                <ListItem><ListItemText primary="Accounting" secondary="Built as designed per commitments?" /></ListItem>
                <ListItem><ListItemText primary="Consistency" secondary="Matches Scientific Basis Report predictions?" /></ListItem>
                <ListItem><ListItemText primary="Suitability" secondary="Appropriate water quality for target species?" /></ListItem>
                <ListItem><ListItemText primary="Utilization" secondary="Fish using the habitat?" /></ListItem>
                <ListItem><ListItemText primary="Biological Effectiveness" secondary="Intended benefits realized?" /></ListItem>
              </List>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="600" color="primary.main">
                Full Tributary & Delta Tier (Ecosystem Scale - Annual to Multi-year)
              </Typography>
              <List dense>
                <ListItem><ListItemText primary="Flow measure effects in 7 tributaries + Delta" /></ListItem>
                <ListItem><ListItemText primary="Combined flow/non-flow measure impacts" /></ListItem>
                <ListItem><ListItemText primary="Juvenile salmon productivity and condition" /></ListItem>
              </List>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="600" color="primary.main">
                Population-Level Tier (System-Wide - 3+ years)
              </Typography>
              <List dense>
                <ListItem><ListItemText primary="Adult salmon returns and cohort replacement rates" /></ListItem>
                <ListItem><ListItemText primary="System-wide trends (Sacramento & San Joaquin valleys)" /></ListItem>
                <ListItem><ListItemText primary="Acknowledges out-of-basin factors (ocean, climate, hatchery, harvest)" /></ListItem>
              </List>
            </Paper>
          </Stack>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Program Measures Section */}
        <Box id="measures" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Program Measures
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Flow Measures
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Tributary" 
                secondary="Pulse flows for migration, disease reduction, habitat activation"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Delta" 
                secondary="Spring outflows (Jan-June) for Delta smelt, longfin smelt, ecosystem health"
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Non-Flow Measures (Habitat Restoration)
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={1}>
            <Chip label="Spawning habitat (gravel)" />
            <Chip label="In-channel & side-channel rearing" />
            <Chip label="Tributary floodplain restoration" />
            <Chip label="Fish passage improvements" />
            <Chip label="Bypass floodplain (Yolo & Sutter)" />
            <Chip label="Tidal wetlands (Delta)" />
            <Chip label="Predator management" />
          </Stack>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Target Species Section */}
        <Box id="species" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Target Species
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight="600" mt={2}>
            Primary Species
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={1} mb={3}>
            <Chip label="Chinook salmon (4 runs)" color="primary" />
            <Chip label="Delta smelt" color="primary" />
            <Chip label="Longfin smelt" color="primary" />
            <Chip label="White sturgeon" color="primary" />
          </Stack>

          <Typography variant="h6" gutterBottom fontWeight="600">
            Additional Native Species
          </Typography>
          <Typography variant="body1">
            Sacramento splittail, hitch, blackfish, pikeminnow, sucker, tule perch, 
            prickly sculpin, California Bay shrimp, starry flounder
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Seven Tributary Systems Section */}
        <Box id="tributaries" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Seven Tributary Systems
          </Typography>
          <List>
            {[
              'Upper Sacramento River',
              'Feather River',
              'Yuba River',
              'American River',
              'Mokelumne River',
              'Putah Creek',
              'Tuolumne River'
            ].map((tributary, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${tributary}`} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Science Committee Section */}
        <Box id="science-committee" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Science Committee Structure
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Responsibilities
          </Typography>
          <List>
            <ListItem><ListItemText primary="1. Inform decision-making (SWGC & Tributary/Delta Governance)" /></ListItem>
            <ListItem><ListItemText primary="2. Track progress vs. Science Plan metrics" /></ListItem>
            <ListItem><ListItemText primary="3. Reduce management-relevant uncertainty" /></ListItem>
            <ListItem><ListItemText primary="4. Recommend management action adjustments" /></ListItem>
          </List>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            7 Core Participation Principles
          </Typography>
          <Stack spacing={1.5} mt={2}>
            {[
              { title: 'Best Available Science', desc: 'Includes Indigenous Knowledge as equal to western science' },
              { title: 'Efficiency', desc: 'Leverage existing programs' },
              { title: 'Forward-looking', desc: 'Anticipate learning opportunities' },
              { title: '"Safe to Fail"', desc: 'Shared risk-taking' },
              { title: 'Transparency', desc: 'Open data, plain language' },
              { title: 'Collaboration', desc: 'Engage all participants' },
              { title: 'Timeliness', desc: 'Regular communication' }
            ].map((principle, index) => (
              <Paper key={index} sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="600">{index + 1}. {principle.title}</Typography>
                <Typography variant="body2" color="text.secondary">{principle.desc}</Typography>
              </Paper>
            ))}
          </Stack>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Decision-Making
          </Typography>
          <List>
            <ListItem><ListItemText primary="Consensus-seeking approach" /></ListItem>
            <ListItem><ListItemText primary="Non-consensus issues elevated to SWGC with options" /></ListItem>
            <ListItem><ListItemText primary="Supported by Science Program Manager (DWR Lead Scientist)" /></ListItem>
            <ListItem><ListItemText primary="Independent facilitation team" /></ListItem>
          </List>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Data Management Section */}
        <Box id="data-management" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Data Management (FAIR + CARE)
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mt={2}>
            <Paper sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">FAIR Principles</Typography>
              <List dense>
                <ListItem><ListItemText primary="Findable" /></ListItem>
                <ListItem><ListItemText primary="Accessible" /></ListItem>
                <ListItem><ListItemText primary="Interoperable" /></ListItem>
                <ListItem><ListItemText primary="Reusable" /></ListItem>
              </List>
            </Paper>

            <Paper sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">CARE Principles</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>For Indigenous data</Typography>
              <List dense>
                <ListItem><ListItemText primary="Collective benefit" /></ListItem>
                <ListItem><ListItemText primary="Authority to control" /></ListItem>
                <ListItem><ListItemText primary="Responsibility" /></ListItem>
                <ListItem><ListItemText primary="Ethics" /></ListItem>
              </List>
            </Paper>
          </Stack>

          <Typography variant="h6" gutterBottom fontWeight="600" mt={3}>
            Requirements
          </Typography>
          <List>
            <ListItem><ListItemText primary="Public data repositories" /></ListItem>
            <ListItem><ListItemText primary="Public access within 1 year" /></ListItem>
            <ListItem><ListItemText primary="Machine-readable formats" /></ListItem>
            <ListItem><ListItemText primary="Reproducible workflows" /></ListItem>
            <ListItem><ListItemText primary="GitHub public repositories" /></ListItem>
          </List>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Peer Review Section */}
        <Box id="peer-review" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Peer Review Framework
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight="600" mt={3}>
            Three Review Types
          </Typography>
          <Stack spacing={2} mt={2}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">1. Independent Scientific Review</Typography>
              <Typography variant="body2" color="text.secondary">~1 year, consensus panel</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">2. Subject Matter Expert Advice</Typography>
              <Typography variant="body2" color="text.secondary">Iterative, greater than 1 year</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">3. Expedited Review</Typography>
              <Typography variant="body2" color="text.secondary">Rapid response, 2 external reviewers</Typography>
            </Paper>
          </Stack>

          <Typography variant="h6" gutterBottom fontWeight="600" mt={3}>
            Peer Review Schedule
          </Typography>
          <List>
            <ListItem><ListItemText primary="Year 1: Science Plan independent review" /></ListItem>
            <ListItem><ListItemText primary="Year 3: Triennial Report → expert advice" /></ListItem>
            <ListItem><ListItemText primary="Year 6: Triennial Report → informed by Year 3" /></ListItem>
            <ListItem><ListItemText primary="Year 7: Ecological Outcomes Analysis → peer review (possibly published articles)" /></ListItem>
          </List>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Monitoring Gaps Section */}
        <Box id="monitoring" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Priority Monitoring Gaps
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="1. Hatchery vs. natural-origin fish" 
                secondary="Need 100% marking vs. current 25%"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="2. Juvenile production estimates" 
                secondary="Standardize RST protocols"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="3. Adult population estimates" 
                secondary="Improve accuracy/consistency"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="4. Invertebrate monitoring" 
                secondary="Establish routine sampling"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="5. Non-salmonid populations" 
                secondary="Develop design-based abundance estimates"
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Decision Support Models Section */}
        <Box id="models" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Decision Support Models
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Available Models
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="CVPIA SIT Salmon DSM" 
                secondary="All salmon runs, stage-based"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Reorienting to Recovery (R2R)" 
                secondary="Modified CVPIA, broader actions"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Winter-run Life Cycle Model (WRLCM)" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Longfin Smelt Life Cycle Model" 
                secondary="In development"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Delta Smelt Life Cycle Model with Entrainment (LCME)" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="White Sturgeon Population Model" 
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            DSM Uses
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={1}>
            <Chip label="Predict population responses" />
            <Chip label="Evaluate trade-offs" />
            <Chip label="Prioritize restoration investments" />
            <Chip label="Support structured decision-making" />
            <Chip label="Inform adaptive management" />
          </Stack>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Reporting Timeline Section */}
        <Box id="reporting" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Reporting Timeline
          </Typography>
          <Stack spacing={2} mt={2}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">Annual Reports</Typography>
              <Typography variant="body2" color="text.secondary">Track implementation</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">Year 3: Triennial Report</Typography>
              <Typography variant="body2" color="text.secondary">First comprehensive synthesis</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">Year 6: Triennial Report</Typography>
              <Typography variant="body2" color="text.secondary">Updated synthesis</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">Year 7: Ecological Outcomes Analysis</Typography>
              <Typography variant="body2" color="text.secondary">Final synthesis for State Water Board</Typography>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: 'warning.light' }}>
              <Typography variant="subtitle1" fontWeight="600">Year 8: State Water Board Decision</Typography>
              <Typography variant="body2">Continue/Modify/Discontinue (Green/Yellow/Red)</Typography>
            </Paper>
          </Stack>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Best Available Science Section */}
        <Box id="best-science" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Best Available Science Criteria
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="1. Relevance" 
                secondary="Applicable to ecosystem"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="2. Inclusiveness" 
                secondary="Thorough cross-discipline review"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="3. Objectivity" 
                secondary="Scientific method standards"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="4. Transparency" 
                secondary="Clear sources, methods, limitations"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="5. Timeliness" 
                secondary="Data before decisions, current applicability"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="6. Peer review" 
                secondary="Rigorous independent evaluation"
              />
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Information Sources (Weight of Evidence)
          </Typography>
          <Stack spacing={1.5} mt={2}>
            <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
              <Typography variant="subtitle2" fontWeight="600">1. Peer-reviewed publications</Typography>
              <Typography variant="body2">Preferred for credibility</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="600">2. Scientific reports/publications</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="600">3. Unpublished results</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="600">4. Expert opinion, Indigenous Knowledge, Place-based knowledge</Typography>
            </Paper>
          </Stack>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Important Thresholds Section */}
        <Box id="thresholds" mb={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Important Thresholds & Standards
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Juvenile Monitoring (RST)
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mt={2}>
            <Paper sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="600" color="warning.main">Minimum</Typography>
              <List dense>
                <ListItem><ListItemText primary="±20% accuracy" /></ListItem>
                <ListItem><ListItemText primary=">3% trap efficiency" /></ListItem>
                <ListItem><ListItemText primary="Weekly efficiency trials" /></ListItem>
              </List>
            </Paper>

            <Paper sx={{ p: 3, flex: 1, bgcolor: 'success.light' }}>
              <Typography variant="h6" gutterBottom fontWeight="600">Gold Standard</Typography>
              <List dense>
                <ListItem><ListItemText primary="±10% accuracy" /></ListItem>
                <ListItem><ListItemText primary=">5% trap efficiency" /></ListItem>
                <ListItem><ListItemText primary="Twice-weekly efficiency trials" /></ListItem>
              </List>
            </Paper>
          </Stack>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Adult Monitoring
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mt={2}>
            <Paper sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="600" color="warning.main">Minimum</Typography>
              <Typography variant="body2">±20% accuracy (total and natural-origin)</Typography>
            </Paper>

            <Paper sx={{ p: 3, flex: 1, bgcolor: 'success.light' }}>
              <Typography variant="h6" gutterBottom fontWeight="600">Gold Standard</Typography>
              <Typography variant="body2">±10% accuracy (total and natural-origin)</Typography>
            </Paper>
          </Stack>

          <Typography variant="h5" gutterBottom fontWeight="600" mt={3}>
            Data Publication
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Timeline" 
                secondary="Public within 1 year (except where prohibited)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Format" 
                secondary="Machine-readable, with metadata"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Platform" 
                secondary="Public repository with REST API"
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Footer Note */}
        <Box mb={4}>
          <Paper sx={{ p: 3, bgcolor: 'grey.100' }}>
            <Typography variant="body2" color="text.secondary" fontStyle="italic" paragraph>
              This reference guide provides compressed key information from HRL Program documents. 
              For full details, consult the original source documents linked at the top of this page.
            </Typography>
            <Typography variant="body2" color="text.secondary" fontStyle="italic" sx={{ mt: 1 }}>
              Note: This page was generated using AI (Large Language Model) with Retrieval-Augmented Generation (RAG) 
              to synthesize information from official HRL program documentation. While efforts have been made to ensure 
              accuracy, users should verify critical information against the original source documents.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

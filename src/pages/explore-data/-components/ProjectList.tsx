import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useRef } from 'react';

interface Project {
  id: string;
  name: string;
  tributarySystem: string;
  habitatType: string;
  targetSpecies: string[];
  implementingEntity: string;
  status: string;
  year: number;
  areaAcres: number;
  assessmentType: string;
  description: string;
  geometry: {
    type: 'Point' | 'Polygon';
    coordinates: number[] | number[][][];
  };
}

interface ProjectListProps {
  projects: Project[];
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
}

/**
 * Scrollable list of restoration project cards
 */
export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
}) => {
  const selectedCardRef = useRef<HTMLDivElement>(null);

  // Scroll to selected card when selection changes
  useEffect(() => {
    if (selectedCardRef.current) {
      selectedCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedProject]);

  // Color coding by status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Planned':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
        padding: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Restoration Projects ({projects.length})
      </Typography>
      <Stack spacing={2}>
        {projects.map((project) => {
          const isSelected = selectedProject?.id === project.id;
          return (
            <Card
              key={project.id}
              ref={isSelected ? selectedCardRef : null}
              elevation={isSelected ? 8 : 1}
              sx={{
                border: isSelected ? 2 : 0,
                borderColor: isSelected ? 'primary.main' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              <CardActionArea onClick={() => onProjectSelect(project)}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {project.name}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={project.status}
                        color={getStatusColor(project.status)}
                        size="small"
                      />
                      <Chip
                        label={project.year}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Tributary:</strong> {project.tributarySystem}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Habitat Type:</strong> {project.habitatType}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Area:</strong> {project.areaAcres} acres
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {project.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

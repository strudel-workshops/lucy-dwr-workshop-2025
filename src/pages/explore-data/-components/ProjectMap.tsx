import { Box, Paper, Typography } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer, useMap } from 'react-leaflet';

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

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

interface ProjectMapProps {
  projects: Project[];
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
}

// Component to handle map view updates when a project is selected
function MapViewController({ project }: { project: Project | null }) {
  const map = useMap();

  useEffect(() => {
    if (project) {
      const { geometry } = project;
      if (geometry.type === 'Point') {
        const coords = geometry.coordinates as number[];
        map.setView([coords[1], coords[0]], 12);
      } else if (geometry.type === 'Polygon') {
        const coords = geometry.coordinates as number[][][];
        const bounds = L.polygon(
          coords[0].map((coord) => [coord[1], coord[0]] as [number, number])
        ).getBounds();
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [project, map]);

  return null;
}

/**
 * Interactive map component that displays restoration projects
 * using Leaflet and react-leaflet
 */
export const ProjectMap: React.FC<ProjectMapProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
}) => {
  const mapRef = useRef<L.Map | null>(null);

  // Sacramento Valley center coordinates
  const center: [number, number] = [38.5, -121.5];
  const zoom = 8;

  // Color coding by status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#2e7d32'; // Green
      case 'In Progress':
        return '#ed6c02'; // Orange
      case 'Planned':
        return '#0288d1'; // Blue
      default:
        return '#757575'; // Gray
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Map Legend */}
      <Box
        sx={{
          padding: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Project Status
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {['Completed', 'In Progress', 'Planned'].map((status) => (
            <Box key={status} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: getStatusColor(status),
                  borderRadius: '50%',
                }}
              />
              <Typography variant="caption">{status}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Map Container */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapViewController project={selectedProject} />

          {projects.map((project) => {
            const isSelected = selectedProject?.id === project.id;
            const color = getStatusColor(project.status);

            if (project.geometry.type === 'Point') {
              const coords = project.geometry.coordinates as number[];
              return (
                <Marker
                  key={project.id}
                  position={[coords[1], coords[0]]}
                  eventHandlers={{
                    click: () => {
                      onProjectSelect(project);
                    },
                  }}
                >
                  <Popup>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {project.name}
                    </Typography>
                    <Typography variant="caption" display="block">
                      {project.tributarySystem}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Status: {project.status}
                    </Typography>
                  </Popup>
                </Marker>
              );
            }

            if (project.geometry.type === 'Polygon') {
              const coords = project.geometry.coordinates as number[][][];
              const positions = coords[0].map(
                (coord) => [coord[1], coord[0]] as [number, number]
              );

              return (
                <Polygon
                  key={project.id}
                  positions={positions}
                  pathOptions={{
                    color: isSelected ? '#000' : color,
                    fillColor: color,
                    fillOpacity: isSelected ? 0.6 : 0.4,
                    weight: isSelected ? 3 : 2,
                  }}
                  eventHandlers={{
                    click: () => {
                      onProjectSelect(project);
                    },
                  }}
                >
                  <Popup>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {project.name}
                    </Typography>
                    <Typography variant="caption" display="block">
                      {project.tributarySystem}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Status: {project.status}
                    </Typography>
                  </Popup>
                </Polygon>
              );
            }

            return null;
          })}
        </MapContainer>
      </Box>
    </Paper>
  );
};

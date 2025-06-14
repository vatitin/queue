import { StatusType } from "../constants";
import { useNavigate } from 'react-router-dom';
import type { PatientType } from "../types/patient.types";

//todo check if status: string is ok or shoult be status: typeof StatusType
interface PatientRowProps {
  patient: PatientType;
  patientStatus: string;
  onRemove: (id: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  onUpdate: (id: string, status: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const PatientRow: React.FC<PatientRowProps> = ({ patient, patientStatus, onRemove, onUpdate }) => {
  const navigate = useNavigate()
    return (
      <tr onClick={() => navigate(`/patient/${patient.id}`)}>
        <td>{patient.sequence}</td>
        <td>{patient.lastName || '-'}</td>
        <td>{patient.firstName || '-'}</td>
        <td>{patient.email}</td>
        <td>{patient.phoneNumber || '-'}</td>
        <td>{patient.gender || '-'}</td>
        <td>
          {patientStatus === StatusType.WAITING && (
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={(e) => onUpdate(patient.id, StatusType.ACTIVE, e)}
            >
              Hinzufügen
            </button>
          )}
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={(e) => onRemove(patient.id, e)}
          >
            Entfernen
          </button>
        </td>
      </tr>
    );
  };
  
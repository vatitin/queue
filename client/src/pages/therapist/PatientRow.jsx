import { StatusType } from "../../constants";
import { useNavigate } from 'react-router-dom';

export const PatientRow = ({ patient, patientStatus, onRemove, onUpdate }) => {
  const navigate = new useNavigate()
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
  
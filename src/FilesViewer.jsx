import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

export const FilesViewer = ({ path, files, onBack, onOpen }) => (
  <table className="table">
    <tbody className="tbody">
      <tr className="tr" onClick={onBack}>
        <td className="td">
          <FontAwesomeIcon icon={faFolderOpen} />
        </td>
        <td className="td">.. {path}</td>
        <td className="td"></td>
      </tr>
      {files.map(({ name, directory, size }) => {
        return (
          <tr
            className="tr"
            key={name}
            onClick={() => directory && onOpen(name)}
          >
            <td className="td">
              {directory ? (
                <FontAwesomeIcon icon={faFolder} />
              ) : (
                <FontAwesomeIcon icon={faFile} />
              )}
            </td>
            <td className="td">{name}</td>
            <td className="td has-text-right">{size}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

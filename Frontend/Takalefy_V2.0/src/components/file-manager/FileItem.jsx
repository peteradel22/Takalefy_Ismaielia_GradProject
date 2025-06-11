import { FaDownload, FaFileAlt } from "react-icons/fa";

const FileItem = ({ file }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
      <div className="flex items-center space-x-3">
        <FaFileAlt className="text-gray-600" />
        <span className="text-gray-800 font-medium">{file.name}</span>
      </div>
      <a href={file.url} download className="text-blue-500 hover:text-blue-700 transition">
        <FaDownload size={20} />
      </a>
    </div>
  );
};

export default FileItem;

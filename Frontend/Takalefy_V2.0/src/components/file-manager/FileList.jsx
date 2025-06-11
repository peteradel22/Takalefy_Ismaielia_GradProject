import FileItem from "./FileItem";

const FileList = ({ files, loading }) => {
  if (loading) return <p>Loading files...</p>;

  return (
    <div className="mt-4 space-y-3">
      {files.length > 0 ? (
        files.map((file, index) => <FileItem key={index} file={file} />)
      ) : (
        <p className="text-gray-500">No files available for this year.</p>
      )}
    </div>
  );
};

export default FileList;


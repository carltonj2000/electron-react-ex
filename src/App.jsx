import { useState, useMemo } from "react";

import { FilesViewer } from "./FilesViewer";

const fs = window.require("fs");
const pathModule = window.require("path");

const { app } = window.require("@electron/remote");

const formatSize = (size) => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

function App() {
  const [path, pathSet] = useState(app.getAppPath());

  const files = useMemo(
    () =>
      fs
        .readdirSync(path)
        .map((file) => {
          const stats = fs.statSync(pathModule.join(path, file));
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory(),
          };
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name);
          }
          return a.directory ? -1 : 1;
        }),
    [path]
  );

  const onBack = () => pathSet(pathModule.dirname(path));
  const onOpen = (folder) => pathSet(pathModule.join(path, folder));

  const [searchString, searchStringSet] = useState("");
  const filteredFiles = files.filter((s) => s.name.startsWith(searchString));

  return (
    <div className="container">
      <input
        className="input"
        value={searchString}
        onChange={(event) => searchStringSet(event.target.value)}
        placeholder="File search"
      />
      <FilesViewer {...{ path, files: filteredFiles, onBack, onOpen }} />
    </div>
  );
}

export default App;

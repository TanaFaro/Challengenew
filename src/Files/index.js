import React, { useState, useCallback } from 'react';

import { useFiles } from './use-files';
import { addVersion, addFile } from '../api';

import styles from './index.module.css';

// TODO: Improve the implementation of this component according to task (4)
function File({ file, onChange }) {
  const onRename = () => {
    const newName = window.prompt('Rename this file');
    if (!!newName) {
      addVersion(file.id, newName);
      onChange();
    }
  }

  return (
    <div className={styles.file}>
      <strong>{file.versions[0].name}</strong>
      <button style={{ marginLeft: '10px'}} onClick={onRename}>Rename</button>
      <ul>
        { file.versions.map((version, index) => (
          <li key={version.id} style={{ padding: '10px 0'}}>
            {
              version.id === (file.versions.length - 1) ?
              `${ version.name } | latest version` :
              `${ version.name } | ${version.id + 1}° version `
            }
          </li>
        )) }
      </ul>
    </div>
  );
}

export default function Files() {
  // TODO: Replace this polling-like implementation according to task (2)
  const files = useFiles();
  // eslint-disable-next-line no-unused-vars
  const [ state, setState ] = useState(files);
  const forceUpdate = useCallback(() => setState({}), []);

  const onAddFile = () => {
    const name = window.prompt('Enter the name of the new file');
    if (!!name) {
      addFile(name);
      forceUpdate();
    }
  }
  const [asc, setAsc] = useState(true);
  const setFile = useState([]);
  const toggleSort = () => {
    if (files && files.length > 0) {
      setAsc(!asc);
      const sortedFile = files.sort((a, b) => {
        const versionIndex = files.length - 1;
        console.log(a.versions[versionIndex]);
        if (a.versions[versionIndex].name < b.versions[versionIndex].name) {
          return asc ? -1 : 1;
        }
        if (a.versions[versionIndex].name > b.versions[versionIndex].name) {
          return asc ? 1 : -1
        }
        return 0;
      });
      setFile(sortedFile);
    }
  };
  return (
    <>
      {/* TODO: Implement sort feature according to task (3) */}
      <button onClick={toggleSort}>
          {asc ? "Sort Z-A" : "Sort A-Z"}
        </button>
      {
        files.map(file => <File file={file} key={file.id} onChange={() => forceUpdate()} />)
      }
      console.log(file);
      {/* TODO: Add a button to add a new file according to task (5) */}
      <button style={{ marginLeft: '10px'}} onClick={onAddFile}>Add New File</button>
    </>
  );
}
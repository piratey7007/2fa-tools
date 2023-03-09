import { LocalStorage, Action, ActionPanel, Form, List, MenuBarExtra } from "@raycast/api";
import { existsSync } from "fs";
import { useEffect, useState } from "react";
import useFile from "./hooks/useFile";

export default function Create() {
  const { error, fileExists, filePath, loading, setFile } = useFile();

  const submitFile = async ({ "json-file": { 0: file } }: { "json-file": { 0: string } }) => {
    await setFile(file);
  };

  return (
    <>
      {!fileExists && (
        <Form
          actions={
            <ActionPanel>
              <Action.SubmitForm title="Submit" onSubmit={submitFile} />
            </ActionPanel>
          }
        >
          <Form.FilePicker id="json-file" title="JSON file" />
        </Form>
      )}
      {filePath && <MenuBarExtra></MenuBarExtra>}
    </>
  );
}

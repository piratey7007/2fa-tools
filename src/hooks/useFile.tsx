import { Alert, LocalStorage } from "@raycast/api";
import { existsSync } from "fs";
import { useEffect, useState } from "react";

export default function useFile() {
  const [filePath, setFilePath] = useState<string | null>(null),
    [fileExists, setFileExists] = useState(false),
    [error, setError] = useState<string | null>(null),
    [loading, setLoading] = useState(true),
    setFile = async (file: any) => {
      const fileBad = async (error = "There was an error finding the file.") => {
        setFilePath(null);
        setFileExists(false);
        setError(error);
        await LocalStorage.removeItem("fileLocation");
        setLoading(false);
        console.error("File: ");
        console.error(file);
        console.error("Error: ");
        console.error(error);
      };
      if (!file) return fileBad("No file path passed/saved.");
      if (typeof file !== "string") return fileBad("Invalid type on path.");
      if (file.trim().length === 0) return fileBad("Path is an empty string.");
      if (!existsSync(file)) return fileBad(`File does not exist at path ${file}`);
      setFilePath(file);
      setFileExists(true);
      setError(null);
      setLoading(false);
    };
  useEffect(() => {
    (async () => {
      setFile((await LocalStorage.getItem("fileLocation")) || "");
    })();
  }, []);
  return { fileExists, filePath, error, loading, setFile };
}

import { Autocomplete, Box, Button, Container, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import api from "../api/api";

const PERSONAL = ["John", "Tom", "Emily"];
const PROFESSIONAL = ["Accounts", "HR", "IT", "Finance"];

export default function Upload() {
    const [documentDate, setDocumentDate] = useState(dayjs())
    const [majorHead, setMajorHead] = useState("")
    const [minorHead, setMinorHead] = useState("")
    const [tags, setTags] = useState("")
    const [remarks, setRemarks] = useState("")
    const [file, setFile] = useState(null);
    const [availableTags, setAvailableTags] = useState([]);
    const minorOptions =
        majorHead === "Personal" ? PERSONAL :
            majorHead === "Professional" ? PROFESSIONAL : [];

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
        const allowed = ["application/pdf", "image/png", "image/jpg"]
        if (!allowed.includes(selected.type)) {
            alert("Only PDF and Image files are allowed");
        }
        setFile(selected);
    }
    const handleSubmit = async (values) => {
        console.log("handleSubmit", values)
        if (!file || !majorHead || !minorHead) {
            alert("Please required field");
            return
        }
        const normalizedTags = Array.isArray(tags)
            ? tags.map((t) =>
                typeof t === "string" ? t : t.tag_name
            )
            : [];
        const formattedDate = documentDate
            ? dayjs(documentDate).format("DD-MM-YYYY")
            : "";
        const payload = {
            major_head: majorHead,
            minor_head: minorHead,
            document_date: formattedDate,
            document_remarks: remarks,
            tags: normalizedTags.map((t) => ({ tag_name: t })),
            user_id: "annu",
        }

        const formData = new FormData;
        formData.append("file", file);
        formData.append("data", JSON.stringify(payload))


        try {
            const res = api.post("/saveDocumentEntry", formData);
            alert("Document update successfully")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h5" mb={3}>
                    Upload Document
                </Typography>

                <Stack spacing={2}>
                    <DatePicker
                        label="Document Date"
                        value={documentDate}
                        onChange={(newValue) => setDocumentDate(newValue)}
                    />

                    <TextField
                        select
                        label="Category"
                        value={majorHead}
                        onChange={(e) => {
                            setMajorHead(e.target.value);
                            setMinorHead("");
                        }}
                    >
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Professional">Professional</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="Sub Category"
                        value={minorHead}
                        onChange={(e) => setMinorHead(e.target.value)}
                        disabled={!majorHead}
                    >
                        {minorOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Autocomplete
                        multiple
                        freeSolo
                        options={availableTags.map((t) => t.tag_name || t)}
                        value={tags}
                        onChange={(e, newValue) => setTags(newValue)}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Tags" />
                        )}
                    />

                    <TextField
                        label="Remarks"
                        multiline
                        rows={3}
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    />

                    <Button variant="outlined" component="label">
                        Select File
                        <input hidden type="file" onChange={handleFileChange} />
                    </Button>

                    {file && <Typography variant="body2">{file.name}</Typography>}

                    <Button variant="contained" onClick={handleSubmit}>
                        Upload
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
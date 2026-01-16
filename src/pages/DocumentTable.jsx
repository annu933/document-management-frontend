import { Autocomplete, Box, Button, Chip, Container, MenuItem, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import api from "../api/api";
import dayjs from "dayjs";
import mockDocuments from "../document.json"
import PreviewModal from "../components/PreviewModal";
import FilterModal from "../components/FilterModal";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import Upload from "./Upload";


const PERSONAL = ["John", "Tom", "Emily"];
const PROFESSIONAL = ["Accounts", "HR", "IT", "Finance"];

export default function DocumentList() {
    const navigate = useNavigate();
    const [majorHead, setMajorHead] = useState("");
    const [minorHead, setMinorHead] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [results, setResults] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);


    const minorOptions =
        majorHead === "Personal"
            ? PERSONAL
            : majorHead === "Professional"
                ? PROFESSIONAL
                : [];

    // fetch tags
    useEffect(() => {
        api
            .post("/documentTags", { term: "" })
            .then((res) => setAvailableTags(res.data?.data || []))
            .catch(() => { });
    }, []);

    useEffect(() => {
        setResults(mockDocuments);
    }, []);



    const handleSearch = async () => {
        const normalizedTags = Array.isArray(tags)
            ? tags.map((t) => t.label).filter(Boolean)
            : [];

        const payload = {
            major_head: majorHead,
            minor_head: minorHead,
            from_date: fromDate ? dayjs(fromDate).format("DD-MM-YYYY") : "",
            to_date: toDate ? dayjs(toDate).format("DD-MM-YYYY") : "",
            tags: normalizedTags.map((t) => ({ tag_name: t })),
            uploaded_by: "",
            start: 0,
            length: 10,
            filterId: "",
            search: { value: "" },
        };

        try {
            const res = await api.post("/searchDocumentEntry", payload);
            const filteredData = res.data?.data || [];

            if (filteredData.length > 0) {
                setResults(filteredData);
            }
        } catch (err) {
            console.error(err);
            alert("Search failed");
        }
    };
    return (
        <Container maxWidth="lg">
            <Box p={5}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    {/* Left */}
                    <Typography variant="h6">
                        All Documents
                    </Typography>

                    {/* Right */}
                    <Box display="flex" gap={2}>
                        <Button
                            variant="outlined"
                            onClick={() => setUploadOpen(true)}
                        >
                            Upload Docs
                        </Button>
                        <Button variant="contained"
                            onClick={() => setFilterOpen(true)}
                        >
                            Filter
                        </Button>
                    </Box>
                </Box>

                {/* table */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Document</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{row.document_id || "Document"}</TableCell>
                                <TableCell>{row.file_name || "Document"}</TableCell>
                                <TableCell>{row.major_head}</TableCell>
                                <TableCell>{row.document_date}</TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            setPreviewUrl(row.file_url);
                                            setPreviewOpen(true);
                                        }}
                                    >
                                        Preview
                                    </Button>

                                    <Button
                                        size="small"
                                        component="a"
                                        href={row.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {results.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No records found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <PreviewModal
                    open={previewOpen}
                    onClose={() => setPreviewOpen(false)}
                    fileUrl={previewUrl}
                />

                {/* filter modal */}
                <FilterModal
                    open={filterOpen}
                    onClose={() => setFilterOpen(false)}
                    onApply={() => {
                        handleSearch();
                        setFilterOpen(false);
                    }}
                    onReset={() => {
                        setMajorHead("");
                        setMinorHead("");
                        setFromDate(null);
                        setToDate(null);
                        setTags([]);
                    }}
                >

                    <Stack direction="row" spacing={2}>
                        <TextField
                            select
                            label="Category"
                            value={majorHead}
                            onChange={(e) => {
                                setMajorHead(e.target.value);
                                setMinorHead("");
                            }}
                            fullWidth
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
                            fullWidth
                        >
                            {minorOptions.map((opt) => (
                                <MenuItem key={opt} value={opt}>
                                    {opt}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <DatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={setFromDate}
                        />
                        <DatePicker
                            label="To Date"
                            value={toDate}
                            onChange={setToDate}
                        />
                    </Stack>
                    <Autocomplete
                        multiple
                        freeSolo
                        options={availableTags}
                        value={tags}
                        getOptionLabel={(option) =>
                            typeof option === "string" ? option : option.label || ""
                        }
                        onChange={(e, newValue) => {
                            const normalized = newValue.map((item) =>
                                typeof item === "string" ? { label: item } : item
                            );
                            setTags(normalized);
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip label={option.label} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Tags" />
                        )}
                    />
                </FilterModal>

                {/* modal for upload file */}
                <Dialog
                    open={uploadOpen}
                    onClose={() => setUploadOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogContent>
                        <Upload />
                    </DialogContent>
                </Dialog>

            </Box>
        </Container>
    )
}
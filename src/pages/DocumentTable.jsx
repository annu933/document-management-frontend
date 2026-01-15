import { Autocomplete, Box, Button, Chip, Container, MenuItem, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import api from "../api/api";
import dayjs from "dayjs";
import mockDocuments from "../document.json"


const PERSONAL = ["John", "Tom", "Emily"];
const PROFESSIONAL = ["Accounts", "HR", "IT", "Finance"];

export default function DocumentList() {
    const [majorHead, setMajorHead] = useState("");
    const [minorHead, setMinorHead] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [results, setResults] = useState([]);


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
            <Box>
                <Typography variant="h5" mb={3}>
                    Search Documents
                </Typography>

                <Stack spacing={2} mb={3}>
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
                            onChange={(newValue) => setFromDate(newValue)}
                        />
                        <DatePicker
                            label="To Date"
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
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

                    <Button variant="contained" onClick={handleSearch}>
                        Search
                    </Button>
                </Stack>
                {/* table */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Document</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{row.file_name || "Document"}</TableCell>
                                <TableCell>{row.major_head}</TableCell>
                                <TableCell>{row.document_date}</TableCell>
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
            </Box>
        </Container>
    )
}
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
} from "@mui/material";

export default function FilterModal({
    open,
    onClose,
    children,
    onApply,
    onReset,
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Filter Documents</DialogTitle>

            <DialogContent dividers>
                <Stack spacing={2}>{children}</Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onReset} color="secondary">
                    Reset
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={onApply}>
                    Apply Filters
                </Button>
            </DialogActions>
        </Dialog>
    );
}

import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function PreviewModal({ open, onClose, fileUrl }) {
    if (!fileUrl) return null;

    const isPdf = fileUrl.toLowerCase().endsWith(".pdf");
    const isImage = /\.(jpg|jpeg|png|webp)$/i.test(fileUrl);
    console.log("fileUrl", fileUrl)
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Document Preview
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {isPdf && (
                    <iframe
                        src={fileUrl}
                        title="PDF Preview"
                        width="100%"
                        height="500px"
                    />
                )}

                {isImage && (
                    <img
                        src={fileUrl}
                        alt="Preview"
                        style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
                    />
                )}

                {!isPdf && !isImage && (
                    <Typography>Preview not supported for this file type.</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
}
